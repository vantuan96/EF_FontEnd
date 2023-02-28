<template>
  <div class="a4-page box" id="printMe" v-if="DataSubmit">
     <br/>
     <div class="content" style="border: 2px solid black; width: 95%; padding: 3px; text-align:center; margin-top: 10px;">
       <div style="border: 1px solid black;">
         <br/>
         <p class="text-right font16" style="margin-right: 10px">
           <a>MS: 28/BV-01</a>
         </p>
         <br/>
         <br/>
         <h1 class="title-page" style="text-align: center; font-size: 20px;">SỞ Y TẾ </h1>
         <h1 class="title-page" style="text-align: center;font-size: 20px;">{{ DataSubmit.Site.LocationUnit || ''}} {{ DataSubmit.Site.Location || ''}}</h1>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <h1 class="title-page" style="text-align: center; font-size: 50px;">SỔ BIÊN BẢN</h1>
         <h1 class="title-page" style="text-align: center; font-size: 50px;">KIỂM THẢO TỬ VONG</h1>
         <br/>
         <br/>
         <br/>
         <div>
           <p style="text-align: center; font-size: 26px;font-weight: bold;">{{DataSubmit.Site.ViName || ''}}</p>
           <p style="text-align: center; font-size: 26px;font-weight: bold;">KHOA: {{DataSubmit.Specialty.ViName || ''}}</p>
         </div>
         <!-- <div>
           <p class="text-bold font20pt" style="font-weight:bold;margin-left: 45%;">
           <a>{{ $store.state.account.Site.Name  || ''}}</a>
         </p>
           <p class="text-bold font20pt" style="font-weight:bold;margin-left: 40%;">
           <a>KHOA: </a>
         </p>
         <p class="font20pt" style="margin-left: 45%;">
           <a>{{ Customer.Site ? Customer.Site : ''}}</a>
         </p>
         </div> -->
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         <div style="margin-left: 10px">
           <p style="font-weight: bold; font-size: 14px">Hướng dẫn:</p>
           <p style="font-style: italic">- In khổ A3 gấp đôi, trang đầu in như trang bìa</p>
           <p style="font-style: italic">- Bên trong, từ trang 2 và 3, cứ 2 trang một, in nội dung kiểm điểm ở trang sau</p>
           <br/>
           <p style="font-style: italic">- Bắt đầu sử dụng ngày ...../...../.......</p>
           <p style="font-style: italic">- Hết sổ, nộp lưu trữ ngày ...../...../.......</p>
         </div>
         <br/>
         <br/>
         <br/>
       </div>
     </div>
     <div class="tab1">
       <div class="form-print">
         <table class="table" style="width: 100%;margin-bottom: 0px!important;">
         <tr>
           <td width="30%"  style="vertical-align: top;" align="top">
             <p><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></p>
           </td>
         </tr>
       </table>
       <!-- <h1 class="title-page" style="text-align: center; font-size:20px;">KIỂM THẢO TỬ VONG</h1> -->
       <h1 class="title-page" style="text-align: center; font-size:20px;">KIỂM THẢO TỬ VONG</h1>
       <!-- <p class="text-center" style="font-weight: bold">KIỂM THẢO TỬ VONG</p> -->
       <br/>
       <br/>
       <p style="font-weight: bold">A. PHẦN HÀNH CHÍNH</p>
       <p style="font-size:16px">1. Hôm nay ngày: {{DataSubmit.Time}} </p>
       <p style="font-size:16px">2. Chúng tôi gồm: (ghi rõ họ tên, chức danh, chức vụ từng người):</p>
       <p style="font-size:16px" v-for="(items, index) in Members" :key="index">  - {{ items.Fullname || ''}} {{ items.Title ? '(' + items.Title + ')' : '' }}</p>
       <p style="font-size:16px">3. Họp tại {{DataSubmit.Specialty.ViName}}</p>
       <p style="font-size:16px">4. Chủ tọa: {{ DataSubmit.Chairman.Fullname || '' }}  {{ DataSubmit.Chairman.Title ? '(' + DataSubmit.Chairman.Title + ')' : '' }}</p>
       <p style="font-size:16px">5. Thư ký: {{ DataSubmit.Secretary.Fullname || '' }}   {{  DataSubmit.Secretary.Title ? '(' +  DataSubmit.Secretary.Title + ')' : '' }}</p>
       <h4 class="text-bold">B. NỘI DUNG KIỂM ĐIỂM</h4>
         <div class="box form-content mt-10">
           <p class="text-bold font16" style="font-weight: bold;">I. Phần hành chính người bệnh</p>
           <p style="font-size:16px">- Họ tên người bệnh:<span class="tab404">{{DataSubmit.Customer.Fullname}}</span> Tuổi: <span class="tab404">{{DataSubmit.Customer.AgeFormated | formatAge}}</span> Giới tính: <span class="tab404">{{__t(DataSubmit.Customer.Gender)}}</span></p>
           <p style="font-size:16px">- Dân tộc:<span class="tab404">{{DataSubmit.Customer.MOHEthnic && DataSubmit.Customer.MOHEthnic !== 'Unknown' ? DataSubmit.Customer.MOHEthnic : ''}}</span>Ngoại kiều:<span class="tab404">{{DataSubmit.Customer.MOHNationality || ''}}</span></p>
           <p style="font-size:16px">- Nghề nghiệp:<span class="tab404">{{DataSubmit.Customer.MOHJob !== 'Unknown' ? DataSubmit.Customer.MOHJob : ''}}</span>Nơi làm việc:<span class="tab404">{{DataSubmit.Customer.WorkPlace || ''}}</span></p>
           <p style="font-size:16px">- Địa chỉ:<span class="tab404">{{DataSubmit.Customer.Address || ''}}</span></p>
           <p style="font-size:16px">- Số vào viện:<span class="tab404">{{DataSubmit.Customer.PID || ''}}</span></p>
           <p style="font-size:16px">- Số CMND/ Hộ chiếu:<span class="tab404">{{DataSubmit.Customer.IdentificationCard || ''}}</span></p>
           <p style="font-size:16px">- Ngày và nơi cấp:<span class="tab404">{{DataSubmit.Customer.IssueDate || ''}},  {{DataSubmit.Customer.IssuePlace || ''}}</span></p>
           <p style="font-size:16px">- Vào viện lúc:<span class="tab404">{{ DataSubmit.AdmittedDate }}</span></p>
           <p style="font-size:16px">- Tử vong lúc:<span class="tab404">{{DataSubmit.DeathAt}}</span></p>
           <p style="font-size:16px">- Tại khoa:<span class="tab404">{{__label(DataSubmit.Specialty)}}</span></p>
           <p style="font-size:16px"> - Nguyên nhân tử vong: {{DataSubmit.Reason}}</p>
           <p style="font-size:16px; font-weight: bold;" class="text-bold font16">II. Diễn biến bệnh:</p>
           <p style="font-size:16px">1. Tóm tắt tiền sử bệnh:</p>
           <p style="font-size:16px">{{ DataSubmit.PastMedicalHistory || ''}}</p>
           <p style="font-size:16px">2. Tình trạng lúc vào viện: (toàn thân, các bộ phận, các xét nghiệm ...)</p>
           <p style="font-size:16px">{{ DataSubmit.Status || '' }}</p>
           <p style="font-size:16px">3. Chẩn đoán: (của cơ sở, khoa khám bệnh, khoa điều trị, khi tử vong, giải phẫu bệnh nếu có...)</p>
           <p style="font-size:16px">{{DataSubmit.Diagnosis}}</p>
           <p style="font-size:16px">Mã ICD10:  {{DataSubmit.ICD10 && DataSubmit.ICD10.length > 0 ? DataSubmit.ICD10[0].label : '' }}</p>
           <p style="font-size:16px">4. Tóm tắt diễn biến bệnh, quá trình điều trị, quá trình chăm sóc .... từng giai đoạn của bệnh:</p>
           <p style="font-size:16px">{{ DataSubmit.Progress || '' }}</p>
           <p style="font-size:16px; font-weight: bold;">III. Kiểm điểm quá trình điều trị và chăm sóc (nêu rõ ưu điểm và thiếu sót)</p>
           <p style="font-size:16px">1. Tiếp đón người bệnh:</p>
           <p style="font-size:16px">{{ DataSubmit.Welcome || '' }}</p>
           <p style="font-size:16px">2. Thăm khám và chẩn đoán bệnh, nguyên nhân, triệu chứng, tiên lượng:</p>
           <p style="font-size:16px">{{ DataSubmit.Assessment }}</p>
           <p style="font-size:16px">3. Điều trị:</p>
           <p style="font-size:16px">{{ DataSubmit.TreatmentAndProcedures }}</p>
           <p style="font-size:16px">4. Chăm sóc:</p>
           <p style="font-size:16px">{{ DataSubmit.Care }}</p>
           <p style="font-size:16px">5. Mối quan hệ với gia đình người bệnh (tình trạng bệnh, tài sản tư trang...):</p>
           <p style="font-size:16px">{{ DataSubmit.RelationShip }}</p>
           <p style="font-size:16px"><b class="font16">IV. Ý kiến bổ sung của từng người</b> (Bám sát trọng tâm):</p>
           <p style="font-size:16px">{{ DataSubmit.Extra }}</p>
           <p style="font-size:16px"><b class="font16">V. Kết luận</b> (chủ toạ kết luận: nêu bật diễn biến bệnh, ưu điểm và thiếu sót nếu có trong quá trình chẩn đoán, điều trị, chăm sóc và rút kinh nghiệm nếu có...)</p>
           <p style="font-size:16px">{{ DataSubmit.Conclusion }}</p>
           <br/>
           <p style="font-size:16px">Biên bản này đã được thư ký đọc cho mọi người nghe và nhất trí cùng ký tên, từng người dưới đây:</p>
           <br/>
           <br/>
           <div class="row" style="display: flex;">
             <div style="width:33%;">
               <p style="font-weight: bold;  text-align: center;">CÁC THÀNH VIÊN</p>
               <p style="font-size:16px; margin-left: 20px;" v-for="(items, index) in Members" :key="index"> {{ items.ConfirmTime ? ' - ' + items.Fullname : ''}} </p>
             </div>
             <div style="width:33%; ">
               <p style="font-weight: bold; text-align: center;">THƯ KÝ</p>
               <br/>
               <br/>
               <br/>
               <p style="text-align: center;">{{ DataSubmit.Secretary.Fullname || ''}}</p>
             </div>
             <div style="width:33%;">
               <p style="font-weight: bold; text-align: center;">CHỦ TỌA</p>
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
</template>
<script>
import constants from '@/constants'
import CustomersIPD from '@/services/IPD/Customer'
import DropFiles from '@/components/DropFiles.vue'
// import { cloneDeep } from 'lodash'
export default {
  props: ['MASTERDATA', 'DataSubmit'],
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
      DeathAt: {},
      Members: []
    }
  },
  components: {
    DropFiles
  },
  mounted () {
    console.log('DataSubmit.ICD10.label', this.DataSubmit.ICD10)
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
    this.Members = this.DataSubmit.Members
  },
  created () {
    new CustomersIPD().find(this.$route.params.Id).then(response => {
      this.Customer = response
    }).then(er => {
    })
  },
  methods: {
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
