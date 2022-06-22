/* because the user pool was configured to be case sensitive
 * for the email (this used to be the default on Cognito...)
 * and this setting cannot be changed, we lower case email when we submit them;
 */

const isProbablyEmail = usernameOrEmail => {
  const re = /\S+@\S+\.\S+/
  return re.test(usernameOrEmail)
}

module.exports = usernameOrEmail => {
  if (isProbablyEmail(usernameOrEmail)) {
    return usernameOrEmail.toLowerCase()
  }
  return usernameOrEmail
}
