let index = -1;
let score = 0;
let needCheckAnswer = true;
let questions = selectRandomQuestions(allQuestions, 5);
const questionBox = document.getElementById("question-box");
const questionLines = document.getElementById("question-lines");

//Проверяет ответ и выводит кнопку Далее
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
  if (question.details) {
    const details = document.createElement("p");
    details.innerText = question.details;
    questionBox.appendChild(details);
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
    start();
  });
  //очистить бокс и написать туда сколько правильных и сколько всего вопросов
}
function start() {
  index = -1;
  score = 0;
  needCheckAnswer = true;
  questionLines.innerHTML = "";
  questions = selectRandomQuestions(allQuestions, 10);
  renderLines();
  next();
}
//Рисует вопрос
function renderQuestion(question) {
  questionBox.innerHTML = "";
  const header = document.createElement("h1");
  header.innerText = question.question;
  questionBox.appendChild(header);
  if (question.questionImage) {
    const img = document.createElement("img");
    img.src = question.questionImage;
    questionBox.appendChild(img);
    img.classList.add("question-image");
  }

  question.options.forEach((answer) => {
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
console.log(questions);
function selectRandomQuestions(items, count) {
  const shuffled = items.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
function renderLines() {
  const count = questions.length;
  //нарисовать столько линий, сколько у нас вопросов
  for (let i = 0; i < count; i++) {
    const line = document.createElement("div");
    questionLines.appendChild(line);
  }
}

start();
//получить тег, куда мы положим вопросы и ответы
//взять вопрос и создать хтмл элементы, исходя из вопросов и ответов
//привязать на нажатие кнопок код который будет проверять правильно или нет
