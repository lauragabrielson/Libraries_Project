console.log("map.js loaded")

// Creating map object
var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4
  });

// // Use this link to get the json data.
// // Many thanks to Eric Celeste for the geojson of state boundaries https://eric.clst.org/tech/usgeojson/
// var link = "static/data/us_states.json";

// // Grab JSON data..
// d3.json(link).then(function(data) {
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data).addTo(myMap);
//   console.log(data);
// });

// Testing something because the above is NOT working atm

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// // This is where I would need to replace data to serve the locations of libraries
// Grab JSON data.

var url = "http://127.0.0.1:5000/libraries_map"

d3.json(url).then(function(data) {
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

  // Let's try some marker clusters

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

});