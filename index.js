const { Amplify } = require('aws-amplify')

const Auth = require('./src/auth')
const User = require('./src/user')
const Device = require('./src/device')
const Log = require('./src/log')
const { createConfig } = require('./src/amplify/createConfig')

const connectToEnv = env => {
  const config = createConfig(env)
  const result = Amplify.configure(config)

  return { result, config }
}

module.exports = {
  auth: Auth,
  user: User,
  device: Device,
  log: Log,
  connectToEnv,
  createConfig,
}
