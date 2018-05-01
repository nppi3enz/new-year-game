    var count;
	var modeplay = 0;
	var counter; //0 will  run it every 1 second
    var quiz = -1;
    var timeend = 8.0;
	var multiple = 
	[	[100, 200, 300],
		[50, 100, 200, 50, 100, 500, 100],
        [500, 400, 200, 100, 10, 300, 1000],
		[100, 500, 300],
		[100, 50, 10, 5],
		[600, 250, 1000],
		[50, 100, 50, 10, 400],
		[400, 100, 50],
		[100, 300, 100, 200],
		[200, 400],
		[500, 100, 50],

	];
	var current;
	var count_game = 0;
	// $( "#startbt" ).click(function() {
	// 	playBGM("play");

	// 	if(modeplay == 2) { //from pause
	// 		counter=setInterval(timer, 100);
	// 	} else if(modeplay == 1) {
	// 	  	//counter=setInterval(timer, 0);
	// 	} else if(modeplay == 0){ //startgame
	// 		quiz++;
	// 		//playBGM("play");
	// 		loadsol();
	// 		clearlog();
	// 		keyinval();
	// 		$(".sol-item").hide();

    //         count = 13;
	// 		modeplay = 1;
	// 		current = 0;
	// 		//$("#multiple").html("=x"+multiple[current]);
	// 		counter=setInterval(timer, 100);
	// 	}
	// });
	$(document).on ('keypress', function (e) {
		// console.log(String.fromCharCode(e.which));
		if(String.fromCharCode(e.which) == 's'){
			playBGM("play");
			if(modeplay == 2) { //from pause
				counter=setInterval(timer, 100);
			} else if(modeplay == 1) {
				//counter=setInterval(timer, 0);
			} else if(modeplay == 0){ //startgame
				quiz++;
				//playBGM("play");
				loadsol();
				clearlog();
				keyinval();
				$(".sol-item").hide();

				count = 13;
				modeplay = 1;
				current = 0;
				//$("#multiple").html("=x"+multiple[current]);
				counter=setInterval(timer, 100);
				$('.round').text(count_game++);
			}
		} else if(String.fromCharCode(e.which) == 'p'){
			playBGM("stop");
			clearInterval(counter);
			modeplay = 2;
		} else if(String.fromCharCode(e.which) == 'r'){
			playBGM("stop");
			modeplay = 0;
			count = 0;
			clearlog();
			$("#scoreboard .addvalue").html("+0");
			$("#scoreboard .addvalue").css('color', 'white');
			$(".countdown").html(count.toFixed(1)); 
			$("#multiple").html("-----");
			clearInterval(counter);
		} else if(String.fromCharCode(e.which) == 'b'){
			viewsol();
		}

	})
	// $( "#pausebt" ).click(function() {
	// 	playBGM("stop");
	// 	clearInterval(counter);
	// 	modeplay = 2;
	// });
	// $( "#stopbt" ).click(function() {
	// 	playBGM("stop");
	// 	modeplay = 0;
	// 	count = 0;
	// 	clearlog();
	// 	$("#scoreboard .addvalue").html("+0");
	// 	$("#scoreboard .addvalue").css('color', 'white');
	//   	$(".countdown").html(count.toFixed(1)); 
	// 	$("#multiple").html("-----");
	//   	clearInterval(counter);
	// });

	function timer()
	{

    console.log(count);
	  count=count-0.1;
	  if(count >= timeend-0.1) {
	  	//alert("blank");
	  	$("#multiple").html("&nbsp;");
	  } else
	  if(count <= timeend) {
	  	if(count >= timeend-0.2 && count <= timeend+0.1) { 
	  		playSnd("tick");
	  		changebet(multiple[quiz][current]) 
	  	};
	  	callcurrent(current);
	  	if(current<multiple[quiz].length) {
	  		//$("#multiple").html("x"+multiple[quiz][current].toFixed(2));
	  		$("#multiple").html(multiple[quiz][current]);
	  	} else {
	  		playBGM("stop");
	  		$("#multiple").html("<span class='red'>BOOM</span>");
	  		playSnd("boom");
	  		changebet(0);
	  		clearInterval(counter);
	  		count = 0;
	  		$(".countdown").html(count.toFixed(1)); 
	  	}
	  	
	  }
	  if (count <= 0.00)
	  { 
	  	if(current<multiple[quiz].length) {
	  		addlog(multiple[quiz][current]);
	  	}
	  	
	  	console.log("current = "+current);
	    if(current<multiple[quiz].length) {
	    	//alert("current = "+current);
	     	count = timeend+3;
	     	current++;
	    }
	     
	  }

	 if(count <= timeend) {
	 	$(".countdown").html(count.toFixed(1)); 
	 } else {
	 	$(".countdown").html(""); 
	 	//$(".countdown").html(count.toFixed(1)); 
	 }
	}
	function loadsol() {
		$(".sol-item").html(""); 
		for(i=0;i<multiple[quiz].length;i++){
			//$(".sol-item").append("<li>x"+multiple[quiz][i].toFixed(2)+"</li>" );
			$(".sol-item").append("<li>"+multiple[quiz][i]+"</li>" );
		}
		$(".sol-item").append("<li class=\"boom\">BOOM!!</li>" );
	}
	function callcurrent(current) {
		$( ".sol-item li:nth-child("+(current)+")" ).removeClass( "yellow" );
		$( ".sol-item li:nth-child("+(current+1)+")" ).addClass( "yellow" );
	}
	function addlog(mul) {
		$("#log-mutiple ul").prepend("<li>"+mul+"</li>" );
	}
	function clearlog(){
		$("#log-mutiple ul").html("");
	}
	function viewsol(){
		$(".sol-item").toggle(400);
	}
	var input = ["input1", "input2", "input3", "input4", "input5", "input6", "input7", "input8", "input9", "input10"];
	function keyinval() {
		var valin = [];
		for(i=0;i<input.length;i++){
			valin[i] = $("input[name="+input[i]+"]").val();
		}
		i=0;
		$( "#scoreboard .bet" ).each(function( index ) {
			if(valin[i] == "") {
				$( this ).html("0");
			} else {
			  	$( this ).html(valin[i]);
			}
		  i++;
		});
	}
	var audioElement;
	function playSnd(wav) {
	wav = "sound/"+wav+".mp3";
	 $(document).ready(function() {
	        audioElement = document.createElement('audio');
	        audioElement.setAttribute('src', wav);
	        audioElement.setAttribute('autoplay', 'autoplay');
	        //audioElement.load()
	        $.get();
	        audioElement.addEventListener("load", function() {
	        audioElement.play();
	        }, true);

		});
	 

	}
	var bgElement;
	function playBGM(mode) {
		if(mode == "play") {
		wav = "sound/rov.mp3";
		 $(document).ready(function() {
		        bgElement = document.createElement('audio');
		        bgElement.setAttribute('src', wav);
		        bgElement.setAttribute('autoplay', 'autoplay');
		        //audioElement.load()
		        $.get();
		        bgElement.addEventListener("load", function() {
		        bgElement.play();
		        }, true);

			});
		} else if(mode == "stop"){
			bgElement.pause();
		}
	}
	
	function changebet(mul) {
		if(mul > 1.0) {
			$(".addvalue").css("color", "rgb(97, 255, 97)");
		} else if(mul < 1.0){
			$(".addvalue").css("color", "red");
		} else {
			$(".addvalue").css("color", "white");
		}

		$( "#scoreboard input" ).each(function( index ) {
			var ori = $(this).parent().find(".bet").html();
		  temp = ori*mul;
		  temp = temp.toFixed(0);
		  $(this).val(temp); //edit input
		  
		  var eq = temp-ori;

		  	if(eq >= 0.0) {
		  		$(this).parent().find(".addvalue").html("+"+eq);
		  	} else {
				$(this).parent().find(".addvalue").html(eq);
			}

		});
	}