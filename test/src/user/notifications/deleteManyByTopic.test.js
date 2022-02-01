const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')

const deleteManyByTopic = require('user/notifications/deleteManyByTopic')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('deleteManyByTopic user notifications', () => {

  const params = {
    userId: faker.datatype.uuid(),
    topic: faker.company.bs(),
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.del method with the expected args', async () => {
    jest.spyOn(API, 'del').mockImplementation(args => args)

    await deleteManyByTopic(params)
    expect(API.del).toHaveBeenCalledWith(
      'user',
      `${params.userId}/notifications/${params.topic}`,
      DEFAULT_REQ_OPTS,
    )
  })

  testDefaultHTTPResponses(deleteManyByTopic, 'del', [ params ])
})
