const { API } = require('aws-amplify')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')
const RegexUtils = require('../utils/RegexUtils')

/**
 *
 *
 * @class DeviceApi
 * @abstract
 */
class DeviceApi {

  static setIdentity(deviceId) {
    if (!deviceId) {
      throw Error('No Device ID specified')
    }
    if (!deviceId.match(RegexUtils.UUIDV4_REGEX_STRING)) {
      throw Error(`${deviceId} is not a valid UUIDv4`)
    }
    this._deviceId = deviceId
  }

  static get deviceId () {
    if (this._deviceId === undefined) {
      throw Error('No Device ID specified')
    }
    return this._deviceId
  }

  static get DEVICE_API_PREFIX() {
    return 'device-api'
  }

  static _prefixResource(path) {
    return `/${this.deviceId}/${path}`
  }

  static async get(path, opts) {
    API.get(
      this.DEVICE_API_PREFIX,
      this._prefixResource(path),
      { ...DEFAULT_REQ_OPTS, ...opts },
    )
  }

  static async post(path, body, opts) {
    API.post(
      this.DEVICE_API_PREFIX,
      this._prefixResource(path),
      { body, ...DEFAULT_REQ_OPTS, ...opts },
    )
  }

}

module.exports = DeviceApi

// remove constructor
// capital d on classes
// Add id validation regex
