import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ registerUser }) => {
  const [newUser, setNewUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const Navigate = useNavigate();

  /*
This is the input onChange function to get input details
*/

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setErrorMessage("")
  //   }, 300)
  // }, [errorMessage])

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
      Navigate("/login");
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
          <input type="submit" value="submit" />
        </div>
      </form>

      <div>
        <div className="sign-in-opt">
          <div className="google">Google</div>
        </div>
        <p>
          <span className="signup" onClick={() => Navigate("/login")}>
            Already a user? Log In{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
