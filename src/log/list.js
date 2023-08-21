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
 * @param {string} params.level
 * @param {string} params.subject
 * @param {number} params.skip
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (queryStringParameters = {}) => API.get('log', '', {
    queryStringParameters: removeUndefinedKeys(queryStringParameters),
    ...DEFAULT_REQ_OPTS,
  }),
)
