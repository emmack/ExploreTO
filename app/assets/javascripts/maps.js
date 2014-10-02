$(document).on('ready page:load', function () {

  var menu = $('.centered-navigation-menu');
  var menuToggle = $('.centered-navigation-menu-button');
  var signUp = $('.sign-up');

  $(menuToggle).on('click', function(e) {
    e.preventDefault();
    menu.slideToggle(function(){
      if(menu.is(':hidden')) {
        menu.removeAttr('style');
      }
    });
  });


L.mapbox.accessToken = 'pk.eyJ1IjoiZWNrb3R6ZXIiLCJhIjoiMndTTGtIdyJ9.14KHP67dI919VFxtfr9eIQ';
   var map = L.mapbox.map('map', 'eckotzer.4a2f194e')
    .setView([43.6525, -79.381667], 10);
var layers = document.getElementById('menu-ui');
var popup = new L.Popup({ autoPan: false });


var baselayer = L.geoJson(nodata,{
      style: getStyle,
      onEachFeature: onEachFeature
  }).addTo(map);

   function getStyle(feature) {
      return {
          weight: 2,
          opacity: 0.1,
          color: 'black',
          fillOpacity: 1,
          fillColor: 'white'
      };
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

      if (!popup._map) popup.openOn(map);
      window.clearTimeout(closeTooltip);

      // highlight feature
      layer.setStyle({
          weight: 1,
          opacity: 0.5,
          fillOpacity: 0.9
      });

      if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
      }
  }

  function mouseout(e) {
      baselayer.resetStyle(e.target);
      closeTooltip = window.setTimeout(function() {
          map.closePopup();
      }, 100);
  }

  function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }




var visminlayer = L.geoJson(vismin, {
      style: getStyle,
      onEachFeature: onEachFeature
  }).addTo(map);


  function getStyle(feature) {
      return {
          weight: 2,
          opacity: 0.1,
          color: 'black',
          fillOpacity: 1,
          fillColor: getColor(feature.properties.vismin)
      };
  }

    function getColor(d) {
      return d > 100  ? '#cc4c02' :
          d > 80 ? '#ec7014' :
          d > 60  ? '#fe9929' :
          d > 50   ? '#fec44f' :
          d > 40   ? '#fee391' :
          d > 20   ? '#fff7bc' :
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
      popup.setContent(layer.feature.properties.low_inc_CO + 'Percent visible minority');

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
      visminlayer.resetStyle(e.target);
      closeTooltip = window.setTimeout(function() {
          map.closePopup();
      }, 100);
  }

  function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }

  map.legendControl.addLegend(getLegendHTML());

  function getLegendHTML() {
    var grades = [0, 20, 40, 50, 60, 80, 100],
    labels = [],
    from, to;

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(
        '<li><span class="swatch" style="background:' + getColor(from + 1) + '"></span> ' +
        from + (to ? '&ndash;' + to : '+')) + '</li>';
    }

    return '<span>Percent visible minority.</span><ul>' + labels.join('') + '</ul>';
  }



//lowinc map
var lowinclayer = L.geoJson(lowincome, {
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
      lowinclayer.resetStyle(e.target);
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



// L.control.layers(baselayer, visminlayer, lowinclayer).addTo(map);


  var link = document.getElementById('clickingEvent')
    

  $(link).on('click', function(e) {
    e.preventDefault();
    var type = link.innerHTML;
    if (type = "Visible Minority"){
      map.addLayer(vismin);
    }
      else if (type = "Prevalence of Low Income"){
      map.addLayer(lowinclayer);
    };

  })


});



//  if (map.hasLayer(layer)) {
//             map.removeLayer(layer);
//             this.className = '';
//         } else {
//             map.addLayer(layer);
//             this.className = 'active';
//         }


