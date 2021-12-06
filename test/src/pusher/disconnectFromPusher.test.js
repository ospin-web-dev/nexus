const disconnectFromPusher = require('pusher/disconnectFromPusher')
const { resetPusherClient, init } = require('pusher/connectToPusher')

const pusherMock = {
  disconnect: () => {},
  connection: () => {},
}

jest.mock('pusher-js', () => (
  jest.fn().mockImplementation(() => pusherMock)
))

describe('disconnectFromPusher', () => {

  beforeEach(() => {
    resetPusherClient()
    jest.clearAllMocks()
  })

  describe('when pusher was NOT initialized', () => {
    it('does NOT call pusher.disconnect', () => {
      disconnectFromPusher()
      const spy = jest.spyOn(pusherMock, 'disconnect')

      expect(spy).toHaveBeenCalledTimes(0)
    })
  })

  describe('when pusher was is initialized', () => {
    it('does call pusher.disconnect', () => {
      const authorizer = jest.fn()
      const apiKey = '123'
      const cluster = 'us'
      const initData = {
        apiKey,
        authorizer,
        badStateUpdateHandler: {
          createError: () => {},
          resolve: () => {},
        },
        cluster,
      }

      init(initData)
      disconnectFromPusher()
      const spy = jest.spyOn(pusherMock, 'disconnect')

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
