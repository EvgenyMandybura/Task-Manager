import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import styles from "./index.module.scss";
import { NavLink as NavLinkRoute } from "react-router-dom";

const SubMenu = () => {
  return (
    <div className={styles.navMenu}>
      <Nav vertical>
        <NavItem>
          <NavLink to={"/boards"} tag={NavLinkRoute}>
            Boards
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={"/reports"} tag={NavLinkRoute}>
            Reports
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={"/profile"} tag={NavLinkRoute}>
            Profile
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default SubMenu;
