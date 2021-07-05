const { API } = require('aws-amplify')
const uuidv4 = require('uuid').v4

const deleteUser = require('user/delete')

describe('delete', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s API.del method with the user id', async () => {
    jest.spyOn(API, 'del').mockImplementation(args => args)
    const userId = uuidv4()

    await deleteUser(userId)
    expect(API.del).toHaveBeenCalledWith('user', userId)
  })

  describe('on API.del success', () => {
    beforeAll(() => {
      jest.spyOn(API, 'del')
        .mockImplementation((() => ({ data: 'success!', status: 200 })))
    })

    it('returns the serialized result', async () => {
      const userId = uuidv4()

      const resp = await deleteUser(userId)
      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'success!',
        error: null,
        errorMsg: null,
        status: 200,
      }))
    })
  })

  describe('on API.del error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(API, 'del')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const userId = uuidv4()

      const resp = await deleteUser(userId)
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
