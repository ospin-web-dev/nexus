const { faker } = require('@faker-js/faker')
const { API } = require('aws-amplify')

const setCognitoIdentityId = require('user/setCognitoIdentityId')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('setCognitoIdentityId', () => {

  const params = { userId: faker.string.uuid() }

  it('calls amplify\'s API.put method', async () => {
    jest.spyOn(API, 'put').mockImplementation(args => args)

    await setCognitoIdentityId(params)
    expect(API.put).toHaveBeenCalledWith('user', `${params.userId}/cognito-identity`, DEFAULT_REQ_OPTS)
  })

  testDefaultHTTPResponses(setCognitoIdentityId, 'put', [ params ])
})
