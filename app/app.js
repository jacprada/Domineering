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


// Player one moves
//  - check for win 
// Player two moves 
//  - check for win 

// player 1 - n plus width 
// player 2 - n plus 1 

// if the remaining squares do not have n plus width, player two wins 
// if the remaining squares do not have n plus 1, player 1 wins 

// All moves - [0,1,2,3,4,5]
// when you move, remove numbers from array

// 0,3 

// [1,2,4,5]


$(function(){
	Dom.setUp();
})

var Dom = {};

Dom.setUp = function() {
	$('body').append("<ul id='display'></ul>");
	this.display = $('#display');
	this.numberOfSquares = 16;
	this.width = Math.round(Math.sqrt(this.numberOfSquares));
	this.display.css("width", this.width * 100 + "px")
	this.counter = 0;
	
	// var $clear = $(".clear");

	for (var i = 0; i < this.numberOfSquares; i++) {
		this.display.append('<li></li>');
	}

	this.cells = $('li');

	this.fullGrid = (function(){
		var array = [];
		for (var i = 0; i < Dom.numberOfSquares; i++) {
			array.push(i);
		}
		return array;
	})();

	$('input[type=button]').attr("disabled", false);
	this.cells.css("background-color", "white");
	this.cells.on("click", this.getInput);
	// $clear.on("click", this.setUp);
	console.log("setup");
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
		var playerXIndex = Dom.cells.index(this);
		var playerXXIndex = playerXIndex + 1;

		if (Math.floor(playerXIndex/Dom.width) !== Math.floor(playerXXIndex/Dom.width)) {
			console.log("Nope....");

		} else if (Dom.canMove(playerXIndex) && Dom.canMove(playerXXIndex)) {
			$(this).css("background-color", "yellow");
			$(Dom.cells[playerXXIndex]).css("background-color", "yellow");
			
			Dom.fullGrid[playerXXIndex] = null;
			Dom.fullGrid[playerXIndex] = null;
			Dom.counter += 1;
			
			if (Dom.testWin(Dom.width)) {
				console.log("X Wins");
			} else {
				console.log("Continue...");
			}
			
		} else {
			console.log("Nope....")
		}

	} else if (Dom.counter % 2 != 0) {
		var playerOIndex = Dom.cells.index(this);
		var playerOOIndex = playerOIndex + Dom.width;

		if (Dom.canMove(playerOIndex) && Dom.canMove(playerOOIndex)) {
			$(this).css("background-color", "red");
			$(Dom.cells[playerOOIndex]).css("background-color", "red");

			Dom.fullGrid[playerOOIndex] = null;
			Dom.fullGrid[playerOIndex] = null;
			
			Dom.counter += 1;
			
			if (Dom.testWin(1)) {
				console.log("O Wins");
			} else {
				console.log("Continue");
			};

		} else {
			console.log("Nope....")
		}
	}
	console.log(Dom.fullGrid);
}

Dom.testWin = function(value) {
	var i = 0,
			len = Dom.fullGrid.length,
			win = true;
	for (i; i < len; i++) {
		if (Dom.canMove(i) && 
				Dom.canMove(i + value)) {
			win = false;
			break;
		}
	}
	return win;
}





