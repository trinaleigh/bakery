// js goes here!

const container = document.getElementById("display")

const start = new Date(2017,0,1).getTime();
const current = new Date().getTime();

const weekNum = Math.ceil((current-start) / 1000 / 60 / 60 / 24 /7);

const colorwheel = 
	["#FFECB3",
	"#FFE0B2",
	"#FFCCBC",
	"#FFF9C4"
	];

for (let i = 1; i < 52; i++){

	newImg = document.createElement("img");
	newImg.style.height = `300px`;
	newImg.style.border = `10px solid ${colorwheel[i%4]}`;
	newImg.id = `w${i}`;
	if (i<= weekNum){
		newImg.src = `images/w${i}.jpg`;
	} else {
		newImg.src = `images/blank.jpeg`;
	}
	
	container.appendChild(newImg);
}

