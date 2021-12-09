const RegexUtils = require('../utils/RegexUtils')
const PusherClient = require('./PusherClient')
const batchAuthorizer = require('./batchAuthorizer')

class OspinPusherClient extends PusherClient {

  static connect({ apiKey, userId, cluster = 'eu' }) {
    return super.connect({ apiKey, cluster, authorizer: batchAuthorizer(userId) })
  }

  static get DEVICE_EVENTS() {
    return {
      DEVICE_DESCRIPTION_UPDATED: 'device-description-updated',
      DEVICE_CONNECTION_UPDATED: 'device-connection-updated',
      DEVICE_STATE_UPDATED: 'device-state-updated',
      DEVICE_DEFAULT_FCT_GRAPH_UPDATED: 'device-default-fct-graph-updated',
      DEVICE_EVENT_CREATED: 'device-event-created'
    }
  }

  static get DEVICE_MAINTENANCE_EVENTS() {
    return {
      DEVICE_SSH_CONNECTION_OPENED: 'device-ssh-connection-opened',
    }
  }

  static get DEVICE_PROCESSES_EVENTS() {
    return {
      PROCESS_PHASE_CHANGED: 'process-phase-changed',
      PROCESS_DOWNLOAD_REQUEST_UPDATED: 'process-download-request-updated',
    }
  }

  static get DEVICE_PROCESS_STREAM_DATA_EVENTS() {
    return {
      PROCESS_IMAGE_GENERATED: 'process-image-created',
      PROCESS_SENSOR_DATA_GENERATED: 'process-sensor-data-generated',
    }
  }

  static get DEVICE_PROCESS_EVENTS() {
    return {}
  }

  static isDeviceProcessChannel(channelName) {
    const uuidRegString = RegexUtils.UUIDV4_REGEX_STRING
    const regex = new RegExp(`private-device_${uuidRegString}_process_${uuidRegString}(|_streaming_data)$`)
    return regex.test(channelName)
  }

  static generateCommonDeviceChannelNameSegment(deviceId) {
    return `private-device_${deviceId}`
  }

  static generateCommonDeviceProcessChannelNameSegment(deviceId, processId) {
    return `${OspinPusherClient.generateCommonDeviceChannelNameSegment(deviceId)}_process_${processId}`
  }

  static generateDeviceChannelName(deviceId) {
    return OspinPusherClient.generateCommonDeviceChannelNameSegment(deviceId)
  }

  static generateDeviceMaintenanceChannelName(deviceId) {
    return `${OspinPusherClient.generateCommonDeviceChannelNameSegment(deviceId)}_maintenance`
  }

  static generateDeviceProcessesChannelName(deviceId) {
    return `${OspinPusherClient.generateCommonDeviceChannelNameSegment(deviceId)}_processes`
  }

  static generateDeviceProcessChannelName(deviceId, processId) {
    return OspinPusherClient.generateCommonDeviceProcessChannelNameSegment(deviceId, processId)
  }

  static generateDeviceProcessStreamingDataChannelName(deviceId, processId) {
    return `${OspinPusherClient.generateCommonDeviceProcessChannelNameSegment(deviceId, processId)}_streaming_data}`
  }

  static subscribeToDeviceProcessesEvents(deviceId, eventHandler) {
    super.subscribe(OspinPusherClient.generateDeviceProcessesChannelName(deviceId), eventHandler)
  }

  static unsubscribeFromDeviceProcessesEvents(deviceId) {
    super.unsubscribe(OspinPusherClient.generateDeviceProcessesChannelName(deviceId))
  }

  static subscribeToDeviceEvents(deviceId, eventHandler) {
    super.subscribe(OspinPusherClient.generateDeviceChannelName(deviceId), eventHandler)
  }

  static unsubscribeFromDeviceEvents(deviceId) {
    super.unsubscribe(OspinPusherClient.generateDeviceChannelName(deviceId))
  }

  static subscribeToDeviceMaintenanceEvents(deviceId, eventHandler) {
    super.subscribe(OspinPusherClient.generateDeviceMaintenanceChannelName(deviceId), eventHandler)
  }

  static unsubscribeFromDeviceMaintenanceEvents(deviceId) {
    super.unsubscribe(OspinPusherClient.generateDeviceMaintenanceChannelName(deviceId))
  }

  static subscribeToDeviceProcessEvents(deviceId, eventHandler) {
    super.subscribe(OspinPusherClient.generateDeviceProcessChannelName(deviceId), eventHandler)
  }

  static unsubscribeFromDeviceProcessEvents(deviceId) {
    super.unsubscribe(OspinPusherClient.generateDeviceProcessChannelName(deviceId))
  }

  static subscribeToDeviceProcessStreamingDataEvents(deviceId, eventHandler) {
    super.subscribe(OspinPusherClient.generateDeviceProcessStreamingDataChannelName(deviceId), eventHandler)
  }

  static unsubscribeFromDeviceProcessStreamingDataEvents(deviceId) {
    super.unsubscribe(OspinPusherClient.generateDeviceProcessStreamingDataChannelName(deviceId))
  }

}

module.exports = OspinPusherClient
