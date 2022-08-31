"use strict";
exports.__esModule = true;
exports.validateLoginInput = exports.validateRegisterInput = void 0;
var validateRegisterInput = function (username, email, password, confirmPassword) {
    var errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    if (email.trim() === '') {
        errors.email = 'Email must not be empty';
    }
    else {
        var regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty';
    }
    else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }
    else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length < 1
    };
};
exports.validateRegisterInput = validateRegisterInput;
var validateLoginInput = function (username, password) {
    var errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty';
    }
    if (password === '') {
        errors.password = 'Password must not be empty';
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length < 1
    };
};
exports.validateLoginInput = validateLoginInput;
