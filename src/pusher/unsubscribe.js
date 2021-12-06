const { getPusherClient } = require('./connectToPusher')

module.exports = channelName => {
  const pusher = getPusherClient()
  if (pusher) pusher.unsubscribe(channelName)
}
