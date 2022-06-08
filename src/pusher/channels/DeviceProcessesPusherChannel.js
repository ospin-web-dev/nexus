const DeviceSpecificPusherChannel = require('./DeviceSpecificPusherChannel')

class DeviceProcessesPusherChannel extends DeviceSpecificPusherChannel {

  static get CHANNEL_NAME_SUFFIX() { return '_processes' }

  static get EVENTS() {
    return {
      RUNNING_PROCESS_STATE_UPDATE: 'running-process-state-update',
      PROCESS_DOWNLOAD_REQUEST_UPDATED: 'process-download-request-updated',
    }
  }

}

module.exports = DeviceProcessesPusherChannel
