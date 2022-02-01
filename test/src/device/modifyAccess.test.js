const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')
const modifyAccess = require('device/modifyAccess')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('modifyAccess device', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    deviceId: faker.datatype.uuid(),
    params: [],
  }

  it('calls amplify\'s API.put method with the expected args', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)

    await modifyAccess(params)
    expect(API.put).toHaveBeenCalledWith(
      'device',
      `${params.deviceId}/access`,
      { body: params.params, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(modifyAccess, 'put', [ params ])
})
