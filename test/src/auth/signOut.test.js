const { Auth } = require('aws-amplify')

const signOut = require('auth/signOut')

describe('signOut', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.signOut method', async () => {
    jest.spyOn(Auth, 'signOut').mockImplementation()

    await signOut()
    expect(Auth.signOut).toHaveBeenCalledWith()
  })

  describe('on Auth.signOut success', () => {
    beforeAll(() => {
      jest.spyOn(Auth, 'signOut').mockImplementation(() => ({ status: 200 }))
    })

    it('returns the serialized result', async () => {
      const resp = await signOut()

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: undefined,
        error: null,
        errorMsg: null,
        status: 200,
      }))
    })
  })

  describe('on Auth.signOut error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(Auth, 'signOut')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await signOut()

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
