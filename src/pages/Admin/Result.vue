<template>
  <div class="main-content" id="Prescription-Result-page">
    <div class="row v-flexbox">
      <div class="col-md-12 col-sm-12">
        <div class="search-group box" v-if="Customer">
          <div class="row">
            <div class="col-md-12" style="text-transform: uppercase; color: #337AB7; font-weight: bold; font-size: 16px;">
              {{ Customer.Fullname || '' }} <VipIcon :data="Customer" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>PID: </label> {{ Customer.PID }}
            </div>
            <div class="col-md-6">
              <label>{{__t('Dân tộc')}}: </label> {{ Customer.Fork }}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>{{__t('Ngày sinh')}}: </label> {{ Customer.DateOfBirth }}
            </div>
            <div class="col-md-6">
              <label>{{__t('Nghề nghiệp')}}: </label> {{ Customer.Job }}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>{{__t('Giới tính')}}: </label> {{ __t(GENDER[Customer.Gender]) }}
            </div>
            <div class="col-md-6">
              <label>{{__t('Số điện thoại')}}: </label> {{ Customer.Phone }}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>{{__t('Quốc tịch')}}: </label> {{ Customer.Nationality }}
            </div>
            <div class="col-md-6">
              <label>{{__t('Địa chỉ')}}: </label> {{Customer.Address}}
            </div>
          </div>
          <div>
            <div class="btn-group" role="group">
              <button v-permissions="'GUNLK2'" @click="openVipUnlock()" v-if="Customer.IsVip" class="btn-warning btn" type="button">Mở khóa HS VIP</button>
              <router-link v-permissions="'ADMINUPDATESTATUS'" :to="{name: 'PatientRecords', params: { Id: Customer.PID }}"><button class="btn-info btn" type="button">Đổi trạng thái/ Mở khóa hồ sơ</button></router-link>
              <!-- <button class="btn-secondary btn" type="button">Xóa hồ sơ</button> -->
            </div>
            <UnlockVip :customer="Customer" />
          </div>
        </div>
        <div class="text-center" v-else>
          <v-loading />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import CustomerApi from '@/services/CustomerApi'
import constants from '@/constants'
import UnlockVip from './UnlockVip'

export default {
  /**
   * The name of the page.
   */
  name: 'Prescription-Result',
  data () {
    return {
      Customer: null,
      GENDER: constants.GENDER
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    UnlockVip
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  methods: {
    async getData () {
      await this.getCustomer()
    },
    async getCustomer () {
      await new CustomerApi()
        .find(this.$route.params.PID)
        .then(response => {
          this.Customer = response
        }).catch(e => {
          this.loaded = true
        })
    },
    openVipUnlock () {
      this.$modal.show('VipUnlockForm')
    }
  }
}
</script>
