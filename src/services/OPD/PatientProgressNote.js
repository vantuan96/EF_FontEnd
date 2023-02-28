import Service from '../Service'

class PatientProgressNote extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, visitType = 'OPD') {
    super(`api/${visitType}/PatientProgressNote/`, parameters)
  }
}

export default PatientProgressNote
