const { faker } = require('@faker-js/faker')
const { default: API } = require('@aws-amplify/api-rest')

const get = require('user/device/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('get', () => {

  const params = {
    userId: faker.string.uuid(),
    deviceId: faker.string.uuid(),
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await get(params)
    expect(API.get).toHaveBeenCalledWith(
      'user',
      `${params.userId}/devices/${params.deviceId}`,
      DEFAULT_REQ_OPTS,
    )
  })

  testDefaultHTTPResponses(get, 'get', [ params ])
})
