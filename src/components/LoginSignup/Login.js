import { useState } from "react";

const Login = ({validateUser}) => {
  const [loggedUser, setLoggedUser] = useState({});

  /*
This is the input onChange function to get input details
*/

  function loginDetails(event) {
    setLoggedUser((curr) => {
      return { ...curr, [event.name]: event.value };
    });
  }

  return (
    <div className="login-wrap">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          validateUser(loggedUser);
        }}
      >
        <div>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={loggedUser.username || ""}
            onChange={(e) => loginDetails(e.target)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={loggedUser.password || ""}
            onChange={(e) => loginDetails(e.target)}
          />
        </div>

        <div>
          <button type="submit">Log In</button>
        </div>
        <div>
          <div className="alternate">
            <h4>or sign in with</h4>
          </div>

          <div>
            <div className="google">Google</div>

            <div className="facebook">Facebook</div>
          </div>
        </div>
      </form>

      <div>
        <p>
          <span>Don't have an account? </span>
          <span>Forgot password? </span>
          <span>Terms</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
