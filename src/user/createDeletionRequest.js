const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc creates a deletion request for a user
 * @memberof nexus.user
 * @function createDeletionRequest
 * @async
 * @param {string} userId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  userId => API.post('user', `${userId}/deletion-requests`, { body: {}, ...DEFAULT_REQ_OPTS }),
)
