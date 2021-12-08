const authorizeDeviceSubscriptions = require('../user/authorizeDeviceSubscriptions')

let queuedRequests = []

// 0 is enough for a delay to batch calls when they happen during a single event loop cycle
const QUEUEING_DELAY_IN_MS = 0
let queueingInterval = null

const stopQueueing = () => {
  clearInterval(queueingInterval)
  queueingInterval = null
}

const authorizeChannels = async () => {

  const requests = [ ...queuedRequests ]
  queuedRequests = []

  const channelNames = requests.map(req => req.channelName)
  const { socketId, userId } = requests[0]

  const { data: { tokens } } = await authorizeDeviceSubscriptions(userId, { channelNames, socketId })

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
