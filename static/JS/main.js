// console.log("dom.js loaded"); 




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



// function HandleMapClick(event) {

//     // This is the event handler for clicks on the map
//     // And oh, by the way, there's a great tutorial for this on the Leaflet site (hint, hint)

//     // And also, you can organize your marker clusters to be based on state; e.g., all the stuff
//     // in a given cluster resides within the same state. You can learn more about this on the Leaflet site too! 

//     // Figure out which state was clicked (see above)
//     // DrawDonut(newState);
//     // DrawBargraph(newState); 


// }


// function InitializeDashboard() {

//     DrawMap();

//     var initialState = "Minnesota";
//     DrawDonut(initialState); 

//     UpdateLibraryFacts(); 


// }

// InitializeDashboard(); 




//I've loaded the JavaScript file
console.log("Loaded main.js");

// var url = "http://127.0.0.1:5000/libraries_bar"

// Query the endpoint that returns a JSON ...
d3.json("/libraries_bar").then(function (data) {


    // ... and dump that JSON to the console for inspection
    console.log(data); 

    // Next, pull out the keys and the values for graphing
    // for (var i = 0; i < data.length; i++) {
    //     var collections = [data[i].audio_collection, data[i].print_collection]
    // }
    // collections = Object.keys(data)

    var audioSum = data => {
        sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i].audio_collection;
        };
        return sum;
    };

    audio = audioSum(data)
    
    var printSum = data => {
        sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i].print_collection;
        };
        return sum;
    };

    printCol = printSum(data)

    var digitalSum = data => {
        sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i].digital_collection;
        };
        return sum;
    };

    digital = digitalSum(data)

    var downloadVideoSum = data => {
        sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i].downloadable_video;
        };
        return sum;
    };

    downloadVideo = downloadVideoSum(data)

    var downloadAudioSum = data => {
        sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i].downloadable_audio;
        };
        return sum;
    };

    downloadAudio = downloadAudioSum(data)

    var physicalVideoSum = data => {
        sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i].physical_video;
        };
        return sum;
    };

    physicalVideo = physicalVideoSum(data)

    console.log(`Print:${printCol}, Audio:${audio}, Video: ${physicalVideo}`)
    console.log(`Digital:${digital}, Audio:${downloadAudio}, Video: ${downloadVideo}`)
  
//     // Create the trace
    collections = [printCol, audio, physicalVideo]
    digital_collections = [digital, downloadAudio, downloadVideo]
    var collection_names = ["Print", "Audio", "Video"]
    var digital_collection_names = ["Print", "Audio", "Video"]
    ///*********Option 2*************** */
    // var collection_names = ["Print", "Video", "Audio"]
    // var digital_collection_names = ["Digital", "DAudio", "DVideo"]
    var trace1 = {
        x: collections,
        y: collection_names,
        type: "bar",
            marker: {
                color: 'rgb(189, 209, 250',
                opacity: 0.6,
                line: {
                  color: 'rgb(28, 50, 92)',
                  width: 1.5
                },
            },
            name: "Physical",
            orientation: "h"
       
    };

    var trace2 = {
        x: digital_collections,
        y: digital_collection_names,
        type: "bar",
            marker: {
                color: 'rgb(28, 50, 92)',
                opacity: 0.8,
                // line: {
                //   color: 'rgb(189, 209, 250',
                //   width: 1.5
                // },
                line: {
                    color: 'rgb(28, 50, 92)',
                    width: 1.5
                  },
            },
            name: "Digital",
            orientation: "h"
       
    };

    // Put the trace into an array 
    var data = [trace1, trace2];

    // Define a layout object
    var layout = {
        title: "Collections",
        xaxis: { title: "Collection Total"},
        barmode: "stack"
        // yaxis: { title: "Total"}
    };

    // Create the plot
    Plotly.newPlot("bar", data, layout); 
});

///******************************Option 2********************* */

//    
// collections = [printCol, digital, downloadAudio, physicalVideo, audio, downloadVideo]
// var collection_names = ["Print", "Digital", "Audio-Downld", "Video", "Audio", "Video-Downld"]
//   var trace = {
//         x: collections,
//         y: collection_names,
//         type: "bar",
//             marker: {
//                 color: 'rgb(189, 209, 250',
//                 opacity: 0.6,
//                 line: {
//                   color: 'rgb(28, 50, 92)',
//                   width: 1.5
//                 },
//             },
//             // text: collections,
//             orientation: "h"
       
//     };

//     // Put the trace into an array (which allows us to graph
//     // multiple traces, if we wish)
//     var data = [trace];

//     // Define a layout object
//     var layout = {
//         title: "Collections",
//         xaxis: { title: "Type of Collection"},
//         // yaxis: { title: "Total"}
//     };

//     // Create the plot
//     Plotly.newPlot("bar", data, layout); 
// });