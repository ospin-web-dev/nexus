const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc lists all licence types
 * @memberof nexus.licence.type
 * @function list
 * @param object the query string parameters, defaults to none
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (queryStringParameters = {}) => API.get('licence', 'types', { queryStringParameters, ...DEFAULT_REQ_OPTS }),
)
