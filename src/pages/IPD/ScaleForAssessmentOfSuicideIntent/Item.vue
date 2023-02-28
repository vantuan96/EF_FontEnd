<template>
<div>
  <!-- Test -->
  <div class="text-center" v-if="nullContent">
      <p v-if="!IsLocked && hasRole('IPDSFAOSIC')">{{__t('Chưa có thang đánh giá ý tưởng tự sát và mức độ ý tưởng tự sát')}}</p>
      <div v-else class="null-content">
        <p v-if="!IsLocked">{{__t('AdultVitalSigns.labelNull')}}</p>
        <div v-else style="color: red; margin-top: 30px;" class="italic">
      <h4><i class="fa fa-lock" aria-hidden="true"></i> {{__t('Bạn không được phép chỉnh sửa do hồ sơ đã bị khóa theo nguyên tắc 24h!')}}</h4>
    </div>
      </div>
      <button class="btn btn-warning" @click="createPopup" v-if="!IsLocked && hasRole('IPDSFAOSIC')">{{__t('Tạo mới')}}</button>
  </div>
  <div v-else>
    <div class="table">
        <div class="row">
          <div class="col-md-6">
            <div class="flex-box flex-center mb-5 mt-10" style="margin-left: 5px;">
              <label class="display-inline ml-5 mr-5" style="font-weight: bold; margin-bottom: 0">{{__t('Thời gian bắt đầu phỏng vấn')}}:</label>
                <div>
                  <v-date-time-picker :readonly="true" :format="vDateTimeFormat" v-model="CreatedAt"></v-date-time-picker>
                </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="flex-box flex-center mt-5" style="transform: translateY(5px); margin-right: 50px;">
              <label class="display-inline ml-5 mr-5" style="font-weight: bold; margin-bottom: 0">Người đánh giá:</label>
              <div class="search-name">
                <ad-Info :ad="CreatedBy" />
              </div>
            </div>
          </div>
        </div>
        <!-- Table -->
      <!-- End Test -->
        <div class="sync-ed-box">
          <p style="font-style: italic">Thang này được đánh giá trong thời gian 48 giờ cho đến lúc bắt đầu phỏng vấn người bệnh nhằm mục đích đánh giá bệnh nhân có hay không có ý tưởng tự sát và đánh giá mức độ nghiêm trọng của ý tưởng tự sát.</p>
          <table class="standing-order-tbl" :class="{'disable': isReadOnly}">
            <tr>
              <th style="text-align: center" class="bg-head" width="6%">{{ __t('STT')}}</th>
              <th style="text-align: center" class="bg-head" width="41%">{{ __t('Câu hỏi')}}</th>
              <th style="text-align: center" class="bg-head" width="41%">{{ __t('Lựa chọn')}}</th>
              <th style="text-align: center" class="bg-head" width= "12%">{{ __t('Điểm')}}</th>
            </tr>
            <!-- Câu 1 -->
            <tr v-if="MASTERDATA['IPDESI5']">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('1')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI1'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI1'].Items[1])}}</p>
                <p>{{__label(MASTERDATA['IPDESI1'].Items[2])}}</p>
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI5'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI5radio-' + 1" v-model="MASTERDATA['IPDESI5'].Items[0].Value">
                    <label :for="'IPDESI5radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI5'].Items, MASTERDATA['IPDESI5'].Items[0])">{{__label(MASTERDATA['IPDESI5'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI5']">
              <td>
                {{__label(MASTERDATA['IPDESI5'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI5radio-' + 2" v-model="MASTERDATA['IPDESI5'].Items[2].Value">
                    <label :for="'IPDESI5radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI5'].Items, MASTERDATA['IPDESI5'].Items[2])">{{__label(MASTERDATA['IPDESI5'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI5']">
              <td>
                {{__label(MASTERDATA['IPDESI5'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI5radio-' + 3" v-model="MASTERDATA['IPDESI5'].Items[4].Value">
                    <label :for="'IPDESI5radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI5'].Items, MASTERDATA['IPDESI5'].Items[4])">{{__label(MASTERDATA['IPDESI5'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI5']">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI5'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI5radio-' + 4" v-model="MASTERDATA['IPDESI5'].Items[6].Value">
                    <label :for="'IPDESI5radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI5'].Items, MASTERDATA['IPDESI5'].Items[6])">{{__label(MASTERDATA['IPDESI5'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 2 -->
            <tr>
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('2')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI14'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI14'].Items[1])}}</p>
                <p>{{__label(MASTERDATA['IPDESI14'].Items[2])}}</p>
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI18'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI18radio-' + 1" v-model="MASTERDATA['IPDESI18'].Items[0].Value">
                    <label :for="'IPDESI18radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI18'].Items, MASTERDATA['IPDESI18'].Items[0])">{{__label(MASTERDATA['IPDESI18'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Question -->
            <tr v-if="MASTERDATA['IPDESI18']">
              <td>
                {{__label(MASTERDATA['IPDESI18'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI18radio-' + 2" v-model="MASTERDATA['IPDESI18'].Items[2].Value">
                    <label :for="'IPDESI18radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI18'].Items, MASTERDATA['IPDESI18'].Items[2])">{{__label(MASTERDATA['IPDESI18'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI18']">
              <td>
                {{__label(MASTERDATA['IPDESI18'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI18radio-' + 3" v-model="MASTERDATA['IPDESI18'].Items[4].Value">
                    <label :for="'IPDESI18radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI18'].Items, MASTERDATA['IPDESI18'].Items[4])">{{__label(MASTERDATA['IPDESI18'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI18']">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI18'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI18radio-' + 4" v-model="MASTERDATA['IPDESI18'].Items[6].Value">
                    <label :for="'IPDESI18radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI18'].Items, MASTERDATA['IPDESI18'].Items[6])">{{__label(MASTERDATA['IPDESI18'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 3 -->
            <tr>
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('3')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI27'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI27'].Items[1])}}</p>
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI30'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI30radio-' + 1" v-model="MASTERDATA['IPDESI30'].Items[0].Value">
                    <label :for="'IPDESI30radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI30'].Items, MASTERDATA['IPDESI30'].Items[0])">{{__label(MASTERDATA['IPDESI30'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Question -->
            <tr v-if="MASTERDATA['IPDESI30']">
              <td>
                {{__label(MASTERDATA['IPDESI30'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI30radio-' + 2" v-model="MASTERDATA['IPDESI30'].Items[2].Value">
                    <label :for="'IPDESI30radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI30'].Items, MASTERDATA['IPDESI30'].Items[2])">{{__label(MASTERDATA['IPDESI30'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI30']">
              <td>
                {{__label(MASTERDATA['IPDESI30'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI30radio-' + 3" v-model="MASTERDATA['IPDESI30'].Items[4].Value">
                    <label :for="'IPDESI30radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI30'].Items, MASTERDATA['IPDESI30'].Items[4])">{{__label(MASTERDATA['IPDESI30'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI30']">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI30'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI30radio-' + 4" v-model="MASTERDATA['IPDESI30'].Items[6].Value">
                    <label :for="'IPDESI30radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI30'].Items, MASTERDATA['IPDESI30'].Items[6])">{{__label(MASTERDATA['IPDESI30'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 4 -->
            <tr>
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('4')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI39'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI39'].Items[1])}}</p>
                <p>{{__label(MASTERDATA['IPDESI39'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI39'].Items[3])}}</p>
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI44'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI44radio-' + 1" v-model="MASTERDATA['IPDESI44'].Items[0].Value">
                    <label :for="'IPDESI44radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI44'].Items, MASTERDATA['IPDESI44'].Items[0])">{{__label(MASTERDATA['IPDESI44'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI44']">
              <td>
                {{__label(MASTERDATA['IPDESI44'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI44radio-' + 2" v-model="MASTERDATA['IPDESI44'].Items[2].Value">
                    <label :for="'IPDESI44radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI44'].Items, MASTERDATA['IPDESI44'].Items[2])">{{__label(MASTERDATA['IPDESI44'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI44']">
              <td>
                {{__label(MASTERDATA['IPDESI44'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI44radio-' + 3" v-model="MASTERDATA['IPDESI44'].Items[4].Value">
                    <label :for="'IPDESI44radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI44'].Items, MASTERDATA['IPDESI44'].Items[4])">{{__label(MASTERDATA['IPDESI44'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI44']">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI44'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI44radio-' + 4" v-model="MASTERDATA['IPDESI44'].Items[6].Value">
                    <label :for="'IPDESI44radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI44'].Items, MASTERDATA['IPDESI44'].Items[6])">{{__label(MASTERDATA['IPDESI44'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Check điểm 4 câu đầu  -->
            <tr>
              <th colspan="4">Bạn ngừng cuộc phỏng vấn tại đây, nếu như câu hỏi 1 và 2 có số điểm ít hơn 2 và câu hỏi 3 và 4 có số điểm là 0. Nếu kết quả khác như trên thì bắt đầu câu hỏi số 5 cho đến hết thang đánh giá.</th>
            </tr>
            <!-- Câu 5 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('5')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI53'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI53'].Items[1])}}</p>
                <p>{{__label(MASTERDATA['IPDESI53'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI53'].Items[3])}}</p>
                <p>{{__label(MASTERDATA['IPDESI53'].Items[4])}}</p>
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI59'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI59radio-' + 1" v-model="MASTERDATA['IPDESI59'].Items[0].Value">
                    <label :for="'IPDESI59radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI59'].Items, MASTERDATA['IPDESI59'].Items[0])">{{__label(MASTERDATA['IPDESI59'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI59'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI59'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI59radio-' + 2" v-model="MASTERDATA['IPDESI59'].Items[2].Value">
                    <label :for="'IPDESI59radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI59'].Items, MASTERDATA['IPDESI59'].Items[2])">{{__label(MASTERDATA['IPDESI59'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI59'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI59'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI59radio-' + 3" v-model="MASTERDATA['IPDESI59'].Items[4].Value">
                    <label :for="'IPDESI59radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI59'].Items, MASTERDATA['IPDESI59'].Items[4])">{{__label(MASTERDATA['IPDESI59'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI59']  && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI59'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI59radio-' + 4" v-model="MASTERDATA['IPDESI59'].Items[6].Value">
                    <label :for="'IPDESI59radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI59'].Items, MASTERDATA['IPDESI59'].Items[6])">{{__label(MASTERDATA['IPDESI59'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 6 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('6')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI68'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI68'].Items[1])}}</p>
                <!-- <p>{{__label(MASTERDATA['IPDESI68'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI68'].Items[3])}}</p> -->
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI71'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI71radio-' + 1" v-model="MASTERDATA['IPDESI71'].Items[0].Value">
                    <label :for="'IPDESI71radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI71'].Items, MASTERDATA['IPDESI71'].Items[0])">{{__label(MASTERDATA['IPDESI71'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI71'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI71'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI71radio-' + 2" v-model="MASTERDATA['IPDESI71'].Items[2].Value">
                    <label :for="'IPDESI71radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI71'].Items, MASTERDATA['IPDESI71'].Items[2])">{{__label(MASTERDATA['IPDESI71'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI71'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI71'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI71radio-' + 3" v-model="MASTERDATA['IPDESI71'].Items[4].Value">
                    <label :for="'IPDESI71radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI71'].Items, MASTERDATA['IPDESI71'].Items[4])">{{__label(MASTERDATA['IPDESI71'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI71'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI71'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI71radio-' + 4" v-model="MASTERDATA['IPDESI71'].Items[6].Value">
                    <label :for="'IPDESI71radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI71'].Items, MASTERDATA['IPDESI71'].Items[6])">{{__label(MASTERDATA['IPDESI71'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 7 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('7')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI80'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI80'].Items[1])}}</p>
                <!-- <p>{{__label(MASTERDATA['IPDESI68'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI68'].Items[3])}}</p> -->
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI83'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI83radio-' + 1" v-model="MASTERDATA['IPDESI83'].Items[0].Value">
                    <label :for="'IPDESI83radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI83'].Items, MASTERDATA['IPDESI83'].Items[0])">{{__label(MASTERDATA['IPDESI83'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI83'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI83'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI83radio-' + 2" v-model="MASTERDATA['IPDESI83'].Items[2].Value">
                    <label :for="'IPDESI83radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI83'].Items, MASTERDATA['IPDESI83'].Items[2])">{{__label(MASTERDATA['IPDESI83'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI83'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI83'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI83radio-' + 3" v-model="MASTERDATA['IPDESI83'].Items[4].Value">
                    <label :for="'IPDESI83radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI83'].Items, MASTERDATA['IPDESI83'].Items[4])">{{__label(MASTERDATA['IPDESI83'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI83'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI83'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI83radio-' + 4" v-model="MASTERDATA['IPDESI83'].Items[6].Value">
                    <label :for="'IPDESI83radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI83'].Items, MASTERDATA['IPDESI83'].Items[6])">{{__label(MASTERDATA['IPDESI83'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 8 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('8')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI92'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI92'].Items[1])}}</p>
                <!-- <p>{{__label(MASTERDATA['IPDESI68'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI68'].Items[3])}}</p> -->
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI95'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI95radio-' + 1" v-model="MASTERDATA['IPDESI95'].Items[0].Value">
                    <label :for="'IPDESI95radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI95'].Items, MASTERDATA['IPDESI95'].Items[0])">{{__label(MASTERDATA['IPDESI95'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI95'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI95'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI95radio-' + 2" v-model="MASTERDATA['IPDESI95'].Items[2].Value">
                    <label :for="'IPDESI95radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI95'].Items, MASTERDATA['IPDESI95'].Items[2])">{{__label(MASTERDATA['IPDESI95'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI95'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI95'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI95radio-' + 3" v-model="MASTERDATA['IPDESI95'].Items[4].Value">
                    <label :for="'IPDESI95radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI95'].Items, MASTERDATA['IPDESI95'].Items[4])">{{__label(MASTERDATA['IPDESI95'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI95'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI95'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI95radio-' + 4" v-model="MASTERDATA['IPDESI95'].Items[6].Value">
                    <label :for="'IPDESI95radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI95'].Items, MASTERDATA['IPDESI95'].Items[6])">{{__label(MASTERDATA['IPDESI95'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 9 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('9')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI104'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI104'].Items[1])}}</p>
                <p>{{__label(MASTERDATA['IPDESI104'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI104'].Items[3])}}</p>
                <span>
                  <p>{{__label(MASTERDATA['IPDESI109'].Items[0])}}</p>
                  <textarea-autosize
                    class="form-control"
                    rows="3"
                    :placeholder="('Nhập')"
                    v-model="MASTERDATA['IPDESI109'].Items[0].Value"
                  />
                </span>
                <p>{{__label(MASTERDATA['IPDESI111'].Items[0])}}</p>
                  <textarea-autosize
                      class="form-control"
                      rows="3"
                      :placeholder="('Nhập')"
                      v-model="MASTERDATA['IPDESI111'].Items[0].Value"
                    />
                <p>{{__label(MASTERDATA['IPDESI104'].Items[4])}}</p>
                <p>{{__label(MASTERDATA['IPDESI104'].Items[5])}}</p>
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI115'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI115radio-' + 1" v-model="MASTERDATA['IPDESI115'].Items[0].Value">
                    <label :for="'IPDESI115radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI115'].Items, MASTERDATA['IPDESI115'].Items[0])">{{__label(MASTERDATA['IPDESI115'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI115'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI115'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI115radio-' + 2" v-model="MASTERDATA['IPDESI115'].Items[2].Value">
                    <label :for="'IPDESI115radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI115'].Items, MASTERDATA['IPDESI115'].Items[2])">{{__label(MASTERDATA['IPDESI115'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI115'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI115'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI115radio-' + 3" v-model="MASTERDATA['IPDESI115'].Items[4].Value">
                    <label :for="'IPDESI115radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI115'].Items, MASTERDATA['IPDESI115'].Items[4])">{{__label(MASTERDATA['IPDESI115'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI115'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI115'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI115radio-' + 4" v-model="MASTERDATA['IPDESI115'].Items[6].Value">
                    <label :for="'IPDESI115radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI115'].Items, MASTERDATA['IPDESI115'].Items[6])">{{__label(MASTERDATA['IPDESI115'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Text -->
            <tr v-if="CheckPoint">
              <th colspan="4">{{'(Người phỏng vấn nên cố gắng khai thác càng chi tiết càng tốt về kế hoạch tự sát của người bệnh và mức độ cụ thể của nó, ghi lại những thông tin dưới dạng mẫu sau và tiếp tục trả lời câu hỏi số 10).'}}</th>
            </tr>
            <!-- Text below question 9 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: justify"  colspan="4">
                <p><strong>{{'Phương pháp'}}</strong></p>
                <span>
                  <p>{{__label(MASTERDATA['IPDESI123'].Items[0])}}</p>
                  <textarea-autosize
                    class="form-control"
                    rows="3"
                    :placeholder="('Nhập')"
                    v-model="MASTERDATA['IPDESI123'].Items[0].Value"
                  />
                </span>
                <span>
                  <p>{{__label(MASTERDATA['IPDESI125'].Items[0])}}</p>
                  <textarea-autosize
                    class="form-control"
                    rows="3"
                    :placeholder="('Nhập')"
                    v-model="MASTERDATA['IPDESI125'].Items[0].Value"
                  />
                </span>
                <span>
                  <p>{{__label(MASTERDATA['IPDESI127'].Items[0])}}</p>
                  <textarea-autosize
                    class="form-control"
                    rows="3"
                    :placeholder="('Nhập')"
                    v-model="MASTERDATA['IPDESI127'].Items[0].Value"
                  />
                </span>
                <span>
                  <p>{{__label(MASTERDATA['IPDESI129'].Items[0])}}</p>
                  <textarea-autosize
                    class="form-control"
                    rows="3"
                    :placeholder="('Nhập')"
                    v-model="MASTERDATA['IPDESI129'].Items[0].Value"
                  />
                </span>
                <span>
                  <p>{{__label(MASTERDATA['IPDESI131'].Items[0])}}</p>
                  <textarea-autosize
                    class="form-control"
                    rows="3"
                    :placeholder="('Nhập')"
                    v-model="MASTERDATA['IPDESI131'].Items[0].Value"
                  />
                </span>
                <span >
                  <p>{{__label(MASTERDATA['IPDESI133'].Items[0])}}</p>
                  <textarea-autosize
                    class="form-control"
                    rows="3"
                    :placeholder="('Nhập')"
                    v-model="MASTERDATA['IPDESI133'].Items[0].Value"
                  />
                </span>
              </td>
            </tr>
            <!-- Câu 10 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('10')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI137'].Items[0])}}</strong></p>
                <!-- <p>{{__label(MASTERDATA['IPDESI92'].Items[1])}}</p> -->
                <!-- <p>{{__label(MASTERDATA['IPDESI68'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI68'].Items[3])}}</p> -->
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI139'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI139radio-' + 1" v-model="MASTERDATA['IPDESI139'].Items[0].Value">
                    <label :for="'IPDESI139radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI139'].Items, MASTERDATA['IPDESI139'].Items[0])">{{__label(MASTERDATA['IPDESI139'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI139'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI139'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI139radio-' + 2" v-model="MASTERDATA['IPDESI139'].Items[2].Value">
                    <label :for="'IPDESI139radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI139'].Items, MASTERDATA['IPDESI139'].Items[2])">{{__label(MASTERDATA['IPDESI139'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI139'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI139'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI139radio-' + 3" v-model="MASTERDATA['IPDESI139'].Items[4].Value">
                    <label :for="'IPDESI139radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI139'].Items, MASTERDATA['IPDESI139'].Items[4])">{{__label(MASTERDATA['IPDESI139'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI139'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI139'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI139radio-' + 4" v-model="MASTERDATA['IPDESI139'].Items[6].Value">
                    <label :for="'IPDESI139radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI139'].Items, MASTERDATA['IPDESI139'].Items[6])">{{__label(MASTERDATA['IPDESI139'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 11 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('11')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI148'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI148'].Items[1])}}</p>
                <p>{{__label(MASTERDATA['IPDESI148'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI148'].Items[3])}}</p>
                <!-- <p>{{__label(MASTERDATA['IPDESI68'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI68'].Items[3])}}</p> -->
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI153'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI153radio-' + 1" v-model="MASTERDATA['IPDESI153'].Items[0].Value">
                    <label :for="'IPDESI153radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI153'].Items, MASTERDATA['IPDESI153'].Items[0])">{{__label(MASTERDATA['IPDESI153'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI153'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI153'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI153radio-' + 2" v-model="MASTERDATA['IPDESI153'].Items[2].Value">
                    <label :for="'IPDESI153radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI153'].Items, MASTERDATA['IPDESI153'].Items[2])">{{__label(MASTERDATA['IPDESI153'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI153'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI153'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI153radio-' + 3" v-model="MASTERDATA['IPDESI153'].Items[4].Value">
                    <label :for="'IPDESI153radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI153'].Items, MASTERDATA['IPDESI153'].Items[4])">{{__label(MASTERDATA['IPDESI153'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI153'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI153'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI153radio-' + 4" v-model="MASTERDATA['IPDESI153'].Items[6].Value">
                    <label :for="'IPDESI153radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI153'].Items, MASTERDATA['IPDESI153'].Items[6])">{{__label(MASTERDATA['IPDESI153'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 12 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('12')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI162'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI162'].Items[1])}}</p>
                <!-- <p>{{__label(MASTERDATA['IPDESI148'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI148'].Items[3])}}</p> -->
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI165'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI165radio-' + 1" v-model="MASTERDATA['IPDESI165'].Items[0].Value">
                    <label :for="'IPDESI165radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI165'].Items, MASTERDATA['IPDESI165'].Items[0])">{{__label(MASTERDATA['IPDESI165'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI165'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI165'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI165radio-' + 2" v-model="MASTERDATA['IPDESI165'].Items[2].Value">
                    <label :for="'IPDESI165radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI165'].Items, MASTERDATA['IPDESI165'].Items[2])">{{__label(MASTERDATA['IPDESI165'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI165'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI165'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI165radio-' + 3" v-model="MASTERDATA['IPDESI165'].Items[4].Value">
                    <label :for="'IPDESI165radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI165'].Items, MASTERDATA['IPDESI165'].Items[4])">{{__label(MASTERDATA['IPDESI165'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI165'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI165'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI165radio-' + 4" v-model="MASTERDATA['IPDESI165'].Items[6].Value">
                    <label :for="'IPDESI165radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI165'].Items, MASTERDATA['IPDESI165'].Items[6])">{{__label(MASTERDATA['IPDESI165'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 13 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('13')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI174'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI174'].Items[1])}}</p>
                <p>{{__label(MASTERDATA['IPDESI174'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI174'].Items[3])}}</p>
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI179'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI179radio-' + 1" v-model="MASTERDATA['IPDESI179'].Items[0].Value">
                    <label :for="'IPDESI179radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI179'].Items, MASTERDATA['IPDESI179'].Items[0])">{{__label(MASTERDATA['IPDESI179'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI179'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI179'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI179radio-' + 2" v-model="MASTERDATA['IPDESI179'].Items[2].Value">
                    <label :for="'IPDESI179radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI179'].Items, MASTERDATA['IPDESI179'].Items[2])">{{__label(MASTERDATA['IPDESI179'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI179'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI179'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI179radio-' + 3" v-model="MASTERDATA['IPDESI179'].Items[4].Value">
                    <label :for="'IPDESI179radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI179'].Items, MASTERDATA['IPDESI179'].Items[4])">{{__label(MASTERDATA['IPDESI179'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI179'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI179'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI179radio-' + 4" v-model="MASTERDATA['IPDESI179'].Items[6].Value">
                    <label :for="'IPDESI179radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI179'].Items, MASTERDATA['IPDESI179'].Items[6])">{{__label(MASTERDATA['IPDESI179'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 14 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('14')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI188'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI188'].Items[1])}}</p>
                <p>{{__label(MASTERDATA['IPDESI188'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI188'].Items[3])}}</p>
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI193'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI193radio-' + 1" v-model="MASTERDATA['IPDESI193'].Items[0].Value">
                    <label :for="'IPDESI193radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI193'].Items, MASTERDATA['IPDESI193'].Items[0])">{{__label(MASTERDATA['IPDESI193'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI193'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI193'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI193radio-' + 2" v-model="MASTERDATA['IPDESI193'].Items[2].Value">
                    <label :for="'IPDESI193radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI193'].Items, MASTERDATA['IPDESI193'].Items[2])">{{__label(MASTERDATA['IPDESI193'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI193'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI193'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI193radio-' + 3" v-model="MASTERDATA['IPDESI193'].Items[4].Value">
                    <label :for="'IPDESI193radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI193'].Items, MASTERDATA['IPDESI193'].Items[4])">{{__label(MASTERDATA['IPDESI193'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI193'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI193'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI193radio-' + 4" v-model="MASTERDATA['IPDESI193'].Items[6].Value">
                    <label :for="'IPDESI193radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI193'].Items, MASTERDATA['IPDESI193'].Items[6])">{{__label(MASTERDATA['IPDESI193'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 15 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('15')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI202'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI202'].Items[1])}}</p>
                <p>{{__label(MASTERDATA['IPDESI202'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI202'].Items[3])}}</p>
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI207'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI207radio-' + 1" v-model="MASTERDATA['IPDESI207'].Items[0].Value">
                    <label :for="'IPDESI207radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI207'].Items, MASTERDATA['IPDESI207'].Items[0])">{{__label(MASTERDATA['IPDESI207'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI207'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI207'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI207radio-' + 2" v-model="MASTERDATA['IPDESI207'].Items[2].Value">
                    <label :for="'IPDESI207radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI207'].Items, MASTERDATA['IPDESI207'].Items[2])">{{__label(MASTERDATA['IPDESI207'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI207'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI207'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI207radio-' + 3" v-model="MASTERDATA['IPDESI207'].Items[4].Value">
                    <label :for="'IPDESI207radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI207'].Items, MASTERDATA['IPDESI207'].Items[4])">{{__label(MASTERDATA['IPDESI207'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI207'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI207'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI207radio-' + 4" v-model="MASTERDATA['IPDESI207'].Items[6].Value">
                    <label :for="'IPDESI207radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI207'].Items, MASTERDATA['IPDESI207'].Items[6])">{{__label(MASTERDATA['IPDESI207'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 16 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('16')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI216'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI216'].Items[1])}}</p>
                <!-- <p>{{__label(MASTERDATA['IPDESI202'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI202'].Items[3])}}</p> -->
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI219'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI219radio-' + 1" v-model="MASTERDATA['IPDESI219'].Items[0].Value">
                    <label :for="'IPDESI219radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI219'].Items, MASTERDATA['IPDESI219'].Items[0])">{{__label(MASTERDATA['IPDESI219'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI219'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI219'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI219radio-' + 2" v-model="MASTERDATA['IPDESI219'].Items[2].Value">
                    <label :for="'IPDESI219radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI219'].Items, MASTERDATA['IPDESI219'].Items[2])">{{__label(MASTERDATA['IPDESI219'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI219'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI219'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI219radio-' + 3" v-model="MASTERDATA['IPDESI219'].Items[4].Value">
                    <label :for="'IPDESI219radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI219'].Items, MASTERDATA['IPDESI219'].Items[4])">{{__label(MASTERDATA['IPDESI219'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI219'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI219'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI219radio-' + 4" v-model="MASTERDATA['IPDESI219'].Items[6].Value">
                    <label :for="'IPDESI219radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI219'].Items, MASTERDATA['IPDESI219'].Items[6])">{{__label(MASTERDATA['IPDESI219'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 17 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('17')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI228'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI228'].Items[1])}}</p>
                <p>{{__label(MASTERDATA['IPDESI228'].Items[2])}}</p>
                <!-- <p>{{__label(MASTERDATA['IPDESI202'].Items[3])}}</p> -->
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI232'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI232radio-' + 1" v-model="MASTERDATA['IPDESI232'].Items[0].Value">
                    <label :for="'IPDESI232radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI232'].Items, MASTERDATA['IPDESI232'].Items[0])">{{__label(MASTERDATA['IPDESI232'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI232'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI232'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI232radio-' + 2" v-model="MASTERDATA['IPDESI232'].Items[2].Value">
                    <label :for="'IPDESI232radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI232'].Items, MASTERDATA['IPDESI232'].Items[2])">{{__label(MASTERDATA['IPDESI232'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI232'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI232'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI232radio-' + 3" v-model="MASTERDATA['IPDESI232'].Items[4].Value">
                    <label :for="'IPDESI232radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI232'].Items, MASTERDATA['IPDESI232'].Items[4])">{{__label(MASTERDATA['IPDESI232'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI232'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI232'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI232radio-' + 4" v-model="MASTERDATA['IPDESI232'].Items[6].Value">
                    <label :for="'IPDESI232radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI232'].Items, MASTERDATA['IPDESI232'].Items[6])">{{__label(MASTERDATA['IPDESI232'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <!-- Câu 18 -->
            <tr v-if="CheckPoint">
              <td class="bg-head b-b-2" style="text-align: center" rowspan="4">
                {{__t('18')}}
              </td>
              <td class="bg-head b-b-2" style="text-align: justify" rowspan="4">
                <p><strong>{{__label(MASTERDATA['IPDESI241'].Items[0])}}</strong></p>
                <p>{{__label(MASTERDATA['IPDESI241'].Items[1])}}</p>
                <!-- <p>{{__label(MASTERDATA['IPDESI202'].Items[2])}}</p>
                <p>{{__label(MASTERDATA['IPDESI202'].Items[3])}}</p> -->
              </td>
              <td style="text-align: justify">
                {{__label(MASTERDATA['IPDESI244'])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI244radio-' + 1" v-model="MASTERDATA['IPDESI244'].Items[0].Value">
                    <label :for="'IPDESI244radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDESI244'].Items, MASTERDATA['IPDESI244'].Items[0])">{{__label(MASTERDATA['IPDESI244'].Items[0])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI244'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI244'].Items[1])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI244radio-' + 2" v-model="MASTERDATA['IPDESI244'].Items[2].Value">
                    <label :for="'IPDESI244radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDESI244'].Items, MASTERDATA['IPDESI244'].Items[2])">{{__label(MASTERDATA['IPDESI244'].Items[2])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI244'] && CheckPoint">
              <td>
                {{__label(MASTERDATA['IPDESI244'].Items[3])}}
              </td>
              <td>
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI244radio-' + 3" v-model="MASTERDATA['IPDESI244'].Items[4].Value">
                    <label :for="'IPDESI244radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDESI244'].Items, MASTERDATA['IPDESI244'].Items[4])">{{__label(MASTERDATA['IPDESI244'].Items[4])}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['IPDESI244'] && CheckPoint">
              <td class="b-b-2">
                {{__label(MASTERDATA['IPDESI244'].Items[5])}}
              </td>
              <td class="b-b-2">
                <div class="group-radio full-width">
                  <span>
                    <input @change="calculate()" type="checkbox" :id="'IPDESI244radio-' + 4" v-model="MASTERDATA['IPDESI244'].Items[6].Value">
                    <label :for="'IPDESI244radio-' + 4" @click="checkbox2Radio(MASTERDATA['IPDESI244'].Items, MASTERDATA['IPDESI244'].Items[6])">{{__label(MASTERDATA['IPDESI244'].Items[6])}}</label>
                  </span>
                </div>
              </td>
            </tr>
          <!-- Điểm -->
            <tr>
              <td class="bg-head font-bold b-b-2" width="270" colspan="3">
                {{__t('Tổng điểm')}}
              </td>
              <!-- <td class="b-b-2"><label class="label-yellow">{{total}}</label></td> -->
              <td class="b-b-2"><label class="label-yellow">{{totalPoint}}</label></td>
            </tr>
            <tr>
              <td class="bg-head font-bold" width="270"  colspan="3">
                {{__t('Thang điểm đánh giá')}}
              </td>
              <!-- <td><label class="label-yellow">{{LEVELS[level]}}</label></td> -->
              <td><label class="label-yellow">{{levelPoint}}</label></td>
            </tr>
          </table>
          <!-- Chân ký -->
          <div v-if="DataSubmit" class="row text-center mt-10">
            <div class="col-md-6 col-md-offset-6" v-if="DataSubmit.DoctorConfirm.UserName">
              <div style="font-weight: normal">{{ ConfirmAt }}</div>
              <eform-signature
                :vi="true"
                :ad="DataSubmit.DoctorConfirm.UserName"
                :title="'Người thực hiện'"
              />
            </div>
            <div class="col-md-6 col-md-offset-6" v-else>
              <p class="mb-10">
                <b>Người thực hiện</b>
              </p>
              <i v-if="isReadOnly">{{__t('Chưa xác nhận')}}</i>
              <button v-else @click="showDoctorConfirm('Doctor', 'Người thực hiện')" class="btn v-white-btn">
                {{ __t('Xác nhận') }}
              </button>
            </div>
          </div>
          <!-- Footer -->
          <FloatBlock v-if="!viewOnly" @handleBack='handleBack()' :openBack="true">
            <template slot='buttons'>
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                  <!-- <button class="btn btn-info pull-right" type="button" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button> -->
                </div>
              </div>
              <div class="col-md-6 col-sm-6" v-if="!isReadOnly">
                <div class="form-group1">
                  <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Lưu')}}</button>
                </div>
              </div>
            </template>
          </FloatBlock>
          <DoctorConfirm :popupTitle="popupTitle" :TypeConfirm="TypeConfirm" @popupSave="confirm"/>
        </div>
    </div>
  </div>
</div>
    <!-- <div v-else class="loading-text"><v-loading/></div> -->
</template>

<script>
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import ScaleForAssessmentOfSuicideIntent from '@/services/IPD/ScaleForAssessmentOfSuicideIntent'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import NProgress from 'nprogress'
import DoctorConfirm from '@/components/IPD/ForNeonatalMaternity/PopupDoctorConfirm.vue'
import _ from 'lodash'
import moment from 'moment'
const MDCODES2 = [
  'IPDESI5'
]
const MDCODES3 = [
  'IPDESI18'
]
const MDCODES4 = [
  'IPDESI30',
  'IPDESI44'
]
const MDCODES1 = [
  'IPDESI5',
  'IPDESI18',
  'IPDESI30',
  'IPDESI44',
  'IPDESI59',
  'IPDESI71',
  'IPDESI83',
  'IPDESI95',
  'IPDESI115',
  'IPDESI139',
  'IPDESI153',
  'IPDESI165',
  'IPDESI179',
  'IPDESI193',
  'IPDESI207',
  'IPDESI219',
  'IPDESI232',
  'IPDESI244'
]
export default {
  name: 'IPDScaleForAssessmentOfSuicideIntentItem',
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
  components: {
    DoctorConfirm,
    VDateTimePicker
  },
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      DataSubmit: {},
      FormCode: 'A01_221_210121_V',
      checkEdited: false,
      popupTitle: '',
      TypeConfirm: '',
      loaded: false,
      nullContent: true,
      formId: '',
      IsLocked: false,
      CheckPoint: false,
      dataMaster: {},
      ConfirmAt: '',
      CreatedAt: '',
      IDForm: '',
      CreatedBy: '',
      LEVELS: ['', 'N/A', 'Có ý tưởng tự sát nhẹ', 'Có ý tưởng tự sát vừa', 'Có ý tưởng tự sát nặng'],
      totalPoint: 'N/A',
      levelPoint: 'N/A'
    }
  },
  mounted () {
    this.getInfo()
    this.getMasterDatas({ Form: 'A01_221_210121_V' }, () => {
      this.getData()
    })
  },
  watch: {
    MASTERDATA: {
      handler () {
        if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
          this.checkEdited = true
        }
        if (this.totalPoint1 >= 2 || this.totalPoint2 >= 2 || this.totalPoint3 >= 1) {
          this.CheckPoint = true
        } else {
          this.CheckPoint = false
        }
      },
      deep: true
    }
  },
  computed: {
    isReadOnly () {
      // return this.viewOnly || this.IsLocked
      return this.viewOnly || this.IsLocked || this.getCurrentUsername() !== this.CreatedBy || this.DataSubmit.DoctorConfirm.UserName || !this.hasRole('IPDSFAOSIU')
      // return false
    },
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    },
    totalPoint1: function () {
      var totalPoint1 = 0
      MDCODES2.forEach(code => {
        if (this.MASTERDATA[code]) {
          this.MASTERDATA[code].Items.forEach(item => {
            if (item.DataType === 'Radio' && item.ViName && item.Value) {
              totalPoint1 = totalPoint1 + this.parseInt(item.ViName)
            }
          })
        }
      })
      return totalPoint1
    },
    totalPoint2: function () {
      var totalPoint2 = 0
      MDCODES3.forEach(code => {
        if (this.MASTERDATA[code]) {
          this.MASTERDATA[code].Items.forEach(item => {
            if (item.DataType === 'Radio' && item.ViName && item.Value) {
              totalPoint2 = totalPoint2 + this.parseInt(item.ViName)
            }
          })
        }
      })
      return totalPoint2
    },
    totalPoint3: function () {
      var totalPoint3 = 0
      MDCODES4.forEach(code => {
        if (this.MASTERDATA[code]) {
          this.MASTERDATA[code].Items.forEach(item => {
            if (item.DataType === 'Radio' && item.ViName && item.Value) {
              totalPoint3 = totalPoint3 + this.parseInt(item.ViName)
            }
          })
        }
      })
      return totalPoint3
    },
    total: function () {
      var total = 0
      MDCODES1.forEach(code => {
        if (this.MASTERDATA[code]) {
          this.MASTERDATA[code].Items.forEach(item => {
            if (item.DataType === 'Radio' && item.ViName && item.Value) {
              total = total + this.parseInt(item.ViName)
            }
          })
          // console.log(total, 'total i receive')
        }
      })
      return total
    },
    level: function () {
      var level = 1
      var total = this.total
      // console.log(this.checkEdited, 'true or false ??????????????')
      if (total >= 0 && total <= 18) {
        level = 2
      }
      if (total >= 19 && total <= 36) {
        level = 3
      }
      if (total > 36) {
        level = 4
      }
      return level
    }
  },
  methods: {
    calculate () {
      var point = 0
      // Câu 1
      if (this.MASTERDATA['IPDESI5'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI5'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI5'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI5'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI5'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI5'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI5'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI5'].Items[6].ViName)
      }
      // Câu 2
      if (this.MASTERDATA['IPDESI18'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI18'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI18'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI18'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI18'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI18'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI18'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI18'].Items[6].ViName)
      }
      // Câu 3
      if (this.MASTERDATA['IPDESI30'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI30'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI30'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI30'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI30'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI30'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI30'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI30'].Items[6].ViName)
      }
      // Câu 4
      if (this.MASTERDATA['IPDESI44'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI44'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI44'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI44'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI44'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI44'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI44'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI44'].Items[6].ViName)
      }
      // Câu 5
      if (this.MASTERDATA['IPDESI59'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI59'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI59'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI59'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI59'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI59'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI59'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI59'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI71'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI71'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI71'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI71'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI71'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI71'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI71'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI71'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI83'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI83'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI83'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI83'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI83'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI83'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI83'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI83'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI95'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI95'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI95'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI95'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI95'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI95'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI95'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI95'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI115'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI115'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI115'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI115'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI115'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI115'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI115'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI115'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI139'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI139'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI139'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI139'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI139'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI139'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI139'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI139'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI153'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI153'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI153'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI153'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI153'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI153'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI153'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI153'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI165'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI165'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI165'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI165'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI165'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI165'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI165'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI165'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI179'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI179'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI179'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI179'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI179'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI179'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI179'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI179'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI193'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI193'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI193'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI193'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI193'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI193'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI193'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI193'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI207'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI207'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI207'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI207'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI207'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI207'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI207'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI207'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI219'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI219'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI219'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI219'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI219'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI219'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI219'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI219'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI232'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI232'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI232'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI232'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI232'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI232'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI232'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI232'].Items[6].ViName)
      }
      if (this.MASTERDATA['IPDESI244'].Items[0].Value) {
        point += parseInt(this.MASTERDATA['IPDESI244'].Items[0].ViName)
      }
      if (this.MASTERDATA['IPDESI244'].Items[2].Value) {
        point += parseInt(this.MASTERDATA['IPDESI244'].Items[2].ViName)
      }
      if (this.MASTERDATA['IPDESI244'].Items[4].Value) {
        point += parseInt(this.MASTERDATA['IPDESI244'].Items[4].ViName)
      }
      if (this.MASTERDATA['IPDESI244'].Items[6].Value) {
        point += parseInt(this.MASTERDATA['IPDESI244'].Items[6].ViName)
      }
      console.log(point, 'point receive')
      if (point === 0) {
        if (this.MASTERDATA['IPDESI5'].Items[0].Value || this.MASTERDATA['IPDESI5'].Items[2].Value || this.MASTERDATA['IPDESI5'].Items[4].Value || this.MASTERDATA['IPDESI5'].Items[6].Value ||
        this.MASTERDATA['IPDESI18'].Items[0].Value || this.MASTERDATA['IPDESI18'].Items[2].Value || this.MASTERDATA['IPDESI18'].Items[4].Value || this.MASTERDATA['IPDESI18'].Items[6].Value ||
        this.MASTERDATA['IPDESI30'].Items[0].Value || this.MASTERDATA['IPDESI30'].Items[2].Value || this.MASTERDATA['IPDESI30'].Items[4].Value || this.MASTERDATA['IPDESI30'].Items[6].Value ||
        this.MASTERDATA['IPDESI44'].Items[0].Value || this.MASTERDATA['IPDESI44'].Items[2].Value || this.MASTERDATA['IPDESI44'].Items[4].Value || this.MASTERDATA['IPDESI44'].Items[6].Value
        ) {
          this.totalPoint = point.toString()
          this.levelPoint = 'Có ý tưởng tự sát nhẹ'
        } else {
          this.totalPoint = 'N/A'
          this.levelPoint = 'N/A'
        }
      } else if (point >= 0 && point <= 18) {
        this.levelPoint = 'Có ý tưởng tự sát nhẹ'
        this.totalPoint = point.toString()
      } else if (point >= 19 && point <= 36) {
        this.levelPoint = 'Có ý tưởng tự sát vừa'
        this.totalPoint = point.toString()
      } else if (point > 36) {
        this.levelPoint = 'Có ý tưởng tự sát nặng'
        this.totalPoint = point.toString()
      } else {
        this.levelPoint = 'N/A'
      }
    },
    getInfo () {
      var urlInfo1 = 'Info/A01_221_210121_V/' + this._VisitId
      new ScaleForAssessmentOfSuicideIntent().find(urlInfo1).then(response => {
        this.IDForm = response.FormId
        this.$store.dispatch('setCurrentFormId', response.FormId)
        // this.IsLocked = response.Lock24h
        // this.$router.push({name: this._VisitType + 'ScaleForAssessmentOfSuicideIntentItem', params: {Id: this.$route.params.Id, Item: response.FormId}})
      }).catch(e => {
        console.log(e, 'get false')
      })
      //
      var urlInfo2 = 'InfoLock24h/A01_221_210121_V/' + this._VisitId
      new ScaleForAssessmentOfSuicideIntent().find(urlInfo2).then(response => {
        this.IsLocked = response.Lock24h
        // this.$router.push({name: this._VisitType + 'ScaleForAssessmentOfSuicideIntentItem', params: {Id: this.$route.params.Id, Item: response.FormId}})
      }).catch(e => {
        console.log(e, 'get false')
      })
    },
    create () {
      var urlCreate = '/Create/A01_221_210121_V/' + this._VisitId
      new ScaleForAssessmentOfSuicideIntent().update(urlCreate).then(response => {
        // this.$router.push({name: this._VisitType + 'ScaleForAssessmentOfSuicideIntentItem', params: {Id: this.$route.params.Id, Item: response.Id}})
        this.reload()
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Thang đánh giá ý tưởng tự sát và mức độ ý tưởng tự sát'),
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
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    async confirm (data) {
      if (this.checkEdited) {
        await this.handleSubmit()
      }
      var urlConfirm = '/Confirm/A01_221_210121_V/' + this.$route.params.Id
      new ScaleForAssessmentOfSuicideIntent().update(urlConfirm, data).then(response => {
        this.$modal.hide('doctorConfirm')
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        setTimeout(() => {
          this.reload()
        }, 800)
      }).catch(e => {
        this.$modal.hide('doctorConfirm')
      })
    },
    print () {
      this.$htmlToPaper('printMe', false, 'A03_119_201119_V')
    },
    getData () {
      var urlGet = 'A01_221_210121_V/' + this._VisitId
      new ScaleForAssessmentOfSuicideIntent().find(urlGet).then(response => {
        // this.$router.push({name: this._VisitType + 'ScaleForAssessmentOfSuicideIntent', params: {Id: this.$route.params.Id, Item: idTest}})
        this.DataSubmit = response
        if (response.Datas) {
          this.$emit('hiddenLog')
        }
        this.$emit('TimeLog', moment(response.UpdatedAt).format('HH:mm DD/MM/YYYY'), response.UpdateBy)
        this.CreatedBy = response.CreatedBy
        this.IsLocked = response.IsLocked
        this.CreatedAt = moment(response.CreatedAt).format('HH:mm DD/MM/YYYY')
        this.loaded = true
        this.nullContent = false
        this.ConfirmAt = moment(response.DoctorConfirmAt).format('HH:mm DD/MM/YYYY')
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
            })
          }
        }
        this.calculate()
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        this.loaded = true
        setTimeout(() => {
          this.checkEdited = false
          this.edited = false
        }, 1000)
      }).catch(e => {
        // nothing
      })
    },
    handleSubmit () {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      this.DataSubmit.Total = this.totalPoint
      this.DataSubmit.Level = this.levelPoint
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'Checkbox') || this.checkString(item.DataType, 'Text')) {
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
            obj[item.Code] = item.Value
          })
        }
      }
      this.DataSubmit = {
        ...this.DataSubmit,
        Level: this.levelPoint,
        Total: this.totalPoint
      }
      // api/IPD/IPDScaleForAssessmentOfSuicideIntent/Update/A01_221_210121_V/{visitId}
      var url = '/Update/A01_221_210121_V/' + this.$route.params.Id
      new ScaleForAssessmentOfSuicideIntent().update(url, this.DataSubmit).then(response => {
        this.toastedSuccess()
        setTimeout(() => {
          this.reload()
        }, 500)
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    handleBack () {
      this.edited = false
      if (this.checkEdited) {
        this.$modal.show('dialog', {
          title: this.__t('Cảnh báo'),
          text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: this.__t('Đồng ý'),
              class: 'btn',
              handler: () => {
                this.$emit('closed')
                this.$modal.hide('MasterDataPopup')
                this.$modal.hide('dialog')
                this.getLastHistory()
              }
            },
            {
              title: this.__t('Hủy bỏ'),
              class: 'btn bg-yellow',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
      } else {
        this.getLastHistory()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.v-checkbox input[type=checkbox] + label:before {
  width: 25px;
  height: 25px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox-rounded {
  .v-checkbox input[type=checkbox] + label:before {
    border-radius: 50%;
  }
}
.pointer-none {
  pointer-events: none;
}
.disable-text {
  color: #b1b1b1;
  .v-checkbox input[type=checkbox] + label:before {
    border-color: #b1b1b1
  }
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
label [for="radio-OPDGENBRCA36"]{
  color: red;
}
</style>
