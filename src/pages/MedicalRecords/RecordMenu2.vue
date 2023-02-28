<template>
  <div class="RecordMenu2-Page mrt20">
    <MDCollapse2 v-if="Records && Records.Customer"
      :id="'id-box-info-user'"
      class="box-info-user"
      :style="`width: ${widthHeader}px`"
      :pin="pin"
      :vstyle="'background: #fff;padding: 10px 10px;border-radius: 5px;font-size: 16px;border: 1px solid #dadce0;'">
        <div slot="label">
          <div class="flex align-center">
            <div class="mrr10">PID: <b><pid :PID="Records.Customer.PID" :noPidmsg="'Chưa đồng bộ PID'" /></b> - <span class="name-user"> {{Records.Customer ? Records.Customer.Fullname : ''}}</span></div>
            <div class="box-gender women fw600" v-if="Records.Customer.Gender === 'Nữ'"><i class="fa fa-female" aria-hidden="true"></i> {{__t('Nữ')}}</div>
            <div class="box-gender man fw600" v-else><i class="fa fa-male" aria-hidden="true"></i> {{__t('Nam')}}</div>
            <AllergyLabel :bottom="true" class="box-di-ung" v-if="Records.Customer.AllergyInfo && Records.Customer.AllergyInfo.IsAllergy" :data="Records.Customer.AllergyInfo"/>
            <VipIcon class="mrl10" :data="Records.Customer" />
          </div>
        </div>
        <div slot="content" class="box-infomation-content" :class="pin ? 'none' : ''">
          <TopInfo :VisitId="Records.Customer.VisitId" :Info2="Info2" :VisitType="Records.Customer.VisitType" :info="Records.Customer" @change="handleChange"/>
        </div>
    </MDCollapse2>
    <TopInfo2 v-if="Records.Customer" :VisitId="Records.Customer.VisitId" :Info2="Info2" :VisitType="Records.Customer.VisitType" :class="!pin ? 'none' : ''" :info="Records.Customer" @change="handleChange"/>
    <div class="v-tab">
      <ul id="AmbulanceRunReportTab" class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('ListRecord/HSBA')">
          <router-link :to="{name: 'ListRecordsMenuHSBA', params: { Id: this.Id }}">
            {{__t('Lịch sử HSBA')}}
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('ListRecord/LSCD')">
          <router-link :to="{name: 'ListRecordsMenuLSCD', params: { Id: this.Id }}">
            {{__t('Lịch sử chỉ định')}}
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('ListRecord/LSDT')">
          <router-link :to="{name: 'ListRecordsMenuLSDT', params: { Id: this.Id }}">
            {{__t('Lịch sử dùng thuốc ')}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="tab-content" id="record-menu">
      <transition name="page" mode="out-in">
        <router-view class="mrt10"/>
      </transition>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import PatientRecords from './PatientRecords.vue'
import DiagnosticReporting from './DiagnosticReporting.vue'
import MedicationHistory from './MedicationHistory.vue'
import MedicalRecords from '@/services/MedicalRecords'
import constant from '@/constants'
import TopInfo from '@/components/TopInfo.vue'
import TopInfo2 from '@/components/TopInfo2.vue'
import CustomerInfor from '@/services/CustomerInfor'
import MDCollapse2 from '@/components/global/MDCollapse2.vue'
export default {
  name: 'RecordMenu2',
  components: {
    PatientRecords,
    DiagnosticReporting,
    MedicationHistory,
    TopInfo,
    TopInfo2,
    MDCollapse2
  },
  props: ['hideCode'],
  data () {
    return {
      type: 'PatientRecords',
      Records: {
        Visit: []
      },
      Id: this.$route.params.Id,
      parameters: {
        status: [],
        recordCode: null,
        visitCode: null,
        visitTypeGroupCode: [],
        specialty: [],
        startExaminationTime: null,
        endExaminationTime: null,
        pageNumber: 1,
        pages: 1,
        PageSize: 99999
      },
      img: null,
      pin: false,
      Info2: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    updateQuery () {
      return Object.assign({}, this.parameters, {
        status: this.parameters.status.map(e => { return e.value }),
        visitCode: this.parameters.visitCode,
        recordCode: this.parameters.recordCode,
        visitTypeGroupCode: this.parameters.visitTypeGroupCode.map(e => { return e.value }),
        specialty: this.parameters.specialty.map(e => { return e.value }),
        startExaminationTime: this.parameters.startExaminationTime,
        endExaminationTime: this.parameters.endExaminationTime
      })
    },
    getData () {
      new MedicalRecords(this.updateQuery())
        .find(this.Id)
        .then(response => {
          this.Records = response || []
          if (response && response.Customer) {
            new CustomerInfor().find(response.Customer.VisitType + '/' + response.Customer.VisitId).then(res => {
              this.Info2 = res
            }).catch(e => {
            })
          }
        })
    },
    getRelationshipName (Customer) {
      let RelationshipName = ''
      if (Customer.RelationshipName) {
        RelationshipName += Customer.RelationshipName
      }
      if (Customer.RelationshipPhone) {
        if (RelationshipName) {
          RelationshipName += ' - '
        }
        RelationshipName += Customer.RelationshipPhone
      }
      return RelationshipName
    },
    getKhoa (data) {
      let khoa = ''
      if (data) {
        if (data.ApiCode) {
          khoa += data.ApiCode
        }
        if (data.Site) {
          if (khoa) {
            khoa += ' - '
          }
          khoa += data.Site
        }
        if (this.__label(data)) {
          if (khoa) {
            khoa += ' - '
          }
          khoa += this.__label(data)
        }
      }
      return khoa
    },
    getClass () {
      setTimeout(() => {
        // this.widthHeader = $('#record-menu').width()
      }, 200)
      return ''
    },
    activeClass (link) {
      if (typeof link === 'string') return this.$route.path.includes(link) ? 'active' : ''
      return link.includes(this.$route.name) ? 'active' : ''
    },
    getAllergy () {
      let str = ''
      if (this.Records && this.Records.Customer && this.Records.Customer.AllergyInfo) {
        let data = this.Records.Customer.AllergyInfo
        let KindOfAllergy = constant.ALLERGY.filter(e => {
          return ((data.KindOfAllergy || '').split(',')).includes(e.value)
        }).map(r => r.label)
        str = KindOfAllergy.join(',')
        if (data.Allergy) {
          if (str) {
            str += ': '
          }
          str += data.Allergy
        }
      }
      return str
    },
    handleChange (check) {
      this.pin = check
    }
  },
  computed: {
    widthHeader () {
      return $('#record-menu').width() || ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .color-blue {
      color: #337AB7!important;
    }
  .box-info-user {
    position: fixed!important;
    top: 64px;
    z-index: 98;
    min-height: 50px!important;
    .name-user {
      color: #3c8dbc;
      cursor: pointer;
    }
    .box-gender {
      border: 1px solid;
      padding: 4px;
      color: #fff;
      font-size: 12px;
      padding: 1px 3px;
      border-radius: 3px;
      display: inline-block;
    }
    .women {
      background: #ff00ff;
      border-color: #ff00ff;
    }
    .man {
      background: #5d5dea;
      border-color: #5d5dea;
    }
    .box-infomation {
      position: relative;
      width: 100%;
      background: #fff;
      border: 1px solid #dadce0;
      border-radius: 4px;
      .avatar {
        padding: 10px;
      }
      .box-info1, .box-info2 {
        padding: 10px 13px;
      }
      .avatar, .box-info1 {
        border-right: 1px solid #dadce0;
      }
      .avatar {
        width: 169px;
      }
      .icon-pin {
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }
    .box-di-ung {
      color: #fff;
      font-weight: 700;
      background: #DD4B39;
      border-radius: 4px;
      line-height: 16px;
      font-size: 14px;
      padding: 5px;
      display: inline-block;
    }
    .tooltiptext {
      bottom: 120%;
    }
  }
  .box-infomation {
    position: relative;
    width: 100%;
    background: #fff;
    border: 1px solid #dadce0;
    border-radius: 4px;
    .avatar {
      padding: 10px;
    }
    .box-info1, .box-info2 {
      padding: 10px 13px;
    }
    .avatar, .box-info1 {
      border-right: 1px solid #dadce0;
    }
    .avatar {
      width: 169px;
    }
    .icon-pin {
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
  .box-info-user:before {
    content: "";
    border-top: 15px solid #ffc107;
    border-right: 15px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  .big-box-info {
    width: 100%;
    .box2-top-info {
      width: 100%;
      display: flex;
      align-items: center;
      background: #DFF9F7;
      padding: 10px;
      border-radius: 4px;
    }
    .record-code {
      margin: 0px -10px!important;
      border-radius: 0px!important;
      padding: 0 10px;
    }
    .box1, .box2 {
      padding: 10px;
    }
    .box1 {
      width: 100%;
      border-bottom: 1px solid #dadce0;
    }
  }
</style>
