const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const lowerCaseEmail = require('./helper/lowerCaseEmail')

module.exports = serializeAxiosResponse(
  async (usernameOrEmail, password) => (
    Auth.signIn(lowerCaseEmail(usernameOrEmail), password)
  ),
)
