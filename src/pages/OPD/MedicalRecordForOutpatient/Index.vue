<template>
  <div class="main-content" id="MedicalRecordForOutpatient-page">
    <div class="a4-page box" style="padding: 15px 55px;" id="MedicalRecordForOutpatientPrinter" v-if="loaded">
      <template>
        <table width="100%">
          <p style="text-align: center">
            <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
          </p>
        </table>
        <br>
        <table width="100%">
          <tr>
            <td width="33%" valign="center">
              <!-- <p style="text-align: center">
                <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
              </p> -->
              <div style="font-size:15px; margin-top: -17px" v-if="infoCustomer">Sở Y tế: {{infoCustomer.LocationUnit}} {{infoCustomer.Province}}</div>
              <div style="font-size:15px;"  v-if="infoCustomer">Bệnh viện ĐKQT Vinmec {{infoCustomer.Site}}</div>
            </td>
            <td align="center">
              <h2 style="font-size: 27px; white-space: nowrap; margin-bottom: 5px; margin-top: -8px; font-family: initial; font-weight: 700;">BỆNH ÁN NGOẠI TRÚ</h2>
              <div style="font-size:15px;" v-if="infoCustomer">Khoa: {{infoCustomer.Specialty.ViName}}</div>
            </td>
            <td style="display: flex; justify-content: end; margin-top: 5px;" align="center"><VueBarcode v-if="infoCustomer && infoCustomer.PID" :value="infoCustomer.PID" :height="40" :displayValue="true" :textAlign="'left'" :width="1" :marginTop="5" :fontSize="15"/></td>
          </tr>
        </table>
      </template>
      <br>
      <!-- Mục 1 và mục 2 -->
      <Tab1 :VisitVersion="VisitVersion" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :infoCustomer="infoCustomer"/>
      <!-- Mục 3 -->
      <Tab2 :VisitVersion="VisitVersion" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :infoCustomer="infoCustomer"/>
      <!-- Mục 4 -->
      <Tab3 :VisitVersion="VisitVersion" :info="info" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :infoCustomer="infoCustomer" />
      <p></p>
      <p class="only-print-page" style="text-align: right" v-if="OUTPATIENT_TIME_PHY">{{OUTPATIENT_TIME_PHY | bilingualFormatDateTimeNoEng}}</p>
      <p class="only-print-page" style="text-align: right" v-else>Ngày ........ tháng ......... năm ..............</p>
      <table class="only-web-page" width="100%">
        <tr>
          <td colspan="4" style="padding-top: 0px;padding-bottom: 0px;">
            <div class="flex align-center">
              <div style="width: 50.1%;padding-top: 8px;padding-bottom: 8px;">
                <Confirm4
                  :viewOnly="viewOnly"
                  :MedicalOutpatient="true"
                  class="mt-10"
                  v-if="loadedConfirm"
                  ref="Confirm1"
                  :FormCode="'A01_252_221222_V'"
                  :formcodeunlockform="'A01_252_221222_V'"
                  :VisitId="_VisitId"
                  :readonly="isReadonly"
                  :IsLock24h="IsLock24hBA"
                  :MasterDataCode="'OUTPATIENT_DIR'"
                  :kind="'OUTPATIENT_DIR'"
                  :FormId="DataSubmit.Id"
                  :saveSuccesss="saveSuccesss"
                  :title="{ViName: 'Giám đốc', EnName: 'Giám đốc'}"
                  :popupTitle="{ViName: 'Giám đốc', EnName: 'Giám đốc'}"
                  @handleConfirm="submit('confirm')"
                  @confirmSuccess="getData()"
                  @ResponseData="getListConfirm"
                />
              </div>
              <div style="width: 50%;padding-top: 8px;padding-bottom: 8px;">
                <Confirm4
                  :viewOnly="viewOnly"
                  :MedicalOutpatient="true"
                  class="mt-10"
                  v-if="loadedConfirm"
                  ref="Confirm2"
                  :FormCode="'A01_252_221222_V'"
                  :formcodeunlockform="'A01_252_221222_V'"
                  :VisitId="_VisitId"
                  :readonly="isReadonly"
                  :IsLock24h="IsLock24hBA"
                  :MasterDataCode="'OUTPATIENT_PHY'"
                  :kind="'OUTPATIENT_PHY'"
                  :FormId="DataSubmit.Id"
                  :saveSuccesss="saveSuccesss"
                  :title="{ViName: 'Bác sỹ khám bệnh', EnName: 'Bác sỹ khám bệnh'}"
                  :popupTitle="{ViName: 'Bác sỹ khám bệnh', EnName: 'Bác sỹ khám bệnh'}"
                  @handleConfirm="submit('confirm')"
                  @confirmSuccess="getData()"
                  @ResponseData="getListConfirm"
                />
              </div>
            </div>
          </td>
        </tr>
      </table>
      <div class="only-print-page">
        <table  class="vhidden" style="width: 100%">
          <tr>
            <th style="width: 50%" class="text-center">
              <!-- <p class="text-center"><b>{{__t('Giám đốc bệnh viện')}}</b></p> -->
              <p class="text-center"><b>Giám đốc</b></p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              <p class="text-center" v-if="OUTPATIENT_DIR">{{OUTPATIENT_DIR}}</p>
              <p class="text-center" v-else>Họ và tên:............................</p>
            </th>
            <th style="width: 50%" class="text-center">
              <!-- <p class="text-center"><b>{{__t('Trưởng khoa')}}</b></p> -->
              <p class="text-center"><b>Bác sỹ khám bệnh</b></p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              <p class="text-center" v-if="OUTPATIENT_PHY">{{OUTPATIENT_PHY}}</p>
              <p class="text-center" v-else>Họ và tên:............................</p>
            </th>
          </tr>
        </table>
      </div>
      <br/>
      <!-- Tổng kết bệnh án -->
      <!-- <Tab4 :info="info" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :infoCustomer="infoCustomer" /> -->
      <div>
        <table width="100%" class="tbl-b2">
          <tr>
            <td colspan="2">
              <div style="position: relative;">
                <div class="fw600 fs20">TỔNG KẾT BỆNH ÁN</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style="border: 1px solid #353535; padding-left: 3px; padding-right: 3px;">
                <p><b>{{dex[1]}} Quá trình bệnh lý và diễn biến lâm sàng:</b></p>
                <p v-if="MASTERDATA['OPDOENHPI']"><b>- Bệnh sử:</b> {{MASTERDATA['OPDOENHPI'].Items[0].Value}}</p>
                <!-- Khám lâm sàng ver 1 -->
                <p v-if="DataSubmit && DataSubmit.Version !== null && DataSubmit.Version < 2">
                  <b>- Khám lâm sàng: </b><template v-if="MASTERDATA['OPDOENCEF'] && DataSubmit.Clinic && DataSubmit.Clinic.Code === 'Normal'">{{getValueOfMASTERDATA('OPDOENCEF', 'OPDOENCEFANS')}}</template>
                  <!-- setung có chung trường -->
                  <template v-if="DataSubmit.IsConsultation === false">
                    <p v-if="MASTERDATA['OPDOENKTT'] && showWithClinicOld(MASTERDATA['OPDOENKTT'].Clinic)">+ Khám toàn thân: {{getValueOfMASTERDATA('OPDOENKTT', 'OPDOENKTTANS')}}</p>
                    <p v-if="MASTERDATA['OPDOENKCK'] && showWithClinicOld(MASTERDATA['OPDOENKCK'].Clinic)">+ Khám chuyên khoa: {{getValueOfMASTERDATA('OPDOENKCK', 'OPDOENKCKANS')}}</p>
                    <p v-if="MASTERDATA['OPDOENKTP'] && hideWithOPDOENDG() && showWithClinicOld(MASTERDATA['OPDOENKTP'].Clinic)">+ Khám tim mạch, hô hấp: {{getValueOfMASTERDATA('OPDOENKTP', 'OPDOENKTPANS')}}</p>
                    <p v-if="MASTERDATA['OPDOENKTP'] && showWithClinicOld() && showWithClinicOld(MASTERDATA['OPDOENKTP'].Clinic)">+ Khám tim mạch, hô hấp: {{getValueOfMASTERDATA('OPDOENKTP', 'OPDOENKTPANS')}}</p>
                    <p v-if="MASTERDATA['OPDOENKTP1'] && showWithClinicOld(MASTERDATA['OPDOENKTP1'].Clinic) && MASTERDATA['OPDOENBNTHPT'].Items[0].Value === true">+ Khám tim, phổi: {{getValueOfMASTERDATA('OPDOENKTP1', 'OPDOENKTP1ANS')}}</p>
                    <p v-if="MASTERDATA['OPDOENKCBPK'] && showWithClinicOld(MASTERDATA['OPDOENKCBPK'].Clinic)">+ Khám các bộ phận khác (nếu có): {{getValueOfMASTERDATA('OPDOENKCBPK', 'OPDOENKCBPKANS')}}</p>
                  </template>
                  <!-- setup nhi -->
                  <template v-if="showWithClinicOld('FreeTextOnly-005') && DataSubmit.IsConsultation === false">
                    <p>+ Khám tai mũi họng: {{getValueOfMASTERDATA('OPDOENKTMH', 'OPDOENKTMHANS')}}</p>
                    <p>+ Khám dinh dưỡng: {{getValueOfMASTERDATA('OPDOENKDD', 'OPDOENKDDANS')}}</p>
                    <p>+ Đánh giá tiêm chủng: {{getValueOfMASTERDATA('OPDOENTC', 'OPDOENTCANS')}}</p>
                    <p>+ Đánh giá phát triển vận động theo tuổi: {{getValueOfMASTERDATA('OPDOENPTVD', 'OPDOENPTVDANS')}}</p>
                    <p>+ Đánh giá phát triển tinh thần theo tuổi: {{getValueOfMASTERDATA('OPDOENPTTT', 'OPDOENPTTTANS')}}</p>
                  </template>
                  <!-- set up Phục hồi chức năng -->
                  <template v-if="showWithClinicOld('MultiSelect-001') && DataSubmit.IsConsultation === false">
                    <template v-if="MASTERDATA['OPDOENDG'].Items[0].Value">
                      <p>+ Đánh giá mức độ mất chức năng của khu vực tổn thương: {{getValueOfMASTERDATA('OPDOENMCN', 'OPDOENMCNANS')}}</p>
                      <p>+ Đánh gía khả năng di chuyển trên mặt bằng phẳng: {{getValueOfMASTERDATA('OPDOENDCT', 'OPDOENDCTANS')}}</p>
                      <p>+ Đánh giá khả năng thay đổi tư thế (nằm – ngồi – đứng): {{getValueOfMASTERDATA('OPDOENTDTT', 'OPDOENTDTTANS')}}</p>
                      <p>+ Đánh giá khả năng thực hiện các vận động phối hợp (vươn người bắt tay, cúi người nhặt dép): {{getValueOfMASTERDATA('OPDOENTHCVD', 'OPDOENTHCVDANS')}}</p>
                      <p>+ Đánh giá khả năng PHCN và mức độ di chứng: {{getValueOfMASTERDATA('OPDOENPHCN', 'OPDOENPHCNANS')}}</p>
                    </template>
                    <template v-if="MASTERDATA['OPDOENDG'].Items[1].Value">
                      <p>+ Đánh giá chức năng hô hấp (Dung tích sống, nhịp thở..): {{getValueOfMASTERDATA('OPDOENCNHH', 'OPDOENCNHHANS')}}</p>
                      <p>+ Đánh giá sự cân đối và độ di động lồng ngực: {{getValueOfMASTERDATA('OPDOENSCD', 'OPDOENSCDANS')}}</p>
                      <p>+ Đánh giá khả năng gắng sức: {{getValueOfMASTERDATA('OPDOENKNGS', 'OPDOENKNGSANS')}}</p>
                      <p>+ Đánh giá mức độ thay đổi nhịp tim sau vận động: {{getValueOfMASTERDATA('OPDOENTDNT', 'OPDOENTDNTANS')}}</p>
                    </template>
                    <template v-if="MASTERDATA['OPDOENDG'].Items[2].Value">
                      <p>+ Đánh giá khả năng giao tiếp (tinh thần, phát âm…): {{getValueOfMASTERDATA('OPDOENKNGT', 'OPDOENKNGTANS')}}</p>
                      <p>+ Đánh giá tình trạng rối loạn nuốt: {{getValueOfMASTERDATA('OPDOENTTRLN', 'OPDOENTTRLNANS')}}</p>
                      <p>+ Đánh giá khả năng nhận thức không gian, thời gian: {{getValueOfMASTERDATA('OPDOENNTKG', 'OPDOENNTKGANS')}}</p>
                      <p>+ Đánh giá khả năng điều vận (tầm, hướng, thăng bằng): {{getValueOfMASTERDATA('OPDOENDVTH', 'OPDOENDVTHANS')}}</p>
                      <p>+ Đánh giá khả năng di chuyển độc lập ở nơi bằng phẳng: {{getValueOfMASTERDATA('OPDOENDCDL', 'OPDOENDCDLANS')}}</p>
                    </template>
                  </template>
                  <!-- set up Liên chuyên khoa/ Da liễu -->
                  <template v-if="showWithClinicOld('RadioYesNo-001') && DataSubmit.IsConsultation === false">
                  </template>
                  <!-- set up Chung -->
                  <template v-if="showWithClinicOld('FreeTextOnly-001') && DataSubmit.IsConsultation === false">
                  </template>
                  <!-- set up Dinh dưỡng -->
                  <template v-if="showWithClinicOld('FreeTextOnly-002') && DataSubmit.IsConsultation === false">
                    <p>+ BMI: {{getValueOfMASTERDATA('OPDOENBMI', 'OPDOENBMIANS')}}</p>
                    <p>+ Khám tình trạng tăng hoặc giảm cân: {{getValueOfMASTERDATA('OPDOENKTTTHGC', 'OPDOENKTTTHGCANS')}}</p>
                    <p>+ Đánh giá cảm giác ngon miệng, nôn/trớ, đại tiểu tiện: {{getValueOfMASTERDATA('OPDOENDGCGNM', 'OPDOENDGCGNMANS')}}</p>
                    <p>+ Đánh giá da, niêm mạc, tóc, móng, răng, giấc ngủ: {{getValueOfMASTERDATA('OPDOENDGDNM', 'OPDOENDGDNMANS')}}</p>
                    <p>+ Khám lồng ngực, xương, khớp xương sọ, thóp: {{getValueOfMASTERDATA('OPDOENKLN', 'OPDOENKLNANS')}}</p>
                    <p>+ Khám các bộ phận khác: {{getValueOfMASTERDATA('OPDOENKCBPK', 'OPDOENKCBPKANS')}}</p>
                  </template>
                  <!-- set up tâm lý -->
                  <template v-if="showWithClinicOld('MultiSelect-002') && DataSubmit.IsConsultation === false">
                    <div>
                      <p>+ Ngôn ngữ: {{getValueOfMASTERDATA('OPDOENNGNG', 'OPDOENNGNGANS')}}</p>
                      <p>+ Nhận thức, tương tác xã hội: {{getValueOfMASTERDATA('OPDOENNTTTXH', 'OPDOENNTTTXHANS')}}</p>
                      <p>+ Hành vi, tập trung chú ý: {{getValueOfMASTERDATA('OPDOENHVTTCY', 'OPDOENHVTTCYANS')}}</p>
                      <p>+ Cảm xúc, cảm giác: {{getValueOfMASTERDATA('OPDOENCGXG', 'OPDOENCGXGANS')}}</p>
                      <p>+ Kỹ năng tự phục vụ: {{getValueOfMASTERDATA('OPDOENKTTPV', 'OPDOENKTTPVANS')}}</p>
                      <p>+ Test tâm lý cần thiết: {{getValueOfMASTERDATA('OPDOENMSTTLCT', 'OPDOENMSTTLCTANS')}}</p>
                      <p>+ Các cơ quan khác (Tim, phổi, tiêu hóa, …): {{getValueOfMASTERDATA('OPDOENCCQK', 'OPDOENCCQKANS')}}</p>
                    </div>
                  </template>
                </p>
                <!-- Khám lâm sàng Ver 2 -->
                <p v-else>
                  <b>- Khám lâm sàng: </b><template v-if="showWithClinic('FreeTextOnly-000') && DataSubmit.IsConsultation === false">{{getValueOfMASTERDATA('OPDOENCEF', 'OPDOENCEFANS')}}</template>
                  <!-- setung có chung trường -->
                  <template v-if="showWithClinic('FreeTextOnly-005,MultiSelect-001,RadioYesNo-001,FreeTextOnly-001') && DataSubmit.IsConsultation === false">
                    <p>+ Khám toàn thân: {{getValueOfMASTERDATA('OPDOENKTT', 'OPDOENKTTANS')}}</p>
                    <!-- Chỉ có 1 set up da liễu -->
                    <template v-if="showWithClinic('RadioYesNo-001') && !showWithClinic('FreeTextOnly-005,MultiSelect-001,FreeTextOnly-001')">
                      <p>+ Khám chuyên khoa: {{getValueOfMASTERDATA('OPDOENKCK', 'OPDOENKCKANS')}}</p>
                      <template v-if="MASTERDATA['OPDOENBNTHPT'].Items[0].Value">
                        <p>+ Khám tim mạch, hô hấp: {{getValueOfMASTERDATA('OPDOENKTP1', 'OPDOENKTP1ANS')}}</p>
                      </template>
                      <p>+ Khám các bộ phận khác: {{getValueOfMASTERDATA('OPDOENKCBPK', 'OPDOENKCBPKANS')}}</p>
                    </template>
                    <!-- Nhiều set up -->
                    <template v-else-if="showWithClinic('RadioYesNo-001') && showWithClinic('FreeTextOnly-005,MultiSelect-001,FreeTextOnly-001')">
                      <p>+ Khám chuyên khoa: {{getValueOfMASTERDATA('OPDOENKCK', 'OPDOENKCKANS')}}</p>
                      <template v-if="MASTERDATA['OPDOENBNTHPT'].Items[0].Value">
                        <p>+ Khám tim mạch, hô hấp: {{getValueOfMASTERDATA('OPDOENKTP1', 'OPDOENKTP1ANS')}}</p>
                      </template>
                      <p>+ Khám các bộ phận khác: {{getValueOfMASTERDATA('OPDOENKCBPK', 'OPDOENKCBPKANS')}}</p>
                    </template>
                    <template v-else>
                      <p>+ Khám chuyên khoa: {{getValueOfMASTERDATA('OPDOENKCK', 'OPDOENKCKANS')}}</p>
                      <p>+ Khám tim mạch, hô hấp: {{getValueOfMASTERDATA('OPDOENKTP1', 'OPDOENKTP1ANS')}}</p>
                      <p>+ Khám các bộ phận khác: {{getValueOfMASTERDATA('OPDOENKCBPK', 'OPDOENKCBPKANS')}}</p>
                    </template>
                  </template>
                  <!-- setup nhi -->
                  <template v-if="showWithClinic('FreeTextOnly-005') && DataSubmit.IsConsultation === false">
                    <!-- <p>+ Khám chuyên khoa: {{getValueOfMASTERDATA('OPDOENKCK', 'OPDOENKCKANS')}}</p>
                    <p>+ Khám tim mạch, hô hấp: {{getValueOfMASTERDATA('OPDOENKTP1', 'OPDOENKTP1ANS')}}</p>
                    <p>+ Khám các bộ phận khác: {{getValueOfMASTERDATA('OPDOENKCBPK', 'OPDOENKCBPKANS')}}</p> -->
                    <p>+ Đánh giá về dinh dưỡng: {{getValueOfMASTERDATA('OPDOENKDD', 'OPDOENKDDANS')}}</p>
                    <p>+ Đánh giá về tiêm chủng: {{getValueOfMASTERDATA('OPDOENTC', 'OPDOENTCANS')}}</p>
                    <p>+ Đánh giá phát triển vận động theo tuổi: {{getValueOfMASTERDATA('OPDOENPTVD', 'OPDOENPTVDANS')}}</p>
                    <p>+ Đánh giá phát triển tinh thần theo tuổi: {{getValueOfMASTERDATA('OPDOENPTTT', 'OPDOENPTTTANS')}}</p>
                  </template>
                  <!-- set up Phục hồi chức năng -->
                  <template v-if="showWithClinic('MultiSelect-001') && DataSubmit.IsConsultation === false">
                    <!-- <p>+ Khám chuyên khoa: {{getValueOfMASTERDATA('OPDOENKCK', 'OPDOENKCKANS')}}</p>
                    <p>+ Khám tim mạch, hô hấp: {{getValueOfMASTERDATA('OPDOENKTP1', 'OPDOENKTP1ANS')}}</p>
                    <p>+ Khám các bộ phận khác: {{getValueOfMASTERDATA('OPDOENKCBPK', 'OPDOENKCBPKANS')}}</p> -->
                    <template v-if="MASTERDATA['OPDOENDG'].Items[0].Value">
                      <p>+ Đánh giá mức độ mất chức năng của khu vực tổn thương: {{getValueOfMASTERDATA('OPDOENMCN', 'OPDOENMCNANS')}}</p>
                      <p>+ Đánh gía khả năng di chuyển trên mặt bằng phẳng: {{getValueOfMASTERDATA('OPDOENDCT', 'OPDOENDCTANS')}}</p>
                      <p>+ Đánh giá khả năng thay đổi tư thế (nằm – ngồi – đứng): {{getValueOfMASTERDATA('OPDOENTDTT', 'OPDOENTDTTANS')}}</p>
                      <p>+ Đánh giá khả năng thực hiện các vận động phối hợp (vươn người bắt tay, cúi người nhặt dép): {{getValueOfMASTERDATA('OPDOENTHCVD', 'OPDOENTHCVDANS')}}</p>
                      <p>+ Đánh giá khả năng PHCN và mức độ di chứng: {{getValueOfMASTERDATA('OPDOENPHCN', 'OPDOENPHCNANS')}}</p>
                    </template>
                    <template v-if="MASTERDATA['OPDOENDG'].Items[1].Value">
                      <p>+ Đánh giá chức năng hô hấp (Dung tích sống, nhịp thở..): {{getValueOfMASTERDATA('OPDOENCNHH', 'OPDOENCNHHANS')}}</p>
                      <p>+ Đánh giá sự cân đối và độ di động lồng ngực: {{getValueOfMASTERDATA('OPDOENSCD', 'OPDOENSCDANS')}}</p>
                      <p>+ Đánh giá khả năng gắng sức: {{getValueOfMASTERDATA('OPDOENKNGS', 'OPDOENKNGSANS')}}</p>
                      <p>+ Đánh giá mức độ thay đổi nhịp tim sau vận động: {{getValueOfMASTERDATA('OPDOENTDNT', 'OPDOENTDNTANS')}}</p>
                    </template>
                    <template v-if="MASTERDATA['OPDOENDG'].Items[2].Value">
                      <p>+ Đánh giá khả năng giao tiếp (tinh thần, phát âm…): {{getValueOfMASTERDATA('OPDOENKNGT', 'OPDOENKNGTANS')}}</p>
                      <p>+ Đánh giá tình trạng rối loạn nuốt: {{getValueOfMASTERDATA('OPDOENTTRLN', 'OPDOENTTRLNANS')}}</p>
                      <p>+ Đánh giá khả năng nhận thức không gian, thời gian: {{getValueOfMASTERDATA('OPDOENNTKG', 'OPDOENNTKGANS')}}</p>
                      <p>+ Đánh giá khả năng điều vận (tầm, hướng, thăng bằng): {{getValueOfMASTERDATA('OPDOENDVTH', 'OPDOENDVTHANS')}}</p>
                      <p>+ Đánh giá khả năng di chuyển độc lập ở nơi bằng phẳng: {{getValueOfMASTERDATA('OPDOENDCDL', 'OPDOENDCDLANS')}}</p>
                    </template>
                  </template>
                  <!-- set up Liên chuyên khoa/ Da liễu -->
                  <template v-if="showWithClinic('RadioYesNo-001') && DataSubmit.IsConsultation === false">
                    <!-- <p>+ Khám chuyên khoa: {{getValueOfMASTERDATA('OPDOENKCK', 'OPDOENKCKANS')}}</p>
                    <template v-if="MASTERDATA['OPDOENBNTHPT'].Items[0].Value">
                      <p>+ Khám tim mạch, hô hấp: {{getValueOfMASTERDATA('OPDOENKTP1', 'OPDOENKTP1ANS')}}</p>
                    </template>
                    <p>+ Khám các bộ phận khác: {{getValueOfMASTERDATA('OPDOENKCBPK', 'OPDOENKCBPKANS')}}</p> -->
                  </template>
                  <!-- set up Chung -->
                  <template v-if="showWithClinic('FreeTextOnly-001') && DataSubmit.IsConsultation === false">
                    <!-- <p>+ Khám chuyên khoa: {{getValueOfMASTERDATA('OPDOENKCK', 'OPDOENKCKANS')}}</p>
                    <p>+ Khám tim mạch, hô hấp: {{getValueOfMASTERDATA('OPDOENKTP1', 'OPDOENKTP1ANS')}}</p>
                    <p>+ Khám các bộ phận khác: {{getValueOfMASTERDATA('OPDOENKCBPK', 'OPDOENKCBPKANS')}}</p> -->
                  </template>
                  <!-- set up Dinh dưỡng -->
                  <template v-if="showWithClinic('FreeTextOnly-002') && DataSubmit.IsConsultation === false">
                    <p>+ BMI: {{getValueOfMASTERDATA('OPDOEN526', 'OPDOEN527')}}</p>
                    <p>+ Đánh giá tình trạng tăng hoặc giảm cân và số cân tăng, giảm trong 1 - 3 tháng qua: {{getValueOfMASTERDATA('OPDOENKTTTHGC', 'OPDOENKTTTHGCANS')}}</p>
                    <p>+ Đánh giá cảm giác ngon miệng, buồn nôn và nôn/trớ, đại tiểu tiện: {{getValueOfMASTERDATA('OPDOENDGCGNM', 'OPDOENDGCGNMANS')}}</p>
                    <p>+ Đánh giá da, niêm mạc, tóc, móng, răng, giấc ngủ: {{getValueOfMASTERDATA('OPDOENDGDNM', 'OPDOENDGDNMANS')}}</p>
                    <p>+ Đánh giá lồng ngực, xương, khớp xương sọ, thóp: {{getValueOfMASTERDATA('OPDOENKLN', 'OPDOENKLNANS')}}</p>
                  </template>
                  <!-- set up tâm lý -->
                  <template v-if="showWithClinic('MultiSelect-002') && MASTERDATA['OPDOENYTD'] && DataSubmit.IsConsultation === false">
                    <div v-if="MASTERDATA['OPDOENYTD'].Items[1].Value && !MASTERDATA['OPDOENYTD'].Items[2].Value && !MASTERDATA['OPDOENYTD'].Items[3].Value">
                      <p>+ Ngôn ngữ: {{getValueOfMASTERDATA('OPDOENTK0001', 'OPDOENTK0001ANS')}}</p>
                      <p>+ Nhận thức: {{getValueOfMASTERDATA('OPDOENTK0002', 'OPDOENTK0002ANS')}}</p>
                      <p>+ Tương tác xã hội: {{getValueOfMASTERDATA('OPDOENTK0003', 'OPDOENTK0003ANS')}}</p>
                      <p>+ Hành vi: {{getValueOfMASTERDATA('OPDOENTK0004', 'OPDOENTK0004ANS')}}</p>
                      <p>+ Chú ý: {{getValueOfMASTERDATA('OPDOENTK0005', 'OPDOENTK0005ANS')}}</p>
                      <p>+ Cảm xúc: {{getValueOfMASTERDATA('OPDOENTK0006', 'OPDOENTK0006ANS')}}</p>
                      <p>+ Cảm giác: {{getValueOfMASTERDATA('OPDOENTK0007', 'OPDOENTK0007ANS')}}</p>
                      <p>+ Kĩ năng tự phục vụ: {{getValueOfMASTERDATA('OPDOENTK0008', 'OPDOENTK0008ANS')}}</p>
                      <p>+ Một số test tâm lý cần thiết: {{getValueOfMASTERDATA('OPDOENTK0009', 'OPDOENTK0009ANS')}}</p>
                    </div>
                    <template v-else-if="MASTERDATA['OPDOENYTD'].Items[2].Value && !MASTERDATA['OPDOENYTD'].Items[1].Value && !MASTERDATA['OPDOENYTD'].Items[3].Value">
                      <p>+ Biểu hiện chung: {{getValueOfMASTERDATA('OPDOENTK0011', 'OPDOENTK0011ANS')}}</p>
                      <p>+ Nhận thức: {{getValueOfMASTERDATA('OPDOENTK0002', 'OPDOENTK0002ANS')}}</p>
                      <p>+ Cảm giác: {{getValueOfMASTERDATA('OPDOENTK0007', 'OPDOENTK0007ANS')}}</p>
                      <p>+ Tri giác: {{getValueOfMASTERDATA('OPDOENTK0014', 'OPDOENTK0014ANS')}}</p>
                      <p>+ Tư duy: {{getValueOfMASTERDATA('OPDOENTK0013', 'OPDOENTK0013ANS')}}</p>
                      <p>+ Cảm xúc: {{getValueOfMASTERDATA('OPDOENTK0006', 'OPDOENTK0006ANS')}}</p>
                      <p>+ Hành vi: {{getValueOfMASTERDATA('OPDOENTK0004', 'OPDOENTK0004ANS')}}</p>
                      <p>+ Chú ý: {{getValueOfMASTERDATA('OPDOENTK0005', 'OPDOENTK0005ANS')}}</p>
                      <p>+ Trí nhớ: {{getValueOfMASTERDATA('OPDOEN514', 'OPDOEN515')}}</p>
                      <p>+ Trí tuệ: {{getValueOfMASTERDATA('OPDOEN516', 'OPDOEN517')}}</p>
                      <p>+ Một số test tâm lý cần thiết: {{getValueOfMASTERDATA('OPDOENTK0009', 'OPDOENTK0009ANS')}}</p>
                    </template>
                    <template v-else-if="MASTERDATA['OPDOENYTD'].Items[3].Value && !MASTERDATA['OPDOENYTD'].Items[1].Value && !MASTERDATA['OPDOENYTD'].Items[2].Value">
                      <p>+ Ngôn ngữ: {{getValueOfMASTERDATA('OPDOENTK0001', 'OPDOENTK0001ANS')}}</p>
                      <p>+ Nhận thức: {{getValueOfMASTERDATA('OPDOENTK0002', 'OPDOENTK0002ANS')}}</p>
                      <p>+ Kĩ năng tự phục vụ: {{getValueOfMASTERDATA('OPDOENTK0008', 'OPDOENTK0008ANS')}}</p>
                      <p>+ Một số test tâm lý cần thiết: {{getValueOfMASTERDATA('OPDOENTK0009', 'OPDOENTK0009ANS')}}</p>
                      <p>+ Trương lực cơ: {{getValueOfMASTERDATA('OPDOENTK0020', 'OPDOENTK0020ANS')}}</p>
                      <p>+ Vận động tinh: {{getValueOfMASTERDATA('OPDOENTK0023', 'OPDOENTK0023ANS')}}</p>
                      <p>+ Vận động thô: {{getValueOfMASTERDATA('OPDOENTK0024', 'OPDOENTK0024ANS')}}</p>
                    </template>
                    <template v-else>
                      <p v-if="MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[3].Value">+ Ngôn ngữ: {{getValueOfMASTERDATA('OPDOENTK0001', 'OPDOENTK0001ANS')}}</p>
                      <p v-if="MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value || MASTERDATA['OPDOENYTD'].Items[3].Value">+ Nhận thức: {{getValueOfMASTERDATA('OPDOENTK0002', 'OPDOENTK0002ANS')}}</p>
                      <p v-if="MASTERDATA['OPDOENYTD'].Items[1].Value">+ Tương tác xã hội: {{getValueOfMASTERDATA('OPDOENTK0003', 'OPDOENTK0003ANS')}}</p>
                      <p v-if="MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value">+ Hành vi: {{getValueOfMASTERDATA('OPDOENTK0004', 'OPDOENTK0004ANS')}}</p>
                      <p v-if="MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value">+ Chú ý: {{getValueOfMASTERDATA('OPDOENTK0005', 'OPDOENTK0005ANS')}}</p>
                      <p v-if="MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value">+ Cảm xúc: {{getValueOfMASTERDATA('OPDOENTK0006', 'OPDOENTK0006ANS')}}</p>
                      <p v-if="MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value">+ Cảm giác: {{getValueOfMASTERDATA('OPDOENTK0007', 'OPDOENTK0007ANS')}}</p>
                      <p v-if="MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[3].Value">+ Kĩ năng tự phục vụ: {{getValueOfMASTERDATA('OPDOENTK0008', 'OPDOENTK0008ANS')}}</p>
                      <p v-if="MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value || MASTERDATA['OPDOENYTD'].Items[3].Value">+ Một số test tâm lý cần thiết: {{ getValueOfMASTERDATA('OPDOENTK0009', 'OPDOENTK0009ANS')}}</p>
                      <template v-if="MASTERDATA['OPDOENYTD'].Items[2].Value">
                        <p>+ Biểu hiện chung: {{getValueOfMASTERDATA('OPDOENTK0011', 'OPDOENTK0011ANS')}}</p>
                        <p>+ Tri giác: {{getValueOfMASTERDATA('OPDOENTK0014', 'OPDOENTK0014ANS')}}</p>
                        <p>+ Tư duy: {{getValueOfMASTERDATA('OPDOENTK0013', 'OPDOENTK0013ANS')}}</p>
                        <p>+ Trí nhớ: {{getValueOfMASTERDATA('OPDOEN514', 'OPDOEN515')}}</p>
                        <p>+ Trí tuệ: {{getValueOfMASTERDATA('OPDOEN516', 'OPDOEN517')}}</p>
                      </template>
                      <template v-if="MASTERDATA['OPDOENYTD'].Items[3].Value">
                        <template>
                          <p>+ Trương lực cơ: {{getValueOfMASTERDATA('OPDOENTK0020', 'OPDOENTK0020ANS')}}</p>
                          <p>+ Vận động tinh: {{getValueOfMASTERDATA('OPDOENTK0023', 'OPDOENTK0023ANS')}}</p>
                          <p>+ Vận động thô: {{getValueOfMASTERDATA('OPDOENTK0024', 'OPDOENTK0024ANS')}}</p>
                        </template>
                      </template>
                    </template>
                  </template>
                </p>
                <p v-if="MASTERDATA['OPDOENPT0']"><b>{{dex[2]}} Tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị chẩn đoán:</b> {{MASTERDATA['OPDOENPT0'].Items[1].Value}}</p>
                <p><b>{{dex[3]}} Chẩn đoán ra viện</b></p>
                <table v-if="MASTERDATA['OPDOENICD']" colspan="2" width="100%">
                  <tr colspan="2" v-if="MASTERDATA['OPDOENICD']">
                    <td colspan="2">
                      <p style="margin:0">- Bệnh chính: {{MASTERDATA['OPDOENDD0'].Items[0].Value || ''}}</p>
                    </td>
                    <template v-if="MASTERDATA['OPDOENICD'].Items[0].Value">
                      <td style="text-align: right;" :key="index" v-for="(item, index) in MASTERDATA['OPDOENICD'].Items[0].Value">
                        <CharWithSquare :text="item.code" :defaultlength="4"  />
                      </td>
                    </template>
                    <template v-else>
                      <td style="text-align: right;">
                        <CharWithSquare :text="textNull" :defaultlength="4"  />
                      </td>
                    </template>
                  </tr>
                </table>
                <!-- <template style="white-space: nowrap;" colspan="2" v-if="MASTERDATA['OPDOENICD'] && MASTERDATA['OPDOENDD0']">
                  <p v-if="MASTERDATA['OPDOENDD0']" class="inline-block mt-5 ml-5"> - Bệnh chính: {{MASTERDATA['OPDOENDD0'].Items[0].Value}}</p>
                  <p class="inline-block float-right mr-5" :key="index" v-for="(item, index) in MASTERDATA['OPDOENICD'].Items[0].Value">
                    <CharWithSquare :text="item.code" :defaultlength="4"/>
                  </p>
                </template><br/> -->
                <table v-if="MASTERDATA['OPDOENICD'] && MASTERDATA['OPDOENICD'].Items[1].Value && getLength(MASTERDATA['OPDOENICD'].Items[1].Value) === false" width="100%">
                  <tr>
                    <td colspan="2">
                      <p class="inline-block">- Bệnh kèm theo (nếu có): {{getICD10Value(MASTERDATA['OPDOENICD'].Items[1].Value)}}</p>
                    </td>
                  </tr>
                  <tr :key="index" v-for="(item2, index) in MASTERDATA['OPDOENICD'].Items[1].Value">
                    <td>
                      {{item2.ViName}}
                    </td>
                    <td style="text-align: right;">
                      <CharWithSquare :text="item2.code" :defaultlength="4"  />
                    </td>
                  </tr>
                </table>
                <table v-else colspan="2"  width="100%">
                  <tr colspan="2" v-if="MASTERDATA['OPDOENICD']">
                    <template v-if="MASTERDATA['OPDOENICD'].Items[1].Value">
                      <td colspan="2">
                        <p class="mt-5">- Bệnh kèm theo (nếu có): {{getICD10Value(MASTERDATA['OPDOENICD'].Items[1].Value)}}</p>
                      </td>
                      <td style="text-align: right;" :key="index" v-for="(item, index) in MASTERDATA['OPDOENICD'].Items[1].Value">
                        <CharWithSquare :text="item.code" :defaultlength="4"  />
                      </td>
                    </template>
                    <template v-else>
                      <td colspan="2">
                        <p class="mt-5">- Bệnh kèm theo (nếu có):</p>
                      </td>
                      <td style="text-align: right;">
                        <CharWithSquare :text="textNull" :defaultlength="4"  />
                      </td>
                    </template>
                  </tr>
                </table>
                <p v-if="MASTERDATA['OPDOENTP0']"><b>{{dex[4]}} Phương pháp điều trị:</b> {{MASTERDATA['OPDOENTP0'].Items[0].Value}}</p>
                <p v-if="MASTERDATA['OPDOENPT614']"><b>{{dex[5]}} Tình trạng người bệnh ra viện:</b> {{getLabel()}}</p>
                <p v-if="MASTERDATA['OPDOENRFU']"><b>{{dex[6]}} Hướng điều trị và các chế độ tiếp theo:</b> {{MASTERDATA['OPDOENRFU'].Items[0].Value}}</p>
                <br/>
                <div class="row">
                  <div class="only-web-page col-md-4 col-sm-4 col-md-offset-8 col-sm-offset-8" >
                    <Confirm4
                      :viewOnly="viewOnly"
                      :MedicalOutpatient="true"
                      class="mt-10"
                      v-if="loadedConfirm"
                      ref="Confirm3"
                      :FormCode="'A01_252_221222_V'"
                      :formcodeunlockform="'A01_252_221222_V'"
                      :VisitId="_VisitId"
                      :readonly="isReadonly"
                      :IsLock24h="IsLock24hBA"
                      :MasterDataCode="'OUTPATIENT_PHY_SUMMARY'"
                      :kind="'OUTPATIENT_PHY_SUMMARY'"
                      :FormId="DataSubmit.Id"
                      :saveSuccesss="saveSuccesss"
                      :title="{ViName: 'Bác sỹ điều trị', EnName: 'Bác sỹ điều trị'}"
                      :popupTitle="{ViName: 'Bác sỹ điều trị', EnName: 'Bác sỹ điều trị'}"
                      @handleConfirm="submit('confirm')"
                      @confirmSuccess="getData()"
                      @ResponseData="getListConfirm"
                    />
                  </div>
                </div>
                <table class="tbl-b only-print-page" style="width: 100%">
                  <tr>
                    <td style="width: 40%" class="text-center" colspan="2">{{__t('Hồ sơ, phim, ảnh')}}</td>
                    <td style="width: 30%" class="text-center">Người giao hồ sơ</td>
                    <td style="width: 30%" v-if="OUTPATIENT_PHY_TIME_SUMMARY" class="text-center">{{OUTPATIENT_PHY_TIME_SUMMARY | bilingualFormatDateTimeNoEng}}</td>
                    <td style="width: 30%" v-else class="text-center">Ngày ..... tháng ..... năm .....</td>
                  </tr>
                  <tr>
                    <td class="text-center">{{__t('Loại')}}</td>
                    <td class="text-center">{{__t('Số tờ')}}</td>
                    <td rowspan="3" style="vertical-align: bottom">
                      Họ tên.............................................
                    </td>
                    <td rowspan="8">
                      <!-- <p class="text-center"><b>{{__t('Giám đốc bệnh viện')}}</b></p> -->
                      <p class="text-center"><b>Bác sỹ điều trị</b></p>
                      <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
                      <div class="hidden-text"><b>Bác sỹ điều trị</b></div>
                      <div class="hidden-text"><b>Bác sỹ điều trị</b></div>
                      <p style="vertical-align: bottom" class="text-center" v-if="OUTPATIENT_PHY_SUMMARY">{{OUTPATIENT_PHY_SUMMARY}}</p>
                      <p style="margin: 10px 0 0 0 " v-else>Họ tên.............................................</p>
                    </td>
                  </tr>
                  <tr>
                    <td>- X - quang</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>- CT Scanner</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>- Siêu âm</td>
                    <td></td>
                    <td class="text-center">Người nhận hồ sơ</td>
                  </tr>
                  <tr>
                    <td>- Xét nghiệm</td>
                    <td></td>
                    <td rowspan="3" style="vertical-align: bottom">
                      Họ tên.............................................
                    </td>
                  </tr>
                  <tr>
                    <td>- Khác ............</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>- Toàn bộ hồ sơ</td>
                    <td></td>
                  </tr>
                </table>
                <br>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <p class="only-web-page">A01_252_221222_V</p>
    </div>
    <div v-else class="text-center">
      <v-loading/>
    </div>
    <FloatBlock v-if="!viewOnly">
      <template slot='buttons'>
        <div class="col-md-4">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-group1">
            <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
  </div>
