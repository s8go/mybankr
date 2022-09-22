import React, { useContext } from "react";
import { userDetails } from "../../App";

const AccountDetails = () => {
  const currentUser = useContext(userDetails);

  return (
    <>
      <div className="my-account">
        <div className="account-details">
          <div className="account-name">
            <h3>{`Hello, ${currentUser.fullName || ""}`}</h3>
          </div>

          <div className="account-balance">
            <h3>Account Balance</h3>
            <h6>{currentUser.accountBalance || 0.0}</h6>
          </div>
        </div>

        <div className="transaction-list">
          <div className="transactions deposit">deposit</div>

          <div className="transactions withdraw">withdraw</div>

          <div className="transactions transfer">transfer</div>

          <div className="transactions saving">saving</div>

          <div className="transactions loan">loan</div>

          <div className="transactions Pay Bills">Pay Bills</div>
        </div>
      </div>

      <div className="recent-transaction">
        <h5>Recent Transactions</h5>

        <div className="trans-record">
          <div className="details">
            <h4>Owzbi</h4>
            <p>01:45 PM</p>
          </div>

          <div className="price">
            <p>5000</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
