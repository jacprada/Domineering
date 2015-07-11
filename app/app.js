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
	this.display = $(".display");
	this.cells = $(".grid");
	var $clear = $(".clear");

	this.counter = 0;
	this.fullGrid = [	[1,2,3], [1,2,3] ];

	// this.firstRow = jQuery("#attached_docs[value='123']");
	// this.firstColumn = jQuery("#attached_docs[value='123']");

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

		$(this).css("background-color", "yellow");
		Dom.cells.eq((playerXIndex + 3)).css("background-color", "yellow");

		$(this).attr("disabled", true);
		Dom.cells.eq((playerXIndex + 3)).attr("disabled", true);

		Dom.counter += 1;
		Dom.testWinX(playerXInput);
	} else if (Dom.counter % 2 != 0) {
		var playerOInput = $(this).val();
		var playerOIndex = $(this).index();

		$(this).css("background-color", "red");
		Dom.cells.eq((playerOIndex + 1)).css("background-color", "red");

		$(this).attr("disabled", true);
		Dom.cells.eq((playerOIndex + 1)).attr("disabled", true);

		console.log("getinput2");
		Dom.counter += 1;
		console.log(Dom.counter);
		Dom.testWinO(playerOInput);
	}
}

Dom.testWinX = function(playerXInput) {

	// for (var x = 0; x < ticTacToe.playerXCombos.length; x++) {
	// 	for (var y = 0; y < ticTacToe.playerXCombos[x].length; y++) {
	// 		if (ticTacToe.playerXCombos[x][y] === playerXInput) {
	// 			var playerXCell = ticTacToe.playerXCombos[x][y];
	// 			var indexPlayerXCell = ticTacToe.playerXCombos[x].indexOf(playerXCell);
	// 			ticTacToe.playerXCombos[x].splice(indexPlayerXCell, 1);
	// 			if (ticTacToe.playerXCombos[x].length === 0) {
	// 				winner = "player X";
	// 				ticTacToe.gameOver(winner);
	console.log(playerXInput);
}

Dom.testWinO = function(playerOInput) {
	console.log(playerOInput);
}






