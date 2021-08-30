const { Amplify } = require('aws-amplify')

const Auth = require('./src/auth')
const User = require('./src/user')
const Device = require('./src/device')
const Log = require('./src/log')
const Process = require('./src/process')
const deviceAPI = require('./src/deviceAPI')
const UIConfig = require('./src/uIConfig')
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

module.exports = {
  auth: Auth,
  user: User,
  device: Device,
  log: Log,
  process: Process,
  uIConfig: UIConfig,
  deviceAPI,
  connect,
  createConfig,
}
