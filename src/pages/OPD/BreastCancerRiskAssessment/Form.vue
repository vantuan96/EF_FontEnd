<template>
  <div>
    <div v-if="loaded">
      <Print :DataSubmit="DataSubmit" :DataInfo="DataInfo" :MASTERDATA="MASTERDATA" :Customer="this.$store.state.account.CurrentPatientObj"/>
      <div class="text-center" v-if="nullContent">
        <!-- <p v-if="!IsLocked && hasRole('NCCNBROV1POST')">{{__t('Chưa có Thông tin khách hàng - Đánh giá nguy cơ ung thư')}}</p> -->
        <p v-if="!IsLocked">{{__t('Chưa có Thông tin khách hàng - Đánh giá nguy cơ ung thư')}}</p>
        <div v-else style="color: red;" class="italic">
        <h4><i class="fa fa-lock" aria-hidden="true"></i> {{__t('Bạn không được phép chỉnh sửa do hồ sơ đã bị khóa theo nguyên tắc 24h!')}}</h4>
      </div>
        <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked && hasRole('RISKASSFORCANCERPOST')">{{__t('Tạo mới')}}</button>
        <!-- <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked">{{__t('Tạo mới')}}</button> -->
      </div>
      <div :class="{'isReadOnly': isReadOnly}" v-else>
        <div class="tbl-title">1. {{__t('Thông tin chung')}}</div>
        <table class="table v-table-1 no-margin col-1-1" id="block1">
          <tr>
            <td v-if="DataInfo">
              <div class="row">
                <div class="col-md-3">
                  <div class="flex-box flex-center">
                    <p class="text-bold mr-5">{{__t('Mạch')}}</p>
                    <p class="font-italic">(nhịp/phút)</p>
                  </div>
                  <FakeInput style="width: 180px" class="form-control no-margin" v-model="DataInfo.VitalSigns.Pulse"/>
                </div>
                <div class="col-md-3">
                  <div class="flex-box flex-center">
                    <p class="text-bold mr-5">{{__t('Nhiệt độ')}}</p>
                    <p class="font-italic">(độ C)</p>
                  </div>
                  <FakeInput style="width: 180px" class="form-control no-margin" v-model="DataInfo.VitalSigns.Temp"/>
                </div>
                <div class="col-md-3">
                  <div class="flex-box flex-center">
                    <p class="text-bold mr-5">{{__t('Huyết áp')}}</p>
                    <p class="font-italic">(mmHg)</p>
                  </div>
                  <FakeInput style="width: 180px" class="form-control no-margin" v-model="DataInfo.VitalSigns.BP"/>
                </div>
                <div class="col-md-3">
                  <div class="flex-box flex-center">
                    <p class="text-bold mr-5">{{__t('SpO2')}}</p>
                    <p class="font-italic">(%)</p>
                  </div>
                  <FakeInput style="width: 180px" class="form-control no-margin" v-model="DataInfo.VitalSigns.Spo2"/>
                </div>
              </div>
              <div class="row mt-5">
                <div class="col-md-3">
                  <div class="flex-box flex-center">
                    <p class="text-bold mr-5">{{__t('Nhịp thở')}}</p>
                    <p class="font-italic">(lần/phút)</p>
                  </div>
                  <FakeInput style="width: 180px" class="form-control no-margin" v-model="DataInfo.VitalSigns.RR"/>
                </div>
                <div class="col-md-3">
                  <div class="flex-box flex-center">
                    <p class="text-bold mr-5">{{__t('Chiều cao')}}</p>
                    <p class="font-italic">(cm)</p>
                  </div>
                  <FakeInput style="width: 180px" class="form-control no-margin" v-model="DataInfo.VitalSigns.Height"/>
                </div>
                <div class="col-md-3">
                  <div class="flex-box flex-center">
                    <p class="text-bold mr-5">{{__t('Cân nặng')}}</p>
                    <p class="font-italic">(kg)</p>
                  </div>
                  <FakeInput style="width: 180px" class="form-control no-margin" v-model="DataInfo.VitalSigns.Weight"/>
                </div>
                <div class="col-md-3">
                  <div class="flex-box flex-center">
                    <p class="text-bold mr-5">BMI</p>
                  </div>
                  <FakeInput style="width: 180px" class="form-control no-margin" v-model="bmiCalculation"/>
                </div>
              </div>
              <div class="row mt-5">
                <div class="col-md-4">
                  <div class="flex-box flex-center">
                    <p class="text-bold mr-5">{{__t('Phòng khám')}}</p>
                  </div>
                  <FakeInput class="form-control no-margin" v-model="DataInfo.SpecialtyName"/>
                </div>
                <div class="col-md-4">
                  <div class="flex-box flex-center">
                    <p class="text-bold mr-5">{{__t('Bác sĩ tư vấn')}}</p>
                  </div>
                  <ad-Info class="form-control no-margin" :ad="CreatedBy" />
                </div>
                <div v-if="MASTERDATA['OPDCARIAS3']" class="col-md-4">
                  <div class="flex-box flex-center">
                    <p class="text-bold mr-5">{{__t('Ngày tư vấn')}}</p>
                  </div>
                  <VDateTimePicker3 :class="{'form-control': isReadOnly, 'no-margin': isReadOnly}" :readonly="isReadOnly" :hideTooltip="true" v-model="time" :max="timeNow" :min="$store.state.account.CurrentPatientObj.AdmittedDate" :format="vDateTimeFormat"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <div class="tbl-title">2. {{__t('Trả lời câu hỏi đánh giá nguy cơ ung thư')}}</div>
        <table class="table v-table-1 no-margin col-1-1" id="block2">
          <tr>
            <td>
              <p style="font-style: italic">{{__t('Để có kết quả tốt nhất, xin vui lòng trả lời những câu hỏi dưới đây')}}:</p>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS5']">
                <p>1. {{__label(MASTERDATA['OPDCARIAS5'])}}</p>
                <MDRadio :readonly="isReadOnly" v-model="MASTERDATA['OPDCARIAS5']" :fullWidth="false"/>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS9']">
                <p>2. {{__label(MASTERDATA['OPDCARIAS9'])}}</p>
                <template v-for="(item, index) in MASTERDATA['OPDCARIAS9'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center" :class="{'pointer-none': (index === 0 || index === 1 || index === 2 || index === 3 || index === 4) && MASTERDATA['OPDCARIAS9'].Items[5].Value}">
                      <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                      <span :class="{'pointer-none': index === 5 && (MASTERDATA['OPDCARIAS9'].Items[0].Value || MASTERDATA['OPDCARIAS9'].Items[1].Value
                      || MASTERDATA['OPDCARIAS9'].Items[2].Value || MASTERDATA['OPDCARIAS9'].Items[3].Value
                      || MASTERDATA['OPDCARIAS9'].Items[4].Value)}" class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDCARIAS9radio-' + index" v-model="item.Value">
                        <label :for="'OPDCARIAS9radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS16']">
                <p>3. {{__label(MASTERDATA['OPDCARIAS16'])}}</p>
                <MDRadio :readonly="isReadOnly" v-model="MASTERDATA['OPDCARIAS16']" :fullWidth="false"/>
                <div class="mt-5" v-if="MASTERDATA['OPDCARIAS16'].Items[1].Value">
                  <div class="flex-box flex-center">
                    <p class="no-wrap mt-5 mb-0 mr-5">{{__t('nếu có, khi nào?')}}</p>
                    <v-date-picker :readonly="isReadOnly" :code="MASTERDATA['OPDCARIAS16'].Items[2].Code" :hideTooltip="true" v-model="MASTERDATA['OPDCARIAS16'].Items[2].Value" :format="vDateFormat"/>
                  </div>
                  <div class="flex-box flex-center mt-5">
                    <p class="no-wrap mt-5 mb-0 mr-5">{{__label(MASTERDATA['OPDCARIAS16'].Items[3])}}:</p>
                    <textarea-autosize :readonly="isReadOnly" :code="MASTERDATA['OPDCARIAS16'].Items[3].Code" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDCARIAS16'].Items[3].Value"/>
                  </div>
                </div>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS21']">
                <div class="flex-box flex-center">
                  <p class="no-wrap my-0 mr-5">4. {{__label(MASTERDATA['OPDCARIAS21'])}}</p>
                  <MDNumberInput style="width: 10%" :readonly="isReadOnly" :placeholder="__t('Nhập số')" v-model="MASTERDATA['OPDCARIAS21'].Items[0].Value"/>
                </div>
                <!-- Đã mang thai bao nhiêu lần -->
                <div class="flex-box flex-center mt-5">
                  <p class="no-wrap my-0 mr-5">{{__label(MASTERDATA['OPDCARIAS21'].Items[1])}}</p>
                  <MDNumberInput style="width: 10%" :readonly="isReadOnly" :placeholder="__t('Nhập số')" v-model="MASTERDATA['OPDCARIAS21'].Items[1].Value"/>
                </div>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS24']">
                <p>5. {{__label(MASTERDATA['OPDCARIAS24'])}}</p>
                <MDRadio :readonly="isReadOnly" v-model="MASTERDATA['OPDCARIAS24']" :fullWidth="false"/>
                <div v-if="MASTERDATA['OPDCARIAS24'].Items[0].Value">
                  <p class="no-wrap mt-5">{{__label(MASTERDATA['OPDCARIAS24'].Items[2])}}</p>
                  <MDNumberInput style="width: 10%" :code="MASTERDATA['OPDCARIAS24'].Items[2].Code" :readonly="isReadOnly" :placeholder="__t('Nhập số')" v-model="MASTERDATA['OPDCARIAS24'].Items[2].Value"/>
                </div>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS28']">
                <p>6. {{__label(MASTERDATA['OPDCARIAS28'])}}</p>
                <FakeInput v-if="isReadOnly" style="margin: 0" v-model="MASTERDATA['OPDCARIAS28'].Items[0].Value"/>
                <v-date-picker v-else :hideTooltip="true" v-model="MASTERDATA['OPDCARIAS28'].Items[0].Value" :format="vDateFormat"/>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS30']">
                <p>7. {{__label(MASTERDATA['OPDCARIAS30'])}}</p>
                <template v-for="(item, index) in MASTERDATA['OPDCARIAS30'].Items">
                  <div :key="index" v-if="item.DataType === 'Checkbox'">
                    <div class="flex-box flex-center">
                      <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                      <span class="v-checkbox" v-else>
                        <input type="checkbox" :id="'OPDCARIAS30radio-' + index" v-model="item.Value">
                        <label :for="'OPDCARIAS30radio-' + index"></label>
                      </span>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </template>
                <!-- Nếu có, đã sử dụng trong bao lâu -->
                <div v-if="MASTERDATA['OPDCARIAS30'].Items[0].Value || MASTERDATA['OPDCARIAS30'].Items[1].Value || MASTERDATA['OPDCARIAS30'].Items[2].Value">
                  <p class="no-wrap mt-5">{{__label(MASTERDATA['OPDCARIAS30'].Items[3])}}</p>
                  <textarea-autosize :code="MASTERDATA['OPDCARIAS30'].Items[3].Code" :readonly="isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDCARIAS30'].Items[3].Value"/>
                </div>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS35']">
                <p>8. {{__label(MASTERDATA['OPDCARIAS35'])}}</p>
                <MDRadio :readonly="isReadOnly" v-model="MASTERDATA['OPDCARIAS35']" :fullWidth="false"/>
                <!-- Nếu có, mối quan hệ với người bị ung thư -->
                <div v-if="MASTERDATA['OPDCARIAS35'].Items[0].Value" class="mt-5">
                  <p class="no-wrap">{{__label(MASTERDATA['OPDCARIAS35'].Items[2])}}</p>
                  <textarea-autosize :code="MASTERDATA['OPDCARIAS35'].Items[2].Code" :readonly="isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDCARIAS35'].Items[2].Value"/>
                </div>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS39']">
                <p>9. {{__label(MASTERDATA['OPDCARIAS39'])}}</p>
                <MDRadio :readonly="isReadOnly" v-if="MASTERDATA['OPDCARIAS39']" v-model="MASTERDATA['OPDCARIAS39']" :fullWidth="false"/>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS42']">
                <p>10. {{__label(MASTERDATA['OPDCARIAS42'])}}</p>
                <MDRadio :readonly="isReadOnly" v-if="MASTERDATA['OPDCARIAS42']" v-model="MASTERDATA['OPDCARIAS42']" :fullWidth="false"/>
                <div v-if="MASTERDATA['OPDCARIAS42'].Items[2].Value" class="flex-box flex-center">
                  <p class="no-wrap my-0">{{__label(MASTERDATA['OPDCARIAS48'])}}:</p>
                  <MDRadio :readonly="isReadOnly" v-if="MASTERDATA['OPDCARIAS48']" v-model="MASTERDATA['OPDCARIAS48']" :fullWidth="false"/>
                  <div v-if="MASTERDATA['OPDCARIAS48'].Items[3].Value" style="width: 100%">
                    <textarea-autosize :readonly="isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDCARIAS48'].Items[4].Value" style="width: 100%"/>
                  </div>
                </div>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS54']">
                <p>11. {{__label(MASTERDATA['OPDCARIAS54'])}}</p>
                <MDRadio :readonly="isReadOnly" v-if="MASTERDATA['OPDCARIAS54']" v-model="MASTERDATA['OPDCARIAS54']" :fullWidth="false"/>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS59']">
                <p>12. {{__label(MASTERDATA['OPDCARIAS59'])}}</p>
                <MDRadio :readonly="isReadOnly" v-if="MASTERDATA['OPDCARIAS59']" v-model="MASTERDATA['OPDCARIAS59']" :fullWidth="false"/>
                <div v-if="MASTERDATA['OPDCARIAS59'].Items[0].Value" class="mt-5">
                  <p class="no-wrap">{{__label(MASTERDATA['OPDCARIAS62'])}}:</p>
                  <template v-for="(item, index) in MASTERDATA['OPDCARIAS62'].Items">
                    <div :key="index" v-if="item.DataType === 'Checkbox'">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="item.Value" v-if="isReadOnly"/>
                        <span class="v-checkbox" v-else>
                          <input type="checkbox" :id="'OPDCARIAS62radio-' + index" v-model="item.Value">
                          <label :for="'OPDCARIAS62radio-' + index"></label>
                        </span>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="mt-10" v-if="MASTERDATA['OPDCARIAS69']">
                <p>13. {{__label(MASTERDATA['OPDCARIAS69'])}}</p>
                <div class="flex-box flex-center">
                  <CheckboxValue v-model="MASTERDATA['OPDCARIAS69'].Items[0].Value" v-if="isReadOnly"/>
                  <span :class="{'pointer-none': MASTERDATA['OPDCARIAS69'].Items[1].Value || MASTERDATA['OPDCARIAS69'].Items[2].Value}" class="v-checkbox" v-else>
                    <input type="checkbox" :id="'OPDCARIAS69radio-' + 0" v-model="MASTERDATA['OPDCARIAS69'].Items[0].Value">
                    <label :for="'OPDCARIAS69radio-' + 0"></label>
                  </span>
                  <span class="displaytbl"><span>{{__label(MASTERDATA['OPDCARIAS69'].Items[0])}}</span></span>
                </div>
                <div class="flex-box flex-center">
                  <CheckboxValue v-model="MASTERDATA['OPDCARIAS69'].Items[1].Value" v-if="isReadOnly"/>
                  <span :class="{'pointer-none': MASTERDATA['OPDCARIAS69'].Items[0].Value}" class="v-checkbox" v-else>
                    <input type="checkbox" :id="'OPDCARIAS69radio-' + 1" v-model="MASTERDATA['OPDCARIAS69'].Items[1].Value">
                    <label :for="'OPDCARIAS69radio-' + 1"></label>
                  </span>
                  <span class="displaytbl"><span>{{__label(MASTERDATA['OPDCARIAS69'].Items[1])}}</span></span>
                </div>
                <div class="flex-box flex-center">
                  <CheckboxValue v-model="MASTERDATA['OPDCARIAS69'].Items[2].Value" v-if="isReadOnly"/>
                  <span :class="{'pointer-none': MASTERDATA['OPDCARIAS69'].Items[0].Value}" class="v-checkbox" v-else>
                    <input type="checkbox" :id="'OPDCARIAS69radio-' + 2" v-model="MASTERDATA['OPDCARIAS69'].Items[2].Value">
                    <label :for="'OPDCARIAS69radio-' + 2"></label>
                  </span>
                  <span class="displaytbl"><span>{{__label(MASTERDATA['OPDCARIAS69'].Items[2])}}</span></span>
                </div>
                <!-- Ghi chú -->
                <div v-if="MASTERDATA['OPDCARIAS69']" class="flex-box flex-center">
                  <p class="no-wrap mt-5">{{__label(MASTERDATA['OPDCARIAS69'].Items[3])}}:</p>
                  <textarea-autosize :readonly="isReadOnly" rows="1" class="form-control ml-5" :placeholder="__t('Nhập')" v-model="MASTERDATA['OPDCARIAS69'].Items[3].Value"/>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <div class="tbl-title">3. {{__t('Phần đánh giá của bác sĩ')}}</div>
        <table class="table v-table-1 no-margin col-1-1" id="block1">
          <tr>
            <td>
              <div v-if="MASTERDATA['OPDCARIAS74']" class="flex-box flex-center">
                <p class="no-wrap my-0 mr-5">TÍNH NGUY CƠ THEO</p>
                <VSelect :readonly="isReadOnly" :disabeleclear="false" v-model="MASTERDATA['OPDCARIAS74'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionModel"/>
                <p class="my-0 ml-5">MODEL</p>
              </div>
              <div class="mt-5" v-if="MASTERDATA['OPDCARIAS76']">
                <p class="text-bold no-wrap my-0 mr-5">{{__t('Theo thông tin được cung cấp, nguy cơ UT vú xâm lấn của khách hàng được ước tính')}}:</p>
                <div class="ml-20">
                  <div class="flex-box flex-center mt-5">
                    <p class="my-0">Trong</p>
                    <MDNumberInput :readonly="isReadOnly" class="mx-5" style="max-width: 100px" v-model="MASTERDATA['OPDCARIAS76'].Items[0].Value" />
                    <p class="my-0">năm tới là:</p>
                    <MDNumberInput :readonly="isReadOnly" class="mx-5" style="max-width: 100px" :decimal="true" v-model="MASTERDATA['OPDCARIAS76'].Items[1].Value" />
                    <p class="my-0">%</p>
                  </div>
                  <div class="flex-box flex-center mt-5">
                    <p class="my-0">Trong</p>
                    <MDNumberInput :readonly="isReadOnly" class="mx-5" style="max-width: 100px" v-model="MASTERDATA['OPDCARIAS76'].Items[2].Value" />
                    <p class="my-0" style="width: 66px">là:</p>
                    <MDNumberInput :readonly="isReadOnly" class="mx-5" style="max-width: 100px" :decimal="true" v-model="MASTERDATA['OPDCARIAS76'].Items[3].Value" />
                    <p class="my-0">%</p>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p class="text-bold mb-0">{{__t('LỢI ÍCH')}}:</p>
              <p>Sàng lọc UT vú đúng cách sẽ giúp phát hiện sớm UT, UT được phát hiện càng sớm càng giúp cho việc điều trị hiệu quả và triệt để hơn. Chụp Xquang vú có vai trò quan trọng trong phát hiện UT vú giai đoạn sớm và được FDA công nhận là phương tiện sàng lọc làm giảm được tỷ lệ tử vong.
              </p>
              <div class="flex-box flex-center">
                <p class="text-bold mr-5">{{__t('LƯU Ý')}}:</p>
                <p>Khi tham gia sàng lọc UT vú, bạn có thể gặp phải một số vấn đề sau:</p>
              </div>
              <ul>
                <li>
                  <p style="white-space: normal">Kết quả dương tính sai: các biện pháp sàng lọc ban đầu nghi ngờ có bất thường nhưng sau khi được chẩn đoán
                    thêm thì là không phải &#8594; phải làm thêm xét nghiệm có chi phí, lo âu và mất thêm thời gian hơn &#8594; có thể chấn đoán
                    quá mức (overdiagnosis) &#8594; điều trị quá mức (overtreatment): do vậy việc lựa chọn phương pháp sàng lọc thích
                    hợp ở cơ sở đáp ứng về chuyên môn là rất cần thiết và quan trọng.
                  </p>
                </li>
                <li>
                  <p style="white-space: normal">Kết quả âm tính sai: Chụp Xquang vú vẫn có thể bỏ só một vài trường hợp UT dẫn đến việc chẩn đoán và điều trị
                    muộn: do vậy bạn cần được bs hướng dẫn cách tự khám vú và có kiến thức về UT gian kỳ (UT xuất hiện giữa hai
                    lần sàng lọc).
                  </p>
                </li>
              </ul>
            </td>
          </tr>
          <!-- Chân ký -->
          <div v-if="DataSubmit" class="row text-center mt-10">
            <div class="col-md-6 col-md-offset-6" v-if="DataSubmit.Confirm.Doctor.UserName">
              <div style="font-weight: normal">{{ ConfirmAt }}</div>
              <eform-signature
                :ad="DataSubmit.Confirm.Doctor.UserName"
                :title="__t('Bác sĩ tư vấn')"
              />
            </div>
            <div class="col-md-6 col-md-offset-6" v-else>
              <p class="mb-10">
                <b>{{ __t('Bác sĩ tư vấn') }}</b>
              </p>
              <i v-if="isReadOnly">{{__t('Chưa xác nhận')}}</i>
              <button v-else @click="showDoctorConfirm('Doctor', 'Bác sĩ tư vấn')" class="btn v-white-btn">
                {{ __t('Xác nhận') }}
              </button>
            </div>
          </div>
          <!-- Upload file -->
          <div class="mt-10" v-if="MASTERDATA['OPDCARIAS81']">
            <div class="pomc-upload-area mb-10" v-if="MASTERDATA['OPDCARIAS81']">
              <div v-if="viewOnly || isReadOnly">
                <p>{{__t('Đính kèm bản scan xác nhận')}}</p>
                <drop-files id="mini-upload" :readonly="true" v-model="MASTERDATA['OPDCARIAS81'].Items[0].Value"/>
              </div>
              <div class="row" v-else>
                <div class="col-md-7 col-sm-7">
                  <p><b>{{__t('Upload ảnh')}}:</b></p>
                  <p><button @click="openFile()" class="btn v-white-btn font16 font-bold btn-upload"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('UPLOAD TỪ THIẾT BỊ')}}</button></p>
                  <p>{{__t('Đính kèm bản scan xác nhận')}}</p>
                </div>
                <div class="col-md-5 col-sm-5">
                  <drop-files id="mini-upload" v-model="MASTERDATA['OPDCARIAS81'].Items[0].Value" :dataDropfile="dataDropfile"/>
                </div>
              </div>
            </div>
          </div>
        </table>
        <!-- footer -->
        <FloatBlock @handleBack='handleBack()' :openBack="true">
          <template slot='buttons'>
            <div v-if="!isReadOnly" class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group1">
                <button class="btn btn-info pull-right" type="button" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
              </div>
            </div>
            <div class="col-md-6 col-sm-6" v-if="!isReadOnly">
              <div class="form-group1">
                <button v-if="!nullContent" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
        <DoctorConfirm :popupTitle="popupTitle" :TypeConfirm="TypeConfirm" @popupSave="confirm"/>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>

