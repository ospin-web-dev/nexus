const faker = require('faker')
const remove = require('process/annotation/remove')
const { default: API } = require('@aws-amplify/api-rest')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('remove Process Annotation', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.datatype.uuid()
  const annotationId = faker.datatype.uuid()

  it('calls amplifys API.del with the expected args', async () => {
    jest.spyOn(API, 'del').mockImplementation(args => args)

    await remove({ processId, annotationId })

    expect(API.del).toHaveBeenCalledWith(
      'process',
      `${processId}/annotations/${annotationId}`,
      DEFAULT_REQ_OPTS,
    )
  })

  testDefaultHTTPResponses(() => remove({ processId, annotationId }), 'del')
})
