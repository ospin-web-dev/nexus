const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')

const list = require('process/snapshot/list')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('list', () => {
  const processId = faker.string.uuid()

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await list({ processId })
    expect(API.get).toHaveBeenCalledWith('process', `${processId}/snapshots`, DEFAULT_REQ_OPTS)
  })

  testDefaultHTTPResponses(list, 'get', [{ processId }])
})
