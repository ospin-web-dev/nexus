const { Auth } = require('aws-amplify')



const forgotPasswordSubmit = require('auth/forgotPasswordSubmit')

describe('forgotPasswordSubmit', () => {

  const params = {
    usernameOrEmail: 'Paterson',
    code: '873819',
    newPassword: 'OhioBlueMatches1111',
  }

  afterEach(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.forgotPasswordSubmit method', async () => {
    jest.spyOn(Auth, 'forgotPasswordSubmit').mockImplementation(() => Promise.resolve({}))

    await forgotPasswordSubmit(params)
    expect(Auth.forgotPasswordSubmit).toHaveBeenCalledTimes(1)
    expect(Auth.forgotPasswordSubmit).toHaveBeenCalledTimes(1)
  })

  describe('when an email is used', () => {
    it('calls amplify\'s Auth.forgotPasswordSubmit method with the lower cased email', async () => {
      jest.spyOn(Auth, 'forgotPasswordSubmit').mockImplementation(() => Promise.resolve({}))
      const paramsWithEmail = {
        usernameOrEmail: 'Paterson@paterson.us',
        code: '873819',
        newPassword: 'OhioBlueMatches1111',
      }

      await forgotPasswordSubmit(paramsWithEmail)
      expect(Auth.forgotPasswordSubmit).toHaveBeenCalledWith(
        paramsWithEmail.usernameOrEmail.toLowerCase(),
        paramsWithEmail.code,
        paramsWithEmail.newPassword,
      )
    })
  })

  describe('on Auth.forgotPasswordSubmit success', () => {
    const res = { data: { angelo: 'merks' }, status: 200 }

    beforeAll(() => {
      jest.spyOn(Auth, 'forgotPasswordSubmit').mockImplementation(() => res)
    })

    it('returns the serialized result', async () => {
      const resp = await forgotPasswordSubmit(params)

      expect(resp).toStrictEqual(expect.objectContaining({
        data: res.data,
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
      await expect(forgotPasswordSubmit(params)).rejects.toThrow(ERROR_TEXT)
    })
  })
})
