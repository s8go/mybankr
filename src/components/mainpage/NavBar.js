import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


export default function NavBar(){
    const [openMenu, setOpenMenu] = useState(false);
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
      </>
  return (
    <header>
    <nav>

    <ul className="bigScreen">
        {navItems}
      </ul>

      
      <div
        className={openMenu ? "menu-open" : "menu"}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <div className="hamburger"></div>
      </div>

     

      <ul className={openMenu ? "dropdown" : ""}>
        {openMenu && navItems}
      </ul>
    </nav>
    <p className="logo" onClick={()=>Navigate("/home")}>BankR</p>
  </header>

  )
}
