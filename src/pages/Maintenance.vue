
<template>
  <div class="main-content">
    <h2 class="text-center">{{__t('Kiểm thảo tử vong')}}</h2>
    <h4 class="text-bold">A. THÀNH PHẦN CHÍNH</h4>
    <div class="box form-content">
    </div>
  </div>
</template>
<script>
import MortalityReport from '@/services/ED/MortalityReport'
import VDatePicker from '@/components/VDateTimePicker.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
// import $ from 'jquery'
// import _ from 'lodash'
// import moment from 'moment'
export default {
  name: 'MaintenancePage',
  mixins: [MixinForm],
  data () {
    return {
      DataSubmit: {
      }
    }
  },
  components: {
    VDatePicker, Logs
  },
  mounted () {
    this.getData()
  },
  computed: {
    someThing: function () {
    }
  },
  methods: {
    getData () {
    }
  }
}
</script>
