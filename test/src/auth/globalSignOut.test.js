const { default: Auth } = require('@aws-amplify/auth')

const globalSignOut = require('auth/globalSignOut')

describe('globalSignOut', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.signOut method', async () => {
    jest.spyOn(Auth, 'signOut').mockImplementation(() => undefined)

    await globalSignOut()
    expect(Auth.signOut).toHaveBeenCalledWith({ global: true })
  })

  describe('on Auth.signOut success', () => {
    beforeAll(() => {
      jest.spyOn(Auth, 'signOut').mockImplementation(() => undefined)
    })

    it('returns the serialized result, with non-status properties in data', async () => {
      const resp = await globalSignOut()

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
      expect(globalSignOut).toThrow(ERROR_TEXT)
    })
  })
})
