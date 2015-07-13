$(function(){
	Dom.setUp();
});

var Dom = {};


//function to generate interactive grid, setup gameplay features and launch actual game 

Dom.setUp = function() {
	$("body").append("<div id='header'></div");
	$("#header").append("<input type='text' id='display' readonly>");
	$("#header").append("<input type='button' id='clear'>");
	$("body").append("<div id='main'></div");

	//allow player to select the size of the grid (number of squares) and determine the ideal number of lines
	this.numberOfSquares = parseInt(prompt("Select the number of squares in the grid", "9"));
	this.width = Math.round(Math.sqrt(this.numberOfSquares));

	//generate customized grid: squares are "li" determined by user and contained within one "ul"
	$("#main").append("<ul id='grid'></ul>");
	this.grid = $("#grid");
	this.grid.css("width", this.width * 100 + "px");
	for (var i = 0; i < this.numberOfSquares; i++) {
		this.grid.append("<li></li>"); 
	}
	this.cells = $("li");

	//create a comparison array that contains as many elements as the number of squares in the grid (self-invoking function)
	this.fullGrid = (function(){
		var array = [];
		for (var i = 0; i < Dom.numberOfSquares; i++) {
			array.push(i);
		}
		return array;
	})();


	//define starting elements for the actual game to run
	this.counter = 0;
	this.cells.css("background-color", "white");

	//make the game run by selecting the first cell
	this.cells.on("click", this.getInput);
};


//function that gets the input from each player, depending on the turn

Dom.getInput = function() {
	//determines the game turn based on the counter
	if (Dom.counter % 2 === 0) {

		//save cell selected by the player together with extra cell (+1 for horizontal move)
		var playerXIndex = Dom.cells.index(this);
		var playerXXIndex = playerXIndex + 1;

		//make sure player selects cells on same line (horizontal move only)
		if (Math.floor(playerXIndex/Dom.width) !== Math.floor(playerXXIndex/Dom.width)) {
			console.log("Nope....");
		} 

		//determine if player can actually select the chosen cells (if they exist and are not already selected)
		else if (Dom.canMove(playerXIndex) && Dom.canMove(playerXXIndex)) {

			//mark selected cells, assign value null in the comparison array and increase value of counter 
			$(this).css("background-color", "yellow");
			$(Dom.cells[playerXXIndex]).css("background-color", "yellow");
			Dom.fullGrid[playerXXIndex] = null;
			Dom.fullGrid[playerXIndex] = null;
			Dom.counter += 1;
			
			//test winning conditions for the other player: if he is unable to select cells, game is over 
			if (Dom.testWin(Dom.width)) {
				console.log("X Wins");
			} else {
				console.log("Continue...");
			}
		} else {
			console.log("Nope....");
		}

		//determines the game turn based on the counter
	} else if (Dom.counter % 2 !== 0) {

		//save cell selected by the player together with extra cell (+width for vertical move)
		var playerOIndex = Dom.cells.index(this);
		var playerOOIndex = playerOIndex + Dom.width;

		//determine if player can actually select the chosen cells (if they exist and are not already selected)
		if (Dom.canMove(playerOIndex) && Dom.canMove(playerOOIndex)) {

			//mark selected cells, assign value null in the comparison array and increase value of counter
			$(this).css("background-color", "red");
			$(Dom.cells[playerOOIndex]).css("background-color", "red");
			Dom.fullGrid[playerOOIndex] = null;
			Dom.fullGrid[playerOIndex] = null;
			Dom.counter += 1;
			
			//test winning conditions for the other player: if he is unable to select cells, game is over
			if (Dom.testWin(1)) {
				console.log("O Wins");
			} else {
				console.log("Continue");
			}
		} else {
			console.log("Nope....");
		}
	}
};


//function to determine if the players are allowed to move on selected cells

Dom.canMove = function(square) {
	//cells are available if they exist on the grid and are not already selected by the players
	if (Dom.fullGrid[square] === undefined || Dom.fullGrid[square] === null) {
		return false;
	} else {
		return true;
	}
};


//function to test winning conditions by checking if enough cells for more player moves actually exist

Dom.testWin = function(value) {
	var i = 0;
	var len = Dom.fullGrid.length;
	var win = true;

	//run the functions that determine if players are allowed to move on all elements of the comparison array 
	for (i; i < len; i++) {
		if (Dom.canMove(i) && Dom.canMove(i + value)) {
			win = false;
			break;
		}
	}
	return win;
};
