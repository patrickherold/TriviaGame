//global variables
var correctAnswers;
var wrongAnswers;

// use this to hold the current question from all questions.
var currentQuestion;
// keep track of how long;
var timer;
//
var timeToGuess;
// a copy of the questions for this game
var myQuestions; 

// settings
// seconds you have to guess
var questionLength = 10; 
// seconds you're shown the answer
var displayAnswerSeconds = 3; 
// set this to limit the number of questions per game
var gameLength; 


$(document).ready(newGame);


// get a new game setup
function newGame(){
    // show question text after new game
    $("#questionText").show();

    // Show the newgame button and when clicked get the first question
    $("#startGame").off().on("click", newQuestion);

    // display welcome
    $("#questionText").html('You have 10 seconds to answer each question!<br>Click when ready...');


    // hide and empty everthing
    $("#result").hide();
	$("#choices").hide();
	$("#choices li").empty();
    $(".scoreboard").empty();

	//reset game results
	wrongAnswers = 0;
    correctAnswers = 0;
    
	// creates a fresh copy of the questions on each play
	myQuestions = questionsmyQuestions.slice(); 
	timeToGuess = questionLength;
    gameLength = myQuestions.length;
    
        
	//on button click check the guess you made
    $("#choices .answer").off().on("click", makeGuess);
}

function newQuestion(){
    // hide the new game button for duration of the game. 
    $("#startGame").hide();

    // keep track of how many quesitons have been asked. 

    if(correctAnswers + wrongAnswers >= gameLength){
        // if you answered all of them end the game.

        gameOver();
	} else {
		//otherwise pick a question that hasn't been used
		var questionNumber = Math.floor(Math.random() * myQuestions.length);
        currentQuestion = myQuestions[questionNumber];
        // remove the asked question from the temp array of questions.
		myQuestions.splice(questionNumber, 1);
        
        // hide the result from before
        $("#result").empty().hide();

        // display the new current question
        $("#questionText").html(currentQuestion.question);

        // show each of the questions 
		$("#choices").show().find(".answer").each(function(i){
			$(this).html(currentQuestion.answers[i]);
        });

        // rest the timer to 10 seconds
        resetTimer();
       
		// start Question Timer
		timer = setInterval(showTimer, 1000);
	}
}

function makeGuess(){
    // hide the choices once the quess is made
    $("#choices").hide();

    // if correct tell them and add to correct totals
	if ($(this).data("choice") == currentQuestion.correctAnswer){
		correctAnswers++;
        showResult("YOU GOT IT!", "correctResult");
    
        // if wrong tell them and add to wrong totals
	} else {
		wrongAnswers++;
		showResult("Sorry, not right. The answer was:<br>" + currentQuestion.answers[currentQuestion.correctAnswer], "wrongResult");
	}
}

function showResult(msg, addThisClass){
	resetTimer();
	$("#result")
		.html(msg)
		.show()
		.removeClass()
		.addClass(addThisClass);
	setTimeout(newQuestion, displayAnswerSeconds*1000);
	$("#scoreRight").html(correctAnswers);
    $("#scoreWrong").html(wrongAnswers);

}

function gameOver(){
    // hide last question and choices
    $("#questionText").hide();
	$("#choices").hide();

    // let's tell them how well they did.  Percent success.
	var score = Math.floor((correctAnswers/gameLength)*100);

    $("#result").removeClass().html("<h1>Game Over</h1><div class='gameOverText'>You got " + score + "% of the questions right.</div>");
    $("#startGame").show();
    $("#startGame").on("click", newGame);

};




var questionsmyQuestions = [
	{
	 	question: "What year was I born?",
	 	answers: ["1972", "1963", "1969", "No one knows."],
	 	correctAnswer: 1
	},
	{
	 	question: "What state was I born in?",
	 	answers: ["New York", "Oregon", "California", "Georgia"],
	 	correctAnswer: 2
	},
	{
	 	question: "What was the highest political office I've run for?",
	 	answers: ["State Sentate", "School Board", "Jr. High Class VP", "Corenor"],
	 	correctAnswer: 2
	}
];



// setup the timers
function showTimer(){
	if (timeToGuess >= 0){
		$("#timer").html(timeToGuess);
		timeToGuess--;
	} else {
		timesUp();
	}
}

// when time is up add to wrong answer, reset timer and show the answer
function timesUp(){
	wrongAnswers++;
    resetTimer();
    $("#choices").hide();
	showResult("Time's Up! The correct answer was " + currentQuestion.answers[currentQuestion.correctAnswer], "timesUp");
}

// reset the timer and start over. 
function resetTimer(){
	clearInterval(timer);
    timeToGuess = questionLength;
    // use this to display 10 Seconds before the timer starts.
	$("#timer").html(questionLength);
}
