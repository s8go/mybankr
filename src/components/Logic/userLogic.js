/*
This is the signUser function to register user
*/

export function signUser(users, newUser) {
  users = [...users, {
    ...newUser,
    fullName: newUser.firstName + newUser.lastName,
    accountBalance: "20.00",
    username: newUser.firstName[0] + newUser.lastName[0]
  }];
  return users;
}

/*
This is the loginUser function to get current user's details
*/

export function loginUser(users, loggedUser) {
  
  return users.filter((user) => {
    if (
      user.username === loggedUser.username &&
      +user.password === +loggedUser.password
      ) {
        console.log(user)
        return user;
      }
  })[0]
}
