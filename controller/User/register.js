const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

// default response messages
const responseMessage = require('../../defaultMessage');

// import add user service
const addNewUser = require('../../Services/User/addNewUser');
const findUserDetail = require('../../Services/User/findUser');

async function userRegistration(request, response) {
  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    confirmPassword: joi.string().min(8).required(),
    userType: joi.string().valid('buyer', 'seller').required()
  });

  const { error } = schema.validate(request.body);

  if (error) {
    return response.status(400).send({ success: false, error: error.details[0].message });
  }

  // password and confirm password did not matched
  if (request.body.password !== request.body.confirmPassword) {
    return response.status(400).send({
      success: false,
      error: responseMessage.passwordDoesNotMatch
    });
  }

  try {
    const userRegistered = await addNewUser(request.body);

    if (userRegistered.userAdded) {
      // successful registration
  
      const user = await findUserDetail(request.body.email);
      const accessToken = jwt.sign({ email: request.body.firstName, user_id: user.id },
        process.env.SECRET_KEY, { expiresIn: '14d' });
  
      if (user) {
        const msg = responseMessage.successfulRegistration.replace('#username#', request.body.firstName);
  
        return response.status(201).send({
          success: true,
          message: msg,
          data: { User: user, authToken: accessToken }
        });
      }
  
      return response.status(500).send({
        success: false,
        error: 'Internal server error'
      });
    }

    return response.status(409).send({
      success: false,
      error: responseMessage.emailAlreadyPresent
    });
  } catch (e) {
    return response.status(500).send({
      success: false,
      error: responseMessage.failedRegistration
    });
  }
}

module.exports = userRegistration;
