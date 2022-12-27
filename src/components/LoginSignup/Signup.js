import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../../App";
import { FaGoogle } from "react-icons/fa";
import {FormWrap, InputDiv, SignInOpt} from "./Login"

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
    
    if (newUser.phone === true && isNaN(newUser.phone)) {
      setErrorMessage("Invalid phone number");
    } else {
      registerUser(newUser);
    }
  }

  return (
    <FormWrap>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formValidation();
        }}
      >
        <InputDiv>
          <input
            required
            type="text"
            name="fullName"
            value={newUser.fullName || ""}
            placeholder="Fullname"
            onChange={(e) => inputValues(e.target)}
          />
        </InputDiv>

        <InputDiv>
          <input
            required
            type="text"
            name="username"
            value={newUser.username || ""}
            placeholder="username"
            onChange={(e) => inputValues(e.target)}
          />
        </InputDiv>

        <InputDiv>
          <input
            required
            type="email"
            name="email"
            value={newUser.email || ""}
            placeholder="Email address"
            onChange={(e) => inputValues(e.target)}
          />
        </InputDiv>

        <InputDiv>
          <input
            required
            type="password"
            name="password"
            value={newUser.password || ""}
            placeholder="Password"
            onChange={(e) => inputValues(e.target)}
          />
        </InputDiv>

        {/* <InputDiv>
          <input
            required
            type="password"
            name="confirmPassword"
            value={newUser.confirmPassword || ""}
            placeholder="Confirm Password"
            onChange={(e) => inputValues(e.target)}
          />
        </InputDiv> */}

        <p className="error">{errorMessage}</p>

        <InputDiv>
        <button type="submit" >{currentUser === null ? "Submit" : "Loading"}</button>
        </InputDiv>
      </form>

      <SignInOpt>
        <div className="sign-in-opt">
          <p
            onClick={async () => {
              await googleValidate("login");
            
            }}
          >
            <FaGoogle/>
          </p>
        </div>

        <p className="alternate">
          <span>Already have an account? </span>
          <span
            onClick={() => {
              Navigate("/login");
            }}
          >
            Login here
          </span>
        </p>
      </SignInOpt>
    </FormWrap>
  );
};

export default Signup;

