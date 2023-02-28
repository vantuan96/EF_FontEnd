<template>
  <div class="fix-h-50">
    <affix relative-element-selector="#content-wrap" id="ed-box" v-if="data">
      <div class="ed-info">
        <div class="ed-customer-title" v-if="data.InfoCustomer">
          PID: <b><pid :PID="data.InfoCustomer.PID" /></b> / <i>({{data.InfoCustomer.VisitCode || __t('Chưa đồng bộ VisitCode')}})</i> - <a> {{data.InfoCustomer.FullName }} <VipIcon :data="data" /> <DraftIcon :data="data"/></a>
        </div>
      </div>
    </affix>
    <div class="text-center" v-else><v-loading/></div>
  </div>
</template>

<script>
// import _ from 'lodash'
export default {
  props: ['data', 'Visit'],
  name: 'CustomerInfoTranslation',
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  beforeDestroy () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
