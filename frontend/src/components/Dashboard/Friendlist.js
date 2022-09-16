import React, { useState, useEffect } from "react";
import { getFriendData } from "../../services/friend";
import { Link } from "react-router-dom";

export default function Friendlist() {
  const uname = localStorage.getItem("username");
  const [friends, setfriends] = useState([]);

  useEffect(() => {
    const getData = async ()=>{
     const res = await getFriendData(uname);
     res && setfriends(res.friends);
    }
    getData();
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
