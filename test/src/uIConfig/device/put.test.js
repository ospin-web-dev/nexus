const faker = require('faker')
const {default: API} = require('@aws-amplify/api-rest')

const put = require('uIConfig/device/put')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('put', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    deviceId: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
    params: {},
  }

  it('calls amplify\'s API.put method', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)

    await put(params)
    expect(API.put).toHaveBeenCalledWith(
      'uiconfig',
      `users/${params.userId}/devices/${params.deviceId}`,
      { body: params.params, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(put, 'put', [ params ])
})
