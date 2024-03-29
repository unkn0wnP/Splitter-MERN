const axios = require("axios");
const config = require("../Config/const")

const API_URL = config.URL

const dformate = (date) => {
  let d = new Date();
  if (date !== "") d = new Date(date);

  let month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  let ans = [year, month, day].join("-");
  return ans;
};

//Status : "normal"
//Positive amount : User lent that amount to the friend.
//Negative amount : User owe that amount to the friend.
export const addExp = async (token, data) => {
  const uname = data.username;
  const fname = data.fname.trim();
  const amount = data.amount;
  const option = data.option;
  const discription = data.discription.trim();
  const date = data.date;

  if (fname === "" || discription === "" || date === "")
    alert("Please fill all the details.");
  else if (amount <= 0) alert("Amount must be greater than 0.");
  else if (dformate(date) > dformate("")) alert("Invalid date.");
  else {
    
    const res = await axios
      .post(API_URL+"/getfriend",{}, {
        headers: { Authorization: "Bearer " + token },
      })
      
        const f = res.data.friends;
        if (f.indexOf(fname) === -1)
          alert(
            "You don't have any friend with name ".concat(fname).concat(".")
          );
        else {
          
          const tDate = new Date();
          const tID = uname.concat(fname).concat(tDate);
          
          //Option 1 : Paid by you and Split equaly.
          if (option === "Paid by you and Split equaly.") {
            let record = {
              username: uname,
              friend: fname,
              amount: amount / 2,
              date: date,
              discription: discription,
              status: "normal",
              tID: tID,
              tDate: tDate,
            };
            axios.post(API_URL+"/addexpense", record, {
              headers: { Authorization: "Bearer " + token },
            });
            record = {
              username: fname,
              friend: uname,
              amount: -amount / 2,
              date: date,
              discription: discription,
              status: "normal",
              tID: tID,
              tDate: tDate,
            };
            axios
              .post(API_URL+"/addexpense", record, {
                headers: { Authorization: "Bearer " + token },
              })
              .then((res1) => {
                alert("Expense added.");
                window.location.reload();
              });
          }
          //Option 2 :  You owe the full amount.
          else if (option === "You owe the full amount.") {
            let record = {
              username: uname,
              friend: fname,
              amount: -amount,
              date: date,
              discription: discription,
              status: "normal",
              tID: tID,
              tDate: tDate,
            };
            axios.post(API_URL+"/addexpense", record, {
              headers: { Authorization: "Bearer " + token },
            });
            record = {
              username: fname,
              friend: uname,
              amount: amount,
              date: date,
              discription: discription,
              status: "normal",
              tID: tID,
              tDate: tDate,
            };
            axios
              .post(API_URL+"/addexpense", record, {
                headers: { Authorization: "Bearer " + token },
              })
              .then((res) => {
                alert("Expense added.");
                window.location.reload();
              });
          }
          //Option 3 : Paid by them and Split equaly.
          else if (option === "Paid by them and Split equaly.") {
            let record = {
              username: uname,
              friend: fname,
              amount: -amount / 2,
              date: date,
              discription: discription,
              status: "normal",
              tID: tID,
              tDate: tDate,
            };
            axios.post(API_URL+"/addexpense", record, {
              headers: { Authorization: "Bearer " + token },
            });
            record = {
              username: fname,
              friend: uname,
              amount: amount / 2,
              date: date,
              discription: discription,
              status: "normal",
              tID: tID,
              tDate: tDate,
            };
            axios
              .post(API_URL+"/addexpense", record, {
                headers: { Authorization: "Bearer " + token },
              })
              .then((res) => {
                alert("Expense added.");
                window.location.reload();
              });
          }
          //Option 4 : They owe the full amount.
          else {
            let record = {
              username: uname,
              friend: fname,
              amount: amount,
              date: date,
              discription: discription,
              status: "normal",
              tID: tID,
              tDate: tDate,
            };
            axios.post(API_URL+"/addexpense", record, {
              headers: { Authorization: "Bearer " + token },
            });
            record = {
              username: fname,
              friend: uname,
              amount: -amount,
              date: date,
              discription: discription,
              status: "normal",
              tID: tID,
              tDate: tDate,
            };
            axios
              .post(API_URL+"/addexpense", record, {
                headers: { Authorization: "Bearer " + token },
              })
              .then((res) => {
                alert("Expense added.");
                window.location.reload();
              });
          }
        }
      
  }
};



export const getExpTotal = async (token,data) => {
  let total = 0;
  if (data.friend === "") {
    alert("Please fill all the details.");
    total = -1;
  } else {
    const res = await axios.post(API_URL+"/getsummary", data,{
      headers: { Authorization: "Bearer " + token },
    });

    if (res.data.length === 0) {
      await axios
        .post(API_URL+"/getfriend", {
          headers: { Authorization: "Bearer " + token },
        },{})
        .then((res) => {
          const f = res.data.friends;
          if (f.indexOf(data.friend) === -1) {
            alert(
              "You don't have any friend with name "
                .concat(data.friend)
                .concat(".")
            );
            total = -1;
          } else {
            total = 0;
          }
        });
    } else total = res.data[0].total;
  }
  return total;
};

//Status : "Settlement"
//Negative amount : User got that amount from friend as settlement.
//Positive amount : User paid that amount to the friend as settlement;
export const settleExp = async (token,data, amount) => {
  const uname = data.username;
  const fname = data.friend;
  const tDate = new Date();
  const tID = uname.concat(fname).concat(tDate);
  const date = dformate(tDate);

  let record = {
    username: uname,
    friend: fname,
    amount: -amount,
    date: date,
    discription: "Settlement",
    status: "Settlement",
    tID: tID,
    tDate: tDate,
  };
  await axios.post(API_URL+"/addexpense", record,{
    headers: { Authorization: "Bearer " + token },
  });

  record = {
    username: fname,
    friend: uname,
    amount: amount,
    date: date,
    discription: "Settlement",
    status: "Settlement",
    tID: tID,
    tDate: tDate,
  };
  await axios.post(API_URL+"/addexpense", record,{
    headers: { Authorization: "Bearer " + token },
  }).then((res) => {
    if (res.data === 1) {
      alert("Settled up with ".concat(fname).concat("."));
      window.location.reload();
    }
  });
};

export const getSummaryFriend = async (token,data) => {
  const res = await axios.post(API_URL+"/getsummary", data,{
    headers: { Authorization: "Bearer " + token },
  });
  let lent = [];
  let owe = [];
  res.data.map((e) => {
    if (e.total < 0) owe.push(e);
    else if (e.total > 0) lent.push(e);
  });
  return { owe: owe, lent: lent };
};

export const getSummary = async (token,data) => {
  let owe = 0;
  let lent = 0;
  let d = await axios.post(API_URL+"/getsummary", data,{
    headers: { Authorization: "Bearer " + token },
  });
  d.data.map((e) => {
    if (e.total < 0) owe += e.total;
    else lent += e.total;
  });
  return { owe: owe, lent: lent };
};

export const deleteExp = async (token,data) => {
  const res = await axios.post(API_URL+"/deleteexp", data,{
    headers: { Authorization: "Bearer " + token },
  });
  if (res.data === "Deleted") {
    alert("Expense deleted successfully.");
    window.location.reload();
  } else alert("Oops! Something went worng.");
};

export const getExp = async (token,data) => {
  const res = await axios.post(API_URL+"/getexpense", data,{
    headers: { Authorization: "Bearer " + token },
  });
  return res.data.data;
};