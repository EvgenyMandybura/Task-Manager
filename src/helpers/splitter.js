const splitterFullName = (fullName) => {
  const response = fullName.trim().replace(/[ ]+/g, " ").split(" ");
  return response || "";
};

export default splitterFullName;
