<template>
  <div class="LichSuKhamTaiVinmec" v-if="loaded">
    <component
        v-if="$route.params.Type in $options.components"
        v-bind:is="$route.params.Type"
        :VisitType="$route.params.Type"
        :VisitId="$route.params.Id"
        :EdId="$route.params.Id"
        :OpdId="$route.params.Id"/>
    <div class="fw600 fs40 text-center color-blue mrb10 mrt20">{{__label({ViName: 'Lịch sử khám tại Vinmec', EnName: 'Medical history at Vinmec'})}}<BaseIcon :url="'lichsukhamtaivinmec.png'" class="mrl10" :width="'60px'"/></div>
    <div class="box-info" v-if="Info">
      <div class="fw600 mrr10">{{__t('Lượt tiếp nhận')}}: <span class="fw400" v-if="Info.VisitCode">{{Info.VisitCode}}</span></div>
      <div class="fw600 mrr10">{{__t('Ngày vào')}}: <span class="fw400">{{getFTime(Info.AdmittedDate) || '&emsp;'}}</span></div>
      <div class="fw600 mrr10">{{__t('Ngày ra')}}: <span class="fw400">{{getFTime(Info.DischargeDate) || '&emsp;'}}</span></div>
      <div class="fw600 mrr10">{{__t('info-khoa')}}: <span class="fw400">{{getKhoa(Info) || '&emsp;'}}</span></div>
      <div class="fw600 mrr10">{{__t('Bác sĩ')}}: <span class="fw400"><ad-info :ad="Info.DoctorUserName"/></span></div>
      <div class="fw600">{{__t('Điều dưỡng')}}: <span class="fw400"><ad-info :ad="Info.NurseUserName"/></span></div>
    </div>
    <div class="mrt10">
    <div class="v-tab space-between">
      <template>
        <ul class="nav nav-tabs flex-containerx" role="tablist">
          <template v-for="(item ,index) in List">
            <li v-if="item.Type.includes($route.params.Type)" class="text-center flex-containerx" :data="item" :key="index">
              <router-link class="no-border" :class="getClassHideActive()" :to="{name:`${item.Type}`, params: { Id: _VisitId }}">
                <div class="box-info-item">
                  <div>{{__label(item)}}</div>
                </div>
              </router-link>
            </li>
            <li v-else-if="!item.Type.includes('CTBA')" class="text-center flex-containerx" :data="item" :key="index">
              <router-link class="no-border" :to="{name:`${item.Type}`, params: { Id: _VisitId }}">
                <div class="box-info-item">
                  <div>{{__label(item)}}</div>
                </div>
              </router-link>
            </li>
          </template>
        </ul>
        <div class="tab-content mrt10" id="record-menu">
          <transition name="page" mode="out-in">
            <router-view :PID="Info ? Info.PID : ''" :viewOnly="true" :VisitId="_VisitId" :VisitType="$route.params.Type"/>
          </transition>
        </div>
      </template>
    </div>
  </div>
  </div>
  <div v-else class="text-center"><v-loading/></div>
</template>

