const Pusher = require('pusher-js')

let pusher = null

const resetPusherClient = () => {
  pusher = null
}

const init = async ({
  apiKey,
  authorizer,
  badStateUpdateHandler = null,
  cluster = 'eu',
}) => {
  if (pusher) return pusher

  pusher = new Pusher(apiKey, {
    cluster,
    authorizer,
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
