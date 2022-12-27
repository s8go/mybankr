import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaGoogle} from "react-icons/fa";
import styled from "styled-components";
import Logo from "../../images/Bankr.png"

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

      <SignInOpt>
        <div className="sign-in-opt">
          <p
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
      </SignInOpt>
    </FormWrap>
  );
};

export default Login;


export const FormWrap = styled.div`
width: 100%;
height: 100%;
min-height: 600px;
min-width: 270px;
padding: 5em 0 3em 0;
margin: auto;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-orient: vertical;
-webkit-box-direction: normal;
    -ms-flex-direction: column;
        flex-direction: column;
background-color:  rgb(0, 0, 38);
background-image: url(${Logo});
background-repeat: no-repeat;
background-size: 15%;

@media screen and (min-width: 1024px){
background-size: 5%;

}

& form {
  width: min(90%, 570px);
  margin-inline: auto;
  margin-top:2em;
  padding: 1em;
}
`

export const InputDiv = styled.div`
text-align: center;
margin:2em auto;
width:100%;


& input {
  display: inline-block;
  padding: .5em;
  width: min(95%,300px);
  margin: auto;
  font-size: max(1em, 1.4vw);
  color: white;
  background-color: transparent;
  outline:none;
  border: none;
  border-bottom: 1px solid white;
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
export const SignInOpt = styled.div`
margin-top: 5em;
text-align: center;


& p, & .sign-in-opt{
  color: white;
font-size: max(.8em, 1.2vw);
margin-inline: auto;
text-align: center;

& span{
  cursor: pointer;
}
}

& .alternate{
  width:50%;
min-width: 200px;
}

& .sign-in-opt{
  width:7%;
  min-width: 80px;
  border: 1px solid  rgb(0, 0, 74);
  box-shadow: 5px 5px 5px  rgb(0, 0, 23);
  border-radius: .3em;
  cursor: pointer;
  font-size: max(1em, .8vw);
}
`