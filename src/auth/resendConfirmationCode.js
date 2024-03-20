const { Auth } = require('aws-amplify')



const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

/**
 * @desc re-requests the sign up code to be delivered to the users email
 * @memberof nexus.auth
 * @function resendConfirmationCode
 * @param {Object} params
 * @param {string} params.username the username for the confirmation code
 * @async
 * @returns {Promise<AuthApiResponse>}
 */

module.exports = serializeAxiosResponse(
  async ({ username }) => (
    Auth.resendSignUp(username)
  ),
)
