<template>
  <div v-if="loaded">
    <div v-if="DataSubmit.Customer">
        <customer-info :data="DataSubmit.Customer"/>
        <div class="v-tab">
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation">
              <router-link :to="{name: 'DoctorPlaceDiagnosticsOrder-Search', query: this.$route.params}">
                {{__t('Chỉ định')}}<br/>
              </router-link>
            </li>
            <li role="presentation" class="active">
              <router-link :to="{name: 'DoctorPlaceDiagnosticsOrder-History', params: this.$route.params}">
                {{__t('Lịch sử chỉ định')}}<br/>
              </router-link>
            </li>
            <li role="presentation">
              <router-link :to="{name: 'DoctorPlaceDiagnosticsOrder-ViHC', params: this.$route.params}">
                {{__t('ViHC')}}<br/>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="tab-content mt-10">
          <div class="box form-content mb-10">
            <h4 class="mt-0"><b>{{__t('Lịch sử bệnh nhân')}}</b></h4>
            <div class="ServiceOrderListx">
              <div :class="'mb-10'" :key="index" :data="charge" v-for="(charge, index) in DataSubmit.Items">
                <div>
                  <VisitItem :data="charge" :index="index" :fulldata="DataSubmit" />
                </div>
              </div>
            </div>
            <DetailPopup/>
            <PrintByCharge :fulldata="DataSubmit"/>
            <PathologyPrint :fulldata="DataSubmit"/>
          </div>
        </div>
    </div>
    <div v-else class="text-center">
      {{__t('Không tìm thấy thông tin bệnh nhân')}}
    </div>
  </div>
  <div v-else class="text-center">
    <v-loading/>
  </div>
</template>
<script>

import CustomerInfo from './CustomerInfo.vue'
import VisitItem from './VisitItem.vue'
import ServiceSelect from './ServiceSelect.vue'
import ServiceSelectTable from './ServiceSelectTable.vue'
import ServiceOrderList from './ServiceOrderList.vue'
import DetailPopup from './DetailPopup.vue'
import constants from '@/constants'
import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'

import HistoryItem from './HistoryItem.vue'
import ChargeDetail from './ChargeDetail.vue'

import MixinPlaceDiagnostics from '@/mixins/DoctorPlaceDiagnosticsOrder.js'
import { mapGetters } from 'vuex'
import VSelect from '@/components/VSelect.vue'
import PrintByCharge from './PrintByCharge.vue'
import PathologyPrint from './PathologyPrint/Index.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'PlaceDiagnostics',
  mixins: [MixinPlaceDiagnostics],
  data () {
    return {
      DataSubmit: {
        Charge: {
          Priority: 'R'
        }
      },
      loaded: false,
      RickGroup: constants.RISKGROUP,
      tes: '',
      servicesItem: [[], [], [], []],
      servicesDetailItem: [[], [], [], []],
      step: 1,
      Types: ['Dịch vụ xét nghiệm', 'Dịch vụ CĐHA', 'Dịch vụ chung']
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    PathologyPrint,
    PrintByCharge,
    VSelect,
    CustomerInfo,
    ServiceSelect,
    ServiceSelectTable,
    ServiceOrderList,
    DetailPopup,
    HistoryItem,
    ChargeDetail,
    VisitItem
  },
  watch: {
    servicesData: {
      handler (a, b) {
        this.setServicesDetailItem()
      },
      deep: true
    },
    allData: {
      handler (a, b) {
        if (this.allData.length === 0) this.step = 1
      },
      deep: true
    }
  },
  mounted () {
    this.getData()
    this.open('Vcollapse')
    this.open('VcollapseXN')
    this.open('VcollapseCDHA')
  },
  computed: {
    ...mapGetters({
      servicesData: 'PlaceDiagnostics/getServices',
      viewDetailItem: 'PlaceDiagnostics/getViewItem'
    }),
    allData: function () {
      return [].concat(this.servicesData[0] || []).concat(this.servicesData[1] || []).concat(this.servicesData[2] || [])
    }
  },
  methods: {
    open (type, charge) {
      console.log(type)
      if (this.$refs[type]) {
        if (Array.isArray(this.$refs[type])) {
          this.$refs[type][0].setHasData()
        } else {
          this.$refs[type].setHasData()
        }
      }
      setTimeout(() => {
        this.setViewItem(charge)
      }, 100)
    },
    getData () {
      new DoctorPlaceDiagnosticsOrder(this.$route.params)
        .find('ChargeVisit/History')
        .then(response => {
          this.DataSubmit = response
          this.loaded = true
          if (this.DataSubmit.Items && this.DataSubmit.Items.length > 0) {
            setTimeout(() => {
              this.open('Charge0', this.DataSubmit.Items[0])
            }, 100)
          }
        }).catch(e => {
          console.log(e)
          this.loaded = true
        })
    }
  }
}
</script>
