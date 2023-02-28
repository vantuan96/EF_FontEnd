<template>
  <div class="main-content" id="di0-page" v-if="!nullContent">
    <div class="a4-page box has-translation" id="printMe">
      <table class="table" style="width: 100%">
        <tr>
          <td width="30%"  style="vertical-align: top;" align="top">
            <p>
              <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
            </p>
            <p class="textUppercase">Sở y tế: {{data.LocationUnit}} {{data.Province}}</p>
            <p class="textUppercase">BỆNH VIỆN ĐKQT</p>
            <p class="textUppercase">VINMEC {{data.Site}}</p>
          </td>
          <th class="text-center" style="text-align: center;vertical-align: top;" align="top">
            <p class="text-center textUppercase">Cộng hòa xã hội chủ nghĩa Việt Nam</p>
            <p class="text-center"><span class="textUnderLine">Độc lập - Tự do - Hạnh phúc</span></p>
            <h3 class="text-center mg-bt-0" style="text-align: center">GIẤY XÁC NHẬN BỆNH NHÂN CẤP CỨU</h3>
            <p class="text-center font-normal"><i>(Dùng cho bệnh nhân có thẻ BHYT)</i></p>
          </th>
        </tr>
      </table>
      <p><br /></p>
      <table class="table" style="width: 100%">
        <tr>
          <td style="text-align: left" align="top" colspan="3">
            <p><b>Họ tên bệnh nhân:</b> <span  class="textUppercase">{{data.Name}}</span></p>
          </td>
        </tr>
        <tr>
          <td width="20%" class="text-left" style="text-align: left" align="top">
            <p><b>Tuổi:</b> {{data.AgeFormated | formatAge}}</p>
          </td>
          <td class="text-left" style="text-align: left" align="top">
            <p><b>Giới:</b> {{data.Gender}}</p>
          </td>
        </tr>
        <tr>
          <td class="text-left" style="text-align: left" align="top" colspan="3">
            <p><b>Địa chỉ:</b> {{data.Address}}</p>
          </td>
        </tr>
        <tr>
          <td class="text-left" style="text-align: left" align="top" colspan="3">
            <p><b>Vào cấp cứu lúc:</b> {{data.AdmittedDate | viDisplayformatDateTime}}</p>
          </td>
        </tr>
        <tr>
          <td class="text-left" style="text-align: left" align="top" colspan="3">
            <p><b>Hiện đang được cấp cứu và điều trị tại :</b> {{(data && data.Specialty) ? data.Specialty : ''}}</p>
          </td>
        </tr>
        <tr>
          <td class="text-left" style="text-align: left" align="top" colspan="3">
            <p style="line-height: 1.6;"><b>Triệu chứng cấp cứu điển hình:</b></p>
            <div style="padding-left: 5px;">
              <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.Assessment">+ {{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-left" style="text-align: left" align="top" colspan="3">
            <p style="line-height: 1.6;"><b>Chẩn đoán lúc vào cấp cứu:</b> {{data.Diagnosis}}</p>
          </td>
        </tr>
        <tr>
          <td class="text-left" style="text-align: left" align="top" colspan="3">
            <p><b>Tôi xác nhận Bệnh nhân:</b></p>
          </td>
        </tr>
      </table>
      <table class="table" style="width: 100%" v-if="data.Confirm">
        <tr v-if="data.Confirm">
          <th class="text-center" style="width: 50%">
            <span class="font25">{{data.Confirm.Yes === 'True' ? '&#9745;' : '&#9744;'}}</span> CẤP CỨU
          </th>
          <th class="text-center">
            <span class="font25">{{data.Confirm.No === 'True' ? '&#9745;' : '&#9744;'}}</span> KHÔNG CẤP CỨU
          </th>
        </tr>
      </table>
      <p><br /></p>
      <table class="table only-print-page" style="width: 100%">
        <tr>
          <td width="50%" class="text-center" style="text-align: center"></td>
          <td v-if="EMERGENCYCONFIRMATION_PHY_TIME" class="text-center" style="text-align: center">Ngày <i>{{EMERGENCYCONFIRMATION_PHY_TIME | viDisplayformatDateTime}}</i></td>
          <td v-else class="text-center" style="text-align: center"><i>Ngày {{data.Date | viDisplayformatDate('DD/MM/YYYY')}}</i></td>
        </tr>
        <tr>
          <th class="text-center" style="text-align: center;vertical-align: top;" align="top"></th>
          <td width="50%" class="text-center" style="text-align: center"><b>BÁC SỸ ĐIỀU TRỊ/ BÁC SỸ TRỰC</b><div style="text-align: center"><i>(Ký ghi rõ họ, tên)</i></div></td>
        </tr>
        <tr>
          <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
          <th class="text-center" style="text-align: center"><p><br /></p></th>
        </tr>
        <tr>
          <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
          <th class="text-center" style="text-align: center"><p><br /></p></th>
        </tr>
        <tr>
          <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
          <th class="text-center" style="text-align: center"><p><br /></p></th>
        </tr>
        <tr>
          <th width="50%" class="text-center" style="text-align: center"></th>
          <th v-if="EMERGENCYCONFIRMATION_PHY" width="50%" class="text-center" style="text-align: center">Họ tên: {{EMERGENCYCONFIRMATION_PHY}}</th>
          <th v-else width="50%" class="text-center" style="text-align: center">Họ tên:.............................</th>
        </tr>
      </table>
      <div v-if="data.Version" class="no-style">
        <Confirm
          class="mt-10 only-web-page"
          :MasterDataCode="'EMERGENCYCONFIRMATION'"
          :FormCode="`A01_155_050919_V`"
          :VisitId="_VisitId"
          :FormId="data.Id"
          :ReadOnly="viewOnly"
          @ResponseData="getListConfirm"
        />
      </div>
    </div>
    <div class="a4-page no-style" v-if="data.Translations && data.Translations.length && !viewOnly">
      {{__t('Xem các bản dịch tiếng')}} :
      <button @click="view(item)" class="btn v-white-btn btn-round" :data="item" :key="index" v-for="(item ,index) in data.Translations">
        <i class="fa fa-share-square-o" aria-hidden="true" v-if="item.Status === 0"></i>
        <i class="fa fa-commenting" aria-hidden="true" v-if="item.Status === 1"></i>
        <i class="fa fa-clock-o" aria-hidden="true" v-if="item.Status === 2"></i>
        <i class="fa fa-check green-color" aria-hidden="true" v-if="item.Status === 3"></i>
        {{__t(item.ToLanguage)}}
      </button>
    </div>
    <div class="a4-page translation-area" v-if="!viewOnly">
      <translation-request :name="'giấy xác nhận bệnh nhân cấp cứu'" :VisitId="VisitId" :ViName="'GIẤY XÁC NHẬN BN CẤP CỨU'" :EnName="'EMERGENCY CONFIRMATION'" />
    </div>
    <div class="container" style="width: 870px !important; padding: 0">
      <p class="mt-10">A01_155_050919_V</p>
    </div>
    <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
      <div v-if="TranItem && TranItem.Status !== 3">
        <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :ForDoctor="true" />
      </div>
      <div v-else>
        <EmergencyConfirmationView v-if="dataTranslated" :dataParent="data" :isTranView="true" :data="dataTranslated" :printId="'printview'"/>
        <div v-else class="loading-text"><v-loading/></div>
      </div>
    </modal>
    <div class="a4-page no-style" v-if="!viewOnly">
      <div class="">
        <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('Quay lại')}}</button>
        <button class="btn v-yellow-btn pull-right"  v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</button>
      </div>
    </div>
  </div>
  <div v-else class="text-center">
    <h1 class="title-page mrt30 mrb30" style="text-align: center">GIẤY XÁC NHẬN BỆNH NHÂN CẤP CỨU</h1>
    <h4>Bệnh nhân không có giấy xác nhận bệnh nhân cấp cứu</h4>
    <p><button class="btn btn-back v-white-btn" type="button" @click="back()">{{__t('btn.back')}}</button></p>
  </div>
