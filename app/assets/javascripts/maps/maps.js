$(document).on('ready page:load', function () {


L.mapbox.accessToken = 'pk.eyJ1IjoiZWNrb3R6ZXIiLCJhIjoiMndTTGtIdyJ9.14KHP67dI919VFxtfr9eIQ';
var map = L.mapbox.map('map', 'eckotzer.4a2f194e')
    .setView([43.6525, -79.381667], 10);


var immigrantLayer = L.geoJson(torontoData,  {
      style: getStyleImmigrant,
      onEachFeature: onEachFeatureImmigrant
  })

 var visminLayer = L.geoJson(torontoData,  {
      style: getStyleVismin,
      onEachFeature: onEachFeatureVismin
  })

  var noeduLayer = L.geoJson(torontoData,  {
      style: getStyleNoedu,
      onEachFeature: onEachFeatureNoedu
  })





 


  function getStyleVismin(feature) {

      return {
        fillColor: getColorVismin(feature.properties.vismin),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
  }

  // get color depending on population density value
function getColorVismin(d) {
    return d > 100 ? '#E31A1C' :
           d > 80  ? '#FC4E2A' :
           d > 60   ? '#FD8D3C' :
           d > 40   ? '#FEB24C' :
           d > 20   ? '#FED976' :
                      '#FFEDA0';
}



  function highlightFeatureVismin(e) {
    var layer = e.target;
    infoVismin.update(layer.feature.properties);

    layer.setStyle({
        weight: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}




function resetHighlightVismin(e) {
   visminLayer.resetStyle(e.target);
    infoVismin.update();
}


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeatureVismin(feature, layer) {
    layer.on({
        mouseover: highlightFeatureVismin,
        mouseout: resetHighlightVismin,
        click: zoomToFeature
    });
}






var infoVismin = L.control();

infoVismin.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoVismin.update = function (props) {
    this._div.innerHTML = '<h4>Percent vismin Population</h4>' +  (props ?
        '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.vismin + '%'
        : 'Hover over a census tract');
};






  function getStyleImmigrant(feature) {

      return {
        fillColor: getColorImmigrant(feature.properties.immigrant),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
  }

  // get color depending on population density value
function getColorImmigrant(d) {
    return d > 100 ? '#E31A1C' :
           d > 80  ? '#FC4E2A' :
           d > 60   ? '#FD8D3C' :
           d > 40   ? '#FEB24C' :
           d > 20   ? '#FED976' :
                      '#FFEDA0';
}



  function highlightFeatureImmigrant(e) {
    var layer = e.target;
    infoImmigrant.update(layer.feature.properties);

    layer.setStyle({
        weight: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}




function resetHighlightImmigrant(e) {
   immigrantLayer.resetStyle(e.target);
    // info.update();
}



function onEachFeatureImmigrant(feature, layer) {
    layer.on({
        mouseover: highlightFeatureImmigrant,
        mouseout: resetHighlightImmigrant,
        click: zoomToFeature
    });
}






var infoImmigrant = L.control();

infoImmigrant.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoImmigrant.update = function (props) {
    this._div.innerHTML = '<h4>Percent Immigrant Population</h4>' +  (props ?
        '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.vismin + '%'
        : 'Hover over a census tract');
};



  function getStyleNoedu(feature) {

      return {
        fillColor: getColorNoedu(feature.properties.nocert),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
  }

  // get color depending on population density value
function getColorNoedu(d) {
    return  d > 30 ? '#f2f0f7':
  d > 25 ? '#dadaeb':
   d > 20 ? '#bcbddc':
    d > 15 ? '#9e9ac8':
     d > 10 ? '#807dba':
     d > 5 ? '#6a51a3':
              '#4a1486';
            }


  function highlightFeatureNoedu(e) {
    var layer = e.target;
    infoNoedu.update(layer.feature.properties);

    layer.setStyle({
        weight: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}




function resetHighlightNoedu(e) {
   noeduLayer.resetStyle(e.target);
    infoVismin.update();
}


function onEachFeatureNoedu(feature, layer) {
    layer.on({
        mouseover: highlightFeatureNoedu,
        mouseout: resetHighlightNoedu,
        click: zoomToFeature
    });
}






var infoNoedu = L.control();

infoNoedu.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoNoedu.update = function (props) {
    this._div.innerHTML = '<h4>Percent no education certificate</h4>' +  (props ?
        '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.nocert + '%'
        : 'Hover over a census tract');
};


var ui = document.getElementById('layerControls');
console.log(immigrantLayer)
addLayer(visminLayer, 'vismin', 1, infoVismin);
addLayer(immigrantLayer, 'immigrant', 2, infoImmigrant);
addLayer(noeduLayer, 'noedu', 3, infoNoedu);



function addLayer(layer, name, zIndex, info) {
  layer.setZIndex(zIndex);
  // Create a simple layer switcher that toggles layers on
  // and off.
  var link = document.createElement('a');
  link.href = '#';
  link.className = 'btn btn-primary btn-sm';
  link.type = 'button';
  link.innerHTML = name;
  info.addTo(map)
  link.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (map.hasLayer(layer)) {
      map.removeLayer(layer);
      this.className = 'btn btn-primary btn-sm';
    } else {
      map.addLayer(layer);
      this.className = 'active btn btn-primary btn-sm';
    }
  };
  ui.appendChild(link);
};
// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 20, 40, 60, 80, 100],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(map);






});





