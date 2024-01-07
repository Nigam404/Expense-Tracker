const addbtn = document.getElementById("add");
addbtn.addEventListener("click", addExpense);
//create element function................................................................................
async function createElement(obj) {
  let ULlist = document.getElementById("datalist");
  //Creating list item for newly added data.
  let newLi = document.createElement("li");
  newLi.innerText = obj.amount + " " + obj.description + " " + obj.catagory;
  newLi.className = "list-group-item";

  //Edit button.
  let editbtn = document.createElement("button");
  editbtn.className = "btn btn-warning btn-sm float-right edit";
  editbtn.innerText = "Edit";
  editbtn.onclick = async () => {
    //Putting wrongly submitted value in the field.
    document.getElementById("amount").value = obj.amount;
    document.getElementById("desc").value = obj.description;
    document.getElementById("catagory").value = obj.catagory;

    await axios.delete(`http://localhost:3000/deleteExp/${obj.id}`);
    alert("edit and submit again");
    ULlist.removeChild(newLi);
    //After correcting user has to click add expense btn.
  };

  //Delete button
  let deletebtn = document.createElement("button");
  deletebtn.className = "btn btn-danger btn-sm float-right delete";
  deletebtn.appendChild(document.createTextNode("delete"));
  deletebtn.onclick = async () => {
    await axios.delete(`http://localhost:3000/deleteExp/${obj.id}`);
    ULlist.removeChild(newLi);
    location.reload();
  };

  //Adding  buttons to new list
  newLi.appendChild(deletebtn);
  newLi.appendChild(editbtn);

  //Appending list to UI
  ULlist.appendChild(newLi);
}

//DRIVER FUNCTION..........................................................................................
async function addExpense() {
  let obj = {
    amount: document.getElementById("amount").value,
    description: document.getElementById("desc").value,
    catagory: document.getElementById("catagory").value,
  };
  console.log(obj);

  // Storing in DB.
  const insertedObj = await axios.post("http://localhost:3000/postExp", obj);

  await createElement(insertedObj);
  location.reload(); //this will reload the current page using DOM.
}

//Below code will execute always when dom get reloaded....................................................
axios
  .get("http://localhost:3000/getExp")
  .then((res) => {
    res.data.forEach((e) => {
      createElement(e);
    });
  })
  .catch((err) => console.log(err));
