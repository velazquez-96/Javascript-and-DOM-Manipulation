let tableData = data;

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

table(tableData);

let button = d3.select("#button");
let button2 = d3.select("#buttonClear");

button.on("click", search);
button2.on("click", clearInputs);

function clearBody(){
    d3.select("tbody").html("");
};

function clearInputs(){
    d3.event.preventDefault();
    let values = d3.selectAll(".form-control")._groups[0];
    console.log(values);
    values.forEach(value => value.value="");
    clearBody();
    table(tableData);
}

function search(){
    // Prevent the page from refreshing
    d3.event.preventDefault();
/* 
    let values = []
    d3.selectAll(".form-control").nodes().forEach(x=>values.push(x.value))
    console.log(values); */
    let inputValDate = d3.select("#Date").property("value");
    let inputValCountry = d3.select("#Country").property("value");
    let inputValState = d3.select("#State").property("value").toLowerCase();
    let inputValCity = d3.select("#City").property("value").toLowerCase();
    let inputValShape = d3.select("#Shape").property("value");
    
    let filteredTable = tableData.filter(x=> x.datetime===inputValDate && x.country===inputValCountry && x.state===inputValState && x.shape===inputValShape && x.city===inputValCity);

    if(filteredTable.length===0){
        clearBody();
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