const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

module.exports = serializeAxiosResponse(
  async ({ usernameOrEmail }) => Auth.forgotPassword(usernameOrEmail),
)
