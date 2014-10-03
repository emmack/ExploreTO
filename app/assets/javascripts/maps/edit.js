deli.configure(function(error, config) {

  if (!config.open) {
    alert("Sorry, we're closed!");
    location.href = "./";
    return;
  }

  var map2imageUrl = config.m2i.baseUrl,
      sandwichMakerTileUrl = config.tileUrl,
      maxLayers = 5,
      hash = location.hash
        ? location.hash.substr(1)
        : "",
      parts = hash.split("/"),
      recipe = parts.shift(),
      layers = deli.recipe.parse(recipe)
        .slice(0, maxLayers)
        .reverse(),
      output = {
        recipe: "",
        stack: ""
      },
      center = [37.75497, -122.3513],
      zoom = 11,
      bounds = null;

  if (parts.length === 3) {
    zoom = +parts[0];
    center = [+parts[1], +parts[2]];
  } else if (parts.length === 1) {
    var extent = parts[0].split(":");
    bounds = L.latLngBounds([extent.slice(0, 2), extent.slice(2, 4)]);
  }

  var view = d3.select("#main");

  var tooltip = bootstrap.tooltip()
    .placement(function() {
      return this.getAttribute("data-placement") || "right";
    });

  view.selectAll(".has-tooltip")
    .call(tooltip)
    .call(tooltip.show)
    .call(tooltip.hide);

  var map = L.map("map", {
    center: center,
    zoom: zoom,
    maxZoom: 17, // TODO: move into config?
    scrollWheelZoom: false,
    keyboard: false,
    inertia: false,
    zoomControl: false,
    fadeAnimation: true,
    zoomAnimation: true,
    attributionControl: false
  });

  // so we can access it later
  d3.select("#map")
    .datum(map);

  var tiles = L.tileLayer("", {
    subdomains: "abcd",
    unloadInvisibleTiles: true,
    reuseTiles: true
  })
  .addTo(map);

  L.control.zoom({position: "topright"}).addTo(map);

  if (bounds) {
    map.fitBounds(bounds);
  }

  var imageControls = d3.formation("#image-controls"),
      colorControls = d3.formation("#color-controls"),
      layerPalette = d3.formation("#layer-palette");

  var minPaletteY = 60;
  [imageControls, colorControls].forEach(function(palette) {
    palette.resize = function() {
      var node = this.node(),
          h = node.offsetHeight,
          dy = ~~(-h / 2),
          offset = 0,
          maxPaletteY = window.innerHeight - 10;
      this.style("margin-top", ~~(-h / 2) + "px");
      var rect = node.getBoundingClientRect();
      if (rect.top < minPaletteY) {
        offset = minPaletteY - rect.top;
      } else if (rect.bottom > maxPaletteY) {
        offset = maxPaletteY - rect.bottom;
      }
      if (offset != 0) {
        dy += offset;
        this.style("margin-top", dy + "px");
        this.select(".arrow").style("top", ~~(h / 2 - offset) + "px");
      } else {
        this.select(".arrow").style("top", null);
      }
      return this;
    };
  });

  layerPalette.select("select.source")
    .on("change", function() {
      var id = this.options[this.selectedIndex].value,
          layer = deli.layer.parse(id);
      layers.unshift(layer);
      updateLayers(layers.length > 1);
      layerPalette.detach();
      adjustTopLayer();
    });

  d3.selectAll("div.maps")
    .selectAll("button.image")
    .data(["toner", "watercolor", "naip", "terrain"])
    .enter()
    .append("button")
      .attr("class", "image")
      .on("click", function(id) {
        var layer = deli.layer.create({url: id});
        layers.unshift(layer);
        updateLayers(layers.length > 1);
        layerPalette.detach();
        adjustTopLayer();
      })
      .append("img")
        .attr("width", 128)
        .attr("height", 128)
        .attr("src", function(id) {
          return "images/thumbnails/" + id + ".png";
        });

  d3.selectAll("div.colors")
    .selectAll("button.color")
    .data("#ff3030 #ff9a30 #ffcf30 #9a9a30 #b4a689 #d9dace #60c9fe #6565ff #9a00cf #ff65ff #976332 #303b30".split(" "))
    .enter()
    .append("button")
      .attr("class", "color")
      .style("background-color", function(color) {
        return deli.rgb(color);
      })
      .on("click", function(color) {
        var layer = deli.layer.create({fill: color});
        layers.unshift(layer);
        updateLayers(layers.length > 1);
        layerPalette.detach();
        adjustTopLayer();
      });

  map.on("mousedown touchstart", detachControls);

  map.on("viewreset drag move zoomend", function() {
    updateHash();
  });

  var updateStackUrl = deli.util.debounce(function(stack) {
    var tileUrl = sandwichMakerTileUrl.replace("{stack}", stack);
    tiles.setUrl(tileUrl);
    d3.select("#tile-url").text(tileUrl);
  }, 500);

  var blendModes = [
    {value: "over", label: "over (default)"},
    "multiply",
    "overlay",
    "screen",
    "darker",
    "lighter",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hsl-hue",
    "hsl-saturation",
    "hsl-color",
  ];

  d3.selectAll("select[data-key=comp]")
    .selectAll("option")
      .data(blendModes)
      .enter()
      .append("option")
        .attr("value", function(d) { return typeof d === "string" ? d : d.value; })
        .text(function(d) { return typeof d === "string" ? d : d.label; });

  imageControls.selectAll("input[name=tinted]")
    .on("change.tinted", function(d) {
      applyTint(d);
      imageControls.classed("tinted", d.tinted).resize();
    });
  imageControls.selectAll("input.tint")
    .on("change.tint", function(d) {
      applyTint(d, this.classList.contains("hsl")
        ? ".rgb"
        : null);
    });

  imageControls.select("select[data-key=mask]")
    .on("change.mask", function(d) {
      imageControls.classed("masked", !!d.mask).resize();
    });

  colorControls.select("select[data-key=mask]")
    .on("change.mask", function(d) {
      colorControls.classed("masked", !!d.mask).resize();
    });

  colorControls.selectAll("input.fill")
    .on("change.fill", function(d) {
      colorControls.read(null, this.classList.contains("hsl")
        ? ".rgb"
        : null);
      colorControls.selectAll(".swatch")
        .style("background-color", d.fill);
    });

  var deferredUrlUpdate = deli.util.debounce(updateUrl, 100);

  var addLayerButton = d3.select("#add-layer")
    .on("click", function() {
      // don't do anything if we're in the "empty" state
      if (layers.length === 0) return;
      d3.select(this).call(tooltip.hide);
      detachControls();
      layerPalette
        .attach(this.parentNode)
        .select("select.source")
          .property("selectedIndex", 0);
    });

  d3.selectAll(".max-layers")
    .text(maxLayers);

  var imagePreview = d3.select("#image-preview")
  imagePreview.select("a.close")
    .on("click", function() {
      imagePreview.style("display", "none");
      makeImageButton
        .classed("making", false)
        .attr("disabled", null);
      clearInterval(imageCheckInterval);
    });

  var searchForm = d3.select("#search")
      .on("submit", function() {
        submitSearch();
        d3.event.preventDefault();
        return false;
      }),
      searchField = searchForm.select("#search-query")
        .on("keypress", function() {
          switch (d3.event.keyCode) {
            case 13: // enter
              return submitSearch();
            case 27: // exscape
              return searchField.node().value = "";
          }
        }),
      searchButton = searchForm.select("#search-submit")
        .on("click", function() {
          console.log("<search>");
          if (searchForm.classed("open")) {
            submitSearch();
          } else {
            searchForm.classed("open", true);
            searchField.node().focus();
          }
          d3.event.preventDefault();
          return false;
        });

  function submitSearch() {
    if (searchForm.classed("searching")) {
      // console.log("(already searching)");
      return;
    }
    var q = searchField.property("value");
    if (q) {
      // console.warn("search query:", q);
      searchForm.classed("searching", true);
      deli.place.search({
        q: q,
        w: map._size.x,
        h: map._size.y
      }, function(error, results) {
        searchForm.classed("searching", false);
        if (error) {
          alert("Sorry, something went wrong: " + error.statusText);
        } else if (results.length === 0) {
          alert("Sorry, we couldn't find anything with that name.");
        } else {
          var loc = results[0];
          // console.log("search found:", loc);
          searchField.node().value = loc.name;
          map.setView([loc.latitude, loc.longitude], loc.zoom, true);
        }
      });
    } else {
      // console.warn("no search query");
    }
  }

  var imageCheckInterval;

  var makeImageButton = d3.select("#make-image")
    .datum(function() { return d3.select(this).html(); })
    .on("click", function(html) {

      makeImageButton.call(tooltip.hide);
      detachControls();

      clearInterval(imageCheckInterval);

      makeImageButton
        .classed("making", true)
        .attr("disabled", "disabled");

      imagePreview
        .style("display", "block");

      imagePreview.select(".title")
        .text("Please hold...");
      imagePreview.select(".content")
        .html("We&rsquo;re making you an image right now.");
      imagePreview.call(deli.util.position.vcenter);

      var center = map.getCenter(),
          url = sandwichMakerTileUrl.replace("{stack}", output.stack)
            .replace("{s}.", "") // XXX or do we replace it with 'a', 'b', etc.?
            .replace(/{[a-z]}/g, function(str) {
              return str.toUpperCase();
            }) + "?recipe=" + output.recipe,
          data = {
            p: url,
            z: map.getZoom(),
            lat: center.lat,
            lng: center.lng,
            w: map._size.x,
            h: map._size.y
          },
          query = deli.query.format(data),
          url = [config.m2i.baseUrl + "mapimg", query].join("?");

      if (Array.isArray(config.m2i.maxSize)) {
        data.w = Math.min(data.w, config.m2i.maxSize[0]);
        data.h = Math.min(data.h, config.m2i.maxSize[1]);
      }

      d3.json(url)
        .post("blah blah blah", function(error, response) {

          if (error) {

            imagePreview.select(".title")
              .text("Whoops!");
            var content = imagePreview.select(".content")
              .text("");
            content.append("p")
              .attr("class", "message error")
              .text("Something went wrong:")
            content.append("pre")
              .text(error.statusText);
            imagePreview.call(deli.util.position.vcenter);

          } else {
            var image = response[0];
            // console.log("success!", image);

            var content = imagePreview.select(".content")
              .text("");
            content.append("p")
              .attr("class", "message")
              .text("Your image is being made. It will be be available here shortly.");
            imagePreview.call(deli.util.position.vcenter);

            var viewUrl = deli.util.template(config.m2i.imagePermalink, image),
                statusUrl = config.m2i.baseUrl + deli.util.template(config.m2i.imageStatusUri, image),
                imageUrl = image.image;
            content.append("a")
              .attr("class", "image-permalink")
              .attr("data-id", image.id)
              .attr("target", "_blank")
              .attr("href", viewUrl)
              .append("img")
                .attr("class", "thumb")
                .attr("title", "Show me the image already!")
                .attr("src", config.m2i.processingThumbnail)
                .on("load", function() {
                  imagePreview.call(deli.util.position.vcenter);
                })
                .on("error", function() {
                  // this.parentNode.removeChild(this);
                  this.height = this.width;
                  imagePreview.call(deli.util.position.vcenter);
                });

            imageCheckInterval = setTimeout(checkImageStatus, 5000);

            function checkImageStatus() {
              var checkUrl = (config.m2i.baseUrl + config.m2i.imageStatusUri).replace("{id}", image.id);
              d3.json(checkUrl, function(error, results) {
                if (!error && results.selected.items[0].id === image.id) {
                  var selected = results.selected.items[0];
                  if (selected.status === "FINISHED") {

                    makeImageButton
                      .classed("making", false)
                      .attr("disabled", null);

                    imagePreview
                      .classed("making", false)
                      .classed("finished", true);

                    imagePreview.select("img.thumb")
                      .attr("src", selected.thumb + "?finished");

                    imagePreview.select(".title")
                      .html("Voil&agrave;!");
                    content.select("p")
                      .attr("class", "message success")
                      .text("Your image is finished! Click the thumbnail to see and share it.")

                    imagePreview.call(deli.util.position.vcenter);

                  } else {

                    imageCheckInterval = setTimeout(checkImageStatus, 5000);

                  }
                }
              });
            }
          }
        });
    });

  var sourcesById = {};
  d3.json(config.sourcesUrl, function(error, sources) {

    if (error) {
      alert("Whoops! I couldn't get the list of source layers. Refresh?");
      view.classed("error", true);
      return;
    } else {
      sourcesById = sources;

      d3.json("data/sources.json", function(error, groups) {
        if (error) {
          alert("Argh! We seem to be missing sources.json.");
          view.classed("error", true);
          return;
        }

        var select = d3.selectAll("select.source"),
            optgroup = d3.selectAll("select.source")
              .selectAll("optgroup")
                .data(groups)
                .enter()
                .append("optgroup");

        optgroup
          .attr("label", function(d) { return d.label; })
          .selectAll("option")
            .data(function(d) { return d.sources; })
            .enter()
            .append("option")
              .call(setupOption);

        select.filter(".alpha")
          .selectAll("optgroup option:not(.alpha)")
            .remove();

        updateLayers();

        function setupOption(selection) {
          selection
            .classed("alpha", function(d) { return !!d.alpha; })
            .attr("value", function(d) {
              return typeof d === "object" ? d.id : d;
            })
            .text(function(d) {
              return typeof d === "object" ? d.label : d;
            });
        }
      });
    }
  });

  updateLayers();

  window.addEventListener("resize", updateLayout);

  function updateLayers(animate) {
    var wasEmpty = view.classed("empty"),
        empty = layers.length === 0,
        full = layers.length >= maxLayers;

    view.classed("empty", empty);

    d3.select("#recipe")
      .classed("full", full);

    addLayerButton
      .attr("disabled", full ? "disabled" : null);

    // note: we use deli.layer.serialize as the data join key function
    // so that d3 keeps old layers around, and doesn't create false
    // positives in the enter() selection
    var layer = d3.select("#layers")
      .selectAll(".layer")
      .data(layers, function(d) {
        return d.id || deli.layer.serialize(d);
      });

    var box = deli.util.boxy();
    layer.call(box.store, "before");

    var enter = layer.enter()
      .append("div")
        .attr("class", "layer")
        .style("opacity", 0);

    enter.call(setupLayer);

    enter.transition("fade-in")
      .duration(200)
      .style("opacity", 1);

    // remove old layers
    layer.exit()
      .remove();

    layer.order();
    // update all of the existing layers
    layer.call(updateLayer);

    layer.select("button.remove").on("click", removeLayer);
    layer.select("button.adjust").on("click", adjustLayer);
    layer.select("button.move-up").on("click", moveLayerUp);
    layer.select("button.move-down").on("click", moveLayerDown);

    // and update the serialization
    updateUrl();

    if (animate) {

      layer.filter(function(d) { return !d.before; })
        .call(box.store, "before");

      updateLayout();

      layer
        .call(box.store, "after")
        .style("position", "absolute")
        .call(box.recall, "before")
        .transition()
          .duration(500)
          .style("opacity", 1)
          .call(box.recall, "after")
          .each("end", function() {
            d3.select(this)
              .style({
                position: null,
                top: null,
                left: null,
                width: null
              });
          });

    } else {
      updateLayout();
    }
  }

  function updateLayout() {
    if (layers.length === 0) return;

    var container = d3.select("#layers"),
        availHeight = container.property("offsetHeight"),
        items = container.selectAll(".layer"),
        layerHeight = availHeight / layers.length,
        maxColorHeight = 150;

    var images = items.filter(".image"),
        imageCount = images.data().length;
    if (images.data().length > 0) {

      items.filter(".color")
        .style("height", Math.min(layerHeight, maxColorHeight) + "px")
        .each(function() {
          availHeight -= this.offsetHeight;
        });

      images.style("height", Math.ceil(availHeight / imageCount) + "px");
    } else {
      items.style("height", Math.ceil(availHeight / layers.length) + "px");
    }

    items.select(".map")
      .each(function() {
        this.map.setView(map.getCenter(), map.getZoom())
          .invalidateSize();
      });
  }

  /*
   * Update the serialized string representation across the UI, usually in
   * response to a layer data change.
   */
  function updateUrl(historical) {
    var recipe = "", stackStr = "";
    if (layers.length === 0) {
      stackStr = "$fff[@0]";
      d3.select("#attribution").text("");
    } else {
      var reversed = layers.slice().reverse();
      var recipe = deli.recipe.serialize(reversed),
          stack = deli.recipe.toStack(reversed);
      stackStr = sando.serialize(stack);

      updateAttribution(stack);
    }

    output.recipe = recipe;
    output.stack = stackStr;

    updateHash(historical);
    updateStackUrl(stackStr);
  }

  function updateHash(historical) {
    var zoom = map.getZoom(),
        center = map.getCenter(),
        precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2)),
        hash = [
          output.recipe,
          zoom,
          center.lat.toFixed(precision), 
          center.lng.toFixed(precision)
        ].join("/");
    if (historical) {
      location.hash = hash;
    } else {
      location.replace("#" + hash);
    }
  }

  function setupLayer(selection) {

    selection.filter(function(d) { return d.url; })
      .append("div")
        .attr("class", "map")
        .each(function(layer) {
          this.map = L.map(this, {
            center: map.getCenter(),
            zoom: map.getZoom(),
            scrollWheelZoom: false,
            touchZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false,
            inertia: false,
            fadeAnimation: true,
            zoomAnimation: true,
            attributionControl: false,
            zoomControl: false
          });

          this.tiles = L.tileLayer("", {
          }).addTo(this.map);

          var layer = this.tiles;
          this.tiles.setUrlDeferred = deli.util.debounce(function(url) {
            layer.setUrl(url);
          }, 500);

          map.sync(this.map, {
            noInitialSync: true
          });
        });

    selection.append("div")
      .attr("class", "swatch");

    /*
    selection.append("h3")
      .attr("class", "title");
    */

    var buttons = selection.append("div")
      .attr("class", "buttons");

    buttons.append("button")
      .attr("class", "big move-up sprite")
      .attr("title", "move this layer up")
      .html("&uarr;")
      .attr("data-placement", "bottom")
      .call(tooltip);

    buttons.append("button")
      .attr("class", "big move-down sprite")
      .attr("title", "move this layer down")
      .html("&darr;")
      .attr("data-placement", "top")
      .call(tooltip);

    buttons.append("button")
      .attr("class", "big remove")
      .attr("title", "delete this layer")
      .html("<span>&times;</span>")
      .attr("data-placement", "right")
      .call(tooltip);

    buttons.append("button")
      .attr("class", "big adjust sprite")
      .attr("title", "adjust this layer's properties")
      .text("adjust")
      .attr("data-placement", "right")
      .call(tooltip);
  }

  /*
   * Update the selection's DOM elements to reflect their layer data.
   */
  function updateLayer(selection) {
    selection.attr("data-type", function(d) {
      return d.fill ? "color" : "image";
    });

    selection.classed("color", function(d) { return  d.fill; });
    selection.classed("image", function(d) { return !d.fill; });

    var color = selection.filter(".color");
    color.select(".swatch")
      .style("background-color", function(d) { return d.fill; })
      .style("opacity", function(d) { return d.alpha / 100; });
    color.select(".title")
      .text(function(d) { return d.fill; });

    // set alpha post-blending flag to true if this is the bottom layer,
    // otherwise false
    color.each(function(d) {
      d.post = !this.nextSibling;
    });

    var image = selection.filter(".image");
    image.select(".title")
      .style("opacity", function(d) { return d.alpha / 100; })
      .text(function(d) { return d.url; });

    image.select(".map")
      .each(function(d) {
        var stackUrl = sando.serialize(deli.layer.toStack(d)),
            url = sandwichMakerTileUrl.replace("{stack}", stackUrl);
        this.tiles.setUrlDeferred(url);
      });
  }

  function adjustLayer(layer) {
    d3.select(this).call(tooltip.hide);
    layerPalette.detach();

    var root = findParentWithClass(this, "layer");
    console.log("adjusting:", layer, root);

    layer.invert = !!layer.invert;
    layer.masked = !!layer.masked;
    if (typeof layer.mask === "undefined") {
      layer.mask = "";
    }

    if (layer.fill) {
      layer.invert_mask = !!layer.invert_mask;

      // color layer
      imageControls.detach();
      colorControls.select(".swatch")
        .style("background-color", layer.fill);
      colorControls
        .classed("masked", !!layer.mask)
        .attach(root)
        .bind(layer)
        .on("change", function() {
          d3.select(root).call(updateLayer);
          updateUrl();
        });
    } else {
      // reasonable defaults for tint
      layer.tint_color = layer.tint ? layer.tint.color : "#ff6600";
      layer.tint_alpha = layer.tint ? layer.tint.alpha : 100;
      layer.tinted = !!layer.tint;
      layer.invert_mask = !!layer.invert_mask;

      // image layer
      colorControls.detach();
      imageControls
        .classed("tinted", layer.tinted)
        .classed("masked", !!layer.mask)
        .attach(root)
        .bind(layer)
        .call(updateColorizeSwatch)
        .on("change", function() {
          d3.select(root).call(updateLayer);
          updateUrl();
        });
    }
  }

  /*
   * Remove the layer data by reference.
   */
  function removeLayer(layer) {
    d3.select(this).call(tooltip.hide);
    var index = layers.indexOf(layer);
    layers.splice(index, 1);
    updateLayers(true);
    detachControls();
  }

  function moveLayerUp(layer) {
    d3.select(this).call(tooltip.hide);
    var index = layers.indexOf(layer);
    layers.splice(index, 1);
    layers.splice(index - 1, 0, layer);
    updateLayers(true);
    detachControls();
  }

  function moveLayerDown(layer) {
    var index = layers.indexOf(layer);
    layers.splice(index, 1);
    layers.splice(index + 1, 0, layer);
    updateLayers(true);
    detachControls();
  }

  function detachControls() {
    imageControls.detach().unbind();
    colorControls.detach().unbind();
    layerPalette.detach();
  }

  function findParentWithClass(node, klass) {
    do {
      if (node && node.classList.contains(klass)) {
        return node;
      }
    } while (node = node.parentNode);
    return null;
  }

  function applyTint(d, filter) {
    d.tint = d.tinted
      ? {color: d.tint_color, alpha: d.tint_alpha}
      : null;
    updateUrl();
    imageControls.read(null, filter);
    imageControls.call(updateColorizeSwatch);
  }

  function updateColorizeSwatch(selection) {
    selection.select(".tint-swatch")
      .style("background-color", function(d) { return d.tint_color; })
      .style("opacity", function(d) { return d.tint_alpha / 100; });
  }

  function adjustTopLayer() {
    d3.select("#layers > .layer").each(adjustLayer);
  }

  function updateAttribution(stack) {
    var attrs = [];
    sando.eachLayer(stack, function(layer) {
      if (layer.url && layer.url in sourcesById) {
        var attr = sourcesById[layer.url].attribution;
        if (attr && attrs.indexOf(attr) === -1) {
          attrs.push(attr);
        }
      }
    });

    var items = d3.select("#attribution")
      .selectAll(".attr")
      .data(attrs.reverse());
    items.enter().append("li")
      .attr("class", "attr");
    items.exit().remove();
    items.text(function(d) { return d; });
  }

});