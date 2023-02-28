<template>
  <div class="sync-ed-comp">
    <button type="button" @click="fillData()" class="btn btn-primary btn-xs btn-flat"><span class="glyphicon glyphicon-refresh green-color"></span></button>
    <modal :name="EdId + '-modal'" transition="pop-out" height="auto" :scrollable="true" :width="modalWidth">
      <div class="sync-ed-box">
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
                  <button type="button" class="btn" @click="updateEd(customer)">{{__t('Chọn')}}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="customers && customers.length === 0">
          <div class="callout callout-warning">
            <h4>{{__t('Không tìm thấy bệnh nhân này!')}}</h4>
            <p>{{__t('Vui lòng kiểm tra lại thông tin trên eHos/OH.')}}</p>
          </div>
          <div class="box box-border">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group" :class="{ 'form-group--error': $v.filters.Fullname.$error }">
                  <label for="Fullname" required>{{__t('Họ tên')}}</label>
                  <input type="text" class="form-control" v-model="filters.Fullname" id="Fullname" :placeholder="__t('Họ tên')">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group" :class="{ 'form-group--error': $v.filters.DateOfBirth.$error }">
                  <label for="DateOfBirth" required>{{__t('Ngày sinh')}}</label>
                  <masked-input mask="11/11/1111" v-model="filters.DateOfBirth" :placeholder="vDateFormat" class="form-control" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group" :class="{ 'form-group--error': $v.filters.Gender.$error }">
                  <label for="Gender" required>{{__t('Giới tính')}}</label>
                  <div class="gender-select flex-box">
                    <input type="radio" id="radio1" name="Gender" v-model="filters.Gender" value="0">
                    <label for="radio1">{{__t('Nữ')}}</label>
                    <input type="radio" id="radio2" name="Gender" v-model="filters.Gender" value="1">
                    <label for="radio2">{{__t('Nam')}}</label>
                    <input type="radio" id="radio3" name="Gender" v-model="filters.Gender" value="2">
                    <label for="radio3">{{__t('Khác')}}</label>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Nationality">{{__t('Quốc tịch')}}</label>
                  <input type="text" class="form-control" id="Nationality" v-model="filters.Nationality" :placeholder="__t('Quốc tịch')">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="Address">{{__t('Chỗ ở hiện tại')}}</label>
                  <input type="text" class="form-control" id="Address" v-model="filters.Address" :placeholder="__t('Chỗ ở hiện tại')">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button type="button" class="btn btn-block v-yellow-btn" @click="submit">{{__t('Tìm kiếm trên HIS')}}</button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </modal>
  </div>
</template>

<script>
import Customer from '@/services/Customer'
import CustomersED from '@/services/ED/CustomersED'
// import _ from 'lodash' @before-close="fillData"
import { required, helpers } from 'vuelidate/dist/validators.min'
import MaskedInput from 'vue-masked-input'
import moment from 'moment'
const MODAL_WIDTH = 750
const isDate = (value) => !helpers.req(value) || moment(value, process.env.DATE_FORMAT, true).isValid()
export default {
  name: 'v-c-ed',
  props: ['EdId', 'dataEd'],
  components: {
    MaskedInput
  },
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      customers: [],
      filters: {
        DateOfBirth: null,
        Address: null,
        Gender: null,
        Fullname: null,
        Nationality: null
      }
    }
  },
  validations: {
    filters: {
      DateOfBirth: {
        isDate, required
      },
      Fullname: {
        required
      },
      Gender: {
        required
      }
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
  },
  computed: {
  },
  methods: {
    updateEd (data) {
      new CustomersED().update(this.EdId, data).then(response => {
        this.toastedSuccess()
        this.$modal.hide(this.EdId + '-modal')
        this.$emit('close', data)
      })
    },
    submit () {
      this.$v.filters.$touch()
      // NProgress.start()
      if (this.$v.filters.$error) {
        return false
      }
      new Customer(this.filters)
        .all()
        .then(response => {
          this.customers = response
        })
    },
    openTable () {
      this.$modal.show(this.EdId + '-modal')
    },
    fillData () {
      this.openTable()
      new Customer().find('sync/' + this.EdId).then(response => {
        this.customers = response
      })
    }
  }
}
</script>
