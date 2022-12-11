import React, { useState, useEffect } from "react";
import { getSummaryFriend } from "../../services/expense";

export default function SummaryFriends(props) {
  const [owe, setowe] = useState([]);
  const [lent, setlent] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await getSummaryFriend(props.token,{});
      res && setowe(res.owe);
      res && setlent(res.lent);
    };
    getData();
  }, []);
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
          {lent.length === 0 ? (
            <div className="text-start fs-5">{"Noone owes you."}</div>
          ) : (
            <table className="table table-hover">
              <tr>
                <th>By</th>
                <th>Amount</th>
              </tr>
              <tbody>
                {lent.map((l, i) => {
                  return (
                    <tr key={i}>
                      <th>{l._id.friend}</th>
                      <th style={{ color: "#399e83" }}>&#8377;{l.total}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="col">
          {owe.length === 0 ? (
            <div className="text-end fs-5">{"You don't owe anyone."}</div>
          ) : (
            <table className="table table-hover">
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
                        <div style={{ color: "#fc5c38" }}>&#8377;{-o.total}</div>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
