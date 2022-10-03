import React,{ useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../../App";

const Login = ({ validateUser }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  // const [typing, setTyping] = useState(false);
  const Navigate = useNavigate();
  const user = useContext(userDetails);

  /*
This is the input onChange function to get input details
*/

  useEffect(() => {
    setLoggedUser({
      username: localStorage.username,
      password: localStorage.password,
    });
    setTimeout(() => {
      if (signedIn && user) {
        Navigate("/dashboard");
      } else {
        setSignedIn(false);
      }
    }, 300);
  }, [signedIn]);

  function loginDetails(event) {
    setLoggedUser((curr) => {
      return { ...curr, [event.name]: event.value };
    });
  }

  function submitForm() {
    validateUser(loggedUser);
    setSignedIn(true);

    localStorage.username = loggedUser.username;
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
            placeholder="username"
            name="username"
            value={loggedUser.username || ""}
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
          <span className="signup" onClick={() => Navigate("/signup")}>
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
