import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Transactions from "./Transactions";
import profile_img from "../../images/profile.webp"
import { FaMoon, FaSun } from "react-icons/fa";
import {DesktopNavBar} from "../NavBar/DesktopNavBar";
import MobileNav from "../NavBar/MobileNav";

// import { useNavigate } from "react-router-dom";
// import {userDetails} from "../../App"\\

// import Login from "../LoginSignup/Login";

const AccountDetails = ({
  initTransaction,
  completeTransaction,
  currentUser,
}) => {

  console.log(currentUser.username, "username")

  const today = new Date();

  return (
    <Dashboard>
     {
      currentUser.username !== undefined && <div>
       <MobileNav/>
      <DesktopNavBar/>
      </div>
     }

      {currentUser.hasOwnProperty("transactions") && (
        <MyAccountInfo>
          <div className="account-name">
          <img src={profile_img} alt="Display" />
            <h3>{`Hello, ${currentUser.username || ""}`}</h3>
            <p>{currentUser.email}</p>
          </div>

          <div className="account-balance">
            <h3>Account Balance</h3>
            <h6>$ {currentUser.accountBalance || 0.0}</h6>
            <p>{today.toLocaleString()}</p>
          </div>

          <Card>
            <div className="card">
              <h3>Card</h3>
              <div className="name"></div>
            </div>

            <div className="details">
              <h2 className="name">{currentUser.username}</h2>
              <h4>Exp. 08/24</h4>
            </div>

            <div>
              <h3>**** **** **** 3245</h3>
              <h1>Visa</h1>
            </div>
          </Card>

       <Transactions initTransaction={initTransaction}/>
        </MyAccountInfo>
      )}

      {currentUser.hasOwnProperty("transactions") && (
        <Transact>
         <div className="top">
          <FaSun/>
         <p>{currentUser.email}</p>
         </div>

          <h5>Transfer To:</h5>
          <div className="transfer-to">
            <div>
              <img src={profile_img} alt="Display" />
              <p>jamse45</p>
            </div>

            <div>
              <img src={profile_img} alt="Display" />
              <p>jamse45</p>
            </div>

            <div>
              <img src={profile_img} alt="Display" />
              <p>jamse45</p>
            </div>
          </div>
          <h5>Recent Transactions:</h5>
          <Recent>
                    <p>s/n</p>

                    <h4>From/To</h4>

                    <p>Details</p>

                    <p>Amount</p>
                  </Recent>

          {currentUser.transactions !== undefined &&
            currentUser.transactions.map((trans, i) => {
              if (i + 1 <= 5) {
                return (
                  <Recent key={i * Math.floor(Math.random() * 100000)}>
                    <p>{i + 1}</p>

                    <h4>{trans.from || trans.to}</h4>

                    <p>{trans.number}</p>

                    <p style={trans.to ? { color: "red" } : {color: "rgb(0, 223, 0)"}} className="amount">{trans.to ? "-" : "+"}${trans.amount}</p>
                  </Recent>
                );
              }

              return null;
            })}
        </Transact>
      )}

      {currentUser.hasOwnProperty("transactions") === false && (
        <Redirect>
         <div>
          <h1>User Not Found.</h1>
        <div> <Link to={"/login"} className="login">Login</Link> <Link to={"/signup"} className="signup">Signup</Link></div>
         </div>
        </Redirect>
      )}
    </Dashboard>
  );
};

export default AccountDetails;

const Redirect = styled.div`
width: 100%;
height: 100vh;
display: grid;
place-items: center;
text-align: center;

& h1 {
  color: rgb(152,152, 152);
  font-size: max(1.8vw, 1.8em);
}

& > div {
  & div{
    display: flex;
    justify-content: space-between;
    margin-top: 2em;
  }
}
& a{
  text-decoration: none;
  font-size: max(1em, 1vw);
  color: white;
  display: inline-block;
  width: 37%;
  margin-inline: auto;
  padding: .7em .5em;
  border-radius: .5em;
  transition: .4s;
}

& .login{
  background: white;
 color: black;
}

& .signup{
    box-shadow: 7px 7px 5px  rgb(0, 0, 23);
}
`

