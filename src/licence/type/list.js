const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc lists all licence types
 * @memberof nexus.licence.type
 * @function list
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (queryStringParameters = {}) => API.get('licence', 'types', { queryStringParameters, ...DEFAULT_REQ_OPTS }),
)
