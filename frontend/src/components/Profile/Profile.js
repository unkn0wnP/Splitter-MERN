import React, { useState, useEffect } from "react";
import {
  getCurrentDetails,
  updateDetail,
  updatePass,
} from "../../services/profile";
import Navbar from "./Navbar";

export default function Profile() {
  const uname = localStorage.getItem("username");

  const [currentDetails, setcurrentDetails] = useState({});
  const [updateDetails, setupdateDetails] = useState({});
  const [updatepass, setupdatepass] = useState({});

  const [profile, setprofile] = useState(true);
  const [edit, setedit] = useState(false);
  const [cpass, setcpass] = useState(false);

  useEffect(() => {
    const detail = async () => {
      const res = await getCurrentDetails(uname);
      res && setcurrentDetails(res);
      setupdateDetails({ firstname: res.firstname, lastname: res.lastname });
      setupdatepass({ oldpass: "", newpass: "", cpass: "" });
    };
    detail();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setupdateDetails({ ...updateDetails, [name]: value });
  };

  const handleInputChangePass = (e) => {
    const { name, value } = e.target;
    setupdatepass({ ...updatepass, [name]: value });
  };

  const handleUpdateDetails = () => {
    updateDetail(uname, {
      firstname: updateDetails.firstname.trim(),
      lastname: updateDetails.lastname.trim(),
    });
  };

  const handleUpdatePass = () => {
    updatePass(uname, {
      oldpass: updatepass.oldpass.trim(),
      newpass: updatepass.newpass.trim(),
      cpass: updatepass.cpass.trim(),
    });
  };

  return (
    <>
      <Navbar username={uname} />

      <div className="row mx-0">
        <div className="col-sm-4 card bg-dark mt-5" style={{borderRadius:0}}>
          <div className="card-body p-5 text-center">
            <div className="mb-md-3 mt-md-4">
              <img className="img-fluid" src={require("../images/home.png")} />
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="container mt-5 text-center w-75">
            <div className="mb-md-3 mt-md-4 pb-2">
              {profile && (
                <>
                  <h2 className="fw-bold mb-5 text-uppercase">Profile</h2>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-floating">
                        <input
                          type="text"
                          id="firstname"
                          className="form-control form-control-lg"
                          value={currentDetails.firstname}
                          disabled
                        />
                        <label for="firstname">Firstname</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating">
                        <input
                          type="text"
                          id="lastname"
                          className="form-control form-control-lg"
                          value={currentDetails.lastname}
                          disabled
                        />
                        <label for="lastname">Lastname</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-floating mb-2">
                    <input
                      type="text"
                      id="email"
                      className="form-control form-control-lg"
                      value={currentDetails.email}
                      disabled
                    />
                    <label for="email">Email</label>
                  </div>
                  <div className="row mb-2 mt-5">
                    <div className="col ">
                      <button
                        type="button"
                        className="btn btn-white btn-sm p-2 text-white"
                        style={{ width: "75%", backgroundColor: "#fc5c38" }}
                        onClick={() => {
                          setprofile(false);
                          setedit(true);
                        }}
                      >
                        <b>Edit Details</b>
                      </button>
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-white btn-sm p-2 text-white"
                        style={{ width: "75%", backgroundColor: "#4bccaa" }}
                        onClick={() => {
                          setprofile(false);
                          setcpass(true);
                        }}
                      >
                        <b>Change Password</b>
                      </button>
                    </div>
                  </div>
                </>
              )}
              {edit && (
                <>
                  <h2 className="fw-bold mb-5 text-uppercase">
                    Update Details
                  </h2>
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      className="form-control form-control-lg"
                      value={updateDetails.firstname}
                      onChange={handleInputChange}
                    />
                    <label for="firstname">Firstname</label>
                  </div>

                  <div className="form-floating">
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      className="form-control form-control-lg"
                      value={updateDetails.lastname}
                      onChange={handleInputChange}
                    />
                    <label for="lastname">Lastname</label>
                  </div>
                  <div className="row mb-2 mt-5">
                    <div className="col ">
                      <button
                        type="button"
                        className="btn btn-white btn-sm p-2 text-white"
                        style={{ width: "75%", backgroundColor: "#fc5c38" }}
                        onClick={handleUpdateDetails}
                      >
                        <b>Update</b>
                      </button>
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-white btn-sm p-2 text-white"
                        style={{ width: "75%", backgroundColor: "#4bccaa" }}
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        <b>Cancle</b>
                      </button>
                    </div>
                  </div>
                </>
              )}
              {cpass && (
                <>
                  <h2 className="fw-bold mb-5 text-uppercase">
                    Update password
                  </h2>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      id="oldpass"
                      name="oldpass"
                      className="form-control form-control-lg"
                      value={updatepass.oldpass}
                      onChange={handleInputChangePass}
                    />
                    <label for="oldpass">Current Password</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      id="newpass"
                      name="newpass"
                      className="form-control form-control-lg"
                      value={updatepass.newpass}
                      onChange={handleInputChangePass}
                    />
                    <label for="newpass">New Password</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      id="cpass"
                      name="cpass"
                      className="form-control form-control-lg"
                      value={updatepass.cpass}
                      onChange={handleInputChangePass}
                    />
                    <label for="cpass">Confirm New Password</label>
                  </div>
                  <div className="row mb-2 mt-5">
                    <div className="col ">
                      <button
                        type="button"
                        className="btn btn-white btn-sm p-2 text-white"
                        style={{ width: "75%", backgroundColor: "#fc5c38" }}
                        onClick={handleUpdatePass}
                      >
                        <b>Update password</b>
                      </button>
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-white btn-sm p-2 text-white"
                        style={{ width: "75%", backgroundColor: "#4bccaa" }}
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        <b>Cancle</b>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
