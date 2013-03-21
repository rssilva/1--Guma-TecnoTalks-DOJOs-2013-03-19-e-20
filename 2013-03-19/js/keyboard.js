var Socket = new WebSocket('ws://192.168.1.21:1337');

Socket.onopen = function() {
	Socket.send("Message to send");
    console.log("Message is sent...");
};

Socket.onmessage = function(message){
	console.log(message.data);

	tocar(message.data);	
};

tocar = function(charCode) {
	if(charCode == 113) { 
		var notaDo = document.getElementById("nota_do");
    	notaDo.play();
	} else if (charCode == 119) {
		var notaDo = document.getElementById("nota_do_sharp");
		notaDo.play();
		
	}
	else if (charCode == 101) {
		var notaDo = document.getElementById("nota_do_sharp");
		notaDo.play();
	}
}

document.onkeypress = function(e) {
	setTimeout(function(){
		tocar(e.charCode);
	}, 2000);
	Socket.send(e.charCode);	
}

