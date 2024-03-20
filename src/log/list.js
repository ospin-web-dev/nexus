const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc queries the logs of a device
 * @memberof nexus.log
 * @function list
 * @async
 * @param {Object} params
 * @param {Object} queryStringParameters, an object of query string parameters
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (queryStringParameters = {}) => API.get('log', '', {
    queryStringParameters,
    ...DEFAULT_REQ_OPTS,
  }),
)