</template>

<script>
import EIOService from '@/services/IPD/EIOService'
import VueBarcode from 'vue-barcode'
import Tab1 from './Tab1.vue'
import Tab2 from './Tab2.vue'
import Tab3 from './Tab3.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/FormOutpatientExaminationNew.js'
import MedicalRecordMixinForm from '@/pages/IPD/MedicalRecord/Mixin.js'
import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
import _ from 'lodash'
import CustomerInfor from '@/services/CustomerInfor'
import CustomerOPD from '@/services/OPD/Customer'
// import Confirm from '@/components/Form/Confirm'
import Confirm4 from '@/components/Form/Confirm4'
import moment from 'moment'

export default {
  name: 'MedicalRecordForOutpatient',
  mixins: [MixinMasterData, MixinForm, MedicalRecordMixinForm],
  props: ['viewOnly', 'VisitType', 'VisitId'],
  data () {
    return {
      textNull: 'N/A',
      IsLock24hBA: null,
      VisitVersion: null,
      loaded: false,
      customer: this.$store.state.account,
      infoCustomer: null,
      DataSubmit: null,
      info: null,
      saveSuccesss: false,
      loadedConfirm: false,
      ConfirmInfo: {},
      OUTPATIENT_DIR: '',
      OUTPATIENT_TIME_DIR: '',
      OUTPATIENT_PHY: '',
      OUTPATIENT_TIME_PHY: '',
      OUTPATIENT_PHY_SUMMARY: '',
      OUTPATIENT_PHY_TIME_SUMMARY: '',
      dex: [],
      indexs: []
    }
  },
  components: {VueBarcode, Tab1, OutpatientExaminationNote, Tab2, Tab3, Confirm4},
  mounted () {
    this.dex = this.getIndex(this.$route.meta.type)
    console.log(this.customer, 'check customer')
    console.log(this.DataSubmit, 'check customer')
    console.log(this.MedicalRecordFormCode, 'check form code:')
    this.getMasterDatas({ Form: 'OPDOEN' }, () => {
      this.getData()
    })
  },
  computed: {
    isReadonly: function () {
      return (
        this.DataSubmit.IsLock24hBA || this.viewOnly
        // false
        // true
      )
    },
    PID () {
      if (this.infoCustomer) {
        return this.infoCustomer.PID
      }
      return ''
    },
    age () {
      if (this.infoCustomer) {
        return this.infoCustomer.AgeFormated.split('-')
      }
      return ''
    },
    MedicalHistory: function () {
      if (this.MASTERDATA['OPDOENTSSK'] && this.MASTERDATA['OPDOENTSKN'] && this.MASTERDATA['OPDOENTSK']) {
        var arrData = []
        for (let i of this.MedicalHistoryData) {
          const data = this.MASTERDATA[i].Items[0].Value
          if (data) {
            arrData.push(data)
          }
        }
        return arrData.join(', ')
      }
      return null
    }
  },
  methods: {
    showWithOPDOENDG () {
      return (
        this.MASTERDATA['OPDOENDG'].Items[0].Value ||
        this.MASTERDATA['OPDOENDG'].Items[2].Value
      )
    },
    hideWithOPDOENDG () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Code !== 'MultiSelect-001'
      }
      return false
    },
    getLabel () {
      if (this.MASTERDATA['OPDOENPT614']) {
        if (!this.MASTERDATA['OPDOENPT614'].Items[4].Value) {
          for (let i of this.MASTERDATA['OPDOENPT614'].Items) {
            if (i.Value === true) {
              return i.ViName
            }
          }
        } else {
          return this.MASTERDATA['OPDOENPT614'].Items[5].Value
        }
      }
    },
    getVisitVersion () {
      new EIOService().find('EMRForm/GetVersionByVisit/' + this._VisitId + '/' + this._VisitType).then(response => {
        this.VisitVersion = response.Version
      }).catch((e) => {
        console.log(e)
      })
    },
    getInfo () {
      new CustomerOPD({noLoading: true, readonlyview: this.readonlyview}).find(this._VisitId).then(res => {
        console.log(res, 'ceck res')
        this.infoCustomer = res
      })
    },
    getLength (icd) {
      if (icd.length === 1) {
        return true
      }
      return false
    },
    getICD10Value (str) {
      if (!str) return ''
      var data = str
      if (data) {
        return data.map(e => e.ViName).join(', ')
      }
      return ''
    },
    showWithClinic (codes) {
      let check = false
      if (codes === 'Normal' && this.DataSubmit && this.DataSubmit.SetupClinic && !this.DataSubmit.SetupClinic.length) {
        check = true
      }
      if (this.DataSubmit && this.DataSubmit.SetupClinic && this.DataSubmit.SetupClinic.length) {
        this.DataSubmit.SetupClinic.forEach(code => {
          if (codes.includes(code)) {
            check = true
          }
        })
      }
      return check
    },
    showWithClinicOld (codes) {
      // return true
      if (this.DataSubmit.Clinic && this.DataSubmit.Clinic.Code && codes) {
        var codess = codes.replace(/\s/g, '').split(',')
        return codess.includes(this.DataSubmit.Clinic.Code)
      }
      return false
    },
    getListConfirm (val) {
      console.log(val, 'cehc kvar')
      val.map(item => {
        if (item.ConfirmType === 'OUTPATIENT_DIR') {
          this.OUTPATIENT_DIR = item.Fullname
          this.OUTPATIENT__TiIME_DIR = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
        }
        if (item.ConfirmType === 'OUTPATIENT_PHY') {
          this.OUTPATIENT_PHY = item.Fullname
          this.OUTPATIENT_TIME_PHY = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
        }
        if (item.ConfirmType === 'OUTPATIENT_PHY_SUMMARY') {
          this.OUTPATIENT_PHY_SUMMARY = item.Fullname
          this.OUTPATIENT_PHY_TIME_SUMMARY = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
        }
      })
    },
    print () {
      this.$PointOfCareTestingPrinter('MedicalRecordForOutpatientPrinter', false, 'A01_252_221222_V')
    },
    submit () {
      this.saveSuccesss = !this.saveSuccesss
    },
    // submit (confirm) {
    //   this.DataSubmit.Room = {}
    //   new OutpatientExaminationNote()
    //     .update(this.$route.params.Id, this.DataSubmit)
    //     .then((response) => {
    //       if (confirm === 'confirm') {
    //         this.saveSuccesss = !this.saveSuccesss
    //         this.toastedSuccess()
    //       }
    //       // this.$router.push({name: 'etr', params: {Id: response.Id}})
    //       this.toastedSuccess()
    //       this.rawData = this.cloneObj(this.DataSubmit)
    //       this.reload()
    //     })
    //     .catch((e) => {
    //       if (e.data.IsErorr) {
    //         this.popUpWarning(e.data.ViMessage)
    //       }
    //     })
    // },
    getInfoCustomer () {
      new CustomerInfor().find(this._VisitType + '/' + this._VisitId).then(res => {
        console.log(res, 'check res trả về')
        this.info = res
      })
    },
    getData () {
      this.getInfo()
      this.getInfoCustomer()
      this.getVisitVersion()
      this.OPDOENTUCO_TMP = []
      this.loaded = true
      this.MDITEMINFO = {}
      if (this._VisitId) {
        new OutpatientExaminationNote()
          .find(this._VisitId)
          .then((response) => {
            this.$store.dispatch('setCurrentFormId', response.Id)
            if (response.AppointmentDateResult) {
              response.AppointmentDateResult = this.$options.filters.formatDateWithoutSecon(response.AppointmentDateResult)
            }
            // test
            // response.SetupClinic = []
            if (response.IscheckVisitPreAnes && response.ListStatus && response.ListStatus.length) {
              response.ListStatus = response.ListStatus.filter(e => {
                if (e.Code !== 'OPDAM' && e.Code !== 'OPDTTE' && e.Code !== 'OPDUDT' && e.Code !== 'OPDIHT') {
                  return e
                }
              })
            }
            this.DataSubmit = response
            this.IsLock24hBA = response.IsLock24hBA
            this.IsUseHandOverCheckList = this.DataSubmit.IsUseHandOverCheckList

            this.IsAcceptPhysician = response.IsAcceptPhysician
            this.IsAcceptNurse = response.IsAcceptNurse
            if (this.IsAcceptPhysician || this.IsAcceptNurse) {
              this.IsReadOnLy = true
            }

            if (this.IsUseHandOverCheckList === undefined || this.IsUseHandOverCheckList === null) {
              this.IsUseHandOverCheckList = true
            }
            if (!this.DataSubmit.ExaminationTime) {
              this.DataSubmit.ExaminationTime = new Date()
            } else {
              this.DataSubmit.ExaminationTime = this.string2Moment(
                this.DataSubmit.ExaminationTime
              )
            }
            this.DataSubmit.Room = this.Rooms.find(
              (e) => e.Id === this.DataSubmit.RoomId
            )
            for (const property in this.MASTERDATA) {
              if (property === 'OPDOENRFU' && this.DataSubmit.IsConsultation) {
                this.MASTERDATA[property].ViName = 'Lời dặn chung (Hiển thị trên báo cáo y tế)'
                this.MASTERDATA[property].Items[0].ViName = 'Lời dặn chung (Hiển thị trên báo cáo y tế)'
              }
              if (property === 'OPDOENCC0' && this.DataSubmit.IsConsultation) {
                this.MASTERDATA[property].ViName = 'Bệnh nhân/ Người giám hộ đến tư vấn về'
                this.MASTERDATA[property].Items[0].ViName = 'Bệnh nhân/ Người giám hộ đến tư vấn về'
              }
              if (property === 'OPDOENDOR' && this.DataSubmit.IsConsultation) this.MASTERDATA[property].ViName = 'Bệnh nhân sẽ lên lịch hẹn để thảo luận về mối quan tâm khác vào *(Hiển thị trên báo cáo y tế)'
              if (this.MASTERDATA[property].Items) {
                this.MASTERDATA[property].Items.forEach((item) => {
                  this.$set(this.MDITEMINFO, item.Code, item)
                  if (property === 'OPDOENTUCO') {
                    item.Data = this.JSONParse(item.Data)
                    this.OPDOENTUCO_TMP = [
                      ...this.OPDOENTUCO_TMP,
                      ...item.Data
                    ]
                  }
                  var code = item.Code
                  var exited = _.find(this.DataSubmit.Datas, { Code: code })
                  if (exited) {
                    if (
                      this.checkString(item.DataType, 'CheckBox') ||
                      this.checkString(item.DataType, 'Radio')
                    ) {
                      var isTrue = exited.Value === 'True'
                      item.Value = isTrue
                    } else if (
                      item.Code === 'OPDOENICDANS' ||
                      item.Code === 'OPDOENICDOPT' ||
                      item.Code === 'OPDOENICD0101'
                    ) {
                      item.Value = this.JSONParse(exited.Value)
                    } else if (
                      item.Group === 'OPDOENYTD'
                    ) {
                      item.DataType = 'Checkbox'
                    } else if (
                      exited.Value &&
                      (item.Code === 'OPDOENDORANS_' ||
                        item.Code === 'OPDOENTD0ANS')
                    ) {
                      item.Value = this.string2Moment(exited.Value)
                    } else {
                      item.Value = exited.Value
                      // if (!exited.Value && this.checkString(item.DataType, 'Text') && item.Data) {
                      //   console.log((JSON.stringify(item.Data)).join(', \n'))
                      //   item.Value = (JSON.stringify(item.Data)).join(', \n')
                      // }
                    }
                  } else {
                    item.Value = null
                    if (this.DataSubmit.IsConsultation && code === 'OPDOENICDANS') {
                      item.Value = [
                        {
                          code: 'Z71.9',
                          label: 'Z71.9, Tư vấn không đặc hiệu',
                          ViName: 'Tư vấn không đặc hiệu'
                        }
                      ]
                    }
                    if (this.DataSubmit.IsConsultation && code === 'OPDOENDD0ANS') {
                      item.Value = 'Tư vấn không đặc hiệu'
                    }
                    if (this.DataSubmit.IsConsultation && code === 'OPDOEN25001') {
                      item.Value = true
                    }
                  }
                })
              }
            }
            setTimeout(() => {
              this.loadedConfirm = true
              this.loaded = true
            }, 500)
          })
          .catch((e) => {
            console.log(e)
            if (e.status === 400) {
              this._404()
            }
          })
      }
    }
  }

}
</script>

<style scoped>
  #MedicalRecordForOutpatient-page {
    font-family: initial;
  }
</style>
