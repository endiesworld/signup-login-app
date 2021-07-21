const  crypto = require ('crypto') ;

const dataDecryptionType = {
    public: (key, message) => crypto.publicDecrypt(key, message) ,
    private: (key, message) =>crypto.privateDecrypt(key, message)
};

/**
 * 
 * @param {rsa generated key [publicKey | privateKey]} key 
 * @param {type of key ['public', <string> | 'private', <string>]} keyType 
 * @param {message to be decrypted} data 
 * @returns {decrypted message}
 */
function decryptData(key, keyType, data){
    //an already buffered message remains the same
    const bufferMessage = Buffer.from(data, 'utf8') ;
    return dataDecryptionType[keyType](key, bufferMessage) ;
}; 

module.exports = decryptData ;