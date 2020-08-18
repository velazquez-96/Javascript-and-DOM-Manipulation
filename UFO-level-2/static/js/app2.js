let tableData = data;
let tbody = d3.select("tbody");

/**
 * Function to show initial data from the object
 * Append rows and data
 * @param {array} array 
 */
function table(array) {
    array.forEach(function (sighteen) {
        //console.log(sighteen);
        let row = tbody.append("tr");
        Object.entries(sighteen).forEach(function ([key, value]) {
            //console.log(key, value);
            let cell = row.append("td");
            cell.text(value);
        });
    });
    
}

// Keep Track of all filters
var filters = {};

/**
 * Clear table body of initial data
 */
function clearBody() {
    d3.select("tbody").html("");
};

/**
 * Clear input fields
 */
function clearInputs() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Select input fields
    let values = d3.selectAll(".form-control")._groups[0];
    console.log(values);
    // Iterate to obtain input values and set them to be ""
    values.forEach(value => value.value = "");
    // Call function to clear body and display initial data
    clearBody();
    table(tableData);
    filters = {}
    
}


function updateFilters() {
    
    // Save the element, value, and id of the filter that was changed
  var changedElement = d3.select(this).select("input");
  var elementValue = changedElement.property("value");
  var filterId = changedElement.attr("id");

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (elementValue) {
    filters[filterId] = elementValue;
  }
  else {
    delete filters[filterId];
  }

  clearBody();
  console.log(filters)
  // Call function to apply all filters and rebuild the table
  filterTable();


}

console.log(filters)

function filterTable() {
    
    // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and keep any data that
  // matches the filter values
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  console.log(filteredData)
  // Finally, rebuild the table using the filtered Data
  table(filteredData);

}

//Show data
table(tableData);

// D3 to select buttons and form
d3.select("#buttonClear").on("click", clearInputs);

// Attach an event to listen for changes to each filter
d3.selectAll(".filter").on("change", updateFilters);

