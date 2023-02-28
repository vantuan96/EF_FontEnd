<template>
  <div v-if="loading">
    <Ver2 v-if="Version >= 2"/>
    <Ver1 v-else/>
  </div>
  <div v-else class="text-center">
    <v-loading/>
  </div>
</template>

<script>
import Ver2 from './Ver2.vue'
import Ver1 from './Ver1.vue'
import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
export default {
  name: 'OutpatientExaminationNote',
  components: {
    Ver2,
    Ver1
  },
  data () {
    return {
      Version: null,
      loading: false
    }
  },
  mounted () {
    this.CheckVersion()
  },
  methods: {
    CheckVersion () {
      if (this.$route.params.Id) {
        new OutpatientExaminationNote().find('CheckVersion/' + this.$route.params.Id).then((response) => {
          this.Version = response.Version
          this.loading = true
        }).catch((e) => {
          this.loading = true
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
