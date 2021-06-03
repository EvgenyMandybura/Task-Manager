import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getListMembers, getListMembersClear } from "../../redux/auth/actions";
import { Col, Row } from "reactstrap";
import styles from "./index.module.scss";

const ListOfMembersDetail = ({
  members,
  getListMembers,
  getListMembersClear,
  authState,
}) => {
  const { membersList: membersList } = authState;
  const [ready, updateReady] = useState(false);

  const fetchMembers = () => {
    getListMembers(members);
  };
  useEffect(() => {
    fetchMembers();
    updateReady(true);
    return () => {
      getListMembersClear();
    };
  }, [members]);

  return (
    <>
      <h5>List of members:</h5>
      {ready && membersList != "" ? (
        membersList.map((member) => (
          <div key={member.email} className={styles.members}>
            <Row>
              <Col xs="2">
                <img
                  src={member.fileUrl}
                  className={styles.membersUserLogo}
                  alt="logo"
                />
              </Col>
              <Col xs={{ size: 8, offset: 2 }}>
                <div className={styles.membersBody}>
                  <p>{member.firstName}</p>
                  <p>{member.email}</p>
                </div>
              </Col>
            </Row>
          </div>
        ))
      ) : (
        <h3>No members</h3>
      )}
    </>
  );
};
const mapStateToProps = ({ auth }) => ({ authState: auth });
export default withRouter(
  connect(mapStateToProps, { getListMembers, getListMembersClear })(
    ListOfMembersDetail
  )
);
