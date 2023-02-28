<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" :id="printId || 'printTranslate'">
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
            <p><b>Họ tên bệnh nhân:</b> <span  class="textUppercase">{{data.Fullname}}</span></p>
          </td>
        </tr>
        <tr>
          <td width="20%" class="text-left" style="text-align: left" align="top">
            <p v-if="dataParent"><b>Tuổi:</b> {{dataParent.AgeFormated | formatAge}}</p>
            <p v-else><b>Tuổi:</b></p>
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
            <p><b>Hiện đang được cấp cứu và điều trị tại :</b> {{(dataParent && dataParent.Specialty) ? dataParent.Specialty : ''}}</p>
          </td>
        </tr>
        <tr>
          <td class="text-left" style="text-align: left" align="top" colspan="3">
            <p style="line-height: 1.6;"><b>Triệu chứng cấp cứu điển hình:</b></p>
            <div style="padding-left: 5px;">
              <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.ClinicalExaminationAndFindings">+ {{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</p>
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
      <table class="table" style="width: 100%" v-if="dataParent && dataParent.Confirm">
        <tr v-if="dataParent.Confirm">
          <th class="text-center" style="width: 50%">
            <span class="font25">{{dataParent.Confirm.Yes === 'True' ? '&#9745;' : '&#9744;'}}</span> CẤP CỨU
          </th>
          <th class="text-center">
            <span class="font25">{{dataParent.Confirm.No === 'True' ? '&#9745;' : '&#9744;'}}</span> KHÔNG CẤP CỨU
          </th>
        </tr>
      </table>
      <p><br /></p>
      <table class="table" style="width: 100%">
        <tr>
          <td width="50%" class="text-center" style="text-align: center"></td>
          <td v-if="EMERGENCYCONFIRMATION_PHY_TIME" class="text-center" style="text-align: center"><i>Ngày {{EMERGENCYCONFIRMATION_PHY_TIME | viDisplayformatDateTime}}</i></td>
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
    </div>
    <div v-if="dataParent.Version" class="no-style">
      <Confirm
        class="mt-10"
        style="display: none;"
        :MasterDataCode="'EMERGENCYCONFIRMATION'"
        :FormCode="`A01_155_050919_V`"
        :VisitId="_VisitId"
        :FormId="dataParent.Id"
        :ReadOnly="viewOnly"
        @ResponseData="getListConfirm"
      />
    </div>
    <div v-if="isTranView" class="print-area">
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
    </div>
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
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'NPQ-View',
  mixins: [],
  props: ['data', 'isTranView', 'printId', 'dataParent', 'viewOnly'],
  data () {
    return {
      EMERGENCYCONFIRMATION_PHY: '',
      EMERGENCYCONFIRMATION_PHY_TIME: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    Confirm
  },
  mounted () {
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
    print () {
      this.$htmlToPaper(this.printId || 'printTranslate', false, 'A01_155_050919_V')
    }
  }
}
</script>
