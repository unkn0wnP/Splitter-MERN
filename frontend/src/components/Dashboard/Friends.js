import React,{useState, useEffect} from "react";
import { Link, Outlet } from "react-router-dom";
import { getFriendData } from "../../services/friend";
import Friendlist from "./Friendlist";

export default function Friends() {
  const uname = localStorage.getItem("username");
  const [req, setreq] = useState([]);

  useEffect(() => {
   const getData = async ()=>{
    const res = await getFriendData(uname);
    res && setreq(res.pending);
   }
   getData();
  }, [uname]);
  return (
    <>
      <div
        className="card border-dark text-dark p-3 mb-2 shadow"
        style={{ borderRadius: 10 }}
      >
        <div className="d-flex justify-content-center">
          <h5 className="d-flex flex-row align-items-center card-title">
            Friends
          </h5>
        </div>

        <div className="mt-1">
          <Friendlist />
        </div>
      </div>
      <div className="row mt-4 mb-3">
        <div className="col">
            <Link to="/dashboard/addFriend">
          <button type="button" className="btn btn-outline-success btn-sm px-5">
            Add Friends
          </button>
          </Link>
        </div>
        <div className="col">
        <Link to="/dashboard/pendingRequest">
          <button type="button" className="btn btn-outline-danger btn-sm px-4">
            Pending Requests({req.length})
          </button>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <Outlet/>
      </div>
    </>
  );
}
