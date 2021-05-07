console.log("map.js loaded")

testFunction = data => {
  return `This is a test`
}

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
id: "mapbox/light-v9",
accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the json data.
// Many thanks to Eric Celeste for the geojson of state boundaries https://eric.clst.org/tech/usgeojson/
var link = "static/data/us_states.json";

// Use this link to get the json data.
// Many thanks to Eric Celeste for the geojson of state boundaries https://eric.clst.org/tech/usgeojson/
var link = "static/data/us_states.json";

// Re-keying geojson code for clean up

// Grab JSON data for state outlines
d3.json(link).then(function(data) {
  console.log("First log");
  console.log(data);

  // Style each feature yellow with an opacity of .4
  L.geoJson(data, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: "yellow",
        fillOpacity: 0.4,
        weight: 1.5
      };
    },

    // Call on each feature to make the state outlined respond
    onEachFeature: function(feature, layer) {

      // Set responses to mouse movement
      layer.on({
        // When moused over, highlight with increased opacity
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.7
          });
        },
        // Return to original opacity on mouseout
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.4
          });
        },
        // Responses when clicked
        click: function(event) {
          // Fit view to bounds of the feature/state selected
          myMap.fitBounds(event.target.getBounds());
          // Set variable newState to capture selected state name
          var newState = event.sourceTarget.feature.properties.NAME;
          console.log("Looking at event variable");
          console.log(newState);

          // Call functions to update visuals with newState selected
          // DrawBargraph(newState);
          // UpdateDonut(newState);

          // Create cluster markers for locations within newState selected
          var url = "/libraries_map"

          d3.json(url).then(function(data) {
            console.log(data);

            // Filter data by newState selected
            var stateTest = "Iowa";
            var stateData = data.filter (d => d.state_name = stateTest);
            console.log(stateData);
          })
        }
      })
    }


  }).addTo(myMap);

})


// Testing filtering on libraries data
function librariesFilter(state) {
  d3.json("/libraries_map").then(function(data) {
    console.log("Test function");
    console.log(data);

    // Filter by state
    var testState = "Iowa";
    console.log(testState);
    var result = data.filter(d => d.state_name === testState);
    console.log(result);
  });
};
librariesFilter();


// A third d3.json to filter for state pop ups?
function StatePopup(state) {
  d3.json("/libraries_map").then(function(data) {
    // console.log(data);
    
    // Make a list of unique state initials
    var states = []

    for (var i = 0; i < data.length; i++) {
      var state = data[i].state;
      states.push(state);
    };
    // Thank you Vamsi on Stack Overflow https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    states = states.filter((x, i, a) => a.indexOf(x) == i) 
    console.log(states)

    // Console.log only shows final state (WY)
    // To call this in the geojson map construction, there needs to be something else going on
    var info = data.filter(d => d.state === state);
    console.log(info);

  })

}
StatePopup();


// // Grab JSON data of library branches.

// var url = "/libraries_map"

// d3.json(url).then(function(data) {

//   //  Let's try some marker clusters

//   // Make a marker cluster group
//   var markers = L.markerClusterGroup();

//   // Loop through data to get lat/long
//   for (var i = 0; i < data.length; i++) {

//     var location = [data[i].lat, data[i].lon]

//     if (location) {
//       markers.addLayer(L.marker([data[i].lat, data[i].lon])
//       .bindPopup("Library System/Branch Name: " + data[i].library_name + 
//         "</br> State: " + data[i].state +  
//         "</br> Service Population: " + data[i].services_population +
//         "</br> Number of Bookmobiles: " + data[i].bookmobiles));
//     }
//   };
  
//   // Add cluster layer to map
//   myMap.addLayer(markers);

// })

// var url = "/libraries_map"

// // Optional heat array below
// d3.json(url).then(function(data) {
//   console.log(data);

//   // Create and add heatLayer
//   var heatArray = [];

//   for (var i = 0; i < data.length; i++) {

//     heatArray.push([data[i].lat, data[i].lon]);

//   };
//   console.log(heatArray);
//   var heat = L.heatLayer(heatArray, {
//     radius: 50,
//     blur: 10
//   }).addTo(myMap);

//   // // Add markers for each location
//   // var pinArray = []

//   // for (var i = 0; i < data.length; i++) {

//   //   var location = [data[i].lat, data[i].lon]

//   //   if (location) {
//   //     L.marker([data[i].lat, data[i].lon]).addTo(myMap);
//   //   }
//   // };

// });