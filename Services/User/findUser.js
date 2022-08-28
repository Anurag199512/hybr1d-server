const { User } = require('../../models');

async function findUser(email) {
  try {
    const details = await User.findOne({
      where: { email: email }
    });

    return details
  } catch (e) {
    return false;
  }
}

module.exports = findUser;
