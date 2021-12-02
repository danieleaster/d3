//execute script when window is loaded
window.onload = function(){

   var container = d3.select("body") //get the <body> element from the DOM

};
//SVG dimension variables
var w = 900, h = 500;

//Example 1.5 line 1...container block
var container = d3.select("body") //get the <body> element from the DOM
   .append("svg") //put a new svg in the body
   .attr("width", w) //assign the width
   .attr("height", h) //assign the height
   .attr("class", "container") //assign a class name
   .style("background-color", "rgba(0,0,0,0.2)"); //svg background color

//Example 1.7 line 1...innerRect block
var innerRect = container.append("rect") //put a new rect in the svg
   .datum(400) //a single value is a datum
   .attr("width", function(d){ //rectangle width
       return d * 2; //400 * 2 = 800
   })
   .attr("height", function(d){ //rectangle height
       return d; //400
   })
   .attr("class", "innerRect") //class name
   .attr("x", 50) //position from left on the x (horizontal) axis
   .attr("y", 50) //position from top on the y (vertical) axis
   .style("fill", "#FFFFFF"); //fill color
//below Example 1.9
var dataArray = [10, 20, 30, 40, 50];

var cityPop = [
    {
        city: 'Memphis',
        population: 633104
    },
    {
        city: 'Nashville',
        population: 689447
    },
    {
        city: 'Chattanooga',
        population: 181099
    },
    {
        city: 'Knoxville',
        population: 190740
    }
];

//above Example 2.8 line 20
var x = d3.scaleLinear()  //create the scale
    .range([100, 725]) //output min and max
    .domain([0, 3]); //input min and max

//above Example 2.8 line 20
//find the minimum value of the array
var minPop = d3.min(cityPop, function(d){
    return d.population;
});

//find the maximum value of the array
var maxPop = d3.max(cityPop, function(d){
    return d.population;
});

//scale for circles center y coordinate
var y = d3.scaleLinear()
    .range([450, 50])
    .domain([0,800000]);

//above Example 2.8 line 20
//color scale generator
var color = d3.scaleLinear()
    .range([
        "#FDBE85",
        "#D94701"
    ])
    .domain([
        minPop,
        maxPop
    ]);

//Example 2.6 line 3
var circles = container.selectAll(".circles") //create an empty selection
    .data(cityPop) //here we feed in an array
    .enter() //one of the great mysteries of the universe
    .append("circle") //inspect the HTML--holy crap, there's some circles there
    .attr("class", "circles")
    .attr("id", function(d){
        return d.city;
    })
    .attr("r", function(d){
        //calculate the radius based on population value as circle area
        var area = d.population * 0.01;
        return Math.sqrt(area/Math.PI);
    })
    .attr("cx", function(d, i){
      //x axes set using d3.scaleLinear function
        return x(i);
    })
    .attr("cy", function(d){
        //y axes set using min and max population fed into another d3.scaleLinear function
        return y(d.population);
    })
    .style("fill", function(d, i){
      return color (d.population);
    })
    .style("stroke", "#000");
//below Example 3.5...create y axis generator
var yAxis = d3.axisLeft(y)
    .scale(y);
//    .orient("left") //oriented left by d3.axisLeft

//create axis g element and add axis
var axis = container.append("g")
    .attr("class", "axis")
    .attr("transform", "translate (50, 0)")
    .call(yAxis);

//below Example 3.9...create a text element and add the title
var title = container.append("text")
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .attr("x", 450)
    .attr("y", 30)
    .text("Tennessee City Populations (2020)");

    //below Example 3.12...create circle labels
var labels = container.selectAll(".labels")
    .data(cityPop)
    .enter()
    .append("text")
    .attr("class", "labels")
    .attr("text-anchor", "left")
    .attr("x", function(d,i){
       //horizontal position to the right of each circle
       return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
    })
    .attr("y", function(d){
       //vertical position centered on each circle
       return y(d.population) + 0;
    });

//first line of label
var nameLine = labels.append("tspan")
    .attr("class", "nameLine")
    .attr("x", function(d,i){
        //horizontal position to the right of each circle
        return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
    })
    .text(function(d){
        return d.city;
    });

//create format generator
var format = d3.format(",");

//second line of label
var popLine = labels.append("tspan")
    .attr("class", "popLine")
    .attr("x", function(d,i){
        //horizontal position to the right of each circle
        return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
    })
    .attr("dy", "15")
    .text(function(d){
        return "Pop. " + format(d.population);
    });
