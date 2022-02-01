const faker = require('faker')

const nexus = require('../..')

function setUpAuthenticatedDeviceAPI({
  deviceId = faker.datatype.uuid(),
  pathToCert = 'test/seedData/fakeDevice_cert.crt',
} = {}) {
  nexus.deviceAPI.authentication.setCredentials({ deviceId, pathToCert })
  return { deviceId, pathToCert }
}

module.exports = setUpAuthenticatedDeviceAPI
