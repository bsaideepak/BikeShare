var myVar=setInterval(function () {calculateHours()}, 10000);
	function calculateHours() {
	
	var d = new Date();
	var hour = d.getHours();
	var min = d.getMinutes();
	//alert("gone");
	var startHours = document.getElementById('startHours');
	//alert("done");
    for (var h=hour; h<25; h++) {
        var option = document.createElement('option');
        option.setAttribute('value', h);
        option.appendChild(document.createTextNode(h));
        startHours.appendChild(option);
    }
    
	var startMinutes = document.getElementById('startMinutes');
 
    for (var m=0; m<60; m++) {
        var option = document.createElement('option');
        option.setAttribute('value', m);
        option.appendChild(document.createTextNode(m));
        startMinutes.appendChild(option);
    }
	
	var endHours = document.getElementById('endHours');
	//alert("done");
    for (var h=hour; h<25; h++) {
        var option = document.createElement('option');
        option.setAttribute('value', h);
        option.appendChild(document.createTextNode(h));
        endHours.appendChild(option);
    }
	
	var startMinutes = document.getElementById('endMinutes');
 
    for (var m=0; m<60; m++) {
        var option = document.createElement('option');
        option.setAttribute('value', m);
        option.appendChild(document.createTextNode(m));
        endMinutes.appendChild(option);
    }
	
	
	
	
	$("#startHours option").filter(function() {
			if(this.text == hour){
			$(this).attr('selected', true)
		}});
	
	
	$("#startMinutes option").filter(function() {
			if(this.text == min){
			$(this).attr('selected', true)
		}});
		
		
	$("#endHour").on('change',function(){
		 check();
		 });
		
		function check() {
        if ($('#endMinutes').val() !== ""){ 	
		if(($('#endHours').val() === hour) && ($('#endMinutes').val() > min )){
		alert("cool boss");
		}
		else if($('#endHours').val() > hour){
				alert("cool boss");
				}
       // $('#form-state').removeClass('goRed1');
		//count += 1;
		
		else{
		alert("not done boss");
		//break;
		//$('#form-state').addClass('goRed1');
        }          
		}
	}
	}
	
	$.ajax({
				type: "POST",
				contentType: "application/json",
				url: "http://localhost:8080/hope/api/orderhistory",
				data: JSON.stringify({username:customerId}),
				dataType: "json",
				success : function(data){
			
						for(var i=0;i < data.length;i++)
							{
							$('#products').append(
								'<tr><td class="text-left" >'+data[i].bikeName+'</td><td class="text-left">'+data[i].avaliableStartTime+'</td><td class="text-left">'+data[i].avaliableEndTime+'</td><td class="text-left">'+data[i].currentLocation+'</td><td class="text-left"><button id="hello">Cancel</button></td></tr>');
							}
							}
							});