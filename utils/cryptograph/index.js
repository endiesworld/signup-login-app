const fs = require('fs') ;
const crypto = require('crypto') ;

const encryptData = require('./encryptData') ;
const decryptMessage = require('./dycryptData') ;

const publicKey = fs.readFileSync(`${__dirname}/publicKey.txt`, 'utf8') ;

const privateKey = fs.readFileSync(`${__dirname}/privateKey.txt`, 'utf8') ;

//encrypt message. NOTE MESSAGES ARE ENCRYPTED WITH PUBLIC KEYS
const encryptedMessage = encryptData(publicKey , 'public', 'emmanuel@1') ; 



//decrypt message NOTE MESSAGES ARE DECRYPTED WITH PRIVATE KEYS
const decryptedMessage = decryptMessage(privateKey, 'private', encryptedMessage)



console.log('encrypted message is', decryptedMessage.toString()) ;


