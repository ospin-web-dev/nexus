const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

/**
 * @desc updates a functionality description
 * @memberof nexus.deviceDescription.functionaltiyDescription
 * @function update
 * @async
 * @param {string} functionaltiyDescriptionId
 * @param {Object} body
 * @param {string} [body.updateData.displayName]
 * @param {string} [body.updateData.description]
 * @param {string} [body.updateData.iconURL]
 * @param {string} [body.updateData.inputDescriptionImageURL]
 * @param {string} [body.updateData.imageURL]
 * @param {array} [body.updateData.slotRelations]
 * @param {array} [body.updateData.slotDescriptions]
 * @param {boolean} [body.updateData.safeForCustomerUse]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (functionaltiyDescriptionId, body) => API.post(
    'device-description',
    `functionality-descriptions/${functionaltiyDescriptionId}`,
    { body, ...DEFAULT_REQ_OPTS },
  ),
)
