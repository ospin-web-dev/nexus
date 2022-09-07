const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ deviceId, params }) => API
    .del('device', `${deviceId}/access`, { body: params, ...DEFAULT_REQ_OPTS }),
)
