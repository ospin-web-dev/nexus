const {default: API} = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ deviceId, params }) => API
    .put('device', `${deviceId}/transfer-ownership`, { body: params, ...DEFAULT_REQ_OPTS }),
)
