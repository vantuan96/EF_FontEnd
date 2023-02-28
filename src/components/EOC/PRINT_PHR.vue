<template>
  <div id="A4PrintPage" v-if="TMPMASTERDATA">
    <section class="sheet padding-10mm">
      <article>
        <table>
          <tr>
            <td valign="top"><img src="/static/Logo%20Vinmec%20International%20Hospitall%201.png" /></td>
            <td align="center">
              <h2>BIÊN BẢN BÀN GIAO NGƯỜI BỆNH CHUYỂN KHOA</h2>
              <h2><i>PATIENT HAND OVER RECORD</i></h2>
              <p class="no-margin">Do bác sĩ hoàn thành/ <i>completed by doctor</i></p>
              <p class="note-text"><b>Lưu ý:</b> Không áp dụng biểu mẫu này trong trường hợp bác sỹ bàn giao cũng là bác sĩ tiếp nhận trên khoa</p>
              <p class="note-text"><b>Note:</b> The form is not required if doctor from handover unit and receiving unit is the same person</p>
            </td>
          </tr>
        </table>
        <table class="tableboder">
          <tr>
            <th colspan="2" align="left">SITUATION - Tình huống</th>
          </tr>
          <tr>
            <td valign="top">
              <p><b>Lý do chuyển/ <i>Reason for transfer</i>:</b> {{data.ReasonForTransfer}}</p>
            </td>
            <td width="35%">
              <p class="no-margin"><b>Họ tên/<i>Full name</i>:</b> {{data.Fullname}}</p>
              <p class="no-margin"><b>Số PID/<i>PID no</i>:</b> {{data.PID}}</p>
              <p class="no-margin"><b>Ngày tháng năm sinh/<i>D.O.B</i>:</b> {{data.DateOfBirth}}</p>
              <p class="no-margin"><b>Giới tính/<i>Gender</i>:</b> {{data.Gender}}</p>
            </td>
          </tr>
        </table>
        <table class="tableboder">
          <tr>
            <th align="left">BACKGROUND - Diễn biến</th>
          </tr>
          <tr>
            <td valign="top" height="360">
              <p class="no-margin" style="margin-bottom: 5px"><b>1. Lý do nhập viện/ <i>Reason for transfer</i>: </b>{{data.ChiefComplain}}</p>
              <p class="no-margin" style="margin-bottom: 5px">
                <b>2. Diễn biến bệnh/ <i>Clinical evolution</i></b>:
                Bệnh sử: {{data.History}}
                Thăm khám: {{data.ClinicalExaminationAndFindings}}
              </p>
              <p><b>{{__t('Kết quả cận lâm sàng')}}:</b> {{data.ResultOfParaclinicalTests}}</p>
              <p><b>{{__t('PHR.chuan_doan')}}: </b>{{data.Diagnosis}}</p>
              <p><b>{{__t('Đã can thiệp')}}: </b>{{data.TreatmentAndProcedures}} .<template v-if="data.SignificantMedications">Các thuốc chính đã dùng: {{data.SignificantMedications}}</template></p>
            </td>
          </tr>
          <tr>
            <th align="left">ASSESSMENT - Đánh giá</th>
          </tr>
          <tr>
            <td valign="top" height="90px">
              <p class="no-margin"><b>5. Tình trạng hiện tại/ <i>Current condition</i>:</b> {{data.CurrentStatus}}</p>
            </td>
          </tr>
          <tr>
            <th align="left">RECOMMENDATION - Đề xuất</th>
          </tr>
          <tr>
            <td valign="top" height="60px">
              <p class="no-margin"><b>6. Kế hoạch tiếp theo/ <i>Recommendation</i>:</b> {{data.FollowupCarePlan}}</p>
            </td>
          </tr>
          <tr>
            <td valign="top">
              <p class="no-margin only-web-page"><b>7. Thời gian bàn giao/ <i>Hand over time</i>:</b> {{data.HandOverTimePhysician}}</p>
              <p class="no-margin only-print-app"><b>7. Thời gian bàn giao/ <i>Hand over time</i>:</b> {{datetimenow}}</p>
            </td>
          </tr>
        </table>
        <table class="tableboder">
          <tr>
            <td width="50%">
              NƠI BÀN GIAO/ <i>HAND OVER UNIT</i>
              <p class="no-margin">{{__label(data.HandOverUnitPhysician)}}</p>
            </td>
            <td width="50%">
              NƠI NHẬN/ <i>RECEVING UNIT</i>
              <p class="no-margin">{{data.ReceivingUnitPhysician}}</p>
            </td>
          </tr>
            <tr>
              <td width="50%" height="120" valign="top">
                Bác sĩ/ <i>Physician</i>: {{data.HandOverPhysician.Fullname}}
                <p class="no-margin">Ký ghi rõ họ tên</p>
              </td>
              <td width="50%" valign="top">
                Bác sĩ/ <i>Physician</i>: {{data.ReceivingPhysician}}
                <p class="no-margin">Ký ghi rõ họ tên</p>
              </td>
            </tr>
        </table>
        <p style="font-size: 12px">A03_008_050919_VE</p>
      </article>
    </section>
    <section class="sheet padding-10mm">
      <article class="font12">
        <table>
          <tr>
            <td align="center">
              <h3 style="font-size: 18px">BẢNG KIỂM BÀN GIAO NGƯỜI BỆNH CHUYỂN KHOA/HAND OVER CHECKLIST</h3>
              <p class="note-text">Do điều dưỡng hoàn thành/ <i>Completed by nurse</i></p>
            </td>
          </tr>
        </table>
        <table class="tableboder">
          <tr>
            <th align="left">Situation - Tình huống</th>
            <td rowspan="5" width="120"></td>
          </tr>
          <tr>
            <td>Tên, ngày sinh, PID người bệnh/ <i>Patient's name, DOB, PID</i>: {{data.Fullname}}, {{data.DateOfBirth}}, {{data.PID}} </td>
          </tr>
          <tr>
            <td>Chẩn đoán<i>/ Diagnosis</i>: {{DataSubmit.Diagnosis}} </td>
          </tr>
          <tr>
            <td>Tên bác sĩ điều trị/ <i>Physician</i>: {{DataSubmit.Physician}}</td>
          </tr>
          <tr>
            <td><p>Lý do chuyển/ <i>Reason for transfer</i>: {{DataSubmit.ReasonForTransfer}}</p></td>
          </tr>
        </table>
        <table class="tableboder">
          <tr>
            <td width="30%">Nội dung/Content</td>
            <td width="1">Yes</td>
            <td width="1">No</td>
            <td>
              Điền thông tin chi tiết (nếu cần)/ Fill up detailed information (if necessary)
            </td>
          </tr>
          <tr>
            <th align="left" colspan="4">Background - Diễn biến</th>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCALL']">
            <td>{{TMPMASTERDATA['HOCALL'].ViName}}/ <i>{{TMPMASTERDATA['HOCALL'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCALL'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio' && item.ViName !== 'Không xác định'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCALL'].Items" >
                <span :key="index" v-if="item.Value && item.ViName === 'Không xác định'">
                  {{item.ViName}}
                </span>
              </template>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCALL'].Items">
                <span :key="index" v-if="item.DataType === 'Text'">
                  <template v-if="item.Value">, {{item.Value}}</template>
                </span>
                <span :key="index" v-if="item.DataType === 'Select'">
                  <template v-if="item.Value"><allergies-select v-model="item.Value" :view="true" :multi="true" :items="JSON.parse(item.Data)"/></template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCICI']">
            <td>{{TMPMASTERDATA['HOCICI'].ViName}}/ <i>{{TMPMASTERDATA['HOCICI'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCICI'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCICI'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox' || item.DataType === 'CheckBox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
                <span class="w-30" :key="index" v-if="item.DataType === 'Text'">
                  {{item.Value ? '(' + item.Value + ')' : ''}}
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCRS0']">
            <td>{{TMPMASTERDATA['HOCRS0'].ViName}}/ <i>{{TMPMASTERDATA['HOCRS0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCRS0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCRS0'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCCLC']">
            <td>{{TMPMASTERDATA['HOCCLC'].ViName}}/ <i>{{TMPMASTERDATA['HOCCLC'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCCLC'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCCLC'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCPL0']">
            <td>{{TMPMASTERDATA['HOCPL0'].ViName}}/ <i>{{TMPMASTERDATA['HOCPL0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCPL0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCPL0'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCAC0']">
            <td>{{TMPMASTERDATA['HOCAC0'].ViName}}/ <i>{{TMPMASTERDATA['HOCAC0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCAC0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCAC0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCOPC']">
            <td>{{TMPMASTERDATA['HOCOPC'].ViName}}/ <i>{{TMPMASTERDATA['HOCOPC'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOPC'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOPC'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCSS0']">
            <td>{{TMPMASTERDATA['HOCSS0'].ViName}}/ <i>{{TMPMASTERDATA['HOCSS0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCSS0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCSS0'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCDRA']">
            <td>{{TMPMASTERDATA['HOCDRA'].ViName}}/ <i>{{TMPMASTERDATA['HOCDRA'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCDRA'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCDRA'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
                <span class="w-30" :key="index" v-if="item.DataType === 'Text'">
                  {{item.Value ? '(' + item.Value + ')' : ''}}
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCCBG']">
            <td>{{TMPMASTERDATA['HOCCBG'].ViName}}/ <i>{{TMPMASTERDATA['HOCCBG'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCCBG'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCCBG'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCID0']">
            <td>{{TMPMASTERDATA['HOCID0'].ViName}}/ <i>{{TMPMASTERDATA['HOCID0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCID0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCID0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCDR0']">
            <td>{{TMPMASTERDATA['HOCDR0'].ViName}}/ <i>{{TMPMASTERDATA['HOCDR0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCDR0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCDR0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr>
            <th colspan="4" align="left">Assesment - Đánh giá</th>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCVS0']">
            <td>{{TMPMASTERDATA['HOCVS0'].ViName}}/ <i>{{TMPMASTERDATA['HOCVS0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCVS0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCVS0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCFR0']">
            <td>{{TMPMASTERDATA['HOCFR0'].ViName}}/ <i>{{TMPMASTERDATA['HOCFR0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCFR0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCFR0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCPAI']" class="borded-bottom">
            <td width="20%">{{TMPMASTERDATA['HOCPAI'].ViName}}/ <i>{{TMPMASTERDATA['HOCPAI'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCPAI'].Items">
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
              <td :key="index" v-else style="flex-grow: 1;">
                {{item.Value}}
              </td>
            </template>
            <td>
              <div class="group-radio">
                <div style="flex-grow: 1;" v-if="TMPMASTERDATA['HOCPS0']">
                  {{TMPMASTERDATA['HOCPS0'].ViName}}/ <i>{{TMPMASTERDATA['HOCPS0'].EnName}}</i>:
                  <span :key="index" :data="item" v-for="(item,index) in TMPMASTERDATA['HOCPS0'].Items">
                    {{item.Value}}
                  </span>
                </div>
              </div>
              <div v-if="TMPMASTERDATA['HOCRP0'] && TMPMASTERDATA['HOCRP0'].Items[0].Value">
                {{TMPMASTERDATA['HOCRP0'].ViName}}/ <i>{{TMPMASTERDATA['HOCRP0'].EnName}}</i>:
                <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCRP0'].Items">
                  <span class="w-30" :key="index" v-if="checkString(item.DataType, 'CheckBox') && TMPMASTERDATA['HOCRP0'].Items[0].Value">
                    <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                  </span>
                </template>
              </div>
              <div v-if="MASTERDATA['HOCRP0'].Items[8].Value">
                <template :data="item" v-for="(item, index) in MASTERDATA['HOCRP0'].Items">
                  <template v-if="checkString(item.DataType, 'text')">
                    {{item.ViName}}/ <i :key="index">{{item.EnName}}</i>: {{item.Value}}
                  </template>
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCCON']">
            <td>{{TMPMASTERDATA['HOCCON'].ViName}}/ <i>{{TMPMASTERDATA['HOCCON'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCCON'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCCON'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCOSS']">
            <td>{{TMPMASTERDATA['HOCOSS'].ViName}}/ <i>{{TMPMASTERDATA['HOCOSS'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOSS'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOSS'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr>
            <th colspan="4" align="left">Recommendation - Đề xuất</th>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCFUC']">
            <td>{{TMPMASTERDATA['HOCFUC'].ViName}}/ <i>{{TMPMASTERDATA['HOCFUC'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCFUC'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCFUC'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCMO0']">
            <td>{{TMPMASTERDATA['HOCMO0'].ViName}}/ <i>{{TMPMASTERDATA['HOCMO0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCMO0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCMO0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCWOU']">
            <td>{{TMPMASTERDATA['HOCWOU'].ViName}}/ <i>{{TMPMASTERDATA['HOCWOU'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCWOU'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCWOU'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCBLE']">
            <td>{{TMPMASTERDATA['HOCBLE'].ViName}}/ <i>{{TMPMASTERDATA['HOCBLE'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCBLE'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCBLE'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCPDT']">
            <td>{{TMPMASTERDATA['HOCPDT'].ViName}}/ <i>{{TMPMASTERDATA['HOCPDT'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCPDT'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCPDT'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCPP0']">
            <td>{{TMPMASTERDATA['HOCPP0'].ViName}}/ <i>{{TMPMASTERDATA['HOCPP0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCPP0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCPP0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCMR0']">
            <td>{{TMPMASTERDATA['HOCMR0'].ViName}}/ <i>{{TMPMASTERDATA['HOCMR0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCMR0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCMR0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCOTH']">
            <td>{{TMPMASTERDATA['HOCOTH'].ViName}}/ <i>{{TMPMASTERDATA['HOCOTH'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOTH'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOTH'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCOT2'] && IPDHOCOTCount > 0">
            <td>
              <span v-if="TMPMASTERDATA['HOCOT2'].Items[0].Value">{{TMPMASTERDATA['HOCOT2'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden-text text</span>
            </td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOT2'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOT2'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCOT3'] && IPDHOCOTCount > 1">
            <td>
              <span v-if="TMPMASTERDATA['HOCOT3'].Items[0].Value">{{TMPMASTERDATA['HOCOT3'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden text</span>
            </td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOT3'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOT3'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCOT4'] && IPDHOCOTCount > 2">
            <td>
              <span v-if="TMPMASTERDATA['HOCOT4'].Items[0].Value">{{TMPMASTERDATA['HOCOT4'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden text</span>
            </td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOT4'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOT4'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['HOCOT5'] && IPDHOCOTCount > 3">
            <td>
              <span v-if="TMPMASTERDATA['HOCOT5'].Items[0].Value">{{TMPMASTERDATA['HOCOT5'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden text</span>
            </td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOT5'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['HOCOT5'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
        </table>
        <table class="tableboder">
          <tr>
            <td colspan="2">
              <p class="no-margin only-web-page"><b>Giờ - ngày/ <i>Time - Date</i>: </b>{{DataSubmit.HandOverTimeNurse | formatDateTimeObj}}</p>
              <p class="no-margin only-print-app"><b>Giờ - ngày/ <i>Time - Date</i>: </b> {{datetimenow}}</p>
            </td>
          </tr>
          <tr>
            <td width="50%">
              <b>Nơi bàn giao/ <i>Hand over unit:</i></b> {{DataSubmit.HandOverUnitNurse}}
            </td>
            <td>
              <b>Nơi nhận/ <i>Receiving unit:</i></b> {{DataSubmit.ReceivingUnitNurse}}
            </td>
          </tr>
          <tr>
            <td width="50%">
              <b>Người giao/ <i>Hand over from:</i></b> {{DataSubmit.HandOverNurse}}
            </td>
            <td>
              <b>Người nhận/ <i>Hand over to:</i></b> {{DataSubmit.ReceivingNurse}}
            </td>
          </tr>
        </table>
        <p style="font-size: 12px">A03_008_050919_VE</p>
      </article>
    </section>
    <!-- <section class="sheet padding-10mm">
      <article>This is an A4 document.</article>
    </section> -->
  </div>
</template>
<script>
import Vlabel from '@/components/LabelWithLangs'
import VSelectView from '@/components/VSelectDisplay.vue'
export default {
  name: 'print-phc',
  props: ['data', 'DataSubmit', 'MASTERDATA'],
  components: {
    Vlabel,
    VSelectView
  },
  data () {
    return {
      TMPMASTERDATA: null,
      IPDHOCOTCount: 0
    }
  },
  created () {
    this.TMPMASTERDATA = this.cloneObj(this.MASTERDATA)
    this.setIPDHOCOTCount()
    var obj = {}
    for (const property in this.TMPMASTERDATA) {
      if (this.TMPMASTERDATA[property].Items) {
        this.TMPMASTERDATA[property].Items.forEach(item => {
          obj[item.Code] = item.Value
        })
      }
    }
    if (!obj['HOCPAIYES']) {
      this.resetData('HOCPS0')
    }
  },
  methods: {
    setIPDHOCOTCount () {
      this.IPDHOCOTCount = this.TMPMASTERDATA['HOCOT6'].Items[0].Value
    },
    resetData (key) {
      this.TMPMASTERDATA[key].Items.forEach(item => {
        item.Value = null
      })
    }
  }
}
</script>
