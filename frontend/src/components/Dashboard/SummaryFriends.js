import React, { useState, useEffect } from "react";
import { getSummaryFriend } from "../../services/expense";

export default function SummaryFriends() {
  const username = localStorage.getItem("username");
  const [owe, setowe] = useState([]);
  const [lent, setlent] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await getSummaryFriend({ username: username });
      res && setowe(res.owe);
      res && setlent(res.lent);
    };
    getData();
  }, [username]);
  return (
    <div className="card p-3 m-4 shadow" style={{ borderRadius: 10 }}>
      <div className="row p-2 text-secondary">
        <div className="col">
          <b>YOU ARE OWED</b>
        </div>
        <div className="col text-end">
          <b>YOU OWE</b>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <table class="table table-hover">
            <tr>
              <th>By</th>
              <th>Amount</th>
            </tr>
            <tbody>
              {lent.map((l, i) => {
                return (
                  <tr key={i}>
                    <th>
                      {l._id.friend}
                    </th>
                    <th style={{ color: "#399e83" }}>
                      {l.total}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col">
        <table class="table table-hover">
            <tr>
              <th>To</th>
              <th>Amount</th>
            </tr>
            <tbody>
              {owe.map((o, i) => {
                return (
                  <tr key={i}>
                    <th>{o._id.friend}</th>
                    <th>
                      <div style={{ color: "#fc5c38" }}>
                        {-o.total}
                      </div>
                      </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
