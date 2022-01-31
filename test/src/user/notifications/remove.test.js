const faker = require('faker')
const {default: API} = require('@aws-amplify/api-rest')

const remove = require('user/notifications/remove')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('remove user notifications', () => {

  const params = {
    userId: faker.datatype.uuid(),
    notificationId: faker.datatype.uuid(),
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.del method with the expected args', async () => {
    jest.spyOn(API, 'del').mockImplementation(args => args)

    await remove(params)
    expect(API.del).toHaveBeenCalledWith(
      'user',
      `${params.userId}/notification/${params.notificationId}`,
      DEFAULT_REQ_OPTS,
    )
  })

  testDefaultHTTPResponses(remove, 'del', [ params ])
})
