<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" id="SummaryOf15DayTreatment-price" v-if="MASTERDATA2 && DataSubmit">
      <table class="table" style="width: 100%">
        <tr>
          <td width="20%" style="vertical-align: top;" align="top">
            <p><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></p>
          </td>
          <th class="text-center" style="text-align: center;vertical-align: bottom;" align="center">
            <p class="text-center textUppercase fs20 none-mrb">PHIẾU SƠ KẾT 15 NGÀY ĐIỀU TRỊ</p>
            <p class="text-center textUppercase fs20 none-mrb nghieng">SUMMARY OF 15 DAY TREATMENT</p>
          </th>
          <td align="middle" width="20%"><CustomerBarCode2 :customer="DataSubmit.Customer" :height="50"/></td>
        </tr>
      </table>
      <br><br>
      <p>- Khoa/<span class="nghieng">Department: </span> {{DataSubmit.Department ? __label(DataSubmit.Department) : '&emsp;&emsp'}} <span style="margin-left:50px;">Buồng/<span class="nghieng">Room:</span> {{MASTERDATA2['IPDSO15DTR01'].Items[0].Value}}</span></p>
      <p>- Chẩn đoán/<span class="nghieng">Diagnosis: </span> {{getTextDiagnosis(DataSubmit.Diagnosis)}}</p>
      <p><b>1. Diễn biến lâm sàng trong đợt điều trị/</b><b class="nghieng">Clinical Evolution: </b> {{MASTERDATA2['IPDSO15DTR12'].Items[0].Value}}</p>
      <div class="dan-cach" v-if="!MASTERDATA2['IPDSO15DTR12'].Items[0].Value"></div>
      <p><b>2. Xét nghiệm cận lâm sàng/</b><b class="nghieng">Results of principle test: </b> {{MASTERDATA2['IPDSO15DTR14'].Items[0].Value}}</p>
      <div class="dan-cach" v-if="!MASTERDATA2['IPDSO15DTR14'].Items[0].Value"></div>
      <p><b>3. Quá trình điều trị/</b><b class="nghieng">Treatment: </b> {{MASTERDATA2['IPDSO15DTR16'].Items[0].Value}}</p>
      <div class="dan-cach" v-if="!MASTERDATA2['IPDSO15DTR16'].Items[0].Value"></div>
      <p><b>4. Đánh giá kết quả/</b><b class="nghieng">Results of treatment: </b> {{MASTERDATA2['IPDSO15DTR18'].Items[0].Value}}</p>
      <div class="dan-cach" v-if="!MASTERDATA2['IPDSO15DTR18'].Items[0].Value"></div>
      <p><b>5. Hướng điều trị tiếp và tiên lượng/</b><b class="nghieng">Continuous treatment and prognosis: </b> {{MASTERDATA2['IPDSO15DTR20'].Items[0].Value}}</p>
      <div class="dan-cach" v-if="!MASTERDATA2['IPDSO15DTR20'].Items[0].Value"></div>
      <p style="text-align: right; font-style: italic; margin-right:50px;">Giờ/Hours {{CreateAtHouse}} Ngày/Date {{CreateAt[0]}}/{{CreateAt[1]}}/{{CreateAt[2]}} </p>
      <table style="width: 100%">
        <tr>
          <td style="width: 50%" class="text-center">
            <p class="text-center none-mrb" style="font-size: 14px!important;"><b>Trưởng khoa</b></p>
            <p class="text-center none-mrb nghieng" style="font-size: 14px!important;"><b>The Head of Department</b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
          </td>
          <td style="width: 50%" class="text-center">
            <p class="text-center none-mrb" style="font-size: 14px!important;"><b>Bác sĩ điều trị</b></p>
            <p class="text-center none-mrb nghieng" style="font-size: 14px!important;"><b>Physician</b></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
          </td>
        </tr>
        <tr>
          <td><p class="text-center fw300" style="font-size: 14px!important;">{{DataSubmit.HeadOfDepartmentConfirmAt ? DataSubmit.HeadOfDepartmentConfirm.FullName : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p></td>
          <td><p class="text-center fw300" style="font-size: 14px!important;">{{DataSubmit.PhysicianConfirmAt ? DataSubmit.PhysicianConfirm.FullName : ' &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; '}}</p></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import MixinForm from '@/mixins/form.js'
export default {
  name: 'SummaryOf15DayTreatmentPrice',
  mixins: [MixinForm],
  props: ['MASTERDATA', 'DataSubmit', 'id'],
  data () {
    return {
      Fullname: ''
    }
  },
  computed: {
    MASTERDATA2: function () {
      if (this.MASTERDATA) {
        return this.JSONParse(this.MASTERDATA)
      } else {
        return []
      }
    },
    CreateAtHouse: function () {
      return this.DataSubmit.CreatedAt ? this.DataSubmit.CreatedAt.split(' ')[0] : '&emsp'
    },
    CreateAt: function () {
      return this.DataSubmit.CreatedAt ? this.DataSubmit.CreatedAt.split(' ')[1].split('/') : ['&emsp&emsp', '&emsp&emsp', '&emsp&emsp&emsp']
    }
  },
  mounted () {
  },
  methods: {
    getIcd (icd) {
      let str = ''
      if (icd) {
        str = `(${this.JSONParse(icd).map(e => e.code).join(', ')})`
      }
      return str
    }
  }
}
</script>

<style lang="stylus" scoped>
#SummaryOf15DayTreatment-price {
  b {
    display: block;
    font-size: 16px;
  }
}
</style>
