import React, { createContext, useEffect, useState } from "react";
import {
  FaHome,
  FaMoneyCheck,
  FaMobile,
  FaTools,
  FaUserAlt,
} from "react-icons/fa";

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
import Transactions from "./components/Account/Transactions";

export const userDetails = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [transactionType, setTransactionType] = useState(false);
  const [error, setError] = useState(false);
  const [display, setDisplay] = useState("dashboard");
  const auth = getAuth();
  const myCollection = collection(database, "users");
  const provider = new GoogleAuthProvider();

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

  /* 
  This is the login code to set the current user : it calls a loginUser function
  which is used to get the user details from the database
  */

 console.log(window.localStorage)

  async function validateUser(loggedUser) {
    await signInWithEmailAndPassword(
      auth,
      loggedUser.email,
      loggedUser.password
    ).catch((err) => {
      alert("Invalid user details...Please signup or login with correct details");
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

          return null;
        });
      })
      .catch((err) => {
        setError(true);
        console.log(err.message);
      });
  }

  //SignUp with google

  async function googleValidate(sys) {
    // let user;

    // await signInWithPopup(auth, provider)
    //   .then((res) => {
    //     user = {
    //       fullName: res.user.displayName,
    //       username: res.user.email.slice(0, res.user.email.indexOf("@")),
    //       email: res.user.email,
    //     };
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });

    // await userAdd();

    // function userAdd() {
    //   if (sys === "signup") {
    //     addDoc(myCollection, {
    //       ...user,
    //       accountBalance: 5000,
    //       transactions: [
    //         {
    //           from: "Bankr",
    //           amount: 5000,
    //           type: "deposit",
    //           number: user.username.slice(0, 2) + 1,
    //         },
    //       ],
    //     }).then((res) => console.log("User Added", res));
    //   } else if (sys === "login") {
    //     getDocs(myCollection)
    //       .then((response) => {
    //         return response.docs.map((item) => {
    //           return { ...item.data(), id: item.id };
    //         });
    //       })
    //       .then((data) => {
    //         data.filter((fetchUser) => {
    //           let email = String(fetchUser.email).toLowerCase();
    //           if (email === user.email.toLowerCase()) setCurrentUser(fetchUser);
    //         });
    //       })
    //       .catch((err) => {
    //         setError(true);
    //         console.log(err.message);
    //       });
    //   }
    // }
    alert("Not Available")
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

        addDoc(myCollection, {
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
        })
      })
      .catch((err) => {
       alert(err.message.slice(err.message.indexOf("(") + 1, err.message.lastIndexOf(")")) + " ...Please Login instead")
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

              <p>Please visit our homepage to register or login</p>
            </div>
          )}

        {
          currentUser &&   <div className="my-profile">
          <ul>
            <li>
              <p onClick={() => setDisplay("transaction")}>
                <FaMoneyCheck />{" "}
              </p>
            </li>

            <li>
              <p>
                <FaMobile />
              </p>
            </li>

            <li>
              <p onClick={() => setDisplay("dashboard")}>
                <FaHome />
              </p>
            </li>
            <li>
              <p>
                <FaTools />
              </p>
            </li>

            <li>
              <p>
                <FaUserAlt />
              </p>
            </li>
          </ul>
        </div>
        }

          <Routes>
            {/* <Route path="/dashboard/transactions" element={ <Transactions/>}></Route> */}

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
                  display={display}
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
                  validateUser={validateUser}
                  display={display}
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
