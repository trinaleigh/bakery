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

function images() {
	for (let i = 1; i <= 52; i++){

		newDiv = document.createElement("div");
		newDiv.classList.add("d-flex", "flex-column", "captioned");

		newImg = document.createElement("img");
		newImg.style.height = `300px`;
		newImg.style.border = `10px solid ${colorwheel[i%4]}`;
		newImg.id = `w${i}`;

		if (i<= weekNum){
			newImg.src = `images/w${i}.jpg`;
		} else {
			newImg.src = `images/blank.jpeg`;
		}

		newCaption = document.createElement("span");
		newCaption.innerHTML = `week ${i}`;
		newCaption.style.backgroundColor = `${colorwheel[i%4]}`;
		
		newDiv.appendChild(newImg);
		newDiv.appendChild(newCaption);
		container.appendChild(newDiv);
	}

}

function captions(){
	// fix caption width after page load
	captions = document.querySelectorAll("span");
	captions.forEach(function(caption){
		w = caption.parentElement.offsetWidth;
		caption.style.width = w;	
	})
}



images()

$(document).ready(function () {
    captions();
});
