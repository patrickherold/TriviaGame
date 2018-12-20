//global variables
var correctAnswer;
var wrongAnswers;

// use this to hold the current question from all questions.
var currentQuestion;
// keep track of how long;
var timer;
//
var timeToGuess;
// a copy of the questions for this game
var myQuestions = [];

// settings
// seconds you have to guess
var questionDuration = 10; 
// seconds you're shown the answer
var displayAnswerSeconds = 3; 
// set this to limit the number of questions per game
var gameLength = 10;

// question object
var myQuestions = [];


$(document).ready(newGame);

function sliderChange(val) {
    document.getElementById('questionsOutput').innerHTML = val;
    gameLength = parseInt(val);
}

function timeChange(val) {
    document.getElementById('timeOutput').innerHTML = val;
    document.getElementById('timeOutputCounter').innerHTML = val;
    questionDuration = parseInt(val);
}


// get a new game setup
function newGame(){
    // show gameLength slider
    $("#gameLengthSlider").show();
    $("#gameLengthResult").show();

    $("#gameLengthSlider").show();
    $("#gameLengthResult").show();
    $("#questionDurationResult").show();
    $("#questionDurationResult").show();
    

    // show the value of the slider
    $("#sliderValue").html('You have ' + gameLength + ' question in this game.<br><small>Move the slider left or right to select more or less quesitons.</small>');



    // display time per question
    $("#timeOutput").html(questionDuration);
    
    // display time per question countdown
    $("#timeOutputCounter").html(questionDuration);


    // hide and empty everthing
    $("#result").hide();
    $("#choices").hide();
	$("#choices.answers").empty();
    $("#scoreRight").empty();
    $("#scoreWrong").empty();

	//reset game scoring
    correctAnswers = 0;
	wrongAnswers = 0;
    
	// creates a fresh copy of the questions on each play
	myQuestions = myQuestions.slice(); 
	timeToGuess = questionDuration;

    // Show the newgame button and when clicked get the first question
    $("#startGame").on("click", newQuestion);

}

function newQuestion(){
    // show question text when getting started
    $("#questionText").show();

    // hide the new game button for duration of the game. 
    $("#startGame").hide();

    // hide the sliders
    $("#gameLengthResult").hide();
    $("#gameLengthSlider").hide();

    $("#questionDurationResult").hide();
    $("#questionDurationResult").hide();

    // keep track of how many quesitons have been asked. 
    if(correctAnswers + wrongAnswers >= gameLength){
        // if you answered all of them end the game.
        gameOver();

	} else {
        //otherwise pick a question that hasn't been used
        // pick a random whole number up to array length
        var questionNumber = Math.floor(Math.random() * myQuestions.length);
        // set the current quesiton to the random question from temp array
        currentQuestion = myQuestions[questionNumber];

        // remove the asked question from the temp array of questions.
		myQuestions.splice(questionNumber, 1);
        
        // hide the result from before
        $("#result").empty().hide();

        // display the new current question
        $("#questionText").html(currentQuestion.question);

        // show each of the choices for the question
		$("#choices").show().find(".answer").each(function(i){
            $(this).html(currentQuestion.answers[i]);
        });

        // rest the timer to __ seconds
        resetTimer();

        // start Question Timer
        timer = setInterval(showTimer, 1000);

        //on button click check the guess you made
        $("#choices .answer").off().on("click", makeGuess);
	}
}

function makeGuess(){
    // hide the choices once the quess is made
    $("#choices").hide();

    // if correct tell them and add to correct totals
	if ($(this).data("choice") === currentQuestion.correctAnswer){
		correctAnswers++;
        showResult("YOU GOT IT!", "correctResult");
    
    // if wrong tell them and add to wrong totals
	} else {
		wrongAnswers++;
        showResult("Sorry, not right. The answer was:<br>" + currentQuestion.answers[currentQuestion.correctAnswer]);
	}
}

