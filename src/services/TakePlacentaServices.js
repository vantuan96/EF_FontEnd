import Service from './Service'

class TakePlacentaServices extends Service {
  constructor (parameters = {}) {
    super(`api/TakePlacenta/SynInforCustomer/`, parameters)
  }
}

export default TakePlacentaServices
