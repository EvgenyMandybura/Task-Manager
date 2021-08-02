const createMemberArrayForSelect = (members) => {
  const memberArray = [];

  members?.forEach((member) => {
    memberArray.push({
      label: member,
      value: member,
    });
  });
  return memberArray;
};

export default createMemberArrayForSelect;
