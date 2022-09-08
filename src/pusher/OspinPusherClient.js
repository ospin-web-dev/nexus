const Pusher = require('pusher-js')
const batchAuthorizer = require('./batchAuthorizer')
const getAPIKey = require('./getAPIKey')

let client = null

/**
 * @namespace nexus.pusher.OspinPusherClient
 */

class OspinPusherClient {

  static get client() { return client }

  static set client(value) { client = value }

  /**
   * @desc connects the client
   * @memberof nexus.pusher.OspinPusherClient
   * @function connect
   * @param {Object} connectOptions
   * @param {string} connectOptions.env
   * @param {string} connectOptions.userId
   * @param {string} connectOptions.cluster='eu'
   * @returns {Object} reference to the pusher client
   */

  static connect({ env, cluster = 'eu', userId }) {
    const apiKey = getAPIKey(env)
    if (OspinPusherClient.client) return OspinPusherClient.client
    OspinPusherClient.client = new Pusher(apiKey, { cluster, authorizer: batchAuthorizer(userId) })
    return OspinPusherClient.client
  }

  /**
   * @desc registers a handler for a pusher client event
   * (for pusher native events like `state_change`)
   * @memberof nexus.pusher.OspinPusherClient
   * @function registerConnectionEvent
   * @param {string} eventName
   * @param {Function} eventHandler
   */

  static registerConnectionEvent(eventName, eventHandler) {
    if (!OspinPusherClient.client) {
      // eslint-disable-next-line
      console.warn('Connect OspinPusherClient before trying to register connection events')
      return
    }
    OspinPusherClient.client.connection.bind(eventName, eventHandler)
  }

  static resetOspinPusherClient() { OspinPusherClient.client = null }

  /**
   * @desc disconnects the client
   * @memberof nexus.pusher.OspinPusherClient
   * @function disconnect
   */

  static disconnect() {
    if (OspinPusherClient.client) {
      OspinPusherClient.client.disconnect()
      this.resetOspinPusherClient()
    }
  }

}

module.exports = OspinPusherClient