</template>
<script>
/* ============
 * KLM Page vi sao đặt tên là KLM hỏi dungnv53
 * ============
 *
 * The home index page.
 */
import Confirm from '@/components/Form/Confirm3'
import MixinMasterData from '@/mixins/masterdata.js'
import Document from '@/services/ED/Document'
import MixinView from '@/mixins/view.js'
import MixinForm from '@/mixins/form.js'
import TranslationRequest from '@/components/Translation/Request.vue'
import ViewItem from '@/components/Translation/View.vue'
import Translation from '@/services/Translation'
import EmergencyConfirmationView from './View/Index.vue'
import moment from 'moment'

const MODAL_WIDTH = 870

export default {
  /**
   * The name of the page.
   */
  name: 'NPQ',
  mixins: [MixinMasterData, MixinView, MixinForm],
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
      data: {},
      nullContent: true,
      modalWidth: MODAL_WIDTH,
      TranItem: null,
      dataTranslated: null,
      EMERGENCYCONFIRMATION_PHY: '',
      EMERGENCYCONFIRMATION_PHY_TIME: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    TranslationRequest,
    ViewItem,
    EmergencyConfirmationView,
    Confirm
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.getData()
  },
  computed: {
  },
  methods: {
    getListConfirm (val) {
      val.map(item => {
        if (item.ConfirmType === 'EMERGENCYCONFIRMATION_PHY') {
          this.EMERGENCYCONFIRMATION_PHY = item.Fullname
          this.EMERGENCYCONFIRMATION_PHY_TIME = moment(item.ConfirmAt).format('DD/MM/YYYY')
        }
      })
    },
    confirmed () {
      var id = this.TranItem.Id
      this.TranItem = null
      this.view({
        Status: 3,
        Id: id
      })
      this.getData()
    },
    view (item) {
      if (item.Status === 3) {
        new Translation().find('MedicalReport/Document/' + (item.Id)).then(response => {
          this.dataTranslated = this.mappingTranslation(response)
        })
      } else {
        this.TranItem = item
      }
      this.$modal.show('view-modal')
    },
    mappingTranslation (res) {
      var translation = res.Translation
      var objNotTran = [
        'Fullname',
        'DateOfBirth',
        'Date',
        'ICD',
        'Location',
        'AdmittedDate',
        'DischargeDate',
        'PID',
        'ICDOption',
        'Site',
        'Province'
      ]
      for (var key of Object.keys(res)) {
        if (!objNotTran.includes(key)) {
          if (key === 'ClinicalExaminationAndFindings') {
            if (typeof translation[key] === 'string') {
              translation[key] = this.JSONParse(translation[key]) || []
            }
            if (key === 'ClinicalExaminationAndFindings' && !!translation[key]) {
              res[key].forEach(item => {
                var tranEd = (translation[key].find(e => e.ViName === item.ViName) || {Value: ''}).Value
                item.Value = this.trim_(item.Value + (tranEd ? ('/ ' + tranEd) : ''), '/ ')
              })
            }
          } else {
            res[key] = this.trim_([res[key], '/ ', translation[key]].map(e => e).join(''), '/ ')
          }
        }
      }
      return res
    },
    print () {
      this.$htmlToPaper('printMe', false, 'A01_155_050919_V')
    },
    getData () {
      new Document().find('EmergencyConfirmation/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.nullContent = false
        this.data = response
        this.$store.dispatch('setCurrentFormId', response.Id)
      }).catch(e => {
        this.nullContent = true
      })
    }
  }
}
</script>
