const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')
const modifyAccess = require('device/access/modify')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('modifyAccess device', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    deviceId: faker.string.uuid(),
    params: [],
  }

  it('calls amplify\'s API.put method with the expected args', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)

    await modifyAccess(params)
    expect(API.put).toHaveBeenCalledWith(
      'device',
      `${params.deviceId}/access`,
      { body: params.params, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(modifyAccess, 'put', [ params ])
})