<script>
import Print from './Print'
import DoctorConfirm from './popup/DoctorConfirm.vue'
import BreastCancerRiskAssessment from '@/services/OPD/BreastCancerRiskAssessment'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
import VSelect from '@/components/VSelect.vue'
import DropFiles from '@/components/DropFiles.vue'
import moment from 'moment'
import _ from 'lodash'
import $ from 'jquery'
import UploadFileService from '@/services/IPD/UploadFileService'

export default {
  components: {
    Print,
    DoctorConfirm,
    VDateTimePicker,
    VDateTimePicker3,
    VSelect,
    DropFiles
  },
  mixins: [MixinForm, MixinMasterData],
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    VisitId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dataDropfile: {},
      FormCode: 'A03_115_200520_V',
      DataInfo: null,
      DataSubmit: {},
      dataMaster: {},
      loaded: false,
      IsLocked: false,
      checkEdited: false,
      nullContent: true,
      time: '',
      timeNow: moment().format('HH:mm DD/MM/YYYY'),
      popupTitle: '',
      TypeConfirm: '',
      CreatedBy: '',
      CreatedAt: '',
      ConfirmAt: '',
      optionModel: [
        {
          label: 'GAIL',
          value: 'GAIL'
        },
        {
          label: 'Tyrer - Cuzick',
          value: 'Tyrer - Cuzick'
        },
        {
          label: 'BCSC',
          value: 'BCSC'
        }
      ]
    }
  },
  mounted () {
    this.getInfo()
    this.getMasterDatas({Form: 'A03_115_200520_V'}, () => {
      this.getData()
    })
  },
  watch: {
    MASTERDATA: {
      handler () {
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
        }
      },
      deep: true
    }
  },
  computed: {
    bmiCalculation () {
      let weight = this.DataInfo.VitalSigns.Weight ? parseFloat(this.DataInfo.VitalSigns.Weight) : 0
      let height = this.DataInfo.VitalSigns.Height ? parseFloat(this.DataInfo.VitalSigns.Height) / 100 : 0
      return (weight / (height * height)).toFixed(2)
    },
    isReadOnly () {
      return this.viewOnly || this.IsLocked || this.getCurrentUsername() !== this.CreatedBy || this.DataSubmit.Confirm.Doctor.UserName || !this.hasRole('RISKASSFORCANCERPOST')
      // return this.viewOnly || this.IsLocked
    }
  },
  methods: {
    print () {
      this.$htmlToPaper('printMe', false, 'A03_115_200520_V')
    },
    getInfo () {
      new BreastCancerRiskAssessment().find('Info' + '/' + this.FormCode + '/' + this._VisitId).then(response => {
        this.DataInfo = response
        this.IsLocked = response.Is24hLocked
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    getData () {
      new BreastCancerRiskAssessment().find(this.FormCode + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: response.Id || response.ID
        }
        this.$store.dispatch('setCurrentFormId', response.ID)
        this.nullContent = false
        this.DataSubmit = response
        if (response.Datas.length) {
          this.$emit('hiddenLog')
        }
        this.CreatedBy = response.CreatedBy
        this.CreatedAt = moment(response.CreatedAt).format('HH:mm DD/MM/YYYY')
        this.$emit('TimeLog', moment(response.UpdatedAt).format('HH:mm DD/MM/YYYY'), response.UpdateBy)
        this.ConfirmAt = moment(response.Confirm.Doctor.ConfirmAt).format('HH:mm DD/MM/YYYY')
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else if (exited.Value && (item.Code === 'OPDCARIAS82')) {
                  item.Value = this.JSONParse(exited.Value, true)
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
        if (this.MASTERDATA['OPDCARIAS3'].Items[0].Value === '' || this.MASTERDATA['OPDCARIAS3'].Items[0].Value === 'Invalid date') {
          this.time = this.CreatedAt
        } else {
          this.time = this.MASTERDATA['OPDCARIAS3'].Items[0].Value
        }
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        setTimeout(() => {
          this.checkEdited = false
        }, 800)
        this.loaded = true
      }).catch(e => {
        this.loaded = true
        this._401ResponseError(e)
      })
    },
    create () {
      new BreastCancerRiskAssessment().update('/' + 'Create' + '/' + this.FormCode + '/' + this._VisitId).then(response => {
        this.reload()
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    update () {
      var arr = this.MASTERDATA['OPDCARIAS81'].Items[0].Value ? this.MASTERDATA['OPDCARIAS81'].Items[0].Value : []
      this.DataSubmit.Datas = []
      if (this.time === 'Invalid date') {
        this.MASTERDATA['OPDCARIAS3'].Items[0].Value = ''
      } else {
        this.MASTERDATA['OPDCARIAS3'].Items[0].Value = this.time
      }
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else {
                item.Value = exited.Value
              }
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
          })
        }
      }
      new BreastCancerRiskAssessment().update('/Update/' + this.FormCode + '/' + this._VisitId, this.DataSubmit).then(response => {
        this.removedFile(arr)
        this.toastedSuccess()
        this.reload()
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this.DataSubmit.ID, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    handleSubmit () {
      this.validateForm()
      this.update()
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    async confirm (data) {
      var arr = this.MASTERDATA['OPDCARIAS81'].Items[0].Value ? this.MASTERDATA['OPDCARIAS81'].Items[0].Value : []
      if (this.checkEdited) {
        await this.handleSubmit()
      } else {
        this.removedFile(arr)
      }
      new BreastCancerRiskAssessment({}, this.getVisitGroupCode()).update('/Confirm/' + this.FormCode + '/' + this._VisitId, data).then(response => {
        this.$modal.hide('doctorConfirm')
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.reload()
      }).catch(e => {
        this.$modal.hide('doctorConfirm')
      })
    },
    validateForm () {
      let errors = []
      // 3.
      if ((this.MASTERDATA['OPDCARIAS16'].Items[1].Value && this.MASTERDATA['OPDCARIAS16'].Items[2].Value === '') || (this.MASTERDATA['OPDCARIAS16'].Items[1].Value && this.MASTERDATA['OPDCARIAS16'].Items[2].Value === null)) {
        errors.push(this.MASTERDATA['OPDCARIAS16'].Items[2])
      }
      if ((this.MASTERDATA['OPDCARIAS16'].Items[1].Value && this.MASTERDATA['OPDCARIAS16'].Items[3].Value === '') || (this.MASTERDATA['OPDCARIAS16'].Items[1].Value && this.MASTERDATA['OPDCARIAS16'].Items[3].Value === null)) {
        errors.push(this.MASTERDATA['OPDCARIAS16'].Items[3])
      }
      // 5.
      if ((this.MASTERDATA['OPDCARIAS24'].Items[0].Value && this.MASTERDATA['OPDCARIAS24'].Items[2].Value === '') || (this.MASTERDATA['OPDCARIAS24'].Items[0].Value && this.MASTERDATA['OPDCARIAS16'].Items[2].Value === null)) {
        errors.push(this.MASTERDATA['OPDCARIAS24'].Items[2])
      }
      // 7.
      if (((this.MASTERDATA['OPDCARIAS30'].Items[0].Value || this.MASTERDATA['OPDCARIAS30'].Items[1].Value || this.MASTERDATA['OPDCARIAS30'].Items[2].Value) && this.MASTERDATA['OPDCARIAS30'].Items[3].Value === '') || ((this.MASTERDATA['OPDCARIAS30'].Items[0].Value || this.MASTERDATA['OPDCARIAS30'].Items[1].Value || this.MASTERDATA['OPDCARIAS30'].Items[2].Value) && this.MASTERDATA['OPDCARIAS30'].Items[3].Value === null)) {
        errors.push(this.MASTERDATA['OPDCARIAS30'].Items[3])
      }
      // 8.
      if ((this.MASTERDATA['OPDCARIAS35'].Items[0].Value && this.MASTERDATA['OPDCARIAS35'].Items[2].Value === '') || (this.MASTERDATA['OPDCARIAS35'].Items[0].Value && this.MASTERDATA['OPDCARIAS35'].Items[2].Value === null)) {
        errors.push(this.MASTERDATA['OPDCARIAS35'].Items[2])
      }
      // 10.
      if ((this.MASTERDATA['OPDCARIAS42'].Items[2].Value && (!this.MASTERDATA['OPDCARIAS48'].Items[0].Value && !this.MASTERDATA['OPDCARIAS48'].Items[1].Value && !this.MASTERDATA['OPDCARIAS48'].Items[2].Value && !this.MASTERDATA['OPDCARIAS48'].Items[3].Value))) {
        errors.push(this.MASTERDATA['OPDCARIAS48'])
      }
      // 12.
      if (this.MASTERDATA['OPDCARIAS59'].Items[0].Value && !this.MASTERDATA['OPDCARIAS62'].Items.find(e => e.Value)) {
        errors.push(this.MASTERDATA['OPDCARIAS62'])
      }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    },
    handleBack () {
      if (this.checkEdited) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc chắn tạo Phiếu thông tin khách hàng - Đánh giá nguy cơ ung thư'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    openFile () {
      $('#dropzone').click()
    }
  }
}
</script>

<style lang="stylus" scoped>
>>>.el-radio-view {
  margin-left: 0;
}
.my-0 {
 margin-bottom: 0;
 margin-top: 0;
}
.mx-5 {
 margin-left: 5px;
 margin-right: 5px;
}
.pointer-none {
  pointer-events: none;
}
.isReadOnly {
  .value-checkbox {
    margin-bottom: 5px;
  }
  .displaytbl {
    span {
      transform: translateY(-3px);
    }
  }
}
</style>
