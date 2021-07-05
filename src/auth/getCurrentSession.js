const { Auth } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

module.exports = serializeAxiosResponse(
  async () => (
    Auth.currentSession()
  ),
)
