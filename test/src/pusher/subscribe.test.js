const subscribe = require('pusher/subscribe')
const { resetPusherClient, init } = require('pusher/connectToPusher')

const pusherMock = {
  connection: () => {},
  subscribe: () => ({
    bind: (eventName, callBack) => callBack(),
  }),
}

jest.mock('pusher-js', () => (
  jest.fn().mockImplementation(() => pusherMock)
))

describe('subscribe', () => {

  beforeEach(() => {
    resetPusherClient()
    jest.clearAllMocks()
  })

  describe('when pusher was NOT initialized', () => {
    it('does NOT call pusher.subscribe', () => {
      const channelName = 'my-channel'
      const eventName = 'my-event'
      const events = { MY_EVENTS: eventName }
      const eventFunction = jest.fn()
      const eventHandler = { [eventName]: eventFunction }
      const spy = jest.spyOn(pusherMock, 'subscribe')

      subscribe(channelName, events, eventHandler)

      expect(spy).toHaveBeenCalledTimes(0)
    })
  })

  describe('when pusher was is initialized', () => {
    it('does call pusher.subscribe', () => {
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

      const channelName = 'my-channel'
      const eventName = 'my-event'
      const events = { MY_EVENTS: eventName }
      const eventFunction = jest.fn()
      const eventHandler = { [eventName]: eventFunction }
      const spy = jest.spyOn(pusherMock, 'subscribe')

      subscribe(channelName, events, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(channelName)
      expect(eventFunction).toHaveBeenCalledTimes(1)
    })
  })
})
