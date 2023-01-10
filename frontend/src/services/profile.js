const axios = require("axios");
const config = require("../Config/const");

const API_URL = config.URL;

export const getProfile = async (token) => {
  const res = await axios.get(API_URL + "/profile", {
    headers: { Authorization: "Bearer " + token },
  });
  return res.data;
};

export const updateProfile = async (token, data) => {
  if (data.firstname === "" || data.lastname === "")
    alert("Please fill all the details.");
  else {
    const res = await axios.post(API_URL + "/updateuser", data, {
      headers: { Authorization: "Bearer " + token },
    });
    if (res.data === -1) alert("Oops! Something went worng.");
    else {
      alert("Details updated.");
      window.location.reload();
    }
  }
};

export const updatePass = async (token, data) => {
  if (data.oldpass === "" || data.newpass === "" || data.cpass === "")
    alert("Please fill all the details.");
  else if (data.oldpass === data.newpass)
    alert("New password can't be same as old password.");
  else if (data.newpass !== data.cpass) alert("Confirm password must be same.");
  else {
    await axios
      .post(
        API_URL + "/updatepassword",
        { password: data.oldpass, newpassword: data.newpass },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((res) => {
        alert(res.data);
        localStorage.removeItem("splitterToken");
        window.location.href = "/login";
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }
};
