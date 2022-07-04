const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')
const add = require('user/licence/add')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('add', () => {

  const userId = faker.datatype.uuid()
  const params = { key: faker.datatype.uuid() }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)

    await add({ userId, params })
    expect(API.post)
      .toHaveBeenCalledWith('user', `${userId}/licences`, { body: params, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(add, 'post', [{ userId, params }])
})
