<template>
  <span class="no-wrap" v-if="data.IsAllergy">
    <i class="fa fa-info-circle color-red" aria-hidden="true"></i> {{str}}
  </span>
  <span class="no-wrap" v-else-if="data.IsAllergyNone">
    {{__t('Không xác định')}}
  </span>
  <span class="no-wrap" v-else>
    {{__t('Không')}}
  </span>
</template>
<script>
import constant from '@/constants'
export default {
  name: 'AllergiesInfo',
  props: ['label', 'data'],
  data () {
    return {
      str: []
    }
  },
  created () {
    var KindOfAllergy = constant.ALLERGY.filter(e => {
      return ((this.data.KindOfAllergy || '').split(',')).includes(e.value)
    }).map(r => r.label)
    this.str = ([KindOfAllergy.join(','), this.data.Allergy].filter(e => e)).join(', ')
  }
}
</script>
