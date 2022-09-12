const { default: Auth } = require('@aws-amplify/auth')

/**
 * @desc signs out a user
 * @memberof nexus.auth
 * @function signOut
 * @async
 * @returns {undefined}
 */

module.exports = () => Auth.signOut()
