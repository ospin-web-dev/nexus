const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  ({ deviceId, fctId, slotName, params }) => API
    .post('device', `${deviceId}/functionalities/${fctId}/calibrations`, {
      body: {
        slotName,
        calibrationData: params,
      },
      ...DEFAULT_REQ_OPTS,
    }),
)
