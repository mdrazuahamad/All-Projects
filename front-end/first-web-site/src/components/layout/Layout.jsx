/** @format */

import { Link } from "@reach/router";
import classes from "./Layout.module.css";

function Layout(props) {
  const path = window.location.pathname;
  return (
    <div>
      <nav className={classes.nav}>
        <div>
          <h2>MaanRishfa IT Solution</h2>
        </div>
        <div className={classes.menu}>
          <ul>
            <li>
              <Link
                to="/"
                className={path === "/" ? classes.navItemActive : classes.navItem}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className={path === "/about" ? classes.navItemActive : classes.navItem}>
                About
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className={path === "/contact" ? classes.navItemActive : classes.navItem}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className={classes.main}>{props.children}</main>
      <footer className={classes.footer}>
        <p>CopyRight@2025</p>
        <p>Developed By MD Razu Ahamad</p>
      </footer>
    </div>
  );
}

export default Layout;
