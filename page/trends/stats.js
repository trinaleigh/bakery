const firstChart = document.getElementById("bubble")

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
    .outerRadius(r-10)
    .innerRadius(r/4);

var label = d3.arc()
    .outerRadius(r - 50)
    .innerRadius(r - 50);

var svg = d3.select("#pie").append("svg")
    .attr("width", w)
    .attr("height", h)
  	.append("g")
    .attr("transform", "translate(" + w/2 + "," + h/2 + ")");

// pie chart for categories
d3.json("../data.json", function(data) {

  var countType = d3.nest()
    		.key(function(d) { return d.category; })
    		.rollup(function(v) { return v.length; })
    		.entries(data.weeks);

  var slice = svg.selectAll("slice")
      .data(pie(countType))
      .enter()
      .append("g");

  slice.append("path")
      .attr("d", arc)
      .style("fill", function (d) { return color(d.data.key); })
      .style("stroke", "#E57373")
      .style("stroke-width","5");

  slice.append("text")
      .attr("dy", ".5em")
      .attr("class","chartLabel")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("text-anchor","middle")
      .text(function(d) { return d.data.key; });
   	
});


// bubble chart for descriptors

var bubble = d3.pack()
    .size([r*2, r*2])
    .padding(1.5);

var nextsvg = d3.select("#bubble").append("svg")
    .attr("width", w)
    .attr("height", h)
    .append("g")

d3.json("../data.json", function(data) {

  var countFlavor = d3.nest()
        .key(function(d) { return d.descriptor; })
        .rollup(function(v) { return v.length; })
        .entries(data.weeks);

  // reformat to JSON parent/child list
  var flavorList = []
  countFlavor.forEach(flavor => {
    item = {"name": flavor.key, 
    "size": String(flavor.value)};
    flavorList.push(item);
  });

  var flavorJSON = {"name": "flavors",
    "children" : flavorList};
  
  // run through d3 hierarcy
  var root = d3.hierarchy(flavorJSON)
    .sum(function(d) { return d.size; })
    .sort(null);

  bubble(root);

  var node = nextsvg.selectAll("node")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function (d) {return color(d.data.name)})
      .style("stroke", "#E57373")
      .style("stroke-width","5");

  text = node.append("text")
      .attr("y", function(d){return `${d.data.name.split(' ').length/-2}em`})
      .style("text-anchor", "middle")
      .attr("class","chartLabel")

    for (i = 0; i <4 ; i++){
      text.append("tspan")    
          .text(function(d) { return d.data.name.split(' ')[i]; })
          .attr("dy", `1em`)
          .attr("x", `0`)
    }


});
