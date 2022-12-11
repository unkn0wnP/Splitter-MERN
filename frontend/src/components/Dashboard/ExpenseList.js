import React, { useState, useEffect } from "react";
import { getExp, deleteExp } from "../../services/expense";

export default function ExpenseList(props) {
  const [expense, setexpense] = useState([]);

  const handleDelete = (e) => {
    deleteExp(props.token,{ tID: e.target.value });
  };

  const month = {
    "01": "JAN",
    "02": "FEB",
    "03": "MAR",
    "04": "APR",
    "05": "MAY",
    "06": "JUN",
    "07": "JUL",
    "08": "AUG",
    "09": "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC",
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getExp(props.token,{});
      data && setexpense(data);
    };
    getData();
  }, [props.token]);

  return (
    <>
      <div className="row">
        <h5 className="text-center mt-3 mb-3">
          <b>Recent transactions</b>
        </h5>
      </div>
      {expense.length === 0
        ? "No transections."
        : expense.map((e, i) => {
            const d = e.date.split("-");
            return (
              <div
                className="card text-dark p-3 mx-2 shadow"
                style={{ borderTopLeftRadius: 0,borderTopRightRadius:0,borderEndStartRadius:0,borderEndEndRadius:20 }}
              >
                <div className="row">
                  <div
                    className="col-2 text-center my-auto ms-1"
                    style={{
                      backgroundColor: "#fff0b3",
                      borderRadius: 50,
                      color: "#6e5a09",
                    }}
                  >
                    <div className="pt-2" style={{ fontSize: 15 }}>
                      <b>{d[2]}</b>
                    </div>
                    <div className="pb-2" style={{ fontSize: 9 }}>
                      <b>{month[d[1]]}</b>
                    </div>
                  </div>
                  <div className="col-8 my-auto" style={{ color: "blue" }}>
                    <div className="fs-5"><b>{e.discription}</b></div>

                    {e.status === "normal" ? (
                      e.amount > 0 ? (
                        <div style={{ fontSize: 12, color: "black" }}>
                          You lent{" "} {e.friend}{" "}
                          <b style={{ color: "green" }}>&#8377;{e.amount}</b>
                          {"."}
                        </div>
                      ) : (
                        <div style={{ fontSize: 12, color: "black" }}>
                          You owe{" "}{e.friend}{" "}
                          <b style={{ color: "red" }}>&#8377;{-e.amount}</b>
                          {"."}
                        </div>
                      )
                    ) : e.amount < 0 ? (
                      <div style={{ fontSize: 12, color: "black" }}>
                        {e.friend}{" "} paid{" "}
                        <b style={{ color: "green" }}>&#8377;{-e.amount}</b>
                        {"."}
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, color: "black" }}>
                        You paid{" "}
                        <b style={{ color: "red" }}>&#8377;{e.amount}</b>
                        {" to "}{e.friend}{"."}
                      </div>
                    )}
                  </div>
                  <div className="col-1 my-auto">
                    <button
                      type="button"
                      className="btn-sm btn-close"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title="Delete expense"
                      onClick={handleDelete}
                      value={e.tID}
                      style={{ border: 0, backgroundColor: "white" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
}
