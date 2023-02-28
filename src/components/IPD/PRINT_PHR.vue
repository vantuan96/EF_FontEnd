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
              <p><b>Lý do chuyển/ <i>Reason for transfer</i>:</b> {{data.ReasonsForTransfer}}</p>
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
              <!-- <p><b>{{__t('PHR.ly_do_vao_vien')}}: </b>{{data.ReasonsForAdmission}}</p>
              <p><b>{{__t('PHR.qua_trinh_benh_ly')}}: </b>{{data.ClinicalEvolution}}</p>
              <p><b>{{__t('PHR.chuan_doan')}}: </b>{{fomartIcd(data.Diagnosis, data.ICDDiagnosis, data.CoMorbidities, data.ICDCoMorbidities)}}</p>
              <p><b>{{__t('PHR.da_can_thiep')}}: </b>{{data.TreatmentsAndProcedures}}.<template v-if="data.SignificantMedications"><br/> Các thuốc chính đã dùng:<br/> {{data.SignificantMedications}}</template></p> -->
              <p class="no-margin" style="margin-bottom: 5px"><b>1. Lý do nhập viện/ <i>Reason for admission</i>: </b>{{data.ReasonsForAdmission}}</p>
              <p class="no-margin" style="margin-bottom: 5px"><b>2. Diễn biến bệnh/ <i>Clinical evolution</i></b>:{{data.ClinicalEvolution}}</p>
              <p class="no-margin" style="margin-bottom: 5px"><b>3. Chẩn đoán/ <i>Diagnosis</i>:</b> {{fomartIcd(data.Diagnosis, data.ICDDiagnosis, data.CoMorbidities, data.ICDCoMorbidities)}}</p>
              <p class="no-margin" style="margin-bottom: 0px!important;padding-bottom: 0px!important;"><b>4. Đã can thiệp/ <i>Recent interventions</i>:</b> {{data.TreatmentsAndProcedures}}</p>
              <p v-if="data.SignificantMedications" style="margin-top: 0px!important;">Các thuốc chính đã dùng: {{data.SignificantMedications}}</p>
            </td>
          </tr>
          <tr>
            <th align="left">ASSESSMENT - Đánh giá</th>
          </tr>
          <tr>
            <td valign="top" height="90px">
              <p class="no-margin"><b>5. Tình trạng hiện tại/ <i>Current condition</i>:</b> {{data.CurrentCondition}}</p>
            </td>
          </tr>
          <tr>
            <th align="left">RECOMMENDATION - Đề xuất</th>
          </tr>
          <tr>
            <td valign="top" height="60px">
              <p class="no-margin"><b>6. Kế hoạch tiếp theo/ <i>Recommendation</i>:</b> {{data.Recommendation}}</p>
            </td>
          </tr>
          <tr>
            <td valign="top">
              <p class="no-margin only-web-page"><b>7. Thời gian bàn giao/ <i>Hand over time</i>:</b> {{data.HandOverTimePhysician}}</p>
              <p class="no-margin only-print-app"><b>7. Thời gian bàn giao/ <i>Hand over time</i>:</b> {{data.HandOverTimePhysician}}</p>
            </td>
          </tr>
        </table>
        <table class="tableboder">
          <tr>
            <td width="50%">
              NƠI BÀN GIAO/ <i>HAND OVER UNIT</i>
              <p class="no-margin">{{data.HandOverUnitPhysician.ViName}}</p>
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
            <td><p>Lý do chuyển/ <i>Reason for transfer</i>: {{data.ReasonsForTransfer}}</p></td>
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
          <tr v-if="TMPMASTERDATA['IPDHOCALL']">
            <td>{{TMPMASTERDATA['IPDHOCALL'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCALL'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCALL'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCALL'].Items">
                <span :key="index" v-if="item.DataType === 'Text'">
                  <template v-if="item.Value">, {{item.Value}}</template>
                </span>
                <span :key="index" v-if="item.DataType === 'Select'">
                  <template v-if="item.Value"><allergies-select v-model="item.Value" :view="true" :multi="true" :items="JSON.parse(item.Data)"/></template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCICI']">
            <td>{{TMPMASTERDATA['IPDHOCICI'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCICI'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCICI'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCICI'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox' || item.DataType === 'CheckBox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
                <span class="w-30" :key="index" v-if="item.DataType === 'Text'">
                  {{item.Value ? '(' + item.Value + ')' : ''}}
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCRS0']">
            <td>{{TMPMASTERDATA['IPDHOCRS0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCRS0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCRS0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCRS0'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCCLC']">
            <td>{{TMPMASTERDATA['IPDHOCCLC'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCCLC'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCCLC'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCCLC'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCPL0']">
            <td>{{TMPMASTERDATA['IPDHOCPL0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCPL0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCPL0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCPL0'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCAC0']">
            <td>{{TMPMASTERDATA['IPDHOCAC0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCAC0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCAC0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCAC0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCOPC']">
            <td>{{TMPMASTERDATA['IPDHOCOPC'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCOPC'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOPC'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOPC'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCSS0']">
            <td>{{TMPMASTERDATA['IPDHOCSS0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCSS0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCSS0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCSS0'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCDRA']">
            <td>{{TMPMASTERDATA['IPDHOCDRA'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCDRA'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCDRA'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCDRA'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
                <span class="w-30" :key="index" v-if="item.DataType === 'Text'">
                  {{item.Value ? '(' + item.Value + ')' : ''}}
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCCBG']">
            <td>{{TMPMASTERDATA['IPDHOCCBG'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCCBG'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCCBG'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCCBG'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCID0']">
            <td>{{TMPMASTERDATA['IPDHOCID0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCID0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCID0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCID0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCDR0']">
            <td>{{TMPMASTERDATA['IPDHOCDR0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCDR0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCDR0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCDR0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr>
            <th colspan="4" align="left">Assesment - Đánh giá</th>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCVS0']">
            <td>{{TMPMASTERDATA['IPDHOCVS0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCVS0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCVS0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCVS0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCFR0']">
            <td>{{TMPMASTERDATA['IPDHOCFR0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCFR0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCFR0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCFR0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCPAI']" class="borded-bottom">
            <td width="20%">{{TMPMASTERDATA['IPDHOCPAI'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCPAI'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCPAI'].Items">
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
              <td :key="index" v-else style="flex-grow: 1;">
                {{item.Value}}
              </td>
            </template>
            <td>
              <div class="group-radio">
                <div style="flex-grow: 1;" v-if="TMPMASTERDATA['IPDHOCPS0']">
                  {{TMPMASTERDATA['IPDHOCPS0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCPS0'].EnName}}</i>:
                  <span :key="index" :data="item" v-for="(item,index) in TMPMASTERDATA['IPDHOCPS0'].Items">
                    {{item.Value}}
                  </span>
                </div>
              </div>
              <div v-if="TMPMASTERDATA['IPDHOCRP0'] && TMPMASTERDATA['IPDHOCRP0'].Items[0].Value">
                {{TMPMASTERDATA['IPDHOCRP0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCRP0'].EnName}}</i>:
                <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCRP0'].Items">
                  <span class="w-30" :key="index" v-if="checkString(item.DataType, 'CheckBox') && TMPMASTERDATA['IPDHOCRP0'].Items[0].Value">
                    <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                  </span>
                </template>
              </div>
              <div v-if="MASTERDATA['IPDHOCRP0'].Items[8].Value">
                <template :data="item" v-for="(item, index) in MASTERDATA['IPDHOCRP0'].Items">
                  <template v-if="checkString(item.DataType, 'text')">
                    {{item.ViName}}/ <i :key="index">{{item.EnName}}</i>: {{item.Value}}
                  </template>
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCCON']">
            <td>{{TMPMASTERDATA['IPDHOCCON'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCCON'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCCON'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCCON'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCOSS']">
            <td>{{TMPMASTERDATA['IPDHOCOSS'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCOSS'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOSS'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOSS'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr>
            <th colspan="4" align="left">Recommendation - Đề xuất</th>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCFUC']">
            <td>{{TMPMASTERDATA['IPDHOCFUC'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCFUC'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCFUC'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCFUC'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCMO0']">
            <td>{{TMPMASTERDATA['IPDHOCMO0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCMO0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCMO0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCMO0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCWOU']">
            <td>{{TMPMASTERDATA['IPDHOCWOU'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCWOU'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCWOU'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCWOU'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCBLE']">
            <td>{{TMPMASTERDATA['IPDHOCBLE'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCBLE'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCBLE'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCBLE'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCPDT']">
            <td>{{TMPMASTERDATA['IPDHOCPDT'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCPDT'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCPDT'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCPDT'].Items">
                <span class="w-30" :key="index" v-if="item.DataType === 'Checkbox'">
                  <b style="font-size: 16px"> {{item.Value ? '&#9745;' : '&#9744;'}}</b> {{item.ViName}}/ <i>{{item.EnName}}</i>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCPP0']">
            <td>{{TMPMASTERDATA['IPDHOCPP0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCPP0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCPP0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCPP0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCMR0']">
            <td>{{TMPMASTERDATA['IPDHOCMR0'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCMR0'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCMR0'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCMR0'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCOTH']">
            <td>{{TMPMASTERDATA['IPDHOCOTH'].ViName}}/ <i>{{TMPMASTERDATA['IPDHOCOTH'].EnName}}</i></td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOTH'].Items" >
              <td :key="index" v-if="item.DataType === 'Radio'">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOTH'].Items">
                <span :key="index" v-if="item.DataType === 'Select' || item.DataType === 'Text'">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCOT2'] && IPDHOCOTCount > 0">
            <td>
              <span v-if="TMPMASTERDATA['IPDHOCOT2'].Items[0].Value">{{TMPMASTERDATA['IPDHOCOT2'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden-text text</span>
            </td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOT2'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOT2'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCOT3'] && IPDHOCOTCount > 1">
            <td>
              <span v-if="TMPMASTERDATA['IPDHOCOT3'].Items[0].Value">{{TMPMASTERDATA['IPDHOCOT3'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden text</span>
            </td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOT3'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOT3'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCOT4'] && IPDHOCOTCount > 2">
            <td>
              <span v-if="TMPMASTERDATA['IPDHOCOT4'].Items[0].Value">{{TMPMASTERDATA['IPDHOCOT4'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden text</span>
            </td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOT4'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOT4'].Items">
                <span :key="index" v-if="item.DataType === 'Text' && index === 3">
                  <template v-if="item.Value">{{item.Value}}</template>
                </span>
              </template>
            </td>
          </tr>
          <tr v-if="TMPMASTERDATA['IPDHOCOT5'] && IPDHOCOTCount > 3">
            <td>
              <span v-if="TMPMASTERDATA['IPDHOCOT5'].Items[0].Value">{{TMPMASTERDATA['IPDHOCOT5'].Items[0].Value}}</span>
              <span v-else class="hidden-text">Hidden text</span>
            </td>
            <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOT5'].Items">
              <td :key="index" v-if="item.DataType === 'Radio' && index === 1 || index === 2">
                {{item.Value ? '&#10004;' : ''}}
              </td>
            </template>
            <td>
              <template :data="item"  v-for="(item,index) in TMPMASTERDATA['IPDHOCOT5'].Items">
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
              <p class="no-margin only-print-app"><b>Giờ - ngày/ <i>Time - Date</i>: </b> {{DataSubmit.HandOverTimeNurse | formatDateTimeObj}}</p>
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
    if (!obj['IPDHOCPAIYES']) {
      this.resetData('IPDHOCPS0')
    }
    setTimeout(() => {
      this.setIPDHOCOTCount()
    }, 100)
  },
  methods: {
    setIPDHOCOTCount () {
      this.IPDHOCOTCount = this.TMPMASTERDATA['IPDHOCOT6'] ? this.TMPMASTERDATA['IPDHOCOT6'].Items[0].Value : 0
    },
    resetData (key) {
      this.TMPMASTERDATA[key].Items.forEach(item => {
        item.Value = null
      })
    },
    PHCXUSANS (l) {
      try {
        var data = []
        var arr = this.TMPMASTERDATA['IPDPHCXUS'].Items[4].Value
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
