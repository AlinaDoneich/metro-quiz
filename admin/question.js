//привязаться к кнопке сохранить
//подобрать все данные из формы
//вывести данне и отправить

//получить ссылку на кнопку
const saveButton = document.querySelector(".save-button");

// сохраняем ссылку на выбор файла
const fileElement = document.querySelector("#file");

//привязать функцию к кнопке
saveButton.addEventListener("click", () => {
  saveStation();
});

//привязать выбора файла к функции
fileElement.addEventListener("change", async () => {
  const file = fileElement.files[0];
  if (file) {
    const file64 = await base64(file);
    insertImg(file64, () => {
      clearFiles(fileElement);
    });
  }
});

function clearFiles(fileElement) {
  fileElement.value = "";
}

async function init() {
  const id = getId();

  if (!id) {
    return;
  }

  const { data } = await supabaseClient.from("questions").select().eq("id", id);
  const question = data[0];

  document.querySelector("#question").value = question.question;
  document.querySelector("#answers").value = question.answers.join("\n");
  document.querySelector("#answer").value = question.answer;
  document.querySelector("#answerDescription").value =
    question.answer_description;
  if (question.imgURL) {
    insertImg(question.imgURL);
  }
}

init();

function insertImg(imgURL, onDelete) {
  const divForImage = document.getElementById("for-image");
  divForImage.innerHTML = "";
  const imgElement = document.createElement("img");
  imgElement.src = imgURL;
  divForImage.appendChild(imgElement);
  const buttonDelete = document.createElement("button");
  buttonDelete.textContent = "Удалить";
  buttonDelete.addEventListener("click", () => {
    divForImage.innerHTML = "";
    onDelete();
  });
  divForImage.appendChild(buttonDelete);
}

//функция добавления нового вопроса
async function saveStation() {
  const questionElement = document.querySelector("#question"); //получаем сслыку на хтмлЭлемент

  //получим ссылку на варианты ответов
  const answers = document.querySelector("#answers");
  const answersValue = answers.value.split("\n").filter((item) => {
    return item.trim() !== "";
  });

  const answer = document.querySelector("#answer");
  console.log(answer.value);

  const answerDescription = document.querySelector("#answerDescription");
  console.log(answerDescription.value);
  const file = fileElement.files[0];
  let file64;
  if (file) {
    file64 = await base64(file);
  }

  const id = getId();
  if (id) {
    update(
      id,
      questionElement.value,
      answer.value,
      answersValue,
      answerDescription.value,
      file64
    );
  } else {
    insert(
      questionElement.value,
      answer.value,
      answersValue,
      answerDescription.value,
      file64
    );
  }
}

//Функция вставки вопроса в базу
async function insert(question, answer, answers, answerDescription, file) {
  const result = await supabaseClient
    .from("questions")
    .insert({
      question: question,
      answer: answer,
      imgURL: file,
      answers: answers,
      answer_description: answerDescription,
    })
    .select();
  const newId = result.data[0].id;
  location.href = "question.html?id=" + newId;
}

//Функция обновления вопроса в базе
async function update(id, question, answer, answers, answerDescription, file) {
  const result = await supabaseClient
    .from("questions")
    .update({
      question: question,
      answer: answer,
      imgURL: file,
      answers: answers,
      answer_description: answerDescription,
    })
    .eq("id", Number(id));
  location.reload();
}
