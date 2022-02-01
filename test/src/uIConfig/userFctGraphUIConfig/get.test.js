const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')

const get = require('uIConfig/userFctGraphUIConfig/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('get', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    userId: faker.datatype.uuid(),
    fctGraphId: faker.datatype.uuid(),
  }

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await get(params)
    expect(API.get).toHaveBeenCalledWith(
      'uiconfig',
      `users/${params.userId}/functionality-graphs/${params.fctGraphId}`,
      DEFAULT_REQ_OPTS,
    )
  })

  testDefaultHTTPResponses(get, 'get', [ params ])
})
