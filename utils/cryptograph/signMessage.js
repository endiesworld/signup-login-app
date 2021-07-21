const fs = require('fs') ;
const crypto = require('crypto') ;

const encryptData = require('./encryptData') ;


const hash = crypto.createHash('sha256') ;

const dataToSign = {
    fisrtName: 'Emmanuel',
    lastName: 'Okoro',
    address: '15 Tunji-Aderintan str. Isolo Lagos'
} ;

/**
 * 
 * @param {data/message to send to a receiver} message 
 * @returns JavaScript object {algorithm(algorithm for hash function), rawData(message to send accross), signedData(encrypted message)}
 */

function signMessage(message=dataToSign) {
    // String version of data to sign
    const stringData = JSON.stringify(message) ;

    // Sets the the string value of data we want to hash to the hash object
    hash.update(stringData) ;

    //Hash the data in hexadecimal format
    const hashData = hash.digest('hex') ;

    //collect the private key. MESSAGES ARE SIGNED WITH PRIVATE KEY
    const privateKey = fs.readFileSync(`${__dirname}/privateKey.txt`, 'utf8') ; 
 
    //encrypt(SIGN) the hashed message with private key.
    const encryptedMessage = encryptData(privateKey , 'private', hashData) ; 

    //public key to be used by message reciever, to confirm message integrity
    const publicKey = fs.readFileSync(`${__dirname}/publicKey.txt`, 'utf8') ; 

    //prepared package of data to send

    const packagedData = {
        hashAlgorithm: 'sha256',
        hashFormat: 'hex' ,
        rawData: message ,
        signedData: encryptedMessage,
        publicKey
    }; 

    return packagedData
}


module.exports = signMessage ;