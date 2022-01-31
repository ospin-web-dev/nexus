const {default: API} = require('@aws-amplify/api-rest')
const uuidv4 = require('uuid').v4

const deleteUser = require('user/delete')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../testHelpers/testDefaultHTTPResponses')

describe('delete', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.del method with the user id', async () => {
    jest.spyOn(API, 'del').mockImplementation(args => args)
    const userId = uuidv4()

    await deleteUser(userId)
    expect(API.del).toHaveBeenCalledWith('user', userId, { ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(deleteUser, 'del')
})
