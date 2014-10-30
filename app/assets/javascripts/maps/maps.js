$(document).on('ready page:load', function() {
  $('.graphPage').hide();
})

function edu() {
  $('.map').css("height", '0px');
  $('#map_edu').css("height", '830px');
  cartodb.createVis('map_edu', 'http://emmack.cartodb.com/api/v2/viz/8ef590ee-5eda-11e4-a9c3-0e018d66dc29/viz.json', {
      shareable: true,
      title: true,
      description: true,
      search: true,
      tiles_loader: true,
      center_lat: 43.8,
      center_lon: -79.381667,
      zoom: 9
    })
    .done(function(vis, layers) {
      // layer 0 is the base layer, layer 1 is cartodb layer
      // setInteraction is disabled by default
      layers[1].setInteraction(true);
      layers[1].on('featureOver', function(e, pos, latlng, data) {
        cartodb.log.log(e, pos, latlng, data);
      });

      // you can get the native map to work with it
      // depending if you use google maps or leaflet
      map = vis.getNativeMap();

      // now, perform any operations you need
      // map.setZoom(3)// map.setCenter(new google.maps.Latlng(...))

    })
    .error(function(err) {
      console.log(err);
    });
}

function pop() {
  $('.map').css("height", '0px');
  $('#map_pop').css("height", '830px');
  cartodb.createVis('map_pop', 'http://emmack.cartodb.com/api/v2/viz/07eadc48-5edb-11e4-a83d-0e4fddd5de28/viz.json', {
      shareable: true,
      title: true,
      description: true,
      search: true,
      tiles_loader: true,
      center_lat: 43.8,
      center_lon: -79.381667,
      zoom: 9
    })
    .done(function(vis, layers) {
      // layer 0 is the base layer, layer 1 is cartodb layer
      // setInteraction is disabled by default
      layers[1].setInteraction(true);
      layers[1].on('featureOver', function(e, pos, latlng, data) {
        cartodb.log.log(e, pos, latlng, data);
      });

      // you can get the native map to work with it
      // depending if you use google maps or leaflet
      map = vis.getNativeMap();

      // now, perform any operations you need
      // map.setZoom(3)// map.setCenter(new google.maps.Latlng(...))

    })
    .error(function(err) {
      console.log(err);
    });
}

function shelter() {
  $('.map').css("height", '0px');
  $('#map_shelter').css("height", '830px');
  cartodb.createVis('map_shelter', 'http://emmack.cartodb.com/api/v2/viz/fa8c72f6-5ee3-11e4-a944-0e4fddd5de28/viz.json', {
      shareable: true,
      title: true,
      description: true,
      search: true,
      tiles_loader: true,
      center_lat: 43.8,
      center_lon: -79.381667,
      zoom: 9
    })
    .done(function(vis, layers) {
      // layer 0 is the base layer, layer 1 is cartodb layer
      // setInteraction is disabled by default
      layers[1].setInteraction(true);
      layers[1].on('featureOver', function(e, pos, latlng, data) {
        cartodb.log.log(e, pos, latlng, data);
      });

      // you can get the native map to work with it
      // depending if you use google maps or leaflet
      map = vis.getNativeMap();

      // now, perform any operations you need
      // map.setZoom(3)// map.setCenter(new google.maps.Latlng(...))

    })
    .error(function(err) {
      console.log(err);
    });
}


function inc() {
  $('.map').css("height", '0px');
  $('#map_inc').css("height", '830px');
  cartodb.createVis('map_inc', 'http://emmack.cartodb.com/api/v2/viz/27ee292e-5edf-11e4-a55a-0e853d047bba/viz.json', {
      shareable: true,
      title: true,
      description: true,
      search: true,
      tiles_loader: true,
      center_lat: 43.8,
      center_lon: -79.381667,
      zoom: 9
    })
    .done(function(vis, layers) {
      // layer 0 is the base layer, layer 1 is cartodb layer
      // setInteraction is disabled by default
      layers[1].setInteraction(true);
      layers[1].on('featureOver', function(e, pos, latlng, data) {
        cartodb.log.log(e, pos, latlng, data);
      });

      // you can get the native map to work with it
      // depending if you use google maps or leaflet
      map = vis.getNativeMap();

      // now, perform any operations you need
      // map.setZoom(3)// map.setCenter(new google.maps.Latlng(...))

    })
    .error(function(err) {
      console.log(err);
    });
}

function trans() {
  $('.map').css("height", '0px');
  $('#map_trans').css("height", '830px');
  cartodb.createVis('map_trans', 'http://emmack.cartodb.com/api/v2/viz/e69e6aae-5ee5-11e4-a91d-0e853d047bba/viz.json', {
      shareable: true,
      title: true,
      description: true,
      search: true,
      tiles_loader: true,
      center_lat: 43.8,
      center_lon: -79.381667,
      zoom: 9
    })
    .done(function(vis, layers) {
      // layer 0 is the base layer, layer 1 is cartodb layer
      // setInteraction is disabled by default
      layers[1].setInteraction(true);
      layers[1].on('featureOver', function(e, pos, latlng, data) {
        cartodb.log.log(e, pos, latlng, data);
      });

      // you can get the native map to work with it
      // depending if you use google maps or leaflet
      map = vis.getNativeMap();

      // now, perform any operations you need
      // map.setZoom(3)// map.setCenter(new google.maps.Latlng(...))

    })
    .error(function(err) {
      console.log(err);
    });
}
