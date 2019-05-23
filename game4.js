var inCase = 0;
var caseName =[];


class WhichCase {
	selectCase (e){
		if ((caseName.indexOf(e.target.id))!=-1){
			alert ("case déjà occupée");
		}else {
			
			tagName[e.target.id].insertAdjacentHTML('afterbegin', gamer.whichGamer());
			caseName.push(e.target.id);
			if (caseName.length > 8){
				victoryCondition.array1st2ndGamers();
			}
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

	array1st2ndGamers(){
		let array1stGamer =[];
		let array2ndGamer = [];

		for (let i = 0; i < caseName.length; i+=2){
			array1stGamer.push(caseName[i]);	
		}
		for (let j = 1; j<caseName.length; j+=2){
				array2ndGamer.push(caseName[j]);
		}
		alert(array1stGamer.sort());
		alert(array2ndGamer.sort());
	}

	/*gameVictor(){
		array.sort()
		for i = 0,...
			if i+2 < array.length;
				



			condition de victoire
				switch (A1, A2, A3)
					case 1 (A1+2 = A2+1 = A3)
					case 2 (A1 +6 = A2 +3 = A3)
					case 3 (A1+8 = A2+4 = A3)
					case 4 (A1 +4 = A2+2 = A3)

	}*/
}

//run the programm
let gamer = new DefineGamer();
let defineCase = new WhichCase();
let victoryCondition = new Victory();
let board = document.getElementById('toutesCases');
let defineName = document.getElementById('changeNames');
let tagName = document.getElementsByTagName("td");
defineName.addEventListener("click", gamer.defineNameGamers);
board.addEventListener("click", defineCase.selectCase);