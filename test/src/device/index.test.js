const Device = require('device/index')

describe('nexus Device', () => {

  const EXPECTED_FUNCTIONS = [
    'list',
    'create',
  ]

  const EXPECTED_MODULES = {
    certificate: [ 'get' ],
  }

  it('this test gets updated when a new fn or module is added', () => {
    expect(Object.keys(Device)).toHaveLength(
      Object.keys(EXPECTED_MODULES).length
      + EXPECTED_FUNCTIONS.length,
    )
  })

  describe('its top level methods', () => {
    EXPECTED_FUNCTIONS.forEach(fn => {
      it(`exports the ${fn} function`, () => {
        expect(typeof Device[fn]).toBe('function')
      })
    })
  })

  describe('its modules', () => {
    for (const [ moduleName, moduleFns ] of Object.entries(EXPECTED_MODULES)) {
      it(`exports the ${moduleName} module`, () => {
        expect(typeof Device[moduleName]).toBe('object')
      })

      moduleFns.forEach(fn => {
        const module = Device[moduleName]

        it(`the ${moduleName} exports the ${fn} function`, () => {
          expect(typeof module[fn]).toBe('function')
        })
      })
    }
  })
})
