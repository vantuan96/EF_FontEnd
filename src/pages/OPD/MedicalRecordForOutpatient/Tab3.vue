<template>
  <div>
    <table width="100%" class="tbl-b2">
      <tr>
        <td colspan="2">
          <div style="position: relative;">
            <div class="fw600 fs20">IV. KHÁM BỆNH:</div>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <table width="100%">
            <tr>
              <td style="padding-left: 0px; display: flex;" width=" 80%" v-if="MASTERDATA['OPDOENKTT']">
                <p><b>1. Toàn thân:</b><br>{{MASTERDATA['OPDOENKTT'].Items[0].Value}}</p>
              </td>
              <td width=" 20%">
                <div style="border: 1px solid black; padding: 5px;">
                  <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['OPDOENPUL']"><i>Mạch</i>: {{MASTERDATA['OPDOENPUL'].Items[0].Value || '&emsp;&emsp;'}} <i>lần/ph</i></span></div>
                  <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['OPDOENTEM']"><i>Nhiệt độ</i>: {{MASTERDATA['OPDOENTEM'].Items[0].Value || '&emsp;&emsp;'}} <i>&#8451;</i></span></div>
                  <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['OPDOENBP0']"><i>Huyết áp</i>: {{MASTERDATA['OPDOENBP0'].Items[0].Value || '&emsp;&emsp;'}} <i>mmHg</i></span></div>
                  <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['OPDOENRR0']"><i>Nhịp thở</i>: {{MASTERDATA['OPDOENRR0'].Items[0].Value || '&emsp;&emsp;'}} <i>lần/ph</i></span></div>
                  <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['OPDOENWEI']"><i>Cân nặng</i>: {{MASTERDATA['OPDOENWEI'].Items[0].Value || '&emsp;&emsp;'}} <i>kg</i></span></div>
                </div>
              </td>
            </tr>
          </table>
          <!-- <div style="position: relative">
            <div style="width: 443px" v-if="MASTERDATA['OPDOENKTT']">
            </div>
            <div class="row">
              <div class="col-md-9">
                <p><b>1. Toàn thân:</b><br>{{MASTERDATA['OPDOENKTT'].Items[0].Value}}</p>
              </div>
              <div class="col-md-3">
                <div style="border: 1px solid #35353; padding: 5px;">
                  <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['OPDOENPUL']"><i>Mạch</i>: {{MASTERDATA['OPDOENPUL'].Items[0].Value || '&emsp;&emsp;'}} <i>lần/ph</i></span></div>
                  <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['OPDOENTEM']"><i>Nhiệt độ</i>: {{MASTERDATA['OPDOENTEM'].Items[0].Value || '&emsp;&emsp;'}} <i>&#8451;</i></span></div>
                  <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['OPDOENBP0']"><i>Huyết áp</i>: {{MASTERDATA['OPDOENBP0'].Items[0].Value || '&emsp;&emsp;'}} <i>mmHg</i></span></div>
                  <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['OPDOENRR0']"><i>Nhịp thở</i>: {{MASTERDATA['OPDOENRR0'].Items[0].Value || '&emsp;&emsp;'}} <i>lần/ph</i></span></div>
                  <div style="white-space: nowrap;"><span class="mr-10" v-if="MASTERDATA['OPDOENWEI']"><i>Cân nặng</i>: {{MASTERDATA['OPDOENWEI'].Items[0].Value || '&emsp;&emsp;'}} <i>kg</i></span></div>
                </div>
              </div>
            </div>
          </div> -->
        </td>
      </tr>
      <tr>
        <td v-if="DataSubmit && DataSubmit.Version < 2">
          <p><b>{{dex[2]}} Các bộ phận:</b></p>
          <!-- set up Nhi/ Vaccine -->
          <!-- {{showWithClinic('FreeTextOnly-005,MultiSelect-001,RadioYesNo-001,FreeTextOnly-001')}} -->
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
        </td>
        <td v-else>
          <p><b>{{dex[2]}} Các bộ phận:</b></p>
          <!-- set up Nhi/ Vaccine -->
          <template v-if="showWithClinic('FreeTextOnly-005,MultiSelect-001,RadioYesNo-001,FreeTextOnly-001') && DataSubmit.IsConsultation === false">
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
          <template v-if="showWithClinic('RadioYesNo-001')">
            <!-- <p>+ Khám chuyên khoa: {{getValueOfMASTERDATA('OPDOENKCK', 'OPDOENKCKANS')}}</p>
            <template v-if="MASTERDATA['OPDOENBNTHPT'].Items[0].Value">
              <p>+ Khám tim mạch, hô hấp: {{getValueOfMASTERDATA('OPDOENKTP1', 'OPDOENKTP1ANS')}}</p>
            </template>
            <p>+ Khám các bộ phận khác: {{getValueOfMASTERDATA('OPDOENKCBPK', 'OPDOENKCBPKANS')}}</p> -->
          </template>
          <!-- set up Chung -->
          <template v-if="showWithClinic('FreeTextOnly-001')">
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
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDOENPT0']">
        <td>
          <p><b>{{dex[3]}} Tóm tắt kết quả cận lâm sàng:</b> <br/>{{MASTERDATA['OPDOENPT0'].Items[1].Value}}</p>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDOENID0']">
        <td>
          <p><b>{{dex[4]}} Chẩn đoán ban đầu:</b> {{fomartIcdOPD(MASTERDATA['OPDOENID0'].Items[0].Value, MASTERDATA['OPDOENICD01'].Items[0].Value)}}</p>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDOENPT610']">
        <td>
          <p><b>{{dex[5]}} Đã xử lý <i>(thuốc, chăm sóc)</i>: </b>{{MASTERDATA['OPDOENPT610'].Items[2].Value}}</p>
        </td>
      </tr>
      <tr>
        <td v-if="MASTERDATA['OPDOENICD'] && MASTERDATA['OPDOENDD0']">
          <div class="flex align-center space-between" style="width:100%">
            <div class="inline" style="width: 80%"><b>{{dex[6]}} Chẩn đoán khi ra viện:</b> {{MASTERDATA['OPDOENDD0'].Items[0].Value}}</div>
            <template v-if="MASTERDATA['OPDOENICD'].Items[0].Value">
              <template v-for="(item, index) in MASTERDATA['OPDOENICD'].Items[0].Value">
                <div :key="index" class="inline" style="position: relative;">Mã <CharWithSquare :text="item.code" :defaultlength="4" /></div>
              </template>
            </template>
            <template v-else>
              <div class="inline" style="position: relative;">Mã <CharWithSquare :text="textNull" :defaultlength="4" /></div>
            </template>
          </div>
          <!-- <div v-if="MASTERDATA['OPDOENDD0']" class="inline-block mt-5"><b>{{dex[6]}} Chẩn đoán khi ra viện:</b> {{MASTERDATA['OPDOENDD0'].Items[0].Value}}</div>
          <div class="inline-block float-right" :key="index" v-for="(item, index) in MASTERDATA['OPDOENICD'].Items[0].Value">
            Mã <CharWithSquare :text="item.code" :defaultlength="4"/>
          </div> -->
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDOENDOR']">
        <td>
          <p style="margin-top: 10px" v-if="info"><b>{{dex[7]}} Điều trị ngoại trú từ ngày</b> {{getFTime2(info.MedicalRecordFirst.AdmittedDate) || '&emsp;'}} <template v-if="MASTERDATA['OPDOENDOR'].Items[0].Value">đến ngày {{MASTERDATA['OPDOENDOR'].Items[0].Value}}</template></p>
        </td>
      </tr>
    </table>
    <!-- <div class="row">
      <div class="col-md-6 col-sm-6 text-center">
        <div v-if="!checkTab && DataSubmit.VersionApp >= 11">
          <Confirm
          class="mt-10"
          :MasterDataCode="'FORADULTCONFIRM'"
          :FormCode="'A01_252_221222_V'"
          :ReadOnly="readonly"
          :AdInfo="[DataSubmit.CreatedBy]"
          :VisitId="_VisitId"
          :FormId="DataSubmit.Id"
          :saveSuccesss="saveSuccesss"
          @handleConfirm="submit('confirm')"
          @confirmSuccess="getData()"
          />
        </div>
      </div>
      <div class="col-md-6 col-sm-6 text-center">
        <div v-if="!checkTab && DataSubmit.VersionApp >= 11">
          <Confirm
          class="mt-10"
          :MasterDataCode="'FORCHEMOTHERAPYCONFIRM'"
          :FormCode="'A01_252_221222_V'"
          :ReadOnly="readonly"
          :AdInfo="[DataSubmit.CreatedBy]"
          :VisitId="_VisitId"
          :FormId="DataSubmit.Id"
          :saveSuccesss="saveSuccesss"
          @handleConfirm="submit('confirm')"
          @confirmSuccess="getData()"
          />
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import MixinForm from '@/mixins/FormOutpatientExaminationNew.js'
import MedicalRecordMixinForm from '@/pages/IPD/MedicalRecord/Mixin.js'
import Confirm from '@/components/Form/Confirm'

