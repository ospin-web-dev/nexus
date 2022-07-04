const faker = require('faker')
const { default: API } = require('@aws-amplify/api-rest')
const associateDevice = require('user/licence/associateDevice')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('associateDevice', () => {

  const userId = faker.datatype.uuid()
  const licenceId = faker.datatype.uuid()
  const deviceId = faker.datatype.uuid()

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.put method', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)

    await associateDevice({ userId, licenceId, deviceId })
    expect(API.put)
      .toHaveBeenCalledWith('user', `${userId}/licences/${licenceId}/devices/${deviceId}`, DEFAULT_REQ_OPTS)
  })

  testDefaultHTTPResponses(associateDevice, 'put', [{ userId, licenceId, deviceId }])
})
