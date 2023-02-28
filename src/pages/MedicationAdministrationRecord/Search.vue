<template>
  <div class="main-content" id="Home-page">
    <div style="margin-top: 20px;">
      <b style="color: rgb(51, 122, 183); font-size: 20px;">{{
        __t("Y lệnh nội trú")
      }}</b>
    </div>
    <div class="row v-flexbox">
      <div class="col-md-12 col-sm-12">
        <div class="search-group ">
          <!-- v-on:submit.prevent="getData()" -->
          <div class="flex-box">
            <div style="width: 60%">
              <label for="">PID</label>
              <input
                type="text"
                class="form-control"
                v-model.trim="parameters.PID"
                :placeholder="__t('Nhập PID để tìm kiếm...')"
              />
            </div>
            <div style="width: 35%; margin-left: 20px" class="form-group">
              <label for="">{{ __t("Ngày y lệnh") }}</label>
              <v-date-picker
                v-model="parameters.FromDate"
                :hideTooltip="true"
                :allday="'allday'"
              />
            </div>
            <div>
              <label style="visibility: hidden;">Tìm kiếm</label>
              <button
                type="submit"
                class="btn btn-flat v-yellow-btn"
                @click="getData()"
              >
                <i class="fa fa-search" aria-hidden="true"></i>
                {{ __t("home.tim_kiem") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loaded">
      <div v-if="response">
        ...
      </div>
      <div class="text-center" v-else>
        {{ __t("Không có dữ liệu") }}
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
import VDatePicker from '../../components/global/VDatePicker.vue'
import moment from 'moment'
// import MedicalRecords from '@/services/MedicalRecords'

export default {
  /**
   * The name of the page.
   */
  name: 'Prescription-Search',
  data () {
    return {
      Error: '',
      customerResponse: null,
      loaded: false,
      parameters: {
        PID: '',
        FromDate: moment().format('DD/MM/YYYY'),
        ToDate: moment()
          .add(1, 'days')
          .format('DD/MM/YYYY'),
        pageNumber: 1,
        PageSize: 99999
      },
      Records: null,
      IsDependentProfile: false,
      MommyPID: null,
      Profiles: null,
      MommyAndBabyProfiles: [],
      MedicalRecordParams: {
        pageNumber: 1,
        pages: 1,
        PageSize: 99999
      }
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VDatePicker
  },
  mounted () {},
  computed: {},
  methods: {
    getData () {
      this.customerResponse = null
      this.loaded = false
      new CustomerApi()
        .find(this.parameters.PID)
        .then(response => {
          this.response = response
          this.$router.push({
            path: `/MedicationAdministrationRecord/${this.parameters.PID}`,
            query: {
              FromDate: this.parameters.FromDate,
              ToDate: moment(this.parameters.FromDate, 'DD/MM/YYYY')
                .add(1, 'days')
                .format('DD/MM/YYYY')
            }
          })
        })
        .catch(e => {
          this.loaded = true
        })
    }
  }
}
</script>
