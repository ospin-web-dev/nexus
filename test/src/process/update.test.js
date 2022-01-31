const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

const update = require('process/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('update process', () => {
  const params = {
    processId: faker.datatype.uuid(),
    params: { name: faker.company.bs() },
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.patch method', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)

    await update(params)
    expect(API.patch).toHaveBeenCalledWith(
      'process',
      params.processId,
      { body: params.params, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(update, 'patch', [ params ])
})
