const faker = require('faker')
const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const nexus = require('../../../../index')
const setUpAuthenticatedDeviceAPI = require('../../../testHelpers/setUpAuthenticatedDeviceAPI')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

describe('get Process', () => {

  const { deviceId } = setUpAuthenticatedDeviceAPI()
  const processId = faker.datatype.uuid()

  testHTTPEndpoint({
    name: 'get process',
    handler: nexus.deviceAPI.process.get,
    httpVerb: 'get',
    serviceName: 'device-api',
    params: [processId],
    expectedURLSegment: `devices/${deviceId}/processes/${processId}`,
    expectedPayload: AuthenticatedDeviceAPI.authorizationHeaders,
  })
})
