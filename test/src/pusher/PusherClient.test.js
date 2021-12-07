const Pusher = require('pusher-js')
const faker = require('faker')
const PusherClient = require('pusher/PusherClient')

jest.mock('pusher-js', () => {
  const { PusherMock } = require('pusher-js-mock')
  PusherMock.prototype.disconnect = () => {}
  return PusherMock
})

describe('the PusherClient', () => {

  beforeEach(() => {
    PusherClient.resetPusherClient()
    jest.clearAllMocks()
  })

  const initDefaultClient = () => {
    const apiKey = '123'
    const userId = faker.datatype.uuid()
    const cluster = 'us'
    const initData = { apiKey, userId, cluster }

    return PusherClient.connect(initData)
  }

  describe('connect', () => {
    describe('when NOT already initialized', () => {
      it('returns an instance of the pusher client', () => {
        const apiKey = '123'
        const userId = faker.datatype.uuid()
        const cluster = 'us'
        const initData = { apiKey, userId, cluster }

        const client = PusherClient.connect(initData)

        expect(client).toBeInstanceOf(Pusher)
      })

      it('sets the default value for the cluster to eu', () => {
        const apiKey = '123'
        const userId = faker.datatype.uuid()
        const initData = { apiKey, userId }

        const client = PusherClient.connect(initData)

        expect(client.config.cluster).toBe('eu')
      })
    })

    describe('when initialized beforehand', () => {
      it('returns the existing client', () => {
        const apiKey = '123'
        const userId = faker.datatype.uuid()
        const cluster = 'us'
        const initData = { apiKey, userId, cluster }
        const existingClient = initDefaultClient()

        const client = PusherClient.connect(initData)

        expect(client).toStrictEqual(existingClient)
      })
    })
  })

  describe('disconnect', () => {
    describe('when NOT already initialized', () => {
      it('does not call resetPusherClient', () => {
        const spy = jest.spyOn(PusherClient, 'resetPusherClient')
        PusherClient.disconnect()

        expect(spy).toHaveBeenCalledTimes(0)
      })
    })

    describe('when initialized beforehand', () => {
      it('does call resetPusherClient', () => {
        initDefaultClient()
        const spy = jest.spyOn(PusherClient, 'resetPusherClient')

        PusherClient.disconnect()

        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('getClient', () => {
    describe('when NOT already initialized', () => {
      it('returns null', () => {
        const client = PusherClient.getClient()

        expect(client).toBeNull()
      })
    })

    describe('when initialized beforehand', () => {
      it('returns the existing client', () => {
        const existingClient = initDefaultClient()

        const client = PusherClient.getClient()

        expect(client).toStrictEqual(existingClient)
      })
    })
  })

  describe('resetPusherClient', () => {
    it('resets the client to null', () => {
      initDefaultClient()

      PusherClient.resetPusherClient()
      const client = PusherClient.getClient()

      expect(client).toBeNull()
    })
  })

  describe('registerConnectionEvent', () => {
    describe('when NOT already initialized', () => {
      it('does call console.warn', () => {
        const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {})
        const handler = () => {}
        PusherClient.registerConnectionEvent('state_change', handler)

        expect(spy).toHaveBeenCalledTimes(1)
      })
    })

    describe('when initialized beforehand', () => {
      it('registers the function for the event and executes it when the event is fired', () => {
        const client = initDefaultClient()
        const handler = jest.fn()
        PusherClient.registerConnectionEvent('state_change', handler)

        client.connection.emit('state_change')

        expect(handler).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('subscribe', () => {
    describe('when NOT already initialized', () => {
      it('does call console.warn', () => {
        const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {})
        const channelName = 'my-channel'
        const eventHandlers = { 'my-event': () => {} }
        PusherClient.subscribe(channelName, eventHandlers)

        expect(spy).toHaveBeenCalledTimes(1)
      })
    })

    describe('when initialized beforehand', () => {
      it('calls the subscribe function', () => {
        const client = initDefaultClient()
        const channelName = 'my-channel'
        const eventHandlers = { 'my-event': () => {} }
        const spy = jest.spyOn(client, 'subscribe')
        PusherClient.subscribe(channelName, eventHandlers)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(channelName)
      })

      it('calls the console.warn function when the eventHandler is NOT a function', () => {
        initDefaultClient()
        const channelName = 'my-channel'
        const eventHandlers = { 'my-event': 'wierdo' }
        const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {})
        PusherClient.subscribe(channelName, eventHandlers)

        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('unsubscribe', () => {
    describe('when NOT initialized beforehand', () => {
      it('calls the unsubscribe function', () => {
        const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {})
        const channelName = 'my-channel'
        PusherClient.unsubscribe(channelName)

        expect(spy).toHaveBeenCalledTimes(1)
      })
    })

    describe('when initialized beforehand', () => {
      it('calls the unsubscribe function', () => {
        const client = initDefaultClient()
        const channelName = 'my-channel'
        const spy = jest.spyOn(client, 'unsubscribe')
        PusherClient.unsubscribe(channelName)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(channelName)
      })
    })
  })
})
