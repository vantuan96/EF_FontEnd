import Service from '../Service'

class MedicalReport extends Service {
  constructor (parameters = {}) {
    super('api/IPD/Document/MedicalReport', parameters)
  }
}

export default MedicalReport
