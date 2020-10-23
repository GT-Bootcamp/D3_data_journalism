// @TODO: YOUR CODE HERE!

var svgWidth = 800;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("data.csv").then(function(healthData) {

    
    healthData.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    
    var xScale = d3.scaleLinear()
        .domain(d3.extent(healthData, d => d.poverty))
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain(d3.extent(healthData, d => d.healthcare))
        .range([height, 0]);

    
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    
    chartGroup.append("g")
        .call(leftAxis);

    
    chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", 9)
        .attr("fill", "blue")
        .attr("opacity", ".7");

    
    chartGroup.selectAll()
        .data(healthData)
        .enter()
        .append('text')
        .attr("x", d => xScale(d.poverty) - 5)
        .attr("y", d => yScale(d.healthcare) + 3)
        .attr("fill", "white")
        .attr("font-size", "8")
        .text(d => d.abbr);

    
    chartGroup.append('text')
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Below Poverty Threshold (%)");

    
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr('y', 0 - margin.left + 50)
        .attr("x", 0 - (height / 2) - 60)
        .attr("class", "axisText")
        .text("No Healthcare Coverage (%)");

});

// ** Update data section (Called from the onclick)
function updateData() {
   

d3.csv("data.csv").then(function(healthData2) {

    
    healthData2.forEach(function (data2) {
        data2.obesity = +data2.obesity;
        data2.smokes = +data2.smokes;
    });

    
    var xScale = d3.scaleLinear()
        .domain(d3.extent(healthData2, d => d.obesity))
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain(d3.extent(healthData2, d => d.smokes))
        .range([height, 0]);


    
    var svg = d3.select("#scatter").transition();

    
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    
    chartGroup.append("g")
        .call(leftAxis);

    
    chartGroup.selectAll("circle")
        .data(healthData2)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.obesity))
        .attr("cy", d => yScale(d.smokes))
        .attr("r", 9)
        .attr("fill", "red")
        .attr("opacity", ".7");

    
    chartGroup.selectAll()
        .data(healthData2)
        .enter()
        .append('text')
        .attr("x", d => xScale(d.obesity) - 5)
        .attr("y", d => yScale(d.smokes) + 3)
        .attr("fill", "white")
        .attr("font-size", "8")
        .text(d => d.abbr);

    
    chartGroup.append('text')
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("People Overweight (%)");

    
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr('y', 0 - margin.left + 50)
        .attr("x", 0 - (height / 2) - 60)
        .attr("class", "axisText")
        .text("People that Smoke (%)");

    });
}
// ** Update data section (Called from the onclick)
function ClearData() {

    d3.selectAll("#d3-#scatter > *").remove();; 
}
   
