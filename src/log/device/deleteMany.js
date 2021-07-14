const Amplify = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  deviceId => Amplify.API.del('log', `devices/${deviceId}`, { ...DEFAULT_REQ_OPTS }),
)
