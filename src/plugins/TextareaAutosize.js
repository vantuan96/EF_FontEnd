import Vue from 'vue'
import TextareaAutosize from '@/components/TextareaAutosize.vue'
const version = '__VERSION__'

const install = Vue => {
  Vue.component('TextareaAutosize', TextareaAutosize)
}

const plugin = {
  install,
  version
}
Vue.use(plugin)
