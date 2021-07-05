const Log = require('log/index')

describe('nexus Log', () => {
  const EXPECTED_FUNCTIONS = [ ]

  const EXPECTED_MODULES = {
    device: [ 'deleteMany' ],
  }

  it('this test gets updated when a new fn or module is added', () => {
    expect(Object.keys(Log)).toHaveLength(
      Object.keys(EXPECTED_MODULES).length
      + EXPECTED_FUNCTIONS.length,
    )
  })

  describe('its top level methods', () => {
    EXPECTED_FUNCTIONS.forEach(fn => {
      it(`exports the ${fn} function`, () => {
        expect(typeof Log[fn]).toBe('function')
      })
    })
  })

  describe('its modules', () => {
    for (const [ moduleName, moduleFns ] of Object.entries(EXPECTED_MODULES)) {
      it(`exports the ${moduleName} module`, () => {
        expect(typeof Log[moduleName]).toBe('object')
      })

      moduleFns.forEach(fn => {
        const module = Log[moduleName]

        it(`the ${moduleName} exports the ${fn} function`, () => {
          expect(typeof module[fn]).toBe('function')
        })
      })
    }
  })
})
