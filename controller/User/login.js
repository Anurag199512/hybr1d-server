const jwt = require('jsonwebtoken');
const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

const findUserDetails = require('../../Services/User/findUser');
const responseMessage = require('../../defaultMessage');

function userLogin(request, response) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    userType: joi.string().valid('buyer', 'seller').required()
  });

  const { error } = schema.validate(request.body);

  if (error) {
    return response.status(400).send({ success: false, error: error.details[0].message });
  }

  return User.findOne({
    where: {
      email: request.body.email
    }
  }).then((userData) => {
    if (!userData) {
      return response.status(409).json({ success: false, error: responseMessage.userDoesNotExist });
    }

    if (userData.userType !== request.body.userType) {
      return response.status(400).send({ success: false, error: responseMessage.incorrectLoginMethodForUser });      
    }

    bcrypt.compare(request.body.password, userData.password).then(async (data) => {
      if (data) {
        const accessToken = jwt.sign({ email: request.body.email, user_id: userData.id },
          process.env.SECRET_KEY, { expiresIn: '14d' });

        const userDetail = await findUserDetails(request.body.email);

        return response.status(200).header('authorization', accessToken)
          .json({
            success: true,
            data: { user: userDetail, authToken: accessToken }
          });
      }
      return response.status(403).send({ success: false, error: responseMessage.incorrectPassword });
    });
  });
}

module.exports = userLogin;
