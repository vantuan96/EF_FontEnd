import Service from './Service'

class PatientAndFamilyEducation extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super(`api/${parameters.VisitType}/PatientAndFamilyEducation`, parameters)
  }
}

export default PatientAndFamilyEducation
