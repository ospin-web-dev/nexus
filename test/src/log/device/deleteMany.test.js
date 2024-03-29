const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')

const deleteMany = require('log/device/deleteMany')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('deleteMany', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.del method', async () => {
    jest.spyOn(API, 'del').mockImplementation(args => args)
    const deviceId = faker.string.uuid()

    await deleteMany(deviceId)
    expect(API.del).toHaveBeenCalledWith('log', `devices/${deviceId}`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(deleteMany, 'del')
})
