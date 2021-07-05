const auth = require('auth')

describe('nexus auth', () => {

  const EXPECTED_FUNCTIONS = [
    'signIn',
    'signOut',
    'getCurrentSession',
  ]

  const EXPECTED_MODULES = {}

  it('this test gets updated when a new fn or module is added', () => {
    expect(Object.keys(auth)).toHaveLength(
      Object.keys(EXPECTED_MODULES).length
      + EXPECTED_FUNCTIONS.length,
    )
  })

  describe('its top level methods', () => {
    EXPECTED_FUNCTIONS.forEach(fn => {
      it(`exports the ${fn} function`, () => {
        expect(typeof auth[fn]).toBe('function')
      })
    })
  })

  describe('its modules', () => {
    for (const [ moduleName, moduleFns ] of Object.entries(EXPECTED_MODULES)) {
      it(`exports the ${moduleName} module`, () => {
        expect(typeof auth[moduleName]).toBe('object')
      })

      moduleFns.forEach(fn => {
        const module = auth[moduleName]

        it(`the ${moduleName} exports the ${fn} function`, () => {
          expect(typeof module[fn]).toBe('function')
        })
      })
    }
  })
})
