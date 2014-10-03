(function(exports) {

  var formation = d3.formation = function(selector) {
    var data = {},
        form = d3.select(selector)
          .on("submit.formation", function(d) {
            d3.event.preventDefault();
            return false;
          }),
        elements = form.selectAll("input[name], select[name], *[data-key]")
          .on("change.formation", change);

    /*
    elements.filter("input[type=radio]")
      .on("click.formation", change);
    */

    function change(d) {
      if (d) {
        var result = updateDataFromElement(d, this);
        if (result === null) return;
      }
      var that = this,
          key = getFormKey(this),
          value = getFormValue(this);
      form.selectAll("input[data-key]")
        .each(function() {
          if (this !== that && getFormKey(this) === key) {
            setFormValue(this, value);
          }
        });
    }

    form.selectAll("a.close")
      .on("click.formation", function() {
        form.detach().unbind();
      });

    form.attach = function(root) {
      var node = form.classed("attached", true).node();
      root.appendChild(node);
      return form.resize();
    };

    form.detach = function(root) {
      var node = form.classed("attached", false).node();
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
      return form;
    };

    form.resize = function() {
      return form.style("margin-top", ~~(-form.property("offsetHeight") / 2) + "px");
    };

    form.bind = function(d) {
      form.datum(d);
      elements.datum(d);
      form.read(d);
      return form;
    };

    form.unbind = function() {
      return form.bind({});
    };

    form.read = function(d, filter) {
      if (!d) d = form.datum();
      var inputs = elements;
      if (filter) inputs = inputs.filter(filter);
      inputs.each(function() {
        var key = getFormKey(this),
            val = getDataValue(d, key);
        if (typeof val === "undefined" || val === null) {
          updateDataFromElement(d, this);
        } else {
          setFormValue(this, val);
        }
      });
      return form;
    };

    form.write = function(d) {
      elements.each(function() {
        updateDataFromElement(d, this);
      });
      return form;
    };

    function getFormKey(element) {
      return element.name || element.getAttribute("data-key");
    }

    function updateDataFromElement(d, element) {
      if (element.type === "radio" && !element.checked) {
        console.log("not applying radio input:", element.value, element.checked);
        return;
      }
      var key = element.name || element.getAttribute("data-key"),
          val = getFormValue(element);
      return setDataValue(d, key, val);
    }

    function getFormValue(element) {
      switch (element.nodeName) {
        case "select":
          return element.options[element.selectedIndex].value;
      }
      switch (element.type) {
        case "checkbox":
          return element.checked;
        case "range":
          return +element.value;
      }
      var value = element.value;
      switch (value) {
        case "true": return true;
        case "false": return false;
      }
      return value;
    }

    function setFormValue(element, value) {
      switch (element.nodeName) {
        case "select":
          return d3.select(element).selectAll("option")
            .attr("selected", function() {
              return this.value == value ? "selected" : null;
            });
      }
      switch (element.type) {
        case "checkbox":
          return element.checked = !!value;
        case "radio":
          return element.checked = String(value) === element.value;
      }
      return element.value = value;
    }

    function getDataValue(d, key) {
      if (key.indexOf(".") !== -1) {
        var bits = key.split("."),
            part = bits[1];
        key = bits[0];
        var val = d[key];
        switch (part) {
          case "h":
          case "s":
          case "l":
            var rgb = d3.rgb(val),
                hsl = d3.hsl(rgb);
            return (part === "h")
              ? Math.round(hsl[part])
              : Math.round(hsl[part] * 100);
          case "r":
          case "g":
          case "b":
            var rgb = d3.rgb(val);
            return rgb[part];
        }
      }
      return d[key];
    }

    function setDataValue(d, key, val) {
      if (key.indexOf(".") !== -1) {
        var bits = key.split("."),
            part = bits[1];
        key = bits[0];
        switch (part) {
          case "h":
          case "s":
          case "l":
            var hsl = d.hsl;
            if (!hsl) {
              hsl = d.hsl = d3.hsl(d3.rgb(d[key]));
            }
            hsl[part] = (part === "h")
              ? val
              : val / 100;
            return d[key] = hsl.toString();
          case "r":
          case "g":
          case "b":
            var rgb = d3.rgb(d[key]);
            rgb[part] = val;
            return d[key] = rgb.toString();
        }
      }
      return d[key] = val;
    }

    return form;
  };

})(this);