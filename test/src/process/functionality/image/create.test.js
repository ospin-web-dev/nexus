const faker = require('faker')
const create = require('process/functionality/image/create')
const API = require('@aws-amplify/api-rest')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../testHelpers/testDefaultHTTPResponses')

describe('create Process Functionality Image', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const processId = faker.datatype.uuid()
  const functionalityId = faker.datatype.uuid()
  const deviceId = faker.datatype.uuid()
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
