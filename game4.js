var inCase = 0;
var caseName =[];


class WhichCase {
	selectCase (e){
		if ((caseName.indexOf(e.target.id))!=-1){
			alert ("case déjà occupée");
		}else {
			
			tagName[e.target.id].insertAdjacentHTML('afterbegin', gamer.whichGamer());
			caseName.push(e.target.id);
			
				victoryGame.array1st2ndGamers();
			
		}
	}
}

// define the gamer
class DefineGamer {
	constructor (){
		this.J1 = 0;
		this.nameGamer = "";
		this.J1Name ="Joueur 1";
		this.J2Name = "Joueur 2";
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
			this.J1Name = question1;
			this.J2Name = question2;
			document.getElementById("joueur1").innerHTML= this.J1Name;
			document.getElementById("joueur2").innerHTML= this.J2Name;
		}
	}

	whichGamer(){
		if (inCase == this.J1){
			inCase = 1;
			return (this.J1Name);
		}else {
			inCase = 0;
			return (this.J2Name);
		}
	}
}

//define victory's condition with a switch. 
//objective : divide the caseName array between J1 and J2, and verify if one of them wins. 
class Victory {
	constructor(){
		this.array1stGamer =[];
		this.array2ndGamer = [];
		this.A1 = 90;
		this.A2 = 90;
		this.A3 = 90;
		this.victoryPlayer = false;
	}

	array1st2ndGamers(){
		if (caseName.length%2 === 1){
			this.array1stGamer.push(caseName[caseName.length-1]);
		}else {
			this.array2ndGamer.push(caseName[caseName.length-1]);
		}
		this.analyseArray();
	}

	analyseArray(){
		this.array1stGamer.sort();
		this.array2ndGamer.sort();

		condition: {
			for (let l = 0; l<this.array1stGamer.length; l++){
				this.A1 = parseInt(this.array1stGamer[l], 10);
				for (let j = 1; j < this.array1stGamer.length; j++){
					this.A2 = parseInt(this.array1stGamer[j], 10);
					for (let k=2; k<this.array1stGamer.length; k++){
						this.A3 = parseInt(this.array1stGamer[k], 10);
						this.victoryCondition();
						if (this.victoryPlayer == true){
							console.log("fini");
							break condition;
						}
					}
				}
			}


			for (let l = 0; l<this.array2ndGamer.length; l++){
				this.A1 = parseInt(this.array2ndGamer[l], 10);
				for (let j = 0; j < this.array2ndGamer.length; j++){
					this.A2 = parseInt(this.array2ndGamer[j], 10);
					for (let k=0; k<this.array2ndGamer.length; k++){
						this.A3 = parseInt(this.array2ndGamer[k], 10);
						this.victoryCondition();
						if (this.victoryPlayer == true){
							console.log("Joueur2 a gagné");
							gameContinue.endGame();
							break condition;
						}
					}
				}
			}
		}

	}

	victoryCondition(){
		if (((this.A1+2 == this.A2+1) && (this.A2+1== this.A3) && ((this.A1+this.A2+this.A3) == 3 ||(this.A1+this.A2+this.A3) == 12 || (this.A1+this.A2+this.A3) ==21) )|| 
			((this.A1+6 == this.A2+3) && (this.A2+3 == this.A3)) ||
			((this.A1+8 == this.A2+4) && (this.A2+4 == this.A3)) || 
			((this.A1+4 == this.A2+2) && (this.A2+2 == this.A3)) && (this.A1+this.A2+this.A3 == 12)) {
			return (this.victoryPlayer = true);

		}
	}
}


class GameOver{

	endGame(){
		prompt ("voulez vous continuer ?")
	}
}


//run the programm
let gamer = new DefineGamer();
let defineCase = new WhichCase();
let victoryGame = new Victory();
let gameContinue = new GameOver();
let board = document.getElementById('toutesCases');
let defineName = document.getElementById('changeNames');
let tagName = document.getElementsByTagName("td");
defineName.addEventListener("click", gamer.defineNameGamers);
board.addEventListener("click", defineCase.selectCase);