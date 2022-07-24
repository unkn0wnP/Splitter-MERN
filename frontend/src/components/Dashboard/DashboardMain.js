import React, { useState } from "react";
import SummaryCards from "./SummaryCards";
import { addExp, getExpTotal, settleExp } from "../../services/expense";
import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import SummaryFriends from "./SummaryFriends";

export default function DashboardMain() {
  const uname = localStorage.getItem("username");

  const defaulteformvalue = {
    fname: "",
    amount: 0,
    option: "Paid by you and Split equaly.",
    discription: "",
    date: "",
  };

  const defaultSformvalue = {
    fname: "",
  };

  const [sformvalue, setsformvalue] = useState(defaultSformvalue);
  const [eformvalue, seteformvalue] = useState(defaulteformvalue);
  const [next, setnext] = useState(true);
  const [amount, setamount] = useState(0);

  const handleInputExpense = (e) => {
    const { name, value } = e.target;
    seteformvalue({ ...eformvalue, [name]: value });
  };

  const handleSubmitExp = () => {
    addExp(uname, eformvalue);
  };

  const handleInputSettle = (e) => {
    setnext(true);
    const { name, value } = e.target;
    setsformvalue({ ...sformvalue, [name]: value });
  };

  const handlenext = () => {
    const getTotal = async () => {
      const total = await getExpTotal({
        username: uname,
        friend: sformvalue.fname.trim(),
      });
      total && setamount(total);
      if (total === 0) {
        alert(
          "You are already settled up with "
            .concat(sformvalue.fname)
            .concat(".")
        );
      } else if (total === -1) {
      } else {
        setnext(false);
      }
    };
    getTotal();
  };

  const handleSubmitSettle = () => {
    settleExp({ username: uname, friend: sformvalue.fname }, amount);
  };

  const [eopen, seteopen] = useState(false);
  const [sopen, setsopen] = useState(false);

  return (
    <>
      <div
        className="card"
        style={{ backgroundColor: "#dedede", borderRadius: 0, border: 0 }}
      >
        <div className="row align-items-center pt-3 pb-3 mx-0">
          <div className="col-sm-7 ps-4 fs-2">
            <b>Dashboard</b>
          </div>
          <div className="col-sm-3 mt-1">
            <button
              type="button"
              className="btn btn-white btn-sm p-2 text-white"
              style={{ width: "100%", backgroundColor: "#fc5c38" }}
              onClick={() => seteopen(true)}
            >
              <b>Add an expense</b>
            </button>
          </div>
          <div className="col-sm-2 mt-1">
            <button
              type="button"
              className="btn btn-white btn-sm p-2 text-dark"
              style={{ width: "100%", backgroundColor: "#4bccaa" }}
              onClick={() => {
                setsopen(true);
              }}
            >
              <b>Settle up</b>
            </button>
          </div>
        </div>
      </div>
      <div>
        <SummaryCards />
      </div>
      <div>
        <SummaryFriends />
      </div>

      <Dialog open={eopen}>
        <DialogTitle style={{ backgroundColor: "#4bccaa" }}>
          <b>Add an expense</b>
        </DialogTitle>

        <DialogContent style={{ marginTop: 10 }}>
          <DialogContentText>
            With <b>You</b> and{" "}
            <TextField
              type="text"
              placeholder="Enter name"
              value={eformvalue.fname}
              name="fname"
              onChange={handleInputExpense}
            />
          </DialogContentText>
          <DialogContentText>
            Amount{" "}
            <TextField
              type="number"
              name="amount"
              value={eformvalue.amount}
              onChange={handleInputExpense}
            />
          </DialogContentText>
          <DialogContentText>
            Select{" "}
            <Select
              value={eformvalue.option}
              name="option"
              onChange={handleInputExpense}
            >
              <MenuItem value={"Paid by you and Split equaly."}>
                Paid by you and Split equaly.
              </MenuItem>
              <MenuItem value={"You owe the full amount."}>
                You owe the full amount.
              </MenuItem>
              <MenuItem value={"Paid by them and Split equaly."}>
                Paid by them and Split equaly.
              </MenuItem>
              <MenuItem value={"They owe the full amount."}>
                They owe the full amount.
              </MenuItem>
            </Select>
          </DialogContentText>
          <DialogContentText>
            Discription{" "}
            <TextField
              type="text"
              name="discription"
              value={eformvalue.discription}
              onChange={handleInputExpense}
            />
          </DialogContentText>
          <DialogContentText>
            Date <input type="date" name="date" onChange={handleInputExpense} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            onClick={handleSubmitExp}
            style={{ backgroundColor: "#fc5c38" }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => seteopen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={sopen}>
        <DialogTitle style={{ backgroundColor: "#4bccaa" }}>
          <b>Settle Up</b>
        </DialogTitle>

        <DialogContent style={{ marginTop: 10 }}>
          <DialogContentText>
            With{" "}
            <TextField
              type="text"
              placeholder="Enter friend name"
              value={sformvalue.fname}
              name="fname"
              onChange={handleInputSettle}
            />
          </DialogContentText>
          {next === false ? (
            <DialogContentText>
              {amount < 0
                ? "You owe : ".concat(-amount)
                : "You lent : ".concat(amount)}
            </DialogContentText>
          ) : null}
        </DialogContent>
        <DialogActions>
          {next === true ? (
            <Button
              variant="contained"
              size="small"
              onClick={handlenext}
              style={{ backgroundColor: "#fc5c38" }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={handleSubmitSettle}
              style={{ backgroundColor: "#fc5c38" }}
            >
              Settle
            </Button>
          )}
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setsopen(false);
              setsformvalue(defaultSformvalue);
              setnext(true);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
