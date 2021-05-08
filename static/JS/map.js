console.log("map.js loaded")

// Creating map object
var myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 4
});

var formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  };

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
// And many additional thanks to the Census Bureau for the data provided to Eric in his creation of the geojson
var link = "static/data/us_states.json";

// Re-keying geojson code for clean up and adding call to function defined below

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
          var newState = event.sourceTarget.feature.properties.NAME;
          // console.log("Looking at event variable");
          // console.log(newState);
          stateSummary(newState);
        },
        // Return to original opacity on mouseout
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.4
          });
          info.remove(myMap);
        },
        // Responses when clicked
        click: function(event) {
          // Fit view to bounds of the feature/state selected
          myMap.fitBounds(event.target.getBounds());
          // Set variable newState to capture selected state name
          
          // info.remove(myMap);
          
          var newState = event.sourceTarget.feature.properties.NAME;
          console.log("Looking at event variable:");
          console.log(newState);
          // stateSummary(newState);

          // Call update chart functions
          UpdateBargraph(newState);
          UpdateDonut(newState);
          UpdateText(newState);
          console.log("I'm updating the text.")

          // Call function to create markerclusters
          libraryClusterMarkers(newState);

          // // Call function to produce summary
          // stateSummary(newState);
        
        }
      })
    }


  }).addTo(myMap);

})

// Create a function to generate marker clusters based on selected state

function libraryClusterMarkers(state) {
  
  // Call json for data
  d3.json("/libraries_map").then(function(data) {
    // console.log(data);

    // Create variable for cluster groups
    var markers = L.markerClusterGroup();

    // Filter the data by state
    // var testState = "Iowa";
    var filteredData = data.filter(d => d.state_name === state);
    // console.log("look at filteredData");
    // console.log(filteredData);

    // Loop through data for lat/long
    for (var i = 0; i < filteredData.length; i++) {
      var location = [filteredData[i].lat, filteredData[i].lon];

      // Check for location
      if (location) {
        // Add new marker to cluster group and bind popup
        markers.addLayer(L.marker([filteredData[i].lat, filteredData[i].lon])
          .bindPopup("Library System/Branch Name: " + filteredData[i].library_name + 
          "</br> State: " + filteredData[i].state +  
          "</br> Service Population: " + formatNumber(filteredData[i].services_population) +
          "</br> Number of Bookmobiles: " + filteredData[i].bookmobiles));
      };
    }
    // Add to map
    myMap.addLayer(markers);
  });

};

// console.log("testing clustermarker function")
// libraryClusterMarkers();

// Create an info corner for state summary
var info = L.control();

function stateSummary(state) {
  d3.json("/libraries_map").then(function (data) {
    console.log(data);

    // Filter the data by state
    var testState = "Iowa";
    var filteredData = data.filter(d => d.state_name === state);
    console.log("popup test")
    console.log(filteredData);

    // Get bookmobile total
    var bookmobileSum = filteredData => {
      sum = 0;
      for (var i = 0; i < filteredData.length; i++) {
        sum += filteredData[i].bookmobiles;
      };
      return sum;
    };
    bookmobiles = bookmobileSum(filteredData)
    console.log(bookmobiles)

    // Get service population total
    var stateServicePop = filteredData => {
      sum = 0;
      for (var i = 0; i < filteredData.length; i++) {
        sum += filteredData[i].services_population;
      };
      return sum;
    };
    servicePop = stateServicePop(filteredData)
    console.log(servicePop)

    // Update summary
    // updateSummary(state);
    // var info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (filteredData) {
        this._div.innerHTML = '<h4>Libraries Summary</h4>' +  state + '<h4>Service Population</h4>' + formatNumber(servicePop) + '<h4>Bookmobiles</h4>' + bookmobiles;
    };

    info.addTo(myMap);
    });
   

  }

