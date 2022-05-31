const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ processId, annotationId }) => API.del('process', `${processId}/annotations/${annotationId}`, DEFAULT_REQ_OPTS),
)
