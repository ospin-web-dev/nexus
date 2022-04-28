const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ deviceId, firmwareUpdateId }) => API.post(
    'command',
    `devices/${deviceId}/update-firmware`,
    { body: { firmwareUpdateId }, ...DEFAULT_REQ_OPTS },
  ),
)
