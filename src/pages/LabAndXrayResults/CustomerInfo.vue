<template>
  <div class="row v-flexbox">
    <div class="col-md-12 col-sm-12">
      <div class="search-group box" v-if="data">
        <div class="row">
          <div class="col-md-12" style="text-transform: uppercase; color: #337AB7; font-weight: bold; font-size: 16px;">
            {{ data.Fullname || '' }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label>PID: </label> {{ data.PID }}
          </div>
          <div class="col-md-6">
            <label>{{__t('Dân tộc')}}: </label> {{ data.Fork }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label>{{__t('Ngày sinh')}}: </label> {{ data.DateOfBirth }}
          </div>
          <div class="col-md-6">
            <label>{{__t('Nghề nghiệp')}}: </label> {{ data.Job }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label>{{__t('Giới tính')}}: </label> {{GENDER[data.Gender]}}
          </div>
          <div class="col-md-6">
            <label>{{__t('Số điện thoại')}}: </label> {{ data.Phone }}
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label>{{__t('Quốc tịch')}}: </label> {{ data.Nationality }}
          </div>
          <div class="col-md-6">
            <label>{{__t('Địa chỉ')}}: </label> {{ data.Address }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import constants from '@/constants'
export default {
  props: ['data', 'Visit'],
  name: 'CustomerInfo',
  components: {
  },
  data () {
    return {
      GENDER: constants.GENDER
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
