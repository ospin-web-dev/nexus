const { faker } = require('@faker-js/faker')
const create = require('process/annotation/create')
const { API } = require('aws-amplify')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('create Process Annotation', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.string.uuid()
  const text = 'My coworker spilled his hot aspargus sauce over my cells'
  const userTimestamp = Date.now(faker.date.recent())
  const data = {
    text,
    userTimestamp,
  }

  it('calls amplifys API.post with the expected args', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await create({ processId, data })

    expect(API.post).toHaveBeenCalledWith(
      'process',
      `${processId}/annotations`,
      { body: data, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(() => create({ processId, data }), 'post')
})
