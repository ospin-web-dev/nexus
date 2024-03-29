const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')

const validate = require('device/validate')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('validate', () => {

  const deviceId = faker.string.uuid()

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await validate(deviceId)
    expect(API.get).toHaveBeenCalledWith('device', `${deviceId}/validate`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(validate, 'get', [ deviceId ])
})
