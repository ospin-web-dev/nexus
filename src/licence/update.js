const { API } = require('aws-amplify')
const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc updates a licence
 * @memberof nexus.licence
 * @function update
 * @async
 * @param {Object} params
 * @param {string} params.licenceId
 * @param {Object} params.params.
 * @param {string} params.params.invoiceId
 * @param {string} params.params.state
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ licenceId, params }) => API.patch('licence', `${licenceId}`, { body: params, ...DEFAULT_REQ_OPTS }),
)
