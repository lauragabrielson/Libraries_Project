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
    
        var librarianPercent = Math.round((totalLibrarians / totalStaff) * 100);
        console.log(`Librarian percentage: ${librarianPercent}`);

        var totalLibraries = data.length;
        
        console.log(`Number of libraries: ${totalLibraries}`);

        var totalRevenue = Math.round(totalStateRevenue(data) * 100) / 100;
        var servicePop = Math.round(totalServicePop(data) * 100) /100;
       

        var perCapitaRevenue = Math.round(totalRevenue / servicePop);
        console.log(`Per capita revenue ${perCapitaRevenue}`);
        
        function formatNum(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        var summaryText = (`In the United States, there are ${formatNum(totalLibraries)} libraries or library systems serving approximately
            ${formatNum(servicePop)} people. The total combined budget for all libraries in the US is $${formatNum(totalRevenue)}, or roughly
            $${perCapitaRevenue} per person served. ${librarianPercent}% of library employees in the US are librarians.`);

        document.getElementById("p1").innerHTML = summaryText;
    })

};

function UpdateText(state) {
   
    // This is where we update the text
   
    // load data
    d3.json('/libraries_summary').then(data => {

        console.log(data);

         // Filter data by input state
        var result = data.filter(d => d.state_name === state);
    
        console.log(result);
        console.log(state);

        var MLSlibrarianSum = result => {
            sum = 0;
            for (var i = 0; i < result.length; i++) {
                sum += result[i].mls_librarians;
            };
            return sum;
        };

        var librarianSum = result => {
            sum = 0;
            for (var i = 0; i < result.length; i++) {
                sum += result[i].librarians;
            };
            return sum;
        };
    
        var totalStaffSum = result => {
            sum = 0;
            for (var i = 0; i < result.length; i++) {
                sum += result[i].total_staff;
            };
            return sum;
        };
    
        var totalServicePop = result => {
            sum = 0
            for (var i = 0; i < result.length; i++) {
                sum += result[i].services_population;
            };
            return sum;
        };
    
        var totalStateRevenue = result => {
            sum = 0;
            for (var i = 0; i < result.length; i++) {
                sum += result[i].total_operating_revenue;
            };
            return sum;
        };
        var stateName = result[0].state_name;
        console.log(stateName);

        var MLSlibrarians = Math.round(MLSlibrarianSum(result) * 100) / 100;
        var librarians = Math.round(librarianSum(result) * 100) / 100;
        var totalStaff = Math.round(totalStaffSum(result) * 100) / 100;

        var totalLibrarians = MLSlibrarians + librarians;
        console.log(`Total librarians: ${totalLibrarians}`);
    
        var librarianPercent = Math.round((totalLibrarians / totalStaff) * 100);
        console.log(`Librarian percentage: ${librarianPercent}`);

        var totalLibraries = result.length;
        console.log(`Number of libraries: ${totalLibraries}`);

        var totalRevenue = Math.round(totalStateRevenue(result) * 100) / 100;
        var servicePop = Math.round(totalServicePop(result) * 100) /100;


        var perCapitaRevenue = Math.round(totalRevenue / servicePop);
        console.log(`Per capita revenue ${perCapitaRevenue}`);

        function formatNum(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        var summaryText = (`In the state of ${stateName}, there are ${formatNum(totalLibraries)} libraries or library systems serving approximately
            ${formatNum(servicePop)} people. The total combined budget for libraries in ${stateName} is $${formatNum(totalRevenue)}, or roughly
            $${perCapitaRevenue} per person served. ${librarianPercent}% of library employees in the state are librarians.`);

        document.getElementById("p1").innerHTML = summaryText;
    })

};