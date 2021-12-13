const Pusher = require('pusher-js')
const batchAuthorizer = require('./batchAuthorizer')

let client = null

class OspinPusherClient {

  static get client() { return client }

  static set client(value) { client = value }

  static connect({ apiKey, cluster = 'eu', userId }) {
    if (OspinPusherClient.client) return OspinPusherClient.client
    OspinPusherClient.client = new Pusher(apiKey, { cluster, authorizer: batchAuthorizer(userId) })
    return OspinPusherClient.client
  }

  static registerConnectionEvent(eventName, eventHandler) {
    if (!OspinPusherClient.client) {
      console.warn('Connect OspinPusherClient before trying to register connection events')
      return
    }
    OspinPusherClient.client.connection.bind(eventName, eventHandler)
  }

  static resetOspinPusherClient() { OspinPusherClient.client = null }

  static disconnect() {
    if (OspinPusherClient.client) {
      OspinPusherClient.client.disconnect()
      this.resetOspinPusherClient()
    }
  }

}

module.exports = OspinPusherClient
