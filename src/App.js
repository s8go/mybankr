import React, { createContext, useEffect, useState } from "react";

import {
  useLogin,
  signUser,
  updateDataFromServer,
  googleSign,
  GetAllUsers,
  signUserOut
} from "./components/Logic/userLogic";

//Firebase
import { app, database } from "./firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

// Routers
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Components
import MyAccount from "./components/Account/MyAccount";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";

import Transfer from "./components/Logic/Transfer";
import { createGlobalStyle } from "styled-components";
import Success from "./components/Account/Success";



export const userDetails = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [transactionType, setTransactionType] = useState(false);
  const [error, setError] = useState(false);
 const[ allUsers, setAllUsers ] = useState() ;
 const [receiver, setReceiver] = useState("");
  const myCollection = collection(database, "users");

useEffect(()=>{
  async function getUsers(){
    const users = await GetAllUsers();
 setAllUsers(users.sort((a, b) => Math.random() - 0.5))
  }
  getUsers();
}, [])


  useEffect(() => {
    onSnapshot(myCollection, (data) => {
      if (!currentUser) return;
      data.docs.filter((item) => {
        let email = String(item.data().email).toLowerCase();

        if (currentUser.email.toLowerCase() === email) {
          setCurrentUser({ ...item.data(), id: item.id });
        }

        return item;
      });
    });
  }, [transactionType]);

  /* 
  This is the login code to set the current user : it calls a loginUser function
  which is used to get the user details from the database
  */

  async function validateUser(loggedUser, message=true) {
    const [deeUser] = await useLogin(loggedUser, message);
    setCurrentUser(deeUser);
  }

  //SignUp with google


  async function googleValidate(sys) {
 const signedUser = await googleSign();
  setCurrentUser(signedUser);
  }

  /* 
  This is the signup code to register a user : it calls a signUser function
  which is used to add the user details to the database
  */

  async function registerUser(newUser) {
   let message = await signUser(newUser);
    await validateUser(newUser);

    return message;
  }

  // Sign out function to remove the current user details

function logout(){
  signUserOut()
}
  //Initiate transaction, TransType is the transaction type

  function initTransaction(transType, transfer="") {
    setTransactionType(transType);
    setReceiver(transfer)
  }

  //Cancel transaction

  function cancelTransaction(cancel) {
   if( cancel === "cancel")  setTransactionType(false);
   else setTransactionType("success");

 
  }

  //Validate transaction, depending on the transaction type

  async function completeTransaction(transactions, transType) {
    let transactionRef =
      currentUser.id.slice(0, 5) + "" + Math.floor(Math.random() * 100000);

    if (transType === "deposit" || transType === "loan") {
      await updateDataFromServer({
        userToUpdate: currentUser,
        id: currentUser.id,
        sender: "Bankr",
        transactions: transactions,
        transNumber: transactionRef,
        transactionType: "deposit",
        meto: function() {
          cancelTransaction();
        },
      });
    } else if (transType === "transfer") {
      getDocs(myCollection).then((res) => {
        res.docs.map((item) => {
          let username = String(item.data().username);

          if (username.toLowerCase() === transactions.to.toLowerCase()) {
            updateDataFromServer({
              userToUpdate: item.data(),
              id: item.id,
              sender: currentUser.username,
              transactions: transactions,
              transNumber: transactionRef,
              transactionType: "deposit",
              meto: function(x) {
                cancelTransaction(x);
              },
            });

            const docToUpdate = doc(database, "users", currentUser.id);

            updateDoc(docToUpdate, {
              accountBalance:
                Number(currentUser.accountBalance) -
                Number(transactions.amount),
              transactions: [
                {
                  to: item.data().username,
                  amount: transactions.amount,
                  type: transactionType,
                  number: transactionRef,
                },
                ...currentUser.transactions,
              ],
            });
          }
          return item;
        });
      });
    }
  }

  
  return (
    <div>

      <Global/>
      <userDetails.Provider
        value={{
          currentUser: currentUser,
          validateUser: validateUser,
          error: error,
          setError: setError,
        }}
      >
        <BrowserRouter>
        

          
          {transactionType !== false && transactionType !== "success" && (
            <Transfer
              completeTransaction={completeTransaction}
              cancelTransaction={cancelTransaction}
              transactionType={transactionType}
              receiver={receiver}
            />
          )}

          {
            transactionType === "success" && (
              <Success cancel={cancelTransaction}/>
            )
          }

        

          <Routes>

            <Route
              path="/login"
              element={
                <Login
                  validateUser={validateUser}
                  googleValidate={googleValidate}
                />
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <Signup
                  registerUser={registerUser}
                  googleValidate={googleValidate}
                />
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                <MyAccount
                  initTransaction={initTransaction}
                  completeTransaction={completeTransaction}
                  cancelTransaction={cancelTransaction}
                  validateUser={validateUser}
                  users={allUsers}
                  logout={logout}
                
                />
              }
            ></Route>
            <Route
               path="*"
               element={
                 <Login
                   validateUser={validateUser}
                   googleValidate={googleValidate}
                 />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </userDetails.Provider>

    </div>
  );
}

export default App;



const Global = createGlobalStyle`
body {
  padding: 0;
  margin: 0;
  background-color: rgb(0, 0, 38);
}`
