const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

/**
 * @desc confirms the sign up of a user
 * @memberof nexus.auth
 * @function confirmSignUp
 * @async
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.code
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  async ({ username, code }) => Auth
    .confirmSignUp(username, code),
)
