<template>
  <div class="a4-page box" id="printMe" v-if="DataSubmit">
    <table width="100%">
      <tr>
        <td width="10%" valign="top">
          <img src="/static/Logo Vinmec International Hospitall 1.png" />
        </td>
        <td class="text-center">
          <div class="font20 font-bold text-center">
            PHIẾU ĐỒNG Ý XÉT NGHIỆM HIV
          </div>
          <div class="font20 font-bold text-center" style="font-style: italic">
            HIV TESTING CONSENT FORM
          </div>
          <br><br>
          <div class="box-center mrb10 text-center" style="border: 1px solid black; padding: 5px; width: 307px; margin: auto">
            <div class="flex" style="justify-content: center; margin-left: 100px;">
              <VueBarcode v-if="DataSubmit.data.PID" v-bind:value="DataSubmit.data.PID" :height="40" :displayValue="false" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/>
            </div>
            <div class="mrb10">Họ và tên/ <i>Full name</i>: {{DataSubmit.data.FullNameNB || 'N/A'}}</div>
            <div class="mrb10">Số PID/ <i>PID No</i>: {{DataSubmit.data.PID || 'N/A'}}</div>
            <div class="mrb10">Ngày tháng năm sinh/ <i>Date of birth</i>: {{DataSubmit.data.DateOfBirth ? getFTime2(DataSubmit.data.DateOfBirth) : 'N/A'}}</div>
            <div>Giới tính/ <i>Gender</i>: {{GENDER[DataSubmit.data.Gender] || 'N/A'}}</div>
          </div>
        </td>
      </tr>
    </table>
    <br>
    <div class="box form-content">
      <div class="box-body">
        <p>{{MASTERDATA['HIVTCF01'].ViName}}/ <i>{{MASTERDATA['HIVTCF01'].EnName}}</i>: {{CurrentPatientObj.Address}}</p>
        <div style="display: flex;">
          <p v-if="CurrentPatientObj.IdentificationCard">{{MASTERDATA['HIVTCF03'].ViName}}/ <i>{{MASTERDATA['HIVTCF03'].EnName}}</i>: {{CurrentPatientObj.IdentificationCard}}</p>
          <p v-else>{{MASTERDATA['HIVTCF03'].ViName}}/ <i>{{MASTERDATA['HIVTCF03'].EnName}}</i>: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
          <p v-if="CurrentPatientObj.IssueDate" style="margin-left: 20px;">{{MASTERDATA['HIVTCF05'].ViName}}/ <i>{{MASTERDATA['HIVTCF05'].EnName}}</i>: {{CurrentPatientObj.IssueDate}}</p>
          <p v-else style="margin-left: 20px;">{{MASTERDATA['HIVTCF05'].ViName}}/ <i>{{MASTERDATA['HIVTCF05'].EnName}}</i>: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
          <p style="margin-left: 20px;">{{MASTERDATA['HIVTCF07'].ViName}}/ <i>{{MASTERDATA['HIVTCF07'].EnName}}</i>: {{CurrentPatientObj.IssuePlace}}</p>
        </div>
        <p>{{MASTERDATA['HIVTCF09'].ViName}}/ <i>{{MASTERDATA['HIVTCF09'].EnName}}</i></p>
        <div style="display: flex">
          <p style="margin-top: 10px;">Tôi/ <i>I</i></p>
          <div class="ml-10" style="box-sizing: border-box">
            <div class="form-group flex"  style="display: flex; margin-top: 8px; margin-left: 12px;">
              <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['HIVTCF10'].Items" style="margin-left: 12px;">
                <span class="v-checkbox text-center" style="margin-left: 12px; margin: auto">
                  <span class="square-text" :class="item.Value === true ? '' : 'hidden-text'">&#10003;</span>
                  <label class="ml-5" :for="'IPDPPRAFCC209-' + index"><b>{{item.ViName}}/ <i>{{item.EnName}}</i></b></label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <p>cung cấp họ và tên, năm sinh và địa chỉ nơi cư trú để được xét nghiệm HIV/ <i>to provide my full name, date of birth and the residency address for the HIV testing.</i></p>
        <p v-html="MASTERDATA['HIVTCF13'].ViName + '/ ' + '<i>' + MASTERDATA['HIVTCF13'].EnName +  '</i>'">/ <i></i></p>
        <p v-html="MASTERDATA['HIVTCF14'].ViName + '/ ' + '<i>' + MASTERDATA['HIVTCF14'].EnName +  '</i>'">/ <i></i></p>
        <br><br><br>
        <div style="display: flex; justify-content: space-around; margin-left: 150px">
          <div>
            <p class="mt-10" style="text-align: center"></p>
            <p class="mt-10"></p>
          </div>
          <div>
            <p class="mt-10" v-if="time">Thời gian/ <i>Time</i>: {{time}} ngày/ <i>date&#160;</i> {{day}}</p>
            <p class="mt-10" v-else>Thời gian/ <i>Time</i>: &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; ngày/ <i>date&#160;</i> &#160;&#160;&#160;&#160;&#160;</p>
          </div>
        </div>
        <div style="display: flex; justify-content: space-evenly;">
          <div >
            <p class="mt-10" style="text-align: center">Khách hàng/ <i>Patient’s name</i> </p>
            <p class="mt-10">(Ký và ghi rõ họ tên / <i>Fullname and Signature</i> )</p>
            <br><br><br><br><br>
            <p style="text-align: center">{{DataSubmit.data.FullNameNB}}</p>
          </div>
          <div style="display: flex;">
            <div>
              <p class="mt-10" style="text-align: center">Đại diện bệnh viện/ <i>Hospital representative</i></p>
              <p class="mt-10" style="text-align: center">(Ký và ghi rõ họ tên / <i>Fullname and Signature</i> )</p>
            </div>
          </div>
        </div>
        <!-- <drop-files
            v-if="dataPicture"
            id="mini-upload"
            :readonly="true"
            v-model="dataPicture"
        /> -->
      </div>
    </div>
  </div>
</template>
<script>
// import moment from 'moment'
// import DropFiles from '@/components/DropFiles.vue'
import _ from 'lodash'
import constants from '@/constants'
import VueBarcode from 'vue-barcode'

const GENDER = constants.GENDER
export default {
  props: ['MASTERDATA', 'DataSubmit', 'dataPicture'],
  components: {VueBarcode},
  data () {
    return {
      userData: {},
      customer: this.$store.state.account.CurrentPatientObj,
      time: null,
      day: null,
      GENDER: GENDER
    }
  },
  mounted () {
    this.getData()
  },
  created () {
  },
  methods: {
    getData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.data.Datas, { Code: code })
            if (exited) {
              if (this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (exited.Code === 'HIVTCF16') {
                let valueTime = exited.Value.split(' ')
                this.time = valueTime[0]
                this.day = valueTime[1]
              }
            }
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.margin-top {
  margin-top: -15px;
}
</style>
