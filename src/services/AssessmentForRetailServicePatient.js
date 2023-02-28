import Service from './Service'

class AssessmentForRetailServicePatient extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'ED') {
    super(`api/${type}/${type}AssessmentForRetailServicePatient/`, parameters)
  }
}

export default AssessmentForRetailServicePatient
