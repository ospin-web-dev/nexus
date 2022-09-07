const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ processId, userId, newGroup }) => API.patch(
    'process', `${processId}/access/${userId}`,
    { body: { newGroup }, ...DEFAULT_REQ_OPTS },
  ),
)