const Dashboard = styled.div`    
background-color: rgb(0, 0, 38);
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
min-width: fit-content;
height: 100%;
padding: .5em;
// padding-top: 10em;
margin:0;
font-family: Verdana, Geneva, Tahoma, sans-serif;
color: rgb(255, 255, 255);

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
    padding: 3em;
    padding-top: 5.3em;
  }
`;

const MyAccountInfo = styled.div`
  padding: 0 0.5em;
  width: 100%;
  text-align: center;
  color: white;
  
  & .account-balance {
    width: 100%;
    color: rgb(152, 152, 152);
    
    & h3 {
      font-size: max(1em, 1.5vw);
      margin: 0;
      margin-top: 3em;
    }
    
    & h6 {
      font-size: max(2em, 3.5vw);
      margin-top: 0.3em;
    }
    
    & p {
      margin-top: -3em;
    }
  }
  
  @media screen and (min-width: 1024px) {
    text-align: left;
    width: 45%;

    & .account-balance{
      & p{
        margin-top: -5em;
      }

      & h3{
        margin-top: 0;
      }
    }
  }
  
  & .account-name {
    margin-top: 5em;

    & h3 {
      font-size: max(1.5em, 2.4vw);
    }
    
    & p {
      font-size: max(1.2em, 1.5vw);
      margin-top: -0.6em;
    }

    & img{
      display: inline-block;
      width:20%;
      border-radius: .5em;
      opacity: .5;
    }

    @media screen and (min-width: 1024px) {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      margin-top:0;
      flex-direction: column;

      & img{
        width: 10%;
      }

      & p {
        margin-top: 0;
        display: none;
      }
    }
  }
`;

const Card = styled.div`
  background: linear-gradient(to bottom left, green, red);
  padding: 1.4em 2em;
  border-radius: 1em;
  width: min(80%, 400px);
  min-width: fit-content;
  margin-inline: auto;

  & .card h3,  & .details h4{
    font-size: max(.8em, .8vw);
    font-weight: 900;
  }

  & .details h2{
    font-size: max(1.2em, 1.2vw);
  }



  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & h3{
      font-size: max(1em, 1vw);
      font-weight: lighter;

    }

    & h1{
      font-size: max(1.4em, 1.4vw);
    }
  }

  & .card .name {
    background: black;
    width: 40px;
    height: 7px;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    position: relative;
  }

  & .card .name:after {
    content: "";
    position: absolute;
    top: 0.8em;
    background: black;
    width: 40px;
    height: 14px;
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
  }

  @media screen and (min-width: 1024px) {
    margin-left: 0;
  }
`;

const Transact = styled.div`
  width: 94%;
  color: white;
  text-align: center;
  padding: 1.2em;
  margin-top: 3em;
  height: 100%;
  min-height: 600px;
  background-color: rgb(0, 0, 73, 0.4);
  border-radius: 2em;
  box-shadow: 5px 5px 5px  rgb(0, 0, 23);

  & .top{
  display: none;
  }

  & > h5 {
    font-size: max(1.1em, 1vw);
    font-weight: lighter;
  }

  & img{
    opacity: .8;
    display: inline-block;
    width:40%;
    border-radius: .5em;
  }

  & .transfer-to {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin: auto;

    & div {
      text-align: center;
      width: 25%;
      margin: 0.5em;
      cursor:pointer;
    }

    & p {
      font-size: max(.8em, .8vw);
    color: rgb(152, 152, 152);
    }
  }

  @media screen and (min-width: 1024px) {
    width: 50%;
    text-align: left;
    margin-top: 0;

    & .top {
      display: flex;
      font-size: max(1em, 1vw);
      margin-bottom: 7em;
      align-items: center;
      justify-content: space-between;

    
      & svg{
        display:block;
        cursor: pointer;
        font-size: max(1.3em, 1.2vw);
      }
     
    }

    & .transfer-to {
      margin-left: 0;
    }
  }
`;

const Recent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  border-bottom: 1.5px solid rgb(152, 152, 152);

  & h4, & p {
  font-size: max(1em, 1.2vw);
  font-weight: lighter;
  }

  & .amount{
     font-size: max(1.3em, 1.4vw);
  font-weight: bolder;

  }

  @media screen and (min-width: 1024px) {
    margin-left: 0;
  }
`;


