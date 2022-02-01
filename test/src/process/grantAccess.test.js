const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')
const grantAccess = require('process/grantAccess')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('grantAccess', () => {
  const params = {
    processId: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
    groupName: 'viewers',
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.put method', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)

    await grantAccess(params)
    expect(API.put).toHaveBeenCalledWith(
      'process',
      `${params.processId}/access/${params.userId}`,
      { body: { groupName: params.groupName }, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(grantAccess, 'put', [ params ])
})
