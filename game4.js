var inCase = 0;
var caseName =["case3"];


class WhichCase {

	selectCase (e){

		if ((caseName.indexOf(e.target.id))!=-1){
			alert ("case déjà occupée");
		}else {
			
			let test = gamer.whichGamer();
			tagName[e.target.id].innertHTML = e.target.id;
			alert (e.target.id);
		}
	}
}


// define the gamer
class DefineGamer {
	constructor (){
		this.J1 = 0;
		this.J2 = 1;
		this.nameGamer = "";
	}

	whichRound (inCase){
		if (inCase <1){ 
			return (inCase +=1);
		}else {
			return (inCase = 0);
		}
	}

	whichGamer(){
		if (inCase == this.J1){
			return (this.nameGamer ="Joueur 1");
		}else {
			return (this.nameGamer = "Joueur 2");
		}
	}

}

//run the programm
let gamer = new DefineGamer();
let defineCase = new WhichCase();
let board = document.getElementById('toutesCases');
let tagName = document.getElementsByTagName("td");
board.addEventListener("click", defineCase.selectCase);