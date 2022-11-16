"use strict";
//Variables Globales
//Asignacion de botones HTML
const questionText = document.querySelector("#questionText");
const firstAnswer = document.querySelector("#first");
const secondAnswer = document.querySelector("#second");
const thirdAnswer = document.querySelector("#third");
const fourthAnswer = document.querySelector("#fourth");
const answerDiv = document.querySelector("#questions");
const finalDiv = document.querySelector(".gamePrincipal");
const main = document.querySelector("main");
const count = document.querySelector("#count");
const startButton = document.querySelector("#startButton");
let actualQuestion = 0;
let score = 0;

//Funciones
const JSON = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();

    if (response) {
      return data;
    }
  } catch (error) {
    console.log("Hay error");
    console.log(error.message);
  }
};

const randomNumber = (range, outputCount) => {
  let newArray = [];
  for (let i = 0; i <= range; i++) {
    newArray.push(i);
  }
  let result = [];

  for (let i = 1; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (range - i));
    result.push(newArray[random]);
    newArray[random] = newArray[range - i];
  }
  return result;
};

const renderQuestion = async (question) => {
  if (actualQuestion === 10) {
    renderFinal();
    return 0;
  }

  let readQuestion = actualQuestion;
  let a = await JSON("./js/quiz.json");
  //Impresion de preguntas y respuestas
  //Asignacion de textos desde el JSON
  count.innerHTML = `Score: ${score} `;
  questionText.innerHTML =
    "<h2 id='questionText'>" + a[question[readQuestion]].question + "</h2>";
  firstAnswer.innerHTML = a[question[readQuestion]].answers[0];
  secondAnswer.innerHTML = a[question[readQuestion]].answers[1];
  thirdAnswer.innerHTML = a[question[readQuestion]].answers[2];
  fourthAnswer.innerHTML = a[question[readQuestion]].answers[3];
};

const checkAnswer = async (userAnswer, question) => {
  let readQuestion = actualQuestion;
  let b = await JSON("./js/quiz.json");
  if (userAnswer === b[question[readQuestion]].correct) {
    return true;
  } else {
    return false;
  }
};

const renderFinal = () => {
  playAudio("./sounds/win.mp3");
  addReplay();
  main.classList.toggle("mainScaleAni");
  setTimeout(() => {
    question.innerHTML = `<h2 class='questionText'>Final Score: ${score} /10</h2>`;
  }, 500);
  finalDiv.classList.toggle("gamePrincipal");
  finalDiv.classList.toggle("finalVisual");
  count.remove();
  firstAnswer.remove();
  secondAnswer.remove();
  thirdAnswer.remove();
  fourthAnswer.remove();
  answerDiv.remove();
};

const addReplay = async () => {
  const replayButton = document.createElement("button");
  replayButton.classList.toggle("replayButton");
  replayButton.innerHTML = "<a class='replay' href='index.html'>Replay</>";
  document.querySelector(".gamePrincipal").append(replayButton);

  //ADD SHARE BUTTON
  const shareButton = document.createElement("button");
  shareButton.classList.toggle("replayButton");
  shareButton.innerHTML = `<a class='replay' href='whatsapp://send?text=Hey! I got a ${score}/10 points on CinemaQuiz! Try to beat me on https://cinemaquiz.netlify.app/!' data-action="share/whatsapp/share"  
  target="_blank">Share with your friends</>`;
  document.querySelector(".gamePrincipal").append(shareButton);

  const shareData = {
    title: "Cinema QUIZ",
    text: `Hey! I got a ${score}/10 points on CinemaQuiz! Try to beat me`,
    url: "https://cinemaquiz.netlify.app/",
  };
  shareButton.addEventListener("click", async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {}
  });
};

//Sounds

function playAudio(url) {
  new Audio(url).play();
}

const game = () => {
  playAudio("./sounds/start.mp3");
  let newQuestions = randomNumber(50, 10);
  renderQuestion(newQuestions);
  //PRIMERA RESPUESTA
  firstAnswer.addEventListener("click", async (e) => {
    const button = e.target.innerText;
    const check = await checkAnswer(button, newQuestions);
    if (check === true) {
      firstAnswer.classList.toggle("correct");
      playAudio("./sounds/correct.mp3");
      score++;
      actualQuestion++;
      setTimeout(() => {
        renderQuestion(newQuestions);
      }, 300);
    } else {
      firstAnswer.classList.toggle("fail");
      playAudio("./sounds/fail.mp3");
      actualQuestion++;
      setTimeout(() => {
        renderQuestion(newQuestions);
      }, 300);
    }
    setTimeout(() => {
      firstAnswer.classList.remove("correct");
      firstAnswer.classList.remove("fail");
    }, 300);
  });

  //SEGUNDA RESPUESTA
  secondAnswer.addEventListener("click", async (e) => {
    const button = e.target.innerText;
    const check = await checkAnswer(button, newQuestions);
    if (check === true) {
      secondAnswer.classList.toggle("correct");
      playAudio("./sounds/correct.mp3");
      score++;
      actualQuestion++;
      setTimeout(() => {
        renderQuestion(newQuestions);
      }, 300);
    } else {
      secondAnswer.classList.toggle("fail");
      playAudio("./sounds/fail.mp3");
      actualQuestion++;
      setTimeout(() => {
        renderQuestion(newQuestions);
      }, 300);
    }
    setTimeout(() => {
      secondAnswer.classList.remove("correct");
      secondAnswer.classList.remove("fail");
    }, 300);
  });

  //TERCERA RESPUESTA
  thirdAnswer.addEventListener("click", async (e) => {
    const button = e.target.innerText;
    const check = await checkAnswer(button, newQuestions);
    if (check === true) {
      thirdAnswer.classList.toggle("correct");
      playAudio("./sounds/correct.mp3");
      score++;
      actualQuestion++;
      setTimeout(() => {
        renderQuestion(newQuestions);
      }, 300);
    } else {
      thirdAnswer.classList.toggle("fail");
      playAudio("./sounds/fail.mp3");
      actualQuestion++;
      setTimeout(() => {
        renderQuestion(newQuestions);
      }, 300);
    }
    setTimeout(() => {
      thirdAnswer.classList.remove("correct");
      thirdAnswer.classList.remove("fail");
    }, 300);
  });

  //CUARTA RESPUESTA
  fourthAnswer.addEventListener("click", async (e) => {
    const button = e.target.innerText;
    const check = await checkAnswer(button, newQuestions);
    if (check === true) {
      fourthAnswer.classList.toggle("correct");
      playAudio("./sounds/correct.mp3");
      score++;
      actualQuestion++;
      setTimeout(() => {
        renderQuestion(newQuestions);
      }, 300);
    } else {
      fourthAnswer.classList.toggle("fail");
      playAudio("./sounds/fail.mp3");
      actualQuestion++;
      setTimeout(() => {
        renderQuestion(newQuestions);
      }, 300);
    }
    setTimeout(() => {
      fourthAnswer.classList.remove("correct");
      fourthAnswer.classList.remove("fail");
    }, 300);
  });
};

game();
