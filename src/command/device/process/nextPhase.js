const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  (deviceId, processId) => API.post(
    'command',
    `devices/${deviceId}/processes/${processId}/next-phase`,
    { body: {}, ...DEFAULT_REQ_OPTS },
  ),
)