import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import ActivityLog from "../tasks/ActivityLog";
import FilesDetails from "../tasks/fileDetails";
import LeaveCommentForm from "../forms/AddCommentForm";
import CommentsList from "../comments/CommentsList";
import styles from "./index.module.scss";

const TabForPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Task files
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Activities log
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Comments
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" className={styles.tabContainer}>
          <FilesDetails />
        </TabPane>
        <TabPane tabId="2" className={styles.tabContainer}>
          <ActivityLog />
        </TabPane>
        <TabPane tabId="3" className={styles.tabContainer}>
          <LeaveCommentForm />
          <CommentsList />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default TabForPage;
