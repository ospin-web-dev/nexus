const {default: API} = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ userId, deviceId, params }) => API.put(
    'uiconfig',
    `users/${userId}/devices/${deviceId}`,
    { body: params, ...DEFAULT_REQ_OPTS },
  ),
)
