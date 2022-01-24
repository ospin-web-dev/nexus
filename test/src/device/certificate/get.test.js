const {default: API} = require('@aws-amplify/api-rest')

const get = require('device/certificate/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('get', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const deviceId = '131c3c27-bdf3-4a45-93d4-449b4578b3ee'

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await get(deviceId)
    expect(API.get).toHaveBeenCalledWith('device', `${deviceId}/certificate`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(get, 'get')
})
