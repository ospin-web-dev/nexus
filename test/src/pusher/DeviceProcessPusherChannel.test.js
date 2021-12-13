const faker = require('faker')
const { DeviceProcessPusherChannel, OspinPusherClient } = require('pusher')

jest.mock('pusher-js', () => {
  const { PusherMock } = require('pusher-js-mock')
  PusherMock.prototype.disconnect = () => {}
  return PusherMock
})

describe('the DeviceProcessPusherChannel', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const connectClient = () => {
    return OspinPusherClient.connect({ apiKey: '123', userId: faker.datatype.uuid() })
  }

  describe('the getter for EVENTS', () => {

    it('returns the map of device events', () => {
      const map = DeviceProcessPusherChannel.EVENTS

      expect(map).toStrictEqual({})
    })
  })

  describe('subscribe', () => {
    it('calls client.subscribe with the correct parameters', () => {
      const client = connectClient()
      jest.spyOn(console, 'warn').mockImplementation()
      const spy = jest.spyOn(client, 'subscribe').mockImplementation(() => ({
        bind: () => {}
      }))
      const deviceId = faker.datatype.uuid()
      const processId = faker.datatype.uuid()
      const eventHandler = { 'future-event-to-be-defined': () => {} }

      DeviceProcessPusherChannel.subscribe({ deviceId, processId }, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`private-device_${deviceId}_process_${processId}`)
    })
  })

  describe('unsubscribe', () => {
    it('calls client.unsubscribe with the correct parameters', () => {
      const client = connectClient()
      const spy = jest.spyOn(client, 'unsubscribe').mockImplementation()
      const deviceId = faker.datatype.uuid()
      const processId = faker.datatype.uuid()

      DeviceProcessPusherChannel.unsubscribe({ deviceId, processId })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`private-device_${deviceId}_process_${processId}`)
    })
  })
})
