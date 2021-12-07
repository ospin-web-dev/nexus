const PusherClient = require('./PusherClient')

class OspinPusherClient extends PusherClient {

  static get DEVICE_OPERATION_EVENTS() {
    return {
      UPDATE_DEVICE_DESCRIPTION: 'update-device-description',
      UPDATE_DEVICE_CONNECTION: 'update-device-connection',
      UPDATE_DEVICE_STATE: 'update-device-state',
      UPDATE_DEVICE_DEFAULT_FCTGRAPH: 'update-device-default-fctGraph',
      DEVICE_EVENT: 'device-event',
    }
  }

  static get DEVICE_PROCESS_EVENTS() {
    return {
      PHASE_CHANGE: 'phase-change',
      ADD_DATAPOINTS: 'add-datapoints',
      ADD_IMAGES: 'add-images',
      UPDATE_DOWNLOAD_REQUEST: 'update-download-request',
    }
  }

  static get DEVICE_MAINTENANCE_EVENTS() {
    return {
      SSH_ENDPOINTS: 'ssh-endpoints',
    }
  }

  static generateCommonChannelNameSegment(deviceId) {
    return `private-device_${deviceId}`
  }

  static generateDeviceProcessChannelName(deviceId) {
    return `${OspinPusherClient.generateCommonChannelNameSegment(deviceId)}_process`
  }

  static generateDeviceOperationChannelName(deviceId) {
    return `${OspinPusherClient.generateCommonChannelNameSegment(deviceId)}_operation`
  }

  static generateDeviceMaintenanceChannelName(deviceId) {
    return `${OspinPusherClient.generateCommonChannelNameSegment(deviceId)}_maintenance`
  }

  static subscribeToDeviceProcessEvents(deviceId, eventHandler) {
    super.subscribe(OspinPusherClient.generateDeviceProcessChannelName(deviceId), eventHandler)
  }

  static subscribeToDeviceOperationEvents(deviceId, eventHandler) {
    super.subscribe(OspinPusherClient.generateDeviceOperationChannelName(deviceId), eventHandler)
  }

  static subscribeToDeviceMaintenanceEvents(deviceId, eventHandler) {
    super.subscribe(OspinPusherClient.generateDeviceMaintenanceChannelName(deviceId), eventHandler)
  }

  static unsubscribeFromDeviceProcessEvents(deviceId) {
    super.unsubscribe(OspinPusherClient.generateDeviceProcessChannelName(deviceId))
  }

  static unsubscribeFromDeviceOperationEvents(deviceId) {
    super.unsubscribe(OspinPusherClient.generateDeviceOperationChannelName(deviceId))
  }

  static unsubscribeFromDeviceMaintenanceEvents(deviceId) {
    super.unsubscribe(OspinPusherClient.generateDeviceMaintenanceChannelName(deviceId))
  }

}

module.exports = OspinPusherClient
