$(document).ready(function(){


L.mapbox.accessToken = 'pk.eyJ1IjoiZWNrb3R6ZXIiLCJhIjoiMndTTGtIdyJ9.14KHP67dI919VFxtfr9eIQ';
   var map = L.mapbox.map('map', 'eckotzer.4a2f194e')
    .setView([43.6525, -79.381667], 10);

var popup = new L.Popup({ autoPan: false });

var dataLayer = L.geoJson(lowincome,  {
      style: getStyle,
      onEachFeature: onEachFeature
  }).addTo(map);



  function getStyle(feature) {
      return {
          weight: 2,
          opacity: 0.1,
          color: 'black',
          fillOpacity: 1,
          fillColor: getColor(feature.properties.low_inc_CO)
      };
  }

    function getColor(d) {
      return d > 60  ? '#cc4c02' :
          d > 50 ? '#ec7014' :
          d > 40  ? '#fe9929' :
          d > 30   ? '#fec44f' :
          d > 20   ? '#fee391' :
          d > 10   ? '#fff7bc' :
          '#ffffe5';
  }


 function onEachFeature(feature, layer) {
      layer.on({
          mousemove: mousemove,
          mouseout: mouseout,
          click: zoomToFeature
      });
  }

 var closeTooltip;

  function mousemove(e) {
      var layer = e.target;

      popup.setLatLng(e.latlng);
      popup.setContent(layer.feature.properties.low_inc_CO + 'Prevalence of low income in 2010 based on after-tax low-income measure');

      if (!popup._map) popup.openOn(map);
      window.clearTimeout(closeTooltip);

      // highlight feature
      layer.setStyle({
          weight: 1,
          opacity: 0.3,
          fillOpacity: 0.9
      });

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }
  }

  function mouseout(e) {
      dataLayer.resetStyle(e.target);
      closeTooltip = window.setTimeout(function() {
          map.closePopup();
      }, 100);
  }

  function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }

  map.legendControl.addLegend(getLegendHTML());

  function getLegendHTML() {
    var grades = [0, 10, 20, 30, 40, 50, 60],
    labels = [],
    from, to;

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(
        '<li><span class="swatch" style="background:' + getColor(from + 1) + '"></span> ' +
        from + (to ? '&ndash;' + to : '+')) + '</li>';
    }

    return '<span>Prevalence of low income in 2010 based on after-tax low-income measure</span><ul>' + labels.join('') + '</ul>';
  }

});





