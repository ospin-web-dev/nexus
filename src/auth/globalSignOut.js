const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

/**
 * @desc signs out a user globally - the user remains logged on other devices until the cognito session expires (1 hour)
 * @memberof nexus.auth
 * @function globalSignOut
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  () => Auth.signOut({ global: true }),
)
