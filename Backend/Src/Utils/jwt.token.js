const jwt = require("jsonwebtoken");
const {
  JWT_SECRET_KEY,
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_KEY_TIME,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_KEY_TIME,
} = require("../Config/index");
// creating a jwt token  for activation token
module.exports.CreateActivationToken = async (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  let payload = {
    user,
    activationCode,
  };

  const config = { expiresIn: "5m" };

  const Token = jwt.sign(payload, JWT_SECRET_KEY, config);

  return Promise.resolve({ Token, activationCode });
};

// verifying the activation token
module.exports.VerifyActivationToken = async (token) => {
  try {
    let data = jwt.verify(token, JWT_SECRET_KEY);
    return Promise.resolve({ success: true, data });
  } catch (error) {
    return Promise.resolve({ success: false, error });
  }
};

// generate the access token
module.exports.CreateAcessToken = async (userid, role) => {
  let payload = {
    id: userid,
    role,
  };

  const config = { expiresIn: ACCESS_TOKEN_KEY_TIME };
  const Token = jwt.sign(payload, ACCESS_TOKEN_KEY, config);

  return Promise.resolve(Token);
};

// generate the Refresh token
module.exports.CreateRefeshToken = async (userid, role) => {
  let payload = {
    id: userid,
    role,
  };

  const config = { expiresIn: REFRESH_TOKEN_KEY_TIME };
  const Token = jwt.sign(payload, REFRESH_TOKEN_KEY, config);

  return Promise.resolve(Token);
};

// verifying the access token
module.exports.VerifyAccessToken = async (token) => {
  try {
    let data = jwt.verify(token, ACCESS_TOKEN_KEY);
    return Promise.resolve({ success: true, ...data });
  } catch (error) {
    return Promise.resolve({ success: false, error });
  }
};

// verifying  the refresh token
module.exports.VerifyRefreshToken = async (token) => {
  try {
    let data = jwt.verify(token, REFRESH_TOKEN_KEY);
    return Promise.resolve({ success: true, ...data });
  } catch (error) {
    return Promise.resolve({ success: false, error });
  }
};
