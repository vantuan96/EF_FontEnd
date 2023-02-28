import Service from './Service'

class JointConsultationForApprovalOfSurgery extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'ED') {
    super(`api/${type}/JointConsultationForApprovalOfSurgery/`, parameters)
  }
}

export default JointConsultationForApprovalOfSurgery
