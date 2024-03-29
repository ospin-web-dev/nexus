const { Auth } = require('aws-amplify')



const signIn = require('auth/signIn')

describe('signIn', () => {

  afterEach(() => { jest.restoreAllMocks() })

  it('calls amplify\'s Auth.signIn method with the username and password', async () => {
    jest.spyOn(Auth, 'signIn').mockImplementation((args = {}) => args)
    const [ username, password ] = [ 'Dich', 'verzaubert' ]

    await signIn(username, password)
    expect(Auth.signIn).toHaveBeenCalledWith(username, password)
  })

  describe('when an email is used', () => {
    it('calls amplify\'s Auth.signIn with the lower cased email', async () => {
      jest.spyOn(Auth, 'signIn').mockImplementation(() => Promise.resolve({}))
      const paramsWithEmail = {
        usernameOrEmail: 'Paterson@paterson.us',
        password: 'verzaubert',
      }

      await signIn(paramsWithEmail.usernameOrEmail, paramsWithEmail.password)
      expect(Auth.signIn).toHaveBeenCalledWith(
        paramsWithEmail.usernameOrEmail.toLowerCase(),
        paramsWithEmail.password,
      )
    })
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
        data: 'MERK!',
        status: 200,
      }))
    })
  })

  describe('on Auth.signIn error', () => {
    const ERROR_TEXT = 'session error'
    const error = new Error(ERROR_TEXT)

    beforeAll(() => {
      jest.spyOn(Auth, 'signIn')
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      await expect(signIn()).rejects.toThrow(ERROR_TEXT)
    })

  })
})
