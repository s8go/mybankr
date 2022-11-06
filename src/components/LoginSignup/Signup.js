import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../../App";

const Signup = ({ registerUser , googleValidate}) => {
  const [newUser, setNewUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const {currentUser} = useContext(userDetails)
  const Navigate = useNavigate();

  /*
This is the input onChange function to get input details
*/

useEffect(()=>{
    if(currentUser !== null){
      localStorage.username = newUser.email;
      localStorage.password = newUser.password;
      Navigate("/login")
    }
  }, [currentUser])
  
  function inputValues(e) {
    setNewUser((curr) => {
      return { ...curr, [e.name]: e.value };
    });
  }
  
  function formValidation() {
    setTimeout(() => {
      setErrorMessage("");
    }, 600);
    
    if (isNaN(newUser.phone)) {
      setErrorMessage("Invalid phone number");
    } else {
      registerUser(newUser);
    }
  }

  return (
    <div className="signup-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formValidation();
        }}
      >
        <div className="input-div">
          <input
            required
            type="text"
            name="fullName"
            value={newUser.fullName || ""}
            placeholder="Fullname"
            onChange={(e) => inputValues(e.target)}
          />
        </div>

        <div className="input-div">
          <input
            required
            type="text"
            name="username"
            value={newUser.username || ""}
            placeholder="username"
            onChange={(e) => inputValues(e.target)}
          />
        </div>

        <div className="input-div">
          <input
            required
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
            required
            type="password"
            name="password"
            value={newUser.password || ""}
            placeholder="Password"
            onChange={(e) => inputValues(e.target)}
          />
        </div>

        <div className="input-div">
          <input
            required
            type="password"
            name="confirmPassword"
            value={newUser.confirmPassword || ""}
            placeholder="Confirm Password"
            onChange={(e) => inputValues(e.target)}
          />
        </div>

        <p className="error">{errorMessage}</p>

        <div className="input-div">
          <input type="submit" value={currentUser === null ? "Submit" : "Loading"} />
        </div>
      </form>

      <div>
        <div className="sign-in-opt">
          <p className="google alternate" onClick={()=> googleValidate("signup")}>
            Google
          </p>
        </div>
        <p className="alternate">
          <span className="signup" onClick={() => Navigate("/login")}>
            Already a user? Log In{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
