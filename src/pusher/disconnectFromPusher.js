const { getPusherClient, resetPusherClient } = require('./connectToPusher')

module.exports = () => {
  const pusher = getPusherClient()
  if (pusher) {
    pusher.disconnect()
    resetPusherClient()
  }
}
