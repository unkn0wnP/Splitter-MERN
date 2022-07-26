import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ExpenseListFriend from "./ExpenseListFriend";
import { addExp, getExp, getExpTotal, settleExp } from "../../services/expense";
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
import { isFriend } from "../../services/friend";

export default function FriendDetail() {
  const fname = useParams();
  const [token, username] = useOutletContext();

  const handleClose = () => {
    window.location.href = "/dashboard";
  };

  const defaulteformvalue = {
    friend: fname.friendID,
    amount: 0,
    option: "Paid by you and Split equaly.",
    discription: "",
    date: "",
  };

  const [eopen, seteopen] = useState(false);
  const [sopen, setsopen] = useState(false);
  const [eformvalue, seteformvalue] = useState(defaulteformvalue);
  const [amount, setamount] = useState(0);

  const handleInputExpense = (e) => {
    const { name, value } = e.target;
    seteformvalue({ ...eformvalue, [name]: value });
  };

  const handleSubmitExp = () => {
    eformvalue.fname = fname.friendID;
    addExp(token, eformvalue);
  };

  const handleSettle = () => {
    const getTotal = async () => {
      const total = await getExpTotal(token, { friend: fname.friendID });
      total && setamount(total);
      if (total === 0) {
        alert(
          "You are already settled up with ".concat(fname.friendID).concat(".")
        );
      } else setsopen(true);
    };
    getTotal();
  };

  const handleSubmitSettle = () => {
    settleExp(token, { username: username, friend: fname.friendID }, amount);
  };

  const [expense, setexpense] = useState([]);

  useEffect(() => {
    const check = async () => {
      seteformvalue({ ...eformvalue, ["username"]: username });

      await isFriend(token, fname.friendID);
      const res1 = await getExp(token, { friend: fname.friendID });
      res1 && setexpense(res1);
    };
    check();
  }, [fname.friendID, token, username]);

  return (
    <>
      <div
        className="card border-dark text-dark p-2 mb-2 shadow"
        style={{ borderRadius: 10 }}
      >
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        />
        <div className="d-flex justify-content-center">
          <h5 className="d-flex flex-row align-items-center card-title">
            {fname.friendID}
          </h5>
        </div>

        <div className="mt-3 ms-2">
          <div className="row mb-3">
            <div className="col-7">
              <button
                type="button"
                className="btn btn-white btn-sm p-2 text-white"
                style={{ width: "100%", backgroundColor: "#fc5c38" }}
                onClick={() => seteopen(true)}
              >
                <b>Add Expense</b>
              </button>
            </div>
            <div className="col-5">
              <button
                type="button"
                className="btn btn-white btn-sm p-2 text-white"
                style={{ width: "100%", backgroundColor: "#4bccaa" }}
                onClick={handleSettle}
              >
                <b>Settle Up</b>
              </button>
            </div>
          </div>
          <div className="mt-3 mb-2 ms-1">
            <b>Recent Expenses</b>
          </div>
          <ExpenseListFriend data={expense} token={token} />
        </div>
      </div>
      <Dialog open={eopen}>
        <DialogTitle style={{ backgroundColor: "#4bccaa" }}>
          <b>Add an expense</b>
        </DialogTitle>

        <DialogContent style={{ marginTop: 10 }}>
          <DialogContentText>
            With <b>You</b> and <b>{fname.friendID}</b>
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
        <DialogTitle style={{ backgroundColor: "#4bccaa", width: 250 }}>
          <b>Settle Up</b>
        </DialogTitle>

        <DialogContent style={{ marginTop: 10 }}>
          <DialogContentText>
            With <b>{fname.friendID}</b>
          </DialogContentText>
          <DialogContentText>
            {amount < 0
              ? "You owe : ".concat(-amount)
              : "You lent : ".concat(amount)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            onClick={handleSubmitSettle}
            style={{ backgroundColor: "#fc5c38" }}
          >
            Settle
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setsopen(false);
              setamount(0);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
