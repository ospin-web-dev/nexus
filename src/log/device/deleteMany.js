const Amplify = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')

module.exports = serializeAxiosResponse(
  deviceId => Amplify.API.del('log', `devices/${deviceId}`),
)
