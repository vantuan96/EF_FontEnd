<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" id="TakeCareNoteIPD" v-if="this.$store.state.account.CurrentPatientObj">
      <table class="table" style="width: 100%;">
        <tr>
          <td width="25%"  style="vertical-align: top;" align="top">
             <div class="text-center" style="text-align: center;position: relative;top: 0;"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
          </td>
          <td class="text-center" style="text-align: center;vertical-align: top;" align="top">
           <h1 class="title-page mrb10" style="text-align: center;position: relative;top: 10px;">PHIẾU CHĂM SÓC</h1>
          Y tá (điều dưỡng) ghi&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phiếu số:.................
          </td>
          <td width="20%" style="vertical-align: top;position: relative;top: 0;" align="top">
              <p class="font12">MS: 09/BV-01</p>
              <p class="font12">Số vào viện: {{getPID()}}</p>
          </td>
        </tr>
      </table>
      <table class="table" style="width: 100%">
        <tr>
          <td width="50%" style="text-align: left" align="top">
            <p>- Họ tên người bệnh: <span  class="textUppercase">{{getFullname()}}</span></p>
          </td>
          <td width="20%" class="text-left" style="text-align: left" align="top">
            <p>Tuổi: {{getAge()}}</p>
          </td>
          <td width="20%" class="text-left" style="text-align: left" align="top">
            <span class="square-text" :class="{'hidden-text': !checkHideGender(1)}">&#10003;</span>
            <span style="margin-left: 5px"></span>Nam
            <span class="square-text" :class="{'hidden-text': !checkHideGender(0)}">&#10003;</span>
            <span style="margin-left: 5px"></span>Nữ
          </td>
        </tr>
        <tr>
          <td width="50%" style="text-align: left" align="top">
            <p>- Số giường: {{(this.datasubmit && this.datasubmit.length) ? this.datasubmit[0].Bed : ''}}</p>
          </td>
          <td width="20%" class="text-left" style="text-align: left" align="top">
            <p>Số buồng: {{(this.datasubmit && this.datasubmit.length) ? this.datasubmit[0].Room : ''}}</p>
          </td>
        </tr>
        <tr>
          <td width="20%" class="text-left" style="text-align: left" align="top">
            <p>- Chẩn đoán: {{handleGetChuanDoan()}}</p>
          </td>
        </tr>
      </table>
      <table class="tbl-b tbl-c" style="width: 100%">
        <tr>
        <th width="50px" class="no-wrap date_custom" bgcolor="#dedede" style="font-weight: normal;border: 1px solid black;text-align: center;height: 30px;">Ngày</th>
        <th width="70px" class="no-wrap date_custom" bgcolor="#dedede" style="font-weight: normal;border: 1px solid black;text-align: center;height: 30px;">Giờ, phút</th>
        <th width="200px" class="no-wrap examination_custom" bgcolor="#dedede" style="font-weight: normal;border: 1px solid black;text-align: center;height: 30px;" >Theo dõi diễn biến</th>
        <th width="200px" class="no-wrap examination_custom" bgcolor="#dedede" style="font-weight: normal;border: 1px solid black;text-align: center;height: 30px;" >Thực hiện y lệnh/ chăm sóc</th>
        <th width="" class="no-wrap examination_custom" bgcolor="#dedede" style="font-weight: normal;border: 1px solid black;text-align: center;height: 30px;" >Ký tên</th>
        </tr>
        <template v-if="this.datasubmit && this.datasubmit.length">
          <tr v-for="(item, index) in this.datasubmit" :key="index" style="height: 56px;">
            <td width="50px" style="padding: 5px;">
              {{FormatTime(item.NoteTime)}}
            </td>
            <td width="70px">
              <p style="margin: 5px;">{{FormatDate(item.NoteTime)}}</p>
            </td>
            <td width="200px" style="padding: 5px;word-break: break-word!important;white-space: pre-line;">
                {{item.ProgressNote}}
            </td>
            <td width="200px" style="padding: 5px;word-break: break-word!important;white-space: pre-line;">
                {{item.CareNote}}
            </td>
            <td style="vertical-align: bottom!important;padding: 5px;word-break: break-word!important;">
              <img src="static/bg-white.png" style="width: 50%;" />
              <div class="text-center">{{item.Fullname}}</div>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr style="height: 56px;">
            <td width="50px" style="padding: 5px;color: #white;"></td>
            <td width="70px"></td>
            <td width="200px"></td>
            <td width="200px"></td>
            <td></td>
          </tr>
          <tr style="height: 56px;">
            <td width="50px" style="padding: 5px;color: #white;"></td>
            <td width="70px"></td>
            <td width="200px"></td>
            <td width="200px"></td>
            <td></td>
          </tr>
          <tr style="height: 56px;">
            <td width="50px" style="padding: 5px;color: #white;"></td>
            <td width="70px"></td>
            <td width="200px"></td>
            <td width="200px"></td>
            <td></td>
          </tr>
          <tr style="height: 56px;">
            <td width="50px" style="padding: 5px;color: #white;"></td>
            <td width="70px"></td>
            <td width="200px"></td>
            <td width="200px"></td>
            <td></td>
          </tr>
          <tr style="height: 56px;">
            <td width="50px" style="padding: 5px;color: #white;"></td>
            <td width="70px"></td>
            <td width="200px"></td>
            <td width="200px"></td>
            <td></td>
          </tr>
          <tr style="height: 56px;">
            <td width="50px" style="padding: 5px;color: #white;"></td>
            <td width="70px"></td>
            <td width="200px"></td>
            <td width="200px"></td>
            <td></td>
          </tr>
          <tr style="height: 56px;">
            <td width="50px" style="padding: 5px;color: #white;"></td>
            <td width="70px"></td>
            <td width="200px"></td>
            <td width="200px"></td>
            <td></td>
          </tr>
          <tr style="height: 56px;">
            <td width="50px" style="padding: 5px;color: #white;"></td>
            <td width="70px"></td>
            <td width="200px"></td>
            <td width="200px"></td>
            <td></td>
          </tr>
          <tr style="height: 56px;">
            <td width="50px" style="padding: 5px;color: #white;"></td>
            <td width="70px"></td>
            <td width="200px"></td>
            <td width="200px"></td>
            <td></td>
          </tr>
          <tr style="height: 56px;">
            <td width="50px" style="padding: 5px;color: #white;"></td>
            <td width="70px"></td>
            <td width="200px"></td>
            <td width="200px"></td>
            <td></td>
          </tr>
        </template>
      </table>
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
export default {
  /**
   * The name of the page.
   */
  props: ['datasubmit', 'Data', 'Customer', 'FormIdNewborn'],
  name: 'PhysicianNote',
  data () {
    return {
      data: {}
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  computed: {
  },
  methods: {
    FormatDate (val) {
      let x = "'" + val + "'"
      return x.slice(1, 6)
    },
    FormatTime (val) {
      let x = "'" + val + "'"
      return x.slice(7, 17)
    },
    getPID () {
      let PID = ''
      if (!this.FormIdNewborn) {
        PID = this.$store.state.account.CurrentPatientObj.PID
      } else {
        PID = this.Customer.PID
      }
      return PID
    },
    getFullname () {
      let Fullname = ''
      if (!this.FormIdNewborn) {
        Fullname = this.$store.state.account.CurrentPatientObj.Fullname
      } else {
        Fullname = this.Customer.Fullname
      }
      return Fullname
    },
    getAge () {
      let AgeFormated = ''
      if (!this.FormIdNewborn) {
        if (this.Data && this.Data.AgeFormated) {
          AgeFormated = this.$options.filters.formatAge(this.Data.AgeFormated)
        }
      } else {
        if (this.Customer && this.Customer.AgeFormated) {
          AgeFormated = this.$options.filters.formatAge(this.Customer.AgeFormated)
        }
      }
      return AgeFormated
    },
    checkHideGender (number) {
      let check = false
      if (!this.FormIdNewborn) {
        if (this.$store.state.account.CurrentPatientObj.Gender === number) {
          check = true
        }
      } else {
        if (this.Customer.Gender === number) {
          check = true
        }
      }
      return check
    },
    handleGetChuanDoan () {
      if (!this.FormIdNewborn) {
        if (this.Data && this.Data.Diagnosis2) {
          return this.getChuanDoan({DiagnosisAndICD: this.Data.Diagnosis2})
        }
      }
      return ''
    }
  }
}
</script>
