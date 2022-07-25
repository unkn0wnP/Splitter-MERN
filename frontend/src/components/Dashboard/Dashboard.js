import React from "react";
import DashboardMain from "./DashboardMain";
import ExpenseList from "./ExpenseList";
import Friends from "./Friends";
import Navbar from "./Navbar";

export default function Dashboard() {
  const uname = localStorage.getItem("username");
  return (
    <>
      <Navbar username={uname} />

      <div className="container-fluid">
        <div className="col-sm-3 text-dark pt-5 border-end" style={{ float: "left"}}>
          <div className="mt-1 mx-3 pe-2">
            <Friends />
          </div>
        </div>
        <div
          className="col-sm-6 text-dark border-start border-end"
          style={{ float: "left", minHeight: 600 }}
        >
          <DashboardMain/>
        </div>
        <div className="col-sm-3 text-dark border-start" style={{ float: "left"}}>
          <ExpenseList/>
        </div>
      </div>
    </>
  );
}
