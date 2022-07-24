import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Friendlist() {
  const uname = localStorage.getItem("username");
  const [friends, setfriends] = useState([]);

  useEffect(() => {
    axios
      .post("/getFriend", { username: uname })
      .then((res) => {
        setfriends(res.data.friends);
      });
  }, [uname]);

  const mouserover = (e) => {
    e.target.style.backgroundColor = "#dbdbdb";
  };

  const mouseleave = (e) => {
    e.target.style.backgroundColor = "";
  };

  return (
    <>
      {friends.length === 0 ? (
        <div>No Friends.</div>
      ) : (
        <div>
          {friends.map((f, i) => {
            return (
              <Link to={`/dashboard/${f}`}>
              <button
                type="button"
                className="btn btn-white btn-sm border-bottom"
                onMouseOver={mouserover}
                onMouseLeave={mouseleave}
                style={{ width: "100%", textAlign: "left" }}
              >
                {f}
              </button>
              </Link>
            );
          })}
        </div>
        
      )}
    </>
  );
}
