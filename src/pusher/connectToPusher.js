const Pusher = require('pusher-js')
const batchAuthorizer = require('./batchAuthorizer')

const getAPIKey = env => {

  const API_KEY_DEV = 'ba587719e2ccfb6c9dd1'
  const API_KEY_STAGING = '10d4f25e41dc0f09c37d'
  const API_KEY_PROD = 'ca9297d1e015925bf081'

  const ENV_TO_API_KEY = {
    dev: API_KEY_DEV,
    staging: API_KEY_STAGING,
    prod: API_KEY_PROD,
  }

  return ENV_TO_API_KEY[env] || API_KEY_DEV
}

let pusher = null

const resetPusherClient = () => {
  pusher = null
}

const init = async (env, userId, badStateUpdateHandler = null) => {
  if (pusher) return pusher

  pusher = new Pusher(getAPIKey(env), {
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
