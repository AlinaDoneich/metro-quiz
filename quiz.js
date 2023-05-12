let index = -1;
let score = 0;
let needCheckAnswer = true;
let questions = [];
const questionBox = document.getElementById("question-box");
const questionLines = document.getElementById("question-lines");

//Проверяет ответ и выводит кнопку Далее
/**
 * @param {string} answer
 * @param {{ question: string; answer: string; answers: string[]; answer_description: string; imgURL: string }} question
 * @param {HTMLElement} buttonElement
 * @returns
 */
function checkAnswer(answer, question, buttonElement) {
  if (needCheckAnswer === false) {
    return;
  }
  if (answer === question.answer) {
    console.log("Правильно");
    buttonElement.classList.add("right");
    //покрасить кнопку в зеленый
    score += 1;
  } else {
    buttonElement.classList.add("wrong");
    const rightAnswerElement = document.querySelector(".r");
    rightAnswerElement.classList.add("right");
  }
  needCheckAnswer = false;
  //Если есть развернутый ответ, добавим его в бокс вначало
  if (question.answer_description) {
    const detailsElement = document.createElement("p");
    detailsElement.innerText = question.answer_description;
    questionBox.appendChild(detailsElement);
  }
  addNextButton();
  // next();
}
//Делает кнопку Далее
function addNextButton() {
  const nextButton = document.createElement("button");
  nextButton.innerText = "Далее";
  nextButton.classList.add("next");
  questionBox.appendChild(nextButton);
  nextButton.addEventListener("click", () => {
    next();
  });
}
//Следующий вопрос
function next() {
  if (index + 1 >= questions.length) {
    renderEnd();
    console.log("Конец");
    return;
  }
  needCheckAnswer = true;
  index += 1;
  renderQuestion(questions[index]);
  activeLine(index);
}
function activeLine(index) {
  const divs = questionLines.querySelectorAll("div");
  divs[index].classList.add("active");
}

//Рисует результат
function renderEnd() {
  questionBox.innerHTML = "";
  const header = document.createElement("h1");
  header.innerText =
    "Вы ответили на " + score + " из " + questions.length + " вопросов";
  questionBox.appendChild(header);
  const resetButton = document.createElement("button");
  resetButton.innerText = "Пройти заново";
  questionBox.appendChild(resetButton);
  resetButton.addEventListener("click", () => {
    location.reload();
  });
  //очистить бокс и написать туда сколько правильных и сколько всего вопросов
}
async function start() {
  index = -1;
  score = 0;
  needCheckAnswer = true;
  questionLines.innerHTML = "";
  questions = await getQuestions();
  renderLines();
  next();
}
//Рисует вопрос

/**
 * @param {{ question: string; answer: string; answers: string[]; answer_description: string; imgURL: string }} question
 */
function renderQuestion(question) {
  questionBox.innerHTML = "";
  const header = document.createElement("h1");
  header.innerText = question.question;
  questionBox.appendChild(header);
  if (question.imgURL) {
    const img = document.createElement("img");
    img.src = question.imgURL;
    questionBox.appendChild(img);
    img.classList.add("question-image");
  }

  question.answers.forEach((answer) => {
    const buttonElement = document.createElement("button");
    buttonElement.innerText = answer;
    questionBox.appendChild(buttonElement);
    buttonElement.addEventListener("click", () => {
      checkAnswer(answer, question, buttonElement);
    });
    if (answer === question.answer) {
      buttonElement.classList.add("r");
    }
  });
}

function renderLines() {
  const count = questions.length;
  //нарисовать столько линий, сколько у нас вопросов
  for (let i = 0; i < count; i++) {
    const line = document.createElement("div");
    questionLines.appendChild(line);
  }
}

async function getQuestions() {
  //загрузить из бд вопросы
  const { data } = await supabaseClient.from("random_questions").select().limit(10);
  return data;
}

start();
