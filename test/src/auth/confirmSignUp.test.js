const { default: Auth } = require('@aws-amplify/auth')

const confirmSignUp = require('auth/confirmSignUp')

describe('confirmSignUp', () => {

  afterEach(() => { jest.restoreAllMocks() })

  const params = {
    username: 'Paterson',
    code: '398127',
  }

  it('calls amplify\'s Auth.confirmSignUp method', async () => {
    jest.spyOn(Auth, 'confirmSignUp').mockImplementation(() => Promise.resolve({}))

    await confirmSignUp(params)
    expect(Auth.confirmSignUp).toHaveBeenCalledWith(params.username, params.code)
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
        data: CANNED_RESPONSE,
        status: 200,
      }))
    })
  })

  describe('on Auth.confirmSignUp error', () => {
    const ERROR_TEXT = 'session error'
    const error = new Error(ERROR_TEXT)

    beforeAll(() => {
      jest.spyOn(Auth, 'confirmSignUp')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      await expect(confirmSignUp(params)).rejects.toThrow(ERROR_TEXT)
    })
  })
})
