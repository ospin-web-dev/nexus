const { default: Auth } = require('@aws-amplify/auth')

/**
 * @desc signs out a user by invalidating their access token; when the global flag is set,
 * any access tokens on other machines are not refreshed anymore, i.e. they
 * expire within one hour
 * @memberof nexus.auth
 * @function signOut
 * @param {Object} [params]
 * @param {boolean} [params.global=false]
 * @async
 * @returns {undefined}
 */

module.exports = ({ global = false } = {}) => Auth.signOut({ global })
