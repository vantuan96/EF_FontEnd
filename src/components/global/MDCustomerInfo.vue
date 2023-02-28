<template>
  <div>
    <div class="flex-box flex-center">
      <div :key="index" v-for="(item, index) in value.Items" class="mr-10" style="min-width: 150px">
        <label class="no-wrap">{{__t(item.ViName)}}</label>
        <template v-if="item.DataType === 'Text'">
          <FakeInput v-if="readonly" v-model="item.Value" />
          <input v-model="item.Value" type="text" class="form-control" v-else/>
        </template>
        <radio-list v-model="item.Value" :readonly="readonly" :options="JSONParse(item.Data)" v-if="item.DataType === 'RadioGroup'"/>
        <VDatePicker v-model="item.Value" :readonly="readonly" :hideTooltip="true" v-if="item.DataType === 'Date'" :format="'HH:mm DD/MM/YYYY'"/>
      </div>
      <div v-if="!readonly">
        <label class="no-wrap hidden-text">xxxxxx</label>
        <span class="input-group-btn">
          <button type="button" class="btn btn-info btn-flat" @click="SyncEd()"><span class="glyphicon glyphicon-refresh green-color"></span></button>
        </span>
      </div>
    </div>
    <modal :name="'syxxxx-modal'" transition="pop-out" height="auto" :scrollable="true" :width="modalWidth">
      <div class="sync-ed-box">
        <div v-if="customers && customers.length">
          <p><b>{{__t('Kết quả')}} ({{customers.length}})</b></p>
          <table class="table table-striped table-bordered" id="customer-tbl">
            <tbody>
              <tr :data="customer" :key="index" v-for="(customer,index) in customers">
                <td width="10" align="center">{{index + 1}}</td>
                <td>
                  PID: <b>{{customer.PID}} - {{customer.Fullname}}</b> - {{customer.DateOfBirth}}
                  <div>{{customer.Address}}</div>
                </td>
                <td width="10">
                  <button type="button" class="btn" @click="updateInfo(customer)">{{__t('Chọn')}}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="customers && customers.length === 0">
          <div class="callout callout-warning">
            <h4>{{__t('Không tìm thấy mã lượt khám của bệnh nhân!')}}</h4>
            <p>{{__t('Vui lòng kiểm tra lại thông tin trên eHos/OH')}}.</p>
          </div>
        </template>
      </div>
    </modal>
  </div>
</template>
<script>
import Customer from '@/services/Customer'
import VDatePicker from '@/components/VDateTimePicker.vue'
const MODAL_WIDTH = 750
export default {
  name: 'MDCustomerInfo',
  props: ['value', 'readonly'],
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      customers: null
    }
  },
  components: {
    VDatePicker
  },
  methods: {
    updateInfo (cus) {
      this.value.Items[1].Value = cus.Fullname
      this.value.Items[2].Value = cus.Gender + ''
      this.value.Items[3].Value = '00:00 ' + cus.DateOfBirth
      this.$modal.hide('syxxxx-modal')
    },
    SyncEd () {
      if (!this.value.Items[0].Value) {
        this.alert('Thông báo', 'Vui lòng nhập PID')
        return ''
      }
      new Customer({PID: this.value.Items[0].Value})
        .all()
        .then(response => {
          this.$modal.show('syxxxx-modal')
          this.customers = response
        })
    }
  }
}
</script>
