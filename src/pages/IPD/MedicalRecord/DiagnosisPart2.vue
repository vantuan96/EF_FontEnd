<template>
  <div v-if="data">
    {{__t('Chẩn đoán trong điều trị')}}: ICD10: {{data.icd.map(e => e.code).join(', ')}}, {{__t('Chẩn đoán')}}: {{data.diagnosis}}, {{__t('Bs')}}: <ad-Info v-if="data.UpdatedBy" :ad="data.UpdatedBy" /> {{__t('lúc')}} {{data.UpdatedAt}} <button :class="{'btn btn-flat btn-xs': true, 'disabled': copyed}" @click="copy()">Copy</button>
  </div>
</template>
<script>
export default {
  name: 'DiagnosisPart2',
  props: ['data'],
  data () {
    return {
      copyed: false
    }
  },
  methods: {
    copy () {
      if (this.copyed) return false
      this.copyed = true
      this.$emit('copy', this.data)
    }
  }
}
</script>
