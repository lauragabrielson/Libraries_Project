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

    var totalStaffSum = data => {
        sum = 0;
        for (var i = 0; i < data.length; i++) {
            sum += data[i].total_staff;
        };
        return sum;
    };

    var totalServicePop = data => {
        sum = 0
        for (var i = 0; i < data.length; i++) {
            sum += data[i].services_population;
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

        var stateName = data[0].state_name;
        console.log(stateName);

        var MLSlibrarians = Math.round(MLSlibrarianSum(data) * 100) / 100;
        var librarians = Math.round(librarianSum(data) * 100) / 100;
        var totalStaff = Math.round(totalStaffSum(data) * 100) / 100;

        var totalLibrarians = MLSlibrarians + librarians;
        console.log(`Total librarians: ${totalLibrarians}`);
    
        var librarianPercent = (totalLibrarians / totalStaff) * 100;
        console.log(`Librarian percentage: ${librarianPercent}`);

        var totalLibraries = data.length;
        console.log(`Number of libraries: ${totalLibraries}`);

        var totalRevenue = Math.round(totalStateRevenue(data) * 100) / 100;
        var servicePop = Math.round(totalServicePop(data) * 100) /100;


        var perCapitaRevenue = totalRevenue / servicePop;
        console.log(`Per capita revenue ${perCapitaRevenue}`);

        var summaryText = (`In the state of ${stateName}, there are ${totalLibraries} libraries or library systems serving approximately
            ${servicePop} people. The total combined budget for libraries in ${stateName} is $${totalRevenue}, or roughly
            $${perCapitaRevenue} per person served. ${librarianPercent}% of library employees in the state are credentialled librarians.`);

        document.getElementById("p1").innerHTML = summaryText;
    })

};

function UpdateText(state) {
    // This is where we respond to a click event
};