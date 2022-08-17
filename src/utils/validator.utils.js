const validator = {};
validator.userName = (val) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(val);
};
validator.email = (val) => {
    const regex = /(.+)@(.+){2,}\.(.+){2,}/;
    return regex.test(val);
};
validator.phoneNumber = (val) => {
    const regex =
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    return regex.test(val);
};
validator.checkLength = (val) => {
    return val.length >= 6;
};
validator.compare = (str1, str2) => {
    return str1 === str2;
};

export default validator;
