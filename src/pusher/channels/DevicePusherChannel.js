const DeviceSpecificPusherChannel = require('./DeviceSpecificPusherChannel')

class DevicePusherChannel extends DeviceSpecificPusherChannel {

  static get CHANNEL_NAME_SUFFIX() { return '' }

  static get EVENTS() {
    return {
      DEVICE_DESCRIPTION_UPDATED: 'device-description-updated',
      DEVICE_CONNECTION_UPDATED: 'device-connection-updated',
      DEVICE_STATE_UPDATED: 'device-state-updated',
      DEVICE_DEFAULT_FCT_GRAPH_UPDATED: 'device-default-fct-graph-updated',
      DEVICE_EVENT_CREATED: 'device-event-created',
    }
  }

}

module.exports = DevicePusherChannel
