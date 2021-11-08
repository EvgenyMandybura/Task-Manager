import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getListMembers, getListMembersClear } from "../../redux/auth/actions";
import MemberDetails from "./MemberDetails";

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
        membersList.map((member) => <MemberDetails member={member} key={member.email}/>)
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
