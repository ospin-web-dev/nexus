const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc updates a user
 * @memberof nexus.user
 * @function update
 * @async
 * @param {Object} params
 * @param {string} params.id
 * @param {Object} params.params
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (id, params) => (
    API.patch('user', `${id}`, { body: params, ...DEFAULT_REQ_OPTS })
  ),
)
