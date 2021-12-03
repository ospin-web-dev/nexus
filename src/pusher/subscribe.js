const { getPusherClient } = require('./connectToPusher')
const {
  DEVICE_OPERATION_EVENTS,
  DEVICE_PROCESS_EVENTS,
  DEVICE_MAINTENANCE_EVENTS,
} = require('./eventsRegistry')
const channelNameGenerator = require('./channelNameGenerator')

const subscribe = (channelName, events, eventHandler) => {

  const pusher = getPusherClient()

  if (!pusher) return

  const channel = pusher.subscribe(channelName)
  Object.values(events).forEach(eventName => {
    channel.bind(eventName, data => {
      eventHandler[eventName](data)
    })
  })
}

const subscribeToDeviceOperationEvents = (deviceId, eventHandler) => {
  subscribe(channelNameGenerator.deviceOperation(deviceId), DEVICE_OPERATION_EVENTS, eventHandler)
}

const subscribeToDeviceProcessEvents = (deviceId, eventHandler) => {
  subscribe(channelNameGenerator.deviceProcess(deviceId), DEVICE_PROCESS_EVENTS, eventHandler)
}

const subscribeToDeviceMaintenanceEvents = (deviceId, eventHandler) => {
  subscribe(channelNameGenerator
    .deviceMaintenance(deviceId), DEVICE_MAINTENANCE_EVENTS, eventHandler)
}

module.exports = {
  subscribeToDeviceOperationEvents,
  subscribeToDeviceProcessEvents,
  subscribeToDeviceMaintenanceEvents,
}
