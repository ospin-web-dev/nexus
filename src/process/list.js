const API = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  queryStringParameters => API.get(
    'process', '',
    { queryStringParameters, ...DEFAULT_REQ_OPTS },
  ),
)
