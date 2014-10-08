$(document).on('ready page:load', function() {
  $(window).load(function() {
    $(".loader").fadeOut("slow");
  });
  //initializing map
  L.mapbox.accessToken = 'pk.eyJ1IjoiZWNrb3R6ZXIiLCJhIjoidTVwZDdCOCJ9.NKe9dqQ5Mitv2QYu9-dLJA';
  var map = L.mapbox.map('map', 'eckotzer.4a2f194e')
    .setView([43.6525, -79.381667], 10);

  //layers
  var immigrantLayer = L.geoJson(torontoData, {
    style: getStyleImmigrant,
    onEachFeature: onEachFeatureImmigrant
  })

  var visminLayer = L.geoJson(torontoData, {
    style: getStyleVismin,
    onEachFeature: onEachFeatureVismin
  })

  var noeduLayer = L.geoJson(torontoData, {
    style: getStyleNoedu,
    onEachFeature: onEachFeatureNoedu
  })

  var highschoolLayer = L.geoJson(torontoData, {
    style: getStyleHighschool,
    onEachFeature: onEachFeatureHighschool
  })

  var universityLayer = L.geoJson(torontoData, {
    style: getStyleUniversity,
    onEachFeature: onEachFeatureUniversity
  })

  var populationLayer = L.geoJson(torontoData, {
    style: getStylePopulation,
    onEachFeature: onEachFeaturePopulation
  })

  var popchangeLayer = L.geoJson(torontoData, {
    style: getStylePopchange,
    onEachFeature: onEachFeaturePopchange
  })


  var densityLayer = L.geoJson(torontoData, {
    style: getStyleDensity,
    onEachFeature: onEachFeatureDensity
  })

  var unemploymentLayer = L.geoJson(torontoData, {
    style: getStyleUnemployment,
    onEachFeature: onEachFeatureUnemployment
  })

  var carLayer = L.geoJson(torontoData, {
    style: getStyleCar,
    onEachFeature: onEachFeatureCar
  })
  var ptLayer = L.geoJson(torontoData, {
    style: getStylePt,
    onEachFeature: onEachFeaturePt
  })

  var walkLayer = L.geoJson(torontoData, {
    style: getStyleWalk,
    onEachFeature: onEachFeatureWalk
  })

  var medcommuteLayer = L.geoJson(torontoData, {
    style: getStyleMedcommute,
    onEachFeature: onEachFeatureMedcommute
  })

  var homeOwnerLayer = L.geoJson(torontoData, {
    style: getStyleHomeown,
    onEachFeature: onEachFeatureHomeown
  })
  var homeRenterLayer = L.geoJson(torontoData, {
    style: getStyleHomerent,
    onEachFeature: onEachFeatureHomerent
  })

  var over30Layer = L.geoJson(torontoData, {
    style: getStyleOver30,
    onEachFeature: onEachFeatureOver30
  })
  var under30Layer = L.geoJson(torontoData, {
    style: getStyleUnder30,
    onEachFeature: onEachFeatureUnder30
  })

  var medOwnLayer = L.geoJson(torontoData, {
    style: getStyleMedown,
    onEachFeature: onEachFeatureMedown
  })
  var medRentLayer = L.geoJson(torontoData, {
    style: getStyleMedrent,
    onEachFeature: onEachFeatureMedrent
  })
  var topIncomeLayer = L.geoJson(torontoData, {
    style: getStyleTopincome,
    onEachFeature: onEachFeatureTopincome
  })
  var bottomIncomeLayer = L.geoJson(torontoData, {
    style: getStyleBottomincome,
    onEachFeature: onEachFeatureBottomincome
  })
  var lowIncomeLayer = L.geoJson(torontoData, {
    style: getStyleLowincome,
    onEachFeature: onEachFeatureLowincome
  })
  var medIncomeLayer = L.geoJson(torontoData, {
      style: getStyleMedincome,
      onEachFeature: onEachFeatureMedincome
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
      d > 80 ? '#FC4E2A' :
      d > 60 ? '#FD8D3C' :
      d > 40 ? '#FEB24C' :
      d > 20 ? '#FED976' :
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

  infoVismin.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  infoVismin.update = function(props) {
    this._div.innerHTML = '<h4>Percent vismin Population</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.vismin + '%' : 'Hover over a census tract');
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
      d > 80 ? '#c7e9c0' :
      d > 60 ? '#a1d99b' :
      d > 40 ? '#74c476' :
      d > 20 ? '#31a354' :
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

  infoImmigrant.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  infoImmigrant.update = function(props) {
    this._div.innerHTML = '<h4>Percent Immigrant Population</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.vismin + '%' : 'Hover over a census tract');
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
    return d > 30 ? '#f2f0f7' :
      d > 25 ? '#dadaeb' :
      d > 20 ? '#bcbddc' :
      d > 15 ? '#9e9ac8' :
      d > 10 ? '#807dba' :
      d > 5 ? '#6a51a3' :
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

  infoNoedu.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  infoNoedu.update = function(props) {
    this._div.innerHTML = '<h4>Percent no education certificate</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.nocert + '%' : 'Hover over a census tract');
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
    return d > 30 ? '#f2f0f7' :
      d > 25 ? '#dadaeb' :
      d > 20 ? '#bcbddc' :
      d > 15 ? '#9e9ac8' :
      d > 10 ? '#807dba' :
      d > 5 ? '#6a51a3' :
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

  infoHighschool.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  infoHighschool.update = function(props) {
    this._div.innerHTML = '<h4>Percent highschool certificate</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.highschool + '%' : 'Hover over a census tract');
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
    return d > 30 ? '#f2f0f7' :
      d > 25 ? '#dadaeb' :
      d > 20 ? '#bcbddc' :
      d > 15 ? '#9e9ac8' :
      d > 10 ? '#807dba' :
      d > 5 ? '#6a51a3' :
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

  infoUniversity.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  infoUniversity.update = function(props) {
    this._div.innerHTML = '<h4>Percent Post Secondary Degree</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.university + '%' : 'Hover over a census tract');
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
    return d > 30 ? '#f2f0f7' :
      d > 25 ? '#dadaeb' :
      d > 20 ? '#bcbddc' :
      d > 15 ? '#9e9ac8' :
      d > 10 ? '#807dba' :
      d > 5 ? '#6a51a3' :
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

  infoPopulation.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  infoPopulation.update = function(props) {
    this._div.innerHTML = '<h4>Total Population</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.population + '%' : 'Hover over a census tract');
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
    return d > 30 ? '#f2f0f7' :
      d > 25 ? '#dadaeb' :
      d > 20 ? '#bcbddc' :
      d > 15 ? '#9e9ac8' :
      d > 10 ? '#807dba' :
      d > 5 ? '#6a51a3' :
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

  infoPopchange.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  infoPopchange.update = function(props) {
    this._div.innerHTML = '<h4>Total population change (2006-2011)</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.popChange + '%' : 'Hover over a census tract');
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
    return d > 30 ? '#f2f0f7' :
      d > 25 ? '#dadaeb' :
      d > 20 ? '#bcbddc' :
      d > 15 ? '#9e9ac8' :
      d > 10 ? '#807dba' :
      d > 5 ? '#6a51a3' :
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

  infoDensity.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  infoDensity.update = function(props) {
    this._div.innerHTML = '<h4>Total population density</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.density + '%' : 'Hover over a census tract');
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
    return d > 30 ? '#f2f0f7' :
      d > 25 ? '#dadaeb' :
      d > 20 ? '#bcbddc' :
      d > 15 ? '#9e9ac8' :
      d > 10 ? '#807dba' :
      d > 5 ? '#6a51a3' :
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

  infoUnemployment.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  infoUnemployment.update = function(props) {
    this._div.innerHTML = '<h4>Unemployment Rate(%)</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.unemployment + '% Unemployment' : 'Hover over a census tract');
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
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
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

  infoCar.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  infoCar.update = function(props) {
    this._div.innerHTML = '<h4>Car as commute transportation (%)</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.car + '% ' : 'Hover over a census tract');
  };
  //car
  function getStylePt(feature) {
    return {
      fillColor: getColorPt(feature.properties.car),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorPt(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeaturePt(e) {
    var layer = e.target;
    infoPt.update(layer.feature.properties);

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

  function resetHighlightPt(e) {
    ptLayer.resetStyle(e.target);
    infoPt.update();
  }

  function onEachFeaturePt(feature, layer) {
    layer.on({
      mouseover: highlightFeaturePt,
      mouseout: resetHighlightPt,
      click: zoomToFeature
    });
  }
  var infoPt = L.control();

  infoPt.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoPt.update = function(props) {
    this._div.innerHTML = '<h4>Public transit as commute transportation (%)</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.publictrans + '% ' : 'Hover over a census tract');
  };

  //car
  function getStyleWalk(feature) {
    return {
      fillColor: getColorWalk(feature.properties.walk),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorWalk(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeatureWalk(e) {
    var layer = e.target;
    infoWalk.update(layer.feature.properties);

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

  function resetHighlightWalk(e) {
    walkLayer.resetStyle(e.target);
    infoWalk.update();
  }

  function onEachFeatureWalk(feature, layer) {
    layer.on({
      mouseover: highlightFeatureWalk,
      mouseout: resetHighlightWalk,
      click: zoomToFeature
    });
  }
  var infoWalk = L.control();

  infoWalk.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoWalk.update = function(props) {
    this._div.innerHTML = '<h4>Walking as commute transportation (%)</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.walk + '% ' : 'Hover over a census tract');
  };

  //car
  function getStyleMedcommute(feature) {
    return {
      fillColor: getColorMedcommute(feature.properties.medcommute),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorMedcommute(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeatureMedcommute(e) {
    var layer = e.target;
    infoMedcommute.update(layer.feature.properties);

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

  function resetHighlightMedcommute(e) {
    medcommuteLayer.resetStyle(e.target);
    infoMedcommute.update();
  }

  function onEachFeatureMedcommute(feature, layer) {
    layer.on({
      mouseover: highlightFeatureMedcommute,
      mouseout: resetHighlightMedcommute,
      click: zoomToFeature
    });
  }
  var infoMedcommute = L.control();

  infoMedcommute.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoMedcommute.update = function(props) {
    this._div.innerHTML = '<h4>Median commute time</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.medcommute + ' minutes' : 'Hover over a census tract');
  };


  //car
  function getStyleHomeown(feature) {
    return {
      fillColor: getColorHomeown(feature.properties.homeOwn),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorHomeown(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeatureHomeown(e) {
    var layer = e.target;
    infoHomeown.update(layer.feature.properties);

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

  function resetHighlightHomeown(e) {
    homeOwnLayer.resetStyle(e.target);
    infoHomeown.update();
  }

  function onEachFeatureHomeown(feature, layer) {
    layer.on({
      mouseover: highlightFeatureHomeown,
      mouseout: resetHighlightHomeown,
      click: zoomToFeature
    });
  }
  var infoHomeown = L.control();

  infoHomeown.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoHomeown.update = function(props) {
    this._div.innerHTML = '<h4>Percent home ownership</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.homeOwn + '%' : 'Hover over a census tract');
  };



  //car
  function getStyleHomerent(feature) {
    return {
      fillColor: getColorHomerent(feature.properties.homeRent),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorHomerent(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeatureHomerent(e) {
    var layer = e.target;
    infoHomerent.update(layer.feature.properties);

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

  function resetHighlightHomerent(e) {
    homeRentLayer.resetStyle(e.target);
    infoHomerent.update();
  }

  function onEachFeatureHomerent(feature, layer) {
    layer.on({
      mouseover: highlightFeatureHomerent,
      mouseout: resetHighlightHomerent,
      click: zoomToFeature
    });
  }
  var infoHomerent = L.control();

  infoHomerent.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoHomerent.update = function(props) {
    this._div.innerHTML = '<h4>Percent home rentals</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.homeRent + '%' : 'Hover over a census tract');
  };


  //car
  function getStyleMedown(feature) {
    return {
      fillColor: getColorMedown(feature.properties.medOwnPay),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorMedown(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeatureMedown(e) {
    var layer = e.target;
    infoMedown.update(layer.feature.properties);

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

  function resetHighlightMedown(e) {
    medOwnLayer.resetStyle(e.target);
    infoMedown.update();
  }

  function onEachFeatureMedown(feature, layer) {
    layer.on({
      mouseover: highlightFeatureMedown,
      mouseout: resetHighlightMedown,
      click: zoomToFeature
    });
  }
  var infoMedown = L.control();

  infoMedown.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoMedown.update = function(props) {
    this._div.innerHTML = '<h4>Median home mortgage price</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.medOwnPay + 'dollars' : 'Hover over a census tract');
  };

  //car
  function getStyleMedrent(feature) {
    return {
      fillColor: getColorMedrent(feature.properties.medRentPay),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorMedrent(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeatureMedrent(e) {
    var layer = e.target;
    infoMedrent.update(layer.feature.properties);

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

  function resetHighlightMedrent(e) {
    medRentLayer.resetStyle(e.target);
    infoMedrent.update();
  }

  function onEachFeatureMedrent(feature, layer) {
    layer.on({
      mouseover: highlightFeatureMedrent,
      mouseout: resetHighlightMedrent,
      click: zoomToFeature
    });
  }


  var infoMedrent = L.control();

  infoMedrent.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoMedrent.update = function(props) {
    this._div.innerHTML = '<h4>Median home rental payments</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.medRentPay + ' dollars' : 'Hover over a census tract');
  };

  //car
  function getStyleOver30(feature) {
    return {
      fillColor: getColorOver30(feature.properties.over30),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorOver30(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeatureOver30(e) {
    var layer = e.target;
    infoOver30.update(layer.feature.properties);

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

  function resetHighlightOver30(e) {
    over30Layer.resetStyle(e.target);
    infoOver30.update();
  }

  function onEachFeatureOver30(feature, layer) {
    layer.on({
      mouseover: highlightFeatureOver30,
      mouseout: resetHighlightOver30,
      click: zoomToFeature
    });
  }


  var infoOver30 = L.control();

  infoOver30.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoOver30.update = function(props) {
    this._div.innerHTML = '<h4>Percent paying over 30% of income on housing</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.over30 + '%' : 'Hover over a census tract');
  };

  //car
  function getStyleUnder30(feature) {
    return {
      fillColor: getColorUnder30(feature.properties.under30),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorUnder30(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeatureUnder30(e) {
    var layer = e.target;
    infoUnder30.update(layer.feature.properties);

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

  function resetHighlightUnder30(e) {
    under30Layer.resetStyle(e.target);
    infoUnder30.update();
  }

  function onEachFeatureUnder30(feature, layer) {
    layer.on({
      mouseover: highlightFeatureUnder30,
      mouseout: resetHighlightUnder30,
      click: zoomToFeature
    });
  }


  var infoUnder30 = L.control();

  infoUnder30.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoUnder30.update = function(props) {
    this._div.innerHTML = '<h4>Percent paying under 30% of income on housing</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.under30 + '%' : 'Hover over a census tract');
  };

  //car
  function getStyleTopincome(feature) {
    return {
      fillColor: getColorTopincome(feature.properties.topIncome),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorTopincome(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeatureTopincome(e) {
    var layer = e.target;
    infoTopincome.update(layer.feature.properties);

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

  function resetHighlightTopincome(e) {
    topIncomeLayer.resetStyle(e.target);
    infoTopincome.update();
  }

  function onEachFeatureTopincome(feature, layer) {
    layer.on({
      mouseover: highlightFeatureTopincome,
      mouseout: resetHighlightTopincome,
      click: zoomToFeature
    });
  }


  var infoTopincome = L.control();

  infoTopincome.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoTopincome.update = function(props) {
    this._div.innerHTML = '<h4>Percent in top 50% of incomes</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.topIncome + '%' : 'Hover over a census tract');
  };


  //car
  function getStyleBottomincome(feature) {
    return {
      fillColor: getColorBottomincome(feature.properties.bottomIncome),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorBottomincome(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeatureBottomincome(e) {
    var layer = e.target;
    infoBottomincome.update(layer.feature.properties);

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

  function resetHighlightBottomincome(e) {
    bottomIncomeLayer.resetStyle(e.target);
    infoBottomincome.update();
  }

  function onEachFeatureBottomincome(feature, layer) {
    layer.on({
      mouseover: highlightFeatureBottomincome,
      mouseout: resetHighlightBottomincome,
      click: zoomToFeature
    });
  }


  var infoBottomincome = L.control();

  infoBottomincome.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoBottomincome.update = function(props) {
    this._div.innerHTML = '<h4>Percent in bottom 50% of incomes</h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.bottomIncome + '%' : 'Hover over a census tract');
  };


  //car
  function getStyleLowincome(feature) {
    return {
      fillColor: getColorLowincome(feature.properties.lowIncome),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorLowincome(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeatureLowincome(e) {
    var layer = e.target;
    infoLowincome.update(layer.feature.properties);

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

  function resetHighlightLowincome(e) {
    lowIncomeLayer.resetStyle(e.target);
    infoLowincome.update();
  }

  function onEachFeatureLowincome(feature, layer) {
    layer.on({
      mouseover: highlightFeatureLowincome,
      mouseout: resetHighlightLowincome,
      click: zoomToFeature
    });
  }


  var infoLowincome = L.control();

  infoLowincome.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoLowincome.update = function(props) {
    this._div.innerHTML = '<h4>Percent with low income </h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.lowIncome + '%' : 'Hover over a census tract');
  };

  //car
  function getStyleMedincome(feature) {
    return {
      fillColor: getColorMedincome(feature.properties.medIncome),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  function getColorMedincome(d) {
    return d > 120 ? '#f2f0f7' :
      d > 100 ? '#dadaeb' :
      d > 80 ? '#bcbddc' :
      d > 60 ? '#9e9ac8' :
      d > 40 ? '#807dba' :
      d > 20 ? '#6a51a3' :
      '#4a1486';
  }

  function highlightFeatureMedincome(e) {
    var layer = e.target;
    infoMedincome.update(layer.feature.properties);

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

  function resetHighlightMedincome(e) {
    medIncomeLayer.resetStyle(e.target);
    infoMedincome.update();
  }

  function onEachFeatureMedincome(feature, layer) {
    layer.on({
      mouseover: highlightFeatureMedincome,
      mouseout: resetHighlightMedincome,
      click: zoomToFeature
    });
  }


  var infoMedincome = L.control();

  infoMedincome.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  // method that we will use to update the control based on feature properties passed
  infoMedincome.update = function(props) {
    this._div.innerHTML = '<h4>Median income  </h4>' + (props ?
      '<b>' + 'Cenus Tract ID: ' + props.CTUID + '</b><br />' + props.medIncome + ' dollars' : 'Hover over a census tract');
  };

  var info;
  //menu
  addLayer(populationLayer, 'pop', 1, infoPopulation);
  addLayer(popchangeLayer, 'change', 2, infoPopchange);
  addLayer(densityLayer, 'density', 3, infoDensity);
  addLayer(immigrantLayer, 'immigrant', 4, infoImmigrant);
  addLayer(visminLayer, 'vismin', 5, infoVismin);
  addLayer(noeduLayer, 'nocert', 6, infoNoedu);
  addLayer(highschoolLayer, 'highschool', 7, infoHighschool);
  addLayer(universityLayer, 'university', 8, infoUniversity);
  addLayer(carLayer, 'car', 9, infoCar);
  addLayer(ptLayer, 'publictrans', 10, infoPt);
  addLayer(walkLayer, 'walk', 11, infoWalk);
  addLayer(medcommuteLayer, 'medcommute', 12, infoMedcommute);
  addLayer(homeOwnerLayer, 'homeOwner', 13, infoHomeown);
  addLayer(homeRenterLayer, 'homeRenter', 14, infoHomerent);
  addLayer(medOwnLayer, 'medown', 15, infoMedown);
  addLayer(medRentLayer, 'medrent', 16, infoMedrent);
  addLayer(over30Layer, 'over30', 17, infoOver30);
  addLayer(under30Layer, 'under30', 18, infoUnder30);
  addLayer(unemploymentLayer, 'unemployment', 19, infoUnemployment);
  addLayer(medIncomeLayer, 'medincome', 20, infoMedincome);
  addLayer(topIncomeLayer, 'topincome', 21, infoTopincome);
  addLayer(bottomIncomeLayer, 'bottomincome', 22, infoBottomincome);
  addLayer(lowIncomeLayer, 'lowincome', 23, infoLowincome);

  function addLayer(layer, name, zIndex, info) {
    layer.setZIndex(zIndex);

    var input = document.getElementById(name);
    console.log(input)
    input.onchange = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.checked) {
        map.addLayer(layer);
        info.addTo(map)

      } else {
        map.removeLayer(layer);
        info.removeFrom(map)
      };
    };
  };

  document.getElementById('snap').addEventListener('click', function() {
    leafletImage(map, doImage);
  });

  function doImage(err, canvas) {
    var img = document.createElement('img');
    var dimensions = map.getSize();
    img.width = dimensions.x;
    img.height = dimensions.y;
    img.src = canvas.toDataURL();
    snapshot.innerHTML = '';
    snapshot.appendChild(img);
  };


});
