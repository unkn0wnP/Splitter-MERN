import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/index";
import Register from "./components/Register/index";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import AddF from "./components/Dashboard/AddF";
import PendingR from "./components/Dashboard/PendingR";
import FriendDetail from "./components/Dashboard/FriendDetail";
import Error from "./components/Error";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="addFriend" element={<AddF />}></Route>
            <Route path="pendingRequest" element={<PendingR />}></Route>
            <Route path=":friendID" element={<FriendDetail />}></Route>
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
