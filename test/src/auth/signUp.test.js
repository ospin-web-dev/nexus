const { default: Auth } = require('@aws-amplify/auth')

const signUp = require('auth/signUp')

describe('signUp', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const params = {
    username: 'paterson',
    password: 'ahahaha87Ax',
    attributes: {
      email: 'paterson@paterson.us',
      phone_number: '123456789',
    },
  }

  it('calls amplify\'s Auth.signUp method', async () => {
    jest.spyOn(Auth, 'signUp').mockImplementation()

    await signUp(params)
    expect(Auth.signUp).toHaveBeenCalledWith(params)
  })

  describe('on Auth.signUp success', () => {
    const CANNED_RESPONSE = {
      jeff: 'goldblum',
      my: 'hero',
    }

    beforeAll(() => {
      jest.spyOn(Auth, 'signUp').mockImplementation(() => ({ status: 200, ...CANNED_RESPONSE }))
    })

    it('returns the serialized result, with non-status properties in data', async () => {
      const resp = await signUp(params)

      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: CANNED_RESPONSE,
        error: null,
        errorMsg: null,
        status: 200,
      }))
    })
  })

  describe('on Auth.signUp error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(Auth, 'signUp')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const resp = await signUp(params)

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
