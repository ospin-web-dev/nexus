const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc preassigns a licence to a device
 * @memberof nexus.licence
 * @function preAssign
 * @async
 * @param {Object} body
 * @param {string} body.key the licence key
 * @param {string} body.deviceId the deviceId to be preassigned
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (body) => API.post('licence','pre-assign', { body, ...DEFAULT_REQ_OPTS }),
)
