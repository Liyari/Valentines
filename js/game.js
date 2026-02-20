// ======================================
// DIALOGUE SYSTEM (WITH FACE CHANGES)
// ======================================

const dialogueLines = [
  {
    text: "Welcome to Iyah’s quiz corner!",
    face: "../Assets/character/dia1.png"
  },
  {
    text: "The game’s simple. If you get 9/10 exactly correct, you get a reward. Get 10/10 and you unlock something very special!",
    face: "../Assets/character/dia2.png"
  },
  {
    text: "I do hope you get it all right! Otherwise I’ll be really sad.",
    face: "../Assets/character/dia3.png"
  },
  {
    text: "I put my soul into this so I hope you enjoy it. Goodluck hani!",
    face: "../Assets/character/dia4.png"
  }
];

let dialogueIndex = 0;

function startGame() {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("dialogueContainer").classList.remove("hidden");

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

  if (dialogueIndex < dialogueLines.length) {
    showDialogue();
  } else {
    startQuiz();
  }
}

function skipDialogue() {
  startQuiz();
}

// ======================================
// QUIZ SYSTEM
// ======================================

const questions = [
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    correct: 1
  },
  {
    question: "Capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2
  },
  {
    question: "Special Question: 5 x 5?",
    choices: ["20", "25", "30", "35"],
    correct: 1,
    isSpecial: true
  }
];

// Fill up to 10 questions
while (questions.length < 10) {
  questions.push({
    question: "Dummy Question " + (questions.length + 1),
    choices: ["A", "B", "C", "D"],
    correct: 0
  });
}

let currentQuestion = 0;
let score = 0;
let specialQuestionCorrect = false;

function startQuiz() {
  document.getElementById("dialogueContainer").classList.add("hidden");
  document.getElementById("quizContainer").classList.remove("hidden");

  currentQuestion = 0;
  score = 0;
  specialQuestionCorrect = false;

  showQuestion();
}

function quitGame() {
  document.getElementById("quizContainer").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
}

function showQuestion() {
  const questionObj = questions[currentQuestion];
  const questionText = document.getElementById("questionText");
  const choicesDiv = document.getElementById("choices");

  questionText.textContent = questionObj.question;
  choicesDiv.innerHTML = "";

  questionObj.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(index);
    choicesDiv.appendChild(btn);
  });
}

function selectAnswer(selectedIndex) {
  const questionObj = questions[currentQuestion];

  if (selectedIndex === questionObj.correct) {
    score++;

    if (questionObj.isSpecial) {
      specialQuestionCorrect = true;
    }
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

// ======================================
// REWARD SYSTEM
// ======================================

let rewards = JSON.parse(localStorage.getItem("rewards")) || {
  nineCorrect: false,
  tenCorrect: false,
  specialQuestion: false
};

function saveRewards() {
  localStorage.setItem("rewards", JSON.stringify(rewards));
}

function endGame() {
  document.getElementById("quizContainer").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");

  // 9/10 correct
  if (score === 9) {
    rewards.nineCorrect = true;
  }

  // 10/10 correct
  if (score === 10) {
    rewards.tenCorrect = true;
  }

  // Special question correct
  if (specialQuestionCorrect) {
    rewards.specialQuestion = true;
  }

  saveRewards();

  alert("Game Over! You scored " + score + "/10");
}

// ======================================
// REWARDS PAGE
// ======================================

function openRewards() {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("rewardsContainer").classList.remove("hidden");

  const rewardList = document.getElementById("rewardList");
  rewardList.innerHTML = "";

  const storedRewards = JSON.parse(localStorage.getItem("rewards"));

  if (!storedRewards.nineCorrect &&
      !storedRewards.tenCorrect &&
      !storedRewards.specialQuestion) {
    rewardList.innerHTML = "<p>No rewards unlocked yet.</p>";
    return;
  }

  if (storedRewards.nineCorrect) {
    rewardList.innerHTML += `
      <img src="../Assets/reward1.png" class="reward-img">
    `;
  }

  if (storedRewards.tenCorrect) {
    rewardList.innerHTML += `
      <img src="../Assets/reward2.png" class="reward-img">
    `;
  }

  if (storedRewards.specialQuestion) {
    rewardList.innerHTML += `
      <img src="../Assets/reward3.png" class="reward-img">
    `;
  }
}

function goBack() {
  document.getElementById("rewardsContainer").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
}