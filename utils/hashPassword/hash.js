const crypto = require('crypto'); 
 
const algorithm = 'aes-256-cbc'; // the encryption algorithm to use 
const key = crypto.randomBytes(32); // generate a random encryption key 
const iv = crypto.randomBytes(16); // generate a random initialization vector 
 
exports.encrypt = (text) => { 
  const cipher = crypto.createCipheriv(algorithm, key, iv); 
  let encrypted = cipher.update(text, 'utf8', 'hex'); 
  encrypted += cipher.final('hex'); 
  return encrypted; 
}; 
 
exports.decrypt = (text) => { 
  const decipher = crypto.createDecipheriv(algorithm, key, iv); 
  let decrypted = decipher.update(text, 'hex', 'utf8'); 
  decrypted += decipher.final('utf8'); 
  return decrypted; 
}; 
 
// const originalText = 'my secret message'; 
 
// const encryptedText = encrypt(originalText); 
// console.log(`Encrypted text: ${encryptedText}`); 
 
// const decryptedText = decrypt(encryptedText); 
// console.log(`Decrypted text: ${decryptedText}`);