const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')
const grantAccess = require('device/access/grant')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('grantAccess device', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    deviceId: faker.string.uuid(),
    params: [],
  }

  it('calls amplify\'s API.post method with the expected args', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await grantAccess(params)
    expect(API.post).toHaveBeenCalledWith(
      'device',
      `${params.deviceId}/access`,
      { body: params.params, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(grantAccess, 'post', [ params ])
})