<script>
import IPDCustomer from '@/services/IPD/Customer'
import EDCustomer from '@/services/ED/CustomersED'
import OPDCustomer from '@/services/OPD/Customer'
import EOCCustomer from '@/services/EOC/Customer'
const IPD = () => import(/* webpackChunkName: "IPD" */ '@/components/IPD/TopbarInfo.vue')
const ED = () => import(/* webpackChunkName: "ED" */ '@/components/ED/VIEW_ED.vue')
const OPD = () => import(/* webpackChunkName: "OPD" */ '@/components/OPD/VIEW_OPD.vue')
const EOC = () => import(/* webpackChunkName: "EOC" */ '@/components/EOC/InfoBar.vue')
export default {
  name: 'LichSuKhamTaiVinmec',
  props: ['VisitType', 'VisitId'],
  components: {
    IPD, ED, OPD, EOC
  },
  computed: {
  },
  data () {
    return {
      List: [
        {
          ViName: 'Chi tiết bệnh án',
          Type: 'IPDLichSuKhamTaiVinmecCTBA',
          EnName: 'Detail medical records'
        },
        {
          ViName: 'Chi tiết bệnh án',
          Type: 'OPDLichSuKhamTaiVinmecCTBA',
          EnName: 'Detail medical records'
        },
        {
          ViName: 'Chi tiết bệnh án',
          Type: 'EDLichSuKhamTaiVinmecCTBA',
          EnName: 'Detail medical records'
        },
        {
          ViName: 'Chi tiết bệnh án',
          Type: 'EOCLichSuKhamTaiVinmecCTBA',
          EnName: 'Detail medical records'
        },
        {
          ViName: 'Kết quả xét nghiệm',
          Type: 'LichSuKhamTaiVinmecKQXN',
          EnName: 'Laboratory results'
        },
        {
          ViName: 'Kết quả CĐHA',
          Type: 'LichSuKhamTaiVinmecCDHA',
          EnName: 'Radiology results'
        },
        {
          ViName: 'Kết quả Cận Lâm sàng',
          Type: 'LichSuKhamTaiVinmecCLS',
          EnName: 'Ancillary service results'
        },
        {
          ViName: 'Dịch vụ chung',
          Type: 'LichSuKhamTaiVinmecDVC',
          EnName: 'Allied service'
        },
        {
          ViName: 'Danh sách thuốc',
          Type: 'LichSuKhamTaiVinmecDST',
          EnName: 'Medication History'
        }
      ],
      Type: '',
      Info: null,
      loaded: false,
      APIService: null
    }
  },
  mounted () {
    setTimeout(() => {
      if (this.$route.params.Type === 'IPD') {
        this.APIService = new IPDCustomer().find(this._VisitId)
      }
      if (this.$route.params.Type === 'OPD') {
        this.APIService = new OPDCustomer().find(this._VisitId)
      }
      if (this.$route.params.Type === 'ED') {
        this.APIService = new EDCustomer().find(this._VisitId)
      }
      if (this.$route.params.Type === 'EOC') {
        this.APIService = new EOCCustomer().find(this._VisitId)
      }
      this.getData()
    }, 200)
  },
  methods: {
    getData () {
      this.APIService.then(res => {
        this.Info = res
        if (res.PID) {
          // this.getCustomer(res.PID)
        }
        if (this.$route.meta.name === 'Lịch sử khám bệnh' && this.$route.name === 'LichSuKhamTaiVinmec') {
          this.$router.push(
            {
              name: `${this.$route.params.Type}LichSuKhamTaiVinmecCTBA`,
              params: { Id: this._VisitId, Type: this.$route.params.Type }
            }
          )
        }
        setTimeout(() => {
          this.loaded = true
        }, 500)
      }).catch(e => {
        setTimeout(() => {
          this.loaded = true
        }, 500)
      })
    },
    getKhoa (data) {
      let khoa = ''
      if (data) {
        if (data.SiteCode) {
          khoa += data.SiteCode
        }
        if (data.Site) {
          if (khoa) {
            khoa += ' - '
          }
          khoa += data.Site
        }
        if (data.Specialty) {
          if (khoa) {
            khoa += ' - '
          }
          khoa += this.__label(data.Specialty)
        }
      }
      return khoa
    },
    getClassHideActive () {
      let nameClass = ''
      if (!this.$route.name.includes('LichSuKhamTaiVinmecCTBA')) {
        nameClass = 'hideActive'
      }
      return nameClass
    }
  }
}
</script>

<style lang="stylus" scoped>
  .box-info {
    width: 100%;
    display: flex;
    align-items: center;
    background: linear-gradient(180deg, rgba(255, 219, 113, 0.9) 0%, rgba(243, 182, 0, 0.9) 100%);;
    padding: 10px;
    border-radius: 4px;
  }
  .router-link-active {
    background: #337AB7!constant;
    color: #fff!constant;
  }
  .hideActive {
    background: #fff!constant;
    color: #1a1a1a!constant;
  }
</style>
