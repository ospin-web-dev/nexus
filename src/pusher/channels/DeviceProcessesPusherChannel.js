const DeviceSpecificPusherChannel = require('./DeviceSpecificPusherChannel')

class DeviceProcessesPusherChannel extends DeviceSpecificPusherChannel {

  static get CHANNEL_NAME_SUFFIX() { return '_processes' }

  static get EVENTS() {
    return {
      PROCESS_PHASE_CHANGED: 'process-phase-changed',
      PROCESS_DOWNLOAD_REQUEST_UPDATED: 'process-download-request-updated',
    }
  }

}

module.exports = DeviceProcessesPusherChannel
