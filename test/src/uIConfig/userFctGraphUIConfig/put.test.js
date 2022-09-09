const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const putUserFctGraphUIConfig = require('uIConfig/userFctGraphUIConfig/put')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('put', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.put method', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)
    const userId = faker.datatype.uuid()
    const fctGraphId = faker.datatype.uuid()
    const params = { processBuilder: {} }

    await putUserFctGraphUIConfig(userId, fctGraphId, params)
    expect(API.put).toHaveBeenCalledWith('uiconfig', `users/${userId}/functionality-graphs/${fctGraphId}`, { body: params, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(putUserFctGraphUIConfig, 'put')
})
