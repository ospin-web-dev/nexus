const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

module.exports = serializeAxiosResponse(
  async ({ usernameOrEmail, code }) => Auth.confirmSignUp(usernameOrEmail, code),
)
