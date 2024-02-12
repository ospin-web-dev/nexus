const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc updates a device
 * @memberof nexus.device
 * @function update
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {Object} params.params
 * @param {string} params.params.name
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId, params }) => API
    .put('device', `${deviceId}`, { body: params, ...DEFAULT_REQ_OPTS }),
)
