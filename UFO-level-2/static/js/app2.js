let tableData = data;
/**
 * Function to show initial data from the object
 * Append rows and data
 * @param {array} array 
 */
function table(array){
    let tbody = d3.select("tbody");
    array.forEach(function(sighteen){
        //console.log(sighteen);
        let row = tbody.append("tr");
        Object.entries(sighteen).forEach(function([key, value]){
            //console.log(key, value);
            let cell = row.append("td");
            cell.text(value);
        });
    }); 

}

//Show data
table(tableData);

// D3 to select buttons and form
let button = d3.select("#button");
let button2 = d3.select("#buttonClear");

button.on("click", search);
button2.on("click", clearInputs);

/**
 * Clear table body of initial data
 */
function clearBody(){
    d3.select("tbody").html("");
};

/**
 * Clear input fields
 */
function clearInputs(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select input fields
    let values = d3.selectAll(".form-control")._groups[0];
    console.log(values);
    // Iterate to obtain input values and set them to be ""
    values.forEach(value => value.value="");
    // Call function to clear body and display initial data
    clearBody();
    table(tableData);
}


/**
 * Function to filter the data according to user input
 */
function search(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
/* 
    let values = []
    d3.selectAll(".form-control").nodes().forEach(x=>values.push(x.value))
    console.log(values); */

    //Select the input element, get the raw HTML node and Get the value property of the input elements
    let inputValDate = d3.select("#Date").property("value");
    let inputValCountry = d3.select("#Country").property("value");
    let inputValState = d3.select("#State").property("value").toLowerCase();
    let inputValCity = d3.select("#City").property("value").toLowerCase();
    let inputValShape = d3.select("#Shape").property("value");
    
    let filteredTable = tableData.filter(x=> x.datetime===inputValDate && x.country===inputValCountry && x.state===inputValState && x.shape===inputValShape && x.city===inputValCity);

    // If statements according to user input
    if(filteredTable.length===0){
        clearBody();
        // If no results found display a message
        d3.select("tbody").html("<h3>No results found</h3>");
    }else{
        clearBody();
        console.log(filteredTable);
        table(filteredTable);
    } 
}


/* let shapes = tableData.map(x=>x.shape);
let cities = tableData.map(y=>y.city);

function Unique(value, index, self) { 
    return self.indexOf(value) === index;
}

let uniqueShapes= shapes.filter( Unique );
let uniqueCities= cities.filter( Unique );
//console.log(uniqueShapes); */
//console.log(uniqueCities);