const {default: Auth} = require('@aws-amplify/auth')

const signIn = require('auth/signIn')

describe('signIn', () => {

  afterAll(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.signIn method with the username and password', async () => {
    jest.spyOn(Auth, 'signIn').mockImplementation(args => args)
    const [ username, password ] = [ 'dich', 'verzaubert' ]

    await signIn(username, password)
    expect(Auth.signIn).toHaveBeenCalledWith(username, password)
  })

  describe('on Auth.signIn success', () => {
    beforeAll(() => {
      jest.spyOn(Auth, 'signIn')
        .mockImplementation(() => ({ data: 'MERK!', status: 200 }))
    })

    it('returns the serialized result', async () => {
      const [ username, password ] = [ 'was hat er....mich?', 'achso' ]

      const resp = await signIn(username, password)
      expect(resp).toStrictEqual(expect.objectContaining({
        success: true,
        data: 'MERK!',
        error: null,
        errorMsg: null,
        status: 200,
      }))
    })
  })

  describe('on Auth.signIn error', () => {
    const error = new Error()

    beforeAll(() => {
      jest.spyOn(Auth, 'signIn')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      const [ username, password ] = [ 'was hat er....mich?', 'achso' ]

      const resp = await signIn(username, password)
      expect(resp).toStrictEqual(expect.objectContaining({
        success: false,
        data: null,
        errorMsg: '',
        error,
        status: null,
      }))
    })
  })
})
