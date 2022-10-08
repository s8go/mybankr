import React from "react";
// import {userDetails} from "../../App"


const AccountDetails = ({ initTransaction, completeTransaction , currentUser}) => {
  
  
 

  return (
    <>
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

        <div className="transaction-list">
          <div
            className="transactions deposit"
            onClick={() => initTransaction("deposit")}
          >
            deposit
          </div>

          <div className="transactions withdraw">withdraw</div>

          <div
            className="transactions"
            onClick={() => initTransaction("transfer")}
          >
            transfer
          </div>

          <div className="transactions saving">saving</div>

          <div
            className="transactions loan"
            onClick={() => initTransaction("loan")}
          >
            loan
          </div>

          <div className="transactions Pay Bills">Pay Bills</div>
        </div>
      </div>

      <div className="recent-transaction">
        <h5>Recent Transactions</h5>

        {currentUser.transactions !== undefined && currentUser.transactions.map((trans, i) => {
          return (
            <div className="trans-record" key={i * Math.floor(Math.random() * 100000)}>
              <div className="details">
                <h4>{trans.from || trans.to}</h4>

                <p>{trans.number}</p>
              </div>

              <div className="price">
                <p style={trans.to && { color: "red" }}>{trans.amount}</p>
              </div>
            </div>
          );
        })}

        {
          // currentUser.transactions
        }
      </div>
    </>
  );
};

export default AccountDetails;
