var minesArray;
var reccursionCount = 0;
function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }
  return arr;
}


function squareClick(row,col){
	
	//Prevent reccursion from running off the grid bounds
	if(parseInt(row) < 0 || parseInt(col) < 0 || parseInt(row) > 11 || parseInt(col) > 11)
	return;
	
	//Do not explore the grid if the current cell has already been explored
	if(document.getElementById('button_'+row+'_'+col).style.backgroundColor == "green" )
	return;
	
	
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
				
			squareClick(row-1,col-1);
			squareClick(row-1,col);
			squareClick(row-1,col+1);
			squareClick(row,col-1);
			squareClick(row,col+1);
			squareClick(row+1,col-1);
			squareClick(row+1,col);
			squareClick(row+1,col+1);
				
			
			} else {
				$('#button_'+row+'_'+col).css("background","green");
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
	squareClick(row,col);
	var i,j;
	
	//Update the mine count that shows up on the uncovered cells.
	for(i=1;i<=10;i++){
		for(j=1;j<=10;j++){
			if(document.getElementById('button_'+i+'_'+j).style.backgroundColor == "green" ){
				$('#button_'+i+'_'+j).html(getCountOfAdjacentMines(i,j));
				$('#button_'+i+'_'+j).css("color","white");	
				$('#button_'+row+'_'+col).css("background","green");
			}
		}
	}
}

function gameOver(){
	alert("gameover");
}

function drawGrid(){
	 var htmlString = "<table>";
     var row,col;
     row=0;
     col=0;
     
	 //Draw the grid on the page. Also, have a extra row and column at beggining and end of the grid to define the boundary
     for(row=0;row<=11;row++) {
  	   htmlString += "<tr>";
  	   for(col=0;col<=11;col++){
  		   if(row==0 || row == 11 || col == 0 || col == 11) {
  		   	htmlString += "<td><button id=\"button_"+row+"_"+col+"\" class=\"square_cells\"/ style=\"background:green; visibility:hidden;\" \></td>";
  		   } else {
  		 htmlString += "<td><button id=\"button_"+row+"_"+col+"\" class=\"square_cells\"/ onclick=\"initiateSquareClick("+row+","+col+");\"></td>";
  		 }  
  	   }
  	   htmlString += "</tr>";
     }
    
     htmlString += "</table>";
    $('#mainGrid').html(htmlString);
    
    minesArray = Create2DArray(20);
    
	//Generate a mine field.
    for(row=0;row<=11;row++){
    	for(col=0;col<=11;col++){
		
		if(row==0 || col == 0 || row == 11 || col == 11)
		{
		minesArray[row][col] = false;
		continue;
		}
    		if(Math.floor(Math.random()*10) == 0 ) {
    		minesArray[row][col] = true;
    		}
    		else {
    		minesArray[row][col] = false;
    		}
    	}
    }
   
}