const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ deviceId, params }) => API.post(
    'process', `?deviceId=${deviceId}`,
    { body: params, ...DEFAULT_REQ_OPTS },
  ),
)