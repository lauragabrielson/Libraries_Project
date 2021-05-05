console.log("map.js loaded")

// Creating map object
var myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 4
});


// Add tile layer

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the json data.
// Many thanks to Eric Celeste for the geojson of state boundaries https://eric.clst.org/tech/usgeojson/
var link = "static/data/us_states.json";
var alt_link = "https://leafletjs.com/examples/choropleth/us-states.js"

// // This works, commenting out as is to try to make states clickable below
// // Grab JSON data..
// d3.json(link).then(function(data) {
//   console.log("logging data:");
//   console.log(data);

//   // Read and make geojson data usable
//   // console.log(data);
//   var mapStyle = {
//     color: "white",
//     fillColor: "blue",
//     fillOpacity: 0.5,
//     weight: 1.5
//   }; 

//   var statesOutlines = L.geoJson(data, { style: mapStyle });
  
//   console.log(statesOutlines)

//   statesOutlines.addTo(myMap);

// });


// Grab JSON data for state outlines.
d3.json(link).then(function(data) {
  console.log("logging data:");
  console.log(data);
  stateName = data.features;
  console.log(stateName);

  L.geoJson(data, { 
    style: function(feature) {
      return {
        color: "white",
        fillColor: "blue",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Call on each feature to make state clickable
    onEachFeature: function(feature, layer) {
      // Set mouse event to change state opacity
      layer.on({
        // On scrollover, increase opacity
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // Return to lower opacity on mouseout
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // Zoom into state on click
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Add state pop up if possible
      // console.log(data);
      // stateName = data.features.properties.name
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>This is a Test</h1>");
    } 
  }).addTo(myMap);
  
  // Test rectangle in northern Montana
  L.polygon([[48.84, -110.34], [48.86, -112.36]]).bindTooltip("test", {
    sticky: true
  }).addTo(myMap);

});


// Grab JSON data of librarie branches.

var url = "/libraries_map"

d3.json(url).then(function(data) {

  //  Let's try some marker clusters

  // Make a marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data to get lat/long
  for (var i = 0; i < data.length; i++) {

    var location = [data[i].lat, data[i].lon]

    if (location) {
      markers.addLayer(L.marker([data[i].lat, data[i].lon]).bindPopup(data[i].library_name));
    }
  };
  
  // Add cluster layer to map
  myMap.addLayer(markers);

})


// Optional heat array below
// d3.json(url).then(function(data) {
  // console.log(data);

  // // Create and add heatLayer
  // var heatArray = [];

  // for (var i = 0; i < data.length; i++) {

  //   heatArray.push([data[i].lat, data[i].lon]);

  // };
  // console.log(heatArray);
  // var heat = L.heatLayer(heatArray, {
  //   radius: 70,
  //   blur: 10
  // }).addTo(myMap);

  // // Add markers for each location
  // var pinArray = []

  // for (var i = 0; i < data.length; i++) {

  //   var location = [data[i].lat, data[i].lon]

  //   if (location) {
  //     L.marker([data[i].lat, data[i].lon]).addTo(myMap);
  //   }
  // };

// });