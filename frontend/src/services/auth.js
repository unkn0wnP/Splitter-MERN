const axios = require("axios");

export const authRegister = async (data, showAlert) => {
  if (
    data.firstname === "" ||
    data.lastname === "" ||
    data.username === "" ||
    data.email === "" ||
    data.pass === "" ||
    data.pass2 === ""
  ) {
    showAlert("Please fill all the details.", "danger");
  } else if (data.username.includes(" "))
    showAlert("Username shouldn't contain any space.", "danger");
  else if (!(data.email.includes("@") && data.email.includes(".com")))
    showAlert("Enter valid Email.", "danger");
  else if (data.pass !== data.pass2)
    showAlert("Confirm password must be same.", "danger");
  else {
    axios
      .post("/checkUser", { username: data.username })
      .then((res) => {
        if (res.data.result === 0) {
          axios
            .post("/checkUser", { email: data.email })
            .then((res1) => {
              if (res1.data.result === 0) {
                const udata = {
                  username: data.username,
                  lastname: data.lastname,
                  firstname: data.firstname,
                  email: data.email,
                  password: data.pass,
                };
                axios
                  .post("/addUser", udata)
                  .then((res) => {
                    localStorage.setItem("username", data.username);
                    axios
                      .post("/createFriendDoc", {
                        username: data.username,
                      })
                      .then((res) => {
                        window.location.href = "/dashboard";
                      });
                  });
              } else if (res1.data.result === -1)
                showAlert("Oops! Something went worng", "danger");
              else showAlert("Email is already in use.", "danger");
            });
        } else if (res.data.result === -1)
          showAlert("Oops! Something went worng", "danger");
        else showAlert("Username is already in use.", "danger");
      });
  }
  console.log("yes");
};

export const authLogin = async (data, showAlert) => {
  if (data.username === "" || data.pass === "")
    showAlert("Please fill all the details.", "danger");
  else {
    axios
      .post("/getPass", { username: data.username })
      .then((res1) => {
        if (res1.data === " error")
          showAlert("Oops! Something went worng", "danger");
        else if (res1.data === "No user found.")
          showAlert("User doesn't exist.", "danger");
        else {
          if (data.pass === res1.data) {
            localStorage.setItem("username", data.username);
            window.location.href = "/dashboard";
          } else showAlert("Incorrect password.", "danger");
        }
      });
  }
};