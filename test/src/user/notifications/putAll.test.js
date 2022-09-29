const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const putAll = require('user/notifications/putAll')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('putAll user notifications', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const body = {
    originId: faker.datatype.uuid(),
    sourceName: 'macrophage',
    sourceType: 'user',
    topic: 'changelog',
    message: 'chux',
  }

  it('calls amplify\'s API.put method with the expected args', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)

    await putAll(body)
    expect(API.put).toHaveBeenCalledWith('user', 'notifications', { body, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(() => putAll(body), 'put')
})
