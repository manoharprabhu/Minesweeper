function drawGrid(){
	 var htmlString = "<table>";
     var row,col;
     row=0;
     col=0;
     
     for(row=1;row<=10;row++) {
  	   htmlString += "<tr>";
  	   for(col=1;col<=10;col++){
  		   
  		 htmlString += "<td id=\"button_"+row+"_"+col+"\"><input type=\"button\" class=\"square_cells\"/></td>";  
  	   }
  	   htmlString += "</tr>";
     }
    
     htmlString += "</table>";
    $('#mainGrid').html(htmlString);
 
}