const API = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  (deviceId, processId, params) => API.post(
    'command',
    `devices/${deviceId}/processes/${processId}/update-running-process`,
    { body: params, ...DEFAULT_REQ_OPTS },
  ),
)
