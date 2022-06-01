const acceptDeviceInvitation = require('./acceptDeviceInvitation')
const setCognitoIdentityId = require('./setCognitoIdentityId')
const device = require('./device')
const get = require('./get')
const getChangelog = require('./getChangelog')
const list = require('./list')
const update = require('./update')
const createDeletionRequest = require('./createDeletionRequest')
const notifications = require('./notifications')
const preview = require('./preview')
const pusher = require('./pusher')

module.exports = {
  acceptDeviceInvitation,
  createDeletionRequest,
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
