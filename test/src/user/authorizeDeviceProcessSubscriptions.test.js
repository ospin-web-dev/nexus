const { API } = require('aws-amplify')
const uuidv4 = require('uuid').v4

const authorizeDeviceProcessSubscriptions = require('user/authorizeDeviceProcessSubscriptions')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('authorizeDeviceProcessSubscriptions', () => {

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)
    const userId = uuidv4()
    const payload = { socketId: '12345-54321', channelName: 'channelName' }

    await authorizeDeviceProcessSubscriptions(userId, payload)
    expect(API.post).toHaveBeenCalledWith('user', `${userId}/subscriptions/device-processes`, { body: payload, ...DEFAULT_REQ_OPTS })
  })

  describe('on API.post success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'post')
        .mockImplementation((() => ({ data: 'success!', status: 200 })))
    })

    it('returns the serialized result', async () => {
      const resp = await authorizeDeviceProcessSubscriptions()

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        errorMsg: null,
        error: null,
        status: 200,
      }))
    })
  })

  describe('on API.post error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(API, 'post')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await authorizeDeviceProcessSubscriptions()

      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        errorMsg: '',
        error,
        status: null,
      }))
    })
  })
})
