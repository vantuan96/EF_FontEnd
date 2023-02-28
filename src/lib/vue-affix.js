import Affix from '@/components/affix.vue'

const FixedDiv = {}

FixedDiv.install = (Vue) => {
  if (FixedDiv.install.installed) return

  Vue.component('affix', Affix)
}

if (typeof window !== 'undefined' && window.Vue) {
  FixedDiv.install(window.Vue)
}

export { Affix }
export default FixedDiv
