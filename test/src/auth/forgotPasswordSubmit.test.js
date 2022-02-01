const { default: Auth } = require('@aws-amplify/auth')

const forgotPasswordSubmit = require('auth/forgotPasswordSubmit')

describe('forgotPasswordSubmit', () => {

  const params = {
    usernameOrEmail: 'paterson',
    code: '873819',
    newPassword: 'OhioBlueMatches1111',
  }

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.forgotPasswordSubmit method', async () => {
    jest.spyOn(Auth, 'forgotPasswordSubmit').mockImplementation()

    await forgotPasswordSubmit(params)
    expect(Auth.forgotPasswordSubmit).toHaveBeenCalledTimes(1)
    expect(Auth.forgotPasswordSubmit).toHaveBeenCalledTimes(1)
  })

  describe('on Auth.forgotPasswordSubmit success', () => {
    const res = { data: { angelo: 'merks' }, status: 200 }

    beforeAll(() => {
      jest.spyOn(Auth, 'forgotPasswordSubmit').mockImplementation(() => res)
    })

    it('returns the serialized result', async () => {
      const resp = await forgotPasswordSubmit(params)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: res.data,
        errorMsg: null,
        error: null,
        status: 200,
      }))
    })
  })

  describe('on Auth.forgotPasswordSubmit error', () => {
    const ERROR_TEXT = 'session error'
    const error = new Error(ERROR_TEXT)

    beforeAll(() => {
      jest.spyOn(Auth, 'forgotPasswordSubmit')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await forgotPasswordSubmit(params)

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
