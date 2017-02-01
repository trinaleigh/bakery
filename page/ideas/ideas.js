const spinners = document.getElementById("spinners")

// import the navbar
const navdoc = document.getElementById("nav").import;
const navbar = navdoc.getElementById("navbar");
document.body.insertBefore(navbar,spinners);

// get JSON file with descriptors

var recipes = [];

function getData(){
	return $.ajax({
	    url: `../data.json`,
	    success: function (data) {
	        recipes = data;
	    }
	});
}

getData();

// animate on spin

const spin = document.querySelector("button");
spin.addEventListener('click',animate)


const flav1 = document.getElementById("flav1")
const flav2 = document.getElementById("flav2")
const flav3 = document.getElementById("flav3")
const cat1 = document.getElementById("cat1")
const cat2 = document.getElementById("cat2")
const cat3 = document.getElementById("cat3")


function animate() {
	var player = setInterval(progress,100)
	spin.disabled = true;
	setTimeout(function(){
		clearInterval(player);
		spin.disabled = false;
		spin.textContent = "spin again"
	},2000)
}

function progress(){
	flav3.textContent = flav2.textContent
	cat3.textContent = cat2.textContent

	flav2.textContent = flav1.textContent
	cat2.textContent = cat1.textContent

	flav1.textContent = recipes.weeks[Math.floor(Math.random()*recipes.weeks.length)].descriptor
	cat1.textContent = recipes.weeks[Math.floor(Math.random()*recipes.weeks.length)].category
}



