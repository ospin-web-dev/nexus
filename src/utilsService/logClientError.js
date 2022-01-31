const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ error }) => (
    API.post('utils', 'client-errors', { body: error, ...DEFAULT_REQ_OPTS })
  ),
)
