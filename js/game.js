const dialogueLines = [
  { text: "Welcome to Iyah’s quiz corner!", face: "../Assets/character/dia1.png" },
  { text: "The game’s simple. If you get 9/10 exactly correct, you get a reward. Get 10/10 and you unlock something very special!", face: "../Assets/character/dia2.png" },
  { text: "I do hope you get it all right! Otherwise I’ll be really sad.", face: "../Assets/character/dia3.png" },
  { text: "I put my soul into this so I hope you enjoy it. Goodluck hani!", face: "../Assets/character/dia4.png" }
];

let dialogueIndex = 0;

function startGame() {
  document.querySelector(".background").classList.add("blur-active");
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("dialogueContainer").classList.remove("hidden");
  document.getElementById("quitBtn").style.display = "block";
  dialogueIndex = 0;
  showDialogue();
}

function showDialogue() {
  const current = dialogueLines[dialogueIndex];
  document.getElementById("dialogueText").textContent = current.text;
  document.getElementById("characterImage").src = current.face;
}

function nextDialogue() {
  dialogueIndex++;
  if (dialogueIndex < dialogueLines.length) showDialogue();
  else startQuiz();
}

function skipDialogue() {
  startQuiz();
}

const questions = [
  { question: "What's My Favorite Game as of Right now?", choices: ["Stray","Hogwarts","Heartopia","Cities Skylines"], correct: 0 },
  { question: "If we were on a deserted island and you died first, and i had to eat you to survive which part would I eat first? ", choices: ["Heart","Leg","That dih","None id kms"], correct:3 },
  { question: "If a girl kisses you in front of me, what should you do?", choices: ["Run away screaming","Tripple punch them in the face","Let iyah kachoww her face","Call security"], correct:1 },
  { question: "What was i wearing when you first confessed to me?", choices: ["Baggy gray shirt and jeans","Pink cardigan, white sleeveless shirt, and jeans","Your shirt and jeans","White shirt and loose blank pants"], correct: 2 },
  { question: "What fastfood chain serves french fries that i love most?", choices: ["Burger King","Mcdonalds","Jollibee","Potato corner"], correct: 3 },
  { question: "I wore press on nails on our 3rd AKWE. I kept showing them to you cuz they were so pretty. What were they? ", choices: ["../Assets/nail1.jpg","../Assets/nail2.jpg","../Assets/nail3.jpg","../Assets/nail4.jpg"], correct: 0 },
  { question: "What's one feature of you that I found cute when I first saw you (aka when we first talked to each other in that self ethics whatever class)", choices: ["Your Eyes","Your Laugh","Your Voice","Your Smile"], correct: 3 },
  { question: "What's my second favorite color?", choices: ["Pastel Purple","Baby Blue","Sage Green","Black"], correct: 2 },
  { question: "What's something weird that I like/do", choices: ["The smell of gasoline in a gas station","The taste of boogers","Biting my toenails","Scratching the blackboard using a chalk"], correct: 0 },
  { question: "I put one of these in our wedding pinterest board and I showed it to you before (ik you forgot so im putting it here tehee). Which one of these pictures have i saved in that pinterest board? [You’ll earn a special reward if you get this right. Hint: We’ve talked about this before]", choices: ["../Assets/wed1.jpg","../Assets/wed2.jpg","../Assets/wed3.jpg","../Assets/wed4.jpg"], correct: 0, isSpecial: true }
];

while (questions.length < 10) questions.push({ question: "Dummy Question " + (questions.length + 1), choices: ["A","B","C","D"], correct: 0 });

let currentQuestion = 0;
let score = 0;
let specialQuestionCorrect = false;

function startQuiz() {
  document.getElementById("dialogueContainer").classList.add("hidden");
  document.getElementById("quizContainer").classList.remove("hidden");
  document.getElementById("quitBtn").style.display = "block";

  currentQuestion = 0;
  score = 0;
  specialQuestionCorrect = false;
  showQuestion();
}

function quitGame() {
    window.location.href = "../Html/game.html"; 
}

function showQuestion() {
    const q = questions[currentQuestion];
    const questionText = document.getElementById("questionText");
    const choicesDiv = document.getElementById("choices");

    questionText.textContent = q.question;
    choicesDiv.innerHTML = "";

    const isImageQuestion = q.choices.every(c => typeof c === "string" && c.match(/\.(jpg|jpeg|png|gif|webp)$/i));

    if (isImageQuestion) {
        choicesDiv.classList.add("image-grid");
    } else {
        choicesDiv.classList.remove("image-grid");
    }

    q.choices.forEach((choice, index) => {
        const btn = document.createElement("button");

        if (isImageQuestion) {
            const img = document.createElement("img");
            img.src = choice;
            img.style.width = "150px";
            img.style.height = "150px";
            img.style.objectFit = "cover";
            btn.appendChild(img);
        } else {
            btn.textContent = choice;
        }

        btn.onclick = () => selectAnswer(index);
        choicesDiv.appendChild(btn);
    });
}

