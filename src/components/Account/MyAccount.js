import React, { useContext, useEffect, useState } from "react";
import AccountDetails from "./AccountDetails";
import { userDetails } from "../../App";
import styled from "styled-components";

const MyAccount = ({ initTransaction, completeTransaction, validateUser, users, logout }) => {
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
      {userPresent && (
        <AccountDetails
          completeTransaction={completeTransaction}
          currentUser={currentUser}
          users={users}
          initTransaction={initTransaction}
          logout={logout}
        />
      )}

   

      {error === true ? (
        <div></div>
      ) : (
        <Loading>{userPresent ? "" : <h1>Loading....</h1>}</Loading>
      )}
    </>
  );
};

export default MyAccount;


const Loading = styled.div`
width: 100vw;
height: 100vh;
display: grid;
place-items: center;
color: rgb(152, 152, 152);
font-size: max(1.1em, 1.4vw);
`