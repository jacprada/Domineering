// creare griglia 8x8 in html + tasto clear
// definire funzione setup in grado di:
// 	- associare elementi html a elementi js tramite jquery
// 	- sbloccare tutte le celle disponibili
// 	- definire un array di arrays in cui ogni elemento corrisponde ad una cella della griglia
// 	- definire un counter per alternare i turni tra i due giocatori
// 	- definire metodo click affinche primo giocatore possa dare inizio alla partita selezionando una combo di celle
// 	- definire metodo click affinche giocatore possa rilanciare funzione setup clicclando il tasto clear
// definire funzione di gioco in grado di:
// 	- colorare celle selezionate da giocatore
// 	- bloccare celle selezionate da giocatore
// 	- assegnare valore (X, O) distintivo giocatore a valore cella selezionata da giocare
// definire funzione di valutazione partita in grado di:
// 	- valutare correlazione tra selezione giocatore ed elementi array
// 	- se celle sono disponibili per selezione, proseguire nella gara
// 	- se celle non sono disponibili per selezione, lanciare funzione di fine match
// definire funzione di fine match in grado di:
// 	- bloccare tutte le celle
// 	- annunciare vincitore

$(function(){
	Dom.setUp();
})

var Dom = {};

Dom.setUp = function() {
	$('body').append("<ul id='grid'></ul>"); //creazione ul chiamato grid dentro il body
	this.grid = $("#grid");
	var squares = prompt("Select the number of squares in the grid");//giocatore seleziona numero di quadrati per partita
	this.numberOfSquares = parseInt(squares);
	this.width = Math.round(Math.sqrt(this.numberOfSquares)); //calcolo di lunghezza ottimale per numero di quadrati specificati
	this.grid.css("width", this.width * 100 + "px"); //definizione grafica griglia
	this.counter = 0; //counter per conteggio giocata

	for (var i = 0; i < this.numberOfSquares; i++) {
		this.grid.append("<li></li>"); //creazione li interni al ul chiamato grid
	}
	this.cells = $("li"); //creazione array di tutti i li contenuti in grid

	this.fullGrid = (function(){
		var array = [];
		for (var i = 0; i < Dom.numberOfSquares; i++) {
			array.push(i);
		}
		return array;
	})(); //Self-Invoking Anonymous Function che genera una array lunga quanto il numero di quadrati nella grid

	$("input[type=button]").attr("disabled", false);
	this.cells.css("background-color", "white");
	this.cells.on("click", this.getInput);//ad ogni cella clicckata su attiva la funzione di gioco
}

Dom.canMove = function(square) {
	if (Dom.fullGrid[square] === undefined || Dom.fullGrid[square] === null) {
		return false;
	} else {
		return true;
	}
}

Dom.getInput = function() {
	if (Dom.counter % 2 == 0) {
		var playerXIndex = Dom.cells.index(this);//assegna a variable index value della cella cliccata
		var playerXXIndex = playerXIndex + 1;//assegna a variable index value della della cella successiva (giocata orizzontale)

		if (Math.floor(playerXIndex/Dom.width) !== Math.floor(playerXXIndex/Dom.width)) {
			console.log("Nope...."); //non consente di giocare su linee diverse

		} else if (Dom.canMove(playerXIndex) && Dom.canMove(playerXXIndex)) {//controlla se cella è già occupata/non esistente: funzione canMove restituisce true in caso di giocabilità
			$(this).css("background-color", "yellow");//colora celle
			$(Dom.cells[playerXXIndex]).css("background-color", "yellow");
			
			Dom.fullGrid[playerXXIndex] = null;//rende celle inutilizzabili definendone il contenuto "null"
			Dom.fullGrid[playerXIndex] = null;
			Dom.counter += 1;//aumenta il contatore
			
			if (Dom.testWin(Dom.width)) {//testa winning conditions (rispetto all'altro giocatore): se si realizzano, partita finsice e giocatore vince
				console.log("X Wins");
			} else {
				console.log("Continue...");
			}
			
		} else {
			console.log("Nope....")
		}

	} else if (Dom.counter % 2 != 0) {
		var playerOIndex = Dom.cells.index(this);//assegna a variable index value della cella cliccata
		var playerOOIndex = playerOIndex + Dom.width;//assegna a variable index value della della cella successiva (giocata orizzontale)

		if (Dom.canMove(playerOIndex) && Dom.canMove(playerOOIndex)) {//controlla se cella è già occupata/non esistente: funzione canMove restituisce true in caso di giocabilità
			$(this).css("background-color", "red");
			$(Dom.cells[playerOOIndex]).css("background-color", "red");

			Dom.fullGrid[playerOOIndex] = null;//rende celle inutilizzabili definendone il contenuto "null"
			Dom.fullGrid[playerOIndex] = null;
			
			Dom.counter += 1;
			
			if (Dom.testWin(1)) {//testa winning conditions (rispetto all'altro giocatore): se si realizzano, partita finsice e giocatore vince
				console.log("O Wins");
			} else {
				console.log("Continue");
			};

		} else {
			console.log("Nope....")
		}
	}
}

Dom.testWin = function(value) {//funzione relativa a winning conditions
	var i = 0,
			len = Dom.fullGrid.length,
			win = true;
	for (i; i < len; i++) {//testa se giocatore è ancora in grado di muoversi sulla plancia: esistono celle disponibili?
		if (Dom.canMove(i) && //esiste cella numero uno?
				Dom.canMove(i + value)) {//esiste cella numero due (+1 in caso orizzontale, +wdith in caso di verticale?
			win = false;
			break;
		}
	}
	return win;
}
