const { Auth } = require('aws-amplify')



const resendConfirmationCode = require('auth/resendConfirmationCode')

describe('resendConfirmationCode', () => {

  const params = { username: 'Paterson' }

  afterEach(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.resendSignUp method', async () => {
    jest.spyOn(Auth, 'resendSignUp').mockImplementation(() => Promise.resolve({}))

    await resendConfirmationCode(params)
    expect(Auth.resendSignUp).toHaveBeenCalledTimes(1)
    expect(Auth.resendSignUp).toHaveBeenCalledWith(params.username)
  })


  describe('on Auth.resendConfirmationCode success', () => {
    const cognitoRes = { data: { angelo: 'merks' }, status: 200 }

    beforeAll(() => {
      jest.spyOn(Auth, 'resendSignUp').mockImplementation(() => cognitoRes)
    })

    it('returns the serialized result', async () => {
      const resp = await resendConfirmationCode(params)

      expect(resp).toStrictEqual(cognitoRes)
    })
  })

  describe('on Auth.resendSignUp error', () => {
    const ERROR_TEXT = 'session error'
    const error = new Error(ERROR_TEXT)

    beforeAll(() => {
      jest.spyOn(Auth, 'resendSignUp')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      await expect(resendConfirmationCode(params)).rejects.toThrow(ERROR_TEXT)
    })
  })
})
