import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ExpenseListFriend from "./ExpenseListFriend";

export default function FriendDetail() {
  const fname = useParams();
  const username = localStorage.getItem("username");

  const handleClose = () => {
    window.location.href = "/dashboard";
  };

  const [expense, setexpense] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:3001/getFriend", { username: username })
      .then((res) => {
        const f = res.data.friends;
        if (f.indexOf(fname.friendID) === -1) window.location.href = "/error";
        else {
          axios
            .post("http://localhost:3001/getExpenseInfo", {
              username: username,
              friend: fname.friendID,
            })
            .then((res1) => {
              setexpense(res1.data.data);
            });
        }
      });
  }, [fname.friendID, username]);

  return (
    <>
      <div
        className="card border-dark text-dark p-2 mb-2 shadow"
        style={{ borderRadius: 10 }}
      >
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        />
        <div className="d-flex justify-content-center">
          <h5 className="d-flex flex-row align-items-center card-title">
            {fname.friendID}
          </h5>
        </div>

        <div className="mt-3 ms-2">
          <b>Recent Expenses</b>
        </div>
        <div className="mt-3">
          <ExpenseListFriend data={expense} />
        </div>
      </div>
    </>
  );
}
