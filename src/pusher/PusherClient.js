const Pusher = require('pusher-js')
const batchAuthorizer = require('./batchAuthorizer')

let pusher = null

class PusherClient {

  static connect({ apiKey, userId, cluster = 'eu' }) {
    if (pusher) return pusher
    pusher = new Pusher(apiKey, { cluster, authorizer: batchAuthorizer(userId) })
    return pusher
  }

  static registerConnectionEvent(eventName, eventHandler) {
    if (!pusher) {
      console.warn('Initialize pusher before trying to register connection events')
      return
    }
    pusher.connection.bind(eventName, eventHandler)
  }

  static getClient() { return pusher }

  static resetPusherClient() { pusher = null }

  static disconnect() {
    if (pusher) {
      pusher.disconnect()
      this.resetPusherClient()
    }
  }

  static subscribe(channelName, eventHandlers) {
    if (!pusher) {
      console.warn('Initialize pusher before trying to subscribe')
      return
    }

    const channel = pusher.subscribe(channelName)
    Object.entries(eventHandlers).forEach(([eventName, eventHandler]) => {
      if (typeof eventHandler !== 'function') {
        console.warn(`event handler for pusher event ${eventName} for channel ${channelName} is not a function`)
        return
      }
      channel.bind(eventName, eventHandler)
    })
  }

  static unsubscribe(channelName) {
    if (!pusher) {
      console.warn('Initialize pusher before trying to unsubscribe')
      return
    }
    pusher.unsubscribe(channelName)
  }

}

module.exports = PusherClient
