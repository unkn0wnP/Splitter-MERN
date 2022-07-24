import React, { useState } from "react";
import { sendR } from "../../services/friend";

export default function AddF() {
  const uname = localStorage.getItem("username");
  const [fname, setfname] = useState("");

  const handleAdd = ()=>{
    sendR({username:uname,fname:fname});
  }

  const handleClose = ()=>{
    window.location.href="/dashboard"
  }

  return (
    <>
      <div
        className="card border-dark text-dark p-3 mb-2 shadow"
        style={{ borderRadius: 10 }}
      >
        <button type="button" class="btn-close" aria-label="Close" onClick={handleClose}/>
        <div className="d-flex justify-content-center">
          <h5 className="d-flex flex-row align-items-center card-title">
            Add Friend
          </h5>
        </div>
        <div className="row mt-4 mb-3">
          <div className="col-8 form-outline form-white">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter username"
              value={fname}
              onChange={(e) => setfname(e.target.value)}
            />
          </div>
          <div className="col-4">
            <button
              type="button"
              className="btn btn-outline-success btn-sm px-3"
              onClick={handleAdd}
            >
              Add
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
}
