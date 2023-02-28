import Service from './Service'

class JointConsultationGroupMinutesChecked extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type) {
    super(`api/${type}/JointConsultationGroupMinutes/CheckFormLocked`, parameters)
  }
}

export default JointConsultationGroupMinutesChecked
