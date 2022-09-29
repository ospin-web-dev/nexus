const changePassword = require('./changePassword')
const confirmSignUp = require('./confirmSignUp')
const forgotPassword = require('./forgotPassword')
const forgotPasswordSubmit = require('./forgotPasswordSubmit')
const getCurrentSession = require('./getCurrentSession')
const signIn = require('./signIn')
const signOut = require('./signOut')
const signUp = require('./signUp')

/**
 * @namespace nexus.auth
 */

module.exports = {
  changePassword,
  confirmSignUp,
  forgotPassword,
  forgotPasswordSubmit,
  getCurrentSession,
  signIn,
  signOut,
  signUp,
}
