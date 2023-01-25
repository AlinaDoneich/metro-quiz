// взять id из браузерной строки 
// сходить на сервер за данными по этой станции по id
// отрисовать данные с сервера

async function init() {
    const id = getId();
  
    if (!id) {
      return;
    }
  
    const { data } = await supabaseClient.from("stations").select().eq("id", id);
    const station = data[0];
    document.getElementById("station-name").innerText = station.name;
    document.getElementById("station-content").innerHTML = station.content;
  }
  
  init();