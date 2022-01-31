const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ deviceId, fctId, slotName }) => API
    .patch('device', `${deviceId}/functionalities/${fctId}/calibrations`, { body: { slotName }, ...DEFAULT_REQ_OPTS }),
)
