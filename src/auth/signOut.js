const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

/**
 * @desc signs out a user
 * @memberof nexus.auth
 * @function signOut
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  () => Auth.signOut(),
)
