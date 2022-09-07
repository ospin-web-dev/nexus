const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc creates a licence
 * @memberof nexus.licence
 * @function create
 * @async
 * @param {Object} params
 * @param {Object} params.params
 * @param {string} params.params.typeId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ params }) => API.post('licence', '', { body: params, ...DEFAULT_REQ_OPTS }),
)
