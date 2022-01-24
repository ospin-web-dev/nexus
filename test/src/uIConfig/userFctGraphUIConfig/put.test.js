const {default: API} = require('@aws-amplify/api-rest')
const uuidv4 = require('uuid').v4

const putUserFctGraphUIConfig = require('uIConfig/userFctGraphUIConfig/put')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../testHelpers/testDefaultHTTPResponses')

describe('put', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.put method', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)
    const userId = uuidv4()
    const fctGraphId = uuidv4()
    const params = { processBuilder: {} }

    await putUserFctGraphUIConfig(userId, fctGraphId, params)
    expect(API.put).toHaveBeenCalledWith('uiconfig', `users/${userId}/functionality-graphs/${fctGraphId}`, { body: params, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(putUserFctGraphUIConfig, 'put')
})
