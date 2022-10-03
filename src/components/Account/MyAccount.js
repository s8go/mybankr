import React, { useContext, useEffect, useState } from "react";
import AccountDetails from "./AccountDetails";
import { userDetails } from "../../App";
import { useNavigate } from "react-router-dom";

const MyAccount = ({ initTransaction, completeTransaction ,  validateUser}) => {
  const { currentUser: user} = useContext(userDetails);
  const [currentUser, setCurrentUser] = useState();
  const [userPresent, setUserPresent] = useState(false);

  useEffect(() => {
    if (user.noUser) {
    validateUser(localStorage)
      console.log("Hello")
    } else {
      setCurrentUser({ ...user });
      setUserPresent(true);
    }
  },[]);
  console.log(user)


  return (
    <>
      {userPresent && (
        <AccountDetails
          initTransaction={initTransaction}
          completeTransaction={completeTransaction}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default MyAccount;
