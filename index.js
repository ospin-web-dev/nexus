const { default: Amplify } = require('@aws-amplify/core')
const auth = require('./src/auth')
const user = require('./src/user')
const command = require('./src/command')
const device = require('./src/device')
const event = require('./src/event')
const log = require('./src/log')
const process = require('./src/process')
const deviceAPI = require('./src/deviceAPI')
const uIConfig = require('./src/uIConfig')
const dataPoints = require('./src/dataPoints')
const utils = require('./src/utilsService')
const licence = require('./src/licence')
const pusher = require('./src/pusher')
const { createConfig } = require('./src/amplify/configGenerator')

const DEFAULT_CONNECTION_OPTS = {
  ENV: 'dev',
  AWS_REGION: 'eu-central-1',
}

const connect = customConnectionOpts => {
  const connectionOpts = {
    ...DEFAULT_CONNECTION_OPTS,
    ...customConnectionOpts,
  }
  const config = createConfig(connectionOpts)
  const result = Amplify.configure(config)

  return { result, config }
}

/**
 * @namespace nexus
 */

module.exports = {
  auth,
  user,
  command,
  device,
  event,
  log,
  process,
  uIConfig,
  dataPoints,
  pusher,
  deviceAPI,
  connect,
  createConfig,
  utils,
  licence,
}
