const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const DeviceAPI = require('./DeviceAPI')

/**
* Creates an instance of AuthorizedDeviceAPI
* @param {*} deviceId
* @param {*} pathToCertificate
* @memberof AuthorizedDeviceAPI
*/
class AuthorizedDeviceAPI extends DeviceAPI {

  static get HASHLENGTH() {
    return 44
  }

  static _createHashFromCertificateFile(pathToCertificate) {
    const certificate = fs.readFileSync(path.resolve(pathToCertificate))
    const hash = crypto.createHash('sha256').update(certificate).digest('base64')
    return hash
  }

  static _validateCertificate(pathToCert) {

    if (!pathToCert) {
      throw Error('No Certificate specified')
    }
    try {
      fs.readFileSync(path.resolve(pathToCert))
    } catch (error) {
      throw Error(`No Certificate could be found at ${pathToCert}`)
    }
  }

  static setCredentials({ deviceId, pathToCert }) {
    AuthorizedDeviceAPI._validateCertificate(pathToCert)

    this.setIdentity(deviceId)
    const Authorization = this._createHashFromCertificateFile(pathToCert)
    if (Authorization.length !== AuthorizedDeviceAPI.HASHLENGTH) {
      throw Error('Invalid Hash Length')
    }
    this.Authorization = Authorization
  }

  static async verifyAuthentication() {
    const { res } = this.get('verifyAuthentication')
    if (res.statusCode !== 200) {
      return false
    }
    return true
  }

  static get authorizationHeaders() {
    return {
      headers: {
        Authorization: this.Authorization,
      },
    }
  }

  static async get(resourcePath, opts) {
    super.get(
      resourcePath,
      { ...this.authorizationHeaders, ...opts },
    )
  }

  static async post(ressourcePath, body, opts) {
    super.post(
      ressourcePath,
      body,
      { ...this.authorizationHeaders, ...opts },
    )
  }

}

module.exports = AuthorizedDeviceAPI
