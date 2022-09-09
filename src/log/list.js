const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')
const { removeUndefinedKeys } = require('../utils/objUtils')

/**
 * @desc queries the logs of a device
 * @memberof nexus.log
 * @function list
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {string} params.userId
 * @param {string} params.processId
 * @param {number} params.limit
 * @param {number} params.startTime
 * @param {number} params.endTime
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ limit, processId, startTime, endTime, deviceId, userId }) => (
    API.get('log', '', {
      queryStringParameters: removeUndefinedKeys({
        limit,
        processId,
        startTime,
        endTime,
        deviceId,
        userId,
      }),
      ...DEFAULT_REQ_OPTS,
    })
  ),
)
