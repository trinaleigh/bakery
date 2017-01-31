// js goes here!

const container = document.getElementById("display")

const start = new Date(2017,0,1).getTime();
const current = new Date().getTime();

const weekNum = Math.ceil((current-start) / 1000 / 60 / 60 / 24 /7);

const colorwheel = 
	["#FFECB3",
	"#FFE0B2",
	"#FFCCBC",
	"#FFF9C4"];

var recipes = [];

function images() {

	imgDim = 225	
	borderDim= 10

	for (let i = 1; i <= 52; i++){

		newDiv = document.createElement("div");
		newDiv.classList.add("d-flex", "flex-column", "captioned");
		newDiv.id = `${i}`;

		newImg = document.createElement("img");
		newImg.style.width = `${imgDim}px`;
		newImg.style.border = `${borderDim}px solid ${colorwheel[i%4]}`;
		

		if (i<= weekNum){
			newImg.src = `images/w${i}.jpg`;
		} else {
			newImg.src = `images/blank.jpeg`;
		}

		newCaption = document.createElement("span");
		newCaption.innerHTML = `week ${i}`;
		newCaption.style.backgroundColor = `${colorwheel[i%4]}`;
		newCaption.style.width = `${imgDim}px`;
		
		newDiv.appendChild(newImg);
		newDiv.appendChild(newCaption);
		container.appendChild(newDiv);
	}

	desserts = document.querySelectorAll(".captioned");
	desserts.forEach(function(dessert) {
		dessert.addEventListener("mouseover",showDetail);
		})

	function showDetail(){
		console.log(recipes.weeks[this.id-1]);
	}

}


// get the JSON file corresponding to the song selected
function getData(){
	return $.ajax({
	    url: `data.json`,
	    success: function (data) {
	        recipes = data;
	    }
	});
}
getData().then(images)


