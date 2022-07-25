import React, { useState, useEffect } from "react";
import {getSummary} from "../../services/expense"

export default function Summary() {
  const username = localStorage.getItem("username");
  const [lent, setlent] = useState(0);
  const [owe, setowe] = useState(0);
  useEffect(() => {
    let data = []
    const getData = async ()=>{
      data =  await getSummary({username:username})
      data  && setlent(data.lent)
      data && setowe(data.owe)
    }
    getData();
  }, []);

  return (
    <>
      <div className="row mx-3 my-3 align-items-center">
        <div className="col-md-4">
          <div
            className="card p-3 mb-2 mt-2"
            style={{ backgroundColor: "#bdffc9", color: "#107000" }}
          >
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-row align-items-center fs-5">
                You are owed
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-row align-items-center mt-2 fs-3">
                <b>&#8377;{lent}</b>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card p-3 mb-2 mt-2"
            style={{ backgroundColor: "#d4e3ff", color: "#002c94" }}
          >
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-row align-items-center fs-5">
                Total
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-row align-items-center mt-2 fs-3">
                <b>&#8377;{lent+owe}</b>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card p-3 mb-2 mt-2"
            style={{ backgroundColor: "#ffd5d4", color: "#bd0000" }}
          >
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-row align-items-center fs-5">
                You owe
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="d-flex flex-row align-items-center mt-2 fs-3">
                <b>&#8377;{-owe}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
