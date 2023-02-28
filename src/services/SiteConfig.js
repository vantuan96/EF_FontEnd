import Service from './Service'

class SiteConfig extends Service {
  constructor (parameters = {}) {
    super('static/siteConfig.json', parameters)
  }
}

export default SiteConfig
