const axios = require("axios");

export const getCurrentDetails = async (uname) => {
  const res = await axios.post("/getInfo", {
    username: uname,
  });
  return res.data;
};

export const updateDetail = async (username, data) => {
  if (data.firstname === "" || data.lastname === "")
    alert("Please fill all the details.");
  else {
    const res = await axios.post("/updateUser", {
      username: username,
      firstname: data.firstname,
      lastname: data.lastname,
    });
    if (res.data === -1) alert("Oops! Something went worng.");
    else {
      alert("Details updated.");
      window.location.reload();
    }
  }
};

export const updatePass = async (username, data) => {
  if (data.oldpass === "" || data.newpass === "" || data.cpass === "")
    alert("Please fill all the details.");
  else {
    axios
      .post("/getInfo", { username: username })
      .then((res) => {
        if (res.data === "error") alert("Oops! Something went worng.");
        else if (data.oldpass !== res.data.password)
          alert("Incorrect current password.");
        else if (data.oldpass === data.newpass)
          alert("New password can't be same as old password.");
        else if (data.newpass !== data.cpass)
          alert("Confirm password must be same.");
        else {
          const res = axios.post("/updateUser", {
            username: username,
            password: data.newpass,
          });
          if (res.data === -1) alert("Oops! Something went worng.");
          else {
            alert("Password updated.");
            localStorage.removeItem("username");
            window.location.href = "/login";
          }
        }
      });
  }
};
