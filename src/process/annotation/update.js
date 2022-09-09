const { default: API } = require('@aws-amplify/api-rest')
const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc updates a process annotation
 * @memberof nexus.process.annotation
 * @function update
 * @async
 * @param {Object} params
 * @param {string} params.processId
 * @param {string} params.annotationId
 * @param {Object} params.data
 * @param {string} params.data.text
 * @param {number} params.data.userTimestamp
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ processId, annotationId, data }) => API
    .patch('process', `${processId}/annotations/${annotationId}`, { body: data, ...DEFAULT_REQ_OPTS }),
)
