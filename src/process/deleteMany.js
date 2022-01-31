const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ids => API.patch('process', '', { body: { processesIds: ids }, ...DEFAULT_REQ_OPTS })
)
