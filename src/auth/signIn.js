const { Auth } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

module.exports = serializeAxiosResponse(
  async (userName, password) => (
    Auth.signIn(userName, password)
  ),
)
