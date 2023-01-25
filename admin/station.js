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
    insertImg(file64);
  }
});

async function init() {
  const id = getId();

  if (!id) {
    return;
  }


  new QRCode(document.getElementById("qr-code"), "https://alinadoneich.github.io/metro-quiz/station?id=" + id);

  const { data } = await supabaseClient.from("stations").select().eq("id", id);
  const station = data[0];

  document.querySelector("#name").value = station.name;
  document.querySelector("#content").value = station.content;
}

init();

function insertImg(imgURL) {
  const divForImage = document.getElementById("for-image");
  const imgElement = document.createElement("img");
  imgElement.src = imgURL;
  divForImage.appendChild(imgElement);
}

//функция добавления нового вопроса
async function saveStation() {
  const nameElement = document.querySelector("#name"); //получаем сслыку на хтмлЭлемент

  //получим ссылку на варианты ответов
  const content = document.querySelector("#content");

  const id = getId();
  if (id) {
    update(id, nameElement.value, content.value);
  } else {
    insert(nameElement.value, content.value);
  }
}

//Функция вставки вопроса в базу
async function insert(name, content) {
  const result = await supabaseClient
    .from("stations")
    .insert({
      name: name,
      content: content,
    })
    .select();
  const newId = result.data[0].id;
  location.href = "station.html?id=" + newId;
}

//Функция обновления вопроса в базе
async function update(id, name, content) {
  const result = await supabaseClient
    .from("stations")
    .update({
        name: name,
        content: content,
    })
    .eq("id", Number(id));
  location.reload();
}


