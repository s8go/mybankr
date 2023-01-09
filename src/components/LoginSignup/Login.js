import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../images/Bankr.png"

const Login = ({ validateUser, googleValidate }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const Navigate = useNavigate();


  /*
This is the input onChange function to get input details
*/

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
        <div className="sign-in-opt"   onClick={async () => {
            await googleValidate();
             setSignedIn(true)
            }}>
              
          <p>
          <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
  </g>
</svg>
          </p>
        </div>

        <p className="alternate">
          <span>Don't have an account?</span>
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
  transition:.3s;

  &:hover{
    background-color:rgb(152, 152, 152);
  }
}
`
export const SignInOpt = styled.div`
margin-top: 3em;
text-align: center;
display: grid;
place-items: center;
width: 100%;


& p, & .sign-in-opt{
  color: white;
font-size: max(.8em, 1.2vw);
margin-inline: auto;
text-align: center;
transition: .3s;

&:hover{
  color:rgb(152, 152, 152);
}

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