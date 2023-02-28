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
                <!-- Tiền sử: {{data.PastHealthHistory}}<br/> -->
                Bệnh sử: {{data.History}}
                Thăm khám:
              </p>
              <!-- <template v-if="data.IsTelehealth">
                <p class="no-margin" style="margin-bottom: 5px">{{data.ClinicalExaminationAndFindings}}</p>
              </template> -->
              <template>
                <p v-if="item.Code !== 'OPDOENTUOI519' && item.Code !== 'OPDOENTUOI19' && item.Code !== 'OPDOENTUOI5'" class="no-margin" style="margin-bottom: 5px" :data="item" :key="index" v-for="(item ,index) in data.ClinicalExaminationAndFindings">+ <span>{{item.ViName}}: {{item.Value}}</span></p>
              </template>
              <p class="no-margin" style="margin-bottom: 5px"><b>3. Chẩn đoán/ <i>Diagnosis</i>:</b> {{data.Diagnosis}}</p>
              <p class="no-margin" style="margin-bottom: 5px">
                <b>4. Đã can thiệp/ <i>Recent interventions</i>:</b> {{data.TreatmentAndProcedures}}. <br/> {{data.SignificantMedications}}
              </p>
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
              <p class="no-margin">{{data.HandOverUnitPhysician}}</p>
            </td>
            <td width="50%">
              NƠI NHẬN/ <i>RECEVING UNIT</i>
              <p class="no-margin">{{data.ReceivingUnitPhysician}}</p>
            </td>
          </tr>
            <tr>
              <td width="50%" height="120" valign="top">
                Bác sĩ/ <i>Physician</i>: {{data.HandOverPhysician}}
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
          <tr v-if="TMPMASTERDATA['OPDHOCALL']">
            <td>{{TMPMASTERDATA['OPDHOCALL'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCALL'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCALL'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio' && item.ViName !== 'Không xác định'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCALL'].Items" >
                <span :key="index" v-if="item.Value && item.ViName === 'Không xác định'">
                  {{item.ViName}}
                </span>
              </template>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCALL'].Items">
                <span :key="index" v-if="item.DataType === 'Text'">
                  <template v-if="item.Value">, {{item.Value}}</template>
                </span>
                <span :key="index" v-if="item.DataType === 'Select'">
                  <template v-if="item.Value"><allergies-select v-model="item.Value" :view="true" :multi="true" :items="JSON.parse(item.Data)"/></template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCICI']">
            <td>{{TMPMASTERDATA['OPDHOCICI'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCICI'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCICI'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCICI'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox' || item.DataType === 'CheckBox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
                <span class="w-30" :key="index" v-if="item.DataType === 'Text'">
                  {{item.Value ? '(' + item.Value + ')' : ''}}
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCRS0']">
            <td>{{TMPMASTERDATA['OPDHOCRS0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCRS0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCRS0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCRS0'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCCLC']">
            <td>{{TMPMASTERDATA['OPDHOCCLC'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCCLC'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCCLC'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCCLC'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCPL0']">
            <td>{{TMPMASTERDATA['OPDHOCPL0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCPL0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCPL0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCPL0'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCAC0']">
            <td>{{TMPMASTERDATA['OPDHOCAC0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCAC0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCAC0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCAC0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCOPC']">
            <td>{{TMPMASTERDATA['OPDHOCOPC'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCOPC'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOPC'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOPC'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCSS0']">
            <td>{{TMPMASTERDATA['OPDHOCSS0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCSS0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCSS0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCSS0'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCDRA']">
            <td>{{TMPMASTERDATA['OPDHOCDRA'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCDRA'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCDRA'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCDRA'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
                <span class="w-30" :key="index" v-if="item.DataType === 'Text'">
                  {{item.Value ? '(' + item.Value + ')' : ''}}
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCCBG']">
            <td>{{TMPMASTERDATA['OPDHOCCBG'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCCBG'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCCBG'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCCBG'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCID0']">
            <td>{{TMPMASTERDATA['OPDHOCID0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCID0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCID0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCID0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCDR0']">
            <td>{{TMPMASTERDATA['OPDHOCDR0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCDR0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCDR0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCDR0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr>
            <th colspan="4" align="left">Assesment - Đánh giá</th>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCVS0']">
            <td>{{TMPMASTERDATA['OPDHOCVS0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCVS0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCVS0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCVS0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCFR0']">
            <td>{{TMPMASTERDATA['OPDHOCFR0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCFR0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCFR0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCFR0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCPAI']" class="borded-bottom">
            <td width="20%">{{TMPMASTERDATA['OPDHOCPAI'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCPAI'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCPAI'].Items">
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
              <td :key="index" v-else style="flex-grow: 1;">
                {{item.Value}}
              </td>
            </template>
            <td>
              <div class="group-radio">
                <div style="flex-grow: 1;" v-if="TMPMASTERDATA['OPDHOCPS0']">
                  {{TMPMASTERDATA['OPDHOCPS0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCPS0'].EnName}}</i>:
                  <span :key="index" :data="item" v-for="(item,index) in TMPMASTERDATA['OPDHOCPS0'].Items">
                    {{item.Value}}
                  </span>
                </div>
              </div>
              <div v-if="TMPMASTERDATA['OPDHOCRP0'] && TMPMASTERDATA['OPDHOCRP0'].Items[0].Value">
                {{TMPMASTERDATA['OPDHOCRP0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCRP0'].EnName}}</i>:
                <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCRP0'].Items">
                  <span class="w-30" :key="index" v-if="checkString(item.DataType, 'CheckBox') && TMPMASTERDATA['OPDHOCRP0'].Items[0].Value">
                    <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                  </span>
                </template>
              </div>
              <div v-if="MASTERDATA['OPDHOCRP0'].Items[8].Value">
                <template :data="item" v-for="(item, index) in MASTERDATA['OPDHOCRP0'].Items">
                  <template v-if="checkString(item.DataType, 'text')">
                    {{item.ViName}}/ <i :key="index">{{item.EnName}}</i>: {{item.Value}}
                  </template>
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCCON']">
            <td>{{TMPMASTERDATA['OPDHOCCON'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCCON'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCCON'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCCON'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCOSS']">
            <td>{{TMPMASTERDATA['OPDHOCOSS'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCOSS'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOSS'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOSS'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr>
            <th colspan="4" align="left">Recommendation - Đề xuất</th>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCFUC']">
            <td>{{TMPMASTERDATA['OPDHOCFUC'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCFUC'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCFUC'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCFUC'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCMO0']">
            <td>{{TMPMASTERDATA['OPDHOCMO0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCMO0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCMO0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCMO0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCWOU']">
            <td>{{TMPMASTERDATA['OPDHOCWOU'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCWOU'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCWOU'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCWOU'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCBLE']">
            <td>{{TMPMASTERDATA['OPDHOCBLE'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCBLE'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCBLE'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCBLE'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCPDT']">
            <td>{{TMPMASTERDATA['OPDHOCPDT'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCPDT'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCPDT'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCPDT'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCPP0']">
            <td>{{TMPMASTERDATA['OPDHOCPP0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCPP0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCPP0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCPP0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCMR0']">
            <td>{{TMPMASTERDATA['OPDHOCMR0'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCMR0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCMR0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCMR0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCOTH']">
            <td>{{TMPMASTERDATA['OPDHOCOTH'].ViName}}/ <i>{{TMPMASTERDATA['OPDHOCOTH'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOTH'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOTH'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCOT2'] && IPDHOCOTCount > 0">
            <td>
              <span v-if="TMPMASTERDATA['OPDHOCOT2'].Items[0].Value">{{TMPMASTERDATA['OPDHOCOT2'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden-text text</span>
            </td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOT2'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOT2'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCOT3'] && IPDHOCOTCount > 1">
            <td>
              <span v-if="TMPMASTERDATA['OPDHOCOT3'].Items[0].Value">{{TMPMASTERDATA['OPDHOCOT3'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden text</span>
            </td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOT3'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOT3'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCOT4'] && IPDHOCOTCount > 2">
            <td>
              <span v-if="TMPMASTERDATA['OPDHOCOT4'].Items[0].Value">{{TMPMASTERDATA['OPDHOCOT4'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden text</span>
            </td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOT4'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOT4'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['OPDHOCOT5'] && IPDHOCOTCount > 3">
            <td>
              <span v-if="TMPMASTERDATA['OPDHOCOT5'].Items[0].Value">{{TMPMASTERDATA['OPDHOCOT5'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden text</span>
            </td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOT5'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['OPDHOCOT5'].Items">
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
      CODE2: ['SSASG0', 'SSALG0', 'SSASG1', 'SSALAP', 'SSAMEC', 'SSASPH', 'SSALNG', 'SSASNG', 'SSAENT', 'SSAOTH', 'SSAINS', 'SSASM0', 'SSANEE', 'SSASB1', 'SSASI0', 'SSAIPA'],
      CODE3: ['SSAIP1', 'SSAIP2', 'SSAIP3'],
      TMPMASTERDATA: null,
      IPDHOCOTCount: 0
    }
  },
  created () {
    this.TMPMASTERDATA = this.cloneObj(this.MASTERDATA)
    var obj = {}
    for (const property in this.TMPMASTERDATA) {
      if (this.TMPMASTERDATA[property].Items) {
        this.TMPMASTERDATA[property].Items.forEach(item => {
          obj[item.Code] = item.Value
        })
      }
    }
    if (!obj['OPDHOCPAIYES']) {
      this.resetData('OPDHOCPS0')
    }
    setTimeout(() => {
      this.setIPDHOCOTCount()
    }, 100)
  },
  methods: {
    setIPDHOCOTCount () {
      this.IPDHOCOTCount = this.TMPMASTERDATA['OPDHOCOT6'] ? this.TMPMASTERDATA['OPDHOCOT6'].Items[0].Value : 0
    },
    resetData (key) {
      this.TMPMASTERDATA[key].Items.forEach(item => {
        item.Value = null
      })
    },
    PHCXUSANS (l) {
      try {
        var data = []
        var arr = this.TMPMASTERDATA['OPDPHCXUS'].Items[4].Value
        arr.forEach(element => {
          if (l === 'vi') {
            data.push(element.label)
          } else {
            data.push(element.enlabel)
          }
        })
        var str = data.toString()
        return str || '..................'
      } catch (error) {
        return ''
      }
    }
  }
}
</script>
