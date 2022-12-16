import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaGoogle} from "react-icons/fa";
import styled from "styled-components"

const Login = ({ validateUser, googleValidate }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const Navigate = useNavigate();

  /*
This is the input onChange function to get input details
// */

  useEffect(() => {
    setLoggedUser({
      email: localStorage.email,
      password: localStorage.password,
    });

    if (signedIn) {
      Navigate("/dashboard");
    } else {
      setSignedIn(false);
    }
  }, [signedIn]);

  function loginDetails(event) {
    setLoggedUser((curr) => {
      return { ...curr, [event.name]: event.value };
    });
  }

  function submitForm() {
    validateUser(loggedUser);
    setSignedIn(true);
    localStorage.email = loggedUser.email;
    localStorage.password = loggedUser.password;
  }

  return (
    <FormWrap>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <InputDiv>
          <input
            required
            type="text"
            placeholder="email"
            name="email"
            value={loggedUser.email || ""}
            onChange={(e) => {
              loginDetails(e.target);
            }}
          />
        </InputDiv>

        <InputDiv>
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            value={loggedUser.password || ""}
            onChange={(e) => loginDetails(e.target)}
          />
        </InputDiv>

        <InputDiv>
          <button type="submit">{signedIn ? "Loading..." : "Log In"}</button>
        </InputDiv>
        <div></div>
      </form>

      <div>
        <div className="sign-in-opt">
          <p
            className="google alternate"
            onClick={async () => {
              await googleValidate("login");
              // await Navigate("/dashboard");
            }}
          >
            <FaGoogle/>
          </p>
        </div>

        <p className="alternate">
          <span>Don't have an account? </span>
          <span
            className="signup"
            onClick={() => {
              Navigate("/signup");
            }}
          >
            Create account here
          </span>
        </p>
      </div>
    </FormWrap>
  );
};

export default Login;


const FormWrap = styled.div`
background-color: red;
width: 100vw;
height: 100vh;
min-height: 600px;
padding: 2em 0;
margin: auto;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-orient: vertical;
-webkit-box-direction: normal;
    -ms-flex-direction: column;
        flex-direction: column;
background-color: #00006b;
padding-top: 5em;
padding-bottom: 3em;

& form {
  width: min(90%, 570px);
  margin: auto;
  padding: 1em;
}
`

const InputDiv = styled.div`
text-align: center;
margin:2em auto;
width:100%;


& input {
  display: inline-block;
  padding: .5em 1em;
  width: min(95%,300px);
  margin: auto;
  font-size: max(1em, 1.4vw);
  color: white;
  background-color: transparent;
  outline:none;
  border: none;
  border-bottom: 1px solid white
  ;
}

& button {
  background: white;
  border: none;
  padding: .7em 1em;
  width: min(35%, 120px);
  font-size: max(1em, 1.2vw);
  border-radius: .5rem;
  cursor:pointer;
}
`