const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const nexus = require('../../../index')
const setUpAuthenticatedDeviceAPI = require('../../testHelpers/setUpAuthenticatedDeviceAPI')
const testHTTPEndpoint = require('../../testHelpers/testHTTPEndpoint')

describe('registration', () => {
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
    handler: nexus.deviceAPI.registration,
    httpVerb: 'post',
    serviceName: 'device-api',
    expectedURLSegment: `devices/${deviceId}/registrations`,
    params: [params],
    expectedPayload: { body: params, ...AuthenticatedDeviceAPI.authorizationHeaders },
  })
})
