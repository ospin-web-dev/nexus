const { default: Auth } = require('@aws-amplify/auth')

const confirmSignUp = require('auth/confirmSignUp')

describe('confirmSignUp', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    usernameOrEmail: 'paterson',
    code: '398127',
  }

  it('calls amplify\'s Auth.confirmSignUp method', async () => {
    jest.spyOn(Auth, 'confirmSignUp').mockImplementation()

    await confirmSignUp(params)
    expect(Auth.confirmSignUp).toHaveBeenCalledWith(params.usernameOrEmail, params.code)
  })

  describe('on Auth.confirmSignUp success', () => {
    const CANNED_RESPONSE = {
      jeff: 'goldblum',
      my: 'hero',
    }

    beforeAll(() => {
      jest.spyOn(Auth, 'confirmSignUp').mockImplementation(() => ({ status: 200, ...CANNED_RESPONSE }))
    })

    it('returns the serialized result, with non-status properties in data', async () => {
      const resp = await confirmSignUp(params)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: CANNED_RESPONSE,
        error: null,
        errorMsg: null,
        status: 200,
      }))
    })
  })

  describe('on Auth.confirmSignUp error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(Auth, 'confirmSignUp')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await confirmSignUp(params)

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
