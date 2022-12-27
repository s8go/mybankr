import { app, database } from "../../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // GoogleAuthProvider,
  // signInWithPopup,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  // onSnapshot,
} from "firebase/firestore";
const auth = getAuth();
const myCollection = collection(database, "users");
// const provider = new GoogleAuthProvider();

export async function GetAllUsers() {
  let users;
  await getDocs(myCollection)
    .then((response) => {
      return response.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
    })
    .then((data) => {
      users = [...data];
    })
    .catch((err) => {
      console.log(err.message);
    });
  return users;
}

export async function useLogin(loggedUser, message=true) {
  let users = await GetAllUsers();
  let newUser;
  await signInWithEmailAndPassword(auth, loggedUser.email, loggedUser.password)
    .then(() => {
      users.filter((user) => {
        let email = String(user.email).toLowerCase();
        if (
          email === loggedUser.email.toLowerCase() &&
          user.password === loggedUser.password
        )
          newUser = { ...user };
        return null;
      });
    })
    .catch((err) => {
      if (message)
        alert(
          "Invalid user details...Please signup or login with correct details"
        );
    });

  return [newUser];
}

export async function signUser(newUser) {
  console.log(app);

  await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
    .then((response) => {
      addDoc(myCollection, {
        fullName: newUser.fullName,
        username: newUser.username,
        password: newUser.password,
        accountBalance: 5000,
        email: newUser.email,
        transactions: [
          {
            from: "Bankr",
            amount: 5000,
            type: "deposit",
            number: newUser.username.slice(0, 2) + 1,
          },
        ],
      });

      console.log("Account Created");
      localStorage.email = newUser.email;
      localStorage.password = newUser.password;
    })
    .catch((err) => {
      alert(
        err.message.slice(
          err.message.indexOf("(") + 1,
          err.message.lastIndexOf(")")
        ) + " ...Please Login instead"
      );
    });
}

export function updateDataFromServer({
  userToUpdate,
  id,
  sender,
  transactions,
  transNumber,
  transactionType = "deposit",
  meto,
}) {
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
      meto();
    })
    .catch((err) => {
      console.log("INVALID TRANSACTION");
    });
}
