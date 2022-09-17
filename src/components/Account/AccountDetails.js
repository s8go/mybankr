import React, { useContext } from "react";
import { userDetails } from "../../App";

const AccountDetails = () => {
  const currentUser = useContext(userDetails);

  return (
    <div>
      <div className="account-details">
        <div className="details">
        <div className="account-name">
  
          <h3>{`Hello, ${currentUser.fullName || ""}`}</h3>
          </div>


          <div className="account-balance">
          <h6>Account Balance</h6>
          <h3>{currentUser.accountBalance || 0.0}</h3>
          </div>


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
  );
};

export default AccountDetails;
