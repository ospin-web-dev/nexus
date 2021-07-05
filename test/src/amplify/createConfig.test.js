const { createConfig, getAuthConfig } = require('amplify/createConfig')

describe('createConfig', () => {

  const ENVS = [ 'dev', 'prod', 'staging' ]

  ENVS.forEach(env => {
    test(`returns a config object with values that reflect the ${env} env`, () => {
      const expected = {
        PubSub: {
          region: 'eu-central-1',
          endPoint: 'wss://a2q06p6h18ey04-ats.iot.eu-central-1.amazonaws.com/mqtt',
        },
        Analytics: { disabled: true },
        ...getAuthConfig(env),
        API: {
          endpoints: [
            {
              endpoint: `https://api-${env}.ospin-services.com/devices/`,
              name: 'device',
              region: 'eu-central-1',
            },
            {
              endpoint: `https://api-${env}.ospin-services.com/events/`,
              name: 'event',
              region: 'eu-central-1',
            },
            {
              endpoint: `https://api-${env}.ospin-services.com/processes/`,
              name: 'process',
              region: 'eu-central-1',
            },
            {
              endpoint: `https://api-${env}.ospin-services.com/users/`,
              name: 'user',
              region: 'eu-central-1',
            },
            {
              endpoint: `https://api-${env}.ospin-services.com/utils/`,
              name: 'utils',
              region: 'eu-central-1',
            },
            {
              endpoint: `https://api-${env}.ospin-services.com/logs/`,
              name: 'log',
              region: 'eu-central-1',
            },
            {
              endpoint: `https://api-${env}.ospin-services.com/uiconfigs/`,
              name: 'uiconfig',
              region: 'eu-central-1',
            },
          ],
        },
        stage: env,
      }

      const returnedConfig = createConfig(env)
      expect(returnedConfig).toStrictEqual(expect.objectContaining(expected))
    })
  })
})
