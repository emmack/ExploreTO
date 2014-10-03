$(document).on('ready page:load', function () {

  var menu = $('.centered-navigation-menu');
  var menuToggle = $('.centered-navigation-menu-button');
  var signUp = $('.sign-up');

  // $(menuToggle).on('click', function(e) {
  //   e.preventDefault();
  //   menu.slideToggle(function(){
  //     if(menu.is(':hidden')) {
  //       menu.removeAttr('style');
  //     }
  //   });
  // });


L.mapbox.accessToken = 'pk.eyJ1IjoiZWNrb3R6ZXIiLCJhIjoiMndTTGtIdyJ9.14KHP67dI919VFxtfr9eIQ';
   var map = L.mapbox.map('map', 'eckotzer.4a2f194e')
    .setView([43.6525, -79.381667], 10);
    var layers = document.getElementById('menu-ui');


var hues = [
   '#f1eef6',
'#d0d1e6',
'#a6bddb',
'#74a9cf',
'#2b8cbe',
'#045a8d'];


var popup = new L.Popup({ autoPan: false });


addLayer(L.geoJson(nodata,{
      style: getStyle,
      // onEachFeature: onEachFeature
  }), 'Base Map', 1);

addLayer(L.geoJson(vismin,{
      // style: getStyle,
      // onEachFeature: onEachFeature
  }), 'Visible Minority', 2);

addLayer(L.geoJson(lowinc,{
      style: getStyle,
      // onEachFeature: onEachFeature
  }), 'Low Income', 3);

 

  function getStyle(feature) {
    if(layer.name ==="nodata" ){
       return {
          weight: 2,
          opacity: 0.1,
          color: 'black',
          fillOpacity: 1,
          fillColor: white
      };
    }
      else if(layer.name ==="lowinc"){
      return {
          weight: 2,
          opacity: 0.1,
          color: 'black',
          fillOpacity: 1,
          fillColor: getColor(feature.properties.lowinc)
      };
    }
     else if(layer.name ==="vismin"){
      return {
          weight: 2,
          opacity: 0.1,
          color: 'black',
          fillOpacity: 1,
          fillColor: getColor(feature.properties.vismin)
      };
    }
  }

  function getColor(name, d) {
   if(name === 'Low Income'){
          return d > 60  ? '#cc4c02' :
          d > 50 ? '#ec7014' :
          d > 40  ? '#fe9929' :
          d > 30  ? '#fec44f' :
          d > 20   ? '#fee391' :
          d > 10  ? '#fff7bc' :
          '#ffffe5';
    }else if(name === 'Visible Minority'){
          return d > 100 ? '#ec7014' :
          d > 80  ? '#fe9929' :
          d > 60   ? '#fec44f' :
          d > 40   ? '#fee391' :
          d > 20   ? '#fff7bc' :
          '#ffffe5';
    }else{
      return false
    }
  }
  


 // function onEachFeature(feature, layer) {
 //      layer.on({
 //          // mousemove: mousemove,
 //          mouseout: mouseout,
 //          click: zoomToFeature
 //      });
 //  }

 var closeTooltip;

  // function mousemove(e) {
  //     var layer = e.target;

  //     if (name === 'Low Income') {
  //      var hover = layer.feature.properties.low_inc_CO;
  //      console.log(hover)
  //     }
  //     else if (name === 'Visible Minority'){
  //      var hover = layer.feature.properties.lots copy_;
  //     };
  //     else{
  //       return false
  //     }

  //     popup.setLatLng(e.latlng);
  //     popup.setContent(hover + name);

  //     if (!popup._map) popup.openOn(map);
  //     window.clearTimeout(closeTooltip);

  //     // highlight feature
  //     layer.setStyle({
  //         weight: 1,
  //         opacity: 0.3,
  //         fillOpacity: 0.9
  //     });

  //     if (!L.Browser.ie && !L.Browser.opera) {
  //         layer.bringToFront();
  //     }
  // }

  function mouseout(layer, e) {
     layer.resetStyle(e.target);
      closeTooltip = window.setTimeout(function() {
          map.closePopup();
      }, 100);
  }

  function zoomToFeature(e) {
      map.fitBounds(e.target.getBounds());
  }

  map.legendControl.addLegend(getLegendHTML());

  function getLegendHTML() {
     if(name === 'Low Income'){
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

    return '<span>Percent low income. </span><ul>' + labels.join('') + '</ul>';
  }

else if (name === 'Visible Minority'){
      var grades = [0, 20, 40, 60, 80, 100],
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
  else{
    return false
  }
  }



function addLayer(layer, name, zIndex) {

    layer
        .setZIndex(zIndex)
        .addTo(map);

    var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.innerHTML = name;

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = '';
        } else {
            map.addLayer(layer);
            this.className = 'active';
        }
    };

    layers.appendChild(link);
}

});





