import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from "../../images/Bankr.png"

export function DesktopNavBar(){
    const Navigate = useNavigate();

    function logout(){
     Navigate("/login");
     localStorage.clear()
    }
    const navItems = <>

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

        <li>
    <img src={Logo} alt="Logo" onClick={()=>Navigate("/login")}/>
     </li>

      </>
  return (
 
   

    <Desktop>
      <ul>
      {navItems}
      </ul>

        </Desktop>
   
 

  )
}

const Desktop = styled.nav`
background:  rgb(0, 0, 38);
position: fixed;
top: 0;
left: 0;
width: 100%;
z-index: 10000;
padding: 0;
box-shadow: 5px 5px 5px  rgb(0, 0, 23);

ul{
  display: flex;
  justify-content: space-around;
  margin:0.1em;
  
  li{
    list-style: none;
    text-align: center;
    cursor: pointer;
    color: rgb(152, 152, 152);
    transition: .5s;
    font-size:max(.9em, 1vw);

    &:hover{
    color: white;
    }

    img{
      display: block;
      width: 20%;
      margin: auto;
    }
  }
}

@media screen and (max-width: 1023px){
display: none;
}
`


