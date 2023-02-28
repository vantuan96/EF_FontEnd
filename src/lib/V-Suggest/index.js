import Suggest from './Suggest.vue'

export default {
  install (Vue, options = {}) {
    if (Object.keys(options).length) {
      if (typeof options.placeholder === 'string') Suggest.props.placeholder.default = options.placeholder
    }

    Vue.component(Suggest.name, Suggest)
  }
}
