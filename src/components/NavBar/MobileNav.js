import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../images/Bankr.png";
import Hamburger from "../../images/icon-hamburger.svg";
import Close from "../../images/icon-close.svg";
import { useNavigate } from "react-router-dom";

const MobileNav = () => {
  const [isOpened, setOpened] = useState(false);
  const Navigate = useNavigate();

  function handleMenu() {
    setOpened(!isOpened);
  }


  function logout(){
   Navigate("/login");
   localStorage.clear()
  }

  return (
    <Mobile>
      <div>
        <img
          src={isOpened ? Close : Hamburger}
          alt="menu"
          className="menu"
          onClick={handleMenu}
        />
        <img src={Logo} alt="Logo" />
      </div>

      <ul className={isOpened ? "menu-list" : ""}>
        <li>
          <p>Help</p>
        </li>
        <li>
          <p>About BankR</p>
        </li>
        <li>
          <p>Terms</p>
        </li>
        <li>
          <p>Privacy Policies</p>
        </li>
        <li>
        <p onClick={logout}>Log out</p>
        </li>
      </ul>
    </Mobile>
  );
};

export default MobileNav;

const Mobile = styled.nav`
  background: rgb(0, 0, 38);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  padding: 0;
  box-shadow: 5px 5px 5px rgb(0, 0, 23);

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 0.5em;

    & img {
      display: inline-block;
      width: 35px;
      height: 30px;
    }

    & .menu {
      display: inline-block;
      width: 15px;
      height: 12.5px;
      cursor: pointer;
    }
  }

  & ul{
    background: rgb(0, 0, 38);
    height: 100vh;
    min-height:200px;
    width: 100%;
    transform: translateX(-100%);
    position: fixed;
    top: 15px;
    transition: .4s;
    transition-timing-function: ease-in;
    text-align: left;
    padding: 0;

    & li{
        list-style: none;
        width: 30%;
        margin: auto;
        margin-top: 2em;
        text-align: left;
        cursor:pointer;
        color: rgb(152, 152, 152);
        font-size:max(.8em, .8vw);
        transition: .5s;
    
        &:hover{
        color: white;
        }
    }
  }

& .menu-list{
    transform: translateX(0%);
}

  @media screen and (min-width: 1024px) {
    display: none;
  }
`;
