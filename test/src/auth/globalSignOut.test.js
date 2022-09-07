const { default: Auth } = require('@aws-amplify/auth')

const globalSignOut = require('auth/globalSignOut')

describe('signOut', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.signOut method', async () => {
    jest.spyOn(Auth, 'signOut').mockImplementation(() => Promise.resolve({}))

    await globalSignOut()
    expect(Auth.signOut).toHaveBeenCalledWith({ global: true })
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
      const resp = await globalSignOut()

      expect(resp).toStrictEqual(expect.objectContaining({
        data: CANNED_RESPONSE,
        status: 200,
      }))
    })
  })

  describe('on Auth.signOut error', () => {
    const ERROR_TEXT = 'session error'
    const error = new Error(ERROR_TEXT)

    beforeAll(() => {
      jest.spyOn(Auth, 'signOut')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      await expect(globalSignOut()).rejects.toThrow(ERROR_TEXT)
    })
  })
})
