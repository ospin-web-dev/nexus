const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ userId, licenceId, deviceId }) => API
    .put('user', `${userId}/licences/${licenceId}/devices/${deviceId}`, DEFAULT_REQ_OPTS),
)
