const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')

module.exports = serializeAxiosResponse(requestBody => (
  AuthorizedDeviceAPI.post(
    'configuration',
    requestBody,
    DEFAULT_REQ_OPTS,
  )
))
