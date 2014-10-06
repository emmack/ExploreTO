$(document).on('ready page:load', function () {

//initializing map 
L.mapbox.accessToken = 'pk.eyJ1IjoiZWNrb3R6ZXIiLCJhIjoidTVwZDdCOCJ9.NKe9dqQ5Mitv2QYu9-dLJA';
var map = L.mapbox.map('map', 'eckotzer.4a2f194e')
    .setView([43.6525, -79.381667], 10);


//layers
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

   var highschoolLayer = L.geoJson(torontoData,  {
      style: getStyleHighschool,
      onEachFeature: onEachFeatureHighschool
  })

   var universityLayer = L.geoJson(torontoData,  {
      style: getStyleUniversity,
      onEachFeature: onEachFeatureUniversity
  })

     var populationLayer = L.geoJson(torontoData,  {
      style: getStylePopulation,
      onEachFeature: onEachFeaturePopulation
  })

          var popchangeLayer = L.geoJson(torontoData,  {
      style: getStylePopchange,
      onEachFeature: onEachFeaturePopchange
  })


  var densityLayer = L.geoJson(torontoData,  {
      style: getStyleDensity,
      onEachFeature: onEachFeatureDensity
  })

  var unemploymentLayer = L.geoJson(torontoData,  {
      style: getStyleUnemployment,
      onEachFeature: onEachFeatureUnemployment
  })

    var carLayer = L.geoJson(torontoData,  {
      style: getStyleCar,
      onEachFeature: onEachFeatureCar
  })

//used for all variables 


    function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}


  function getStyleVismin(feature) {
    return {
      fillColor: getColorVismin(feature.properties.vismin),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }
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

function onEachFeatureVismin(feature, layer) {
    layer.on({
        mouseover: highlightFeatureVismin,
        mouseout: resetHighlightVismin,
        click: zoomToFeature
    });
}

var infoVismin = L.control();

infoVismin.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); 
    this.update();
    return this._div;
};

infoVismin.update = function (props) {
    this._div.innerHTML = '<h4>Percent vismin Population</h4>' +  (props ?
        '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.vismin + '%'
        : 'Hover over a census tract');
};
console.log(infoVismin)

