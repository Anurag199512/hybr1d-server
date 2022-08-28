const bcrypt = require('bcrypt');
const { User } = require('../../models');

// importing other services
const checkUsersPresence = require('./checkIfUserExist');

async function addNewUser(userDetails) {
  try {
    const userPresent = await checkUsersPresence(userDetails.email);

    if (!userPresent) {
      // user can be registered
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userDetails.password, salt);

      const {
        firstName, lastName, email, userType
      } = userDetails;

      const newUser = {
        firstName,
        lastName,
        email,
        userType,
        password: hashedPassword
      };

      const userCreated = await User.create(newUser);

      if (userCreated) {
        // user created successfully
        return { userAdded: true, error: false };
      }
    }

    // user could not be added (already present)
    return { userAdded: false };
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = addNewUser;
