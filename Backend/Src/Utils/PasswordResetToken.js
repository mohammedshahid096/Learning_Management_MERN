const crypto = require("crypto");

module.exports.GetResetPasswordToken = () => {
  const resetToken = crypto.randomBytes(30).toString("hex");
  const hashToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  return { hashToken, resetToken };
};

module.exports.GetHashedToken = (resetToken) => {
  const hashToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  return hashToken;
};

module.exports.generateOTP = () => {
  const otp = crypto.randomInt(1000, 9999);
  return otp;
};
