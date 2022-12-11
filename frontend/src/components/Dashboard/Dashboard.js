import React, { useState, useEffect } from "react";
import { getProfile } from "../../services/profile";
import DashboardMain from "./DashboardMain";
import ExpenseList from "./ExpenseList";
import Friends from "./Friends";
import Navbar from "./Navbar";

export default function Dashboard() {
  
const [user, setuser] = useState({})

  const token = localStorage.getItem("splitterToken");

  useEffect(() => {
    if (token === null) window.location.href = "/login";

    const data = async ()=>{
      const res = await getProfile(token);
      res && setuser(res)
    }
    data();

  }, [token]);

  return (
    <>
      <Navbar username={user.username} />

      <div className="container-fluid">
        <div
          className="col-sm-3 text-dark pt-5 border-end"
          style={{ float: "left" }}
        >
          <div className="mt-1 mx-3 pe-2">
            <Friends token={token} username={user.username}/>
          </div>
        </div>
        <div
          className="col-sm-6 text-dark border-start border-end"
          style={{ float: "left", minHeight: 600 }}
        >
          <DashboardMain token={token} username={user.username}/>
        </div>
        <div
          className="col-sm-3 text-dark border-start"
          style={{ float: "left" }}
        >
          <ExpenseList token={token} username={user.username}/>
        </div>
      </div>
    </>
  );
}
