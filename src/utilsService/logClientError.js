const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc logs a frontend errors to the backend
 * @memberof nexus.utils
 * @function logClientError
 * @async
 * @param {Object} params
 * @param {Object} params.error
 * @param {string} params.error.errorString
 * @param {string} params.error.errorTime
 * @param {string} params.error.lineNumber
 * @param {string} params.error.functionName
 * @param {string} params.error.userName
 * @param {string} params.error.pathName
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ error }) => (
    API.post('utils', 'client-errors', { body: error, ...DEFAULT_REQ_OPTS })
  ),
)
