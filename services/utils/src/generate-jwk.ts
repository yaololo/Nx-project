import * as crypto from 'crypto';

const publicKeyPEM = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUBB4GNADCBiQKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0
FPqri0cb2JZfXJ/DgYSF6vUpwmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/
3j+skZ6UtW+5u09lHNsj6tQ51s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQAB
-----END PUBLIC KEY-----
`;

// Remove PEM header, footer, and newline characters
const publicKeyPEMContent = publicKeyPEM.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\n/g, '');

// Decode base64 and convert to Buffer
const publicKeyBuffer = Buffer.from(publicKeyPEMContent, 'base64');

// Parse DER-encoded public key
const parsedKey = crypto.createPublicKey({
  key: publicKeyBuffer,
  format: 'der',
  type: 'spki'
}) as any;

// Convert components to base64url encoding
const modulusBase64 = parsedKey.modulus.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
const exponentBase64 = parsedKey.publicExponent.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

// Create JWK
const jwk = {
  kty: 'RSA',
  n: modulusBase64,
  e: exponentBase64,
};

console.log(JSON.stringify(jwk, null, 2));
