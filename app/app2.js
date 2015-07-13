$(function(){
	Dom.setUp();
});

var Dom = {};

Dom.setUp = function() {
	this.numberOfSquares = parseInt(prompt("Select the number of squares in the grid", "16"));
	this.width = Math.round(Math.sqrt(this.numberOfSquares));

	$("body").append("<ul id='grid'></ul>");
	this.grid = $("#grid");

	this.grid.css("width", this.width * 100 + "px");
	for (var i = 0; i < this.numberOfSquares; i++) {
		this.grid.append("<li></li>"); 
	}
	this.cells = $("li");
	this.cells.css("background-color", "white");
	this.cells.on("click", function() {
		if (Dom.modality === "single") {
			Dom.singlePlayer.call(this);
		} else if (Dom.modality === "multi") {
			Dom.multiPlayer.call(this);
		}
	});

	this.fullGrid = (function(){
		var array = [];
		for (var i = 0; i < Dom.numberOfSquares; i++) {
			array.push(i);
		}
		return array;
	})();

	this.display = $("#display");
	this.counter = 0;
	this.modality = "";
	
	this.single = $("#sp");
	this.single.prop("disabled", false);
	this.single.on("click", function(){
		Dom.modality = "single";
	});

	this.multi = $("#mp");
	this.multi.prop("disabled", false);
	this.multi.on("click", function(){
		Dom.modality = "multi";
	});

	this.clear = $("#clear");
	this.clear.on("click", function(){
		location.reload();
	});
};

Dom.singlePlayer = function() {
	Dom.single.prop("disabled", true);
	Dom.multi.prop("disabled", true);

	var playerXIndex = Dom.cells.index(this);
	var playerXXIndex = playerXIndex + 1;

	if (Math.floor(playerXIndex/Dom.width) !== Math.floor(playerXXIndex/Dom.width)) {
		console.log(playerXIndex);
		Dom.display.val("You can't!");
	}

	else if (Dom.canMove(playerXIndex) && Dom.canMove(playerXXIndex)) {

		$(this).css("background-color", "yellow");
		$(Dom.cells[playerXXIndex]).css("background-color", "yellow");
		Dom.fullGrid[playerXXIndex] = null;
		Dom.fullGrid[playerXIndex] = null;

		if (Dom.testWin(Dom.width)) {
			Dom.display.val("X wins");
		} else {
			Dom.display.val("go on!");

			for (var i = 0; i < Dom.fullGrid.length; i++) {
				if (Dom.canMove(i) && Dom.canMove(i + Dom.width)) {
					if (Math.floor(Dom.fullGrid[i + 1]/Dom.width) !== Math.floor(Dom.fullGrid[i + 2]/Dom.width) && Dom.fullGrid[i + 1] !== null) {
						var playerOIndex = i;
						var playerOOIndex = playerOIndex + Dom.width;
						console.log(1)
						break;
					} else if (Dom.canMove(i + Dom.width) && (Dom.canMove(i + 1 + Dom.width)) && !(Dom.canMove(i + 2 + Dom.width))) {
						var playerOIndex = i;
						var playerOOIndex = playerOIndex + Dom.width;
						console.log(2)
						break;
					} else {
						var playerOIndex = i;
						var playerOOIndex = playerOIndex + Dom.width;
					}
				}
			};

			$(Dom.cells[playerOIndex]).css("background-color", "red");
			$(Dom.cells[playerOOIndex]).css("background-color", "red");
			Dom.fullGrid[playerOOIndex] = null;
			Dom.fullGrid[playerOIndex] = null;

			if (Dom.testWin(1)) {
				Dom.display.val("O wins!");
			} else {
				Dom.display.val("go on!");
			}
		}
	} else {
		Dom.display.val("you can't!");
	}
};

Dom.multiPlayer = function() {
	Dom.single.prop("disabled", true);
	Dom.multi.prop("disabled", true);

	if (Dom.counter % 2 === 0) {

		var playerXIndex = Dom.cells.index(this);
		var playerXXIndex = playerXIndex + 1;

		if (Math.floor(playerXIndex/Dom.width) !== Math.floor(playerXXIndex/Dom.width)) {
			Dom.display.val("You can't!");
			console.log("Nope....");
		} 

		else if (Dom.canMove(playerXIndex) && Dom.canMove(playerXXIndex)) {

			$(this).css("background-color", "yellow");
			$(Dom.cells[playerXXIndex]).css("background-color", "yellow");
			Dom.fullGrid[playerXXIndex] = null;
			Dom.fullGrid[playerXIndex] = null;
			Dom.counter += 1;
			
			if (Dom.testWin(Dom.width)) {
				Dom.display.val("X wins");
				console.log("X Wins");
			} else {
				Dom.display.val("go on!");
				console.log("Continue...");
			}
		}

		else {
			Dom.display.val("you can't!");
			console.log("Nope....");
		}

	} else if (Dom.counter % 2 !== 0) {

		var playerOIndex = Dom.cells.index(this);
		var playerOOIndex = playerOIndex + Dom.width;

		if (Dom.canMove(playerOIndex) && Dom.canMove(playerOOIndex)) {

			$(this).css("background-color", "red");
			$(Dom.cells[playerOOIndex]).css("background-color", "red");
			Dom.fullGrid[playerOOIndex] = null;
			Dom.fullGrid[playerOIndex] = null;
			Dom.counter += 1;
			
			if (Dom.testWin(1)) {
				Dom.display.val("O wins!");
				console.log("O Wins");
			} else {
				Dom.display.val("go on!");
				console.log("Continue");
			}
		}

		else {
			Dom.display.val("you can't!");
			console.log("Nope....");
		}
	}
};

Dom.canMove = function(square) {
	if (Dom.fullGrid[square] === undefined || Dom.fullGrid[square] === null) {
		return false;
	} else {
		return true;
	}
};

Dom.testWin = function(value) {
	var i = 0;
	var len = Dom.fullGrid.length;
	var win = true;

	for (i; i < len; i++) {
		
		if (value == 1) {
			if (Dom.canMove(i) && Dom.canMove(i + value) && Math.floor(Dom.fullGrid[i]/Dom.width) === Math.floor(Dom.fullGrid[i + 1]/Dom.width)) {
				win = false;
				break;
			}
		}

		else if (value == Dom.width) {
			if (Dom.canMove(i) && Dom.canMove(i + value)) {
				win = false;
				break;
			}
		}
	}
	return win;
};