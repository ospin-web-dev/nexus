const Amplify = require('aws-amplify')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ids => Amplify.API.patch('process', '', { body: { processesIds: ids }, ...DEFAULT_REQ_OPTS })
)
