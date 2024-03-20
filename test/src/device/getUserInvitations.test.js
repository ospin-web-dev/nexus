const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')

const getUserInvitations = require('device/getUserInvitations')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('getUserInvitations', () => {

  const params = { deviceId: faker.string.uuid() }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)

    await getUserInvitations(params)
    expect(API.get).toHaveBeenCalledWith('device', `${params.deviceId}/user-invitations`, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(getUserInvitations, 'get', [ params ])
})
