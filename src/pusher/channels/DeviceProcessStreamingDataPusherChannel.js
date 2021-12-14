const DeviceProcessSpecificPusherChannel = require('./DeviceProcessSpecificPusherChannel')

class DeviceProcessStreamingDataPusherChannel extends DeviceProcessSpecificPusherChannel {

  static get CHANNEL_NAME_SUFFIX() { return '_streaming_data' }

  static get EVENTS() {
    return {
      PROCESS_IMAGE_GENERATED: 'process-image-created',
      PROCESS_SENSOR_DATA_GENERATED: 'process-sensor-data-generated',
    }
  }

}

module.exports = DeviceProcessStreamingDataPusherChannel
