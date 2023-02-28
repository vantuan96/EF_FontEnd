<template>
  <div class="main-content" id="InitialAssessment-page">
    <div id="MedicalRecordPrinter" v-if="DataSubmit">
      <br/>
      <div class="content" style="border: 2px solid black; width: 95%; padding: 3px; text-align:center">
        <div style="border: 1px solid black;">
          <p class="text-right" style="margin-right: 10px">
            <a>MS: 28/BV-01</a>
          </p>
          <p class="fw600 fs18" style="text-align: center;">SỞ Y TẾ </p>
          <p class="" style="text-align: center;">{{ DataSubmit.Site.Province || ''}}</p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <p class="fw600 fs50" style="text-align: center;">SỔ BIÊN BẢN</p>
          <p class="fw600 fs50" style="text-align: center;">KIỂM THẢO TỬ VONG</p>
          <br/>
          <br/>
          <br/>
          <div >
            <p class="fw600 fs16" style="text-align: center;">Bệnh viện Vinmec {{DataSubmit.Site.Name}}</p>
            <p style="text-align: center;" class="fs16"><span class="fw600">KHOA</span>: {{DataSubmit.Specialty.ViName}}</p>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <div style="margin-left: 10px;text-align: left;">
            <p class="fw600">Hướng dẫn:</p>
            <p style="font-style: italic">- In khổ A3 gấp đôi, trang đầu in như trang bìa</p>
            <p style="font-style: italic">- Bên trong, từ trang 2 và 3, cứ 2 trang một, in nội dung kiểm điểm ở trang sau</p>
            <br/>
            <p>- Bắt đầu từ ngày ...../...../.......</p>
            <p>- Bắt đầu từ ngày ...../...../.......</p>
          </div>
          <br/>
          <br/>
        </div>
      </div>
      <div class="BreakPage"></div>
      <div>
        <div class="form-print">
          <table class="table" style="width: 100%;margin-bottom: 0px!important;">
            <tr>
              <td width="30%"  style="vertical-align: top;" align="top">
                <p><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></p>
              </td>
            </tr>
          </table>
          <p class="fw600 fs20" style="text-align: center;">KIỂM THẢO TỬ VONG</p>
          <br/>
          <br/>
          <p class="fw600 fs16">A. PHẦN HÀNH CHÍNH</p>
          <p>1. Hôm nay ngày: {{DataSubmit.Time}} </p>
          <p>2. Chúng tôi gồm: (ghi rõ họ tên, chức danh, chức vụ từng người):</p>
          <template v-for="(items, index) in Members">
            <p class="mrl10" :key="index">- {{ items.Fullname || ''}} {{ items.Title ? `(${items.Title})` : ''}}</p>
          </template>
          <p>3. Họp tại {{DataSubmit.Specialty.ViName}}</p>
          <p>4. Chủ tọa: {{ DataSubmit.Chairman.Fullname || '' }} {{ DataSubmit.Chairman.Title ? `(${DataSubmit.Chairman.Title})` : ''}}</p>
          <p>5. Thư ký: {{ DataSubmit.Secretary.Fullname || '' }} {{ DataSubmit.Secretary.Title ? `(${DataSubmit.Secretary.Title})` : ''}}</p>
          <p class="fw600 fs16">B. NỘI DUNG KIỂM ĐIỂM</p>
          <div class="box form-content mt-10">
            <p class="fw600 fs16">I. Phần hành chính người bệnh</p>
            <p>- Họ tên người bệnh:<span class="tab404">{{DataSubmit.Customer.Fullname || '&emsp;&emsp;&emsp;&emsp;'}}</span> Tuổi: <span class="tab404">{{$options.filters.formatAge(DataSubmit.Customer.AgeFormated) || '&emsp;&emsp;'}}</span> Giới tính: <span class="tab404">{{DataSubmit.Customer.Gender}}</span></p>
            <p>- Dân tộc:<span class="tab404">{{DataSubmit.Customer.MOHEthnic && DataSubmit.Customer.MOHEthnic !== 'Unknown' ? DataSubmit.Customer.MOHEthnic : '&emsp;&emsp;&emsp;&emsp;'}}</span>Ngoại kiều:<span class="tab404">{{DataSubmit.Customer.MOHNationality || ''}}</span></p>
            <p>- Nghề nghiệp:<span class="tab404">{{DataSubmit.Customer.MOHJob !== 'Unknown' ? DataSubmit.Customer.MOHJob : '&emsp;&emsp;&emsp;&emsp;'}}</span>Nơi làm việc:<span class="tab404">{{DataSubmit.Customer.WorkPlace || ''}}</span></p>
            <p>- Địa chỉ:<span class="tab404">{{DataSubmit.Customer.Address || ''}}</span></p>
            <p>- Số vào viện:<span class="tab404">{{DataSubmit.Customer.PID || ''}}</span></p>
            <p>- Số CMND/ Hộ chiếu:<span class="tab404">{{DataSubmit.Customer.IdentificationCard || ''}}</span></p>
            <p>- Ngày và nơi cấp:<span class="tab404">{{DataSubmit.Customer.IssueDate || ''}},  {{DataSubmit.Customer.IssuePlace || ''}}</span></p>
            <p>- Vào viện lúc:<span class="tab404">{{ DataSubmit.AdmittedDate }}</span></p>
            <p>- Tử vong lúc:<span class="tab404">{{DataSubmit.DeathAt}}</span></p>
            <p>- Tại khoa:<span class="tab404">{{DataSubmit.Specialty.ViName}}</span></p>
            <p> - Nguyên nhân tử vong: {{DataSubmit.Reason}}</p>
            <p class="fw600 fs16">II. Diễn biến bệnh:</p>
            <p>1. Tóm tắt tiền sử bệnh:</p>
            <p class="mrl10">{{ DataSubmit.PastMedicalHistory || ''}}</p>
            <p>2. Tình trạng lúc vào viện: toàn thân, các bộ phận, các xét nghiệm ...</p>
            <p class="mrl10">{{ DataSubmit.Status || '' }}</p>
            <p>3. Chẩn đoán: (của cơ sở, khoa khám bệnh, khoa điều trị, khi tử vong, giải phẫu bệnh nếu có...)</p>
            <p class="mrl10">{{DataSubmit.Diagnosis}}</p>
            <p>Mã ICD10:  {{ getICD(DataSubmit.ICD10) }}</p>
            <p>4. Tóm tắt diễn biến bệnh, quá trình điều trị, quá trình chăm sóc .... từng giai đoạn của bệnh:</p>
            <p class="mrl10">{{ DataSubmit.Progress || '' }}</p>
            <p class="fw600 fs16">III. Kiểm điểm quá trình điều trị và chăm sóc <span class="fw400">(nêu rõ ưu điểm và thiếu sót)</span></p>
            <p>1. Tiếp đón người bệnh:</p>
            <p class="mrl10">{{ DataSubmit.Welcome || '' }}</p>
            <p>2. Thăm khám và chẩn đoán bệnh, nguyên nhân, triệu chứng, tiên lượng:</p>
            <p class="mrl10">{{ DataSubmit.Assessment }}</p>
            <p>3. Điều trị:</p>
            <p class="mrl10">{{ DataSubmit.TreatmentAndProcedures }}</p>
            <p>4. Chăm sóc:</p>
            <p class="mrl10">{{ DataSubmit.Care }}</p>
            <p>5. Mối quan hệ với gia đình người bệnh (tình trạng bệnh, tài sản tư trang...):</p>
            <p class="mrl10">{{ DataSubmit.RelationShip }}</p>
            <p><b class="fs16">IV. Ý kiến bổ sung của từng người</b> (Bám sát trọng tâm):</p>
            <p class="mrl10">{{ DataSubmit.Extra }}</p>
            <p><b class="fs16">V. Kết luận</b> (chủ toạ kết luận: nêu bật diễn biến bệnh, ưu điểm và thiếu sót nếu có trong quá trình chẩn đoán, điều trị, chăm sóc và rút kinh nghiệm nếu có...)</p>
            <p class="mrl10">{{ DataSubmit.Conclusion }}</p>
            <br/>
            <p>Biên bản này đã được thư ký đọc cho mọi người nghe và nhất trí cùng ký tên, từng người dưới đây:</p>
            <br/>
            <br/>
            <div class="row" style="display: flex;">
              <div style="width:33%;">
                <p style="text-align: center;" class="fw600 fs18">CÁC THÀNH VIÊN</p>
                <div class="box-doc">
                  <div>
                    <p v-for="(items, index) in DataSubmit.Members" :key="index"> {{ getName(items) }} </p>
                  </div>
                </div>
              </div>
              <div style="width:33%;">
                <p style="text-align: center;" class="fw600 fs18">THƯ KÝ</p>
                <br/>
                <br/>
                <br/>
                <p style="text-align: center;">{{ DataSubmit.Secretary.Fullname || ''}}</p>
              </div>
              <div style="width:33%;">
                <p style="text-align: center;" class="fw600 fs18">CHỦ TỌA</p>
                <br/>
                <br/>
                <br/>
                <p style="text-align: center;">{{ DataSubmit.Chairman.Fullname || ''}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import constants from '@/constants'
import CustomersIPD from '@/services/IPD/Customer'
import DropFiles from '@/components/DropFiles.vue'
export default {
  props: ['MASTERDATA', 'DataSubmit', 'Members'],
  data () {
    return {
      LDBV: '',
      TKTKT: '',
      BSTC1: '',
      DateTime: {},
      checkBoxTrue: true,
      checkBoxFalse: false,
      responseList: [],
      checkboxValue: false,
      Customer: null,
      GENDER: constants.GENDER,
      userData: {},
      customer: this.$store.state.account.CurrentPatientObj,
      itemDate: {},
      AdmittedDate: {},
      DeathAt: {}
    }
  },
  components: {
    DropFiles
  },
  mounted () {
    if (this.DataSubmit.Time) {
      const date = this.DataSubmit.Time.toString()
      this.itemDate = {
        hour: date.split(' ')[0].split(':')[0],
        minutes: date.split(' ')[0].split(':')[1],
        day: date.split(' ')[1].split('/')[0],
        month: date.split(' ')[1].split('/')[1],
        years: date.split(' ')[1].split('/')[2],
        fullDate: date.split(' ')[1]
      }
    }
    if (this.DataSubmit.AdmittedDate) {
      const date = this.DataSubmit.AdmittedDate.toString()
      this.AdmittedDate = {
        hour: date.split(' ')[0].split(':')[0],
        minutes: date.split(' ')[0].split(':')[1],
        day: date.split(' ')[1].split('/')[0],
        month: date.split(' ')[1].split('/')[1],
        years: date.split(' ')[1].split('/')[2],
        fullDate: date.split(' ')[1]
      }
    }
    if (this.DataSubmit.DeathAt) {
      const date = this.DataSubmit.DeathAt.toString()
      this.DeathAt = {
        hour: date.split(' ')[0].split(':')[0],
        minutes: date.split(' ')[0].split(':')[1],
        day: date.split(' ')[1].split('/')[0],
        month: date.split(' ')[1].split('/')[1],
        years: date.split(' ')[1].split('/')[2],
        fullDate: date.split(' ')[1]
      }
    }
  },
  created () {
    new CustomersIPD().find(this.$route.params.Id).then(response => {
      this.Customer = response
    }).then(er => {
    })
  },
  methods: {
    getName (item) {
      let name = ''
      if (item.ConfirmTime) {
        name = '- ' + item.Fullname
      }
      return name
    },
    getICD (ICD) {
      console.log('ICD', ICD)
      let icd = ''
      if (ICD && ICD.length) {
        icd = ICD[0].label
      }
      return icd
    }
  }
}
</script>
<style lang="stylus" scoped>
.margin-top {
 margin-top: -15px;
}
.flex {
  display: flex;
}
</style>
