$(function(){
	Dom.setUp();
});

var Dom = {};


//function to generate interactive grid, setup gameplay features and launch actual game 

Dom.setUp = function() {

	//allow player to select the size of the grid (number of squares) and determine the ideal number of lines
	this.numberOfSquares = parseInt(prompt("Select the number of squares in the grid", "9"));
	this.width = Math.round(Math.sqrt(this.numberOfSquares));

	//generate customized grid: squares are "li" determined by user and contained within one "ul"
	$("body").append("<ul id='grid'></ul>");
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

	this.display = $("#display");
	this.clear = $("#clear");
	this.clear.on("click", function(){
		location.reload();
	});
};


//function that gets the input from each player, depending on the turn

Dom.getInput = function() {
		//save cell selected by the player together with extra cell (+1 for horizontal move)
		var playerXIndex = Dom.cells.index(this);
		var playerXXIndex = playerXIndex + 1;

		//make sure player selects cells on same line (horizontal move only)
		if (Math.floor(playerXIndex/Dom.width) !== Math.floor(playerXXIndex/Dom.width)) {
			Dom.display.val("You can't!");
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
				Dom.display.val("X wins");
			} else {
				Dom.display.val("go on!");
			}
		} else {
			Dom.display.val("you can't!");
		}


		for (var i = 0; i < Dom.fullGrid.length; i++) {
			if (Dom.canMove(i) && Dom.canMove(i + Dom.width)) {
				if (Math.floor(Dom.fullGrid[i + 1]/Dom.width) !== Math.floor(Dom.fullGrid[i + 2]/Dom.width)) {
					var playerOIndex = i;
					var playerOOIndex = playerOIndex + Dom.width;
					break;
				} else if (Math.floor(Dom.fullGrid[i + 1 + Dom.width]/Dom.width) !== Math.floor(Dom.fullGrid[i + 2 + Dom.width]/Dom.width)) {
					var playerOIndex = i;
					var playerOOIndex = playerOIndex + Dom.width;
					break;
				} else if (Dom.canMove(i + 1) && !(Dom.canMove(i + 2))) {
					var playerOIndex = i;
					var playerOOIndex = playerOIndex + Dom.width;
					break;
				} else {
				var playerOIndex = i;
				var playerOOIndex = playerOIndex + Dom.width;
				}
			}
		}

			$(Dom.cells[playerOIndex]).css("background-color", "red");
			$(Dom.cells[playerOOIndex]).css("background-color", "red");
			Dom.fullGrid[playerOOIndex] = null;
			Dom.fullGrid[playerOIndex] = null;
			
			if (Dom.testWin(1)) {
				Dom.display.val("O wins!");
			} else {
				Dom.display.val("go on!");
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
		if (Dom.canMove(i) && Dom.canMove(i + value) && Math.floor(Dom.fullGrid[i]/Dom.width) === Math.floor(Dom.fullGrid[i + 1]/Dom.width)) {
			win = false;
			break;
		}
	}
	return win;
};