import Service from './Service'

class JointConsultationForApprovalOfSurgeryV2 extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super(`api/JointConsultationForApprovalOfSurgeryV2`, parameters)
  }
}

export default JointConsultationForApprovalOfSurgeryV2
