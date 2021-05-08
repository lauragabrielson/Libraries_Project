//I've loaded the JavaScript file
console.log("Loaded bar.js");


function DrawBargraph(state) {
// Query the endpoint that returns a JSON ...
d3.json("/libraries_bar").then(function (data) {


    // ... and dump that JSON to the console for inspection
    console.log(data); 
    
    console.log(state);

    var audioSum = data => {
        sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i].audio_collection;
        };
        return sum;
    };

    audio = audioSum(data)

    console.log(audio)
    
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

    var trace1 = {
        x: collections,
        y: collection_names,
        type: "bar",
            marker: {
                color: '#E0CA3C',
                opacity: 0.8,
                line: {
                  color: '#136F63',
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
                color: '#136F63',
                opacity: 0.8,
                line: {
                    color: '#136F63',
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
        xaxis: {
            ticks: 'inside',
            ticklen: 8,
            tickwidth: 4,
            tickcolor: '#000'
          },
          yaxis: {
            ticklen: 8,
            tickwidth: 4,
            tickcolor: '#000'
          },

        title: ("Collections: All States"),

        // xaxis: { title: "Collection Total"},
        barmode: "stack",
        plot_bgcolor: "#DCDCDC",
        paper_bgcolor: "#DCDCDC",
        opacity: 0.8
    };

    var config = {responsive: true};

    // Create the plot
    Plotly.newPlot("bar", data, layout, config); 
});
// }
};

//////***************UPDATE BARGRAPH *********************/

function UpdateBargraph(state) {
    // Query the endpoint that returns a JSON ...
    d3.json("/libraries_bar").then(function (data) {
    
    
        // ... and dump that JSON to the console for inspection
        console.log(data); 
        
        // console.log(state);
    
        var result = data.filter(d => d.state_name === state);
    
        console.log(result);
    
        
        console.log(state);
    
        var audioSum = result => {
            sum = 0;
            for (var i = 0; i < result.length; i++) {
                sum += result[i].audio_collection;
            };
            return sum;
        };
    
        audio = audioSum(result)
    
        console.log(audio)
        
        var printSum = result => {
            sum = 0;
            for (var i = 0; i < result.length; i++) {
                sum += result[i].print_collection;
            };
            return sum;
        };
    
        printCol = printSum(result)
    
        var digitalSum = result => {
            sum = 0;
            for (var i = 0; i < result.length; i++) {
                sum += result[i].digital_collection;
            };
            return sum;
        };
    
        digital = digitalSum(result)
    
        var downloadVideoSum = result => {
            sum = 0;
            for (var i = 0; i < result.length; i++) {
                sum += result[i].downloadable_video;
            };
            return sum;
        };
    
        downloadVideo = downloadVideoSum(result)
    
        var downloadAudioSum = result => {
            sum = 0;
            for (var i = 0; i < result.length; i++) {
                sum += result[i].downloadable_audio;
            };
            return sum;
        };
    
        downloadAudio = downloadAudioSum(result)
    
        var physicalVideoSum = result => {
            sum = 0;
            for (var i = 0; i < result.length; i++) {
                sum += result[i].physical_video;
            };
            return sum;
        };
    
        physicalVideo = physicalVideoSum(result)
    
        console.log(`Print:${printCol}, Audio:${audio}, Video: ${physicalVideo}`)
        console.log(`Digital:${digital}, Audio:${downloadAudio}, Video: ${downloadVideo}`)
      
    //     // Create the trace
        collections = [printCol, audio, physicalVideo]
        digital_collections = [digital, downloadAudio, downloadVideo]
        var collection_names = ["Print", "Audio", "Video"]
        var digital_collection_names = ["Print", "Audio", "Video"]
    
      
        var trace1 = {
            x: collections,
            y: collection_names,
            type: "bar",
                marker: {
                    color: '#E0CA3C',
                    opacity: 0.8,
                    line: {
                      color: '#136F63',
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
                    color: '#136F63',
                    opacity: 0.8,
                    line: {
                        color: '#136F63',
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
            xaxis: {
                ticks: 'inside',
                ticklen: 8,
                tickwidth: 4,
                tickcolor: '#000'
              },
              yaxis: {
                ticklen: 8,
                tickwidth: 4,
                tickcolor: '#000'
              },
    
            title: (`Collections: ${state}`),
    
            // xaxis: { title: "Collection Total"},
            barmode: "stack",
            plot_bgcolor: "#DCDCDC",
            paper_bgcolor: "#DCDCDC",
            opacity: 0.8
        };
        
        var config = {responsive: true};
        
        // Create the plot
        Plotly.newPlot("bar", data, layout, config); 
    });
    // }
    };


