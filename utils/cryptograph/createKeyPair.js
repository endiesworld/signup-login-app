const crypto = require('crypto') ;
const fs = require('fs') ;
const path = require('path') ;

function genKeyPair(){
    //Generate an object where key are stored in properties 'privetKey and publicKey'
    const keyPair = crypto.generateKeyPairSync('rsa',{
        modulusLength: 4096 , // bit standard for RSA
        publicKeyEncoding:{
            type: 'pkcs1' , // 'Public key cryptography standards 1
            format: 'pem'
        },
        privateKeyEncoding:{
            type: 'pkcs1' , // 'Public key cryptography standards 1
            format: 'pem'
        },
    } ) ;

    const publicKeyFileName = 'publicKey.txt' ;
    const privateKeyFileName = 'privateKey.txt' ;
    const publicKeyFilePath = path.resolve(publicKeyFileName) ;
    const privateKeyFilePath = path.resolve(privateKeyFileName) ;

    fs.writeFile(publicKeyFilePath, keyPair.publicKey, { flag: "a+" }, (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("Content written succesfully")
    });
    fs.writeFile(privateKeyFilePath, keyPair.privateKey, { flag: "a+" }, (err) => {
        if (err) {
            console.error(err)
            return
        }
        console.log("Content written succesfully")
    });
}
genKeyPair() ;