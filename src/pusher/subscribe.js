const { getPusherClient } = require('./connectToPusher')

const subscribe = (channelName, events, eventHandler) => {

  const pusher = getPusherClient()

  if (!pusher) return

  const channel = pusher.subscribe(channelName)
  Object.values(events).forEach(eventName => {
    channel.bind(eventName, data => {
      eventHandler[eventName](data)
    })
  })
}

module.exports = subscribe
