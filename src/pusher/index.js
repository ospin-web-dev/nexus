const { init, getPusherClient } = require('./connectToPusher')
const disconnect = require('./disconnectFromPusher')
const {
  subscribeToDeviceOperationEvents,
  subscribeToDeviceProcessEvents,
  subscribeToDeviceMaintenanceEvents,
} = require('./subscribe')
const {
  unsubscribeFromDeviceOperation,
  unsubscribeFromDeviceProcess,
  unsubscribeFromDeviceMaintenance,
} = require('./unsubscribe')
const {
  DEVICE_OPERATION_EVENTS,
  DEVICE_PROCESS_EVENTS,
  DEVICE_MAINTENANCE_EVENTS,
} = require('./eventsRegistry')

module.exports = {
  init,
  getPusherClient,
  subscribeToDeviceOperationEvents,
  unsubscribeFromDeviceOperation,
  subscribeToDeviceProcessEvents,
  unsubscribeFromDeviceProcess,
  subscribeToDeviceMaintenanceEvents,
  unsubscribeFromDeviceMaintenance,
  DEVICE_OPERATION_EVENTS,
  DEVICE_PROCESS_EVENTS,
  DEVICE_MAINTENANCE_EVENTS,
  disconnect,
}
