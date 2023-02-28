import Service from './Service'

class PatientOwnMedicationsChart extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, visitType = 'ED') {
    super(`api/${visitType}/PatientOwnMedicationsChart/`, parameters)
  }
}

export default PatientOwnMedicationsChart
