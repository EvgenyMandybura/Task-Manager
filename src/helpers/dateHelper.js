const dateFormat = (timestamp) => {
  const data = new Date(timestamp * 1000);
  const timeStampCon =
    data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear();

  return timeStampCon;
};

export default dateFormat;
