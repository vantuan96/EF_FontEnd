 <template>
  <div class="top-info2">
    <div class="box-infomation" style="margin-bottom: 5px;" v-if="info">
      <div class="flex">
        <div class="icon-pin disable_ccp_page_dex" @click="handleChange()">
          <BaseIcon :url="'pin.png'" class="cursor"/>
        </div>
        <div class="big-box-info">
          <div class="box1">
            <div class="fw600 mrb10 record-code">{{__t('Mã hồ sơ')}}: <pid :PID="info.RecordCode" /></div>
            <div class="fw600 mrb10" v-if="hasRole('ABCJQK')">{{__t('Mã FormId')}}: <pid :PID="$store.getters.getCurrentFormId" /></div>
            <div class="fw600 fs18 color-blue disable_ccp_page_dex">{{__t('Thông tin hành chính')}}</div>
            <div class="mrb10 disable_ccp_page_dex">
              <div class="fw600 inline-block mrr10">{{__t('Ngày sinh')}}: <span class="fw400">{{getFTime2(info.DateOfBirth) || '&emsp;'}}</span></div>
              <div class="fw600 inline-block mrr10">{{__t('Tuổi')}}: <span class="fw400">{{info.AgeFormated | formatAge}}</span></div>
              <div class="fw600 inline-block mrr10">{{__t('Số điện thoại')}}: <span class="fw400">{{ info.Phone }}</span></div>
              <div class="fw600 inline-block mrr10">{{__t('Quốc tịch')}}: <span class="fw400">{{info.Nationality || '&emsp;'}}</span></div>
              <div class="fw600 inline-block mrr10">{{__t('Dân tộc')}}: <span class="fw400">{{ info.Fork }}</span></div>
              <div class="fw600 inline-block">{{__t('Nghề nghiệp')}}: <span class="fw400">{{info.Job}}</span></div>
            </div>
            <div class="fw600 mrb10 disable_ccp_page_dex">{{__t('Địa chỉ')}}: <span class="fw400">{{info.Address}}</span></div>
            <div class="fw600 disable_ccp_page_dex">{{__t('Thông tin người nhà')}}: <span class="fw400">{{ getRelationshipName(info)}}</span></div>
          </div>
          <div class="box2 disable_ccp_page_dex">
            <div class="fw600 mrb10 fs18 color-blue">{{__t('Thông tin khám gần nhất')}}</div>
            <div class="box2-top-info">
              <div class="fw600 mrr10">{{__t('Lượt tiếp nhận')}}: <span class="fw400">{{info.VisitCode}}</span></div>
              <div class="fw600 mrr10">{{__t('Ngày vào')}}: <span class="fw400">{{getFTime(info.AdmittedDate) || '&emsp;'}}</span></div>
              <div class="fw600 mrr10">{{__t('Ngày ra')}}: <span class="fw400">{{getFTime(info.DischargeDate) || '&emsp;'}}</span></div>
              <div class="fw600 mrr10">{{__t('info-khoa')}}: <span class="fw400">{{getKhoa(info) || '&emsp;'}}</span></div>
              <div class="fw600 mrr10">{{__t('Bác sĩ')}}: <span class="fw400"><ad-info :ad="info.DoctorUserName"/></span></div>
              <div class="fw600">{{__t('Điều dưỡng')}}: <span class="fw400"><ad-info :ad="info.NurseUserName"/></span></div>
            </div>
            <TopInfomationDetail :info="info" :VisitType="_VisitType" :VisitId="_VisitId"/>
          </div>
        </div>
      </div>
      <div v-if="isShowFooter">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import constants from '@/constants'
import TopInfomationDetail from '@/components/TopInfomationDetail.vue'
let ALLERGY = constants.ALLERGY
export default {
  name: 'top-infoV2',
  props: ['info', 'VisitType', 'hideCode', 'VisitId', 'isShowFooter'],
  data () {
    return {
      ALLERGY: ALLERGY
    }
  },
  components: {
    TopInfomationDetail
  },
  mounted () {
    $('.disable_ccp_page_dex' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
  },
  methods: {
    handleChange () {
      this.$emit('change', false)
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
    getRelationshipName (Customer) {
      let RelationshipName = ''
      if (Customer.Relationship) {
        RelationshipName += Customer.Relationship
      }
      if (Customer.RelationshipContact) {
        if (RelationshipName) {
          RelationshipName += ' - '
        }
        RelationshipName += Customer.RelationshipContact
      }
      return RelationshipName
    },
    checkShow (code) {
      let check = false
      if (code) {
        // chuyển khoa
        if (code === 'IPDTF') {
          check = true
        }
        // ra viện
        if (code === 'IPDDC') {
          check = true
        }
        // chuyển viện
        if (code === 'IPDIHT') {
          check = true
        }
        // chuyển tuyến
        if (code === 'IPDUDT') {
          check = true
        }
        // tử vong
        if (code === 'IPDDD') {
          check = true
        }
      }
      return check
    }
  }
}
</script>

<style lang="stylus" scoped>
  .top-info2 {
    .color-blue {
      color: #337AB7!important;
    }
    .record-code {
      margin: 0px -10px!important;
      border-radius: 0px!important;
      padding: 0 10px;
    }
    .name-user {
      color: #3c8dbc;
      cursor: pointer;
    }
    .box-infomation {
      position: relative;
      width: 100%;
      background: #fff;
      border: 1px solid #dadce0;
      border-radius: 0 0 5px 5px;
      .avatar {
        padding: 10px;
      }
      .box-info1 {
        .box-1 {
          padding: 10px 13px 0px 13px;
        }
        .box-2 {
          padding: 0px 13px 10px 13px;
        }
      }
      .box-info2 {
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
        .box1, .box2 {
          padding: 10px;
        }
        .box1 {
          width: 100%;
          border-bottom: 1px solid #dadce0;
        }
      }
    }
  }
</style>
