var clearBtn = document.querySelector('#clear-score')

function printScores(){
    var scoreParse = JSON.parse(window.localStorage.getItem("nameScore"))
    var scoreListEl = document.createElement("li");
    scoreListEl.textContent = JSON.stringify(scoreParse);
    var scoreOl = document.getElementById("highscores");
    scoreOl.appendChild(scoreListEl);
}
printScores()
function clearScore(){
    localStorage.clear();
    window.location.reload();
}
clearBtn.addEventListener('click', clearScore)
