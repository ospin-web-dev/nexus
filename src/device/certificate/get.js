const { API } = require('aws-amplify')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')

module.exports = serializeAxiosResponse(
  deviceId => API.get('device', `${deviceId}/certificate`),
)
