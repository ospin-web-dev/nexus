const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ deviceId, updates }) => API
    .patch('device', `${deviceId}/functionalities-configurations`, { body: { updates }, ...DEFAULT_REQ_OPTS }),
)
