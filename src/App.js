import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyAccount from "./components/Account/MyAccount";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import allUsers from "./users.json";
// import { signUser, validateUser } from "./components/Logic/userLogic";
import Transfer from "./components/Logic/Transfer";
import NavBar  from "./components/mainpage/NavBar";

export const userDetails = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({noUser: true});
  const [users, setUsers] = useState(allUsers);
  const [transactionType, setTransactionType] = useState(false);

  
  
  //UseEffect to update current User's account balance whenever the users
  useEffect(() => {
    setCurrentUser((c) => {
      return users.filter((user) => {
        if (user.username === currentUser.username) {
          return user;
        }
      })[0];
    });
  }, [users]);
  
  /* 
  This is the login code to set the current user : it calls a loginUser function
  which is used to get the user details from the database
  */

  function validateUser(loggedUser) {
  
    setCurrentUser((c) => {
      return users.filter((user) => {
        if (
          user.password === +loggedUser.password &&
          user.username.toLowerCase() ===
            loggedUser.username.toLocaleLowerCase()
        ) {
          return user;
        }
      })[0];
    });
  }
  
  /* 
  This is the signup code to register a user : it calls a signUser function
  which is used to add the user details to the database
  */

  function registerUser(newUser) {
    users.forEach((user) => {
      if (
        newUser.username.toLowerCase() !== user.username.toLocaleLowerCase() &&
        user.email !== newUser.email &&
        user.phone !== newUser.phone
      ) {
        setUsers([
          ...users,
          {
            fullName: newUser.fullName,
            accountBalance: 5000,
            username:newUser.username,
            email: newUser.email,
            phone: +newUser.phone,
            password: Number(newUser.password),
            transactions: [{ from: "Segoe", amount: 5000, type: "deposit" }],
          },
        ]);
      } else {
        console.log("User Already Exists");
      }
    });
  }

  //Initiate transaction, TransType is the transaction type

  function initTransaction(transType) {
    setTransactionType(transType);
  }

  //Cancel transaction

  function cancelTransaction() {
    setTransactionType(false);
  }

  //Validate transaction, depending on the transaction type


  function completeTransaction(transactions, transType) {
    if (transType === "deposit" || transType === "loan") {
      setUsers(
        users.map((user) => {
          if (
            user.username.toLocaleLowerCase() ===
            currentUser.username.toLocaleLowerCase()
          ) {
            return {
              ...user,
              accountBalance:
                Number(user.accountBalance) + Number(transactions.amount),
              transactions: [
                ...user.transactions,
                {
                  from: "SEGOE",
                  amount: transactions.amount,
                  type: "deposit",
                  number: 419,
                },
              ],
            };
          } else {
            return user;
          }
        })
      );
    } else if (transType === "transfer") {
      setUsers(
        users.map((user) => {
          if (
            user.username.toLocaleLowerCase() ===
              transactions.to.toLocaleLowerCase() &&
            transactions.to.toLocaleLowerCase() !==
              currentUser.username.toLowerCase()
          ) {
            return {
              ...user,
              accountBalance:
                Number(user.accountBalance) + Number(transactions.amount),
              transactions: [
                ...user.transactions,
                {
                  from: currentUser.username,
                  amount: transactions.amount,
                  type: "deposit",
                  number: 419,
                },
              ],
            };
          } else if (
            user.username.toLocaleLowerCase() ===
              currentUser.username.toLowerCase() &&
            transactions.to.toLocaleLowerCase() !==
              currentUser.username.toLowerCase()
          ) {
            return {
              ...user,
              accountBalance:
                Number(user.accountBalance) - Number(transactions.amount),
              transactions: [
                ...user.transactions,
                {
                  to: transactions.to,
                  amount: transactions.amount,
                  type: "transfer",
                  number: 419,
                },
              ],
            };
          } else {
            return user;
          }
        })
      );

      if (
        transactions.to.toLocaleLowerCase() ===
        currentUser.username.toLowerCase()
      ) {
        alert("Invalid Transaction...");
      }
    }

    cancelTransaction();
  }

  return (
    <div className="App">
      <userDetails.Provider value={{
        currentUser: currentUser,
        validateUser: validateUser
      }}>
        <BrowserRouter>

      <NavBar/>
    
      {transactionType !== false && (
        <Transfer
        completeTransaction={completeTransaction}
        cancelTransaction={cancelTransaction}
        transactionType={transactionType}
        />
      )}
          <Routes>
            {/* <Route path="/" element={<MainPage />}></Route> */}
            <Route
              path="/login"
              element={<Login validateUser={validateUser} />}
            ></Route>
            <Route
              path="/signup"
              element={<Signup registerUser={registerUser} />}
            ></Route>
            <Route
              path="/dashboard"
              element={
                <MyAccount
                  initTransaction={initTransaction}
                  completeTransaction={completeTransaction}
                  cancelTransaction={cancelTransaction}
                  validateUser={validateUser}
                />
              }
            ></Route>
            <Route
              path="*"
              element={
                <MyAccount
                  initTransaction={initTransaction}
                  completeTransaction={completeTransaction}
                  cancelTransaction={cancelTransaction}
                />
              }

            ></Route>
          </Routes>
        </BrowserRouter>
      </userDetails.Provider>

      {/* <userDetails.Provider value={currentUser}>
        <Signup registerUser={registerUser} />
        <MyAccount />
        <Login validateUser={validateUser} />
      </userDetails.Provider> */}
    </div>
  );
}

export default App;
