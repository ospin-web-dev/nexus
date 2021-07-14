const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  (id, params) => (
    API.patch('user', `${id}`, { body: params, ...DEFAULT_REQ_OPTS })
  ),
)
