const serializeAxiosResponse = require('utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')

module.exports = serializeAxiosResponse(
  processId => AuthorizedDeviceAPI.get(`processes/${processId}`, { ...DEFAULT_REQ_OPTS }),
)
