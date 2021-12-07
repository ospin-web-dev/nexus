const Amplify = require('aws-amplify')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  (processId, body) => Amplify.API.post(
    'process', `${processId}/clones`,
    { body, ...DEFAULT_REQ_OPTS },
  ),
)
