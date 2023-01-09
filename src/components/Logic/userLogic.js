import { app, database } from "../../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,

} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
const auth = getAuth();
const myCollection = collection(database, "users");
const provider = new GoogleAuthProvider();

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

export async function useLogin(loggedUser, message = true) {
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

    });

  return [newUser];
}

export async function signUser(newUser) {
const users = await GetAllUsers();

let [data] = users.filter((user)=>{
  if(user.username === newUser.username){
    return user;
  } return undefined
});

if(data !== undefined){
  return "Username already Exist";
}

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

    return;
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
    .then(()=> setTimeout(()=> meto("cancel"), 5000))
    .catch((err) => {
      console.log("INVALID TRANSACTION");
    });
}

export async function googleSign() {
  let { user } = await signInWithPopup(auth, provider);
  let users = await GetAllUsers();

  const [data] = await users.filter((curr) => {
    if (curr.email === user.email) {
      return curr;
    } return undefined;
  });

  if (data !== undefined){
    return data
  } else {

const newUser =  {
fullName: user.displayName,
username: user.email.slice(0, user.email.indexOf("@")),
accountBalance: 5000,
email: user.email,
transactions: [
  {
    from: "Bankr",
    amount: 5000,
    type: "deposit",
    number: user.email.slice(0, 2) + 1,
  },
],
};

 addDoc(myCollection, newUser)

    return newUser;
}
}


export function signUserOut(){
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});

}
