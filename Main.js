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
	if(document.getElementById('button_'+row+'_'+col).style.backgroundColor == "red" )
	return;
	
	
	if($('#button_'+row+'_'+col).html() == "B")
	{
		return;
	} else {
		if($('#button_'+parseInt(row-1)+'_'+parseInt(col-1)).html() != "B" &&
			$('#button_'+parseInt(row-1)+'_'+parseInt(col)).html() != "B" &&
			$('#button_'+parseInt(row-1)+'_'+parseInt(col+1)).html() != "B" &&
			$('#button_'+parseInt(row)+'_'+parseInt(col-1)).html() != "B" &&
			$('#button_'+parseInt(row)+'_'+parseInt(col+1)).html() != "B" &&
			$('#button_'+parseInt(row+1)+'_'+parseInt(col-1)).html() != "B" &&
			$('#button_'+parseInt(row+1)+'_'+parseInt(col)).html() != "B" &&
			$('#button_'+parseInt(row+1) +'_'+ parseInt(col+1)).html() != "B") {
				
			$('#button_'+row+'_'+col).css("background","red");
			//$('#button_'+parseInt(row-1)+'_'+parseInt(col-1)).css("background","red");
			//$('#button_'+parseInt(row-1)+'_'+parseInt(col)).css("background","red");
			//$('#button_'+parseInt(row-1)+'_'+parseInt(col+1)).css("background","red");
			//$('#button_'+parseInt(row)+'_'+parseInt(col-1)).css("background","red");
			//$('#button_'+parseInt(row)+'_'+parseInt(col+1)).css("background","red");
			//$('#button_'+parseInt(row+1)+'_'+parseInt(col-1)).css("background","red");
			//$('#button_'+parseInt(row+1)+'_'+parseInt(col)).css("background","red");
			//$('#button_'+parseInt(row+1) +'_'+ parseInt(col+1)).css("background","red");
				
			squareClick(row-1,col-1);
			squareClick(row-1,col);
			squareClick(row-1,col+1);
			squareClick(row,col-1);
			squareClick(row,col+1);
			squareClick(row+1,col-1);
			squareClick(row+1,col);
			squareClick(row+1,col+1);
				
			
			} else {
				$('#button_'+row+'_'+col).css("background","red");
				return;
			}
		
	}
}

function initiateSquareClick(row,col)
{
	reccursionCount = 0;
	squareClick(row,col);
	alert(reccursionCount);
}
function drawGrid(){
	 var htmlString = "<table>";
     var row,col;
     row=0;
     col=0;
     
     for(row=1;row<=10;row++) {
  	   htmlString += "<tr>";
  	   for(col=1;col<=10;col++){
  		   
  		 htmlString += "<td><button id=\"button_"+row+"_"+col+"\" class=\"square_cells\"/ onclick=\"initiateSquareClick("+row+","+col+");\"></td>";  
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
    		$('#button_'+row+'_'+col).html("B");
    		}
    		else {
    		minesArray[row][col] = false;
    		}
    	}
    }
   
}