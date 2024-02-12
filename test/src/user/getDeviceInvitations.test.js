const { API } = require('aws-amplify')
const { faker } = require('@faker-js/faker')

const getDeviceInvitations = require('user/getDeviceInvitations')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('get', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const userId = faker.string.uuid()

  it('calls amplify\'s API.get', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await getDeviceInvitations(userId)
    expect(API.get).toHaveBeenCalledWith('user', `${userId}/device-invitations`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(getDeviceInvitations, 'get', [ userId ])
})
