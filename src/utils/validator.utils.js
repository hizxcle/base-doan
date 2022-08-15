const validator = {};
validator.checkLength = (val) => {
    return val.length >= 6;
};
validator.compare = (str1, str2) => {
    return str1 === str2;
};

export default validator;
