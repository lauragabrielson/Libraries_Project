console.log("text.js is loaded");

// This text will read:

// In the state of ${stateName}, there are ${number of libraries} libraries or library systems serving approximately 
// ${service population} people. The total combined budget for libraries in ${stateName} is ${total library budget}, or
// roughly ${average dollar amount} per person served. ${combined percentage} of library employees in the state are credentialled 
// librarians.

function WriteText(state) {
    // This is where we write the initial paragraph
    var MLSlibrarianSum = data => {
        sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i].mls_librarians;
        };
        return sum;
    };

    var librarianSum = data => {
        sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i].librarians;
        };
        return sum;
    };

    var totalServicePop = data => {
        sum = 0
        for (var i = 0; i < data.length; i++) {
            sum += data[i].service_population;
        };
        return sum;
    };

    var totalStateRevenue = data => {
        sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i].total_operating_revenue;
        };
        return sum;
    };
  
    // load data
    d3.json('/libraries_summary').then(data => {
        console.log(data);

        var MLSlibrarians = Math.round(MLSlibrarianSum(data) * 100) / 100;
        var librarians = Math.round(librarianSum(data) * 100) / 100;

        var totalLibrarians = MLSlibrarians+ librarians;
        console.log(totalLibrarians);
    
        var totalLibraries = data.length;
        console.log(totalLibraries);

        var perCapitaRevenue = totalStateRevenue / totalServicePop;
        console.log(perCapitaRevenue);

    })

};

function UpdateText(state) {
    // This is where we respond to a click event
};