async function loadStations() {
  // получение списка вопросов
  const { data } = await supabaseClient.from("questions").select();

  // получение элемента списка вопросов
  const questionList = document.querySelector(".question-list");

  // очистка элемента для списка вопросов
  questionList.innerHTML = "";

  data.forEach((question) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      if (confirm("Вы уверены что хотите удалить вопрос?")) {
        deleteStation(question.id);
      }
    });

    // создаем элемент ссылка
    const aElement = document.createElement("a");

    // как текст ссылки пишем сам вопрос
    aElement.innerText = question.question;

    // делаем ссылку на вопрос
    aElement.href = "./question.html?id=" + question.id;

    tr.appendChild(td1);
    tr.appendChild(td2);
    td1.appendChild(aElement);
    td2.appendChild(deleteButton);

    // добавляем ссылку в элемент для списка вопросов
    questionList.appendChild(tr);
  });
}

async function deleteStation(id) {
  await supabaseClient.from("questions").delete().match({ id: id });
  loadStations();
}

loadStations();
