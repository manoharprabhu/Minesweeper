//Holds the mines location
var minesArray;

//Dummy variable to count reccursion depth (performance testing)
var reccursionCount = 0;

//Check if game has ended.
var gameEnd = false;

//Number of rows in the grid
var numberOfRows=10;

//Number of columns in grid
var numberOfCols=10;

//variable to check whether it is the first click on the grid. (To prevent the first click landing on a mine and ending game)
var firstClick;

//Number of mines in the grid.
var numberOfMines = 2;


//Create a 2 dimensional array and return it back.
function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }
  return arr;
}



function squareClick(row,col){
//IF you try to explore the grid after clicking on mine, nothing happens
	if(gameEnd == true)
	return;
	
	//Prevent reccursion from running off the grid bounds
	if(parseInt(row) < 0 || parseInt(col) < 0 || parseInt(row) > (numberOfRows+1) || parseInt(col) > (numberOfCols+1))
	return;
	
	//Do not explore the grid if the current cell has already been explored
	if(document.getElementById('button_'+row+'_'+col).style.backgroundColor == "green" )
	return;
	
//If current click lands on mine, BOOM ;)	
	if(minesArray[row][col] == true )
	{
		//If the current cell contains mine, game over ;)
		gameOver();
		return;
	} else {
		//If all the neighbours of clicked cell doesnt contain any mines, explore the adjacent cells reccursively.
		$('#button_'+row+'_'+col).css("background","green");
		if(minesArray[row-1][col-1] == false &&
			minesArray[row-1][col] == false  &&
			minesArray[row-1][col+1] == false  &&
			minesArray[row][col-1] == false  &&
			minesArray[row][col+1] == false  &&
			minesArray[row+1][col-1] == false  &&
			minesArray[row+1][col] == false  &&
			minesArray[row+1][col+1] == false ) {
				
			//Breadth first search
			squareClick(row-1,col-1);
			squareClick(row-1,col);
			squareClick(row-1,col+1);
			squareClick(row,col-1);
			squareClick(row,col+1);
			squareClick(row+1,col-1);
			squareClick(row+1,col);
			squareClick(row+1,col+1);
				
			
			} 
	}
}

//Get the number of mines adjacent to the given cell
function getCountOfAdjacentMines(i,j){
	var count=0;
	if(minesArray[i-1][j-1] == true)
		count++;
	if(minesArray[i-1][j] == true)
		count++;
	if(minesArray[i-1][j+1] == true)
		count++;
	if(minesArray[i][j-1] == true)
		count++;
	if(minesArray[i][j+1] == true)
		count++;
	if(minesArray[i+1][j-1] == true)
		count++;
	if(minesArray[i+1][j] == true)
		count++;
	if(minesArray[i+1][j+1] == true)
		count++;
		
		if(count!=0)
			return count;
		else
			return "";
		
		
}

function initiateSquareClick(row,col)
{

	//On first click, the cell should never contain any mine. If it does, remove the mine from that cell and place it in another empty cell.
	if(firstClick == true) {
		if(minesArray[row][col] == true) {
			//Remove mine from that cell
			minesArray[row][col] = false;
			
			//Pick a random empty cell and place the mine there.
			var newRow;
			var newCol;
			while(true){
				newRow = Math.floor(Math.random()*numberOfRows) + 1;
				newCol = Math.floor(Math.random()*numberOfCols) + 1;
				if(minesArray[newRow][newCol] == false) {
				break;
				}
			}
			
			minesArray[newRow][newCol] = true;
			
		}
	
		//reset the flag;
		firstClick = false;
	}
	
	squareClick(row,col);
	var i,j;

	if(gameEnd == true)
	return;
	
	//Update the mine count that shows up on the uncovered cells.
	var greenCellCount;
	greenCellCount = 0;
	for(i=1;i<=numberOfRows;i++){
		for(j=1;j<=numberOfCols;j++){
			if(document.getElementById('button_'+i+'_'+j).style.backgroundColor == "green" ){
				greenCellCount++;
				$('#button_'+i+'_'+j).html(getCountOfAdjacentMines(i,j));
				$('#button_'+i+'_'+j).css("color","white");	
				$('#button_'+row+'_'+col).css("background","green");
			}
		}
	}
	
	//Update label on UI
	 $('#numberOfSquaresLeft').html((numberOfRows*numberOfCols) - numberOfMines - greenCellCount);
	 
	 //Game has been won.
	 if(((numberOfRows*numberOfCols) - numberOfMines - greenCellCount) == 0) {
		gameWon();
	 }
	
}

function gameWon(){
	gameEnd = true;
	$('#gameStatus').html("You Won");
	$('#gameStatus').css('color','green');
	
	$('#gameStatus').removeClass("gameStatusLose");
	$('#gameStatus').addClass("gameStatusWin");
}

function gameOver(){
	var i,j;

	$('#gameStatus').html("You Lose");
	
	$('#gameStatus').removeClass("gameStatusWin");
	$('#gameStatus').addClass("gameStatusLose");
	
	for(i=1;i<=numberOfRows;i++) {
		for(j=1;j<=numberOfCols;j++) {
			if(minesArray[i][j] == true) {
				$('#button_'+i+'_'+j).css('background','red');
				$('#button_'+i+'_'+j).html("M");

			}
		}
	}
	gameEnd = true;
}

function drawGrid(){
	 var htmlString = "<table>";
     var row,col;
     row=0;
     col=0;
	 firstClick = true;
	 gameEnd = false;
	 $('#gameStatus').html("");
	 $('#numberOfSquaresLeft').html((numberOfRows*numberOfCols) - numberOfMines);
     
	 //Draw the grid on the page. Also, have a extra row and column at beggining and end of the grid to define the boundary
     for(row=0;row<=(numberOfRows+1);row++) {
  	   htmlString += "<tr>";
  	   for(col=0;col<=(numberOfCols+1);col++){
  		   if(row==0 || row == (numberOfRows+1) || col == 0 || col == (numberOfCols+1)) {
  		   	htmlString += "<td><button id=\"button_"+row+"_"+col+"\" class=\"square_cells\"/ style=\"background:green; visibility:hidden;\" \></td>";
  		   } else {
  		 htmlString += "<td><button id=\"button_"+row+"_"+col+"\" class=\"square_cells\"/ onclick=\"initiateSquareClick("+row+","+col+");\"></td>";
  		 }  
  	   }
  	   htmlString += "</tr>";
     }
    
     htmlString += "</table>";
    $('#mainGrid').html(htmlString);
    
    minesArray = Create2DArray((numberOfRows + 1)*(numberOfCols + 1));
    
	//Generate a mine field.
    
    //initialize all fields to false. (no mines)
    for(row=0;row<=numberOfRows+1;row++){
    	for(col=0;col<=numberOfCols+1;col++){
			minesArray[row][col] = false;
    	}
    }
    
    //	Randomly place some mines on the field. The number is determined by the variable 
    // 	numberOfMines
    var iterationCount = numberOfMines;
	while(iterationCount > 0) {

		//Generate a random row and column number between 1 to N 
		var tempRow = Math.floor(Math.random()*numberOfRows) + 1;
		var tempCol = Math.floor(Math.random()*numberOfCols) + 1;
		
		if(minesArray[tempRow][tempCol] == false) {
			minesArray[tempRow][tempCol] = true;
			iterationCount--;
		}
		
	}
		
}
