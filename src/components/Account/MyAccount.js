import React, { useContext, useEffect, useState } from "react";
import AccountDetails from "./AccountDetails";
import { userDetails } from "../../App";
import { useNavigate } from "react-router-dom";

const MyAccount = ({ initTransaction, completeTransaction, validateUser }) => {
  const { currentUser: user } = useContext(userDetails);
  const [currentUser, setCurrentUser] = useState();
  const [userPresent, setUserPresent] = useState(false);

  useEffect(() => {
    if (user === null) {
        console.log(localStorage, validateUser);
        validateUser(localStorage);
    } else {
      setCurrentUser({ ...user });
      setUserPresent(true);
    }
  }, [user]);

  return (
    <>
      {userPresent ? (
        <AccountDetails
          initTransaction={initTransaction}
          completeTransaction={completeTransaction}
          currentUser={currentUser}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default MyAccount;
