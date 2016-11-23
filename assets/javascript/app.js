	var quiz = [{
		question: "Who won the first Super Bowl?",
		options: ["The Green Bay Packers", "The Kansas City Chiefs", "The Oakland Raiders", "The New York Giants"],
		correctAnswer: 0
	}, {
		question: "Who has the most rushing Touchdowns in NFL History?",
		options: ["Walter Payton", "LaDanian Tomlinson", "Jim Brown", "Emmitt Smith"],
		correctAnswer: 3
	}, {
		question: "Which player has the most consecutive games with 5 reception + 50 yards receiving?",
		options: ["Jerry Rice", "Steve Smith Sr.", "Antonio Brown", "Larry Fitzgerald"],
		correctAnswer: 2
	}, {
		question: "Which team has won the most Super Bowls?",
		options: ["The New England Patriots", "The San Francisco 49ers", "The Pittsburgh Steelers", "The Green Bay Packers"],
		correctAnswer: 2
	}, {
		question: "Who Dey?",
		options: ["The New Orleans Saints", "The Cincinnati Bengals", "The Buffalo Bills", "The Oakland Raiders"],
		correctAnswer: 1
	}];

	var currentQuestion = 0;
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var number = 10;
	var counter;


$(document).ready(function(){

	$('#time').html("<h2>Welcome to NFL Trivia!</h2>");
	$('#question').html("<div class='play'>Play</div>");
	$('.play').click(function(){
	showCurrentQuestion();
	run();
		$('body').on('click', '.option', function(){
		if($(this).text() === quiz[currentQuestion].options[quiz[currentQuestion].correctAnswer]){
			console.log("win");
			clearInterval(counter);
			$('#time').empty();
			$('#question').html("<h1>That's Correct!</h1>");
			$('#option').html("<h2>Great Job!</h2>");
			correct++;
			currentQuestion++;
			setTimeout(function(){number = 10}, 5000);
			$('#options').empty();
		}
		else if ($(this).text() !== quiz[currentQuestion].options[quiz[currentQuestion].correctAnswer]) {
			console.log("loss");
			clearInterval(counter);
			$('#time').empty();
			$('#question').html("<h1>That's incorrect! The correct answer is " + quiz[currentQuestion].options[quiz[currentQuestion].correctAnswer] + "!<h1>");
			incorrect++
			currentQuestion++
			setTimeout(function(){number = 10}, 5000);
			$('#options').empty();
		}
		if (currentQuestion >= quiz.length){
			clearInterval(counter);
			console.log("game over");
			$('#time').html("<h1>Game Over!</h1>")
			$('#question').html("<p>Correct: " + correct + "</p>" +
								"<p>Incorrect: " + incorrect + "</p>" +
								"<p>Unanswerd: "+ unanswered + "</p>");
			$('#options').html("<button class='playAgain'>Play Again?</div>");
			$('.playAgain').click(function(){
				currentQuestion = 0;
				unanswered = 0;
				correct = 0;
				incorrect = 0;
				number = 10;
				run();
				$('#options').empty();
				showCurrentQuestion();
			});
		}else{
				setTimeout(function(){showCurrentQuestion()}, 5000);
				setTimeout(function(){run()}, 5000);
		}
		
		})
	})

	function showCurrentQuestion(){
		$('#question').html("<p>" + quiz[currentQuestion].question + "</p>");
		for (var i in quiz[currentQuestion].options) {
			var option = quiz[currentQuestion].options;
    		var newElement = document.createElement('div');
    		newElement.class = option[i];
    		newElement.className = "option";
    		newElement.innerHTML = option[i];
    		$("#options").append(newElement);
			} 
	};

	function run() {
    	counter = setInterval(decrement, 1000);
    };
	
	function decrement() {
		$('#time').html("<h2>Time Remaining: " + number + "</h2>");
      	number--;
      	if (number === -1){
      		clearInterval(counter);
      		$('#time').empty();
			$('#question').html("<h1>Time has expired! The correct answer is " + quiz[currentQuestion].options[quiz[currentQuestion].correctAnswer] + "!<h1>");
			unanswered++;
			currentQuestion++;
			number = 10
			$('#options').empty();
			setTimeout(function(){showCurrentQuestion()}, 5000);
			setTimeout(function(){run()}, 5000);

		}
    };
});