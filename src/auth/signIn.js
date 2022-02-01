const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

module.exports = serializeAxiosResponse(
  async (usernameOrEmail, password) => (
    Auth.signIn(usernameOrEmail, password)
  ),
)
