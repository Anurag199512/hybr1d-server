// check if email already exist in database
const { User } = require('../../models');

async function checkIfUserExist(emailId) {
  let userPresent = false;
  try {
    const data = await User.findOne({ where: { email: emailId } });

    if (data) {
      userPresent = true;
    }
  } catch (e) {
    throw new Error(e);
  }

  return userPresent;
}

module.exports = checkIfUserExist;
