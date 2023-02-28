<template>
  <div>
  <template v-if="routeType === 'Eye'">
    <EyePrint2 :Data="Data" :MASTERDATA="MASTERDATA" :VisitId="VisitId"/>
  </template>
  <template v-else>
    <table width="100%" class="tbl-b2">
      <tr>
        <td colspan="2"><h3><b>A. BỆNH ÁN<i>{{__t3('A. BỆNH ÁN')}}</i></b></h3></td>
      </tr>
      <tr v-if="routeType === 'A01_034_050919_V' || routeType === 'CardiovascularForm' || routeType === 'Obstetrics'">
        <td width="50%"><b>I. Lý do vào viện<i>{{__t3('Lý do vào viện')}}</i>: </b>{{getValueOfMASTERDATA('IPDMRPTLDVV', 'IPDMRPTLDVVANS')}}</td>
        <td style="text-align: right;">Vào ngày thứ<i>{{__t3('Vào ngày thứ-mdc')}}</i>: {{getValueOfMASTERDATA('IPDMRPTVANT', 'IPDMRPTVANTANS') || '&emsp;'}} của bệnh<i>{{__t3('của bệnh')}}</i></td>
      </tr>
      <tr v-else>
        <td width="50%"><b>I. Lý do vào viện<i>{{__t3('Lý do vào viện')}}</i>: </b>{{getValueOfMASTERDATA('IPDMRPTLDVV', 'IPDMRPTLDVVANS')}}</td>
        <td class="white-space" v-if="routeType !== 'Neonatal' && routeType !== 'Gynecological' && routeType !== 'Oncology'" width="30%" style="text-align: right;">Vào ngày thứ<i>{{__t3('Vào ngày thứ-mdc')}}</i>: {{getValueOfMASTERDATA('IPDMRPTVANT', 'IPDMRPTVANTANS') || '&emsp;'}} của bệnh<i>{{__t3('của bệnh')}}</i></td>
      </tr>
      <tr>
        <td colspan="2">
          <b>II. Hỏi bệnh<i>{{__t3('Hỏi bệnh')}}</i>:</b><span v-if="routeType === 'Neonatal'"> (diễn biến bệnh của sơ sinh<i>/ Newborn’s disease progression</i>)</span>
          <template v-if="routeType === 'Neonatal' && MASTERDATA['IPDMRPT60']">
            <span>{{MASTERDATA['IPDMRPT60'].Items[0].Value}}</span>
            <br/>
            <br v-if="!MASTERDATA['IPDMRPT60'].Items[0].Value"/>
          </template>
          <p v-if="routeType === 'Gynecological'"><b>1. Quá trình bệnh lý<i>/ Clinical evolution</i>:</b> <br/>{{getValueOfMASTERDATA('IPDMRPTQTBL', 'IPDMRPTQTBLANS')}}</p>
          <p v-else-if="routeType !== 'Neonatal' && routeType !== 'Obstetrics'"><b>1. Quá trình bệnh lý<i>{{__t3('1. Quá trình bệnh lý')}}</i>:</b> <br/>{{getValueOfMASTERDATA('IPDMRPTQTBL', 'IPDMRPTQTBLANS')}}</p>
          <ObstetricsPrint2 v-if="routeType === 'Obstetrics'" :box1="true" :MASTERDATA="MASTERDATA" :Data="Data"/>
          <div v-if="routeType !== 'Neonatal' && routeType !== 'CardiovascularForm'"><b>2. Tiền sử bệnh<i>{{__t3('2. Tiền sử bệnh')}}</i>:</b>
            <br/>
            <div class="mrb10" v-if="routeType === 'Pediatric' || routeType === 'Obstetrics' || routeType === 'Gynecological'">
              + Dị ứng<i>{{__t3('Dị ứng')}}</i>: {{getValueOfMASTERDATA('IPDMRPT01', 'IPDMRPT02')}}
            </div>
            <div>
              + Bản thân<i v-if="routeType !== 'Gynecological'">{{__t3('+ Bản thân')}}</i><i v-else>/ Personal medical history</i>: {{getValueOfMASTERDATA('IPDMRPTBATH', 'IPDMRPTBATHANS')}}
            </div>
          </div>
          <BMTIMMACH2Print v-if="routeType === 'CardiovascularForm'" :MASTERDATA="MASTERDATA"/>
        </td>
      </tr>
      <tr v-if="routeType !== 'Pediatric' && routeType !== 'Neonatal' && routeType !== 'Obstetrics' && routeType !== 'Gynecological'">
        <td colspan="2">
          Đặc điểm liên quan bệnh<i>{{__t3('Đặc điểm liên quan bệnh')}}</i> (Điền &#10003; nếu áp dụng<i v-if="routeType === 'A01_034_050919_V' || routeType === 'CardiovascularForm' || routeType === 'A01_195_050919_V' || routeType === 'A01_040_050919_V' || routeType === 'A01_039_050919_V'">/ tick if applicable</i>)
          <table width="100%"  class="tbl-b" v-if="MASTERDATA['IPDMRPTDDLQ']">
            <tr>
              <td>TT<i>{{__t3('TT', 'andau')}}</i></td>
              <td width="170px" style="text-align: center">Ký hiệu<i>{{__t3('Ký hiệu')}}</i></td>
              <td width="194px">Thời gian (tính theo tháng)<i>{{__t3('Thời gian (tính theo tháng)', 'andau')}}</i></td>
              <td>TT<i>{{__t3('TT', 'andau')}}</i></td>
              <td width="195px" style="text-align: center">Ký hiệu<i>{{__t3('Ký hiệu')}}</i></td>
              <td width="194px">Thời gian (tính theo tháng)<i>{{__t3('Thời gian (tính theo tháng)', 'andau')}}</i></td>
            </tr>
            <tr>
              <td>01</td>
              <td>
                <div class="flex align-center space-between">
                  <div>
                    - Dị ứng<i v-if="routeType !== 'Oncology'">/ Allergy</i>
                  </div>
                  <div>
                    <span class="square-text">{{getValueOfMASTERDATA('IPDMRPTALLE', 'IPDMRPTALLECHK') ? '&#10003;' : '&nbsp;&nbsp;&nbsp;'}}</span>
                  </div>
                </div>
              </td>
              <td>
                {{getValueOfMASTERDATA('IPDMRPTALLE', 'IPDMRPTALLEANS')}}
              </td>
              <td>04</td>
              <td>
                <div class="flex align-center space-between">
                  <div>- Thuốc lá<i v-if="routeType !== 'Oncology'">/ Smoking</i></div>
                  <div><span class="square-text">{{getValueOfMASTERDATA('IPDMRPTTHLA', 'IPDMRPTTHLACHK') ? '&#10003;' : '&nbsp;&nbsp;&nbsp;'}}</span></div>
                </div>
              </td>
              <td>
                {{getValueOfMASTERDATA('IPDMRPTTHLA', 'IPDMRPTTHLAANS')}}
              </td>
            </tr>
            <tr>
              <td>02</td>
              <td>
                <div class="flex align-center space-between">
                  <div>
                    - Ma tuý<i v-if="routeType !== 'Oncology'">/ Drug</i>
                  </div>
                  <div>
                    <span class="square-text">{{getValueOfMASTERDATA('IPDMRPTMATU', 'IPDMRPTMATUCHK') ? '&#10003;' : '&nbsp;&nbsp;&nbsp;'}}</span>
                  </div>
                </div>
              </td>
              <td>
                {{getValueOfMASTERDATA('IPDMRPTMATU', 'IPDMRPTMATUANS')}}
              </td>
              <td>05</td>
              <td>
                <div class="flex align-center space-between">
                  <div class="word-break">- Thuốc lào/<br><i v-if="routeType !== 'Oncology'"> Nicotiana rustica</i></div>
                  <div>
                    <span class="square-text">{{getValueOfMASTERDATA('IPDMRPTTHLO', 'IPDMRPTTHLOCHK') ? '&#10003;' : '&nbsp;&nbsp;&nbsp;'}}</span>
                  </div>
                </div>
              </td>
              <td>
                {{getValueOfMASTERDATA('IPDMRPTTHLO', 'IPDMRPTTHLOANS')}}
              </td>
            </tr>
            <tr>
              <td>03</td>
              <td>
                <div class="flex align-center space-between">
                  <div>- Rượu bia<i v-if="routeType !== 'Oncology'">/ Alcohol</i></div>
                  <div>
                    <span class="square-text">{{getValueOfMASTERDATA('IPDMRPTRUBI', 'IPDMRPTRUBICHK') ? '&#10003;' : '&nbsp;&nbsp;&nbsp;'}}</span>
                  </div>
                </div>
              </td>
              <td>
                {{getValueOfMASTERDATA('IPDMRPTRUBI', 'IPDMRPTRUBIANS')}}
              </td>
              <td>06</td>
              <td>
                <div class="flex align-center space-between">
                  <div>- Khác<i v-if="routeType !== 'Oncology'">/ Others</i></div>
                  <div>
                    <span class="square-text">{{getValueOfMASTERDATA('IPDMRPTKHAC', 'IPDMRPTKHACCHK') ? '&#10003;' : '&nbsp;&nbsp;&nbsp;'}}</span>
                  </div>
                </div>
              </td>
              <td>
                {{getValueOfMASTERDATA('IPDMRPTKHAC', 'IPDMRPTKHACANS')}}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr v-if="routeType !== 'Neonatal'">
        <td colspan="2" >
          <p v-if="routeType === 'Gynecological'">+ Gia đình<i>/ Family medical history</i>: {{getValueOfMASTERDATA('IPDMRPTGIDI', 'IPDMRPTGIDIANS')}}</p>
          <div v-else>+ Gia đình<i>{{__t3('+ Gia đình')}}</i>: {{getValueOfMASTERDATA('IPDMRPTGIDI', 'IPDMRPTGIDIANS')}}</div>
        </td>
      </tr>
      <tr v-if="routeType === 'Neonatal'">
        <td colspan="2">
          <NeonatalPrint2 :Data="Data" :MASTERDATA="MASTERDATA" :box1="true" />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <p>+ Thuốc hiện đang dùng<i v-if="routeType !== 'Oncology'">/ Medication currently used</i> (Bao gồm cả thuốc kê đơn và không kê đơn<i v-if="routeType !== 'Oncology'">/ Inclusive of both prescribed or over-the-counter medication</i>)</p>
          <list-of-current-medications
            ref="ListOfCurrentMedications"
            :Type="'IPD-PatientMedicationList'"
            :VisitTypeGroupCode="'IPD'"
            :VisitId="VisitId"
            :RealOnly="true"
            :t3="routeType !== 'Oncology' ? true : false"
            :Gynecological="routeType !== 'Oncology' ? true : false"
            />
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <ObstetricsPrint2 v-if="routeType === 'Obstetrics'" :box2="true" :MASTERDATA="MASTERDATA" :Data="Data"/>
          <GynecologicalPrint2 v-if="routeType === 'Gynecological'" :box1="true" :MASTERDATA="MASTERDATA" :Data="Data"/>
        </td>
      </tr>
      <tr v-if="routeType === 'Pediatric'">
        <td colspan="2">
          <p><b>3. Quá trình sinh trưởng<i>/ Child development</i>: </b></p>
          <p>- Con thứ mấy<i>/ The child is</i> {{MASTERDATA['IPDMRPT06'].Items[0].Value || '&emsp;&emsp;&emsp;'}} child - Tiền thai<i>/ History of pregnancy</i> (Para) <span class="square-text square-text2" :class="{'hidden-text': !MASTERDATA['IPDMRPT09'].Items[0].Value}">{{MASTERDATA['IPDMRPT09'].Items[0].Value || '&#10003;'}}<span class="top-label">S</span></span>
            <span class="square-text square-text2" :class="{'hidden-text': !MASTERDATA['IPDMRPT11'].Items[0].Value}">{{MASTERDATA['IPDMRPT11'].Items[0].Value || '&#10003;'}}<span class="top-label">S</span></span>
            <span class="square-text square-text2" :class="{'hidden-text': !MASTERDATA['IPDMRPT13'].Items[0].Value}">{{MASTERDATA['IPDMRPT13'].Items[0].Value || '&#10003;'}}<span class="top-label">S</span></span>
            <span class="square-text square-text2" :class="{'hidden-text': !MASTERDATA['IPDMRPT15'].Items[0].Value}">{{MASTERDATA['IPDMRPT15'].Items[0].Value || '&#10003;'}}<span class="top-label">S</span></span> (Sinh (đủ tháng)<i>/ Full-term</i>, Sớm (đẻ non)<i>/ Pre-term</i>, Sẩy (nạo, hút)<i>/ Misscarriage (Suction, D&E)</i>, Sống<i>/ Alive</i>)</p>
          <p>
            - Tình trạng khi sinh<i>/ Condition at birth</i>: <br/><span>1. Đẻ thường<i>/ Normal</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT17'].Items[0].Value}">&#10003;</span>
            <span>2. Forceps</span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT17'].Items[1].Value}">&#10003;</span>
            <span>3. Giác hút<i>/ Vacuum</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT17'].Items[2].Value}">&#10003;</span>
            <span>4. Đẻ phẫu thuật<i>/ C-section</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT17'].Items[3].Value}">&#10003;</span>
            <span>5. Đẻ chỉ huy<i>/ Elective</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT17'].Items[4].Value}">&#10003;</span>
            <span>6. Khác<i>/ Others</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT17'].Items[5].Value}">&#10003;</span>
          </p>
          <p>- Cân nặng lúc sinh<i>/ Weight at birth</i>: {{MASTERDATA['IPDMRPT25'].Items[0].Value || '&emsp;&emsp;&emsp;'}} kg. <span>&emsp; Dị tật bẩm sinh<i>/ Congenital anomalies</i>: </span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT27'].Items[0].Value}">&#10003;</span>
            <span>&emsp;Cụ thể tật bẩm sinh<i>/ Detailed congenital anomalies</i>: {{MASTERDATA['IPDMRPT27'].Items[2].Value || '&emsp;&emsp;&emsp;&emsp;'}}</span></p>
            <p>- Bất thường về phát triển tinh thần<i>/ Mental development abnormality</i>: {{MASTERDATA['IPDMRPT31'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;'}}</p>
            <p>- Bất thường về phát triển vận động<i>/ Motor development abnormality</i>: {{MASTERDATA['IPDMRPT33'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;'}}</p>
            <p>- Các bệnh lý khác<i>/ Other diseases</i>: {{MASTERDATA['IPDMRPT35'].Items[0].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</p>
            <p>- Nuôi dưỡng<i>/ Nourishment</i>: <span>1. Sữa mẹ<i>/ Breast milk</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT37'].Items[0].Value}">&#10003;</span>
            <span>2. Nuôi nhân tạo<i>/ Formula milk</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT37'].Items[1].Value}">&#10003;</span>
            <span>3. Hỗn hợp<i>/ Mixed</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT37'].Items[2].Value}">&#10003;</span>
            <span>&emsp;- Cai sữa tháng thứ<i>/ Weaning at</i> {{MASTERDATA['IPDMRPT41'].Items[0].Value || '&emsp;&emsp;&emsp;'}} months old</span>
          </p>
          <p>- Chăm sóc<i>/ Child care</i>: &emsp;&emsp;<span>1. Tại vườn trẻ<i>/ At kindergarten</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT43'].Items[0].Value}">&#10003;</span>
          <span>2. Tại nhà<i>/ At home</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT43'].Items[1].Value}">&#10003;</span></p>
          <p>- Đã tiêm chủng<i>/ Vaccinated</i>: <br/> <span>1. Lao<i>/ Tuberculosis</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT46'].Items[0].Value}">&#10003;</span>
          <span>2. Bại liệt<i>/ Poliomyelitis</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT46'].Items[1].Value}">&#10003;</span>
          <span>3. Sởi<i>/ Measles</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT46'].Items[2].Value}">&#10003;</span>
          <span>4. Ho gà<i>/ Pertussis</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT46'].Items[3].Value}">&#10003;</span>
          <span>5. Uốn ván<i>/ Tetanus</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT46'].Items[4].Value}">&#10003;</span>
          <span>6. Bạch hầu<i>/ Diphtheria</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT46'].Items[5].Value}">&#10003;</span>
          <span>7. Tiêm chủng khác<i>/ Other vaccination</i></span> <span class="square-text" :class="{'hidden-text': !MASTERDATA['IPDMRPT46'].Items[6].Value}">&#10003;</span></p>
          <p>- Cụ thể những bệnh khác được tiêm chủng<i>/ Other vaccinations</i>: {{MASTERDATA['IPDMRPT46'].Items[7].Value || '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;'}}</p>
        </td>
      </tr>
    </table>
    <table width="100%" class="tbl-b2" v-if="(routeType === 'A01_034_050919_V' && Data.Version >= 2) || routeType === 'CardiovascularForm'">
      <tr>
        <td colspan="2"><b>III. Đánh giá nguy cơ người bệnh/ <i>Risk assessment for patients</i>:</b></td>
      </tr>
      <tr>
        <td colspan="2"><b>Lưu ý: </b>Đối với bệnh nhân can thiệp tim mạch, bác sĩ can thiệp cần hoàn thiện "Bảng kiểm đánh giá nguy cơ trước thủ thuật đối với bệnh nhân can thiệp tim mạch" (Phụ lục 1)</td>
      </tr>
      <tr>
        <td colspan="2">Note: For patients undergoing cardiovascular intervention, interventionists complete the "Pre-Procedure risk assessment checklist for Cardiac Catheterization" (Appendix 1)</td>
      </tr>
    </table>
    <table width="100%" class="tbl-b2">
      <tr v-if="routeType !== 'Neonatal' && routeType !== 'Obstetrics'">
        <template v-if="routeType === 'A01_034_050919_V' || routeType === 'CardiovascularForm'">
          <td colspan="2" v-if="Data.Version >= 2"><b>IV. Khám bệnh<i>{{__t3('Khám bệnh')}}</i>:</b></td>
          <td colspan="2" v-else><b>III. Khám bệnh<i>{{__t3('Khám bệnh')}}</i>:</b></td>
        </template>
        <template v-else >
          <td colspan="2" v-if="routeType === 'Gynecological' || routeType === 'A01_195_050919_V' || routeType === 'A01_040_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'Pediatric'"><b>III. Khám bệnh<i>/ Examination</i>:</b></td>
          <td colspan="2" v-else><b>IV. Khám bệnh:</b></td>
        </template>
      </tr>
      <tr v-if="routeType !== 'Neonatal' && routeType !== 'Obstetrics' && routeType !== 'Oncology'">
        <td colspan="2">
          <div style="position: relative;" v-if="routeType">
            <div style="width: 570px;" v-if="routeType === 'Gynecological' && MASTERDATA['IPDMRPTTTYT2']">
              <p><b>1. Toàn thân<i>/ General status</i>: </b>{{getValueOfMASTERDATA('IPDMRPTTTYT', 'IPDMRPTTTYTANS')}}</p>
              <p>Da niêm mạc<i>/ Skin and mucosa</i>: {{MASTERDATA['IPDMRPTTTYT2'].Items[0].Value}}</p>
              <p>Hạch<i>/ Lymphatic system</i>: {{MASTERDATA['IPDMRPTTTYT2'].Items[1].Value}}</p>
              <p>Vú<i>/ Breasts</i>: {{MASTERDATA['IPDMRPTTTYT2'].Items[2].Value}}</p>
            </div>
            <div style="width: 443px;" v-else>
              <p><b>1. Toàn thân<i>{{__t3('Toàn thân')}}</i></b> <i>(ý thức, da niêm mạc, hệ thống hạch, tuyến giáp, vị trí, kích thước, số lượng, v.v..{{__t3('ý thức, da niêm mạc, hệ thống hạch, tuyến giáp, vị trí, kích thước, số lượng, v.v..')}})</i><br/>{{getValueOfMASTERDATA('IPDMRPTTTYT', 'IPDMRPTTTYTANS')}}</p>
            </div>
            <div v-if="routeType !== 'Gynecological'" style="border: 1px solid #353535;position: absolute;top: -14px;right: 0px;padding: 5px">
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTMACH']"><i>Mạch{{__t3('Mạch')}}</i>: {{MASTERDATA['IPDMRPTMACH'].Items[0].Value || '&emsp;&emsp;'}} <i>lần/ph/bpm</i></span></div>
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTNHDO']"><i>Nhiệt độ/ T</i>: {{MASTERDATA['IPDMRPTNHDO'].Items[0].Value || '&emsp;&emsp;'}} <i>&#8451;</i></span></div>
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTHUAP']"><i>Huyết áp/ BP</i>: {{MASTERDATA['IPDMRPTHUAP'].Items[0].Value || '&emsp;&emsp;'}} <i>mmHg</i></span></div>
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTNHTH']"><i>Nhịp thở/ RR</i>: {{MASTERDATA['IPDMRPTNHTH'].Items[0].Value || '&emsp;&emsp;'}} <i>lần/ph/bpm</i></span></div>
              <div v-if="routeType !== 'A01_195_050919_V' && routeType !== 'Pediatric' && routeType !== 'A01_039_050919_V'" style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTCICA']">Chiều cao<i>{{__t3('Chiều cao')}}</i>: {{MASTERDATA['IPDMRPTCICA'].Items[0].Value || '&emsp;&emsp;'}} <i>cm</i></span></div>
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTCANA']"><i>Cân nặng/ W</i>: {{MASTERDATA['IPDMRPTCANA'].Items[0].Value || '&emsp;&emsp;'}} <i>kg</i></span></div>
              <div v-if="routeType !== 'A01_195_050919_V' && routeType !== 'Pediatric' && routeType !== 'A01_039_050919_V'" style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTBBMI']">BMI: {{MASTERDATA['IPDMRPTBBMI'].Items[0].Value || '&emsp;&emsp;'}} <i>lần/ph/bpm</i></span></div>
            </div>
            <div v-else style="border: 1px solid #353535;position: absolute;top: -14px;right: 0px;padding: 5px">
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTMACH']">Mạch<i>/ Pulse</i>: {{MASTERDATA['IPDMRPTMACH'].Items[0].Value || '&emsp;&emsp;'}} <i> lần/ph/bpm</i></span></div>
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTNHDO']">Nhiệt độ<i>/ T</i>: {{MASTERDATA['IPDMRPTNHDO'].Items[0].Value || '&emsp;&emsp;'}} <i>&#8451;</i></span></div>
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTHUAP']">Huyết áp<i>/ BP</i>: {{MASTERDATA['IPDMRPTHUAP'].Items[0].Value || '&emsp;&emsp;'}} <i>mmHg</i></span></div>
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTNHTH']">Nhịp thở<i>/ RR</i>: {{MASTERDATA['IPDMRPTNHTH'].Items[0].Value || '&emsp;&emsp;'}} <i> lần/ph/bpm</i></span></div>
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTCANA']">Cân nặng<i>/ W</i>: {{MASTERDATA['IPDMRPTCANA'].Items[0].Value || '&emsp;&emsp;'}} <i> Kg</i></span></div>
            </div>
          </div>
          <div v-else class="flex">
            <div style="width: 484px;" class="mrr10">
              <p><b>1. Toàn thân</b> <i>(ý thức, da niêm mạc, hệ thống hạch, tuyến giáp, vị trí, kích thước, số lượng, v.v..)</i></p>
              <p><span class="italic">General status</span> <i>(consciousness, skin and mucosa, lymphatic sytem, thyroid gland, location, size, quantity</i><br/>{{getValueOfMASTERDATA('IPDMRPTTTYT', 'IPDMRPTTTYTANS')}}</p>
            </div>
            <div style="border: 1px solid #353535;padding: 5px;height: 110px;">
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTMACH']">Mạch<i>/ Pulse</i>: {{MASTERDATA['IPDMRPTMACH'].Items[0].Value || '&emsp;&emsp;'}}<i> lần/ph/bpm</i></span></div>
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTNHDO']">Nhiệt độ<i>/ T</i>: {{MASTERDATA['IPDMRPTNHDO'].Items[0].Value || '&emsp;&emsp;'}} <i>&#8451;</i></span></div>
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTHUAP']">Huyết áp<i>/ BP</i>: {{MASTERDATA['IPDMRPTHUAP'].Items[0].Value || '&emsp;&emsp;'}} <i>mmHg</i></span></div>
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTNHTH']">Nhịp thở<i>/ RR</i>: {{MASTERDATA['IPDMRPTNHTH'].Items[0].Value || '&emsp;&emsp;'}} <i> lần/ph/bpm</i></span></div>
              <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['IPDMRPTCANA']">Cân nặng<i>/ W</i>: {{MASTERDATA['IPDMRPTCANA'].Items[0].Value || '&emsp;&emsp;'}} <i> Kg</i></span></div>
            </div>
          </div>
        </td>
      </tr>
      <tr v-if="routeType === 'Oncology'">
        <td colspan="2">
          <OncologyPrint2 :Data="Data" :MASTERDATA="MASTERDATA" :box1="true"/>
        </td>
      </tr>
    </table>
    <GynecologicalPrint2 v-if="routeType === 'Gynecological'" :Data="Data" :MASTERDATA="MASTERDATA" :box2="true" style="padding-left: 5px;" />
    <NeonatalPrint2 v-if="routeType === 'Neonatal'" :Data="Data" :MASTERDATA="MASTERDATA" :box2="true" />
    <template v-if="routeType !== 'Neonatal' && routeType !== 'Obstetrics' && routeType !== 'Gynecological' && routeType !== 'Oncology'">
      <div style="padding-left: 5px;">
        <div v-if="routeType === 'A01_195_050919_V'"><p><b>2. Bệnh ngoại khoa<i>/ Surgical diseases</i>:</b><br/>{{getValueOfMASTERDATA('IPDMRPTBNK0001', 'IPDMRPTBNK00010001')}}</p></div>
        <div v-if="routeType === 'A01_039_050919_V'">
          <p><b>2. Bệnh chuyên khoa<i>/ Specialized examination</i>:</b><br/>{{getValueOfMASTERDATA('IPDMRPT10000', 'IPDMRPT10001')}}</p>
          <label>Hình vẽ mô tả tổn thương khi vào viện<i>/ Drawing of injury at admission</i>:</label>
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :index="[0, 1]"
            :t3="true"
            :setheight="true"
          />
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :index="[2, 3]"
            :t3="true"
            :setheight="true"
          />
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :index="[4, 5]"
            :t3="true"
            :setheight="true"
          />
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :index="[6, 7]"
            :t3="true"
            :setheight="true"
          />
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :index="[8, 9]"
            :t3="true"
            :setheight="true"
          />
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :index="[10, 11]"
            :t3="true"
            :setheight="true"
          />
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :index="[12, 13]"
            :t3="true"
            :setheight="true"
          />
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :index="[14, 15]"
            :t3="true"
            :setheight="true"
          />
        </div>
        <div v-if="routeType === 'A01_040_050919_V'">
          <p><b>2. Bệnh chuyên khoa<i>/ Specialized examination</i>:</b><br/>{{getValueOfMASTERDATA('IPDMRPT10023', 'IPDMRPT10024')}}</p>
          <label>Hình vẽ mô tả tổn thương khi vào viện <i>/ Drawing of injury at admission</i>:</label>
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :MDCODE="'IPDMRPT10025'"
            :index="[0, 1]"
            :t3="true"
          />
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :MDCODE="'IPDMRPT10025'"
            :index="[2, 3]"
            :t3="true"
          />
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :MDCODE="'IPDMRPT10025'"
            :index="[4, 5]"
            :t3="true"
          />
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :MDCODE="'IPDMRPT10025'"
            :index="[6, 7]"
            :t3="true"
          />
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :MDCODE="'IPDMRPT10025'"
            :index="[8, 9]"
            :t3="true"
          />
          <IPDMRPT10002
            :isPrint="true"
            :MASTERDATA="MASTERDATA"
            :MDCODE="'IPDMRPT10025'"
            :index="[10, 11]"
            :t3="true"
          />
        </div>
        <div><b>{{(routeType === 'A01_195_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V') ? '3' : '2'}}. Các cơ quan<i>{{__t3('2. Các cơ quan')}}</i>:</b></div>
        <template v-if="routeType === 'A01_039_050919_V'">
          <p>+ Tâm thần, Thần kinh<i>/ Psychological, nervous system</i>: {{getValueOfMASTERDATA('IPDMRPTTHKI', 'IPDMRPTTHKIANS')}}</p>
          <p>+ Tuần hoàn<i>/ Circulatory system</i>: {{getValueOfMASTERDATA('IPDMRPTTUHO', 'IPDMRPTTUHOANS')}}</p>
          <p>+ Hô hấp<i>/ Respiratory system</i>: {{getValueOfMASTERDATA('IPDMRPTHOHA', 'IPDMRPTHOHAANS')}}</p>
          <p>+ Tiêu hóa<i>/ Digestive system</i>: {{getValueOfMASTERDATA('IPDMRPTTIHO', 'IPDMRPTTIHOANS')}}</p>
          <p>+ Da và mô dưới da<i>/ Skin and subcutaneous tissue</i>: {{getValueOfMASTERDATA('IPDMRPT10021', 'IPDMRPT10022')}}</p>
          <p>+ Cơ - Xương - Khớp<i>/ Musculoskeletal system</i>: {{getValueOfMASTERDATA('IPDMRPTCOXK', 'IPDMRPTCOXKANS')}}</p>
          <p>+ Tiết niệu - Sinh dục<i>/ Nephro-urological system</i>: {{getValueOfMASTERDATA('IPDMRPTTTNS', 'IPDMRPTTTNSANS')}}</p>
          <p>+ Khác<i>/ Others</i>: {{getValueOfMASTERDATA('IPDMRPTNTDD', 'IPDMRPTNTDDANS')}}</p>
        </template>
        <template v-else-if="routeType === 'A01_040_050919_V'">
          <p>+ Thần kinh<i>/ Psychological, nervous system</i>: {{getValueOfMASTERDATA('IPDMRPTTHKI', 'IPDMRPTTHKIANS')}}</p>
          <p>+ Tuần hoàn<i>{{__t3('+ Tuần hoàn')}}</i>: {{getValueOfMASTERDATA('IPDMRPTTUHO', 'IPDMRPTTUHOANS')}}</p>
          <p>+ Hô hấp<i>{{__t3('+ Hô hấp')}}</i>: {{getValueOfMASTERDATA('IPDMRPTHOHA', 'IPDMRPTHOHAANS')}}</p>
          <p>+ Tiêu hóa<i>{{__t3('+ Tiêu hoá')}}</i>: {{getValueOfMASTERDATA('IPDMRPTTIHO', 'IPDMRPTTIHOANS')}}</p>
          <p>+ Cơ - Xương - Khớp<i>{{__t3('+ Cơ- Xương- Khớp')}}</i>: {{getValueOfMASTERDATA('IPDMRPTCOXK', 'IPDMRPTCOXKANS')}}</p>
          <p>+ Da và mô dưới da<i>/ Skin and subcutaneous tissue</i>: {{getValueOfMASTERDATA('IPDMRPT10021', 'IPDMRPT10022')}}</p>
          <p>+ Tiết niệu - Sinh dục<i>/ Nephro-urological system</i>: {{getValueOfMASTERDATA('IPDMRPTTTNS', 'IPDMRPTTTNSANS')}}</p>
          <p>+ Khác<i>/ Others</i>: {{getValueOfMASTERDATA('IPDMRPTNTDD', 'IPDMRPTNTDDANS')}}</p>
        </template>
        <template v-else>
          <p>+ Tuần hoàn<i>{{__t3('+ Tuần hoàn')}}</i>: {{getValueOfMASTERDATA('IPDMRPTTUHO', 'IPDMRPTTUHOANS')}}</p>
          <p>+ Hô hấp<i>{{__t3('+ Hô hấp')}}</i>: {{getValueOfMASTERDATA('IPDMRPTHOHA', 'IPDMRPTHOHAANS')}}</p>
          <p>+ Tiêu hóa<i>{{__t3('+ Tiêu hoá')}}</i>: {{getValueOfMASTERDATA('IPDMRPTTIHO', 'IPDMRPTTIHOANS')}}</p>
          <p>+ Thận - Tiết niệu - Sinh dục<i>{{__t3('+ Thận- Tiết niệu- Sinh dục')}}</i>: {{getValueOfMASTERDATA('IPDMRPTTTNS', 'IPDMRPTTTNSANS')}}</p>
          <p>+ Thần kinh<i>{{__t3('+ Thần Kinh')}}</i>: {{getValueOfMASTERDATA('IPDMRPTTHKI', 'IPDMRPTTHKIANS')}}</p>
          <p>+ Cơ - Xương - Khớp<i>{{__t3('+ Cơ- Xương- Khớp')}}</i>: {{getValueOfMASTERDATA('IPDMRPTCOXK', 'IPDMRPTCOXKANS')}}</p>
          <p>+ Tai - Mũi - Họng<i>{{__t3('+ Tai- Mũi- Họng')}}</i>: {{getValueOfMASTERDATA('IPDMRPTTAMH', 'IPDMRPTTAMHANS')}}</p>
          <p>+ Răng- Hàm- Mặt<i>{{__t3('+ Răng- Hàm- Mặt')}}</i>: {{getValueOfMASTERDATA('IPDMRPTRAHM', 'IPDMRPTRAHMANS')}}</p>
          <p>+ Mắt<i>{{__t3('+ Mắt')}}</i>: {{getValueOfMASTERDATA('IPDMRPTMMAT', 'IPDMRPTMMATANS')}}</p>
          <p v-if="routeType === 'Pediatric'">+ Dinh dưỡng và các bệnh lý khác<i>/ Nutrition and other diseases</i>: {{getValueOfMASTERDATA('IPDMRPTNTDD', 'IPDMRPTNTDDANS')}}</p>
          <p v-else>+ Nội tiết, dinh dưỡng và các bệnh lý khác<i>{{__t3('+ Nội tiết, dinh dưỡng và các bệnh lý khác')}}</i>: {{getValueOfMASTERDATA('IPDMRPTNTDD', 'IPDMRPTNTDDANS')}}</p>
        </template>
        <p><b>{{(routeType === 'A01_195_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V') ? '4' : '3'}}. Các xét nghiệm cận lâm sàng cần làm<i>{{__t3('3. Các xét nghiệm cận lâm sàng cần làm')}}</i>:</b> {{getValueOfMASTERDATA('IPDMRPTCXNC', 'IPDMRPTCXNCANS')}}</p>
        <p><b>{{(routeType === 'A01_195_050919_V' || routeType === 'A01_039_050919_V' || routeType === 'A01_040_050919_V') ? '5' : '4'}}. Tóm tắt bệnh án<i>{{__t3('4. Tóm tắt bệnh án')}}</i>:</b> {{getValueOfMASTERDATA('IPDMRPTTTBA', 'IPDMRPTTTBAANS')}}</p>
        <div v-if="routeType === 'A01_034_050919_V' || routeType === 'CardiovascularForm'">
          <b v-if="Data.Version >= 2 || routeType === 'CardiovascularForm'">V. Chẩn đoán khi vào khoa điều trị<i>{{__t3('Chẩn đoán khi vào khoa điều trị')}}</i>:</b>
          <b v-else>IV. Chẩn đoán khi vào khoa điều trị<i>{{__t3('Chẩn đoán khi vào khoa điều trị')}}</i>:</b>
        </div>
        <div v-else><b>IV. Chẩn đoán khi vào khoa điều trị<i>{{__t3('Chẩn đoán khi vào khoa điều trị')}}</i>:</b></div>
        <p>+ Bệnh chính<i>{{__t3('Bệnh chính')}}</i>: {{getValueOfMASTERDATA('IPDMRPTCDBC', 'IPDMRPTCDBCANS') ? getValueOfMASTERDATA('IPDMRPTCDBC', 'IPDMRPTCDBCANS') + ',' : ''}} <template v-if="MASTERDATA['IPDMRPTICDC']">{{getICD10Code(MASTERDATA['IPDMRPTICDC'].Items[0].Value)}}</template></p>
        <p>+ Bệnh kèm theo<i>/ Co-morbidity</i> <i>(nếu có<span>/ if having</span>):</i> {{getValueOfMASTERDATA('IPDMRPTCDKT', 'IPDMRPTCDKTANS') ? getValueOfMASTERDATA('IPDMRPTCDKT', 'IPDMRPTCDKTANS') + ',' : ''}} <template v-if="MASTERDATA['IPDMRPTICDP']">{{getICD10Code(MASTERDATA['IPDMRPTICDP'].Items[0].Value)}}</template></p>
        <p>+ Phân biệt<i>{{__t3('+ Phân biệt')}}</i>: {{getValueOfMASTERDATA('IPDMRPTPHBI', 'IPDMRPTPHBIANS')}}</p>
      </div>
    </template>
  </template>
  <table width="100%" class="tbl-b2">
      <tr>
        <td width="40%" v-if="checkDich()"></td>
        <td width="50%" v-else></td>
        <!-- <td style="text-align: center;" v-if="routeType === 'Pediatric' || routeType === 'Neonatal' || routeType === 'Oncology' || routeType === 'Eye'">
          <div style="text-align: center;" class="mrb10" v-if="routeType !== 'Oncology' && routeType !== 'Eye'">{{HouseCreated[0] || '&emsp;&emsp;'}} Giờ {{HouseCreated[1] || '&emsp;&emsp;'}} Ngày {{DateCreated[0] || '&emsp;&emsp;'}}/{{DateCreated[1] || '&emsp;&emsp;'}}/{{DateCreated[2] || '&emsp;&emsp;'}}</div>
          <div style="text-align: center;" class="mrb10" v-else>{{HouseCreated[0] || '&emsp;&emsp;'}} Giờ {{HouseCreated[1] || '&emsp;&emsp;'}} Ngày {{DateCreated[0] || '&emsp;&emsp;'}} tháng {{DateCreated[1] || '&emsp;&emsp;'}} năm {{DateCreated[2] || '&emsp;&emsp;'}}</div>
          <div style="text-align: center;"><b>Bác sỹ làm bệnh án</b></div>
          <div class="hidden-text"><b>Bác sỹ làm bệnh án</b></div>
          <div class="hidden-text"><b>Bác sỹ làm bệnh án</b></div>
          <div class="hidden-text"><b>Bác sỹ làm bệnh án</b></div>
          <div class="hidden-text"><b>Bác sỹ làm bệnh án</b></div>
          <div class="hidden-text"><b>Bác sỹ làm bệnh án</b></div>
          <div style="text-align: center;"><i>Họ và tên: {{Data.Signature ? Data.Signature.CreatedBy : ''}}</i></div>
        </td> -->
        <td style="text-align: center;">
          <div style="text-align: center;" class="mrb10 italic">{{HouseCreated[0] || '&emsp;&emsp;'}} Giờ<span v-if="routeType !== 'Oncology'">/Hour </span>{{HouseCreated[1] || '&emsp;&emsp;'}} Ngày<span v-if="routeType !== 'Oncology'">/date</span> {{DateCreated[0] || '&emsp;&emsp;'}} tháng<span v-if="routeType !== 'Oncology'">/month</span> {{DateCreated[1] || '&emsp;&emsp;'}} năm<span v-if="routeType !== 'Oncology'">/year</span> {{DateCreated[2] || '&emsp;&emsp;'}}</div>
          <div style="text-align: center;" ><b>Bác sỹ làm bệnh án<i>{{__t3('Bác sỹ làm bệnh án')}}</i></b></div>
          <div class="hidden-text"><b>Bác sỹ điều trị</b></div>
          <div class="hidden-text"><b>Bác sỹ điều trị</b></div>
          <div class="hidden-text"><b>Bác sỹ điều trị</b></div>
          <div class="hidden-text"><b>Bác sỹ điều trị</b></div>
          <div class="hidden-text"><b>Bác sỹ điều trị</b></div>
          <div style="text-align: center;"><i>Họ và tên<span v-if="routeType !== 'Oncology'">/Fullname</span>: {{Data.Signature ? Data.Signature.CreatedBy : ''}}</i></div>
        </td>
      </tr>
  </table>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import ListOfCurrentMedications from '@/components/ListOfCurrentMedicationsForPrinter.vue'
import NeonatalPrint2 from '@/pages/IPD/MedicalRecord/Page2CPN/NeonatalPrint2.vue'
import ObstetricsPrint2 from '@/pages/IPD/MedicalRecord/Page2CPN/ObstetricsPrint2.vue'
import GynecologicalPrint2 from '@/pages/IPD/MedicalRecord/Page2CPN/GynecologicalPrint2.vue'
import OncologyPrint2 from '@/pages/IPD/MedicalRecord/Page2CPN/OncologyPrint2.vue'
import EyePrint2 from '@/pages/IPD/MedicalRecord/Page2CPN/EyePrint2.vue'
import IPDMRPT10002 from '../IPDMRPT10002.vue'
import BMTIMMACH2Print from '@/pages/IPD/MedicalRecord/Page2CPN/BMTIMMACH2Print.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'IPDMedicalRecordPrinterPart2',
  props: ['Data', 'MASTERDATA', 'VisitId', 'routeType'],
  data () {
    return {
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    ListOfCurrentMedications,
    NeonatalPrint2,
    ObstetricsPrint2,
    GynecologicalPrint2,
    OncologyPrint2,
    IPDMRPT10002,
    EyePrint2,
    BMTIMMACH2Print
  },
  mounted () {
  },
  computed: {
    DateCreated: function () {
      return (this.Data.Signature && this.Data.Signature.CreatedAt) ? this.Data.Signature.CreatedAt.split(' ')[1].split('/') : ['', '', '']
    },
    HouseCreated: function () {
      return (this.Data.Signature && this.Data.Signature.CreatedAt) ? this.$options.filters.formatDateWithoutSecon(this.Data.Signature.CreatedAt).split(' ')[0].split(':') : ['', '']
    }
  },
  methods: {
    getICD10Code (icd) {
      var arr = this.JSONParse(icd) || []
      return arr.map(e => {
        return e.code
      }).join(',')
    },
    checkDich () {
      let check = false
      if (
        !this.routeType ||
        this.routeType === 'Gynecological' ||
        this.routeType === 'Obstetrics' ||
        this.routeType === 'A01_195_050919_V' ||
        this.routeType === 'A01_040_050919_V' ||
        this.routeType === 'A01_039_050919_V' ||
        this.routeType === 'Pediatric' ||
        this.routeType === 'Eye' ||
        this.routeType === 'Neonatal' ||
        this.routeType === 'CardiovascularForm'
      ) {
        check = true
      }
      return check
    }
  }
}
</script>
