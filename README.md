# WDI Project 1 - Domineering


## The Game

Domineering is a mathematical game introduced by Goran Andersson in 1974 and played on chequered boards of different sizes. It involves placing dominoes that cover two squares: one player places the dominoes in a horizontal orientation, while the other player places them in a vertical orientation. The first player who is unable to place a domino on the board has lost the game.

Play it here!


## Project Goals

- Implement customizable grid.
- Implement single-player game mode and develop solid AI.
- Implement multi-player game mode based on turns.


## The Approach

- Save "input" value to determine the chosen width for the grid.
- Generate the actual squared grid appending a number of "li" based on the chosen width.
- Generate an array for comparison that contains as many elements as the number of "li" in the grid.
- At this point, the grid cells and the elements in the comparison array have the same index value.
- First player: select cell and automatically get the +1 indexed cell.
- Computer and second player: select cell and automatically get the +width indexed cell.
- Whenever a player occupies cells, get their index values and turn "null" the correspoding elements in the comparison array.
- Whenever a player attempts a move, check if cells are existing (!== undefined) or available (!== null).
- Additionally, for the first player make sure cells are selectable only if their +1 cell is on the same row.
- After each turn, test winning condition: loop through the comparison array to check if the opponent still has available moves.
- Game ends when available moves for one of the players are over.


## The Code

- OnLoad function allows the player to select the size of the grid.
- SetUp function creates the actual grid, the menu and the comparison array.
- FirstPlayer function allows the player to select two cells and test winning condition, then let the computer play.
- SecondPlayer function allows the player to select two cells and test winning condition, then let the other player play.
- CanMove function tests if player move is actually possible.
- TestWin determines if a player still has available moves.


## The Challenges

- Hover
- CSS
