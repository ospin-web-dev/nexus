const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

module.exports = serializeAxiosResponse(
  async params => Auth.signUp(params),
)
