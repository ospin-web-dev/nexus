const { default: Auth } = require('@aws-amplify/auth')

const forgotPassword = require('auth/forgotPassword')

describe('forgotPassword', () => {

  const params = { usernameOrEmail: 'paterson' }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.forgotPassword method', async () => {
    jest.spyOn(Auth, 'forgotPassword').mockImplementation()

    await forgotPassword(params)
    expect(Auth.forgotPassword).toHaveBeenCalledTimes(1)
    expect(Auth.forgotPassword).toHaveBeenCalledWith(params.usernameOrEmail)
  })

  describe('on Auth.forgotPassword success', () => {
    const res = { data: { angelo: 'merks' }, status: 200 }

    beforeAll(() => {
      jest.spyOn(Auth, 'forgotPassword').mockImplementation(() => res)
    })

    it('returns the serialized result', async () => {
      const resp = await forgotPassword(params)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: res.data,
        errorMsg: null,
        error: null,
        status: 200,
      }))
    })
  })

  describe('on Auth.forgotPassword error', () => {
    const ERROR_TEXT = 'session error'
    const error = new Error(ERROR_TEXT)

    beforeAll(() => {
      jest.spyOn(Auth, 'forgotPassword')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await forgotPassword(params)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        errorMsg: ERROR_TEXT,
        error,
        status: null,
      }))
    })
  })
})
