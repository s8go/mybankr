import React from "react";

const BottomNav = () => {
  return (
    <div className="my-profile">
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
  );
};

export default BottomNav;
