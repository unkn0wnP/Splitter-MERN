import React from "react";
import { deleteExp } from "../../services/expense";

export default function ExpenseList(props) {
  const data = props.data;

  const handleDelete = (e)=>{
    deleteExp({tID : e.target.value});
  }

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
                <tr className="row mx-0" style={{ minHeight: 60 }}>
                  <div
                    className="col-3 text-center my-auto"
                    style={{ backgroundColor: "#ffc894", borderRadius: 50 }}
                  >
                    <div style={{ fontSize: 10 }}>
                      <b>
                        {month[d[1]]}
                        {d[2]}
                      </b>
                    </div>
                    <div style={{ fontSize: 12 }}>{d[0]}</div>
                  </div>
                  <div className="col-7 my-auto" style={{ color: "blue" }}>
                    {e.discription}

                    {e.status === "normal" ? (
                      e.amount > 0 ? (
                        <div style={{ fontSize: 12, color: "black" }}>
                          You lent{" : "}
                          <b style={{ color: "green" }}>{e.amount}</b>
                        </div>
                      ) : (
                        <div style={{ fontSize: 12, color: "black" }}>
                          You owe{" : "}
                          <b style={{ color: "red" }}>{-e.amount}</b>
                        </div>
                      )
                    ) : (
                      e.amount < 0 ? (
                        <div style={{ fontSize: 12, color: "black" }}>
                          You got{" : "}
                          <b style={{ color: "green" }}>{-e.amount}</b>
                        </div>
                      ) : (
                        <div style={{ fontSize: 12, color: "black" }}>
                          You paid{" : "}
                          <b style={{ color: "red" }}>{e.amount}</b>
                        </div>
                      )
                    )}
                  </div>
                  <div className="col-1 my-auto"><button type="button" class="btn-close btn-sm" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete expense" onClick={handleDelete} value={e.tID}/></div>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
