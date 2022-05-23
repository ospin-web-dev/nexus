const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ processId, annotationId, data }) => API
    .patch('process', `${processId}/annotations/${annotationId}`, { body: data, ...DEFAULT_REQ_OPTS }),
)
