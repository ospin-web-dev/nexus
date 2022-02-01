const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ userId, params }) => API.put(
    'user',
    `${userId}/access/device/accept`,
    { body: params, ...DEFAULT_REQ_OPTS },
  ),
)
