import Service from '../../Service'

class CreateChecklistDoctor extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/IPDDischargePreparationChecklist/Doctor/', parameters)
  }
}

export default CreateChecklistDoctor
