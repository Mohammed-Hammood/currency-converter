import {NavLink } from "react-router-dom";
import classes from "../styling/MainHeader.module.css";


const NavBar = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink activeclassname={classes.active} to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink activeclassname={classes.active} to='/currencies'>Currencies</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
