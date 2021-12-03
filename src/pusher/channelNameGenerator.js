module.exports = {
  deviceProcess: deviceId => `private-device_${deviceId}_process`,
  deviceOperation: deviceId => `private-device_${deviceId}_operation`,
  deviceMaintenance: deviceId => `private-device_${deviceId}_maintenance`,
}
