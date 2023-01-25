window.supabaseClient = supabase.createClient(
  "https://xpiqfhtukilzmikbavju.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaXFmaHR1a2lsem1pa2Jhdmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAxNTcyNzIsImV4cCI6MTk4NTczMzI3Mn0.93XK9pbaY6_xH_NVkWnz9H4Rw1MzbB8L6JntBTpNd7I"
);

//функция преобразования файла в строку, чтобы хранить в базе
window.base64 = async function base64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

window.getId = function getId() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params.id;
}