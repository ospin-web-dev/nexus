const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc removes a single event
 * @memberof nexus.event
 * @function remove
 * @async
 * @param {Object} params
 * @param {string} params.eventId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ eventId }) => API.del('event', `${eventId}`, { ...DEFAULT_REQ_OPTS }),
)
