(function(exports) {

  var deli = exports.deli = {
    version: "1.0.0"
  };

  /*
   * Deli recipes are just arrays of deli layers. You can parse strings into
   * recipes, serialize arrays of them into strings, and convert them into
   * sando stacks.
   *
   * See below for the deli.stack.* functions to see how this all works.
   */
  deli.recipe = {
    // Parse a string into an array of deli layers. Layers are separated by
    // semicolons.
    parse: function(str) {
      if (str.length === 0) {
        return [];
      }
      return str.split(";").map(deli.layer.parse);
    },

    parseFromTileUrl: function(url) {
      var match = url.match(/\?recipe=([^&]+)/);
      return match ? deli.recipe.parse(match[1]) : null;
    },

    // Serialize an array of layers into a recipe string.
    serialize: function(layers) {
      return layers.map(deli.layer.serialize).join(";");
    },

    // Convert an array of deli layers into a sando stack.
    toStack: function(layers) {
      return layers.map(deli.layer.toStack);
    }
  };

  /*
   * Deli layers are object representations of Photoshop-like map layers,
   * with some affordances for built-in colorization (tinting), color
   * adjustment, compositing effects and masking. They can be serialized to
   * strings (and parsed from serializations), and converted into sando
   * stacks to create sandwich-maker URLs. The process looks like this:
   *
   * // create a desaturated watercolor layer
   * var layer = {
   *  url: "watercolor",
   *  sat: 40
   * };
   *
   * var serialzed = deli.layer.serialize(layer);
   * // produces "watercolor[sat=40]"
   *
   * var stack = deli.layer.toStack(layer);
   * // produces a sando stack array
   *
   * // you'll need sando for this part:
   * var stackUrl = sando.serialize(stack);
   * // produces "(watercolor,$fff[hsl-saturation@40])"
   */
  deli.layer = {
    id: 0,

    // default attributes of parsed layers
    defaults: {
      comp: "over",
      alpha: 100,
      sat: 100,
      bright: 0,
      invert: false,
      mask: "",
      invert_mask: false
    },

    create: function(data) {
      return deli.util.extend({
        id: ++deli.layer.id
      }, deli.layer.defaults, data);
    },

    // parse a layer in the form:
    // "url[param=value,param=value]"
    parse: function(str) {
      // for Safari, which (stupidly) escapes ()[] chars in the hash
      str = decodeURIComponent(str);
      if (str.length === 0) {
        return null;
      }
      var match = str.match(/^([^\[]+)(\[(.*)\])?$/);
      if (!match) throw "Parse error: " + str;

      var id = match[1],
          layer = id.indexOf("color:") === 0
            ? deli.layer.create({fill: id.substr("color:".length).replace(/^\$/, "#")})
            : deli.layer.create({url: id});

      if (match[3]) {
        var params = {};
        match[3].split(",").forEach(function(bit) {
          bit = bit.split("=");
          var key = bit[0],
              val = bit[1];
          if (val && val.length) {
            params[key] = val;
          }
        });

        if (params.invert === "1") {
          layer.invert = true;
        }

        if (params.mask) {
          if (params.mask.charAt(0) === "!") {
            layer.mask = params.mask.substr(1);
            layer.invert_mask = true;
          } else {
            layer.mask = params.mask;
          }
        }

        if (params.bright) {
          var brightness = parseInt(params.bright);
          if (!isNaN(brightness)) {
            layer.bright = brightness;
          }
        }

        if (params.sat) {
          var sat = parseInt(params.sat);
          if (!isNaN(sat)) {
            layer.sat = sat;
          }
        }

        if (params.tint) {
          var tint = params.tint.split("@"),
              color = tint[0],
              alpha = tint[1] ? parseInt(tint[1]) : 100;
          if (!isNaN(alpha)) {
            layer.tint = {
              color: color.replace(/^\$/, "#"),
              alpha: alpha
            };
          }
        }

        if (params.comp) {
          layer.comp = params.comp;
        }

        if (params.alpha) {
          layer.alpha = parseInt(params.alpha);
        }
      }

      return layer;
    },

    // serialize a layer object into its parseable form
    serialize: function(layer) {
      var str = layer.fill
            ? "color:" + layer.fill.replace(/^#/, "$")
            : layer.url,
          effects = [];
      if (layer.mask) {
        var mask = layer.invert_mask
          ? "!" + layer.mask
          : layer.mask;
        effects.push("mask=" + mask);
      }
      if (layer.invert === true) {
        effects.push("invert=1");
      }
      if (layer.bright < 0 || layer.bright > 0) {
        effects.push("bright=" + layer.bright);
      }
      if (layer.sat >= 0 && layer.sat < 100) {
        effects.push("sat=" + layer.sat);
      }
      if (layer.tint && layer.tint.alpha > 0) {
        effects.push("tint=" + [
          layer.tint.color.replace(/^#/, "$"),
          layer.tint.alpha
        ].join("@"));
      }
      if (layer.comp && layer.comp !== "over") {
        effects.push("comp=" + layer.comp);
      }
      if (layer.alpha >= 0 && layer.alpha < 100) {
        effects.push("alpha=" + layer.alpha);
      }
      return effects.length
        ? str + "[" + effects + "]"
        : str;
    },

    // convert a deli layer into a sando stack
    toStack: function(layer) {
      var layer0 = deli.util.extend({}, layer, {
            comp: null,
            alpha: 100
          }),
          stack = [layer0];

      if (layer0.fill) {

        // always convert the fill to an RGB hex string
        layer0.fill = deli.rgb(layer0.fill);
        // disable alpha post-blending
        layer0.post = false;

        if (layer.mask) {
          // always put the image layer first and use source-in compositing
          stack.unshift({url: layer.mask});
          layer0.comp = layer.invert_mask
            ? "source-out"
            : "source-in";
          layer0.post = layer.invert_mask;
        } else {
          layer0.post = true;
        }

      } else {

        if (layer.invert === true) {
          stack.push({
            fill: "#fff",
            comp: "difference"
          });
        }

        if (!isNaN(layer.bright) && layer.bright !== 0) {
          if (layer.bright < 0) {
            stack.push({
              fill: "#000",
              alpha: -layer.bright
            });
          } else {
            stack.push({
              fill: "#fff",
              alpha: layer.bright
            });
          }
        }

        if (layer.sat >= 0 && layer.sat < 100) {
          stack.push({
            fill: "#fff",
            comp: "hsl-saturation",
            alpha: 100 - layer.sat
          });
        }

        if (layer.tint && layer.tint.alpha > 0) {
          stack.push({
            fill: deli.rgb(layer.tint.color),
            comp: "hsl-color",
            alpha: layer.tint.alpha
          });
        }

        if (layer.mask) {
          stack.push({
            url: layer.mask,
            comp: layer.invert_mask
              ? "destination-out"
              : "destination-in"
          });
        }

      }

      if (stack.length > 1) {
        return {
          layers: stack,
          comp: layer.comp,
          alpha: layer.alpha
        };
      } else {
        if (layer.fill) {
          layer.fill = deli.rgb(layer.fill);
          layer.post = true;
        }
        return layer;
      }
    }
  };

  // generate an RGB hex string for a given color
  deli.rgb = function(color) {
    return d3.rgb(color).toString();
  };

  // query string parse & format
  deli.query = {
    parse: function(str) {
      if (str.charAt(0) === "?") str = str.substr(1);
      var parts = str.split("&"),
          len = parts.length,
          query = {};
      for (var i = 0; i < len; i++) {
        var bits = parts[i].split("=", 2),
            key = bits[0],
            val = (bits.length > 1)
              ? decodeURIComponent(bits[1]).replace(/\+/g, " ")
              : true;
        switch (val) {
          case "true": val = true; break;
          case "false": val = false; break;
          default:
            var num = Number(val);
            if (!isNaN(num)) val = num;
            break;
        }
        query[key] = val;
      }
      return query;
    },

    format: function(obj, sortKeys) {
      var entries = d3.entries(obj);
      if (sortKeys) {
        keys.sort(function(a, b) {
          return d3.ascending(a.key, b.key);
        });
      }
      return entries.map(function(entry) {
        return [entry.key, String(entry.value).replace(/[&=%]/g, encodeURIComponent)].join("=");
      }).join("&");
    }
  };

  // utility functions
  deli.util = {};

  // simple mustache string templating:
  // deli.util.template("foo {bar}", {bar: "baz"}) -> "foo baz"
  deli.util.template = function(str, values) {
    return str.replace(/{([^}]+)}/g, function(match, key) {
      return values[key];
    });
  };

  // create a debounced version of a function that waits `delay` milliseconds
  // before executing with the provided arguments, and cancels previous
  // queued calls.
  deli.util.debounce = function(fn, delay) {
    var timeout;
    return function() {
      var ctx = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        fn.apply(ctx, args);
      }, delay);
    };
  };

  // like jQuery.extend(), takes an object and one or more additional object
  // arguments and applies their properties to the first object.
  deli.util.extend = function(a, b) {
    for (var i = 1; i < arguments.length; i++) {
      var b = arguments[i];
      if (!b) continue;
      for (var k in b) {
        if (b[k] == null) delete a[k];
        else a[k] = b[k];
      }
    }
    return a;
  };

  deli.util.position = {
    vcenter: function(selection) {
      selection.style("margin-top", function() {
        return -~~(this.offsetHeight / 2) + "px";
      });
    },
    hcenter: function(selection) {
      selection.style("margin-left", function() {
        return -~~(this.offsetWidth / 2) + "px";
      });
    },
    center: function(selection) {
      selection
        .call(deli.util.position.vcenter)
        .call(deli.util.position.hcenter);
    },
  };

  /*
   * Boxy!
   *
   * var box = deli.util.boxy(),
   *     items = d3.selectAll(".item");
   *
   * // remember their old positions
   * items.call(box.store, "before");
   *
   * // re-order them in the DOM, e.g.:
   * items.sort(function(a, b) { ... }).order();
   *
   * items
   *  .call(box.store, "after");
   *  .style("position", "absolute")
   *  .call(box.recall, "before")
   *  .transition()
   *    .duration(1000)
   *    .call(box.recall, "after")
   *    .transition()
   *      .delay(1000)
   *      .duration(0)
   *      .style("position", null)
   *      .call(box.reset);
   */
  deli.util.boxy = function() {
    var box = {},
        defaultState = "_t";

    box.store = function(selection, state) {
      selection.each(function(d) {
        d[state] = {
          x: this.offsetLeft,
          y: this.offsetTop,
          w: this.offsetWidth,
          h: this.offsetHeight
        };
      });
    };

    box.recall = function(selection, state) {
      selection
        .filter(function(d) {
          return typeof d[state] === "object";
        })
        .style("left",    function(d) { return d[state].x + "px"; })
        .style("top",     function(d) { return d[state].y + "px"; })
        .style("width",   function(d) { return d[state].w + "px"; })
        .style("height",  function(d) { return d[state].h + "px"; });
    };

    box.reset = function(selection, keys) {
      if (!keys) keys = ["left", "top", "width", "height"];
      keys.forEach(function(key) {
        selection.style(key, null);
      });
    };

    return box;
  };

  deli.util.timestamp = function(quantize, n) {
    var q = 1000; // second
    switch (quantize) {
      case "hour": q *= 3600; break;
      case "minute": q *= 60; break;
    }
    if (!isNaN(n)) q *= n;
    return ~~(Date.now() / q) * q / 1000;
  };

  deli.configure = function(path, callback) {
    var body = d3.select("body")
      .classed("loading", true);
    if (arguments.length === 1) {
      callback = arguments[0];
      path = "data/config.json";
    }
    var url = path + "?t=" + deli.util.timestamp("minute", 5);
    return d3.json(url, function(error, config) {
      body.classed("loading", false);

      var query = deli.query.parse(location.search);
      if (query.status && query.status !== "on") {
        config.status = query.status;
      } 

      config.open = false;

      if (error) {

        body
          .classed("error", true)
          .classed("closed", true);
        callback.apply(this, arguments);

      } else {

        if (config.status === null && config.statusUrl) {
          var statusUrl = config.statusUrl
            + "?t=" + deli.util.timestamp("minute", 5);
          d3.json(statusUrl, function(err, stat) {
            if (err) {
              config.status = "unknown";
              console.warn("status loading error:", err);
              body.classed("error", true)
                .classed("closed", true);
              error = err;
            } else {
              config.status = stat.status;
            }
            done();
          });
        } else {
          done();
        }

        function done() {
          config.open = config.status === "on";
          switch (config.status) {
            case "off":
              config.status = "closed";
              break;
          }
          body
            .datum(config)
            .classed("configured", true)
            .classed("open", config.open)
            .classed("closed", !config.open);
          callback(error, config);
        }
      }
    });
  };

  deli.place = {
    url: "http://q.maps.stamen.com/",
    search: function(query, callback) {
      var q = (typeof query === "string")
            ? {q: query}
            : query,
          url = [this.url, deli.query.format(q)].join("?");
      return d3.json(url, callback);
    }
  };

})(this);