const base64url = require('base64url') ;
const crypto = require('crypto') ;
const signatureFunction = crypto.createSign('RSA-SHA256') ;
const fs = require('fs') ;


const header = {
    alg: "RS256",
    typ: "JWT"
} ;

const payload = {
    sub: "1234567890",
    name: "John Doe",
    admin: true,
    iat: 1516239022
}

// Convert your header and payload data to JSON object
const stringHeader = JSON.stringify(header) ;
const stringPayload = JSON.stringify(payload) ;

//Convert JSON object to base64 data 
const base64urlHeader = base64url(stringHeader) ;
const base64urlPayload = base64url(stringPayload) ;

//sign the data
signatureFunction.write(base64urlHeader + '.' + base64urlPayload) ;
signatureFunction.end() ;

const privateKey = fs.readFileSync(`${__dirname}/privateKey.pem`, 'utf8') ; 
const signatureBase64 = signatureFunction.sign(privateKey, 'base64') ;

const signatureBase64url = base64url.fromBase64(signatureBase64) ;

console.log(signatureBase64url)
















