var socket = new WebSocket("ws://localhost:1337");

function CriarWS(){
	 socket.onmessage = function(msg){  
             
             playNote(msg.data);
        }  
}

function play(note) {
    if (window.event) { e = window.event; }

    var key = note || window.event.keyCode;

	if (key >= 97) {
		key = key - 32;
	}
	console.log(key.keyCode)
	playNote(key.keyCode)
}
function playNote(key) {
	    switch(key){
    	case 65:
    	getNota("do").play();       	
    	break;

    	case 87:
    	getNota("do-sustenido").play();
    	break;

    	case 83:
    	getNota("re").play();
    	break;

    	case 69:
    	getNota("re-sustenido").play();
    	break;

    	case 68:
    	getNota("mi").play();
    	break;

    	case 70:
    	getNota("fa").play();
    	break;

    	case 84:
    	getNota("fa-sustenido").play();
    	break;

    	case 71:
    	getNota("sol").play();
    	break;

    	case 89:
    	getNota("sol-sustenido").play();
    	break;

    	case 72:
    	getNota("la").play();
    	break;

    	case 85:
    	getNota("la-sustenido").play();
    	break;

    	case 74:
    	getNota("si").play();
    	break;
    }
}

function getNota(nota)
{
	return document.getElementById(nota);
}

window.onkeypress=play;

window.onload=CriarWS;