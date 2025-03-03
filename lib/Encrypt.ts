import Cryptr from "cryptr";
const cryptr = new Cryptr('myTotallySecretKey', { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });

export const encrypt = (data:any)=>{
    const encryptedString = cryptr.encrypt(JSON.stringify(data))
    return encryptedString
}

export const dcrypt = (data:any)=>{
    const decryptedData = JSON.parse(cryptr.decrypt(data))
    return decryptedData
}