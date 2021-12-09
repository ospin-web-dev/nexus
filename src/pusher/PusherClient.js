const Pusher = require('pusher-js')

let client = null

class PusherClient {

  static get client() { return client }

  static set client(value) { client = value }

  static connect({ apiKey, cluster, authorizer }) {
    if (PusherClient.client) return PusherClient.client
    PusherClient.client = new Pusher(apiKey, { cluster, authorizer })
    return PusherClient.client
  }

  static registerConnectionEvent(eventName, eventHandler) {
    if (!PusherClient.client) {
      console.warn('Connect PusherClient before trying to register connection events')
      return
    }
    PusherClient.client.connection.bind(eventName, eventHandler)
  }

  static resetPusherClient() { PusherClient.client = null }

  static disconnect() {
    if (PusherClient.client) {
      PusherClient.client.disconnect()
      this.resetPusherClient()
    }
  }

  static subscribe(channelName, eventHandlers) {
    if (!PusherClient.client) {
      console.warn('Connect PusherClient before trying to subscribe')
      return
    }

    const channel = PusherClient.client.subscribe(channelName)
    Object.entries(eventHandlers).forEach(([eventName, eventHandler]) => {
      if (typeof eventHandler !== 'function') {
        console.warn(`event handler for pusher event ${eventName} for channel ${channelName} is not a function`)
        return
      }
      channel.bind(eventName, eventHandler)
    })
  }

  static unsubscribe(channelName) {
    if (!PusherClient.client) {
      console.warn('Connect PusherClient before trying to unsubscribe')
      return
    }
    PusherClient.client.unsubscribe(channelName)
  }

}

module.exports = PusherClient
