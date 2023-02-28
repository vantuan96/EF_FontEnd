<template>
 <div class="a4-page box" id="printMe" v-if="DataSubmit">
  <table width="100%">
   <tr>
    <td width="20%" valign="top">
     <img src="/static/Logo Vinmec International Hospitall 1.png" />
    </td>
    <td class="text-center">
     <div class="font20 font-bold text-center">BIÊN BẢN/ REPORT</div>
     <div class="font14 text-center" style="font-style: italic">
      (Phối hợp với bệnh nhân/ gia đình xử lý thai chết lưu/ Coordinating with
      the patient/ family to deal with a stillbirth)
     </div>
    </td>
    <!--
     <td align="middle"><CustomerBarCode :customer="customer" :height="50"/></td>
    -->
   </tr>
  </table>

  <div class="mt-60">
   <h4 class="text-bold">A. THÀNH PHẦN CHÍNH/ ADMINISTRATIVE SECTION</h4>
  </div>
  <div class="box form-content">
   <p class="text-bold font16">
    <a style="font-weight: bold">I. Thời gian/ Time :</a>
     <a class="font14 text-bold">{{getItemDate(MASTERDATA['IPDIAACOORDIDT'].Items[0].Value)}}</a>
   </p>
   <!-- địa điểm -->
    <p class="text-bold font16">
      <a style="font-weight: bold">II. Địa điểm/ Location :</a>
     <a>{{MASTERDATA['IPDIAACOORDIASS'].Items[0].Value}}</a>
    </p>
    <p class="text-bold font16">
      <a style="font-weight: bold">III. Thành phần tham dự/ Participants </a>
    </p>
    <a style="font-weight: bold; margin-left:10px; margin-top:-10px">1. Bệnh viện/ Hospital</a>
    <p style="margin-left:10px;margin-top:-10px">
     - Lãnh đạo bệnh viện/ Người được ủy quyền/ Hospital leadership/ Authorized individual:
    </p>
    <a style="margin-left:20px">{{LDBV}}</a>
    <p style="margin-left:10px;margin-top:-15px">
     - Trưởng khoa/ Trưởng kíp trực/ Head of department/ Leader of on-duty team:
    </p>
    <a style="margin-left:20px">
     {{TKTKT}}
    </a>
    <p  style="margin-left:10px;margin-top:-15px">
     - Bác sĩ trực (cọc 1, cọc 2)/ On-duty doctors (level 1, level 2):
    </p>
    <a style="margin-left:20px">
     {{BSTC1}}
    </a>
  <p style="font-weight: bold; margin-left:10px; margin-top:10px">2. Người bệnh/ Gia đình người bệnh (ghi rõ mối quan hệ)/ Patient/ Patient's family (specify relationship):</p>
   <p v-if="MASTERDATA['IPDIAACOORDINB'].Items[0].Value" style="margin-left:20px">- Người bệnh/ Patient: {{Customer.Fullname}}</p>
  <div v-if="MASTERDATA['IPDIAACOORDIGDNB'].Items[0].Value">
      <div style="margin-left:20px">- Gia đình người bệnh/ Patient's family :</div>
       <div
       class="flex mb-5"
       v-for="(item, index) in familyList"
       :key="index"
      >
      <div style="margin-left:25px" class="ml-10" v-if="item.other !== ''">{{item.other}}: {{item.name}}</div>
      <div style="margin-left:25px" class="ml-10" v-else>{{getRelationship(item.relationship)}}: {{item.name}}</div>
      <!-- <div class="ml-5">{{item.name}}</div> -->
      </div>
      </div>
  </div>
  <h4>B. NỘI DUNG/ CONTENT</h4>
  <div class="box form-content" style="margin-top:20px">
    <p style="font-weight: bold">I. Phần hành chính người bệnh/ Administrative part of the patient:</p>
   <p class="ml-5">
    <b>- Họ tên người bệnh/ Fullname:</b>
    <span v-if="Customer.Fullname" class="tab404">{{ Customer.Fullname || "N/A" }}</span>
    <b>Tuổi/ Age:</b>
    <span class="tab404">{{Customer.AgeFormated | formatAge}}</span>
    <b>Giới tính/ Gender:</b>
    <span class="tab404">{{ __t(GENDER[Customer.Gender]) || "N/A" }}</span>
   </p>
   <p>
    <b>- Dân tộc/ Ethnic:</b
    ><span class="tab404">{{ Customer.Fork || "N/A" }}</span
    >
   </p>
   <p>
    <b>- Nghề nghiệp/ Career:</b
    ><span class="tab404">{{ Customer.Job || "N/A" }}</span
    >
   </p>
   <p>
    <b>- Địa chỉ/ Address:</b
    ><span class="tab404">{{ Customer.Address || "N/A" }}</span>
   </p>
   <p>
    <b>- PID:</b
    ><span class="tab404">{{ Customer.PID || "N/A" }}</span>
   </p>
   <p>
    <b>- Số CMND/ Hộ chiếu/ ID card/passport:</b
    ><span class="tab404">{{ Customer.IdentificationCard || "N/A" }}</span>
   </p>
   <p>
    <b>- Vào viện lúc/ Adminssion at:</b
    ><span class="tab404">{{ Customer.AdmittedDate || "N/A" }}</span>
   </p>
   <p class="text-bold font16">
    <a>Thời gian khám thai gần đây nhất/ Last pre-natal checkup at:</a>
     <a>{{getItemDate(MASTERDATA['IPDIAACOORDITGKGDN'].Items[0].Value) || 'N/A'}}</a>
   </p>
   <p class="text-bold font16">
    <a>Thời gian phát hiện mất tim thai lúc/ Detection of fetal heart rate loss at:</a>
     <a>{{getItemDate(MASTERDATA['IPDIAACOORDIMTTL'].Items[0].Value) || 'N/A'}}</a>
   </p>
   <p class="text-bold font16">
    <a>Thời gian sinh lúc/ Birth time at:</a>
     <a>{{getItemDate(MASTERDATA['IPDIAACOORDITGSL'].Items[0].Value) || 'N/A'}}</a>
   </p>
   <p>
    <a style="margin-right:5px">- Tại khoa/ At department:</a
    >{{ MASTERDATA['IPDIAACOORDITAIKHOA'].Items[0].Value }}
   </p>
   <p style="font-weight: bold; margin-top:20px">II. Diễn biến bệnh: (Tiền sử, tóm tắt diễn biến, quá trình điều trị chăm sóc, chẩn đoán)/ Illness evolution: (History, summary of progress, course of treatment, care and diagnosis)</p>
   <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDITTTS'].Items[0].Value}}</p>
   <p style="font-weight: bold; font-size:16px">III.  Đánh giá hình thái bên ngoài của thai nhi và phần phụ của thai, có ảnh kèm theo/Assessment of fetal morphology and its adnexa, with photos attached:</p>
   <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDICAKT'].Items[0].Value}}</p>
   <div style="margin-top:10px; margin-bottom:10px"><drop-files
         id="mini-upload"
         :readonly="true"
         v-model="MASTERDATA['IPDIAACOORDIUPLOAD'].Items[0].Value"
    /></div>
   <p style="font-weight: bold; font-size:16px">IV. Các xét nghiệm cận lâm sàng cần làm/ Para clinical laboratory tests need to be done:</p>
   <!-- 1 -->
   <p style="margin-left:10px">
    <b>1. {{ __t("Xét nghiệm nhiễm sắc đồ/ Karyotype genetic test") }}:</b>
   </p>
   <div style="display: flex;">
    <div style="margin-left:20px">
      <p>{{MASTERDATA['IPDIAACOORDIXNNSD'].Items[0].Value ? '&#9745;' : '&#9744;'}} Đồng ý/ Agree</p>
    </div>
    <div style="margin-left:10px">
     <p>{{MASTERDATA['IPDIAACOORDIXNNSD'].Items[1].Value ? '&#9745;' : '&#9744;'}} Không đồng ý/ Disagree</p>
    </div>
   </div>
   <p style="margin-left:20px">Nếu không ghi rõ lí do/ If not, specify your reason</p>
    <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDIXNNSD'].Items[2].Value}}</p>
    <!-- 2 -->
    <p style="margin-left:10px">
    <b>2. {{ __t("Xét nghiệm nuôi cấy vi sinh dây rốn, màng rau, nước ối/ Microbiological culture of umbilical cord, placental membranes, amniotic fluid") }}:</b>
   </p>
   <div style="display: flex;">
    <div style="margin-left:20px">
      <p>{{MASTERDATA['IPDIAACOORDIXNNCVS'].Items[0].Value ? '&#9745;' : '&#9744;'}} Đồng ý/ Agree</p>
    </div>
    <div style="margin-left:10px">
     <p>{{MASTERDATA['IPDIAACOORDIXNNCVS'].Items[1].Value ? '&#9745;' : '&#9744;'}} Không đồng ý/ Disagree</p>
    </div>
   </div>
   <p style="margin-left:20px">Nếu không ghi rõ lí do/ If not, specify your reason</p>
    <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDIXNNCVS'].Items[2].Value}}</p>
    <!-- 3 -->
    <p style="margin-left:10px">
    <b>3. {{ __t("Giải phẫu bệnh bánh rau/ Histopathology for placentat") }}:</b>
   </p>
   <div style="display: flex;">
    <div style="margin-left:20px">
      <p>{{MASTERDATA['IPDIAACOORDIGPBBR'].Items[0].Value ? '&#9745;' : '&#9744;'}} Đồng ý/ Agree</p>
    </div>
    <div style="margin-left:10px">
     <p>{{MASTERDATA['IPDIAACOORDIGPBBR'].Items[1].Value ? '&#9745;' : '&#9744;'}} Không đồng ý/ Disagree</p>
    </div>
   </div>
   <p style="margin-left:20px">Nếu không ghi rõ lí do/ If not, specify your reason</p>
    <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDIGPBBR'].Items[2].Value}}</p>
    <!-- 4 -->
    <p style="margin-left:10px">
    <b>4. {{ __t("Khám nghiệm tử thi/ Autopsy") }}:</b>
   </p>
   <div style="display: flex;">
    <div style="margin-left:20px">
      <p>{{MASTERDATA['IPDIAACOORDIKNTT'].Items[0].Value ? '&#9745;' : '&#9744;'}} Đồng ý/ Agree</p>
    </div>
    <div style="margin-left:10px">
     <p>{{MASTERDATA['IPDIAACOORDIKNTT'].Items[1].Value ? '&#9745;' : '&#9744;'}} Không đồng ý/ Disagree</p>
    </div>
   </div>
   <p style="margin-left:20px">Nếu không ghi rõ lí do/ If not, specify your reason</p>
    <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDIKNTT'].Items[2].Value}}</p>
    <p style="margin-left:10px">
    <b>5. Khác/ Other:</b>
   </p>
   <div v-if="showItems1" style="margin-bottom:10px">
    <p style="margin-left:20px; font-weight:bold">{{MASTERDATA['IPDIAACOORDIXNKK1'].Items[3].Value}}</p>
    <div style="display: flex;">
    <div style="margin-left:20px">
      <p>{{MASTERDATA['IPDIAACOORDIXNKK1'].Items[0].Value ? '&#9745;' : '&#9744;'}} Đồng ý/ Agree</p>
    </div>
    <div style="margin-left:10px">
     <p>{{MASTERDATA['IPDIAACOORDIXNKK1'].Items[1].Value ? '&#9745;' : '&#9744;'}} Không đồng ý/ Disagree</p>
    </div>
   </div>
   <p style="margin-left:20px">Nếu không ghi rõ lí do/ If not, specify your reason</p>
    <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDIXNKK1'].Items[2].Value}}</p>
   </div>
   <div v-if="showItems2" style="margin-bottom:10px">
    <p style="margin-left:20px; font-weight:bold">{{MASTERDATA['IPDIAACOORDIXNKK2'].Items[3].Value}}</p>
    <div style="display: flex;">
    <div style="margin-left:20px">
      <p>{{MASTERDATA['IPDIAACOORDIXNKK2'].Items[0].Value ? '&#9745;' : '&#9744;'}} Đồng ý/ Agree</p>
    </div>
    <div style="margin-left:10px">
     <p>{{MASTERDATA['IPDIAACOORDIXNKK2'].Items[1].Value ? '&#9745;' : '&#9744;'}} Không đồng ý/ Disagree</p>
    </div>
   </div>
   <p style="margin-left:20px">Nếu không ghi rõ lí do/ If not, specify your reason</p>
    <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDIXNKK2'].Items[2].Value}}</p>
   </div>
   <div v-if="showItems3" style="margin-bottom:10px">
    <p style="margin-left:20px; font-weight:bold">{{MASTERDATA['IPDIAACOORDIXNKK3'].Items[3].Value}}</p>
    <div style="display: flex;">
    <div style="margin-left:20px">
      <p>{{MASTERDATA['IPDIAACOORDIXNKK3'].Items[0].Value ? '&#9745;' : '&#9744;'}} Đồng ý/ Agree</p>
    </div>
    <div style="margin-left:10px">
     <p>{{MASTERDATA['IPDIAACOORDIXNKK3'].Items[1].Value ? '&#9745;' : '&#9744;'}} Không đồng ý/ Disagree</p>
    </div>
   </div>
   <p style="margin-left:20px">Nếu không ghi rõ lí do/ If not, specify your reason</p>
    <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDIXNKK3'].Items[2].Value}}</p>
   </div>
   <div v-if="showItems4" style="margin-bottom:10px">
    <p style="margin-left:20px; font-weight:bold">{{MASTERDATA['IPDIAACOORDIXNKK4'].Items[3].Value}}</p>
    <div style="display: flex;">
    <div style="margin-left:20px">
      <p>{{MASTERDATA['IPDIAACOORDIXNKK4'].Items[0].Value ? '&#9745;' : '&#9744;'}} Đồng ý/ Agree</p>
    </div>
    <div style="margin-left:10px">
     <p>{{MASTERDATA['IPDIAACOORDIXNKK4'].Items[1].Value ? '&#9745;' : '&#9744;'}} Không đồng ý/ Disagree</p>
    </div>
   </div>
   <p style="margin-left:20px">Nếu không ghi rõ lí do/ If not, specify your reason</p>
    <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDIXNKK4'].Items[2].Value}}</p>
   </div>
   <div v-if="showItems5" style="margin-bottom:10px">
    <p style="margin-left:20px; font-weight:bold">{{MASTERDATA['IPDIAACOORDIXNKK5'].Items[3].Value}}</p>
    <div style="display: flex;">
    <div style="margin-left:20px">
      <p>{{MASTERDATA['IPDIAACOORDIXNKK5'].Items[0].Value ? '&#9745;' : '&#9744;'}} Đồng ý/ Agree</p>
    </div>
    <div style="margin-left:10px">
     <p>{{MASTERDATA['IPDIAACOORDIXNKK5'].Items[1].Value ? '&#9745;' : '&#9744;'}} Không đồng ý/ Disagree</p>
    </div>
   </div>
   <p style="margin-left:20px">Nếu không ghi rõ lí do/ If not, specify your reason</p>
    <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDIXNKK5'].Items[2].Value}}</p>
   </div>
   <p style="font-weight: bold; margin-top:20px">V. Ý kiến của người bệnh/ gia đình người bệnh/ Opinions of the patient/patient's family:</p>
  <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDIYKNBGD'].Items[0].Value}}</p>
  <p style="font-weight: bold; margin-top:20px">VI. Kết luận/ Conclusion:</p>
  <p style="margin-left:20px">{{MASTERDATA['IPDIAACOORDICONCLU'].Items[0].Value}}</p>
  <br/>
  <br/>
  <br/>
  <br/>
  <!-- chân ký -->
  <table >
      <tr>
        <div class="row" style="margin-bottom:40px">
          <td>
            <div class="col-md-3 col-sm-3 text-center">
              <p class="text-center"><b>Lãnh đạo bệnh viện</b></p>
              <p class="text-center"><i>Hospital leadership</i></p>
              <br/>
              <br/>
              <br/>
              <p class="text-center" v-if="DataSubmit.Confirm.HospitalLeadership.FullName"><i>{{DataSubmit.Confirm.HospitalLeadership.FullName}}</i></p>
            </div>
          </td>
          <td>
            <div class="col-md-3 col-sm-3 text-center">
              <p class="text-center"><b>Lãnh đạo khoa/ Trưởng kíp trực</b></p>
              <p class="text-center"><i>Leader of on-duty team</i></p>
              <br/>
              <br/>
              <br/>
              <p v-if="DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.FullName" class="text-center"><i>{{DataSubmit.Confirm.HeadOfDepartmentOrLeaderOfOnDutyTeam.FullName}}</i></p>
            </div>
          </td>
          <td>
          </td>
        </div>
      </tr>
      <tr style="margin-top: 40px;">
          <div><td style="text-align:center;">
            <div class="text-center">
              <p class="text-center"><b>Người bệnh/ gia đình người bệnh</b></p>
              <p class="text-center"><i>Patient/ patient's family</i></p>
              <br/>
              <br/>
              <p class="text-center" v-if="this.MASTERDATA['IPDIAACOORDICBNB'].Items[0].Value">
                Người bệnh/ patient: {{Customer.Fullname}}..........
              </p>
              <p v-for="(item, index) in familyList" :key="index" class="text-center"><i>{{getRelationship(item.relationship)}} {{item.other}} : {{item.name}} ..........</i></p>
            </div>
          </td></div>
      </tr>
    </table>
  <div style="margin-top:10px; margin-bottom:10px"><drop-files
         id="mini-upload"
         :readonly="true"
         v-model="MASTERDATA['IPDIAACOORDIUPLOAD'].Items[1].Value"
    /></div>
  </div>
 </div>
