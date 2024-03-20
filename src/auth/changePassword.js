const { Auth } = require('aws-amplify')



const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

/**
 * @desc changes the password of a user
 * @memberof nexus.auth
 * @function changePassword
 * @async
 * @param {Object} params
 * @param {string} params.oldPassword
 * @param {string} params.newPassword
 * @returns {Promise<AuthApiResponse>}
 */

module.exports = serializeAxiosResponse(
  async ({ oldPassword, newPassword }) => {
    const user = await Auth.currentAuthenticatedUser()
    return Auth.changePassword(user, oldPassword, newPassword)
  },
)
