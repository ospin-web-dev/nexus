const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const functionality = require('../../../src/deviceAPI/functionality')
const setUpAuthenticatedDeviceAPI = require('../../testHelpers/setUpAuthenticatedDeviceAPI')
const testHTTPEndpoint = require('../../testHelpers/testHTTPEndpoint')

describe('update functionalities', () => {
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
    handler: functionality,
    httpVerb: 'put',
    serviceName: 'device-api',
    expectedURLSegment: `devices/${deviceId}/functionalities`,
    params: [params],
    expectedPayload: { body: params, ...AuthenticatedDeviceAPI.authorizationHeaders },
  })
})
