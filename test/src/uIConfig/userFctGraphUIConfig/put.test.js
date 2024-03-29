const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')

const putUserFctGraphUIConfig = require('uIConfig/userFctGraphUIConfig/put')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('put', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.put method', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)
    const userId = faker.string.uuid()
    const fctGraphId = faker.string.uuid()
    const params = { processBuilder: {} }

    await putUserFctGraphUIConfig(userId, fctGraphId, params)
    expect(API.put).toHaveBeenCalledWith('uiconfig', `users/${userId}/functionality-graphs/${fctGraphId}`, { body: params, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(putUserFctGraphUIConfig, 'put')
})
