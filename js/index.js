const container = document.querySelector(".container");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yes = document.querySelector("#yes");
const no = document.querySelector("#no");
const button = document.querySelector(".buttons");
const audio = new Audio('../Assets/soundEffect.mp3');
const buttons = document.querySelectorAll("button");
//button pressed condition
buttons.forEach(button => {
  button.addEventListener("click", () => {
    audio.volume = 0.3;
    audio.play();
  });
});
//no condition
no.addEventListener("click", () =>{
    no.innerHTML = "Try Again hehe"

    no.addEventListener("click", () => {
    no.innerHTML ="Wait srsly?"

    no.addEventListener("click", () => {
    no.innerHTML ="Pleasee?"

    no.addEventListener("click", () => {
    no.innerHTML ="Pretty Pleasee??"

    no.addEventListener("click", () => {
    no.innerHTML ="I'll pay for dinner~"

    no.addEventListener("click", () => {
    no.innerHTML ="And desert!!"

    no.addEventListener("click", () => {
    no.innerHTML ="Last chance?"

    no.addEventListener("click", () => {
    question.innerHTML = "Fck you! You WILL be MY Valentine."
    gif.src ="../Assets/mad.gif"
    yes.innerHTML = "Uhh... Okay..."
    no.remove();  
        });
        });
        });
        });
        });
        });
    });
});

//yes condition
let step = 0;

yes.addEventListener("click", () => {
  if (step === 0) {
    question.innerHTML = "Yipieeee <3";
    yes.innerHTML = "Continue ->";
    gif.src = "../Assets/man2.gif";
    no.remove();
    step++;
  } 
  else if (step === 1) {
    question.innerHTML = "I've got a gift. Open it?";
    yes.innerHTML = "YESSSS!!!!";
    gif.src = "../Assets/moo.gif";
    step++;
  } 
  else if (step === 2) {
    openMain();
  }
});

function openMain() {
  window.location.href = "../Html/home.html";
}
