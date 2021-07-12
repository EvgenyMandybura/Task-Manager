import React from "react";
import styles from "./index.module.scss";
import { Col, Row } from "reactstrap";

const MemberDetails = ({ member }) => {
  return (
    <div key={member?.email} className={styles.members}>
      <Row>
        <Col xs="2">
          <img
            src={member?.fileUrl}
            className={styles.membersUserLogo}
            alt="logo"
          />
        </Col>
        <Col xs={{ size: 8, offset: 1 }}>
          <div className={styles.membersBody}>
            <p>{member?.firstName}</p>
            <p>{member?.email}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MemberDetails;
