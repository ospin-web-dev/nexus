const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

module.exports = serializeAxiosResponse(
  async ({ usernameOrEmail, code, newPassword }) => (
    Auth.forgotPasswordSubmit(usernameOrEmail, code, newPassword)
  ),
)
