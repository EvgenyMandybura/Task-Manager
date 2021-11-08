import React from "react";

const ListOfMembers = ({ savedMembers, membersFetched }) => {
  const members = !!savedMembers ? savedMembers : membersFetched;
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
