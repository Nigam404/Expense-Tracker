let Submit = document.getElementById("submit");
Submit.addEventListener("click", signup);
//Driver function
async function signup() {
  let signupObj = {
    name: document.getElementById("name").value,
    mail: document.getElementById("mail").value,
    password: document.getElementById("password").value,
  };
  let response = await axios.post("http://localhost:3000/signup", signupObj);
  console.log("Data->", response);
  if (response.status == 201) {
    let resDiv = document.getElementById("result");
    resDiv.innerText = "User created successfully";
  } else {
    let resDiv = document.getElementById("result");
    resDiv.innerText = response.data.remark;
  }
}
