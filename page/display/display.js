const container = document.getElementById("display")

// import the navbar
const navdoc = document.getElementById("nav").import;
const navbar = navdoc.getElementById("navbar");
document.body.insertBefore(navbar,container);

const start = new Date(2017,0,1).getTime();
const current = new Date().getTime();

const weekNum = Math.ceil((current-start) / 1000 / 60 / 60 / 24 /7);

const colorwheel = 
	["#FFECB3",
	"#FFE0B2",
	"#FFCCBC",
	"#FFF9C4"];

var recipes = [];

const overlay = document.querySelector(".overlay");

function images() {

	imgDim = 225	
	borderDim= 10

	// create colored div for each item
	// add captions
	
	var i = 0 
	recipes.weeks.forEach(
		function(recipe){
			newDiv = document.createElement("div");
			newDiv.classList.add("d-flex", "flex-column", "captioned");
			newDiv.id = `${i}`;

			newImg = document.createElement("img");
			newImg.style.width = `${imgDim}px`;
			newImg.style.border = `${borderDim}px solid ${colorwheel[i%4]}`;
			try { 
				newImg.src = `../images/${recipe.image}`; 
			} catch (error) {
				newImg.src = `../images/blank.jpeg`
			}
			

			newCaption = document.createElement("span");
			newCaption.innerHTML = `${recipe.date}`;
			newCaption.style.backgroundColor = `${colorwheel[i%4]}`;
			newCaption.style.width = `${imgDim}px`;
			
			newDiv.appendChild(newImg);
			newDiv.appendChild(newCaption);
			container.appendChild(newDiv);

			i++

			})

	desserts = document.querySelectorAll(".captioned");
	desserts.forEach(function(dessert) {
		dessert.addEventListener("mouseover",showDetail);
		dessert.addEventListener("click",showDetail);
		})

	function showDetail(){
		try {
			overlay.innerHTML = `${recipes.weeks[this.id].descriptor} ${recipes.weeks[this.id].category}`
		} catch (error) {
			overlay.innerHTML = "coming soon!"
		}
		const item = this.getBoundingClientRect();
		const body = document.querySelector("body").getBoundingClientRect();
		const coords = {
			w: item.width,
			h: item.height,
			t: item.top - body.top, // + window.scrollY,
			l: item.left + window.scrollX - borderDim
		};
      overlay.style.width = `${coords.w}px`;
      overlay.style.height = `${coords.h}px`;
      overlay.style.transform = `translate(${coords.l}px,${coords.t}px)`;
      overlay.style.opacity = `0.8`;
	}

}

// get JSON file with descriptors
function getData(){
	return $.ajax({
	    url: `../data.json`,
	    success: function (data) {
	        recipes = data;
	    }
	});
}

getData().then(images)


