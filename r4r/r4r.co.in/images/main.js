function validateComment() {
    if(document.getElementById('fromtxt').value == ''){  
	alert("Please enter a valid name");
        return false;
    }
    if(document.getElementById('comment').value == '') {
	alert("Please enter a valid comment");
        return false;
    }
    if(document.getElementById('security_code').value == ''){
        alert("Please enter image security code");
        return false;
    }
    return true;
}


function popUp(URL) {
    page = window.open(URL,"page","location=1,status=1,scrollbars=1,width=530,height=360");
    page.moveTo(300,200);
}

 /* Javascript for the palette */
 var idx;
 var namecolor;
 var messagecolor;
 
 function palette(divID) {
    idx = divID;
    document.getElementById("palette").style.display="block"; 
 }
 
 function returnColor(hex) {
    document.getElementById("palette").style.display="none";
    document.getElementById(idx).style.backgroundColor=hex;
    
    if(idx == 'namecolor'){
        document.getElementById('txtName1').style.color = hex;
    }
    else {
        document.getElementById('txtMessage').style.color =hex;
    }
 }
 
var BaseURL="";
function getXmlHttpRequestObject(){
	 if(window.XMLHttpRequest){ 
	 	xmlhttp = new XMLHttpRequest()
	 }
	 else if (window.ActiveXObject){
 		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
 		if (!xmlhttp){
 			xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
 		}
 	}
 	return xmlhttp;
}
var searchReq=getXmlHttpRequestObject();
var height;
height = false;


function search(){
    
   if(searchReq.readyState==4||searchReq.readyState==0){
		searchReq.open("GET",BaseURL+"voicebox.php",true);
		searchReq.onreadystatechange=handleSearchSuggest;
		searchReq.send(null)
	}
}

function handleSearchSuggest(){
        if(searchReq.readyState==4){
		var data=document.getElementById("display");
		data.innerHTML="";
		var C=searchReq.responseText;
		//alert("aaaa"+C);
                if(C==""){
               	   data.innerHTML="";
                }
		else{
			C=C.split("-");
			
                        for(i=0;i<C.length-1; i++){
                                C[i] = C[i].split("%");
                                var createTable = document.createElement('table');
                                createTable.style.width = '100%';
                                createTable.style.borderWidth='1px';
                                createTable.style.borderColor = '#000000';
                                createTable.style.borderStyle='solid'
                                var nameTR = document.createElement('tr');
                                var nameTD = document.createElement('td');
                                nameTD.className = 'name';
                                nameTD.style.width = '25%';
                                nameTD.innerHTML = C[i][0];
                                nameTD.style.color = C[i][1];                                                               
                                var dateTD = document.createElement('td');
                                dateTD.style.width = '75%';
                                dateTD.className = 'time';
                                dateTD.innerHTML = C[i][4];
                                dateTD.style.textAlign = 'right';
                                
                                nameTR.appendChild(nameTD);
                                nameTR.appendChild(dateTD);
                                                             
                                                              
                                var messageTR = document.createElement('tr');
                                var messageTD = document.createElement('td');
                                                                
                                messageTD.className = 'message';
                                messageTD.innerHTML = C[i][2];
                                messageTD.style.color = C[i][3];
                                messageTD.colSpan = '2';
                                
                                messageTR.appendChild(messageTD);
                                createTable.appendChild(nameTR);
                                createTable.appendChild(messageTR);
                                
                                data.appendChild(createTable);
                                
                            }
                            		                                   
                        var x= document.getElementById('display');
                        x.scrollTop=x.scrollHeight;
                  
                  setTimeout('keyPressTxt()',10000);
                  
          }
	}
}
    
function keyPressTxt(){
    search();
			
}