</template>
<script>
import constants from '@/constants'
import CustomersIPD from '@/services/IPD/Customer'
import DropFiles from '@/components/DropFiles.vue'
export default {
  props: ['MASTERDATA', 'DataSubmit', 'CDHA', 'hasCDHA', 'familyList', 'showItems1', 'showItems2', 'showItems3', 'showItems4', 'showItems5'],
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
      customer: this.$store.state.account.CurrentPatientObj
    }
  },
  components: {
    DropFiles
  },
  mounted () {
    this.responseList = this.DataSubmit.Datas
    console.log('this.showItems1', this.familyList)
    // var a = '15:53 22/06/2022'
    for (let i = 0; i < this.responseList.length; i++) {
      if (this.responseList[i].Code === 'IPDIAACOORDILDBVCD1') {
        this.LDBV = this.getUserSelectName(this.responseList[i].Value)
      }
      if (this.responseList[i].Code === 'IPDIAACOORDITKTKCD1') {
        this.TKTKT = this.getUserSelectName(this.responseList[i].Value)
      }
      if (this.responseList[i].Code === 'IPDIAACOORDIBSTCCD1') {
        console.log('value', this.responseList[i].Value)
        const listBSTC = JSON.parse(this.responseList[i].Value.toString())
        const list = []
        if (listBSTC.length > 0) {
          for (let j = 0; j < listBSTC.length; j++) {
            const a = listBSTC[j].Fullname + ' '
            list.push(a)
          }
        }
        this.BSTC1 = list.toString()
        // this.BSTC1 = this.getUserSelectName(this.responseList[i].Value)
      }
    }
  },
  created () {
    new CustomersIPD().find(this.$route.params.Id).then(response => {
      this.Customer = response
      console.log('response', response)
    }).then(er => {
    })
  },
  methods: {
    getRelationship (name) {
      var text = ''
      if (name === 'Chồng') {
        text = 'Chồng/ Husband'
      } else if (name === 'Mẹ') {
        text = 'Mẹ/ Mother'
      } else if (name === 'Bố') {
        text = 'Bố/ Father'
      } else if (name === 'Chị gái') {
        text = 'Chị gái/ Sister'
      } else if (name === 'Anh trai') {
        text = 'Anh trai/ Brother'
      } else if (name === 'Con gái') {
        text = 'Con gái/ Daughter'
      } else if (name === 'Con trai') {
        text = 'Con trai/ Son'
      }
      console.log('text', text)
      return text
    },
    getUserSelectName (item) {
      console.log('name', JSON.parse(item).Fullname)
      return JSON.parse(item).Fullname
    },
    getItemDate (value) {
      if (value) {
        const date = value.toString()
        var text = ''
        const items = {
          hour: date.split(' ')[0].split(':')[0],
          minutes: date.split(' ')[0].split(':')[1],
          day: date.split(' ')[1].split('/')[0],
          month: date.split(' ')[1].split('/')[1],
          years: date.split(' ')[1].split('/')[2],
          fullDate: date.split(' ')[1]
        }
        text = items.hour + 'giờ/ hour' + ' ' + items.minutes + ', ' + 'ngày/ date' + ' ' + items.fullDate
        return text
      }
    },
    getIcdInfo () {
      let opd = this.$store.state.account.CurrentPatientObj
      let str = ''
      if (opd) {
        let icd = this.getICD10s(opd.DiagnosisAndICD.ICD, opd.DiagnosisAndICD.ICDOption, true)
        str = [opd.DiagnosisAndICD.Diagnosis, opd.DiagnosisAndICD.DiagnosisOption].filter(e => e).join(', ') + ' ' + icd
      }
      return str
    },
    formatData (val) {
      if (val !== null && val !== undefined) {
        this.userData.time1 = (val).slice(0, 2)
        this.userData.time2 = (val).slice(3, 5)
        this.userData.date = (val).slice(6, 16)
        let text = this.userData.time1 + ' ' + 'giờ/Hours:' + ' ' + this.userData.time2 + ' ' + 'ngày/Date:' + ' ' + this.userData.date
        return text
      } else {
        return 'N/A'
      }
    },
    formatDatax (val) {
      val = val._i
      if (val !== null && val !== undefined) {
        this.userData.time3 = (val).slice(0, 2)
        this.userData.time4 = (val).slice(3, 5)
        this.userData.date2 = (val).slice(6, 16)
        let text = this.userData.time3 + ' ' + 'giờ/Hours:' + ' ' + this.userData.time4 + ' ' + 'ngày/Date:' + ' ' + this.userData.date2
        return text
      } else {
        return 'N/A'
      }
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
