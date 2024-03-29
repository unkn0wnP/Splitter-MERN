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
import PageNotFound from "./components/PageNotFound";
import Confirmation from "./components/Confirmation";

function App() {
  return (
    <>
    {/*Note(Chnages during using localhost) :  Services*/}
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
          <Route path="/verify/:confirmationcode" element={<Confirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
