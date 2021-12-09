const faker = require('faker')
const OspinPusherClient = require('pusher')
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

  describe('connect', () => {
    it('calls super.connect', () => {
      const spy = jest.spyOn(PusherClient, 'connect').mockImplementation()
      const userId = faker.datatype.uuid
      const apiKey = '1234'
      OspinPusherClient.connect({ apiKey, userId })

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('the getter for DEVICE_OPERATION_EVENTS', () => {
    it('returns the map of device operation events', () => {
      const map = OspinPusherClient.DEVICE_EVENTS

      expect(map).toStrictEqual({
        DEVICE_DESCRIPTION_UPDATED: 'device-description-updated',
        DEVICE_CONNECTION_UPDATED: 'device-connection-updated',
        DEVICE_STATE_UPDATED: 'device-state-updated',
        DEVICE_DEFAULT_FCT_GRAPH_UPDATED: 'device-default-fct-graph-updated',
        DEVICE_EVENT_CREATED: 'device-event-created'
      })
    })
  })

  describe('the getter for DEVICE_MAINTENANCE_EVENTS', () => {
    it('returns the map of device maintenance events', () => {
      const map = OspinPusherClient.DEVICE_MAINTENANCE_EVENTS

      expect(map).toStrictEqual({
        DEVICE_SSH_CONNECTION_OPENED: 'device-ssh-connection-opened',
      })
    })
  })

  describe('the getter for DEVICE_PROCESSES_EVENTS', () => {
    it('returns the map of device maintenance events', () => {
      const map = OspinPusherClient.DEVICE_PROCESSES_EVENTS

      expect(map).toStrictEqual({
        PROCESS_PHASE_CHANGED: 'process-phase-changed',
        PROCESS_DOWNLOAD_REQUEST_UPDATED: 'process-download-request-updated',
      })
    })
  })

  describe('the getter for DEVICE_PROCESS_EVENTS', () => {
    it('returns the map of device process events', () => {
      const map = OspinPusherClient.DEVICE_PROCESS_EVENTS

      expect(map).toStrictEqual({})
    })
  })

  describe('the getter for DEVICE_PROCESS_STREAM_DATA_EVENTS', () => {
    it('returns the map of device process events', () => {
      const map = OspinPusherClient.DEVICE_PROCESS_STREAM_DATA_EVENTS

      expect(map).toStrictEqual({
        PROCESS_IMAGE_GENERATED: 'process-image-created',
        PROCESS_SENSOR_DATA_GENERATED: 'process-sensor-data-generated',
      })
    })
  })

  describe('generateDeviceProcessChannelName', () => {
    it('returns the generated correct channelName', () => {
      const deviceId = faker.datatype.uuid
      const processId = faker.datatype.uuid
      const res = OspinPusherClient.generateDeviceProcessChannelName(deviceId, processId)

      expect(res).toBe(`private-device_${deviceId}_process_${processId}`)
    })
  })

  describe('generateDeviceMaintenanceChannelName', () => {
    it('returns the generated correct channelName', () => {
      const deviceId = faker.datatype.uuid
      const res = OspinPusherClient.generateDeviceMaintenanceChannelName(deviceId)

      expect(res).toBe(`private-device_${deviceId}_maintenance`)
    })
  })

  describe('generateDeviceChannelName', () => {
    it('returns the generated correct channelName', () => {
      const deviceId = faker.datatype.uuid
      const res = OspinPusherClient.generateDeviceChannelName(deviceId)

      expect(res).toBe(`private-device_${deviceId}`)
    })
  })

  describe('subscribeToDeviceEvents', () => {
    it('calls super.subscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'subscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.subscribeToDeviceEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('subscribeToDeviceProcessesEvents', () => {
    it('calls super.subscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'subscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.subscribeToDeviceProcessesEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('subscribeToDeviceProcessStreamingDataEvents', () => {
    it('calls super.subscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'subscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.subscribeToDeviceProcessStreamingDataEvents(deviceId, eventHandler)

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

  describe('subscribeToDeviceProcessEvents', () => {
    it('calls super.subscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'subscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.subscribeToDeviceProcessEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('unsubscribeFromDeviceEvents', () => {
    it('calls super.unsubscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'unsubscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.unsubscribeFromDeviceEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('unsubscribeFromDeviceProcessesEvents', () => {
    it('calls super.unsubscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'unsubscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.unsubscribeFromDeviceProcessesEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('unsubscribeFromDeviceMaintenanceEvents', () => {
    it('calls super.unsubscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'unsubscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.unsubscribeFromDeviceMaintenanceEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('unsubscribeFromDeviceProcessEvents', () => {
    it('calls super.unsubscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'unsubscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.unsubscribeFromDeviceProcessEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('unsubscribeFromDeviceProcessStreamingDataEvents', () => {
    it('calls super.unsubscribe with the correct parameters', () => {
      const spy = jest.spyOn(PusherClient, 'unsubscribe').mockImplementation()
      const deviceId = faker.datatype.uuid
      const eventHandler = { 'my-event': () => {} }

      OspinPusherClient.unsubscribeFromDeviceProcessStreamingDataEvents(deviceId, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

})
