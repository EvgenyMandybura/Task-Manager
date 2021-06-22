import React, { useState } from "react";
import ContainerUser from "../../components/layout/ContainerUser";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import EditBoardDetailsForm from "../../components/forms/EditBoardDetailsForm";
import ColumnsList from "../../components/columns/ColumnsList";
import styles from "../../components/layout/index.module.scss";

const EditBoardDetails = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <ContainerUser>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              General settings
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Board columns settings
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
            >
              Members settings
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1" className={styles.tabContainer}>
            <EditBoardDetailsForm />
          </TabPane>
          <TabPane tabId="2" className={styles.tabContainer}>
            <ColumnsList />
          </TabPane>
          <TabPane tabId="3" className={styles.tabContainer}>
            Members settings
          </TabPane>
        </TabContent>
      </div>
    </ContainerUser>
  );
};

export default EditBoardDetails;
