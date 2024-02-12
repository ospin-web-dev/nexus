const { API } = require('aws-amplify')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc queries all processes
 * @memberof nexus.process
 * @function list
 * @async
 * @param {Object} queryStringParameters
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  queryStringParameters => API.get(
    'process', '',
    { queryStringParameters, ...DEFAULT_REQ_OPTS },
  ),
)
