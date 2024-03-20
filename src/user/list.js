const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')
const { removeUndefinedKeys } = require('../utils/objUtils')

/**
 * @desc queries the users collection
 * @memberof nexus.user
 * @function list
 * @async
 * @param {Object} params
 * @param {string} params.deviceId
 * @param {string} params.processId
 * @param {string} params.textQuery
 * @param {string} params.textQueryField
 * @param {string} params.sortBy
 * @param {string} params.sortOrder
 * @param {boolean} params.embedDevices
 * @param {number} params.skip
 * @param {number} params.limit
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (queryStringParameters = {}) => API.get('user', '', {
    queryStringParameters: removeUndefinedKeys(queryStringParameters),
    ...DEFAULT_REQ_OPTS,
  }),
)
