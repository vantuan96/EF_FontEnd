<template>
  <div id="A4PrintPage">
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
              <div class="no-margin" style="margin-bottom: 5px">
                <b>2. Diễn biến bệnh/ <i>Clinical evolution</i></b>:
                <!-- Tiền sử: {{data.PastHealthHistory}}<br/> -->
                <p>Bệnh sử: {{data.History}}</p>
                Thăm khám:
                <div style="padding-left: 5px;">
                  <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.Assessment">+ <span>{{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</span></p>
                </div>
              </div>
              <p class="no-margin" style="margin-bottom: 5px"><b>3. Kết quả cận lâm sàng/ <i>Result of paraclinical tests</i>:</b> {{data.ResultOfParaclinicalTests}}</p>
              <p class="no-margin" style="margin-bottom: 5px"><b>4. Chẩn đoán/ <i>Diagnosis</i>:</b> {{data.Diagnosis}}</p>
              <p class="no-margin" style="margin-bottom: 5px">
                <b>5. Đã can thiệp/ <i>Recent interventions</i>:</b> {{data.TreatmentAndProcedures}}. {{data.SignificantMedications}}
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
        <p style="font-size: 12px">VM-DD-V3-024</p>
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
          <tr v-if="MASTERDATA['HOCALL']">
            <td>{{MASTERDATA['HOCALL'].ViName}}/ <i>{{MASTERDATA['HOCALL'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCALL'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio' && item.ViName !== 'Không xác định'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCALL'].Items" >
                <span :key="index" v-if="item.Value && item.ViName === 'Không xác định'">
                  {{item.ViName}}
                </span>
              </template>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCALL'].Items">
                <span :key="index" v-if="item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
                <span :key="index" v-if="item.DataType === 'Select'">
                  <template v-if="item.Value"><allergies-select :view="true" v-model="item.Value" :items="JSON.parse(item.Data)"/>,</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCICI']">
            <td>{{MASTERDATA['HOCICI'].ViName}}/ <i>{{MASTERDATA['HOCICI'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCICI'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCICI'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox' || item.DataType === 'CheckBox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
                <span class="w-30" :key="index" v-if="item.DataType === 'Text'">
                  {{item.Value ? '(' + item.Value + ')' : ''}}
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCRS0']">
            <td>{{MASTERDATA['HOCRS0'].ViName}}/ <i>{{MASTERDATA['HOCRS0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCRS0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCRS0'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCCLC']">
            <td>{{MASTERDATA['HOCCLC'].ViName}}/ <i>{{MASTERDATA['HOCCLC'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCCLC'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCCLC'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCPL0']">
            <td>{{MASTERDATA['HOCPL0'].ViName}}/ <i>{{MASTERDATA['HOCPL0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPL0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPL0'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCAC0']">
            <td>{{MASTERDATA['HOCAC0'].ViName}}/ <i>{{MASTERDATA['HOCAC0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCAC0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCAC0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCOPC']">
            <td>{{MASTERDATA['HOCOPC'].ViName}}/ <i>{{MASTERDATA['HOCOPC'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOPC'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOPC'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCSS0']">
            <td>{{MASTERDATA['HOCSS0'].ViName}}/ <i>{{MASTERDATA['HOCSS0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCSS0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCSS0'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCDRA']">
            <td>{{MASTERDATA['HOCDRA'].ViName}}/ <i>{{MASTERDATA['HOCDRA'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCDRA'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCDRA'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
                <span class="w-30" :key="index" v-if="item.DataType === 'Text'">
                  {{item.Value ? '(' + item.Value + ')' : ''}}
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCCBG']">
            <td>{{MASTERDATA['HOCCBG'].ViName}}/ <i>{{MASTERDATA['HOCCBG'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCCBG'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCCBG'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCID0']">
            <td>{{MASTERDATA['HOCID0'].ViName}}/ <i>{{MASTERDATA['HOCID0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCID0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCID0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCDR0']">
            <td>{{MASTERDATA['HOCDR0'].ViName}}/ <i>{{MASTERDATA['HOCDR0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCDR0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCDR0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr>
            <th colspan="4" align="left">Assesment - Đánh giá</th>
          </tr>
          <tr v-if="MASTERDATA['HOCVS0']">
            <td>{{MASTERDATA['HOCVS0'].ViName}}/ <i>{{MASTERDATA['HOCVS0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCVS0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCVS0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCFR0']">
            <td>{{MASTERDATA['HOCFR0'].ViName}}/ <i>{{MASTERDATA['HOCFR0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCFR0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCFR0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCPAI']" class="borded-bottom">
            <td width="20%">{{MASTERDATA['HOCPAI'].ViName}}/ <i>{{MASTERDATA['HOCPAI'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPAI'].Items">
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
              <td :key="index" v-else style="flex-grow: 1;">
                {{item.Value}}
              </td>
            </template>
            <td>
              <div class="group-radio">
                <div style="flex-grow: 1;" v-if="MASTERDATA['HOCPS0']">
                  {{MASTERDATA['HOCPS0'].ViName}}/ <i>{{MASTERDATA['HOCPS0'].EnName}}</i>:
                  <span :key="index" :data="item" v-for="(item,index) in MASTERDATA['HOCPS0'].Items">
                    {{item.Value}}
                  </span>
                </div>
              </div>
              <div v-if="MASTERDATA['HOCRP0'] && MASTERDATA['HOCRP0'].Items[0].Value">
                {{MASTERDATA['HOCRP0'].ViName}}/ <i>{{MASTERDATA['HOCRP0'].EnName}}</i>:
                <template :data="item"  v-for="(item,index) in MASTERDATA['HOCRP0'].Items">
                  <span class="w-30" :key="index" v-if="checkString(item.DataType, 'CheckBox') && MASTERDATA['HOCRP0'].Items[0].Value">
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
          <tr v-if="MASTERDATA['HOCCON']">
            <td>{{MASTERDATA['HOCCON'].ViName}}/ <i>{{MASTERDATA['HOCCON'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCCON'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCCON'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCOSS']">
            <td>{{MASTERDATA['HOCOSS'].ViName}}/ <i>{{MASTERDATA['HOCOSS'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOSS'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOSS'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr>
            <th colspan="4" align="left">Recommendation - Đề xuất</th>
          </tr>
          <tr v-if="MASTERDATA['HOCFUC']">
            <td>{{MASTERDATA['HOCFUC'].ViName}}/ <i>{{MASTERDATA['HOCFUC'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCFUC'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCFUC'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCMO0']">
            <td>{{MASTERDATA['HOCMO0'].ViName}}/ <i>{{MASTERDATA['HOCMO0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCMO0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCMO0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCWOU']">
            <td>{{MASTERDATA['HOCWOU'].ViName}}/ <i>{{MASTERDATA['HOCWOU'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCWOU'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCWOU'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCBLE']">
            <td>{{MASTERDATA['HOCBLE'].ViName}}/ <i>{{MASTERDATA['HOCBLE'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCBLE'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCBLE'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCPDT']">
            <td>{{MASTERDATA['HOCPDT'].ViName}}/ <i>{{MASTERDATA['HOCPDT'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPDT'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPDT'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCPP0']">
            <td>{{MASTERDATA['HOCPP0'].ViName}}/ <i>{{MASTERDATA['HOCPP0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPP0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCPP0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCMR0']">
            <td>{{MASTERDATA['HOCMR0'].ViName}}/ <i>{{MASTERDATA['HOCMR0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCMR0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCMR0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCOTH']">
            <td>{{MASTERDATA['HOCOTH'].ViName}}/ <i>{{MASTERDATA['HOCOTH'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOTH'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOTH'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCOT2'] && HOCOTHCount > 0">
            <td>
              <span v-if="MASTERDATA['HOCOT2'].Items[0].Value">{{MASTERDATA['HOCOT2'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden-text text</span>
            </td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT2'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT2'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCOT3'] && HOCOTHCount > 1">
            <td>
              <span v-if="MASTERDATA['HOCOT3'].Items[0].Value">{{MASTERDATA['HOCOT3'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden text</span>
            </td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT3'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT3'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCOT4'] && HOCOTHCount > 2">
            <td>
              <span v-if="MASTERDATA['HOCOT4'].Items[0].Value">{{MASTERDATA['HOCOT4'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden text</span>
            </td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT4'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT4'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['HOCOT5'] && HOCOTHCount > 3">
            <td>
              <span v-if="MASTERDATA['HOCOT5'].Items[0].Value">{{MASTERDATA['HOCOT5'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden text</span>
            </td>
            <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT5'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in MASTERDATA['HOCOT5'].Items">
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
              <p class="no-margin only-print-app"><b>Giờ - ngày/ <i>Time - Date</i>: </b>{{datetimenow}}</p>
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
        <p style="font-size: 12px">VM-DD-V3-024</p>
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
      CODE3: ['SSAIP1', 'SSAIP2', 'SSAIP3']
    }
  },
  computed: {
    HOCOTHCount: function () {
      return this.MASTERDATA['HOCOT6'] ? this.MASTERDATA['HOCOT6'].Items[0].Value : 0
    }
  },
  created () {
  },
  methods: {
    PHCXUSANS (l) {
      try {
        var data = []
        var arr = this.MASTERDATA['PHCXUS'].Items[4].Value
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
