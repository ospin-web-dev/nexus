const Pusher = require('pusher-js')
const {
  init,
  getPusherClient,
  resetPusherClient,
} = require('pusher/connectToPusher')

const pusherMock = { connection: () => ({
  bind: (event, cb) => cb(),
}) }

jest.mock('pusher-js', () => (
  jest.fn().mockImplementation(() => pusherMock)
))

describe('connectToPusher', () => {

  beforeEach(() => {
    resetPusherClient()
    jest.clearAllMocks()
  })

  describe('when pusher was NOT initialized', () => {
    describe('getPusherClient', () => {
      it('returns null when pusher was NOT initialized', () => {
        const res = getPusherClient()

        expect(res).toBeNull()
      })
    })
  })

  describe('when pusher was is initialized', () => {
    it('call the Pusher constructor and returns an instance of pusher (mocked)', () => {
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

      const res = init(initData)

      expect(res).toStrictEqual(pusherMock)
      expect(Pusher).toHaveBeenCalledTimes(1)
      expect(Pusher).toHaveBeenCalledWith(apiKey, { cluster, authorizer })
    })

    it('call the Pusher constructor with default values', () => {
      const authorizer = jest.fn()
      const apiKey = '123'
      const initData = {
        apiKey,
        authorizer,
      }

      init(initData)

      expect(Pusher).toHaveBeenCalledTimes(1)
      expect(Pusher).toHaveBeenCalledWith(apiKey, { cluster: 'eu', authorizer })
    })

    describe('getPusherClient', () => {
      it('returns an instance of a pusher (mocked) when it was initialized', () => {
        const authorizer = jest.fn()
        const apiKey = '123'
        const initData = {
          apiKey,
          authorizer,
          badStateUpdateHandler: {
            createError: () => {},
            resolve: () => {},
          },
        }

        init(initData)
        const res = getPusherClient()

        expect(res).toStrictEqual(pusherMock)
      })
    })

    describe('resetPusherClient', () => {
      it('sets the client back to null', () => {
        const authorizer = jest.fn()
        const apiKey = '123'
        const initData = {
          apiKey,
          authorizer,
          badStateUpdateHandler: {
            createError: () => {},
            resolve: () => {},
          },
        }

        init(initData)
        resetPusherClient()
        const res = getPusherClient()

        expect(res).toBeNull()
      })
    })
  })
})
