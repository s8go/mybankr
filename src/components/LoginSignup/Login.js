import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaGoogle} from "react-icons/fa";

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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        className="bg-red-500"
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
    </div>
  );
};

export default Login;
