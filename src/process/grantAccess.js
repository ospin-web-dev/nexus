const {default: API} = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ processId, userId, groupName }) => API.put(
    'process', `${processId}/access/${userId}`,
    { body: { groupName }, ...DEFAULT_REQ_OPTS },
  ),
)
