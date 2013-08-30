var minesArray;

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}






function drawGrid(){
	 var htmlString = "<table>";
     var row,col;
     row=0;
     col=0;
     
     for(row=1;row<=10;row++) {
  	   htmlString += "<tr>";
  	   for(col=1;col<=10;col++){
  		   
  		 htmlString += "<td><button id=\"button_"+row+"_"+col+"\" class=\"square_cells\"/></td>";  
  	   }
  	   htmlString += "</tr>";
     }
    
     htmlString += "</table>";
    $('#mainGrid').html(htmlString);
    
    minesArray = Create2DArray(20);
    
    for(row=1;row<=10;row++){
    	for(col=1;col<=10;col++){
    		if(Math.floor(Math.random()*2) == 0 ) {
    		minesArray[row][col] = true;
    		$('#button_'+row+'_'+col).html("B");
    		}
    		else {
    		minesArray[row][col] = false;
    		}
    	}
    }
   
}