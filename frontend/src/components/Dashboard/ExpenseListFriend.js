import React from "react";
import { deleteExp } from "../../services/expense";

export default function ExpenseList(props) {
  const data = props.data;

  const handleDelete = (e) => {
    deleteExp(props.token,{tID : e.target.value});
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

  return (
    <>
      {data.length === 0 ? (
        <div className="mx-2">No expenses available.</div>
      ) : (
        <table className="table">
          <tbody>
            {data.map((e, i) => {
              const d = e.date.split("-");
              return (
                <tr className="row mx-0 mt-2">
                  <div
                    className="col-3 text-center my-auto"
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
                  <div className="col-7 my-auto" style={{ color: "blue" }}>
                    {e.discription}

                    {e.status === "normal" ? (
                      e.amount > 0 ? (
                        <div style={{ fontSize: 12, color: "black" }}>
                          You lent{" : "}
                          <b style={{ color: "green" }}>&#8377;{e.amount}</b>
                        </div>
                      ) : (
                        <div style={{ fontSize: 12, color: "black" }}>
                          You owe{" : "}
                          <b style={{ color: "red" }}>&#8377;{-e.amount}</b>
                        </div>
                      )
                    ) : e.amount <0 ? (
                      <div style={{ fontSize: 12, color: "black" }}>
                        You got{" : "}
                        <b style={{ color: "green" }}>&#8377;{-e.amount}</b>
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, color: "black" }}>
                        You paid{" : "}
                        <b style={{ color: "red" }}>&#8377;{e.amount}</b>
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
                  />
                </div>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
