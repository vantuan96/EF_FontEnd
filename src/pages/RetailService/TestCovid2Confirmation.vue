<template>
  <div class="main-content" id="di0-page">
    <template v-if="data">
      <div class="a4-page box" id="printMe">
        <table class="table" style="width: 100%">
          <tr>
            <td  class="text-center" width="50%"  style="vertical-align: top;" align="top">
              <div class="text-center textUppercase font12pt">CN.CTY CP BỆNH VIỆN ĐKQT VINMEC</div>
              <div class="text-center textUppercase font11pt font-italic">BRANCH OF VINMEC INTERNATIONAL GENERAL HOSPITAL JOINT STOCK COMPANY </div>
              <div class="text-center font12pt font-bold textUppercase">BỆNH VIỆN ĐKQT VINMEC {{SiteName}}</div>
              <div class="text-center font11pt font-bold font-italic textUppercase">VINMEC {{SiteNameEn}} INTERNATIONAL HOSPITAL</div>
              <div  class="text-center" style="line-height: 0;">____________</div>
            </td>
            <td>
              <div class="text-center textUppercase font12pt font-bold no-wrap">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
              <div style="margin-bottom: 5px" class="text-center textUppercase font12pt font-bold">SOCIALIST REPUBLIC OF VIET NAM</div>
              <div class="text-center textUppercase font13pt font-bold">Độc lập – Tự do – Hạnh phúc </div>
              <div class="text-center font12pt font-italic">Independence - Freedom - Happiness</div>
              <div class="text-center" style="line-height: 0;">____________</div>
            </td>
          </tr>
        </table>
        <br/>
        <br/>
        <div class="text-center font14pt font-bold font16px">XÁC NHẬN XÉT NGHIỆM SARS-CoV-2 </div>
        <div class="text-center font14pt font-bold font-italic font16px">SARS - CoV-2 TEST RESULT</div>
        <br/>
        <br/>
        <table class="table" style="width: 100%">
          <tr>
            <td width="40%" class="font135pt"><p><b>Họ và tên</b>/ <i>Full name</i>:</p></td>
            <td width="60%" class="font14pt"><p class="font-bold textUppercase">{{data.Fullname}}</p></td>
          </tr>
          <tr>
            <td width="40%" class="font135pt"><p><b>Giới tính</b>/ <i>Gender</i>:</p></td>
            <td width="60%" class="font135pt"><p>{{GENDER[data.Gender]}}/ {{GENDEREN[data.Gender]}}</p></td>
          </tr>
          <tr>
            <td width="40%" class="font135pt"><p><b>Ngày sinh</b>/ <i>DOB</i>:</p></td>
            <td width="60%" class="font135pt"><p>{{data.DateOfBirth}}</p></td>
          </tr>
          <tr>
            <td width="40%" class="font135pt"><p><b>Quốc tịch</b>/ <i>Nationality</i>:</p></td>
            <td width="60%" class="font135pt"><p>{{data.Nationality}}/ {{data.NationalityEn}}</p></td>
          </tr>
          <tr>
            <td width="40%" class="font135pt"><p><b>Hộ chiếu/CMND</b>/ <br/><i>Passport/Identify card</i>:</p></td>
            <td width="60%" class="font135pt" style="vertical-align: top;" align="top"><p>{{data.IdentificationCard}}</p></td>
          </tr>
          <tr>
            <td width="40%" class="font135pt" style="vertical-align: top;" align="top"><p><b>Địa chỉ</b>:</p></td>
            <td width="60%" class="font135pt" style="vertical-align: top;" align="top"><p>{{data.Address}}</p></td>
          </tr>
          <tr>
            <td width="40%" class="font135pt" style="vertical-align: top;" align="top"><p><i>Address</i>:</p></td>
            <td width="60%" class="font135pt" style="vertical-align: top;" align="top"><p><i>{{data.AddressEn}}</i></p></td>
          </tr>
        </table>
        <!-- <p class="text-right"><i>Chỉnh sửa thông tin khách hàng</i></p> -->
        <p>Đã được xét nghiệm sàng lọc SARS-CoV-2 bằng phương pháp Real-time PCR tại bệnh viện đa khoa quốc tế Vinmec {{SiteName}}.</p>
        <p class="font-italic">This is to certify that the aforementioned patient underwent RT-PCR test for SARS-CoV-2 at Vinmec {{SiteNameEn}} International Hospital.</p>
        <table class="table" style="width: 100%">
          <tr class="only-web-page">
            <td colspan="2">
              <p class="text-right"><button class="btn btn-sync-data" @click="autoLoadOPDOENPT0(true)">{{__t('Lấy kết quả mới nhất')}}</button></p>
              <diorpt :dataJson="ResultsFromHis" @copy="copyToOPDOENPT0" :onlyXn="true" :copyAllData="true" />
              <p class="note-text text-right"><template v-if="syncOPDOENPT0At"><label class="label label-warning"><i aria-hidden="true" class="fa fa-check v-green"></i> {{__t('Đồng bộ lần cuối lúc')}}: {{syncOPDOENPT0At | formatDateTime('HH:mm:ss DD/MM/YYYY')}}</label></template><template v-else><label class="label label-warning"><i aria-hidden="true" class="fa fa-spin fa-loading v-green"></i>{{__t('Đang tải...')}}</label></template></p>
            </td>
          </tr>
          <tr>
            <td width="40%" class="font135pt"><p><b>Ngày xét nghiệm</b>/ <br/><i>Date of sample collection</i>:</p></td>
            <td width="60%" class="font14pt" style="vertical-align: top;" align="top"><div class="only-web-page"><VDatePicker :hideTooltip="true" v-model="data.Time" :format="vDateFormat"/></div><p class="hidden-only-form">{{data.Time}}</p></td>
          </tr>
          <tr>
            <td width="40%" class="font135pt"><p><b>Số lưu trữ</b>/ <i>PID</i>:</p></td>
            <td width="60%" class="font14pt"><p>{{data.PID}}</p></td>
          </tr>
          <tr>
            <td width="40%" class="font135pt"><p><b>Kết quả</b>/ <i>Result</i>:</p></td>
            <td width="60%" class="font14pt">
              <p class="font-bold textUppercase font135pt hidden-only-form">{{data.Results !== null ? (Results[data.Results] || {}).Label : ''}}</p>
               <div class="group-radio only-web-page" v-if="Results">
                <template  v-for="(result, index) in Results">
                  <input :data="result" :key="index" type="radio" :id="'a' + index" name="Results" :value="result.Value" v-model="data.Result">
                  <label :key="'a' + index" :for="'a' + index">{{result.Label}}</label>
                </template>
              </div>
            </td>
          </tr>
        </table>
        <table class="table hidden-only-form" style="width: 100%">
          <tr>
            <td width="50%" class="font135pt"></td>
            <td width="50%" class="text-center" style="vertical-align: top;" align="top"><p><i>{{now | viDisplayformatDateTimeWithMoment}} </i></p></td>
          </tr>
          <tr>
            <td width="50%" class="text-center font135pt textUppercase font-bold">KHOA XÉT NGHIỆM <br/>LABORATORY DEPARTMENT </td>
            <td width="50%" class="text-center font135pt textUppercase font-bold">GIÁM ĐỐC BỆNH VIỆN <br/>DIRECTOR OF HOSPITAL</td>
          </tr>
        </table>
      </div>
      <div class="status-float-block">
        <div class="action-btn-block">
          <div class="container">
            <div class="content-container">
              <div class="row">
                <div class="col-md-2 col-sm-2">
                  <div class="form-group1">
                    <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                  </div>
                </div>
                <div class="col-md-4 col-sm-4">
                  <div class="form-group1">
                    <button class="btn btn-white pull-right btn-block"  v-shortkey="['ctrl', 'p']" @shortkey="print()" type="button" @click="print()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('In ngay')}}</button>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6">
                  <div class="form-group1">
                    <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"  v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu lại')}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
