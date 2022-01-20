const API = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  (processId, body) => API.post(
    'process', `${processId}/clones`,
    { body, ...DEFAULT_REQ_OPTS },
  ),
)
