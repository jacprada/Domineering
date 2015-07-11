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
	this.display = $(".display");
	this.cells = $(".grid");
	this.width = $(".1");
	var $clear = $(".clear");

	this.counter = 0;
	this.fullGrid = [ 1,2,3,4,5,6 ];

	this.cells.attr("disabled", false);
	this.cells.css("background-color", "white");
	this.cells.on("click", this.getInput);
	$clear.on("click", this.setUp);
	console.log("setup");
}

Dom.getInput = function() {
	if (Dom.counter % 2 == 0) {
		var playerXInput = $(this).val();
		var playerXIndex = $(this).index();
		var playerXXIndex = Dom.cells.eq((playerXIndex + 1));

		$(this).css("background-color", "yellow");
		playerXXIndex.css("background-color", "yellow");

		$(this).attr("disabled", true);
		playerXXIndex.attr("disabled", true);

		console.log(playerXXIndex);

		Dom.counter += 1;
		Dom.testWinX(playerXInput);
	} else if (Dom.counter % 2 != 0) {
		var playerOInput = $(this).val();
		var playerOIndex = $(this).index();
		var arrayLength = Dom.width.length;
		var playerOOIndex = Dom.cells.eq((playerOIndex + arrayLength));

		$(this).css("background-color", "red");
		playerOOIndex.css("background-color", "red");

		$(this).attr("disabled", true);
		playerOOIndex.attr("disabled", true);

		Dom.counter += 1;
		Dom.testWinO(playerOInput);
	}
}

Dom.testWinX = function(playerXInput) {
	
}

Dom.testWinO = function(playerOInput) {
	// console.log(playerOInput);
}






