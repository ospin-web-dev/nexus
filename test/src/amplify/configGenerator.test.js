const { createConfig, getAuthConfig } = require('amplify/configGenerator')

describe('createConfig', () => {

  const ENVS = [ 'dev', 'prod', 'staging' ]
  const AWS_REGION = 'eu-central-1'

  ENVS.forEach(ENV => {
    test(`returns a config object with values that reflect the ${ENV} ENV`, () => {
      const expected = {
        PubSub: {
          region: AWS_REGION,
          endPoint: 'wss://a2q06p6h18ey04-ats.iot.eu-central-1.amazonaws.com/mqtt',
        },
        Analytics: { disabled: true },
        ...getAuthConfig({ ENV, AWS_REGION }),
        API: {
          endpoints: [
            {
              endpoint: `https://api-${ENV}.ospin-services.com/datapoints/`,
              name: 'datapoints',
              region: AWS_REGION,
            },
            {
              name: 'command',
              endpoint: `https://api-${ENV}.ospin-services.com/commands/`,
              region: AWS_REGION,
            },
            {
              endpoint: `https://api-${ENV}.ospin-services.com/devices/`,
              name: 'device',
              region: AWS_REGION,
            },
            {
              endpoint: `https://api-${ENV}.ospin-services.com/events/`,
              name: 'event',
              region: AWS_REGION,
            },
            {
              endpoint: `https://api-${ENV}.ospin-services.com/processes/`,
              name: 'process',
              region: AWS_REGION,
            },
            {
              endpoint: `https://api-${ENV}.ospin-services.com/users/`,
              name: 'user',
              region: AWS_REGION,
            },
            {
              endpoint: `https://api-${ENV}.ospin-services.com/utils/`,
              name: 'utils',
              region: AWS_REGION,
            },
            {
              endpoint: `https://api-${ENV}.ospin-services.com/logs/`,
              name: 'log',
              region: AWS_REGION,
            },
            {
              endpoint: `https://api-${ENV}.ospin-services.com/uiconfigs/`,
              name: 'uiconfig',
              region: AWS_REGION,
            },
            {
              endpoint: `https://api-${ENV}.ospin-services.com/device-api/`,
              name: 'device-api',
              region: AWS_REGION,
            },
          ],
        },
        stage: ENV,
      }

      const returnedConfig = createConfig({ ENV, AWS_REGION })
      expect(returnedConfig).toStrictEqual(expect.objectContaining(expected))
    })
  })
})
