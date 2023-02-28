<template>
  <div class="BreakPage p-pos">
    <div class="page-footer" style="font-size: 11px;visibility: hidden;">
    <p>A01_099_110321_VE<br/><span style="color: transparent">vinmec</span></p>
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
                  <div class="text-center" style="font-size: 16pt; text-transform: uppercase;">
                    <div class="text-center"><b>PHIẾU YÊU CẦU XÉT NGHIỆM TẾ BÀO HỌC PHỤ KHOA</b></div>
                    <div class="text-center"><b>GYN CYTOPATHOLOGY TEST REQUEST</b></div>
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
                <td width="200"><p class="no-wrap">Bệnh nhân/ <i>Patient's name</i>:</p></td>
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
                <td colspan="3"><p>Khoa/ <i>Department</i>: {{Charge.AreaName}}</p></td>
              </tr>
              <tr>
                <td colspan="3"><p>Yêu cầu xét nghiệm/ <i>Test required</i>: {{__label(data.Service)}} ({{(data.Service.Code)}})</p></td>
              </tr>
              <tr>
                <td colspan="3"><p>Dung dịch cố định/ <i>Fixative solution</i>: {{(StoreSpecimenWithSolutionOption.find(e => e.code === data.Pathology.StoreSpecimenWithSolution) || {}).label}}</p></td>
              </tr>
              <tr>
                <td colspan="3"><p>Ngày giờ lấy mẫu/ <i>Date and time specimen collection</i>: {{data.Pathology.CollectionTime}}</p></td>
              </tr>
              <tr>
                <td colspan="3">
                  <table class="tbl-b">
                    <tr>
                      <td colspan="2" class="text-center">
                        <b>BỆNH SỬ/ CLINICIAN HISTORY</b>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <p>Chu kỳ kinh nguyệt cuối/ <i>Last menstrual cycle</i>: {{data.Pathology.LatestMenstrualPeriod}}</p>
                        <p>Ngày hành kinh cuối cùng/ <i>Date of last menstrual period</i>: {{data.Pathology.TheLastDayOfLatestMenstrualPeriod}}</p>
                        <p>Sau mạn kinh/ <i>Postmenopausal</i>: {{data.Pathology.PostMenopause}}</p>
                        <p>Kết quả xét nghiệm tế bào học trước đó/ <i>Histology of a Pad test</i>: {{data.Pathology.CervicalCytologyTestHistoryAndTreatmentBefore}}</p>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        Các thông tin khác/ <i>Other information</i>
                      </td>
                    </tr>
                    <tr>
                      <td width="50%">
                        <div v-if="index < 5" :key="index" :data="type" v-for="(type, index) in GynecologicalCytologyTypes">
                          {{index + 1}}. {{type.ViName}}/ <i>{{type.EnName}}</i> {{data.Pathology[type.Key] ? '&#9745;' : '&#9744;'}}
                        </div>
                      </td>
                      <td width="50%">
                        <div v-if="index >= 5" :key="index + 'r'" :data="type" v-for="(type, index) in GynecologicalCytologyTypes">
                          {{index + 1}}. {{type.ViName}}/ <i>{{type.EnName}}</i> {{data.Pathology[type.Key] ? '&#9745;' : '&#9744;'}}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <p>Chẩn đoán lâm sàng/ <i>Clinical diagnosis</i>: {{data.Pathology.ClinicalDiagnosis}}</p>
                      </td>
                    </tr>
                  </table>
                </td>
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
              <p>A01_099_110321_VE<br/><span style="color: transparent">vinmec</span></p>
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
  name: 'PathologyPrint003',
  props: ['data', 'Customer', 'User', 'Charge'],
  components: {
    VueBarcode
  },
  data () {
    return {
      GENDERS: constants.GENDERS,
      GynecologicalCytologyTypes: [
        {
          ViName: 'Dụng cụ tránh thai',
          EnName: 'I.U.D',
          Value: 1,
          Key: 'IsBirthControlMethod'
        },
        {
          ViName: 'Điều trị xạ trị',
          EnName: 'Irradiationa therapy',
          Value: 2,
          Key: 'IsRadiationTheorapy'
        },
        {
          ViName: 'Hậu sản',
          EnName: 'Postpartum',
          Value: 3,
          Key: 'IsPostpartum'
        },
        {
          ViName: 'Điều trị hormone',
          EnName: 'Hormone therapy',
          Value: 4,
          Key: 'IsHormoneTreatment'
        },
        {
          ViName: 'Chảy máu sau mãn kinh',
          EnName: 'Postmenopausal bleeding',
          Value: 5,
          Key: 'IsPostMenopauseBleeding'
        },
        {
          ViName: 'Dùng thuốc tránh thai',
          EnName: 'Birth control pills',
          Value: 6,
          Key: 'IsBirthControlPills'
        },
        {
          ViName: 'Cắt tử cung',
          EnName: 'Hyst',
          Value: 7,
          Key: 'IsUterusremoval'
        },
        {
          ViName: 'Mang thai',
          EnName: 'Pregnant',
          Value: 8,
          Key: 'IsPregnant'
        },
        {
          ViName: 'Đang cho con bú',
          EnName: 'Breastfeeding',
          Value: 9,
          Key: 'IsBreastfeeding'
        }
      ],
      StoreSpecimenWithSolutionOption: [
        {
          label: 'Không',
          code: '0'
        }, {
          label: 'NBF 10%',
          code: '1'
        }, {
          label: 'Cellfix',
          code: '2'
        }, {
          label: 'Cồn 95',
          code: '3'
        }, {
          label: 'Khác',
          code: '4'
        }
      ]
    }
  }
}
</script>
