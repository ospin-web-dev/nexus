const Amplify = require('aws-amplify')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  processId => Amplify.API.get(`processes/${processId}`, '', DEFAULT_REQ_OPTS),
)
