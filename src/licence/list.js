const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')
const { removeUndefinedKeys } = require('../utils/objUtils')

/**
 * @desc queries the licences collection
 * @memberof nexus.licence
 * @function list
 * @param {Object} params
 * @param {string} params.textQuery
 * @param {string} params.textQueryField
 * @param {string} params.sortBy
 * @param {string} params.sortOrder
 * @param {string} params.typeId
 * @param {boolean} params.embedUsers
 * @param {boolean} params.embedDevices
 * @param {number} params.skip
 * @param {number} params.limit
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (queryStringParameters = {}) => API.get('licence', '', {
    queryStringParameters: removeUndefinedKeys(queryStringParameters),
    ...DEFAULT_REQ_OPTS,
  }),
)
