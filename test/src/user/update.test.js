const { API } = require('aws-amplify')
const uuidv4 = require('uuid').v4

const update = require('user/update')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')

describe('update', () => {

  it('calls amplify\'s API.patch method', async () => {
    jest.spyOn(API, 'patch').mockImplementation(args => args)
    const userId = uuidv4()
    const payload = { userName: 'the old man is back again. neo stalinism is here' }

    await update(userId, payload)
    expect(API.patch).toHaveBeenCalledWith('user', `${userId}`, { body: payload, ...DEFAULT_REQ_OPTS })
  })

  describe('on API.patch success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'patch')
        .mockImplementation((() => ({ data: 'success!', status: 200 })))
    })

    it('returns the serialized result', async () => {
      const resp = await update()

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        errorMsg: null,
        error: null,
        status: 200,
      }))
    })
  })

  describe('on API.patch error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(API, 'patch')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await update()

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
