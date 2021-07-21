const fs = require('fs') ;
const crypto = require('crypto') ;
const decryptData = require('./dycryptData') ;

const signedMessageRecieved = require('./signMessage') ;

const {hashAlgorithm, hashFormat, rawData, signedData, publicKey} = signedMessageRecieved() ;

const hash = crypto.createHash(hashAlgorithm) ;

// String version of data to sign
const stringData = JSON.stringify(rawData) ;

// Sets the the string value of data we want to hash to the hash object
hash.update(stringData) ;

//Hash the data in hexadecimal format
const hashData = hash.digest(hashFormat) ;

const receiverEncryption = decryptData(publicKey, 'public', signedData) ;


let authenticSender = (receiverEncryption.toString() === hashData ) ?  true :  false ;

console.log('is the message authentic ? ', authenticSender) ;

 


