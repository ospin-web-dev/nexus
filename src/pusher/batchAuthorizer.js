const authorizeDeviceSubscriptions = require('../user/pusher/subscriptions/device/authorizeMany')
const authorizeDeviceProcessSubscriptions = require('../user/pusher/subscriptions/device/process/authorizeMany')
const OspinPusherClient = require('./OspinPusherClient')

let queuedRequests = []

// 0 is enough for a delay to batch calls when they happen during a single event loop cycle
const QUEUEING_DELAY_IN_MS = 0
let queueingInterval = null

const stopQueueing = () => {
  clearInterval(queueingInterval)
  queueingInterval = null
}

const getAuthTokens = async (channelNames, socketId, userId) => {
  const nonDeviceProcessChannelNames = channelNames
    .filter(channelName => !OspinPusherClient.isDeviceProcessChannel(channelName))
  const deviceProcessChannelNames = channelNames.filter(OspinPusherClient.isDeviceProcessChannel)

  if (!nonDeviceProcessChannelNames.length) {
    const { data: { tokens } } = await authorizeDeviceProcessSubscriptions(userId, { channelNames: deviceProcessChannelNames, socketId })
    return tokens
  }

  if (!deviceProcessChannelNames.length) {
    const { data: { tokens } } = await authorizeDeviceSubscriptions(userId, { channelNames: nonDeviceProcessChannelNames, socketId })
    return tokens
  }

  const [
    { data: { tokens: deviceProcessChannelTokens } },
    { data: { tokens: nonDeviceProcessChannelTokens } }
  ] = await Promise.all([
    authorizeDeviceSubscriptions(userId, { channelNames: nonDeviceProcessChannelNames, socketId }),
    authorizeDeviceProcessSubscriptions(userId, { channelNames: deviceProcessChannelNames, socketId }),
  ])

  return [ ...deviceProcessChannelTokens, ...nonDeviceProcessChannelTokens ]
}

const authorizeChannels = async () => {

  const requests = [ ...queuedRequests ]
  queuedRequests = []

  const { socketId, userId } = requests[0]

  const channelNames = requests.map(req => req.channelName)

  const tokens = await getAuthTokens(channelNames, socketId, userId)

  for (const channelTokenResponse of tokens) {
    const { token, channelName } = channelTokenResponse
    const { callback } = requests.find(req => channelName === req.channelName)

    if (token) {
      callback(false, { auth: token })
    } else {
      callback(true, null)
    }
  }
}

const startQueingInterval = () => setInterval(async () => {
  stopQueueing(queueingInterval)
  await authorizeChannels()
}, QUEUEING_DELAY_IN_MS)

const createRequest = (socketId, channelName, callback, userId) => ({
  channelName,
  socketId,
  callback,
  userId,
})

const queueRequest = req => {
  if (!queueingInterval) {
    queueingInterval = startQueingInterval()
  }
  queuedRequests.push(req)
}

const batchAuthorizer = userId => ({ name }) => ({
  authorize: (socketId, callback) => {
    queueRequest(createRequest(socketId, name, callback, userId))
  },
})

module.exports = batchAuthorizer
