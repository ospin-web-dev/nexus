const { Auth } = require('aws-amplify')



const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const lowerCaseEmail = require('./helper/lowerCaseEmail')

/**
 * @desc resets a user's password
 * @memberof nexus.auth
 * @function forgotPasswordSubmit
 * @async
 * @param {Object} params
 * @param {string} params.usernameOrEmail
 * @param {string} params.code
 * @param {string} params.newPassword
 * @returns {Promise<AuthApiResponse>}
 */

module.exports = serializeAxiosResponse(
  async ({ usernameOrEmail, code, newPassword }) => (
    Auth.forgotPasswordSubmit(lowerCaseEmail(usernameOrEmail), code, newPassword)
  ),
)
