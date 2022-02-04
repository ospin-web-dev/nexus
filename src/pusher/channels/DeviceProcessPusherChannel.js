const DeviceProcessSpecificPusherChannel = require('./DeviceProcessSpecificPusherChannel')

class DeviceProcessPusherChannel extends DeviceProcessSpecificPusherChannel {

  static get CHANNEL_NAME_SUFFIX() { return '' }

  static get EVENTS() {
    return {
      PROCESS_UPDATE: 'process-update',
    }
  }

}

module.exports = DeviceProcessPusherChannel
