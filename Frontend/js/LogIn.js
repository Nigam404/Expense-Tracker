async function login(event) {
  event.preventDefault();
  let obj = {
    mail: document.getElementById("mail").value,
    password: document.getElementById("password").value,
  };

  try {
    let info = await axios.post("http://localhost:3000/login", obj);
    if (info.status == 200) {
      const resDiv = document.getElementById("result");
      resDiv.innerText = info.data.message;
      alert(info.data.message);

      localStorage.setItem("Token", info.data.token); //saving token in local storage.
      location.replace("Home.html");
    }
  } catch (error) {
    //to catch error coming from backend.
    console.log(error);
    alert(error.response.data);
  }
}
