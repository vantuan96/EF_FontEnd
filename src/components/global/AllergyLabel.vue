<template>
  <label class="label label-danger label-danger-2 hover-tooltip ml-5">
    {{__t('Dị ứng')}} <i class="fa fa-info-circle" aria-hidden="true"></i>
    <span v-if="bottom" class="tooltiptext-buttom">{{__t(str) || __t('Không xác định')}}</span>
    <span v-else class="tooltiptext">{{__t(str) || __t('Không xác định')}}</span>
  </label>
</template>
<script>
import constant from '@/constants'
export default {
  name: 'AllergyLabel',
  props: ['label', 'data', 'bottom'],
  data () {
    return {
      str: []
    }
  },
  created () {
    var KindOfAllergy = constant.ALLERGY.filter(e => {
      return ((this.data.KindOfAllergy || '').split(',')).includes(e.value)
    }).map(r => r.label)
    this.str = KindOfAllergy.join(', ')
    if (this.data.Allergy) {
      if (this.str) {
        this.str += ': '
      }
      this.str += this.data.Allergy
    }
    // this.str = ([KindOfAllergy.join(','), this.data.Allergy].filter(e => e)).join(',')
  }
}
</script>
<style lang="stylus" scoped>
</style>
