const { pusher } = require('./connectToPusher')
const channelNameGenerator = require('./channelNameGenerator')

const unsubscribeFromDeviceProcess = deviceId => {
  if (pusher) pusher.unsubscribe(channelNameGenerator.deviceProcess(deviceId))
}

const unsubscribeFromDeviceOperation = deviceId => {
  if (pusher) pusher.unsubscribe(channelNameGenerator.deviceOperation(deviceId))
}

const unsubscribeFromDeviceMaintenance = deviceId => {
  if (pusher) pusher.unsubscribe(channelNameGenerator.deviceMaintenance(deviceId))
}

module.exports = {
  unsubscribeFromDeviceProcess,
  unsubscribeFromDeviceOperation,
  unsubscribeFromDeviceMaintenance,
}
