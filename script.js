const wordsec = document.querySelector(".word");
const keyboardsec = document.querySelector(".keyboard");
const figuresec = document.querySelector(".figure");
const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let randomWord = "";

const createKeyboard = () => {
  for (let i = 0; i < letters.length; i++) {
    const lettersquare = document.createElement("div");
    lettersquare.classList.add("lettersquare");
    lettersquare.textContent = letters[i];
    keyboardsec.appendChild(lettersquare);
  }
};

const createWord = () => {
  randomWord = getRandomWord();
  for (let i = 0; i < randomWord.length; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("data-value", randomWord[i]);
    wordsec.appendChild(square);
  }
};

const getRandomWord = () => {
  const words = ["APPLE", "COMPUTER", "SOFTWARE", "MOUSE", "CHERRY"];
  return words[Math.floor(Math.random() * words.length)];
};

const human = ["head", "body", "rightarm", "leftarm", "rightleg", "leftleg"];

const generateBody = (value) => {
  let bodyPart = document.createElement("div");
  bodyPart.classList.add(human[value]);
  figuresec.appendChild(bodyPart);
};

const startGame = () => {
  createKeyboard();
  createWord();
  let buttons = document.querySelectorAll(".lettersquare");
  let squares = document.querySelectorAll(".square");
  let figureParts = document.querySelectorAll(".figure div");
  let wrongCount = 0;
  let correctCount = 0;
  figureParts.forEach((item) => {
    if (!item.getAttribute("data-value")) {
      item.remove();
    }
  });
  buttons.forEach((item) => {
    item.addEventListener("click", (e) => {
      let chosenLetter = e.target.textContent;
      if (randomWord.includes(chosenLetter)) {
        e.target.classList.add("correct");
        squares.forEach((item) => {
          if (item.getAttribute("data-value") === chosenLetter) {
            item.textContent = item.getAttribute("data-value");
            correctCount++;
          }
        });
        if (correctCount === randomWord.length) {
          buttons.forEach((item) => {
            item.classList.add("close");
          });
          squares.forEach((item) => {
            item.style.background = "green";
          });
        }
      } else {
        e.target.classList.add("wrong");
        wrongCount++;
        generateBody(wrongCount - 1);
        if (wrongCount === 6) {
          buttons.forEach((item) => {
            item.classList.add("close");
          });
          squares.forEach((item) => {
            item.textContent = item.getAttribute("data-value");
            item.style.background = "red";
          });
        }
      }
    });
  });
};

startGame();
