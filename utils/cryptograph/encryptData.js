const  crypto = require ('crypto') ;

const dataEncryptionType = {
    public: (key, message) => crypto.publicEncrypt(key, message) ,
    private: (key, message) =>crypto.privateEncrypt(key, message)
};

/**
 * 
 * @param {rsa generated key [publicKey | privateKey]} key 
 * @param {type of key [public | private]} keyType 
 * @param {message to be encrypted} data 
 * @returns {encrypted message}
 */
function encryptData(key, keyType, data){
    const bufferMessage = Buffer.from(data, 'utf8') ;
    return dataEncryptionType[keyType](key, bufferMessage) ;
}; 

module.exports = encryptData ;