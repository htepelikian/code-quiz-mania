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
{
    title: "What year did the titanic sink?",
    choices: ["1890( )", "1898( )", "1912( )", "1906( )"],
    answer: "1912( )"
}
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
