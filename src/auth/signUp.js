const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

/**
 * @desc signs up a user for the OSPIN web app
 * @memberof nexus.auth
 * @function signUp
 * @async
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.password
 * @param {Object} [params.attributes]
 * @param {string} [params.attributes.email]
 * @param {string} [params.attributes.phoneNumber]
 * @returns {Promise<AuthApiResponse>}
 */

module.exports = serializeAxiosResponse(
  async params => Auth.signUp(params),
)
