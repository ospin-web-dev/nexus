const { faker } = require('@faker-js/faker')
const update = require('process/annotation/update')
const { API } = require('aws-amplify')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('update Process Annotation', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.string.uuid()
  const annotationId = faker.string.uuid()
  const text = 'My coworker spilled his hot tomate sauce over my cells'
  const userTimestamp = Date.now(faker.date.recent())
  const data = {
    text,
    userTimestamp,
  }

  it('calls amplifys API.patch with the expected args', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)

    await update({ processId, annotationId, data })

    expect(API.patch).toHaveBeenCalledWith(
      'process',
      `${processId}/annotations/${annotationId}`,
      { body: data, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(() => update({ processId, annotationId }), 'patch')
})
