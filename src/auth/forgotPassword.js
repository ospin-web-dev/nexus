const { Auth } = require('aws-amplify')



const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const lowerCaseEmail = require('./helper/lowerCaseEmail')

/**
 * @desc initiates a password reset
 * @memberof nexus.auth
 * @function forgotPassword
 * @async
 * @param {Object} params
 * @param {string} params.usernameOrEmail
 * @returns {Promise<AuthApiResponse>}
 */

module.exports = serializeAxiosResponse(
  async ({ usernameOrEmail }) => Auth
    .forgotPassword(lowerCaseEmail(usernameOrEmail)),
)
