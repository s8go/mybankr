import React from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import {userDetails} from "../../App"\\

// import Login from "../LoginSignup/Login";

const AccountDetails = ({
  initTransaction,
  completeTransaction,
  currentUser,
}) => {
  return (
    <div>
      {currentUser.hasOwnProperty("transactions") && (
        <div className="my-account">
          <div className="account-details">
            <div className="account-name">
              <h3>{`Hello, ${currentUser.username || ""}`}</h3>
              <p>{currentUser.email}</p>
            </div>

            <div className="account-balance">
              <h3>Account Balance</h3>
              <h6>{currentUser.accountBalance || 0.0}</h6>
            </div>
          </div>
        </div>
      )}

      {currentUser.hasOwnProperty("transactions") && (
        <div className="recent-transaction">
          <h5>Recent Transactions</h5>

          {currentUser.transactions !== undefined &&
            currentUser.transactions.map((trans, i) => {
              if (i + 1 <= 5) {
                return (
                  <div
                    className="trans-record"
                    key={i * Math.floor(Math.random() * 100000)}
                  >
                    <div className="details">
                      <h4>{trans.from || trans.to}</h4>

                      <p>{trans.number}</p>
                    </div>

                    <div className="price">
                      <p style={trans.to && { color: "red" }}>{trans.amount}</p>
                    </div>
                  </div>
                );
              }

              return null;
            })}
        </div>
      )}

{
      currentUser.hasOwnProperty("transactions") === false && <div className="redirects">
      <Link to={"/login"}>Login</Link><p>OR</p> <Link to={"/signup"}>Signup</Link>
      </div>
    }
    </div>
  );
};

export default AccountDetails;
