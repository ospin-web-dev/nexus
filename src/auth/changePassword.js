const { default: Auth } = require('@aws-amplify/auth')

const serializeAxiosResponse = require('../utils/serializeAxiosResponse')

module.exports = serializeAxiosResponse(
  async ({ oldPassword, newPassword }) => {
    const user = await Auth.currentAuthenticatedUser()
    return Auth.changePassword(user, oldPassword, newPassword)
  },
)
