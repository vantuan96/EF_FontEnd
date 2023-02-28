<template>
  <div class="BreakPage p-pos">
    <div class="page-footer" style="font-size: 11px;visibility: hidden;">
    <p v-if="title">A01_104_110321_VE<br/><span style="color: transparent">vinmec</span></p>
    <p v-else>A01_103_110321_VE<br/><span style="color: transparent">vinmec</span></p>
    </div>
    <table style="width: 100%">
      <thead>
        <tr>
          <td>
            <table style="width: 100%">
              <tr>
                <td>
                  <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
                </td>
                <td>
                  <div v-if="title" class="text-center" style="font-size: 16pt; text-transform: uppercase;">
                    <div class="text-center"><b>PHIẾU XÉT NGHIỆM KHỐI TẾ BÀO</b></div>
                    <div class="text-center"><b>CELL BLOCK REQUEST</b></div>
                  </div>
                  <div v-else class="text-center" style="font-size: 16pt; text-transform: uppercase;">
                    <div class="text-center"><b>PHIẾU XÉT NGHIỆM TẾ BÀO BỆNH HỌC</b></div>
                    <div class="text-center"><b>CYTOPATHOLOGY REQUEST</b></div>
                  </div>
                </td>
                <td>
                  <VueBarcode v-if="Customer.PID" v-bind:value="Customer.PID" :height="30" :displayValue="true" :textAlign="'left'" :width="1" :marginTop="0" :fontSize="13"/>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table width="100%">
              <tr>
                <td width="200"><p class="no-wrap">Bệnh nhân/ <i>Patient's name:</i></p></td>
                <td colspan="2"><p><b><span class="ktab"></span>{{Customer.Fullname}}</b></p></td>
              </tr>
              <tr>
                <td class="no-wrap"><p class="no-wrap">Giới tính/ <i>Sex</i>: {{GENDERS[Customer.Gender]}} </p></td>
                <td colspan="2"><p><span class="ktab"></span>Ngày tháng năm sinh/ <i>Dob</i>: {{Customer.DateOfBirth | formatDate2}}</p></td>
              </tr>
              <tr>
                <td colspan="3"><p>Địa chỉ/ <i>Address</i>: {{Customer.Address}}</p></td>
              </tr>
              <tr>
                <td colspan="3"><p>Khoa/ <i>Department</i>: {{Charge.AreaName}} <span class="ktab"></span> Buồng/ <i>Room</i>: {{Charge.Room}} <span class="ktab"></span> Giường/ <i>Bed</i>: {{Charge.Bed}}</p></td>
              </tr>
              <tr>
                <td colspan="3"><p>Yêu cầu xét nghiệm/ <i>Test required</i>: {{__label(data.Service)}} ({{(data.Service.Code)}})</p></td>
              </tr>
              <tr>
                <td colspan="3"><p>Vị trí lấy bệnh phẩm/ <i>Position of sample</i>: {{data.Pathology.SiteOfSpecimen}}</p></td>
              </tr>
              <tr v-if="title" >
                <td colspan="3"><p>Ngày và giờ lấy mẫu/ <i>Date and time specimen collected</i>: {{data.Pathology.CollectionTime}}</p></td>
              </tr>
              <tr v-else>
                <td colspan="3"><p>Ngày giờ lấy mẫu/ <i>Date and time of specimen collection</i>: {{data.Pathology.CollectionTime}}</p></td>
              </tr>
              <tr>
                <td colspan="3"><p>Tóm tắt dấu hiệu lâm sàng chính và các xét nghiệm khác/ <i>Key signs {{'&'}} symtoms and other tests</i>: {{data.Pathology.ClinicalHistoryAndLabTests}}</p></td>
              </tr>
              <tr>
                <td colspan="3"><p>Quá trình điều trị/ <i>Treament process</i>: {{data.Pathology.Treatment}}</p></td>
              </tr>
              <tr>
                <td colspan="3"><p>Nhận xét về bệnh phẩm/ <i>Sample description</i>: {{data.Pathology.GrosDescription}}</p></td>
              </tr>
              <tr>
                <td colspan="3"><p>Kết quả sinh thiết lần trước (nếu có)/ <i>Previous results (if any)</i>: {{data.Pathology.PreviousResults}}</p></td>
              </tr>
              <tr>
                <td colspan="3"><p>Chẩn đoán lâm sàng/ <i>Clinical diagnosis</i>: {{data.Pathology.ClinicalDiagnosis}}</p></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table width="100%">
              <tr>
                <td width="60%">
                </td>
                <td>
                  <div class="text-center no-wrap"><b>Ngày/ Date:</b> {{data.CreatedAt | formatDate2}}</div>
                  <div class="text-center no-wrap"><b>BÁC SĨ/ <i>CLINICIAN</i></b></div>
                  <br/>
                  <br/><br/>
                  <div class="text-center no-wrap"><b>{{User.Fullname}}</b></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div class="page-footer" style="font-size: 14px;">
              <br/>
              <p v-if="title">A01_104_110321_VE<br/><span style="color: transparent">vinmec</span></p>
              <p v-else>A01_103_110321_VE<br/><span style="color: transparent">vinmec</span></p>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import VueBarcode from 'vue-barcode'
import constants from '@/constants'
export default {
  name: 'PathologyPrint002',
  props: ['data', 'Customer', 'User', 'Charge', 'title'],
  components: {
    VueBarcode
  },
  data () {
    return {
      GENDERS: constants.GENDERS
    }
  }
}
</script>
