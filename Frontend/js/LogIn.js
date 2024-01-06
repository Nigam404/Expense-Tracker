async function login(event) {
  event.preventDefault();
  let obj = {
    mail: document.getElementById("mail").value,
    password: document.getElementById("password").value,
  };

  let response = await axios.post("http://localhost:3000/login", obj);
  alert(response.data.message);
  const resDiv = document.getElementById("result");
  resDiv.innerText = response.data.message;
}
