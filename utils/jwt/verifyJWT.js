const base64url = require('base64url') ;
const crypto = require('crypto') ;
const verifyFunction = crypto.createVerify('RSA-SHA256') ;
const fs = require('fs') ;


const JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA' ;

const jwtParts = JWT.split('.') ;

const base64urlHeader = jwtParts[0] ;
const base64urlPayload = jwtParts[1] ;
const base64urlSignature = jwtParts[2] ;


//sign the data
verifyFunction.write(base64urlHeader + '.' + base64urlPayload) ;
verifyFunction.end() ;

const signatureBase64url = base64url.toBase64(base64urlSignature) ;

const publicKey = fs.readFileSync(`${__dirname}/publicKey.pem`, 'utf8') ; 

const isSignatureValid = verifyFunction.verify(publicKey, signatureBase64url, 'base64' ); 

console.log(isSignatureValid ) ;
