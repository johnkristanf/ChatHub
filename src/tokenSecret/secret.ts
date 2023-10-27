import speakeasy from 'speakeasy';

const secret = speakeasy.generateSecret();
export const secretKey = secret.base32;

