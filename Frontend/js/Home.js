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
  const token = localStorage.getItem("Token"); //getting token from LS.
  let obj = {
    amount: document.getElementById("amount").value,
    description: document.getElementById("desc").value,
    catagory: document.getElementById("catagory").value,
  };
  console.log(obj);

  // Storing in DB.
  const insertedObj = await axios.post("http://localhost:3000/postExp", obj, {
    headers: { Authorization: token },
  });

  //updating total expense
  await axios.post("http://localhost:3000/update-total-expense", obj, {
    headers: { Authorization: token },
  });

  await createElement(insertedObj);
  location.reload(); //this will reload the current page using DOM.
}

//Below code will execute always when dom get reloaded....................................................
window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("Token"); //getting token from LS.
  const res = await axios.get("http://localhost:3000/getExp", {
    headers: { Authorization: token },
  });

  //creating UI element for each expense found for logged in user.
  if (res.data.length > 0) {
    res.data.forEach(async (e) => {
      await createElement(e);
    });
  }

  //checking if the user is a premium member or not.
  const id = res.data[0].userId;
  const user = await axios.get(`http://localhost:3000/getuser/${id}`);
  //hiding buy premium button if the user is already a premium user.
  if (user.data.ispremiumuser === true) {
    //hiding buy premium button and showing user about premium member.
    document.getElementById("rzp-btn").style.visibility = "hidden";
    document.getElementById("premiumMember").innerText =
      "Congrats,You're a premium user.";
  }

  //putting user_name on UI.
  document.getElementById("user-name").innerText = "Welcome " + user.data.name;
});

//Buy-premium button click event.........................................................................
document.getElementById("rzp-btn").onclick = async () => {
  const token = localStorage.getItem("Token");
  const response = await axios.get(
    "http://localhost:3000/purchase/premiummembership",

    { headers: { Authorization: token } }
  );
  console.log("-->premium-->", response);

  var options = {
    key: response.data.key_id, //from this razoypay will know which company is requesting payment.
    order_id: response.data.order.id, //for one time payment
    //this handler will handle the success payment.
    handler: async () => {
      await axios.post(
        "http://localhost:3000/purchase/update-transaction-status-success",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );
      alert("You're a premium user now");
      //hiding buy premium button and showing user about premium member.
      document.getElementById("rzp-btn").style.visibility = "hidden";
      document.getElementById("premiumMember").innerText =
        "Congrats,You're a premium user.";
    },
  };
  const rz_pay = new Razorpay(options); //included using script src.
  rz_pay.open();
  rz_pay.on("payment.failed", async () => {
    let orderObj = { order_id: response.data.order.id };
    await axios.post(
      "http://localhost:3000/purchase/update-transaction-status-failed",
      orderObj,
      { headers: { Authorization: token } }
    );
    alert("Payment Failed");
  });
};

//show leaderboard button click event...................................................................
document.getElementById("leaderboard-btn").onclick = async () => {
  const parent_div = document.getElementById("leaderboard-data");
  const h2 = document.createElement("h2");
  h2.innerText = "LEADERBOARD";
  let UL = document.createElement("ul");
  UL.className = "list-group";

  const userWithTotalExpenses = await axios.get(
    "http://localhost:3000/premium/leaderboard-data"
  );

  userWithTotalExpenses.data.forEach((detail) => {
    let list = document.createElement("li");
    list.className = "list-group-item";
    list.innerText = detail.name + "-->" + detail.totalexpense;
    UL.appendChild(list);
  });
  parent_div.appendChild(UL);
};