function selectAnswer(selectedIndex) {
  const q = questions[currentQuestion];
  if(selectedIndex === q.correct){
    score++;
    if(q.isSpecial) specialQuestionCorrect = true;
  }
  currentQuestion++;
  if(currentQuestion < questions.length) showQuestion();
  else endGame();
}

// REWARDS
let rewards = JSON.parse(localStorage.getItem("rewards")) || { 
    nineCorrect:false, 
    tenCorrect:false, 
    specialQuestion:false 
};

function saveRewards(){ 
    localStorage.setItem("rewards", JSON.stringify(rewards)); 
}

function endGame() {
    document.getElementById("quizContainer").classList.add("hidden");
    document.getElementById("quitBtn").style.display = "none";

    let rewardMessage = "";
    let scoreImage = "";

    if (score === 10 || score === 9) {

        if (score === 10) {
            if (!rewards.tenCorrect) {
                rewards.tenCorrect = true;
            }
            rewardMessage = "Wahh baba knows me so well! Check what you've won in the rewards section of the main menu.";
            scoreImage = "../Assets/10score.png";
        }

        if (score === 9) {
            if (!rewards.nineCorrect) {
                rewards.nineCorrect = true;
            }
            rewardMessage = "You're so closee!! You still got something tho! Check it in the rewards section of the main menu.";
            scoreImage = "../Assets/9score.png";
        }

        if (specialQuestionCorrect) {
            if (!rewards.specialQuestion) {
                rewards.specialQuestion = true;
            }
            rewardMessage += " IN ADDITION you got the special award too!";
        }
    } 
    else {

        if (specialQuestionCorrect) {

            if (!rewards.specialQuestion) {
                rewards.specialQuestion = true;
            }

            rewardMessage = "Welp not the best but at least u got the special question right";
            scoreImage = "../Assets/midscore.png";

        } else {

            rewardMessage = "Watahek! Weve been together for 2 years and u still dunno me?";
            scoreImage = "../Assets/lowscore.png";
        }
    }

    saveRewards();

    const resultContainer = document.getElementById("resultContainer");
    document.getElementById("scoreText").textContent = `Score: ${score}/10`;
    document.getElementById("scoreImage").src = scoreImage;
    document.getElementById("rewardText").textContent = rewardMessage;

    resultContainer.classList.remove("hidden");
}

    document.getElementById("backMenuBtn").onclick = () => {
        window.location.href = "../Html/game.html";
    };
    document.getElementById("playAgainBtn").onclick = () => {
        resultContainer.classList.add("hidden");
        startQuiz();
    };


async function copyImageToClipboard(imageSrc) {
  try {
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new ClipboardItem({ [blob.type]: blob })
    ]);
  } catch (err) {
    alert("Copy failed. Your browser may not support image clipboard.");
    console.error(err);
  }
}

function openRewards() {

  const overlay = document.getElementById("rewardsOverlay");
  const rewardList = document.getElementById("rewardList");

  rewardList.innerHTML = "";

  const storedRewards = JSON.parse(localStorage.getItem("rewards")) || {};

  if (!storedRewards.nineCorrect &&
      !storedRewards.tenCorrect &&
      !storedRewards.specialQuestion) {

    rewardList.innerHTML = `<div class="no-reward">No coupon won yet 💔</div>`;
  } 
  else {

    if (storedRewards.nineCorrect) {
      rewardList.innerHTML += `
        <img src="../Assets/almost.png" class="reward-img">
        <button class="copy-btn" onclick="copyImageToClipboard('../Assets/almost.png')">
          Copy Image
        </button>
      `;
    }

    if (storedRewards.tenCorrect) {
      rewardList.innerHTML += `
        <img src="../Assets/perfect.png" class="reward-img">
        <button class="copy-btn" onclick="copyImageToClipboard('../Assets/perfect.png')">
          Copy Image
        </button>
      `;
    }

    if (storedRewards.specialQuestion) {
      rewardList.innerHTML += `
        <img src="../Assets/secret.png" class="reward-img">
        <button class="copy-btn" onclick="copyImageToClipboard('../Assets/secret.png')">
          Copy Image
        </button>
      `;
    }
  }

  overlay.classList.remove("hidden");
}

document.getElementById("rewardsOverlay").addEventListener("click", function(e) {
  if (e.target === this) {
    this.classList.add("hidden");
  }
});

function goBack(){
  document.getElementById("rewardsContainer").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
}