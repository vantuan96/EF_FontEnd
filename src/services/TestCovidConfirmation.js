import Service from './Service'

class TestCovidConfirmation extends Service {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor (type) {
    super(`api/${type}/TestCovidConfirmation/`)
  }
}

export default TestCovidConfirmation
