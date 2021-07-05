const get = require('./get')
const list = require('./list')
const update = require('./update')
const deleteUser = require('./delete')
const notifications = require('./notifications')

module.exports = {
  get,
  list,
  update,
  delete: deleteUser,
  notifications,
}
