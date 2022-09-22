import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ validateUser }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const Navigate = useNavigate(); 

  /*
This is the input onChange function to get input details
*/

useEffect(()=>{
setTimeout(()=>{
  if(signedIn) Navigate("/my-account");
}, 300)
}, [signedIn])

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
          setSignedIn(true)
        }}
      >
        <div className="input-div">
          <input
            type="text"
            placeholder="username"
            name="username"
            value={loggedUser.username || ""}
            onChange={(e) => loginDetails(e.target)}
          />
        </div>

        <div className="input-div">
          <input
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
        <div>


          {/* <div className="sign-in-opt">
          <div className="alternate">
            <h4>or sign in with</h4>
          </div>
            <div className="google">Google</div>

            <div className="facebook">Facebook</div>
          </div> */}
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
