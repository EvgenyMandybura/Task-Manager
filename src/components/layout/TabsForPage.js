import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import ActivityLog from "../tasks/ActivityLog";
import LeaveCommentForm from "../forms/AddCommentForm";
import CommentsList from "../comments/CommentsList";
import TaskWorkLogs from "../workLog/TaskWorkLogs";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";

const TabForPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const { t } = useTranslation();
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
            {t("tabForPage.activitiesLog")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            {t("tabForPage.comments")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            {t("tabForPage.workLogs")}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" className={styles.tabContainer}>
          <ActivityLog />
        </TabPane>
        <TabPane tabId="2" className={styles.tabContainer}>
          <LeaveCommentForm />
          <CommentsList />
        </TabPane>
        <TabPane tabId="3" className={styles.tabContainer}>
          <TaskWorkLogs />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default TabForPage;
