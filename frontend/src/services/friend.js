const axios = require("axios");

export const sendR = async (data) => {
  const fname = data.fname.trim();
  const uname = data.username.trim();
  if (fname === "") alert("Please enter the name.");
  else {
    axios.post("/getFriend", { username: uname }).then((res) => {
      const f = res.data.friends;
      const p = res.data.pending;
      if (f.indexOf(fname) !== -1)
        alert("Already friends with ".concat(fname).concat("."));
      else if (p.indexOf(fname) !== -1)
        alert(fname.concat(" has already sent you a friend request."));
      else {
        axios
          .post("/checkUser", {
            username: fname,
          })
          .then((res1) => {
            if (res1.data.result === 0)
              alert("User with name ".concat(fname).concat(" doesn't exist."));
            else {
              axios.post("/getFriend", { username: fname }).then((res2) => {
                let p1 = res2.data.pending;
                if (p1.indexOf(uname) !== -1)
                  alert(
                    "You have already sent a friend request to "
                      .concat(fname)
                      .concat(".")
                  );
                else {
                  p1.push(uname);
                  axios
                    .post("/sendReq", {
                      fname: fname,
                      pending: p1,
                    })
                    .then((res4) => {
                      if (res4.data === 1) {
                        alert("Friend request sent.");
                        window.location.reload();
                      } else alert("Oops! Something went worng.");
                    });
                }
              });
            }
          });
      }
    });
  }
};

export const addF = async (uname, fname) => {
  axios.post("/getFriend", { username: uname }).then((res) => {
    let f = res.data.friends;
    let p = res.data.pending;
    f.push(fname);
    p.pop(fname);
    axios
      .post("/updateFriend", {
        username: uname,
        friends: f,
        pending: p,
      })
      .then((res1) => {
        if (res1.data === 1) {
          axios.post("/getFriend", { username: fname }).then((res2) => {
            let f1 = res2.data.friends;
            f1.push(uname);
            axios
              .post("/updateFriend", {
                username: fname,
                friends: f1,
              })
              .then((res3) => {
                if (res3.data === 1) {
                  window.location.reload();
                } else alert("Oops! Something went worng.here");
              });
          });
        } else alert("Oops! Something went worng.");
      });
  });
};

export const getFriendData = async (username) => {
  const res = await axios.post("/getFriend", {
    username: username,
  });
  
  return res.data;
};
