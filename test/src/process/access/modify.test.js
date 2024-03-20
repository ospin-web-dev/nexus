const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')
const modifyAccess = require('process/access/modify')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('modifyAccess', () => {
  const params = {
    processId: faker.string.uuid(),
    userId: faker.string.uuid(),
    newGroup: 'viewers',
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.patch method', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)

    await modifyAccess(params)
    expect(API.patch).toHaveBeenCalledWith(
      'process',
      `${params.processId}/access/${params.userId}`,
      { body: { newGroup: params.newGroup }, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(modifyAccess, 'patch', [ params ])
})