import constants from '@/constants'
import utils from '@/utils'
import TestCovidConfirmation from '@/services/TestCovidConfirmation'
import Diorpt from '@/components/OPD/DI0RPT.vue'
export default {
  name: 'TestCovid2Confirmation',
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      data: null,
      loaded: false,
      GENDER: constants.GENDER,
      GENDEREN: constants.GENDEREN,
      SiteName: constants.SITENAME[this.getSiteCode()],
      SiteNameEn: constants.SITENAMEEN[this.getSiteCode()],
      now: new Date(),
      ResultsFromHis: null,
      syncOPDOENPT0At: null,
      Results: [
        {
          Label: 'ÂM TÍNH/ NEGATIVE',
          Value: 0
        },
        {
          Label: 'DƯƠNG TÍNH/ POSITIVE',
          Value: 1
        }
      ]
    }
  },
  components: {
    Diorpt
  },
  mounted () {
    this.getData()
  },
  methods: {
    print () {
      this.$htmlToPaper('printMe', false)
    },
    autoLoadOPDOENPT0 (loading) {
      new OutpatientExaminationNote({hidemsg: true, onlyCovidTest: true}).create({Id: this.$route.params.Id}, 'SyncPrincipalTest').then(response => {
        this.syncOPDOENPT0At = new Date()
        var val = response
        if (val) {
          this.ResultsFromHis = JSON.stringify(response)
        }
      })
    },
    copyToOPDOENPT0 (data) {
      var result = data.Result
      if (result) {
        let cleanedSearchKey = utils.removeAccentsSimple(result)
        if (cleanedSearchKey === 'am tinh') {
          this.data.Result = 0
        }
        if (cleanedSearchKey === 'duong tinh') {
          this.data.Result = 1
        }
        if (data.UpdateTime) {
          this.data.Time = data.UpdateTime.split(' ')[1]
        }
        this.toastedInfo('Đã copy')
      }
    },
    save () {
      new TestCovidConfirmation(this.getVisitTypeGroupCode()).update(this.$route.params.Id, this.data).then(e => {
        this.toastedSuccess()
      })
    },
    getData () {
      new TestCovidConfirmation(this.getVisitTypeGroupCode()).find(this.$route.params.Id).then(e => {
        this.data = e
        this.loaded = true
        this.autoLoadOPDOENPT0()
      })
    }
  }
}
</script>
