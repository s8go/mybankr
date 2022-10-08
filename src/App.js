import React, { createContext, useEffect, useState } from "react";

//Firebase
import { app, database } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  addDoc,
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
import NavBar from "./components/mainpage/NavBar";
import { async } from "@firebase/util";

export const userDetails = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [transactionType, setTransactionType] = useState(false);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const myCollection = collection(database, "users");

  //Get the snapshots after every transactions

  useEffect(() => {
    onSnapshot(myCollection, (data) => {
      if (!currentUser) return;
      data.docs.filter((item) => {
        if (currentUser.email === item.data().email)
          setCurrentUser({ ...item.data(), id: item.id });
      });
    });
  }, [transactionType]);

  //SignUp with google

  /* 
  This is the login code to set the current user : it calls a loginUser function
  which is used to get the user details from the database
  */

  async function validateUser(loggedUser) {
    await signInWithEmailAndPassword(
      auth,
      loggedUser.username,
      loggedUser.password
    ).catch((err) => {
      alert(err.message);
    });

    const fireUsers = await getDocs(myCollection).then((response) => {
      return response.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
    });

    let fireUser = await fireUsers.filter((user) => {
      if (user.email === loggedUser.username) {
        return user;
      }
    });
    setCurrentUser(fireUser[0]);
    // signInWithPopup(auth, provider)
    //   .then((res) => {
    //     console.log(res.user);
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  }

  /* 
  This is the signup code to register a user : it calls a signUser function
  which is used to add the user details to the database
  */

  async function registerUser(newUser) {
    await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((response) => {
        console.log("ACCT CREATED");
        setCurrentUser(newUser);
      })
      .catch((err) => {
        alert(err.message);
      });

    await addDoc(myCollection, {
      fullName: newUser.fullName,
      username: newUser.username,
      password: newUser.password,
      accountBalance: 5000,
      email: newUser.email,
      phone: newUser.phone,
      transactions: [
        { from: "Bankr", amount: 5000, type: "deposit", number: newUser.username.slice(0, 2) + 1 },
      ],
    }).catch((err) => alert(err.message));
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

  //Setting the update callback function

  function updateDataFromServer(
    userToUpdate,
    id,
    sender,
    transactions,
    transNumber,
    transactionType = "deposit"
  ) {
    const docToUpdate = doc(database, "users", id);

    updateDoc(docToUpdate, {
      accountBalance:
        Number(userToUpdate.accountBalance) + Number(transactions.amount),
      transactions: [
        {
          from: sender,
          amount: transactions.amount,
          type: transactionType,
          number: transNumber,
        },
        ...userToUpdate.transactions,
      ],
    })
      .then((res) => {
        console.log("DATA Updated");
        cancelTransaction();
      })
      .catch((err) => {
        console.log("INVALID TRANSACTION");
      });
  }

  function completeTransaction(transactions, transType) {
    let transactionRef =
      currentUser.id.slice(0, 5) + "" + Math.floor(Math.random() * 100000);

    if (transType === "deposit" || transType === "loan") {
      updateDataFromServer(
        currentUser,
        currentUser.id,
        "Bankr",
        transactions,
        transactionRef
      );
    } else if (transType === "transfer") {
      getDocs(myCollection).then((res) => {
        res.docs.map((item) => {
          if (item.data().username === transactions.to) {
            updateDataFromServer(
              item.data(),
              item.id,
              currentUser.username,
              transactions,
              transactionRef,
              "deposit"
            );

            const docToUpdate = doc(database, "users", currentUser.id);

            updateDoc(docToUpdate, {
              accountBalance:
                Number(currentUser.accountBalance) - Number(transactions.amount),
              transactions: [
                {
                  to: item.data().username,
                  amount: transactions.amount,
                  type: transactionType,
                  number: transactionRef,
                },
                ...currentUser.transactions,
              ],
            })
          }
        });
      });
    }
  }

  return (
    <div className="App">
      <userDetails.Provider
        value={{
          currentUser: currentUser,
          validateUser: validateUser,
        }}
      >
        <BrowserRouter>
          <NavBar />
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
        {!currentUser.noUser && <MyAccount />}
        <Login validateUser={validateUser} />
      </userDetails.Provider> */}
    </div>
  );
}

export default App;
