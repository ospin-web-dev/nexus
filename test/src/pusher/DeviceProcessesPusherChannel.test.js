const faker = require('faker')
const { DeviceProcessesPusherChannel, OspinPusherClient } = require('pusher')

jest.mock('pusher-js', () => {
  // eslint-disable-next-line
  const { PusherMock } = require('pusher-js-mock')
  PusherMock.prototype.disconnect = () => {}
  return PusherMock
})

describe('the DeviceProcessesPusherChannel', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const connectClient = () => OspinPusherClient.connect({ apiKey: '123', userId: faker.datatype.uuid() })

  describe('the getter for EVENTS', () => {

    it('returns the map of device events', () => {
      const map = DeviceProcessesPusherChannel.EVENTS

      expect(map).toStrictEqual({
        PROCESS_PHASE_CHANGED: 'process-phase-changed',
        PROCESS_DOWNLOAD_REQUEST_UPDATED: 'process-download-request-updated',
      })
    })
  })

  describe('subscribe', () => {
    it('calls client.subscribe with the correct parameters', () => {
      const client = connectClient()
      const spy = jest.spyOn(client, 'subscribe').mockImplementation(() => ({
        bind: () => {},
      }))
      const deviceId = faker.datatype.uuid()
      const eventHandler = { 'process-phase-changed': () => {} }

      DeviceProcessesPusherChannel.subscribe({ deviceId }, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`private-device_${deviceId}_processes`)
    })
  })

  describe('unsubscribe', () => {
    it('calls client.unsubscribe with the correct parameters', () => {
      const client = connectClient()
      const spy = jest.spyOn(client, 'unsubscribe').mockImplementation()
      const deviceId = faker.datatype.uuid()

      DeviceProcessesPusherChannel.unsubscribe({ deviceId })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`private-device_${deviceId}_processes`)
    })
  })
})
