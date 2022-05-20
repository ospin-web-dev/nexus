const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ processId, data }) => API.post('process', `${processId}/annotations`, { body: data, ...DEFAULT_REQ_OPTS }),
)
