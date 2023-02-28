<template>
  <div v-if="data && !nullContent">
    {{__t('Chẩn đoán trong điều trị')}}: ICD10: {{getName(data.Icd)}} , {{__t('Chẩn đoán')}}: {{data.Disease}}, {{data.CreateBy ? 'Bs:' : ''}} <ad-Info :ad="data.CreateBy" /> lúc: {{data.UpdateAt | formatDateWithoutSecon}} <button :class="{'btn btn-flat btn-xs': true, 'disabled': copyed}" @click="copy()">Copy</button>
  </div>
</template>
<script>
export default {
  name: 'TextCopyFill',
  props: ['data'],
  data () {
    return {
      copyed: false
    }
  },
  computed: {
    nullContent: function () {
      let check = false
      if (!this.data.Icd && !this.data.Disease) {
        check = true
      }
      return check
    }
  },
  methods: {
    copy () {
      if (this.copyed) return false
      this.copyed = true
      this.$emit('copy', this.data)
    },
    getName (icd) {
      let name = ''
      if (icd) {
        name = this.JSONParse(icd).map(e => e.code).join(', ')
      }
      return name
    }
  }
}
</script>
