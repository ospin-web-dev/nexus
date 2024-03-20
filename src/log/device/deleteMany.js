const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc deletes all logs of a device
 * @memberof nexus.log.device
 * @function deleteMany
 * @async
 * @param {string} deviceId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  deviceId => API.del('log', `devices/${deviceId}`, { ...DEFAULT_REQ_OPTS }),
)
