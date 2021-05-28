import React, { useState } from "react";
import { NavLink as NavLinkRoute, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import HeaderStyles from "./index.module.scss";
import { firebase_app } from "../../components/Firebase/firebase";
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

const Header = ({ logoutUser, history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNavBar, setIsOpenNavBar] = useState(false);
  const user = firebase_app.auth().currentUser;
  const toggle = () => setIsOpen(!isOpen);
  const onSubmitLogOut = () => {
    logoutUser();
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
  return (
    <div>
      <Navbar
        light
        expand="md"
        className={`navbar light ${HeaderStyles.navbar}`}
      >
        {!user && (
          <NavbarBrand href="/" className="nav navbar-brand mx-auto">
            {" "}
            Task Manager
          </NavbarBrand>
        )}
        {!!user && (
          <>
            <Button color="success" onClick={toggleSidebar}>
              {isOpenNavBar ? "Hide Menu" : "Show menu"}
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
                        Profile
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={onSubmitLogOut}>
                      <NavLink>LogOut</NavLink>
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

const mapStateToProps = () => ({});

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));
