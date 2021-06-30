//Variables and arrays of given questions, choices, and correct answer    
var questions = [{
    title: "What is 2+2?",
    choices: ["4( )", "3( )", "11( )", "22( )"],
    answer: "4( )"
},
{
    title: "What is 6*5?",
    choices: ["20( )", "45( )", "30( )", "35( )"],
    answer: "30( )"
},
{
    title: "How many chromosomes does the avergae human have?",
    choices: ["22( )", "78( )", "46( )", "23( )"],
    answer: "23( )"
},
{
    title: "What year was the California gold rush?",
    choices: ["1848( )", "1912( )", "1850( )", "1902( )"],
    answer: "1848( )"
},
]

//Setting values for score, question, time/clock/timer.
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//Setting function for start of quiz with countdown time shown
function start() {

timeLeft = 60;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
//End game if time is at 0 even if all questions are not answered
if (timeLeft <= 0) {
    clearInterval(timer);
    endGame(); 
}
}, 1000);

next();
}

//End timer to end game
function endGame() {
    clearInterval(timer);
    
var quizContent = `
    <h2>Time's Up!</h2>
    <h3>` + score +  ` /100!</h3>
    <input type="text" id="name" placeholder="Initials"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}


//User gains 15 points for each correct answer!
function correct() {
    score += 15;
    next();
}
        
//Takes away 10 seconds for every incorrect answer
function incorrect() {
    timeLeft -= 10; 
    next();
}

//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}