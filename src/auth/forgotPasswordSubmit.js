const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const lowerCaseEmail = require('./helper/lowerCaseEmail')

module.exports = serializeAxiosResponse(
  async ({ usernameOrEmail, code, newPassword }) => (
    Auth.forgotPasswordSubmit(lowerCaseEmail(usernameOrEmail), code, newPassword)
  ),
)
