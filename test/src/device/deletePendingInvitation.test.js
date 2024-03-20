const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')

const deletePendingInvitation = require('device/deletePendingInvitation')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('deletePendingInvitation', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    deviceId: faker.string.uuid(),
    invitationId: faker.string.uuid(),
  }

  it('calls amplify\'s API.del method', async () => {
    jest.spyOn(API, 'del').mockImplementation(args => args)

    await deletePendingInvitation(params)
    expect(API.del).toHaveBeenCalledWith(
      'device',
      `${params.deviceId}/user-invitations/${params.invitationId}`,
      DEFAULT_REQ_OPTS,
    )
  })

  testDefaultHTTPResponses(deletePendingInvitation, 'del', [ params ])
})
