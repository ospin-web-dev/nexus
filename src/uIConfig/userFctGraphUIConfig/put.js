const API = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  (userId, fctGraphId, configs) => API.put('uiconfig', `users/${userId}/functionality-graphs/${fctGraphId}`, { body: configs, ...DEFAULT_REQ_OPTS }),
)
