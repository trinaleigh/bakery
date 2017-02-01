const firstChart = document.getElementById("pie")

// import the navbar
const navdoc = document.getElementById("nav").import;
const navbar = navdoc.getElementById("navbar");
document.body.insertBefore(navbar,firstChart);

// dimenstions
const h = 500;
const w = h;
const r = Math.max(h,w)/2;

var color = d3.scaleOrdinal().range(["#FFECB3", "#FFE0B2", "#FFCCBC", "#FFF9C4"]);

var pie = d3.pie()
    .value(function(d) { return d.value; })
    .sort(function(d) { return d.value; });

var arc = d3.arc()
    .outerRadius(r)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(r - 50)
    .innerRadius(r - 50);

var svg = d3.select("#pie").append("svg")
    .attr("width", w)
    .attr("height", h)
  	.append("g")
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")");

d3.json("../data.json", function(data) {

		// roll up daily data into individual locations and count # visits
	var countType = d3.nest()
  		.key(function(d) { return d.category; })
  		.rollup(function(v) { return v.length; })
  		.entries(data.weeks);

var slice = svg.selectAll("slice")
    .data(pie(countType))
    .enter()
	.append("path")
    .attr("d", arc)
    .style("fill", function (d) { return color(d.data.key); })
 		
var category = svg.selectAll("label")
	 	.data(pie(countType))
	    .enter()
	    .append("text")
	    .attr("class","chartLabel")
		.attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.attr("text-anchor","middle")
		.text(function(d) { return d.data.key; });

  
});