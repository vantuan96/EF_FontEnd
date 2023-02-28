<template>
  <div class="main-content" id="add-customer-page">
    <h1 class="title-page text-center">{{__t('Thêm bệnh nhân')}}</h1>
    <div class="add-form-group">
      <form v-on:submit.prevent="submit" name="add-customer">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div class="box box-border effect1">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group" :class="{ 'form-group--error': $v.filters.Fullname.$error }">
                    <label for="Fullname" required>{{__t('customer.ho_ten_PID')}}</label>
                    <input type="text" class="form-control" v-model="filters.Fullname" id="Fullname" :placeholder="__t('customer.ho_ten_PID')">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group" :class="{ 'form-group--error': $v.filters.DateOfBirth.$error }">
                    <label for="DateOfBirth" required>{{__t('customer.ngay_sinh')}}</label>
                    <v-masked-input mask="11/11/1111" v-model="filters.DateOfBirth" :placeholder="vDateFormat" class="form-control" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="Gender">{{__t('customer.gioi_tinh')}}</label>
                    <div class="gender-select flex-box">
                      <input type="radio" id="radio1" name="Gender" v-model="filters.Gender" value="0">
                      <label for="radio1">{{__t('customer.gioi_tinh_nu')}}</label>
                      <input type="radio" id="radio2" name="Gender" v-model="filters.Gender" value="1">
                      <label for="radio2">{{__t('customer.gioi_tinh_nam')}}</label>
                      <input type="radio" id="radio3" name="Gender" v-model="filters.Gender" value="2">
                      <label for="radio3">{{__t('customer.gioi_tinh_khac')}}</label>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="Nationality">{{__t('customer.quoc_tich')}}</label>
                    <input type="text" class="form-control" id="Nationality" v-model="filters.Nationality" :placeholder="__t('customer.quoc_tich')">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Address">{{__t('customer.cho_o_hien_tai')}}</label>
                    <input type="text" class="form-control" id="Address" v-model="filters.Address" :placeholder="__t('customer.cho_o_hien_tai')">
                  </div>
                </div>
              </div>
              <!-- <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="w-full">Chưa rõ danh tính</label>
                    <span class="v-checkbox">
                      <input class="form-control" type="checkbox" id="no-name" name="no-name" v-model="filters.NoName">
                      <label for="no-name"></label>
                    </span>
                  </div>
                </div>
              </div> -->
              <div class="row">
                <div class="col-md-12">
                  <button type="button" class="btn btn-block v-yellow-btn" @click="submit">{{__t('customer.btn_tim_kiem')}}</button>
                  <input type="submit" hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <template v-if="customers && customers.length">
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
              <button type="button" class="btn" @click="submitCustomersED(customer)">{{__t('customer.btn_tao_moi_ho_so')}}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else-if="customers && customers.length === 0">
      <p class="text-center">{{__t('customer.msg_khong_ket_qua')}}</p>
    </template>
    <p class="text-center"><button v-if="!searchByPID" type="button" class="btn" @click="submitCustomersED()">{{__t('customer.btn_tao_moi')}}</button></p>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */

import Customer from '@/services/Customer'
import moment from 'moment'
import { required, helpers, requiredIf } from 'vuelidate/dist/validators.min'
import MixinView from '@/mixins/view.js'
import CustomersED from '@/services/ED/CustomersED'
// import NProgress from 'nprogress'
import utils from '@/utils.js'
const isDate = (value) => !helpers.req(value) || moment(value, process.env.DATE_FORMAT, true).isValid()
export default {
  /**
   * The name of the page.
   */
  name: 'add-ed',
  mixins: [MixinView],
  data () {
    return {
      customers: null,
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
        isDate,
        required: requiredIf(function (nestedModel) {
          return this.filters.Fullname && !utils.isPositiveInteger(this.filters.Fullname)
        })
      },
      Fullname: {
        required
      }
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    // MaskedInput
  },
  computed: {
    searchByPID: function () {
      return utils.isPositiveInteger(this.filters.Fullname)
    }
  },
  mounted () {
    // this.getData()
  },
  methods: {
    noName () {
      this.filters.Fullname = 'Không rõ danh tính 01'
    },
    submitCustomersED (data) {
      var dataSubmit = data
      if (data === undefined) {
        this.$v.filters.$touch()
        // NProgress.start()
        if (this.$v.filters.$error) {
          return false
        }
        dataSubmit = this.filters
      }
      if (utils.isPositiveInteger(dataSubmit.Fullname)) {
        this.submit()
      } else {
        new CustomersED().create(dataSubmit).then(response => {
          this.$router.push({name: 'ED-etr', params: {Id: response.Id}})
        })
      }
    },
    submit () {
      this.$v.filters.$touch()
      // NProgress.start()
      if (this.$v.filters.$error) {
        return false
      }
      if (utils.isPositiveInteger(this.filters.Fullname)) {
        this.filters.PID = this.filters.Fullname
      } else {
        this.filters.PID = null
      }
      new Customer(this.filters)
        .all()
        .then(response => {
          this.customers = response
        })
    }
  }
}
</script>
