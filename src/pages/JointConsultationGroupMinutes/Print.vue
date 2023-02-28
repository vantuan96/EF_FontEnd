<template>
  <div class="a4-page box" id="printMe">
    <table width="100%">
      <tr>
        <td width="20%" valign="top">
          <img src="/static/Logo Vinmec International Hospitall 1.png" />
        </td>
        <td class="text-center">
          <div class="font20 font-bold text-center">BIÊN BẢN HỘI CHẨN</div>
          <div class="font18 font-bold text-center">JOINT CONSULTATION GROUP MINUTES</div>
        </td>
      </tr>
    </table>
    <br/>
    <p class="font16 font-bold">A PHẦN HÀNH CHÍNH/ADMINISTRATIVE MATTER</p>
    <p>1. Theo đề xuất của bác sỹ điều trị/bác sỹ trưởng khoa/<i>As proposed by the primary doctor/head of department:</i> {{(data.Doctor && data.Doctor.Fullname) ? data.Doctor.Fullname : '...............................'}}  <span class="tab404">Khoa/<i>Dept: </i> {{__label(data.SpecialtyInfo)}}</span></p>
    <div style="margin: 0 0 10px;">
      2. Hình thức hội chẩn (khoa/liên khoa/toàn bệnh viện/liên bệnh viện/mời chuyên gia)/<i>Type of joint consultation (departmental/inter-departmental/hospital-wide/inter-hospital/participation of external expert): </i>
      <template v-if="MASTERDATA['EIOJCGMTOJC']">
        {{EIOJCGMTOJC}}
      </template>
    </div>
    <p>3. Lý do hội chẩn/<i>Reason of joint consultation:</i> <ValueOfInput v-if="MASTERDATA['EIOJCGMROJC'].Items[0].Value" :datas="MASTERDATA['EIOJCGMROJC'].Items" /> <template v-else>. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</template></p>
    <p>4. Thời gian hội chẩn/<i>Time</i> {{EIOJCGMJCT[3]}} giờ/<i>hour</i> {{EIOJCGMJCT[4]}} Ngày/<i>date</i> {{EIOJCGMJCT[2]}} tháng/<i>month</i> {{EIOJCGMJCT[1]}} năm/<i>year</i> {{EIOJCGMJCT[0]}}</p>
    <p>5. Thành phần hội chẩn (ghi rõ họ tên, chức danh, chức vụ từng người)<i>/Attendees (indicate clearly full name, title and position)</i></p>
    <p class="tab04 no-wrap-hidden">Chủ tọa/<i>Chairman</i>: {{(data.Chairman && data.Chairman.Fullname) ? (data.Chairman.Fullname + ((data.Chairman.Title) ? ` - ${data.Chairman.Title}` : '')) : '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}}</p>
    <p class="tab04 no-wrap-hidden">Thư ký/<i>Secretary</i>: {{(data.Secretary && data.Secretary.Fullname) ? (data.Secretary.Fullname + ((data.Secretary.Title) ? ` - ${data.Secretary.Title}` : '')) : '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}}</p>
    <p class="tab04">Các thành viên/<i>Members</i>: <br/><ValueOfInput v-if="MASTERDATA['EIOJCGMMEMS'].Items[0].Value" :datas="MASTERDATA['EIOJCGMMEMS'].Items" /><template v-else>. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</template></p>
    <p class="font16 font-bold">B. NỘI DUNG HỘI CHẨN/CONTENT OF THE JOINT CONSULTATION</p>
    <p class="font-bold">I. Phần hành chính người bệnh/Patient general information</p>
    <div>
      <table style="width: 300px; margin: 0 auto;border: 1px solid #000;">
        <tr>
          <td style="padding: 10px">
            <p><b>Họ tên/<i>Full name</i>:</b> {{data.Customer.Fullname}}</p>
            <p><b>Số PID/<i>PID no</i>:</b> {{data.Customer.PID}}</p>
            <p><b>Ngày tháng năm sinh/<i>D.O.B</i>:</b> {{data.Customer.DateOfBirth}}</p>
            <p class="no-margin"><b>Giới tính/<i>Gender</i>:</b> {{data.Customer.Gender}}</p>
          </td>
        </tr>
      </table>
    </div>
    <br/>
    <p class="no-wrap-hidden">- Dân tộc/<i>Ethnic group</i>: {{data.Customer.EthnicGroup || '. . . . . . . . . . . . . . . . . . . .'}}  <span class="tab404">Nghề nghiệp/<i>Profession</i> {{data.Customer.Profession || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}}</span></p>
    <p>- Vào viện/<i>Admitted at: </i> {{EIOJCGMADAT[3]}} giờ/<i>hour</i> {{EIOJCGMADAT[4]}} phút/<i>minute</i>, Ngày/<i>date</i> {{EIOJCGMADAT[2]}} tháng/<i>month</i> {{EIOJCGMADAT[1] + 1}} năm/<i>year</i> {{EIOJCGMADAT[0]}}</p>
    <p>- Tại khoa/<i>Department</i>: {{__label(data.SpecialtyInfo)}}</p>
    <p @dblclick="addBreakPage" class="hasBreakPage font-bold">II. Tóm tắt tình trạng người bệnh/Summary of patient’s condition:</p>
    <p><ValueOfInput v-if="MASTERDATA['EIOJCGMSOPC'].Items[0].Value" :datas="MASTERDATA['EIOJCGMSOPC'].Items" /><template v-else>. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</template></p>
    <p @dblclick="addBreakPage" class="hasBreakPage font-bold">III. Các vấn đề cần hội chẩn/Issues to be discussed</p>
    <p><ValueOfInput v-if="MASTERDATA['EIOJCGMITBD'].Items[0].Value" :datas="MASTERDATA['EIOJCGMITBD'].Items" /><template v-else>. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</template></p>
    <p class="font-bold">VI. Sau khi các thành viên đã khám bệnh, thảo luận thống nhất ý kiến và đưa ra kết luận về (Chẩn đoán/điều trị và chăm sóc/thăm dò…)/Conclusion after physical examination and joint consultation (including diagnosis/plan of care, etc)</p>
    <p @dblclick="addBreakPage" class="hasBreakPage">Chẩn đoán/<i>diagnosis: </i><ValueOfInput v-if="MASTERDATA['EIOJCGMDIAG'].Items[0].Value" :datas="MASTERDATA['EIOJCGMDIAG'].Items" /><template v-else>. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</template></p>
    <p @dblclick="addBreakPage" class="hasBreakPage">Điều trị và chăm sóc/<i>plan of care: </i><ValueOfInput v-if="MASTERDATA['EIOJCGMPOCA'].Items[0].Value" :datas="MASTERDATA['EIOJCGMPOCA'].Items" /><template v-else>. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</template></p>
    <p @dblclick="addBreakPage" class="hasBreakPage">Thăm dò/<i>Explore: </i><ValueOfInput v-if="MASTERDATA['EIOJCGMEXPL'].Items[0].Value" :datas="MASTERDATA['EIOJCGMEXPL'].Items" /><template v-else>. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</template></p>
    <p v-if="MASTERDATA['EIOJCGMOTHE'].Items[0].Value">Khác/<i>other: </i><ValueOfInput v-if="MASTERDATA['EIOJCGMOTHE'].Items[0].Value" :datas="MASTERDATA['EIOJCGMOTHE'].Items" /><template v-else>. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</template></p>
    <br/>
    <table class="hidden-only-form" width="100%">
      <tr>
        <td width="60%" class="text-center" style="vertical-align: top;">
          <p class="text-center"><b>CÁC THÀNH VIÊN/MEMBERS</b><br/>(Ký và ghi rõ họ tên/Sign and indicate full name)</p>
          <div :key="index" v-for="(member, index) in data.Members">
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p class="text-center">{{member.Fullname}}</p>
          </div>
        </td>
        <td class="text-center" style="vertical-align: top;">
          <p class="text-center"><b>THƯ KÍ/SECRETARY</b></p>
          <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
          <p class="text-center" v-if="data.SecretaryConfirm">{{(data.Secretary && data.Secretary.Fullname) ? data.Secretary.Fullname : ''}}</p>
          <br v-else/>
          <br/>
          <p class="text-center"><b>CHỦ TỌA/CHAIRMAN</b></p>
          <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
          <p class="text-center" v-if="data.ChairmanConfirm">{{(data.Chairman && data.Chairman.Fullname) ? data.Chairman.Fullname : ''}}</p>
          <br v-else/>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'OPDJointConsultationGroupMinutesPrint',
  props: ['data', 'MASTERDATA'],
  computed: {
    EIOJCGMTOJC: function (params) {
      var arr = this.MASTERDATA['EIOJCGMTOJC'].Items.filter(item => item.Value && this.checkString(item.DataType, 'CheckBox')).map(e => {
        if (e.ViName === 'Khác') {
          if (this.MASTERDATA['EIOJCGMTOJC'].Items[5].Value) return this.MASTERDATA['EIOJCGMTOJC'].Items[6].Value
          return false
        }
        return e.ViName
      })
      return arr.filter(e => e).join(', ') || '. . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . .  '
    },
    EIOJCGMJCT: function () {
      if (this.MASTERDATA['EIOJCGMJCT'] && this.MASTERDATA['EIOJCGMJCT'].Items[0].Value) {
        var d = moment(this.MASTERDATA['EIOJCGMJCT'].Items[0].Value, this.vDateTimeFormat)
        var arr = d._pf.parsedDateParts
        arr[1] = arr[1] + 1
        return arr
      }
      return ['........', '........', '........', '........', '........']
    },
    EIOJCGMADAT: function () {
      if (this.MASTERDATA['EIOJCGMADAT'] && this.MASTERDATA['EIOJCGMADAT'].Items[0].Value) {
        var d = moment(this.MASTERDATA['EIOJCGMADAT'].Items[0].Value, this.vDateTimeFormat)
        return d._pf.parsedDateParts
      }
      return ['........', '........', '........', '........', '........']
    }
  },
  components: {
  },
  data () {
    return {
    }
  }
}
</script>