export default {
  /**
   * The name of the page.
   */
  name: 'OPDMedicalRecordPrinterPart1',
  mixins: [MixinForm, MedicalRecordMixinForm],
  props: [
    'routeType',
    'ListSoSinh',
    'optionChild',
    'infoCustomer',
    'DataSubmit',
    'MASTERDATA',
    'info',
    'VisitVersion'
  ],
  data () {
    return {
      textNull: 'N/A',
      MedicalHistoryData: ['OPDOENTSSK', 'OPDOENTSK', 'OPDOENTSKN'],
      hasData: false,
      icd10Code: ['IPDMRPTICDTANSx', 'IPDMRPTICDKANSx', 'IPDMRPTICDCANSx', 'IPDMRPTICDPANS', 'IPDMRPTICDTANSx', 'IPDMRPTICDKANSx', 'IPDMRPEICDCANSx', 'IPDMRPEICDPANS'],
      InterHospitalInfoTo: '',
      InterHospitalInfo: [
        {
          ViName: '1. Tuyến trên',
          EnName: '1. Tuyến trên',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVITTR',
          Value: ''
        },
        {
          ViName: '2. Tuyến dưới',
          EnName: '2. Tuyến dưới',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVITDU',
          Value: ''
        },
        {
          ViName: '3. Chuyên khoa',
          EnName: '3. Chuyên khoa',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVICKH',
          Value: ''
        }
      ],
      VisitTypes: [
        {
          ViName: '1. Cấp cứu',
          EnName: '1. Cấp cứu',
          DataType: 'Checkbox',
          Value: 'ED'
        },
        {
          ViName: '2. Khoa khám bệnh',
          EnName: '2. Khoa khám bệnh',
          DataType: 'Checkbox',
          Value: 'OPD'
        },
        {
          ViName: '3. Khoa điều trị',
          EnName: '3. Khoa điều trị',
          DataType: 'Checkbox',
          Value: 'IPD'
        }
      ],
      NgheNghiepMeCode: null,
      NgheNghiepBoCode: null,
      dex: [],
      indexs: []
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    Confirm
  },
  mounted () {
    console.log(this.DataSubmit, 'check datasubmit ')
    this.dex = this.getIndex(this.$route.meta.type)
  },
  computed: {
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
    fomartIcdOPD (diagnosis, ICDDiagnosis) {
      console.log('formatICD:', diagnosis, ICDDiagnosis)
      var arrDiagnosis = []
      if (diagnosis) arrDiagnosis.push(diagnosis)
      var icd = this.getICD10sOPD(ICDDiagnosis, true)
      console.log(icd, 'check icd')
      return [...new Set(arrDiagnosis)].join(', ') + '' + icd
    },
    getICD10sOPD (str, strICDOption) {
      console.log('ICD:', '1', str, '2', strICDOption)
      var op = ''
      if (str) {
        op = [...new Set(str.map(e => e.code))].join(', ')
      }
      return op ? ` (${op})` : ''
    },
    getICD10Codex (icd) {
      console.log('check jsonParse', this.JSONParse(icd, true))
      return this.JSONParse(icd, true)
    },
    getICD10Codex2 (icd) {
      let check = false
      if (this.JSONParse(icd)) {
        check = true
      }
      return check
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
    getTypeAge (str) {
      let obj = {}
      if (str === 'DD') {
        obj = {
          ViName: 'Ngày',
          EnName: 'Day'
        }
      }
      if (str === 'MM') {
        obj = {
          ViName: 'Tháng',
          EnName: 'Month'
        }
      }
      if (str === 'YYYY') {
        obj = {
          ViName: 'Năm',
          EnName: 'Year'
        }
      }
      return obj
    }
  }
}
</script>
<style scoped>
.tuoi {
  top: 25px!important;
}
</style>
