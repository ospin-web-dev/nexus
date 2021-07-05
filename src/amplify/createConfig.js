const AWS_REGION = 'eu-central-1'

/*************************************************************/
/*                          COMMON                           */
/*************************************************************/

const getCommonConfig = () => ({
  PubSub: {
    region: AWS_REGION,
    endPoint: 'wss://a2q06p6h18ey04-ats.iot.eu-central-1.amazonaws.com/mqtt',
  },
  Analytics: { disabled: true },
})

/*************************************************************/
/*                            API                            */
/*************************************************************/

const getAPIEndPointsConfig = env => ({
  API: {
    endpoints: [
      {
        name: 'device',
        endpoint: `https://api-${env}.ospin-services.com/devices/`,
        region: AWS_REGION,
      },
      {
        name: 'event',
        endpoint: `https://api-${env}.ospin-services.com/events/`,
        region: AWS_REGION,
      },
      {
        name: 'process',
        endpoint: `https://api-${env}.ospin-services.com/processes/`,
        region: AWS_REGION,
      },
      {
        name: 'user',
        endpoint: `https://api-${env}.ospin-services.com/users/`,
        region: AWS_REGION,
      },
      {
        name: 'utils',
        endpoint: `https://api-${env}.ospin-services.com/utils/`,
        region: AWS_REGION,
      },
      {
        name: 'log',
        endpoint: `https://api-${env}.ospin-services.com/logs/`,
        region: AWS_REGION,
      },
      {
        name: 'uiconfig',
        endpoint: `https://api-${env}.ospin-services.com/uiconfigs/`,
        region: AWS_REGION,
      },
    ],
  },
})

/*************************************************************/
/*                            AUTH                           */
/*************************************************************/

const ENV_CONFIGS = {
  dev: {
    userPoolId: 'eu-central-1_RZYHLQE41',
    userPoolWebClientId: '7uu1n5c3dhp2vrsknh78hos1ho',
    identityPoolId: 'eu-central-1:ee3fb1bd-13d2-4692-8cb3-e1f86ebbfa0b',
  },
  prod: {
    userPoolId: 'eu-central-1_zNHPrnTaz',
    userPoolWebClientId: '12s549a91623fitisvhd5pg8od',
    identityPoolId: 'eu-central-1:bea7c430-b2ac-4b11-b2cf-9fab7d8318ac',
  },
  staging: {
    userPoolId: 'eu-central-1_zNHPrnTaz',
    userPoolWebClientId: '12s549a91623fitisvhd5pg8od',
    identityPoolId: 'eu-central-1:bea7c430-b2ac-4b11-b2cf-9fab7d8318ac',
  },
}

const getAuthConfig = env => ({
  Auth: {
    mandatorySignIn: false,
    region: AWS_REGION,
    userPoolId: ENV_CONFIGS[env].userPoolId,
    userPoolWebClientId: ENV_CONFIGS[env].userPoolWebClientId,
    identityPoolId: ENV_CONFIGS[env].identityPoolId,
  },
})

/*************************************************************/
/*                          MERGING                          */
/*************************************************************/

const createConfig = env => ({
  ...getCommonConfig(),
  ...getAuthConfig(env),
  ...getAPIEndPointsConfig(env),
  stage: env,
})

module.exports = { createConfig, getAuthConfig }
