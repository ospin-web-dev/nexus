const { default: API } = require('@aws-amplify/api-rest')
const faker = require('faker')

const update = require('user/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('update', () => {

  it('calls amplify\'s API.patch method', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)
    const userId = faker.datatype.uuid()
    const payload = { userName: 'the old man is back again. neo stalinism is here' }

    await update(userId, payload)
    expect(API.patch).toHaveBeenCalledWith('user', `${userId}`, { body: payload, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(update, 'patch')
})
