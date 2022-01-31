const {default: API} = require('@aws-amplify/api-rest')
const faker = require('faker')
const revokeAccess = require('process/revokeAccess')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('revokeAccess', () => {
  const params = {
    processId: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
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
