import Service from './Service'

class JointConsultationForApprovalOfSurgeryChecked extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'ED') {
    super(`api/${type}/JointConsultationForApprovalOfSurgery/CheckFormLocked`, parameters)
  }
}

export default JointConsultationForApprovalOfSurgeryChecked