function send(name1,name_color1,text1,text_color1){
  
   if(searchReq.readyState==4||searchReq.readyState==0){
  //alert(text1);  
                var postData = "voicebox.php?name="+name1+"&name_color="+name_color1+"&text="+text1+"&text_color="+text_color1;
                searchReq.open("GET",postData,true);
                //(text1);
		searchReq.onreadystatechange=handleSearchSuggest;
		searchReq.send(null)
	}
}

 function done(e){
    var ev = e||window.event;
    var ob=ev.target||ev.srcElement;
    var key = ev.keyCode||ev.which;
        
    if(ob.id == 'Button2'){
     if(document.getElementById('txtMessage').value!='' && document.getElementById('txtName1').value!='') {

        var displayDiv = document.getElementById('display');
        var nameDiv = document.createElement('div');
        nameDiv.className = 'name';
        nameDiv.innerHTML = document.getElementById('txtName1').value;
        nameDiv.innerHTML += "&nbsp;<b>:</b>";
        nameDiv.style.color=document.getElementById('txtName1').style.color;
        nameDiv.style.fontWeight = 'bold';
        
        var name = document.getElementById('txtName1').value;
        var namecolor = nameDiv.style.color;        
        
        if(navigator.appName != 'Microsoft Internet Explorer'){
        nc = namecolor.split(",");
        nc1 = nc[0].split("rgb(");
        nc2 = nc[2].split(")");
        var colors = new Array(nc1[1],nc[1],nc2[0]);
        namecolor = num2hex(colors);
       }
        
        //document.getElementById('txtName1').value = '';
        displayDiv.appendChild(nameDiv);
        
        
        var messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = document.getElementById('txtMessage').value;
        messageDiv.style.color=document.getElementById('txtMessage').style.color;
        
        var message = document.getElementById('txtMessage').value;
        var messagecolor = messageDiv.style.color;
        if(navigator.appName != 'Microsoft Internet Explorer'){
           mc = messagecolor.split(",");
        
        
        mc1 = mc[0].split("rgb(");
        mc2 = mc[2].split(")");
               
        var mescolors = new Array(mc1[1],mc[1],mc2[0]);
        
        messagecolor = num2hex(mescolors);
        }
        
        document.getElementById('txtMessage').value = '';
    
        displayDiv.appendChild(messageDiv);
        displayDiv.scrollTop=displayDiv.scrollHeight;

    }
    else {
        alert("Please enter valid input");
        return false;
    }
    send(name,namecolor,message,messagecolor);
    } 
   return true;
 }
 
 
function num2hex(triplet) {
    
 var hex_alphabets = "0123456789ABCDEF";
 var hex = "";
 var int1,int2;
 for(var i=0;i<3;i++) {
  int1 = triplet[i] / 16;
  int2 = triplet[i] % 16;

  hex += hex_alphabets.charAt(int1) + hex_alphabets.charAt(int2); 
 }
 return(hex);
}


 
function letternumber(e,element,form){
    var key;
    if (window.event){
        key = keyCode;
    }
    else{
        key = e.which;
    }
    if(element=='boxbig'){
        document.getElementById(element).innerHTML = '';
        document.getElementById(element).innerHTML += form.value.length + " Characters.";
    }

if(form.value.length >=256){
        if(key == '8' || key == '46' || key == '37' || key == '38' || key == '39' || key == '40'){ 
            document.getElementById(element).innerHTML = '';
            document.getElementById(element).innerHTML += form.value.length + " Characters.";
            return true;
        }
        
        else{
            document.getElementById(element).innerHTML += "<br><font color='red'>You have exceeded the maximum comment length (256 chars.)</font>";
            return false;
        }
}
}


function forwards(id){
       if(searchReq.readyState==4||searchReq.readyState==0){
    
                var postData = "forwards.php?forward_id="+id;
                searchReq.open("GET",postData,true);
		searchReq.onreadystatechange=handleForwardRequest;
		searchReq.send(null)
	}
    }

function handleForwardRequest(){
    var data = searchReq.responseText;
    var divForward = document.getElementById('forwardDiv');
    var subForward = document.getElementById('txtsubject');
    var hiddenText = document.getElementById('hiddenTxt');
    
    
    var data1 = data.split("#");
    divForward.innerHTML = data1[0];
    subForward.value = data1[1];
    hiddenText.value = data1[0];
}









/* Javascript to insert the image from the browse image textbox into the path textbox */




























