import Service from '../../Service'

class CreateChecklistNurse extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}) {
    super('api/IPD/IPDDischargePreparationChecklist/Nurse/', parameters)
  }
}

export default CreateChecklistNurse
