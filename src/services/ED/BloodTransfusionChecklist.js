import Service from '../Service'

class BloodTransfusionChecklist extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (parameters = {}, type = 'ED') {
    super(`api/${type}/BloodTransfusionChecklist/`, parameters)
  }
}

export default BloodTransfusionChecklist