function showResult(msg, addThisClass){
	resetTimer();
	$("#result")
		.html(msg)
		.show()
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

    $("#result").html("<h1>Game Over</h1><div class='gameOverText'>You got " + score + "% of the questions right.</div>");
    
    // if the game length is less that 20 add one for the next game
    if (gameLength < 20) {
        gameLength++;
        document.getElementById('questionsOutput').innerHTML = gameLength;
        $('#slider').val(gameLength);
    }

    // if the question duration is greater than 3 seconds remove a second
    if (questionDuration > 1) {
        questionDuration--;
        document.getElementById('timeOutput').innerHTML = questionDuration;
        $('#timeOutput').val(questionDuration);
    }

    $("timeOutputCounter").html(questionDuration)

    // show the button
    $("#startGame").show();
    $("#startGame").off().on("click", newGame);
};

var myQuestions = [
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
    },
    {category:"Geography",type:"multiple",difficulty:"hard",question:"What country is not a part of Scandinavia?",correctAnswer:1,answers:["Norway","Finland","Sweden","Denmark"]},
    {category:"Geography",type:"multiple",difficulty:"hard",question:"What is the largest city and commercial capital of Sri Lanka?",correctAnswer:1,answers:["Moratuwa","Colombo","Negombo","Kandy"]},
    {category:"Geography",type:"multiple",difficulty:"easy",question:"The body of the Egyptian Sphinx was based on which animal?",correctAnswer:0,answers:["Lion","Bull","Horse","Dog"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"Montreal is in which Canadian province?",correctAnswer:1,answers:["Ontario","Quebec","Nova Scotia","Alberta"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What is the capital of Peru?",correctAnswer:3,answers:["Santiago","Montevideo","Buenos Aires","Lima"]},
    {category:"Geography",type:"multiple",difficulty:"easy",question:"What state is the largest state of the United States of America?",correctAnswer:3,answers:["California","Texas","Washington","Alaska"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What is the name of the former country that was succeeded by countries such as Serbia, Croatia and Slovenia?",correctAnswer:3,answers:["Czechoslovakia","Abkhazia","South Ossetia","Yugoslavia"]},
    {category:"Geography",type:"multiple",difficulty:"hard",question:"Which of these countries is NOT a part of the Asian continent?",correctAnswer:1,answers:["Georgia","Suriname","Russia","Singapore"]},
    {category:"Geography",type:"multiple",difficulty:"easy",question:"Which of these is NOT an Australian state or territory?",correctAnswer:2,answers:["New South Wales","Victoria","Alberta","Queensland"]},
    {category:"Geography",type:"multiple",difficulty:"easy",question:"Which country does Austria not border?",correctAnswer:2,answers:["Slovenia","Switzerland","France","Slovakia"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"Which European city has the highest mileage of canals in the world?",correctAnswer:0,answers:["Birmingham","Venice","Amsterdam","Berlin"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What is the name of the capital of Turkey?",correctAnswer:3,answers:["Istanbul","Izmir","Bursa","Ankara"]},
    {category:"Geography",type:"multiple",difficulty:"hard",question:"The prefix Sino- (As in Sino-American) is used to refer to what nationality?",correctAnswer:2,answers:["Japanese","Russian","Chinese","Indian"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What is the capital of Australia?",correctAnswer:3,answers:["Sydney","Melbourne","Brisbane","Canberra"]},
    {category:"Geography",type:"multiple",difficulty:"easy",question:"Which of the following European languages is classified as a &quot;language isolate?&quot;",correctAnswer:2,answers:["Galician","Maltese","Basque","Hungarian"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"Which of the following countries is within the Eurozone but outside of the Schengen Area?",correctAnswer:2,answers:["Malta","Greece","Cyprus","Portugal"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"Which of the following countries does NOT recognize Armenia as an independent country?",correctAnswer:0,answers:["Pakistan","Iran","Turkey","Azerbaijan"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What African country has Portuguese as its official language?",correctAnswer:1,answers:["Botswana","Mozambique","Gabon","Togo"]},
    {category:"Geography",type:"multiple",difficulty:"easy",question:"Which of the following languages does NOT use the Latin alphabet?",correctAnswer:2,answers:["Turkish","Swahili","Georgian","Vietnamese"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"Where is the area commonly known as the Bermuda Triangle?",correctAnswer:1,answers:["North Pacific Ocean, between Japan and the USA","North Atlantic Ocean, between Florida and Puerto Rico","In the Caribbean Sea","South Pacific Ocean, far off Chile"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"The World Health Organization headquarters is located in which European country?",correctAnswer:3,answers:["United Kingdom","France","Belgium","Switzerland"]},
    {category:"Geography",type:"multiple",difficulty:"easy",question:"Which US state has the highest population?",correctAnswer:1,answers:["New York","California","Texas","Florida"]},
    {category:"Geography",type:"multiple",difficulty:"easy",question:"How many countries does the United States share a land border with?",correctAnswer:1,answers:["1","2","3","4"]},
    {category:"Geography",type:"multiple",difficulty:"easy",question:"What is the official language of Costa Rica?",correctAnswer:3,answers:["English","Portuguese","Creole","Spanish"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What is the capital of the State of Washington, United States?",correctAnswer:1,answers:["Washington D.C.","Olympia","Seattle","Yukon"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What event led to Liechenstein adding a crown to its flag?",correctAnswer:0,answers:["The 1936 Olympics","Coronation of Prince Johann I Joseph in 1805","Charles VI&#039;s decree in 1719","Signing of the 1862 Constitution of Liechtenstein"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What is the largest lake in the African continent?",correctAnswer:2,answers:["Lake Tanganyika","Lake Malawi","Lake Victoria","Lake Turkana"]},
    {category:"Geography",type:"multiple",difficulty:"hard",question:"Which is the largest freshwater lake in the world?",correctAnswer:0,answers:["Lake Superior","Caspian Sea","Lake Michigan","Lake Huron"]},
    {category:"Geography",type:"multiple",difficulty:"easy",question:"What is the Capital of the United States?",correctAnswer:3,answers:["Los Angelas, CA","New York City, NY","Houston, TX","Washington, D.C."]},
    {category:"Geography",type:"multiple",difficulty:"hard",question:"Where is the fast food chain &quot;Panda Express&quot; headquartered?",correctAnswer:2,answers:["Sacremento, California","Fresno, California","Rosemead, California","San Diego, California"]},
    {category:"Geography",type:"multiple",difficulty:"easy",question:"Which of these African countries list &quot;Spanish&quot; as an official language?",correctAnswer:1,answers:["Guinea","Equatorial Guinea","Cameroon","Angola"]},
    {category:"Geography",type:"multiple",difficulty:"hard",question:"What is the most populous Muslim-majority nation in 2010?",correctAnswer:0,answers:["Indonesia","Saudi Arabia","Iran","Sudan"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"Where is the world&#039;s oldest still operational space launch facility located?",correctAnswer:3,answers:["Russia","Iran","United States","Kazakhstan"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What is the busiest port in Europe?",correctAnswer:1,answers:["Port of Antwerp","Port of Rotterdam","Port of Hamburg","Port of Amsterdam"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What is the capital of British Columbia, Canada?",correctAnswer:2,answers:["Vancouver","Hope","Victoria","Kelowna"]},
    {category:"Geography",type:"multiple",difficulty:"hard",question:"What is the name of rocky region that spans most of eastern Canada?",correctAnswer:3,answers:["Rocky Mountains","Appalachian Mountains","Himalayas","Canadian Shield"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"Which one of these countries borders with Poland?",correctAnswer:2,answers:["France","Norway","Lithuania","Netherlands"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What is the capital of Seychelles?",correctAnswer:0,answers:["Victoria","Luanda","N&#039;Djamena","Tripoli"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"The land mass of modern day Turkey is called what?",correctAnswer:0,answers:["Anatolia","Ismuth of Ottoma","Ottoma","Ismuth of Anatolia"]},
    {category:"Geography",type:"multiple",difficulty:"easy",question:"What is the capital of India?",correctAnswer:3,answers:["Bejing","Montreal","Tithi","New Delhi"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"In the 2016 Global Peace Index poll, out of 163 countries, what was the United States of America ranked?",correctAnswer:3,answers:["10","59","79","103"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What is the region conjoining Pakistan, India, and China with unknown leadership called?",correctAnswer:0,answers:["Kashmir","Andorra","Gibraltar","Quin"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"Broome is a town in which state of Australia?",correctAnswer:1,answers:["Northern Territory","Western Australia","South Australia","Tasmania"]},
    {category:"Geography",type:"multiple",difficulty:"hard",question:"What is the land connecting North America and South America?",correctAnswer:3,answers:["Isthmus of Suez","Urals","Australasia","Isthmus of Panama"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"Where is the &quot;Sonoran Desert&quot; located?",correctAnswer:0,answers:["North America","South America","Asia","Africa"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What is the fifth largest country by area?",correctAnswer:3,answers:["United States","Australia","India","Brazil"]},
    {category:"Geography",type:"multiple",difficulty:"hard",question:"What is the capital of Mauritius?",correctAnswer:0,answers:["Port Louis","Port Moresby","Port Vila","Port-au-Prince"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"What is the capital city of Slovenia?",correctAnswer:0,answers:["Ljubljana","Maribor","Velenje","Trbovlje"]},
    {category:"Geography",type:"multiple",difficulty:"medium",question:"How many rivers are in Saudi Arabia?",correctAnswer:0,answers:["0","1","2","3"]}

];



// setup the timers
function showTimer(){
	if (timeToGuess >= 1){
		$("#timeOutputCounter").html(timeToGuess);
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
	showResult("Time's Up! The correct answer was " + currentQuestion.answers[currentQuestion.correctAnswer]);
}

// reset the timer and start over. 
function resetTimer(){
	clearInterval(timer);
    timeToGuess = questionDuration;
    // use this to display  Seconds before the timer starts.
	$("#timeOutputCounter").html("0");
}



//  HERE I'VE BEEN TRYING TO PULL IN THE QUESTIONS USING AJAX... I COULDN'T GET THIS TO WORK. 

// var category = "11";
// var difficulty = "medium";

// var queryURL = "https://opentdb.com/api.php?amount=10&category=" + category +"&difficulty=" + difficulty + "&type=multiple"

// // get questions from opentdb
// function getTrivia(queryURL) {
//     $.ajax({
//     url: queryURL,
//     method: "GET",
//     success: buildArray
//   });
// };

// function buildArray(response) {

//     var oneQuestionCombo = new Object();
//     var myQuestions = [];

//     for (i = 0; i < response.results.length; i++) {
//         // setup variables for each questionCombo
//         var question = response.results[i].question;
//         var answersArray = response.results[i].incorrectAnswers;
//         var correctAnswer = response.results[i].correctAnswer;

//         // add correct answer to the answersArray
//         answersArray.push(correctAnswer)

//         // shuffle the answers 
//         shuffle(answersArray);

//         // build the object that goes into the entire question array
//         oneQuestionCombo.question = question;
//         oneQuestionCombo.answers = answersArray;
//         oneQuestionCombo.correctAnswer = correctAnswer;

//         // push the quesiton combo just created into the myQuestions array
//         myQuestions.push(oneQuestionCombo);
//     }
//     console.log(oneQuestionCombo);
// };

//  shuffle array answers for a,b,c,d variation --- This is used when trying to use ajax  
// function shuffle(a) {
//     var j, x, i;
//     for (i = a.length - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i + 1));
//         x = a[i];
//         a[i] = a[j];
//         a[j] = x;
//     }
//     return a;
// }
