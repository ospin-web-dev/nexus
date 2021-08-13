const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const DeviceApi = require('../DeviceApi')

/**
* Creates an instance of AuthorizedDeviceApi
* @param {*} deviceId
* @param {*} pathToCertificate
* @memberof AuthorizedDeviceApi
*/
class AuthorizedDeviceApi extends DeviceApi {

  static get HASHLENGTH() {
    return 44
  }

  static _createHashFromCertificateFile(pathToCertificate) {
    const certificate = fs.readFileSync(path.resolve(pathToCertificate))
    const hash = crypto.createHash('sha256').update(certificate).digest('base64')
    return hash
  }

  static _validateCredentials(deviceId, pathToCert) {

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
    AuthorizedDeviceApi._validateCredentials(deviceId, pathToCert)

    this.setIdentity(deviceId)
    const Authorization = this._createHashFromCertificateFile(pathToCert)
    if (Authorization.length !== AuthorizedDeviceApi.HASHLENGTH) {
      throw Error('Invalid Hash Length')
    }
    this.Authorization = Authorization
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

module.exports = AuthorizedDeviceApi
