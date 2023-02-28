<template>
<Vcollapse @getData="getData()" ref="Vcollapse">
  <template slot="title">
    {{FormV2 ? FormV2.title : 'Giấy xác nhận ra viện không theo chỉ định của bác sĩ'}}
  </template>
  <template slot="info">
    <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}}: {{FormV2 ? FormV2.UpdateAt :  Form.UpdatedAt}}</span>
  </template>
  <template slot="content" v-if="DetailData">
    <div class="main-content">
    <template>
      <h2 class="text-center">
        {{ __t("Giấy xác nhận ra viện không theo chỉ định của bác sĩ") }}
      </h2>
      <h5 class="text-center">({{ __t("Áp dụng cho người bệnh nội trú") }})</h5>
      <div class="text-center">
        <b v-if="this.$i18n.locale === 'vi'">{{DetailData.FormData.IsSignToConfirm === true ? "TRƯỜNG HỢP NGƯỜI BỆNH/NGƯỜI GIÁM HỘ KÝ XÁC NHẬN" : "TRƯỜNG HỢP NGƯỜI BỆNH/NGƯỜI GIÁM HỘ KHÔNG KÝ XÁC NHẬN"}}</b>
        <b v-else>{{ DetailData.FormData.IsSignToConfirm === true  ? "WITH CONFIRMATION SIGNATURE OF PATIENT/PATIENT'S FAMILY MEMBER" : "WITHOUT CONFIRMATION SIGNATURE OF PATIENT/PATIENT'S FAMILY MEMBER"}}
        </b>
      </div>
      <br />
      <div v-if="DetailData.FormData.IsSignToConfirm === true">
        <div class="flex-box">
          <b style="width: 17%; margin: auto">{{ __t("Chẩn đoán") }}:</b>
          <div style="width: 83%">
            {{ getDiagnosis(DetailData.Dianosis) }}
          </div>
        </div>
        <div class="flex-box">
          <b style="width: 20%; margin: auto">{{ __t("Số phòng") }}</b>
          <textarea-autosize
            class="form-control"
            rows="1"
            v-model="DetailData.Room"
            :disabled="IsLocked"
          ></textarea-autosize>
        </div>
        <div class="flex-box" style="padding: 10px 0px 10px 0px">
          <b style="width: 17%">{{ __t("Vào lúc") }}:</b>
          <div style="width: 83%" v-if="this.$i18n.locale === 'vi'">
            {{ DetailData.TimeDischarge | viDisplayformatDateTimeWithMomentForDischarge}}
          </div>
          <div style="width: 83%" v-else>
            {{DetailData.TimeDischarge | enDisplayformatDateTimeWithMomentForDischarge}}
          </div>
        </div>
        <p style="padding-top: 10px">
          <b>{{ __t("Người bệnh/Người giám hộ người bệnh") }}</b>
        </p>
        <div class="flex-box">
          <span style="width: 20%; margin: auto">{{ __t("Họ tên người bệnh/người nhà:") }}</span>
          <textarea-autosize
            class="form-control"
            rows="1"
            v-model="DetailData.CustomerName"
            :disabled="IsLocked"
          ></textarea-autosize>
        </div>
        <div style="padding-top: 5px">
          <p>
            1. {{__t("Tôi là người bệnh/người giám hộ, trong tình trạng tinh thần tỉnh táo và bình tĩnh, đã nghe bác sĩ/nhân viên bệnh viện giải thích và đã hiểu về tình trạng bệnh hiện tại của tôi/người nhà của tôi, mục đích, phương pháp điều trị và các rủi ro/ hậu quả có thể xảy ra của việc tự ý ra viện.")}}
            2. {{__t( "Tôi xin được ra viện/xin cho người nhà tôi ra viện, và đồng ý rằng bệnh viện không phải chịu bất kì trách nhiệm nào về quyết định này của tôi.")}}
            3. {{__t("Lý do ra viện không theo chỉ định của Bác sĩ:")}}
          </p>
        </div>
        <div style="padding-top: 5px">
          <textarea-autosize
            class="form-control"
            rows="1"
            v-model="DetailData.DischargeType"
            :disabled="IsLocked"
          ></textarea-autosize>
        </div>
        <div style="padding-top: 15px">
          <b>{{__t("Bác sĩ điều trị/Bác sĩ được ủy quyền") }}</b>
        </div>
        <div>
          <p>
            1. {{__t("Tôi xác nhận đã giải thích cho người bệnh/người giám hộ về tình trạng bệnh hiện tại, mục đích điều trị, phương pháp điều trị và các rủi ro/hậu quả có thể xảy ra của việc tự ý xin ra viện.")}}
            2. {{__t("Tôi xác nhận rằng người bệnh/người giám hộ đang trong tình trạng tỉnh táo và bình tĩnh cũng như có đủ năng lực hành vi trong khi ra quyết định xin cho người bệnh ra viện không theo chỉ định của bác sĩ.")}}
          </p>
        </div>
        <div class="flex-box">
          <span style="width: 17%; margin: auto">{{ __t("Họ và tên bác sĩ") }}: </span>
          <div style="width: 83%">{{DetailData.DoctorFullName}}</div>
        </div>
      </div>
      <div v-else-if="DetailData.FormData.IsSignToConfirm === false">
        <div class="flex-box">
          <b style="width: 17%; margin: auto">{{ __t("Chẩn đoán") }}:</b>
          <div style="width: 83%">
            {{ getDiagnosis(DetailData.Dianosis) }}
          </div>
        </div>
        <div class="flex-box">
          <b style="width: 20%; margin: auto">{{ __t("Số phòng") }}:</b>
          <textarea-autosize
            class="form-control"
            rows="1"
            v-model="DetailData.Room"
            :disabled="IsLocked"
          ></textarea-autosize>
        </div>
        <div class="flex-box" style="padding: 10px 0px 10px 0px">
          <b style="width: 17%">{{ __t("Vào lúc") }}:</b>
          <div style="padding-left: 0px" v-if="this.$i18n.locale === 'vi'">
            {{DetailData.TimeDischarge | viDisplayformatDateTimeWithMomentForDischarge}}
          </div>
          <div style="padding-left: 0px" v-else>
            {{DetailData.TimeDischarge | enDisplayformatDateTimeWithMomentForDischarge}}
          </div>
        </div>
        <p style="padding-top: 10px">
          <b>{{__t("Bác sĩ điều trị/Bác sĩ được ủy quyền")}}</b>
        </p>
        <div>
          <p>
            1. {{__t( "Tôi xác nhận đã giải thích cho người bệnh/người giám hộ về tình trạng bệnh hiện tại, mục đích điều trị, phương pháp điều trị và các rủi ro/hậu quả có thể xảy ra của việc tự ý xin ra viện.")}}
            2. {{__t("Tôi xác nhận rằng người bệnh/người giám hộ đang trong tình trạng tỉnh táo và bình tĩnh cũng như có đủ năng lực hành vi trong khi ra quyết định xin cho người bệnh ra viện không theo chỉ định của bác sĩ.")}}
            3. {{__t("Tôi xác nhận về việc người bệnh/người giám hộ của người bệnh từ chối ký cam kết công nhận sự việc và chịu mọi trách nhiệm và hậu quả do việc tự ý ra viện gây ra.")}}
          </p>
          <div>
            4. {{ __t("Lý do ra viện không theo chỉ định của Bác sĩ:") }}
            <textarea-autosize
              class="form-control"
              rows="1"
              v-model="DetailData.DischargeType"
              :disabled="IsLocked"
            ></textarea-autosize>
          </div>
        </div>
        <div>
          <div  style="margin-top: 15px; display: flex;">
            <span style="width: 17%; margin: auto"
              >{{ __t("Họ và tên bác sĩ") }}: </span>
              <div style="width: 83%">{{DetailData.DoctorFullName}}</div>
          </div>
          <div class="flex-box" style="margin-top: 10px">
            <span style="width: 17%; margin: auto">{{ __t("Họ tên người làm chứng") }}:</span>
            <div style="width: 83%">
              <textarea-autosize
                class="form-control"
                rows="1"
                :placeholder="this.$t('Nhập')"
                v-model="DetailData.FormData.Witness"
                :disabled="IsLocked"
              ></textarea-autosize>
            </div>
          </div>
        </div>
      </div>
      <!-- v-if="!IsLocked && (DetailData.FormData.IsSignToConfirm === true || DetailData.FormData.IsSignToConfirm === false || WithSign === true || WithSign === false)" -->
      <div class="pomc-upload-area" style="margin-top: 10px" >
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <drop-files id="mini-upload" :readonly="true" v-model="ListImages" />
          </div>
        </div>
      </div>
    </template>
    <div style="margin-top: 15px">A01_149_050919_VE</div>
  </div>
  </template>
  <div v-else class="text-center"><v-loading /></div>
</Vcollapse>
</template>
<script>
import ConfirmDischargeWithoutDirect from '@/services/IPD/ConfirmDischargeWithoutDirect'
import DropFiles from '@/components/DropFiles.vue'
export default {
  name: 'IPDDischargeAgaintsMedicalAdvice',
  props: ['Form', 'VisitId', 'FormV2'],
  data () {
    return {
      DetailData: null,
      IsLocked: true,
      ListImages: [],
      dataDropfile: {},
      WithSign: null
    }
  },
  mounted () {
    // this.getData()
  },
  components: {
    DropFiles
  },
  methods: {
    getData () {
      new ConfirmDischargeWithoutDirect()
        .find(this._VisitId)
        .then((response) => {
          if (!response.FormData) {
            response.FormData = {}
          }
          this.DetailData = response
          if (this.DetailData.FormData.ImageUrl != null) {
            this.ListImages = this.DetailData.FormData.ImageUrl.split(',')
          }
          this.$refs.Vcollapse.setHasData()
        })
    }
  }
}
</script>
<style scoped>
  i.open-indicator {
    pointer-events: none !important;
  }
</style>
