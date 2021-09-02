const Amplify = require('aws-amplify')
const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  (processId, functionalityId, opts) => Amplify.API.get(
    'process', `${processId}/functionalities/${functionalityId}/images`,
    { ...opts, ...DEFAULT_REQ_OPTS },
  ),
)
