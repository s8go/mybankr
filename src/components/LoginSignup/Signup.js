import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ registerUser }) => {
  const [newUser, setNewUser] = useState({});
  const Navigate = useNavigate();


  /*
This is the input onChange function to get input details
*/

  function inputValues(e) {
    setNewUser((curr) => {
      return { ...curr, [e.name]: e.value };
    });
  }

  return (
    <div className="signup-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerUser(newUser);
          Navigate("/login")
        }}
      >
        <div className="input-div">
          <input
            type="text"
            name="firstName"
            value={newUser.firstName || ""}
            placeholder="First Name"
            onChange={(e) => inputValues(e.target)}
          />
        </div>

        <div className="input-div">
          <input
            type="text"
            name="lastName"
            value={newUser.lastName || ""}
            placeholder="Last Name"
            onChange={(e) => inputValues(e.target)}
          />
        </div>

        <div className="input-div">
          <input
            type="email"
            name="email"
            value={newUser.email || ""}
            placeholder="Email address"
            onChange={(e) => inputValues(e.target)}
          />
        </div>

        <div className="input-div">
          <input
            type="tel"
            name="phone"
            value={newUser.phone || ""}
            placeholder="Phone"
            onChange={(e) => inputValues(e.target)}
          />
        </div>

        <div className="input-div">
          <input
            type="password"
            name="password"
            value={newUser.password || ""}
            placeholder="Password"
            onChange={(e) => inputValues(e.target)}
          />
        </div>

        <div className="input-div">
          <input
            type="password"
            name="confirmPassword"
            value={newUser.confirmPassword || ""}
            placeholder="Confirm Password"
            onChange={(e) => inputValues(e.target)}
          />
        </div>

        <div className="input-div">
          <input type="submit" value="submit" />
        </div>
      </form>
    </div>
  );
};

export default Signup;
