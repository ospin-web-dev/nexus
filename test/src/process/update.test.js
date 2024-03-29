const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')

const update = require('process/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('update process', () => {
  const params = {
    processId: faker.string.uuid(),
    params: { name: faker.company.buzzPhrase() },
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
