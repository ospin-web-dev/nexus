const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')

module.exports = serializeAxiosResponse(requestBody => (
  AuthorizedDeviceAPI.put(
    'functionalities',
    requestBody,
    DEFAULT_REQ_OPTS,
  )
))
