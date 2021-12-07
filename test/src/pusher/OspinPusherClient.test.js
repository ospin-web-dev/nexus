const faker = require('faker')
const { OspinPusherClient } = require('pusher')
const PusherClient = require('pusher/PusherClient')

jest.mock('pusher-js', () => {
  const { PusherMock } = require('pusher-js-mock')
  PusherMock.prototype.disconnect = () => {}
  return PusherMock
})

describe('the OspinPusherClient', () => {

  beforeEach(() => {
    OspinPusherClient.resetPusherClient()
    jest.clearAllMocks()
  })

  describe('the getter for DEVICE_OPERATION_EVENTS', () => {
    it('returns the map of device operation events', () => {
      const map = OspinPusherClient.DEVICE_OPERATION_EVENTS

      expect(map).toStrictEqual({
        UPDATE_DEVICE_DESCRIPTION: 'update-device-description',
        UPDATE_DEVICE_CONNECTION: 'update-device-connection',
        UPDATE_DEVICE_STATE: 'update-device-state',
        UPDATE_DEVICE_DEFAULT_FCTGRAPH: 'update-device-default-fctGraph',
        DEVICE_EVENT: 'device-event',
      })
    })
  })

  describe('the getter for DEVICE_PROCESS_EVENTS', () => {
    it('returns the map of device process events', () => {
      const map = OspinPusherClient.DEVICE_PROCESS_EVENTS

      expect(map).toStrictEqual({
        PHASE_CHANGE: 'phase-change',
        ADD_DATAPOINTS: 'add-datapoints',
        ADD_IMAGES: 'add-images',
        UPDATE_DOWNLOAD_REQUEST: 'update-download-request',
      })
    })
  })

  describe('the getter for DEVICE_MAINTENANCE_EVENTS', () => {
    it('returns the map of device maintenance events', () => {
      const map = OspinPusherClient.DEVICE_MAINTENANCE_EVENTS

      expect(map).toStrictEqual({
        SSH_ENDPOINTS: 'ssh-endpoints',
      })
    })
  })

  describe('generateDeviceProcessChannelName', () => {
    it('returns the generated correct channelName', () => {
      const deviceId = faker.datatype.uuid
      const res = OspinPusherClient.generateDeviceProcessChannelName(deviceId)

      expect(res).toBe(`private-device_${deviceId}_process`)
    })
  })

  describe('generateDeviceMaintenanceChannelName', () => {
    it('returns the generated correct channelName', () => {
      const deviceId = faker.datatype.uuid
      const res = OspinPusherClient.generateDeviceMaintenanceChannelName(deviceId)

      expect(res).toBe(`private-device_${deviceId}_maintenance`)
    })
  })

  describe('generateDeviceOperationChannelName', () => {
    it('returns the generated correct channelName', () => {
      const deviceId = faker.datatype.uuid
      const res = OspinPusherClient.generateDeviceOperationChannelName(deviceId)

      expect(res).toBe(`private-device_${deviceId}_operation`)
    })
  })

  describe('subscribeToDeviceProcessEvents', () => {
    it('calls super.subscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'subscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.subscribeToDeviceProcessEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('subscribeToDeviceOperationEvents', () => {
    it('calls super.subscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'subscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.subscribeToDeviceOperationEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('subscribeToDeviceMaintenanceEvents', () => {
    it('calls super.subscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'subscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.subscribeToDeviceMaintenanceEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('unsubscribeToDeviceProcessEvents', () => {
    it('calls super.unsubscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'unsubscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.unsubscribeFromDeviceProcessEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('unsubscribeToDeviceOperationEvents', () => {
    it('calls super.unsubscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'unsubscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.unsubscribeFromDeviceOperationEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('unsubscribeToDeviceMaintenanceEvents', () => {
    it('calls super.unsubscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'unsubscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.unsubscribeFromDeviceMaintenanceEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

})
