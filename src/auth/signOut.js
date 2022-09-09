const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

/**
 * @desc signs out a user
 * @memberof nexus.auth
 * @function signOut
 * @async
 * @returns {Promise<AuthApiResponse>}
 */

module.exports = serializeAxiosResponse(
  () => Auth.signOut(),
)
