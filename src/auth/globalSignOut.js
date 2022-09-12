const { default: Auth } = require('@aws-amplify/auth')

/**
 * @desc signs out a user globally - the user remains logged on
 * other devices until the cognito session expires (1 hour)
 * @memberof nexus.auth
 * @function globalSignOut
 * @async
 * @returns {undefined}
 */

module.exports = () => Auth.signOut({ global: true })
