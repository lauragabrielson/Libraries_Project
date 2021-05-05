
//I've loaded the JavaScript file
console.log("Loaded main.js");




// function DrawMap() {


// }

// function DrawBargraph(state) {

//     // This function's only job in the entire world is to updat the bargraph. That's it! 


// }


// function UpdateLibraryFacts() {

//     // This function's only job in the entire world is to update the library facts. That's it. 


// }

// function DrawDonut(state) {

//     console.log(`DrawDonut(${state})`); 

//     // This function's only job in the entire world is to draw the dang donut. That's it. 
//     // d3.json(route).then(data) {

//         // filter the data on state ...
//         var filteredData = data.filter(d => d.state === state); 

//         // ... and then draw the donut chart


//     // }); 

// }



function HandleMapClick(event) {

    // This is the event handler for clicks on the map
    // And oh, by the way, there's a great tutorial for this on the Leaflet site (hint, hint)

    // And also, you can organize your marker clusters to be based on state; e.g., all the stuff
    // in a given cluster resides within the same state. You can learn more about this on the Leaflet site too! 

    // Figure out which state was clicked (see above)
    // DrawDonut(newState);
    // DrawBargraph(newState); 


}


// function InitializeDashboard() {

//     DrawMap();

//     var initialState = "Minnesota";
//     DrawDonut(initialState); 

//     UpdateLibraryFacts(); 


// }

// InitializeDashboard(); 




DrawDonut();



