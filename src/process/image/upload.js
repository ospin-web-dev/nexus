const Amplify = require('aws-amplify')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  (processId, functionalityId, params) => Amplify.API.post(
    'process', `${processId}/functionalities/${functionalityId}`,
    { body: params, ...DEFAULT_REQ_OPTS },
  ),
)
