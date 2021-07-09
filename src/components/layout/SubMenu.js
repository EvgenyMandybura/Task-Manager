import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import styles from "./index.module.scss";
import { NavLink as NavLinkRoute } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SubMenu = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.navMenu}>
      <Nav vertical>
        <NavItem>
          <NavLink to={"/boards"} tag={NavLinkRoute}>
            {t("subMenu.boards")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={"/reports"} tag={NavLinkRoute}>
            {t("subMenu.reports")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={"/profile"} tag={NavLinkRoute}>
            {t("subMenu.profile")}
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default SubMenu;
