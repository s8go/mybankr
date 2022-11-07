import React, { useContext, useEffect, useState } from "react";
import AccountDetails from "./AccountDetails";
import { userDetails } from "../../App";
import Transactions from "./Transactions";

const MyAccount = ({ initTransaction, completeTransaction, validateUser, display }) => {
  const { currentUser: user, error } = useContext(userDetails);
  const [currentUser, setCurrentUser] = useState();
  const [userPresent, setUserPresent] = useState(false);
  
 

  useEffect(() => {
    if (user === null && validateUser !== undefined) {
      validateUser(localStorage, false);
    } else {
      setCurrentUser({ ...user });
      setUserPresent(true);
    }
  }, [user]);

  return (
    <>
      {userPresent && display === "dashboard" && (
        <AccountDetails
          completeTransaction={completeTransaction}
          currentUser={currentUser}
        />
      )}

      {
        userPresent && display === "transaction" && <Transactions initTransaction={initTransaction}/>
      }

      {error === true ? (
        <div></div>
      ) : (
        <div className="loading">{userPresent ? "" : <h1>Loading....</h1>}</div>
      )}
    </>
  );
};

export default MyAccount;
