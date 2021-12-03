const DEVICE_OPERATION_EVENTS = {
  UPDATE_DEVICE_DESCRIPTION: 'update-device-description',
  UPDATE_DEVICE_CONNECTION: 'update-device-connection',
  UPDATE_DEVICE_STATE: 'update-device-state',
  UPDATE_DEVICE_DEFAULT_FCTGRAPH: 'update-device-default-fctGraph',
  DEVICE_EVENT: 'device-event',
}

const DEVICE_PROCESS_EVENTS = {
  PHASE_CHANGE: 'phase-change',
  ADD_DATAPOINTS: 'add-datapoints',
  ADD_IMAGES: 'add-images',
  UPDATE_DOWNLOAD_REQUEST: 'update-download-request',
}

const DEVICE_MAINTENANCE_EVENTS = { SSH_ENDPOINTS: 'ssh-endpoints' }

module.exports = {
  DEVICE_OPERATION_EVENTS,
  DEVICE_PROCESS_EVENTS,
  DEVICE_MAINTENANCE_EVENTS,
}
