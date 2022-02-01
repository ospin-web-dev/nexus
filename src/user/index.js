const acceptDeviceInvitation = require('./acceptDeviceInvitation')
const setCognitoIdentityId = require('./setCognitoIdentityId')
const device = require('./device')
const get = require('./get')
const getChangelog = require('./getChangelog')
const list = require('./list')
const update = require('./update')
const deleteUser = require('./delete')
const notifications = require('./notifications')
const preview = require('./preview')
const pusher = require('./pusher')

module.exports = {
  acceptDeviceInvitation,
  delete: deleteUser,
  device,
  get,
  getChangelog,
  list,
  setCognitoIdentityId,
  update,
  notifications,
  pusher,
  preview,
}
