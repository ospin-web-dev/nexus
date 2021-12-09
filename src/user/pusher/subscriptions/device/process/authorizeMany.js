const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  (id, params) => API.post('user', `${id}/subscriptions/device-processes`, { body: params, ...DEFAULT_REQ_OPTS }),
)
