const axios = require("axios");
const config = require("../Config/const")

const API_URL = config.URL

export const sendRequest = async (token, data) => {
  const fname = data.friend.trim();
  const uname = data.username.trim();
  if (fname === "") alert("Please enter the name.");
  else {
    axios
      .post(
        API_URL+"/getfriend",
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        const f = res.data.friends;
        const p = res.data.pending;
        if (f.indexOf(fname) !== -1)
          alert("Already friends with ".concat(fname).concat("."));
        else if (p.indexOf(fname) !== -1)
          alert(fname.concat(" has already sent you a friend request."));
        else {
          axios
            .post(
              API_URL+"/getuser",
              {
                username: fname,
              },
              {
                headers: { Authorization: "Bearer " + token },
              }
            )
            .then((res1) => {
              if (res1.data.result === 0)
                alert(
                  "User with name ".concat(fname).concat(" doesn't exist.")
                );
              else {
                axios
                  .post(
                    API_URL+"/getfriend",
                    { username: fname },
                    {
                      headers: { Authorization: "Bearer " + token },
                    }
                  )
                  .then((res2) => {
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
                        .post(
                          API_URL+"/sendfriendrequest",
                          {
                            friend: fname,
                            pending: p1,
                          },
                          {
                            headers: { Authorization: "Bearer " + token },
                          }
                        )
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

export const addFriend = async (token, uname, fname) => {
  axios
    .post(
      API_URL+"/getfriend",
      {},
      {
        headers: { Authorization: "Bearer " + token },
      }
    )
    .then((res) => {
      let f = res.data.friends;
      let p = res.data.pending;
      f.push(fname);
      p.pop(fname);
      axios
        .post(
          API_URL+"/updatefriend",
          {
            username: uname,
            friends: f,
            pending: p,
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((res1) => {
          if (res1.data === 1) {
            axios
              .post(
                API_URL+"/getfriend",
                { username: fname },
                {
                  headers: { Authorization: "Bearer " + token },
                }
              )
              .then((res2) => {
                let f1 = res2.data.friends;
                f1.push(uname);
                axios
                  .post(
                    API_URL+"/updatefriend",
                    {
                      username: fname,
                      friends: f1,
                    },
                    {
                      headers: { Authorization: "Bearer " + token },
                    }
                  )
                  .then((res3) => {
                    if (res3.data === 1) {
                      alert(
                        "You are now friend with ".concat(fname).concat(".")
                      );
                      window.location.reload();
                    } else alert("Oops! Something went worng.");
                  });
              });
          } else alert("Oops! Something went worng.");
        });
    });
};

export const getFriendData = async (token) => {
  const res = await axios.post(
    API_URL+"/getfriend",
    {},
    { headers: { Authorization: "Bearer " + token } }
  );

  return res.data;
};

export const isFriend = async (token, fname) => {
  const res = await axios.post(
    API_URL+"/getfriend",
    {},
    {
      headers: { Authorization: "Bearer " + token },
    }
  );

  const f = res.data.friends;
  if (f.indexOf(fname) === -1) window.location.href = "/error";
};
