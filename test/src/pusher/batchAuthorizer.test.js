const faker = require('faker')
const batchAuthorizer = require('pusher/batchAuthorizer')

jest.mock('user/authorizeDeviceSubscriptions.js', () => jest.fn()
  .mockImplementationOnce((userId, { channelNames } = {}) => ({
    data: {
      tokens: channelNames.map(channelName => ({
        channelName, token: 'token',
      })),
    },
  }))
  .mockImplementationOnce((userId, { channelNames } = {}) => ({
    data: {
      tokens: channelNames.map(channelName => ({
        channelName,
      })),
    },
  })))

describe('batchAuthorizer', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('executes the callback functions when a token is returned', async () => {
    const userId = faker.datatype.uuid
    const authorizer = batchAuthorizer(userId)
    const channelName = 'my-channel'
    const callback = jest.fn()
    const socketId = '12345.54321'

    authorizer({ name: channelName }).authorize(socketId, callback)
    authorizer({ name: channelName }).authorize(socketId, callback)
    await new Promise(resolve => setTimeout(resolve, 1))

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(false, { auth: 'token' })
  })

  it('executes the callback function when no token is returned', async () => {
    const userId = faker.datatype.uuid
    const authorizer = batchAuthorizer(userId)
    const channelName = 'my-channel'
    const callback = jest.fn()
    const socketId = '12345.54321'

    authorizer({ name: channelName }).authorize(socketId, callback)
    await new Promise(resolve => setTimeout(resolve, 1))

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(true, null)
  })
})
