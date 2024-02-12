const { faker } = require('@faker-js/faker')
const create = require('process/functionality/image/create')
const { API } = require('aws-amplify')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('create Process Functionality Image', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.string.uuid()
  const functionalityId = faker.string.uuid()
  const deviceId = faker.string.uuid()
  const imageCreatedAt = Date.now(faker.date.recent())
  const body = {
    imageDataUri: 'data:image/jpeg;base64,THENUMBERSWHATDOTHEYMEAN',
    deviceId,
    imageCreatedAt,
  }

  it('calls amplifys API.post with the expected args', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await create(processId, functionalityId, body)

    expect(API.post).toHaveBeenCalledWith(
      'process',
      `${processId}/functionalities/${functionalityId}/images`,
      { body, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(create, 'post')
})
