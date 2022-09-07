const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc removes all events of a device
 * @memberof nexus.event.device
 * @function removeAll
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ deviceId }) => API.del('event', `devices/${deviceId}`, { ...DEFAULT_REQ_OPTS }),
)
