const { Auth } = require('aws-amplify')



const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

/**
 * @desc returns an existing cognito session
 * @memberof nexus.auth
 * @function getCurrentSesssion
 * @async
 * @returns {Promise<AuthApiResponse>}
 */

module.exports = serializeAxiosResponse(
  async () => (
    Auth.currentSession()
  ),
)
