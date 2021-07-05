const { API } = require('aws-amplify')
const uuidv4 = require('uuid').v4

const get = require('user/get')

describe('get', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.get method with the user id', async () => {
    jest.spyOn(API, 'get').mockImplementation(args => args)
    const userId = uuidv4()

    await get(userId)
    expect(API.get).toHaveBeenCalledWith('user', userId)
  })

  describe('on API.get success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'get')
        .mockImplementation((() => 'success!'))
    })

    it('returns the serialized result', async () => {
      const userId = uuidv4()

      const resp = await get(userId)
      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        error: null,
        errorMsg: null,
        status: 200,
      }))
    })
  })

  describe('on API.get error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(API, 'get')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const userId = uuidv4()

      const resp = await get(userId)
      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        error,
        errorMsg: '',
        status: null,
      }))
    })
  })
})
