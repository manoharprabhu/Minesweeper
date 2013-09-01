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
	reccursionCount++;
	
	if(parseInt(row) < 1 || parseInt(col) < 1 || parseInt(row) > 10 || parseInt(col) > 10)
	return;
	//alert($('#button_'+row+'_'+col).css("background-color"));
	if(document.getElementById('button_'+row+'_'+col).style.backgroundColor == "green" )
	return;
	
	
	if(minesArray[row][col] == true )
	{
		gameOver();
		return;
	} else {
		if(minesArray[row-1][col-1] == false &&
			minesArray[row-1][col] == false  &&
			minesArray[row-1][col+1] == false  &&
			minesArray[row][col-1] == false  &&
			minesArray[row][col+1] == false  &&
			minesArray[row+1][col-1] == false  &&
			minesArray[row+1][col] == false  &&
			minesArray[row+1][col+1] == false ) {
				
			$('#button_'+row+'_'+col).css("background","green");
			
				
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
	//reccursionCount = 0;
	squareClick(row,col);
	//alert(reccursionCount);
	var i,j;
	for(i=1;i<=10;i++){
		for(j=1;j<=10;j++){
			if(document.getElementById('button_'+i+'_'+j).style.backgroundColor == "green" ){
				$('#button_'+i+'_'+j).html(getCountOfAdjacentMines(i,j));
				$('#button_'+i+'_'+j).css("color","white");
				//$('#button_'+i+'_'+j).attr("disabled",true);
				
				
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
     
     for(row=0;row<=11;row++) {
  	   htmlString += "<tr>";
  	   for(col=0;col<=11;col++){
  		   if(row==0 || row == 11 || col == 0 || col == 11) {
  		   	htmlString += "<td><button id=\"button_"+row+"_"+col+"\" style=\"background-color:green;display:none;\" \></td>";
  		   } else {
  		 htmlString += "<td><button id=\"button_"+row+"_"+col+"\" class=\"square_cells\"/ onclick=\"initiateSquareClick("+row+","+col+");\"></td>";
  		 }  
  	   }
  	   htmlString += "</tr>";
     }
    
     htmlString += "</table>";
    $('#mainGrid').html(htmlString);
    
    minesArray = Create2DArray(20);
    
    for(row=1;row<=10;row++){
    	for(col=1;col<=10;col++){
    		if(Math.floor(Math.random()*10) == 0 ) {
    		minesArray[row][col] = true;
    		}
    		else {
    		minesArray[row][col] = false;
    		}
    	}
    }
   
}