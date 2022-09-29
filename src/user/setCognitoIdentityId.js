const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')

/**
 * @desc sets the cognitoIdentityId of a user
 * @memberof nexus.user
 * @function setCognitoIdentityId
 * @async
 * @param {Object} params
 * @param {string} params.userId
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  ({ userId }) => (
    API.put('user', `${userId}/cognito-identity`, DEFAULT_REQ_OPTS)
  ),
)
