const { default: Auth } = require('@aws-amplify/auth')

const signOut = require('auth/signOut')

describe('signOut', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.signOut method', async () => {
    jest.spyOn(Auth, 'signOut').mockImplementation(() => undefined)

    await signOut()
    expect(Auth.signOut).toHaveBeenCalledWith()
  })

  describe('on Auth.signOut success', () => {
    beforeAll(() => {
      jest.spyOn(Auth, 'signOut').mockImplementation(() => undefined)
    })

    it('returns the serialized result, with non-status properties in data', async () => {
      const resp = await signOut()
      expect(resp).toBeUndefined()
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
      expect(signOut).toThrow(ERROR_TEXT)
    })
  })
})
