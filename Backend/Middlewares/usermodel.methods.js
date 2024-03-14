const bycrypt = require("bcrypt");

/**
 * verifying the password
 * @param {Sting} password user password
 * @param {String} hashpassword hashed password
 * @return {Boolean} will return true or false
 */
module.exports.VerifyPasswordMethod = async (password, hashpassword) => {
  let response = await bycrypt.compare(password, hashpassword);
  return response;
};
