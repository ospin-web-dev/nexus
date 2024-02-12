const { faker } = require('@faker-js/faker')
const { default: API } = require('@aws-amplify/api-rest')
const revokeAccess = require('device/access/revoke')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('revokeAccess device', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    deviceId: faker.string.uuid(),
    params: [],
  }

  it('calls amplify\'s API.del method with the expected args', async () => {
    jest.spyOn(API, 'del').mockImplementation(args => args)

    await revokeAccess(params)
    expect(API.del).toHaveBeenCalledWith(
      'device',
      `${params.deviceId}/access`,
      { body: params.params, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(revokeAccess, 'del', [ params ])
})
