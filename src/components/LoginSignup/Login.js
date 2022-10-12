import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ validateUser }) => {
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
    <div className="login-wrap">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <div className="input-div">
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
        </div>

        <div className="input-div">
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            value={loggedUser.password || ""}
            onChange={(e) => loginDetails(e.target)}
          />
        </div>

        <div className="input-div">
          <input type="submit" value={signedIn ? "Loading..." : "Log In"} />
        </div>
        <div></div>
      </form>

      <div>
        <p>
          <span className="signup" onClick={() => {
            Navigate("/signup");
            console.log("Signup")
          }}>
            Don't have an account?{" "}
          </span>
          <span>Forgot password? </span>
          <span>Terms</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
