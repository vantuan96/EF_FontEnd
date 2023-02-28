import Service from './Service'

class SurgicalProcedureSafetyChecklist extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type) {
    super(`api/${type}/SurgicalProcedureSafetyChecklist/`, parameters)
  }
}

export default SurgicalProcedureSafetyChecklist
