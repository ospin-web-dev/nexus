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

const DEFAULT_OPTS = {
  ENV: 'dev',
  AWS_REGION: 'eu-central-1',
}

/**
 * @desc sets the environement and region for the API
 * @memberof nexus
 * @function configure
 * @param {Object} [customOptions]
 * @param {string} [customOptions.ENV = 'dev']
 * @param {string} [customOptions.AWS_REGION = 'eu-central-1']
 * @returns {Object} the generated configuration for the given options
 */

const configure = customOptions => {
  const connectionOpts = {
    ...DEFAULT_OPTS,
    ...customOptions,
  }
  const config = createConfig(connectionOpts)
  Amplify.configure(config)

  return config
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
  configure,
  utils,
  licence,
}
