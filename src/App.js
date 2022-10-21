import React, { createContext, useEffect, useState } from "react";

//Firebase
import { app, database } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
import Transactions from "./components/Account/Transactions";

export const userDetails = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [transactionType, setTransactionType] = useState(false);
  const [error, setError] = useState(false);
  const [display, setDisplay] = useState("dashboard")
  const auth = getAuth();
  const myCollection = collection(database, "users");

  // const provider = new GoogleAuthProvider();
  //Get the snapshots after every transactions

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

  // console.log(currentUser);

  //SignUp with google

  /* 
  This is the login code to set the current user : it calls a loginUser function
  which is used to get the user details from the database
  */

 async function validateUser(loggedUser) {
   await signInWithEmailAndPassword(
      auth,
      loggedUser.email,
      loggedUser.password
    ).catch((err) => {
      alert(err.message);
    });

    await getDocs(myCollection)
      .then((response) => {
        return response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        });
      })
      .then((data) => {
        data.filter((user) => {
          let email = String(user.email).toLowerCase();
          if (
            email === loggedUser.email.toLowerCase() &&
            user.password === loggedUser.password
          )
            setCurrentUser(user);
          // else if (
          //   email !== loggedUser.email &&
          //   user.password !== loggedUser.password
          // )
          //   console.log("User Not Found!");
          // else if (
          //   email === loggedUser.email &&
          //   user.password !== loggedUser.password
          // )
          //   console.log("Wrong Password");
          // return null;
        });
      })
      .catch((err) => {
        setError(true);
        console.log(err.message);
      });

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
        {
          from: "Bankr",
          amount: 5000,
          type: "deposit",
          number: newUser.username.slice(0, 2) + 1,
        },
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
          let username = String(item.data().username);

          if (username.toLowerCase() === transactions.to.toLowerCase()) {
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
    <div className="App">
      <userDetails.Provider
        value={{
          currentUser: currentUser,
          validateUser: validateUser,
          error: error,
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

          {error && (
            <div
              style={{
                width: "80vw",
                height: "50vh",
                minHeight: "80px",
                margin: "auto",
                marginTop: "20%",
              }}
            >
              <h1
                style={{
                  fontSize: "1.2em",
                }}
              >
                Can't find user 😢
              </h1>

              <p>
                Please visit our homepage to register or login
              </p>
            </div>
          )}

          <ul className="my-profile">
            <li>
              <p onClick={()=>setDisplay("dashboard")}>H</p>
            </li>

            <li>
              <p onClick={()=>setDisplay("transaction")}>Pay</p>
            </li>

            <li>
              <p>H</p>
            </li>

            <li>
              <p>H</p>
            </li>

            <li>
              <p>H</p>
            </li>
          </ul>


          <Routes>
            {/* <Route path="/dashboard/transactions" element={ <Transactions/>}></Route> */}

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
                  display={display}
                />
              }
            ></Route>
            <Route
              path="*"
              element={  <MyAccount
                  initTransaction={initTransaction}
                  completeTransaction={completeTransaction}
                  cancelTransaction={cancelTransaction}
                  validateUser={validateUser}
                  display={display}
                />}
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
