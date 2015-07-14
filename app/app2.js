$(function(){
	$("#play").on("click", function() {
		var size = parseInt($("#size").val());
		$("#grid").remove();
		$(document.body).animate({
		    "scrollTop": $('#second').offset().top
		}, 2000, function(){
			Dom.setUp(size);
		});
	});
});

var Dom = {};

Dom.setUp = function(size) {
	history.pushState({}, '', document.domain);

	this.numberOfSquares = size*size;
	this.width = Math.round(Math.sqrt(this.numberOfSquares));
	this.height = Math.ceil(Math.sqrt(this.numberOfSquares));


	this.board = $("#board");
	this.board.css("height", this.height * 70 + "px");

	$("#board").append("<ul id='grid'></ul>");
	this.grid = $("#grid");
	this.grid.css("width", this.width * 70 + "px");
	for (var i = 0; i < this.numberOfSquares; i++) {
		this.grid.append("<li></li>"); 
	}
	this.cells = $("li");
	// this.cells.css("background-color", "#111111");
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
		$(this).css("font-weight", "bold");
		Dom.multi.css("font-weight", "normal");
		Dom.modality = "single";
	});

	this.multi = $("#mp");
	this.multi.prop("disabled", false);
	this.multi.on("click", function(){
		$(this).css("font-weight", "bold");
		Dom.single.css("font-weight", "normal");
		Dom.modality = "multi";
	});

	this.clear = $("#clear");
	this.clear.on("click", function(){
		Dom.single.css("font-weight", "normal");
		Dom.multi.css("font-weight", "normal");
		Dom.single.css("text-decoration", "none");
		Dom.multi.css("text-decoration", "none");
		Dom.display.val("Board cleared. Make your move!");
		$("#grid").remove();
		history.pushState({}, '', document.domain);
		Dom.setUp(size);
	});
};

Dom.singlePlayer = function() {
	Dom.single.css("text-decoration", "line-through");
	Dom.multi.css("text-decoration", "line-through");
	Dom.single.prop("disabled", true);
	Dom.multi.prop("disabled", true);

	var playerXIndex = Dom.cells.index(this);
	var playerXXIndex = playerXIndex + 1;

	if (Math.floor(playerXIndex/Dom.width) !== Math.floor(playerXXIndex/Dom.width)) {
		Dom.display.val("You can't!");
	}

	else if (Dom.canMove(playerXIndex) && Dom.canMove(playerXXIndex)) {

		// $(this).css("background-color", "#111111");
		$(this).animate({"background-color": "#111111"}, 1000);
		$(Dom.cells[playerXXIndex]).animate({"background-color": "#111111"}, 1000);
		// $(Dom.cells[playerXXIndex]).css("background-color", "#111111");
		Dom.fullGrid[playerXXIndex] = null;
		Dom.fullGrid[playerXIndex] = null;

		if (Dom.testWin(Dom.width)) {
			Dom.display.val("X wins");
			Dom.cells.off("click");
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
				Dom.cells.off("click");
			} else {
				Dom.display.val("go on!");
			}
		}
	} else {
		Dom.display.val("you can't!");
	}
};

Dom.multiPlayer = function() {
	Dom.single.css("text-decoration", "line-through");
	Dom.multi.css("text-decoration", "line-through");
	Dom.single.prop("disabled", true);
	Dom.multi.prop("disabled", true);

	if (Dom.counter % 2 === 0) {

		var playerXIndex = Dom.cells.index(this);
		var playerXXIndex = playerXIndex + 1;

		if (Math.floor(playerXIndex/Dom.width) !== Math.floor(playerXXIndex/Dom.width)) {
			Dom.display.val("You can't!");
		} 

		else if (Dom.canMove(playerXIndex) && Dom.canMove(playerXXIndex)) {

			$(this).css("background-color", "#111111");
			$(Dom.cells[playerXXIndex]).css("background-color", "#111111");
			Dom.fullGrid[playerXXIndex] = null;
			Dom.fullGrid[playerXIndex] = null;
			Dom.counter += 1;
			
			if (Dom.testWin(Dom.width)) {
				Dom.display.val("X wins");
				Dom.cells.off("click");
			} else {
				Dom.display.val("go on!");
			}
		}

		else {
			Dom.display.val("you can't!");
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
				Dom.cells.off("click");
			} else {
				Dom.display.val("go on!");
			}
		}

		else {
			Dom.display.val("you can't!");
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