const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')
const { removeUndefinedKeys } = require('../utils/objUtils')

/**
 * @desc queries the devices collection
 * @memberof nexus.device
 * @function list
 * @async
 * @param {Object} params
 * @param {string} params.textQuery
 * @param {string} params.textQueryField
 * @param {string} params.sortBy
 * @param {string} params.sortOrder
 * @param {boolean} params.embedOwners
 * @param {boolean} params.embedManufacturers
 * @param {number} params.skip
 * @param {number} params.limit
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (queryStringParameters = {}) => API.get('device', '', {
    queryStringParameters: removeUndefinedKeys(queryStringParameters),
    ...DEFAULT_REQ_OPTS,
  }),
)
