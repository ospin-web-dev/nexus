const DeviceSpecificPusherChannel = require('./DeviceSpecificPusherChannel')

class DeviceMaintenancePusherChannel extends DeviceSpecificPusherChannel {

  static get CHANNEL_NAME_SUFFIX() { return '_maintenance' }

  static get EVENTS() {
    return {
      DEVICE_SSH_CONNECTION_OPENED: 'device-ssh-connection-opened',
    }
  }

}

module.exports = DeviceMaintenancePusherChannel
