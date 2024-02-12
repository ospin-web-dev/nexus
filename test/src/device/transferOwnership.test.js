const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')
const transferOwnership = require('device/transferOwnership')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('transferOwnership device', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    deviceId: faker.string.uuid(),
    params: [],
  }

  it('calls amplify\'s API.put method with the expected args', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)

    await transferOwnership(params)
    expect(API.put).toHaveBeenCalledWith(
      'device',
      `${params.deviceId}/transfer-ownership`,
      { body: params.params, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(transferOwnership, 'put', [ params ])
})
