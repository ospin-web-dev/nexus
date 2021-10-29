const Amplify = require('aws-amplify')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  queryStringParameters => Amplify.API.get(
    'process', '',
    { queryStringParameters, ...DEFAULT_REQ_OPTS },
  ),
)
