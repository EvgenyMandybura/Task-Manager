const splitter = (fullName) => {
    return fullName.trim().replace(/[ ]+/g, ' ').split(' ');
};

export default splitter;