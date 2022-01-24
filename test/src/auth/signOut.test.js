const {default: Auth} = require('@aws-amplify/auth')

const signOut = require('auth/signOut')

describe('signOut', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.signOut method', async () => {
    jest.spyOn(Auth, 'signOut').mockImplementation()

    await signOut()
    expect(Auth.signOut).toHaveBeenCalledWith()
  })

  describe('on Auth.signOut success', () => {
    const CANNED_RESPONSE = {
      jeff: 'goldblum',
      my: 'hero',
    }

    beforeAll(() => {
      jest.spyOn(Auth, 'signOut').mockImplementation(() => ({ status: 200, ...CANNED_RESPONSE }))
    })

    it('returns the serialized result, with non-status properties in data', async () => {
      const resp = await signOut()

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: CANNED_RESPONSE,
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
