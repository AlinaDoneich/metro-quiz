async function loadStations() {
    // получение списка станций

    const { data } = await supabaseClient.from("stations").select();
  
    // получение элемента списка станций

    const stationList = document.querySelector(".station-list");
  
    // очистка элемента для списка станций

    stationList.innerHTML = "";
  
    data.forEach((station) => {
      const divElement = document.createElement("div");
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "❌";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        if (confirm("Вы уверены что хотите удалить станцию?")) {
          deleteStation(station.id);
        }
      });
  
      // создаем элемент ссылка
      const aElement = document.createElement("a");
  
      // как текст ссылки пишем саму станцию
      aElement.innerText = station.name;
  
      // делаем ссылку на станцию
      aElement.href = "./station.html?id=" + station.id;
  
      divElement.appendChild(aElement);
      divElement.appendChild(deleteButton);
  
      // добавляем ссылку в элемент для списка станций

      stationList.appendChild(divElement);
    });
  }
  
  async function deleteStation(id) {
    await supabaseClient.from("stations").delete().match({ id: id });
    loadStations();
  }
  
  loadStations();
  