document.getElementById("auto-import").addEventListener("click", () => {
  autoImport();
});

async function autoImport() {
  window.QUESTIONS.forEach(async (data) => {
    await supabaseClient
      .from("questions")
      .insert(data)
      .select();
  });
}
