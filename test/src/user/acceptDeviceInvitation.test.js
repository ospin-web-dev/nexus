const { faker } = require('@faker-js/faker')
const { default: API } = require('@aws-amplify/api-rest')

const acceptDeviceInvitation = require('user/acceptDeviceInvitation')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('acceptDeviceInvitation', () => {

  const params = {
    userId: faker.string.uuid(),
    params: {},
  }

  it('calls amplify\'s API.put method', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)

    await acceptDeviceInvitation(params)
    expect(API.put).toHaveBeenCalledWith(
      'user',
      `${params.userId}/access/device/accept`,
      { body: params.params, ...DEFAULT_REQ_OPTS },
    )
  })

  testDefaultHTTPResponses(acceptDeviceInvitation, 'put', [ params ])
})
