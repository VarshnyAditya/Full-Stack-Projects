const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId = null;

// Array of different emojis
const emojis = [
  "😀", "😂", "😍", "🐶", "🐱", 
  "🦄", "🍕", "🍎", "⚽", "🎮",
  "🚀", "🌈", "🎁", "🎂", "❤️"
];

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("emoji");
    square.textContent = ""; // Clear any emoji text
  });

  const randomIndex = Math.floor(Math.random() * squares.length);
  const randomSquare = squares[randomIndex];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  randomSquare.classList.add("emoji");
  randomSquare.textContent = randomEmoji; // Set the emoji text
  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id === hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
      square.classList.remove("emoji");
      square.textContent = "";
      
      // Add visual feedback for successful hit
      square.style.backgroundColor = "green";
      setTimeout(() => {
        square.style.backgroundColor = "rgb(61, 61, 61)";
      }, 200);
    } else if (square.classList.contains("emoji")) {
      // Penalty for clicking wrong emoji
      result = Math.max(0, result - 1);
      score.textContent = result;
      
      // Add visual feedback for wrong hit
      square.style.backgroundColor = "red";
      setTimeout(() => {
        square.style.backgroundColor = "rgb(61, 61, 61)";
      }, 200);
    }
  });
});

function moveEmoji() {
  randomSquare();
  timerId = setInterval(randomSquare, 700);
}

moveEmoji();

// function countDown() {
//   currentTime--;
//   timeLeft.textContent = currentTime;

//   if (currentTime <= 0) {
//     clearInterval(countDownTimerId);
//     clearInterval(timerId);
    
//     // Create a more stylish game over display
//     const gameOver = document.createElement("div");
//     gameOver.style.position = "fixed";
//     gameOver.style.top = "0";
//     gameOver.style.left = "0";
//     gameOver.style.width = "100%";
//     gameOver.style.height = "100%";
//     gameOver.style.backgroundColor = "rgba(0,0,0,0.8)";
//     gameOver.style.display = "flex";
//     gameOver.style.flexDirection = "column";
//     gameOver.style.justifyContent = "center";
//     gameOver.style.alignItems = "center";
//     gameOver.style.zIndex = "1000";
//     gameOver.style.color = "white";
//     gameOver.style.fontSize = "2rem";
    
//     gameOver.innerHTML = `
//       <h1>Game Over!</h1>
//       <p>Your final score is ${result}</p>
//       <button id="play-again" style="padding: 10px 20px; font-size: 1.5rem; margin-top: 20px; cursor: pointer;">
//         Play Again
//       </button>
//     `;
    
//     document.body.appendChild(gameOver);
    
//     document.getElementById("play-again").addEventListener("click", () => {
//       location.reload();
//     });
//   }
// }


//new js
// function countDown() {
//     currentTime--;
//     timeLeft.textContent = currentTime;
  
//     if (currentTime <= 0) {
//       clearInterval(countDownTimerId);
//       clearInterval(timerId);
      
//       // Create game over display
//       const gameOver = document.createElement("div");
//       gameOver.style.position = "fixed";
//       gameOver.style.top = "0";
//       gameOver.style.left = "0";
//       gameOver.style.width = "100%";
//       gameOver.style.height = "100%";
//       gameOver.style.backgroundColor = "rgba(0,0,0,0.8)";
//       gameOver.style.display = "flex";
//       gameOver.style.flexDirection = "column";
//       gameOver.style.justifyContent = "center";
//       gameOver.style.alignItems = "center";
//       gameOver.style.zIndex = "1000";
//       gameOver.style.color = "white";
//       gameOver.style.fontSize = "2rem";
      
//       if (result > 50) {
//         // Special winning celebration
//         const winCelebration = document.createElement("div");
//         winCelebration.className = "win-celebration";
//         winCelebration.innerHTML = `
//           <div class="confetti-top">🎉</div>
//           <h1>CONGRATULATIONS! YOU HAVE WON!</h1>
//           <p>Your final score is ${result}</p>
//           <div class="party-popper left">🎊</div>
//           <div class="party-popper right">🎊</div>
//           <button id="play-again" style="padding: 10px 20px; font-size: 1.5rem; margin-top: 20px; cursor: pointer;">
//             Play Again
//           </button>
//         `;
//         document.body.appendChild(winCelebration);
//       } else {
//         // Regular game over screen
//         gameOver.innerHTML = `
//           <h1>Game Over!</h1>
//           <p>Your final score is ${result}</p>
//           <button id="play-again" style="padding: 10px 20px; font-size: 1.5rem; margin-top: 20px; cursor: pointer;">
//             Play Again
//           </button>
//         `;
//         document.body.appendChild(gameOver);
//       }
      
//       document.getElementById("play-again")?.addEventListener("click", () => {
//         location.reload();
//       });
//     }
//   }
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime <= 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    
    // Remove any existing emoji
    squares.forEach(square => {
      square.classList.remove("emoji");
      square.textContent = "";
    });

    // Create game over display
    const gameOver = document.createElement("div");
    gameOver.style.position = "fixed";
    gameOver.style.top = "0";
    gameOver.style.left = "0";
    gameOver.style.width = "100%";
    gameOver.style.height = "100%";
    gameOver.style.zIndex = "1000";

    if (result > 50) {
      // Winning celebration (existing code)
      gameOver.className = "win-celebration";
      gameOver.innerHTML = `
        <div class="confetti-top">🎉</div>
        <h1>CONGRATULATIONS! YOU HAVE WON!</h1>
        <p>Your final score is ${result}</p>
        <div class="party-popper left">🎊</div>
        <div class="party-popper right">🎊</div>
        <button id="play-again" style="padding: 10px 20px; font-size: 1.5rem; margin-top: 20px; cursor: pointer;">
          Play Again
        </button>
      `;
    } 
    else if (result < 15) {
      // New losing message
      gameOver.className = "lose-message";
      gameOver.innerHTML = `
        <div class="sad-face">😢</div>
        <h1>OOPS! YOU LOSE THE GAME</h1>
        <p>Better luck next time!</p>
        <p>Your score: ${result}</p>
        <button id="play-again" style="padding: 10px 20px; font-size: 1.5rem; margin-top: 20px; cursor: pointer; background: #ff4d4d; color: white; border: none; border-radius: 5px;">
          Try Again
        </button>
      `;
    }
    else {
      // Regular game over (existing code)
      gameOver.style.backgroundColor = "rgba(0,0,0,0.8)";
      gameOver.style.display = "flex";
      gameOver.style.flexDirection = "column";
      gameOver.style.justifyContent = "center";
      gameOver.style.alignItems = "center";
      gameOver.style.color = "white";
      gameOver.style.fontSize = "2rem";
      gameOver.innerHTML = `
        <h1>Game Over!</h1>
        <p>Your final score is ${result}</p>
        <button id="play-again" style="padding: 10px 20px; font-size: 1.5rem; margin-top: 20px; cursor: pointer;">
          Play Again
        </button>
      `;
    }

    document.body.appendChild(gameOver);
    document.getElementById("play-again").addEventListener("click", () => {
      location.reload();
    });
  }
}
countDownTimerId = setInterval(countDown, 1000);