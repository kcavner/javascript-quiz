// - Variable for prompt, options, and answer
var questionList = [
{   
    prompt:'what is an object?',
    options:['a named place in the computers memory','an attribute','a function'],
    answer:'a named place in the computers memory'
},

{   
    prompt:'where does the script tag for javascript go in the html?',
    options:['below the body','above the body','inside the body'],
    answer:'below the body'
},
{   
    prompt:'where does textContent input go?',
    options:['inside the html tag','to local storage','between the opening and closing html tags'],
    answer:'between the opening and closing html tags'
},
{   
    prompt:'a code block is in what type of brackets?',
    options:['<>','()','{}'],
    answer:'{}'
},
{   
    prompt:'math.random gives what type of number',
    options:['a whole number','an integer','a rational number'],
    answer:'a rational number'
},
]
// - Get elements from DOM (querySelectors)
var questionsEl = document.querySelector('#question')
var timerEl = document.querySelector('#seconds')
var optionsEl = document.querySelector('#options')
var submitEl = document.querySelector('#submit')
var startEl = document.querySelector('#start')
var nameEL = document.querySelector('#name')
var feedbackEl= document.querySelector('#feedback')
var hideStart = document.querySelector('#start-card')
var beginEl = document.querySelector('#begin-card')
var correctEl = document.querySelector('#correctAmmount')
var endEl = document.querySelector('#end-card')

// - Variable setting quiz's initial state
var questionIndex = 0
var correctQuestions = 0
var timeScore = 75

// timer that starts once the start button is clicked
function timerFunction(){
 var timeTick = setInterval(function(){
    timerEl.textContent = timeScore
    timeScore--
    if (timeScore<=0 || questionIndex === questionList.length){
        
      endQuiz()
      clearInterval(timeTick)
      }
}, 1000);
}

// - Function starting uqiz
function startQuiz(){
   hideStart.setAttribute("style","display: none;")
   beginEl.setAttribute("style","display: flex;")
   nextQuestion()
   timerFunction()
}

// - create dynamic elements from question array loop
function nextQuestion(){
    var promptQ = questionList[questionIndex]
    questionsEl.textContent = promptQ.prompt;
    optionsEl.innerHTML = "";
    promptQ.options.forEach(function(selection, i){
        var selectBtn = document.createElement("button")
        selectBtn.setAttribute('value', selection)
        selectBtn.textContent = i + 1 + ". " + selection;
        optionsEl.appendChild(selectBtn);
        selectBtn.addEventListener('click',factCheck);

}
)
}
// Function that checks answer value from nextquestion and either removes time or gives next question
// ends if question index reaches end
function factCheck(){
    if (this.value !== questionList[questionIndex].answer) {
        timeScore-=30
        feedbackEl.textContent = `Incorrect.`;
        feedbackEl.setAttribute("style", "background-color: red;")
        questionIndex++;
      } else {
        feedbackEl.textContent = "Correct";
        feedbackEl.setAttribute("style", "background-color: green;")
        correctQuestions++
        questionIndex++;
      }
      feedbackEl.setAttribute("class", "feedback");
      setTimeout(function() {
        feedbackEl.removeAttribute("class");
      }, 1500);
      
      if (questionIndex === questionList.length) {
        endQuiz();
        
      } else {
        nextQuestion();
      }

}
// - Function that changes element display on quiz end
function endQuiz(){
    beginEl.setAttribute("style","display: none;")
    endEl.setAttribute("style","display: flex;")
    correctEl.textContent = "you got " + correctQuestions + " out of 5 correct"
}

// saves name value entered in input as a name and score pair in local storage
function submitFunction(){
  var nameScore = { 
    name:nameEL.value,
    score:timeScore
  }
  var highscores =
  JSON.parse(window.localStorage.getItem("highscores")) || [];
  
  window.localStorage.setItem('nameScore', JSON.stringify(nameScore))
}

// added event listeners to start and submit button
startEl.addEventListener('click', startQuiz)
submitEl.addEventListener('click', submitFunction)