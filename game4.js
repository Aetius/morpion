var inCase = 0;
var caseName =[];
var pointsJ1 = 0;
var pointsJ2 = 0;
J1Name ="Joueur 1";
J2Name = "Joueur 2";
let J1Image = new Image();
let J2Image = new Image(10, 10);


class Vue {
	
//be careful : these attributes need to stay after for.
	boardCreation(){
		let table = document.createElement("table");
		let tableBody = document.createElement("tbody");
		let k = 0;

		for (let i = 0; i<3; i++){
			let row = document.createElement("tr"); 
			
			for (let j = 0; j<3; j++){
				let cell = document.createElement("td");
				row.appendChild(cell);
				cell.setAttribute("id", k);
				k+=1;
			}
			tableBody.appendChild(row);
		}	
		table.appendChild(tableBody);
		creation.appendChild(table);
		table.setAttribute("id", "toutesCases")
		let board = document.getElementById('toutesCases');
		return board;
	}

	boardInitialisation(){
		let allCases = document.getElementById("toutesCases");
		creation.removeChild(allCases);
		this.boardCreation();
	}

	selectCase (e){
		if ((caseName.indexOf(e.target.id))!=-1){
			alert ("case déjà occupée");
		}else {
			let createImage = document.createElement("img", 100, 100);
			tagName[e.target.id].appendChild(createImage);
			createImage.setAttribute("src",gamer.whichGamer());
			createImage.setAttribute("width", 80);

			//tagName[e.target.id].insertAdjacentHTML('afterbegin', gamer.whichGamer());
			caseName.push(e.target.id);
			victoryGame.array1st2ndGamers();
		}
	}

	updatePoints(){
		document.getElementById("scoreJ1").innerHTML =pointsJ1;
		document.getElementById("scoreJ2").innerHTML =pointsJ2;
		
	}
}

// define the gamer
class DefineGamer {
	constructor (){
		this.J1 = 0;
	}

	defineNameGamers(){
		let question1 = "";
		let question2 = "";
		
		while (!(/^[a-z1-9A-Z]{1,10}$/.test(question1))){
			question1 = prompt ("Joueur 1, Tapez un nom valide")
		}
		while (!(/^[a-z1-9A-Z]{1,10}$/.test(question2))){
				question2 = prompt ("Joueur 2 : Tapez un nom valide.");
			}
		
		if ((question1 != null) && (question2 != null)){
			J1Name = question1;
			J2Name = question2;
			document.getElementById("joueur1").innerHTML= J1Name;
			document.getElementById("joueur2").innerHTML= J2Name;
		}
	}

	whichGamer(){
		if (inCase == this.J1){
			inCase = 1;
			J1Image.src = "J1_minion.jpg";
			return (J1Image.src);
		}else {
			inCase = 0;
			J2Image.src = "J2_minion.jpg";
			return (J2Image.src);
		}
	}
}

//define victory's condition with a switch. 
//objective : divide the caseName array between J1 and J2, and verify if one of them wins. 
class Victory {
	constructor(){
		this.array1stGamer =[];
		this.array2ndGamer = [];
		this.currentArray = [];
		this.A1 = 90;
		this.A2 = 90;
		this.A3 = 90;
		this.victoryPlayer = false;
	}

//répétition de code : possible à supprimer ? 
	array1st2ndGamers(){
		if (inCase == 1){
			this.array1stGamer.push(caseName[caseName.length-1]);
			this.currentArray = this.array1stGamer.sort();
			this.analyseArray();
			if (this.victoryPlayer == true){
				alert (J1Name + ' a gagné');
				pointsJ1 += 1;
				gameContinue.endGame();
			}
		}else {
			this.array2ndGamer.push(caseName[caseName.length-1]);
			this.currentArray = this.array2ndGamer.sort();
			this.analyseArray();
			if (this.victoryPlayer == true){
				alert (J2Name + ' a gagné');
				pointsJ2 += 1;
				gameContinue.endGame();
			}
		}
		vueGame.updatePoints();
	}

//find all the combination, and send them for analyze. 
	analyseArray(){
		condition: {
			for (let i = 0; i<this.currentArray.length; i++){
				this.A1 = parseInt(this.currentArray[i], 10);
				for (let j = 1; j < this.currentArray.length; j++){
					this.A2 = parseInt(this.currentArray[j], 10);
					for (let k=2; k < this.currentArray.length; k++){
						this.A3 = parseInt(this.currentArray[k], 10);
						this.victoryCondition();
						break condition;
					}
				}
			}
		}
	}

//analyze of the combination sent by analyze array. 
	victoryCondition(){
		if (((this.A1+2 == this.A2+1) && (this.A2+1== this.A3) && ((this.A1+this.A2+this.A3) == 3 ||(this.A1+this.A2+this.A3) == 12 || (this.A1+this.A2+this.A3) ==21) )|| 
			((this.A1+6 == this.A2+3) && (this.A2+3 == this.A3)) ||
			((this.A1+8 == this.A2+4) && (this.A2+4 == this.A3)) || 
			((this.A1+4 == this.A2+2) && (this.A2+2 == this.A3)) && (this.A1+this.A2+this.A3 == 12)) {
			return (this.victoryPlayer = true);

		}else if (caseName.length == 9){
			alert ("match nul");
			//go to endGame.
		}
	}
}


class GameOver{
	constructor(){
		this.continue = '';
	}

	endGame(){
		this.continue = prompt ("voulez vous continuer ?", "oui/non");
		if ((this.continue == null) || (this.continue.toLowerCase() == "non")){
			alert ("fin de partie");
		
		}else if (this.continue.toLowerCase() == "oui"){
			this.initialization();
			vueGame.boardInitialisation();
		
		}else {
			this.endGame();
		}

	}

	initialization(){
		caseName.splice(0);
		victoryGame.array1stGamer.splice(0);
		victoryGame.array2ndGamer.splice(0);
		victoryGame.currentArray.splice(0);
		victoryGame.A1 = 90;
		victoryGame.A2 = 90;
		victoryGame.A3 = 90;
		victoryGame.victoryPlayer = false;


		vueGame.boardInitialisation();
	}
}


//run the programm
let vueGame = new Vue();
let creation = document.getElementById('creationBoard');

let victoryGame = new Victory();
let gameContinue = new GameOver();
let gamer = new DefineGamer();
let defineName = document.getElementById('changeNames');
let tagName = document.getElementsByTagName("td");

window.onload = vueGame.boardCreation();

defineName.addEventListener("click", gamer.defineNameGamers);
board.addEventListener("click", vueGame.selectCase);
