const { API } = require('aws-amplify')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc deletes a process annotation
 * @memberof nexus.process.annotation
 * @function remove
 * @async
 * @param {Object} params
 * @param {string} params.processId
 * @param {string} params.annotationId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ processId, annotationId }) => API.del('process', `${processId}/annotations/${annotationId}`, DEFAULT_REQ_OPTS),
)
