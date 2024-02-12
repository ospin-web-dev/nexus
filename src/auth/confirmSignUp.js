const { Auth } = require('aws-amplify')



const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

/**
 * @desc confirms the sign up of a user
 * @memberof nexus.auth
 * @function confirmSignUp
 * @async
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.code
 * @returns {Promise<AuthApiResponse>}
 */

module.exports = serializeAxiosResponse(
  async ({ username, code }) => Auth
    .confirmSignUp(username, code),
)
