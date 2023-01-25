async function signInWithEmail(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error){
    return false;
  }
  return true;
}

//привязаться к кнопке логин
document.getElementById("sign-in").addEventListener("click", async () => {
  //получить значение логина и пароля
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  //отправить запрос в супабейс, чтобы залогиниться
  const result = await signInWithEmail(login, password);

  //если результат false, то выводим ошибку, иначе переходим на страницу приложения
  if (result){
    location.href = "./question-list.html"
  }
  else {
    document.getElementById("errors").classList.remove("hidden");
  }
});
