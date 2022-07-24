import React, { useState, useEffect } from "react";
import axios from "axios";
import {addF} from "../../services/friend";

export default function PendingR() {
  const uname = localStorage.getItem("username");
  const [req, setreq] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/getFriend", { username: uname })
      .then((res) => {
        setreq(res.data.pending);
      });
  }, [uname]);

  const handleClose = () => {
    window.location.href = "/dashboard";
  };

  const handleAccept = (e) => {
    const fname = e.target.value;
    addF(uname, fname);
  };

  return (
    <>
      <div
        className="card border-dark text-dark p-3 mb-2 shadow"
        style={{ borderRadius: 10 }}
      >
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          onClick={handleClose}
        />
        <div className="d-flex justify-content-center">
          <h5 className="d-flex flex-row align-items-center card-title">
            Pending Requests
          </h5>
        </div>
        {req.length === 0 ? (
          <div className="mt-3">No pending requests.</div>
        ) : (
          <table className="table mt-3">
            <tbody>
              {req.map((f, i) => {
                return (
                  <tr>
                    <td>{f}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-info btn-sm"
                        onClick={handleAccept}
                        value={f}
                      >
                        Accept
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
