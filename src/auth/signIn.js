const Auth = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

module.exports = serializeAxiosResponse(
  async (userName, password) => (
    Auth.signIn(userName, password)
  ),
)
