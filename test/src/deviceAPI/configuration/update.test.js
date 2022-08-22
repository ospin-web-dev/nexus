const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const nexus = require('../../../../index')
const setUpAuthenticatedDeviceAPI = require('../../../testHelpers/setUpAuthenticatedDeviceAPI')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

describe('update Configuration', () => {
  const params = {
    fctGraph: {
      name: 'graph',
    },
    supportedVirtualFunctionalities: [ 'fct1', 'fct2']
    ,
  }
  const { deviceId } = setUpAuthenticatedDeviceAPI()

  testHTTPEndpoint({
    name: 'registration',
    handler: nexus.deviceAPI.configuration.update,
    httpVerb: 'post',
    serviceName: 'device-api',
    expectedURLSegment: `devices/${deviceId}/configuration`,
    params: [params],
    expectedPayload: { body: params, ...AuthenticatedDeviceAPI.authorizationHeaders },
  })
})
