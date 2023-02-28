<template>
  <div>
    <div v-if="customers && customers.length">
      <p><b>{{__t('Kết quả')}} ({{customers.length}})</b></p>
      <table class="table table-striped table-bordered" id="customer-tbl">
        <tbody>
          <tr :data="customer" :key="index" v-for="(customer,index) in customers">
            <td width="10" align="center">1</td>
            <td>
              PID: <b>{{customer.PID}} - {{customer.Fullname}}</b> - {{customer.DateOfBirth}}
              <div>{{customer.Address}}</div>
            </td>
            <td width="10">
              <button type="button" class="btn" @click="select(customer)">{{__t('Chọn')}}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template v-else-if="customers && customers.length === 0">
      <p class="text-center">{{__t('Không tìm thấy bệnh nhân này')}}</p>
    </template>
  </div>
</template>

<script>
import Customer from '@/services/Customer'
// import _ from 'lodash'
export default {
  name: 'v-c-ed',
  props: ['EdId'],
  data () {
    return {
      customers: null
    }
  },
  created () {
    new Customer().find(this.EdId).then(response => {
      this.ed = response
    })
  },
  computed: {
  },
  methods: {
  }
}
</script>
