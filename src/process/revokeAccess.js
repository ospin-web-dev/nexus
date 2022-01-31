const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ processId, userId }) => API.del(
    'process', `${processId}/access/${userId}`,
    DEFAULT_REQ_OPTS,
  ),
)
