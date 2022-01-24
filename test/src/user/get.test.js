const {default: API} = require('@aws-amplify/api-rest')
const uuidv4 = require('uuid').v4

const get = require('user/get')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('get', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method with the user id', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)
    const userId = uuidv4()

    await get(userId)
    expect(API.get).toHaveBeenCalledWith('user', userId, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(get, 'get')
})
