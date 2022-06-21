const { default: API } = require('@aws-amplify/api-rest')
const uuidv4 = require('uuid').v4

const getDeviceInvitations = require('user/getDeviceInvitations')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('get', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const userId = uuidv4()

  it('calls amplify\'s API.get', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await getDeviceInvitations(userId)
    expect(API.get).toHaveBeenCalledWith('user', `${userId}/device-invitations`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(getDeviceInvitations, 'get', [ userId ])
})
