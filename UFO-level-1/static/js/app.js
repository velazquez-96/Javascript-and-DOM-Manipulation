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
let form = d3.select("#form");

button.on("click", search);
form.on("submit", search);
button2.on("click", clearInput);

/**
 * Clear table body of initial data
 */
function clearBody(){
    d3.select("tbody").html("");
};

/**
 * Clear input fields
 */
function clearInput(){
    d3.event.preventDefault();
    // Select input fields
    let value = d3.select(".form-control")._groups[0];
    console.log(value);
    // Iterate to obtain input values and set them to be ""
    value.forEach(value => value.value="");
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
    //Select the input element and get the raw HTML node
    let inputElement = d3.select("#FormControl-Input");
    //Get the value property of the input element
    let inputValue = inputElement.property("value"); 
    let filteredTable = tableData.filter(x => x.datetime===inputValue);


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
