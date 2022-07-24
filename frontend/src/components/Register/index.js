import React, { useState } from "react";
import Alert from "../Alert/Alert";
import Register from "./Register";

export default function Index() {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
    <Alert alert={alert}/>
      <div className="row mx-3 my-4 mb-4">
        <div className="col-sm-4 card bg-dark mt-4">
            <div className="card-body p-5 text-center">
              <div className="mb-md-3 mt-md-4 ">
                <img className="img-fluid" src={require("../images/home.png")} />
            </div>
          </div>
        </div>
        <div className="col-sm-8 my-auto">
          <Register showAlert={showAlert}/>
        </div>
      </div>
    </>
  )
}
