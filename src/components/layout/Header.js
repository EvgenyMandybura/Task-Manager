import React, { useState } from "react";
import { NavLink as NavLinkRoute, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import HeaderStyles from "./index.module.scss";
import { firebase_app } from "../../Firebase/firebase";
import { logoutUser } from "../../redux/auth/actions";
import avatarPlaceHolder from "../../assets/ic-avatar-placeholder.svg";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import SubMenu from "./SubMenu";
import { usersUrl } from "../../constants/urlForFiresore";
import StorageService from "../../services/StorageService";
import { useTranslation } from "react-i18next";

const Header = ({ logoutUser, history, authState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNavBar, setIsOpenNavBar] = useState(false);
  const user = StorageService.user.value;
  const toggle = () => setIsOpen(!isOpen);
  const onSubmitLogOut = () => {
    logoutUser(history);
  };
  const toggleSidebar = () => {
    setIsOpenNavBar(!isOpenNavBar);
  };

  const [imageAvatar, setImageAvatar] = useState(avatarPlaceHolder);

  if (user) {
    firebase_app
      .storage()
      .ref()
      .child(`${usersUrl}/${user.uid}`)
      .getDownloadURL()
      .then((url) => {
        setImageAvatar(url);
      });
  }

  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <Navbar
        light
        expand="md"
        className={`navbar light ${HeaderStyles.navbar}`}
      >
        <Button onClick={() => changeLanguage("en")}>EN</Button>
        <Button onClick={() => changeLanguage("ru")}>RU</Button>
        {!user && (
          <NavbarBrand href="/" className="nav navbar-brand mx-auto">
            {" "}
            Task Manager
          </NavbarBrand>
        )}
        {!!user && (
          <>
            <Button color="success" onClick={toggleSidebar}>
              {isOpenNavBar ? t("header.hideMenu") : t("header.showMenu")}
            </Button>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className={HeaderStyles.nav} navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <img
                      src={imageAvatar}
                      alt="logo"
                      className={HeaderStyles.userLogo}
                    />
                    <b>{user.displayName}</b>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink to={"/profile"} tag={NavLinkRoute}>
                        {t("header.profile")}
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={onSubmitLogOut}>
                      <NavLink> {t("header.logOut")}</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </>
        )}
      </Navbar>
      {isOpenNavBar && <SubMenu />}
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ authState: auth });

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));
