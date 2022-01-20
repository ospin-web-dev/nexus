const API = require('@aws-amplify/api-rest')
const uuidv4 = require('uuid').v4

const update = require('user/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('update', () => {

  it('calls amplify\'s API.patch method', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)
    const userId = uuidv4()
    const payload = { userName: 'the old man is back again. neo stalinism is here' }

    await update(userId, payload)
    expect(API.patch).toHaveBeenCalledWith('user', `${userId}`, { body: payload, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(update, 'patch')
})
