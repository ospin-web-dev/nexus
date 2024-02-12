const { Auth } = require('aws-amplify')



const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const lowerCaseEmail = require('./helper/lowerCaseEmail')

/**
 * @desc signs in a user
 * @memberof nexus.auth
 * @function signIn
 * @async
 * @param {string} usernameOrEmail
 * @param {string} password
 * @returns {Promise<AuthApiResponse>}
 */

module.exports = serializeAxiosResponse(
  async (usernameOrEmail, password) => (
    Auth.signIn(lowerCaseEmail(usernameOrEmail), password)
  ),
)
