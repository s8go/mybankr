import React, { createContext, useEffect, useReducer, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MyAccount from "./components/Account/MyAccount";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
// import styles from "./styles/App.css";
import allUsers from "./users.json";
import { signUser, loginUser } from "./components/Logic/userLogic";
import MainPage from "./mainpage/MainPage";

export const userDetails = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState(allUsers);

  /* 
  This is the login code to set the current user : it calls a loginUser function
  which is used to get the user details from the database
  */

  function validateUser(loggedUser) {
    setCurrentUser(loginUser(users, loggedUser));
  }

  /* 
  This is the signup code to register a user : it calls a signUser function
  which is used to add the user details to the database
  */

  function registerUser(newUser) {
    setUsers(signUser(users, newUser));
  }

  return (
    <div className="App">
      <userDetails.Provider value={currentUser}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route
              path="/login"
              element={<Login validateUser={validateUser} />}
            ></Route>
            <Route
              path="/signup"
              element={<Signup registerUser={registerUser} />}
            ></Route>
            <Route path="/my-account" element={<MyAccount />}></Route>
            <Route
              path="*"
              element={<Signup registerUser={registerUser} />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </userDetails.Provider>

      {/* <userDetails.Provider value={currentUser}>
        <Signup registerUser={registerUser} />
        <MyAccount />
        <Login validateUser={validateUser} />
      </userDetails.Provider> */}
    </div>
  );
}

export default App;
