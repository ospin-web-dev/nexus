const Pusher = require('pusher-js')
const batchAuthorizer = require('./batchAuthorizer')

let pusher = null

const resetPusherClient = () => {
  pusher = null
}

const init = async (apiKey, userId, badStateUpdateHandler = null) => {
  if (pusher) return pusher

  pusher = new Pusher(apiKey, {
    cluster: 'eu',
    authorizer: batchAuthorizer(userId),
  })

  pusher.connection.bind('state_change', states => {

    if (!badStateUpdateHandler) return

    if (states.previous === 'initialized' && states.current === 'failed') {
      const error = 'UNSUPPORTED_BROWSER'
      badStateUpdateHandler.createError(error)
    }

    if ((states.previous === 'connecting' && states.current === 'unavailable')
     || (states.previous === 'connected' && states.current === 'connecting')) {
      const error = 'DISCONNECTED'
      badStateUpdateHandler.createError(error)
    }

    if (states.previous === 'connecting' && states.current === 'connected') {
      badStateUpdateHandler.resolve()
    }
  })

  return pusher
}

const getPusherClient = () => pusher

module.exports = {
  init,
  getPusherClient,
  resetPusherClient,
}