//immigrant variable 
  function getStyleImmigrant(feature) {

      return {
        fillColor: getColorImmigrant(feature.properties.immigrant),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
  }

function getColorImmigrant(d) {
    return d > 100 ? '#edf8e9' :
           d > 80  ? '#c7e9c0' :
           d > 60   ? '#a1d99b' :
           d > 40   ? '#74c476' :
           d > 20   ? '#31a354' :
                      '#006d2c';
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
    infoImmigrant.update();
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

infoImmigrant.update = function (props) {
    this._div.innerHTML = '<h4>Percent Immigrant Population</h4>' +  (props ?
        '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.vismin + '%'
        : 'Hover over a census tract');
};


//no education
  function getStyleNoedu(feature) {
      return {
        fillColor: getColorNoedu(feature.properties.nocert),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
  }
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
    infoNoedu.update();
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

//highschool
  function getStyleHighschool(feature) {
      return {
        fillColor: getColorHighschool(feature.properties.nocert),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
  }
function getColorHighschool(d) {
    return  d > 30 ? '#f2f0f7':
  d > 25 ? '#dadaeb':
   d > 20 ? '#bcbddc':
    d > 15 ? '#9e9ac8':
     d > 10 ? '#807dba':
     d > 5 ? '#6a51a3':
              '#4a1486';
            }
  function highlightFeatureHighschool(e) {
    var layer = e.target;
    infoHighschool.update(layer.feature.properties);

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
function resetHighlightHighschool(e) {
   highschoolLayer.resetStyle(e.target);
    infoHighschool.update();
}
function onEachFeatureHighschool(feature, layer) {
    layer.on({
        mouseover: highlightFeatureHighschool,
        mouseout: resetHighlightHighschool,
        click: zoomToFeature
    });
}
var infoHighschool = L.control();

infoHighschool.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoHighschool.update = function (props) {
    this._div.innerHTML = '<h4>Percent highschool certificate</h4>' +  (props ?
        '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.highschool + '%'
        : 'Hover over a census tract');
};

//university
  function getStyleUniversity(feature) {
      return {
        fillColor: getColorUniversity(feature.properties.university),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
  }
function getColorUniversity(d) {
    return  d > 30 ? '#f2f0f7':
  d > 25 ? '#dadaeb':
   d > 20 ? '#bcbddc':
    d > 15 ? '#9e9ac8':
     d > 10 ? '#807dba':
     d > 5 ? '#6a51a3':
              '#4a1486';
            }
  function highlightFeatureUniversity(e) {
    var layer = e.target;
    infoUniversity.update(layer.feature.properties);

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
function resetHighlightUniversity(e) {
   universityLayer.resetStyle(e.target);
    infoUniversity.update();
}
function onEachFeatureUniversity(feature, layer) {
    layer.on({
        mouseover: highlightFeatureUniversity,
        mouseout: resetHighlightUniversity,
        click: zoomToFeature
    });
}
var infoUniversity = L.control();

infoUniversity.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoUniversity.update = function (props) {
    this._div.innerHTML = '<h4>Percent Post Secondary Degree</h4>' +  (props ?
        '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.university + '%'
        : 'Hover over a census tract');
};


//population
  function getStylePopulation(feature) {
      return {
        fillColor: getColorPopulation(feature.properties.population),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
  }
function getColorPopulation(d) {
    return  d > 30 ? '#f2f0f7':
  d > 25 ? '#dadaeb':
   d > 20 ? '#bcbddc':
    d > 15 ? '#9e9ac8':
     d > 10 ? '#807dba':
     d > 5 ? '#6a51a3':
              '#4a1486';
            }
  function highlightFeaturePopulation(e) {
    var layer = e.target;
    infoPopulation.update(layer.feature.properties);

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
function resetHighlightPopulation(e) {
   populationLayer.resetStyle(e.target);
    infoPopulation.update();
}
function onEachFeaturePopulation(feature, layer) {
    layer.on({
        mouseover: highlightFeaturePopulation,
        mouseout: resetHighlightPopulation,
        click: zoomToFeature
    });
}
var infoPopulation = L.control();

infoPopulation.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoPopulation.update = function (props) {
    this._div.innerHTML = '<h4>Total Population</h4>' +  (props ?
        '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.population + '%'
        : 'Hover over a census tract');
};


//popchange
  function getStylePopchange(feature) {
      return {
        fillColor: getColorPopchange(feature.properties.popChange),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
  }
function getColorPopchange(d) {
    return  d > 30 ? '#f2f0f7':
  d > 25 ? '#dadaeb':
   d > 20 ? '#bcbddc':
    d > 15 ? '#9e9ac8':
     d > 10 ? '#807dba':
     d > 5 ? '#6a51a3':
              '#4a1486';
            }
  function highlightFeaturePopchange(e) {
    var layer = e.target;
    infoPopchange.update(layer.feature.properties);

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
function resetHighlightPopchange(e) {
   popchangeLayer.resetStyle(e.target);
    infoPopchange.update();
}
function onEachFeaturePopchange(feature, layer) {
    layer.on({
        mouseover: highlightFeaturePopchange,
        mouseout: resetHighlightPopchange,
        click: zoomToFeature
    });
}
var infoPopchange = L.control();

infoPopchange.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoPopchange.update = function (props) {
    this._div.innerHTML = '<h4>Total population change (2006-2011)</h4>' +  (props ?
        '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.popChange + '%'
        : 'Hover over a census tract');
};

//density
  function getStyleDensity(feature) {
      return {
        fillColor: getColorDensity(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
  }
function getColorDensity(d) {
    return  d > 30 ? '#f2f0f7':
  d > 25 ? '#dadaeb':
   d > 20 ? '#bcbddc':
    d > 15 ? '#9e9ac8':
     d > 10 ? '#807dba':
     d > 5 ? '#6a51a3':
              '#4a1486';
            }
  function highlightFeatureDensity(e) {
    var layer = e.target;
    infoDensity.update(layer.feature.properties);

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
function resetHighlightDensity(e) {
   densityLayer.resetStyle(e.target);
    infoDensity.update();
}
function onEachFeatureDensity(feature, layer) {
    layer.on({
        mouseover: highlightFeatureDensity,
        mouseout: resetHighlightDensity,
        click: zoomToFeature
    });
}
var infoDensity = L.control();

infoDensity.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoDensity.update = function (props) {
    this._div.innerHTML = '<h4>Total population density</h4>' +  (props ?
        '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.density + '%'
        : 'Hover over a census tract');
};


//unemployment
  function getStyleUnemployment(feature) {
      return {
        fillColor: getColorUnemployment(feature.properties.unemployment),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
  }
function getColorUnemployment(d) {
    return  d > 30 ? '#f2f0f7':
  d > 25 ? '#dadaeb':
   d > 20 ? '#bcbddc':
    d > 15 ? '#9e9ac8':
     d > 10 ? '#807dba':
     d > 5 ? '#6a51a3':
              '#4a1486';
            }
  function highlightFeatureUnemployment(e) {
    var layer = e.target;
    infoUnemployment.update(layer.feature.properties);

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
function resetHighlightUnemployment(e) {
   unemploymentLayer.resetStyle(e.target);
    infoUnemployment.update();
}
function onEachFeatureUnemployment(feature, layer) {
    layer.on({
        mouseover: highlightFeatureUnemployment,
        mouseout: resetHighlightUnemployment,
        click: zoomToFeature
    });
}
var infoUnemployment = L.control();

infoUnemployment.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoUnemployment.update = function (props) {
    this._div.innerHTML = '<h4>Unemployment Rate(%)</h4>' +  (props ?
        '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.unemployment + '% Unemployment'
        : 'Hover over a census tract');
};

//car
  function getStyleCar(feature) {
      return {
        fillColor: getColorCar(feature.properties.car),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
  }
function getColorCar(d) {
    return  d > 120 ? '#f2f0f7':
  d > 100 ? '#dadaeb':
   d > 80 ? '#bcbddc':
    d > 60 ? '#9e9ac8':
     d > 40 ? '#807dba':
     d > 20 ? '#6a51a3':
              '#4a1486';
            }
  function highlightFeatureCar(e) {
    var layer = e.target;
    infoCar.update(layer.feature.properties);

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
function resetHighlightCar(e) {
   carLayer.resetStyle(e.target);
    infoCar.update();
}
function onEachFeatureCar(feature, layer) {
    layer.on({
        mouseover: highlightFeatureCar,
        mouseout: resetHighlightCar,
        click: zoomToFeature
    });
}
var infoCar = L.control();

infoCar.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoCar.update = function (props) {
    this._div.innerHTML = '<h4>Car as commute transportation (%)</h4>' +  (props ?
        '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.car + '% car'
        : 'Hover over a census tract');
};

var info;
//menu
  var ui = document.getElementById('layerControls');
  console.log(immigrantLayer)
  addLayer(visminLayer, 'Visible Minority Population', 1, infoVismin);
  addLayer(immigrantLayer, 'Immigrant Population', 2, infoImmigrant);
  addLayer(noeduLayer, 'No Education Certificate', 3, infoNoedu);
  addLayer(highschoolLayer, 'Highschool Certificate', 4, infoHighschool);
  addLayer(universityLayer, 'University Degree', 5, infoUniversity);
  addLayer(populationLayer, 'Total Population', 6, infoPopulation);
  addLayer(popchangeLayer, 'Population Change', 7, infoPopchange);
  addLayer(densityLayer, 'Population Density', 8, infoDensity);
  addLayer(unemploymentLayer, 'Percent Unemployment', 9, infoUnemployment);
    addLayer(carLayer, 'Car Transportation', 10, infoCar);

function addLayer(layer, name, zIndex, info) {
  layer.setZIndex(zIndex);
 
  var link = document.createElement('a');
  link.href = '#';
  link.className = 'btn btn-primary btn-sm';
  link.type = 'button';
  link.innerHTML = name;
  link.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (map.hasLayer(layer)) {
      map.removeLayer(layer);
      info.removeFrom(map)
      this.className = 'btn btn-primary btn-sm';
    } else {
      map.addLayer(layer);
      info.addTo(map)
      this.className = 'active btn btn-primary btn-sm';
    }
  };
  ui.appendChild(link);
};




});





