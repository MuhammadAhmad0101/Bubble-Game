document.addEventListener("DOMContentLoaded",function(){
  let wrong = new Audio("assest/wrong.mp3");
  let outstanding = new Audio("assest/outstanding.mp3");
  let amazing = new Audio("assest/amazing.mp3");
  let startgame = document.querySelector("button");
  let victorymusic = new Audio("assest/Buttons.mp3");
  let hundredcrossed = new Audio("assest/excellent.mp3");
  let startMusic = new Audio("assest/music.mp3");
  let backnmusic = new Audio("assest/startscreen.mp3");
  let gameover = new Audio("assest/gameover.mp3");
  let startupscreen = document.querySelector("#startupscreen");
  
  startgame.addEventListener("click", function () {
    startupscreen.style.display = "none";
    startMusic.play();
    startMusic.loop = true;
    startMusic.volume = 0.5;
    timeLeft();
    makeBubble();
    makenewHit();
  });
  let panelTopVanished = document.querySelector("#panel-top");
  let userClicked = document.querySelector("#panel-bottom");
  let score = 0;
  function makeBubble() {
    let copy = "";
    for (let i = 1; i <= 130 - 4; i++) {
      copy = copy + `<div class="bubble">${Math.floor(Math.random() * 20)}</div>`;
    }
    document.querySelector("#panel-bottom").innerHTML = copy;
  }
  
  let randomNumber;
  function makenewHit() {
    randomNumber = Math.floor(Math.random() * 20);
    document.querySelector("#hit-value").textContent = randomNumber;
  }
  let amazingvoiceplayed = false;
  let timeleft = new Audio("assest/tensecondleft.mp3");
  let excellentVoicePlayed = false;
  let outstandingVoiceplayed = false;
  function timeLeft() {
    let time = 61;
    let timerSelected = document.querySelector("#timer-value");
    let stop = setInterval(function () {
      if (time > 0) {
        time--;
        timerSelected.textContent = time + " sec";
  
        // Check if score has reached 10 and play the excellent voice only once
        if (score >= 100 && !excellentVoicePlayed) {
          hundredcrossed.play();
          excellentVoicePlayed = true; // Set the flag to true so it won't play again
        }
        if (score >= 50 && !amazingvoiceplayed) {
          amazing.play();
          amazingvoiceplayed = true;
        }
        if (score >= 150 && !outstandingVoiceplayed) {
          outstanding.play();
          amazingvoiceplayed = true;
        }
        
        if (time <= 11 && time > 0) {
          startMusic.volume = 0.2;
          timeleft.play();
          timeleft.loop = false;
        }
      } else {
        clearInterval(stop);
        startMusic.pause();
        gameover.play();
        document.querySelector(
          "#panel-bottom"
        ).innerHTML = `<h1 id="yourscore">Your Score is <span id="scoredisplay"> ${score}</span></h1><h4 id="century"> You Need Some Practise 👽 </h4> <h5 id="timesup">Times Up ! ⏳ <br>Press <span id="f5">F5</span> to Try Again</h5>`;
        
        if (score >= 100) {
          document.querySelector(
            "#panel-bottom"
          ).innerHTML = `<h1 id="yourscore">Your Score is <span id="scoredisplay"> ${score}</span></h1><h4 id="century"> You Crossed the Century 🥳</h4><h5 id="timesup">Times Up ! ⏳ <br>Press <span id="f5">F5</span> to Try Again</h5>`;
          setTimeout(function () {
            timeleft.pause();
            panelTopVanished.innerHTML = ` <h1 id="comingsoon">Level Two is Coming Soon</h1>`;
            backnmusic.play();
            timeleft.pause();
            backnmusic.loop = true;
            backnmusic.volume = 0.5;
          }, 1000);
        } else if (score <= 100 && score >= 50) {
          document.querySelector(
            "#panel-bottom"
          ).innerHTML = `<h1 id="yourscore">Your Score is <span id="scoredisplay"> ${score}</span></h1><h4 id="century">Keep it up....You can ! 🙌<h4><h5 id="timesup">Times Up ! ⏳ <br>Press  <span id="f5">F5</span>  to Try Again</h5>`;
        }
      }
    }, 1000);
  }
  let scoreSelected = document.querySelector("#score");
  function addScore() {
    if (randomNumber > 10) {
      score += 10;
    } else {
      score += 7;
    }
    scoreSelected.textContent = score;
  }
  let bubblepopsoundEffect = new Audio("assest/bubblespop.mp3");
  userClicked.addEventListener("click", function (detail) {
    let buttonClicked = Number(detail.target.textContent);
    if (buttonClicked === randomNumber) {
      bubblepopsoundEffect.play();
      addScore();
      makeBubble();
      makenewHit();
    } else {
      wrong.play();
    }
  });
})