export const PASSWORD_PATTERN = /^(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 50;

// Username
export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 30;

// Phone
export const PHONE_PATTERN = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
