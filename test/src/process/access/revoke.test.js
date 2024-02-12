const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')
const revokeAccess = require('process/access/revoke')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('revokeAccess', () => {
  const params = {
    processId: faker.string.uuid(),
    userId: faker.string.uuid(),
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.del method', async () => {
    jest.spyOn(API, 'del').mockImplementation(args => args)

    await revokeAccess(params)
    expect(API.del).toHaveBeenCalledWith(
      'process',
      `${params.processId}/access/${params.userId}`,
      DEFAULT_REQ_OPTS,
    )
  })

  testDefaultHTTPResponses(revokeAccess, 'del', [ params ])
})
