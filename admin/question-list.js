const client = supabase.createClient(
  "https://xpiqfhtukilzmikbavju.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwaXFmaHR1a2lsem1pa2Jhdmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAxNTcyNzIsImV4cCI6MTk4NTczMzI3Mn0.93XK9pbaY6_xH_NVkWnz9H4Rw1MzbB8L6JntBTpNd7I"
);

async function loadData() {
  const { data, error } = await client.from("questions").select();
  console.log(data);

  const questionList = document.querySelector(".question-list");
  questionList.innerHTML = "";

  data.forEach((question) => {
    const aElement = document.createElement("a");
    aElement.innerText = question.question;
    aElement.href="./question.html?id="+question.id
    questionList.appendChild(aElement);
  });
}
loadData();
