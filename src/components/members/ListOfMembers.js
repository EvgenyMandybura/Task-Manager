import React from "react";

const ListOfMembers = ({ savedMembers, membersFromFirebase }) => {
  const members = !!savedMembers ? savedMembers : membersFromFirebase;
  return (
    <>
      {members.length > 0 && <p className="listMembers">List of members:</p>}
      {members.map((member) => (
        <li key={member}>{member}</li>
      ))}
    </>
  );
};

export default ListOfMembers;
