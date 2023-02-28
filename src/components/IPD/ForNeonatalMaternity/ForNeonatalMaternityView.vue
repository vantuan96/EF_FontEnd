<template>
  <div>
    <!-- Bác sĩ sản khoa -->
    <div v-if="MASTERDATA['IPDOAGIANM1']" class="flex-box flex-center mb10 mt-10">
      <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM1'])}}: </label>
      <div v-if="MASTERDATA['IPDOAGIANM1'].Items[0].Value"><ad-Info :ad="MASTERDATA['IPDOAGIANM1'].Items[0].Value.Username" /></div>
      <p v-else>{{ 'N/A' }}</p>
    </div>
    <!-- Bác sĩ sơ sinh -->
    <div v-if="MASTERDATA['IPDOAGIANM3']" class="flex-box flex-center mb10">
      <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM3'])}}:</label>
      <div v-if="MASTERDATA['IPDOAGIANM3'].Items[0].Value"><ad-Info :ad="MASTERDATA['IPDOAGIANM3'].Items[0].Value.Username" /></div>
      <p v-else>{{ 'N/A' }}</p>
    </div>
    <!-- Nữ hộ sinh -->
    <div v-if="MASTERDATA['IPDOAGIANM5']" class="flex-box flex-center mb10">
      <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM5'])}}:</label>
      <div v-if="MASTERDATA['IPDOAGIANM5'].Items[0].Value"><ad-Info :ad="MASTERDATA['IPDOAGIANM5'].Items[0].Value.Username" /></div>
      <p v-else>{{ 'N/A' }}</p>
    </div>
    <!-- Giờ vào khoa của trẻ -->
    <div v v-if="MASTERDATA['IPDOAGIANM226']" class="flex-box flex-center mb10">
      <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM226'])}}:</label>
      <FakeInput style="margin: 0" v-model="arrivalTime" />
    </div>
    <div v-if="MASTERDATA['IPDOAGIANM7']" class="flex-box flex-center mb10">
      <!-- Thời gian đánh giá -->
      <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM7'])}}:</label>
      <!-- <FakeInput v-if="MASTERDATA['IPDOAGIANM7'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM7'].Items[0].Value" /> -->
      <p style="margin: 0; background-color: #F5F5F5" class="fake-input">{{MASTERDATA['IPDOAGIANM7'].Items[0].Value || CreatedAt}}</p>
      <!-- NVYT tế đánh giá -->
      <div class="flex-box flex-center">
        <label class="display-inline ml-20 mr-5" style="font-weight: bold; margin-bottom: 0">{{__t('NVYT đánh giá')}}:</label>
        <ad-Info :ad="DataSubmit.CreatedBy"/>
      </div>
    </div>
    <div class="tbl-title">1. {{__t('Đánh giá sản phụ')}}</div>
    <table class="table v-table-1 no-margin col-1-1"  id="InitialAssessment-ForAdult-block1">
      <!-- Tiền sử bệnh lý -->
      <tr v-if="MASTERDATA['IPDOAGIANM9']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM9'])}}</div></th>
        <td>
          <FakeInput v-if="MASTERDATA['IPDOAGIANM7'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM9'].Items[0].Value"  />
        </td>
      </tr>
      <!-- Tiền sử mang thai trước -->
      <tr v-if="MASTERDATA['IPDOAGIANM11']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM11'])}}</div></th>
        <td>
          <div class="flex-box flex-center mb-5">
            <FakeInput style="width: 180px" class="form-control no-margin" v-model="MASTERDATA['IPDOAGIANM217'].Items[1].Value" :placeholder="__t('Nhập')"/>
            <label class="display-inline font-nomal-text ml-20 w140" style="margin-bottom: 0">{{__label(MASTERDATA['IPDOAGIANM217'].Items[0])}}</label>
          </div>
          <div class="flex-box flex-center mb-5">
            <FakeInput style="width: 180px" class="form-control no-margin" v-model="MASTERDATA['IPDOAGIANM217'].Items[3].Value" :placeholder="__t('Nhập')"/>
            <label class="display-inline font-nomal-text ml-20 w140" style="margin-bottom: 0">{{__label(MASTERDATA['IPDOAGIANM217'].Items[2])}}</label>
          </div>
          <div class="flex-box flex-center mb-5">
            <FakeInput style="width: 180px" class="form-control no-margin" v-model="MASTERDATA['IPDOAGIANM217'].Items[5].Value" :placeholder="__t('Nhập')"/>
            <label class="display-inline font-nomal-text ml-20 w140" style="margin-bottom: 0">{{__label(MASTERDATA['IPDOAGIANM217'].Items[4])}}</label>
          </div>
          <div class="flex-box flex-center mb-10">
            <FakeInput style="width: 180px" class="form-control no-margin" v-model="MASTERDATA['IPDOAGIANM217'].Items[7].Value" :placeholder="__t('Nhập')"/>
            <label class="display-inline font-nomal-text ml-20 w140" style="margin-bottom: 0">{{__label(MASTERDATA['IPDOAGIANM217'].Items[6])}}</label>
          </div>
          <table class="table v-table-1 no-margin">
            <tr>
              <th width="15%" class="no-wrap text-center">{{__label(MASTERDATA['IPDOAGIANM11'].Items[1])}}</th>
              <th width="85%" class="no-wrap text-center">{{__label(MASTERDATA['IPDOAGIANM11'].Items[3])}}</th>
            </tr>
            <tr v-for="(item, index) in MASTERDATA['IPDOAGIANM205'].Items[0].Value" :key="index">
              <td class="text-center" style="position: relative">
                <FakeInput v-if="MASTERDATA['IPDOAGIANM205'].Items[0]" style="margin: 0" v-model="item.Year"  />
              </td>
              <td>
                <FakeInput v-if="MASTERDATA['IPDOAGIANM205'].Items[0]" style="margin: 0" v-model="item.Name"/>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- Nhóm máu -->
      <tr v-if="MASTERDATA['IPDOAGIANM17']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM17'])}}</div></th>
        <td>
          <FakeInput v-if="MASTERDATA['IPDOAGIANM7'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM17'].Items[0].Value"  />
        </td>
      </tr>
      <!-- Kháng thể -->
      <tr v-if="MASTERDATA['IPDOAGIANM19']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM19'])}}</div></th>
        <td>
          <FakeInput v-if="MASTERDATA['IPDOAGIANM7'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM19'].Items[0].Value"  />
        </td>
      </tr>
      <!-- NDKL -->
      <tr v-if="MASTERDATA['IPDOAGIANM21']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM21'])}}</div></th>
        <td>
          <FakeInput v-if="MASTERDATA['IPDOAGIANM7'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM21'].Items[0].Value"  />
        </td>
      </tr>
      <!-- Viêm gan B/C -->
      <tr v-if="MASTERDATA['IPDOAGIANM23']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM23'])}}</div></th>
        <td>
          <FakeInput v-if="MASTERDATA['IPDOAGIANM7'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM23'].Items[0].Value"  />
        </td>
      </tr>
      <!-- HIV -->
      <tr v-if="MASTERDATA['IPDOAGIANM25']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM25'])}}</div></th>
        <td>
          <FakeInput v-if="MASTERDATA['IPDOAGIANM7'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM25'].Items[0].Value"  />
        </td>
      </tr>
      <!-- Thai kỳ hiện tại -->
      <tr v-if="MASTERDATA['IPDOAGIANM27']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM27'])}}</div></th>
        <td>
          <!-- LMP -->
          <div v-if="MASTERDATA['IPDOAGIANM28']" class="flex-box flex-center mb10">
            <label class="w-100 display-inline">{{__label(MASTERDATA['IPDOAGIANM28'])}}:</label>
            <FakeInput v-if="MASTERDATA['IPDOAGIANM7'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM28'].Items[0].Value"  />
          </div>
          <!-- EDD -->
          <div v-if="MASTERDATA['IPDOAGIANM30']" class="flex-box flex-center mb10">
            <label class="w-100 display-inline">{{__label(MASTERDATA['IPDOAGIANM30'])}}:</label>
            <FakeInput v-if="MASTERDATA['IPDOAGIANM7'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM30'].Items[0].Value"/>
          </div>
          <!-- Thuốc -->
          <div v-if="MASTERDATA['IPDOAGIANM32']" class="flex-box flex-center mb10">
            <label class="w-100 display-inline">{{__label(MASTERDATA['IPDOAGIANM32'])}}:</label>
            <FakeInput v-if="MASTERDATA['IPDOAGIANM7'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM32'].Items[0].Value"/>
          </div>
            <!-- Celestone -->
          <div v-if="MASTERDATA['IPDOAGIANM34']" class="flex-box flex-center mb10">
            <label class="w-100 display-inline">{{__label(MASTERDATA['IPDOAGIANM34'])}}:</label>
            <td style="padding: 0; border: none">
              <MDRadioView v-if="MASTERDATA['IPDOAGIANM34']" :data="MASTERDATA['IPDOAGIANM34'].Items"/>
            </td>
          </div>
          <!-- GBS -->
          <div v-if="MASTERDATA['IPDOAGIANM38']" class="flex-box flex-center mb10">
            <label class="w-100 display-inline">{{__label(MASTERDATA['IPDOAGIANM38'])}}:</label>
            <td style="padding: 0; border: none">
              <MDRadioView v-if="MASTERDATA['IPDOAGIANM38']" :data="MASTERDATA['IPDOAGIANM38'].Items"/>
            </td>
          </div>
          <!-- HVS -->
          <div v-if="MASTERDATA['IPDOAGIANM42']" class="flex-box flex-center mb10">
            <label class="w-100 display-inline">{{__label(MASTERDATA['IPDOAGIANM42'])}}:</label>
            <FakeInput v-if="MASTERDATA['IPDOAGIANM42'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM42'].Items[0].Value"/>
          </div>
          <!-- Các biến chứng sau thai kỳ -->
          <div v-if="MASTERDATA['IPDOAGIANM44']" class="mb10">
            <label class="display-inline">{{__label(MASTERDATA['IPDOAGIANM44'])}}:</label>
            <FakeInput v-if="MASTERDATA['IPDOAGIANM44'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM44'].Items[0].Value"/>
          </div>
        </td>
      </tr>
      <!-- Chuyển dạ -->
      <tr v-if="MASTERDATA['IPDOAGIANM46']">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM46'])}}</div></th>
        <td>
          <div class="flex-box flex-center mb-10">
            <MDRadioView v-if="MASTERDATA['IPDOAGIANM46']" :data="MASTERDATA['IPDOAGIANM46'].Items"/>
            <div v-if="MASTERDATA['IPDOAGIANM46'].Items[2].Value">
              <FakeInput v-if="MASTERDATA['IPDOAGIANM46'].Items[0]" class="ml-5" v-model="MASTERDATA['IPDOAGIANM46'].Items[3].Value"/>
            </div>
          </div>
          <!-- Vỡ ối (thời gian) -->
          <div class="flex-box flex-center mb-10" style="align-items: center">
            <label class="display-inline w160">{{__label(MASTERDATA['IPDOAGIANM51'])}}:</label>
            <FakeInput class="mt-10" v-if="MASTERDATA['IPDOAGIANM51'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM51'].Items[0].Value"/>
            <!-- <CheckboxsValue :data="[MASTERDATA['IPDOAGIANM51'].Items[1].Value, MASTERDATA['IPDIAAUITV10'].Items[2].Value]"/> -->
            <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['IPDOAGIANM51'].Items">
              <div style="pointer-events: none;" class="flex-box flex-center" :class="{'d-none': index === 0}">
                <div class="flex-box flex-center v-checkbox">
                  <input type="checkbox" :id="'IPDIAAUITV5cxo-' + index" v-model="item.Value">
                  <label :for="'IPDIAAUITV5cxo-' + index"></label>
                </div>
                <span class="displaytbl"><span>{{__label(item)}}</span></span>
              </div>
            </div>
          </div>
          <!-- Sử dụng kháng sinh -->
          <div class="flex-box flex-center mb10">
            <label class="display-inline w160">{{__label(MASTERDATA['IPDOAGIANM55'])}}:</label>
            <MDRadioView v-if="MASTERDATA['IPDOAGIANM55']" :data="MASTERDATA['IPDOAGIANM55'].Items"/>
          </div>
          <div class="flex-box flex-center mb10" v-if="MASTERDATA['IPDOAGIANM55'].Items[0].Value">
            <label class="display-inline w160 no-wrap" style="font-weight: normal">{{__label(MASTERDATA['IPDOAGIANM55'].Items[2])}}:</label>
            <FakeInput v-if="MASTERDATA['IPDOAGIANM55'].Items[3]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM55'].Items[3].Value"/>
          </div>
          <!-- CTG -->
          <div class="flex-box flex-center mb-10">
            <label class="display-inline w160">{{__label(MASTERDATA['IPDOAGIANM60'])}}:</label>
            <MDRadioView v-if="MASTERDATA['IPDOAGIANM60']" :data="MASTERDATA['IPDOAGIANM60'].Items"/>
          </div>
          <!-- Nghi ngờ suy thai -->
          <div v-if="MASTERDATA['IPDOAGIANM63']" class="flex-box flex-center mb10">
            <label class="display-inline w160">{{__label(MASTERDATA['IPDOAGIANM63'])}}:</label>
            <FakeInput v-if="MASTERDATA['IPDOAGIANM63'].Items[0]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM63'].Items[0].Value"/>
          </div>
          <!-- Thời gian chuyển dạ -->
          <label class="display-inline">{{__label(MASTERDATA['IPDOAGIANM65'])}}:</label>
          <table class="table v-table-1 no-margin">
            <tr>
              <th width="10%" class="no-wrap text-center">{{__label(MASTERDATA['IPDOAGIANM65'].Items[0])}}</th>
              <th width="90%" class="no-wrap text-center">{{__label(MASTERDATA['IPDOAGIANM65'].Items[1])}}</th>
            </tr>
            <tr v-for="(item, index) in MASTERDATA['IPDOAGIANM207'].Items[0].Value" :key="index">
              <td class="text-center" style="position: relative">
                <span>
                  {{item.Stage}}
                </span>
              </td>
              <td>
                <FakeInput style="margin: 0" v-model="item.Content"/>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- Ngôi thai -->
      <tr v-if="MASTERDATA['IPDOAGIANM68']">
        <th>{{__label(MASTERDATA['IPDOAGIANM68'])}}</th>
        <td>
          <div class="flex-box flex-center">
            <div>
              <MDRadioView v-if="MASTERDATA['IPDOAGIANM68']" :data="MASTERDATA['IPDOAGIANM68'].Items"/>
            </div>
            <div style="flex-grow: 1;" class="ml-10" v-if="MASTERDATA['IPDOAGIANM68'].Items[2].Value">
              <FakeInput v-if="MASTERDATA['IPDOAGIANM68'].Items[3]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM68'].Items[3].Value"/>
            </div>
          </div>
        </td>
      </tr>
      <!-- Kiểu sinh -->
      <tr v-if="MASTERDATA['IPDOAGIANM73']">
        <th>{{__label(MASTERDATA['IPDOAGIANM73'])}}</th>
        <td>
          <div>
            <MDRadioView v-if="MASTERDATA['IPDOAGIANM73']" :data="MASTERDATA['IPDOAGIANM73'].Items"/>
          </div>
          <div style="flex-grow: 1;" class="mt-10" v-if="MASTERDATA['IPDOAGIANM73'].Items[0].Value">
            <FakeInput v-if="MASTERDATA['IPDOAGIANM73'].Items[1]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM73'].Items[1].Value"/>
          </div>
          <div style="flex-grow: 1;" class="mt-10" v-if="MASTERDATA['IPDOAGIANM73'].Items[2].Value">
            <FakeInput v-if="MASTERDATA['IPDOAGIANM73'].Items[3]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM73'].Items[3].Value"/>
          </div>
          <div style="flex-grow: 1;" class="mt-10" v-if="MASTERDATA['IPDOAGIANM73'].Items[4].Value">
            <FakeInput v-if="MASTERDATA['IPDOAGIANM73'].Items[5]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM73'].Items[5].Value"/>
          </div>
          <div style="flex-grow: 1;" class="mt-10" v-if="MASTERDATA['IPDOAGIANM73'].Items[6].Value">
            <FakeInput v-if="MASTERDATA['IPDOAGIANM73'].Items[7]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM73'].Items[7].Value"/>
          </div>
          <div style="flex-grow: 1;" class="mt-10" v-if="MASTERDATA['IPDOAGIANM73'].Items[8].Value">
            <FakeInput v-if="MASTERDATA['IPDOAGIANM73'].Items[9]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM73'].Items[9].Value"/>
          </div>
        </td>
      </tr>
      <!-- Giảm đau -->
      <tr v-if="MASTERDATA['IPDOAGIANM84']" style="pointer-events: none;">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM84'])}}</div></th>
        <td>
          <div class="flex-box flex-center" style="flex-flow: row wrap;">
            <template  v-for="(item, index) in MASTERDATA['IPDOAGIANM84'].Items" v-if="item.DataType === 'Checkbox'">
              <div :data="item" :key="index" class="flex-box flex-center">
                <div class="v-checkbox">
                  <input @click="item.Code === 'IPDOAGIANM84' && setIPDIAAUITV2('IPDOAGIANM84')" type="checkbox" :id="'IPDIAAUPSAScxo-' + index" v-model="item.Value">
                  <label :for="'IPDIAAUPSAScxo-' + index"></label>
                </div>
                <span class="displaytbl"><span :class="{'label-b': item.Code === 'IPDOAGIANM84'}">{{__label(item)}}</span></span>
                <!-- <input class="form-control mgl-5 w160" v-if="index === 5 && item.Value" v-model="MASTERDATA['IPDOAGIANM84'].Items[6].Value"/> -->
                <FakeInput class="ml-5" v-if="index === 5 && item.Value" v-model="MASTERDATA['IPDOAGIANM84'].Items[6].Value"/>
              </div>
            </template>
          </div>
        </td>
      </tr>
    </table>
    <!-- Block 2 -->
    <table class="table v-table-1 no-margin col-1-1" id="InitialAssessment-ForAdult-block2">
      <tr>
        <td colspan="2" class="no-padding">
          <div class="tbl-title">2. {{__t('Đánh giá trẻ sơ sinh')}}</div>
        </td>
      </tr>
      <!-- Thông tin chung -->
      <tr v-if="MASTERDATA['IPDOAGIANM92']">
        <th width="1">
          <div class="w160">
            <div class="mb-5 no-wrap">{{__label(MASTERDATA['IPDOAGIANM92'])}}</div>
          </div>
        </th>
        <td>
          <div v-if="MASTERDATA['A02_016_050919_VE__CHI_INFO']" class="flex-box flex-center mb10 mt-10">
            <!-- <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['A02_016_050919_VE__CHI_INFO'])}}: </label> -->
            <div class="xx-name">
              <MDCustomerInfo :readonly="true" v-model="MASTERDATA['A02_016_050919_VE__CHI_INFO']" />
            </div>
          </div>
          <div v-if="MASTERDATA['IPDOAGIANM92']" class="mb10 row flex-box flex-center">
            <!-- <div class="col-md-4">
              <label class="display-inline no-wrap">{{__label(MASTERDATA['IPDOAGIANM92'].Items[0])}}:</label>
              <br>
              <FakeInput v-if="MASTERDATA['IPDOAGIANM92'].Items[9]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM92'].Items[1].Value"/>
            </div>
            <div class="col-md-4">
              <div v-if="MASTERDATA['IPDOAGIANM92']" class="flex-box flex-center">
                <label class="display-inline no-wrap mr-5">{{__label(MASTERDATA['IPDOAGIANM92'].Items[2])}}:</label>
                <br>
                <div class="group-radio" style="pointer-events: none;">
                  <input type="radio" id="IPDOAGIANM96" :value="MASTERDATA['IPDOAGIANM92'].Items[4].EnName" v-model="MASTERDATA['IPDOAGIANM92'].Items[2].Value">
                  <label for="IPDOAGIANM96">{{__label(MASTERDATA['IPDOAGIANM92'].Items[3])}}</label>
                  <input type="radio" id="IPDOAGIANM97" :value="MASTERDATA['IPDOAGIANM92'].Items[5].EnName" v-model="MASTERDATA['IPDOAGIANM92'].Items[2].Value">
                  <label for="IPDOAGIANM97">{{__label(MASTERDATA['IPDOAGIANM92'].Items[4])}}</label>
                </div>
              </div>
            </div> -->
            <!-- Tuổi thai -->
            <!-- <div class="col-md-4">
              <label class="display-inline">{{__label(MASTERDATA['IPDOAGIANM92'].Items[5])}}:</label>
              <FakeInput v-if="MASTERDATA['IPDOAGIANM92'].Items[5]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM92'].Items[6].Value"/>
            </div> -->
          </div>
          <div v-if="MASTERDATA['IPDOAGIANM92']" class="mb10 row">
            <!-- Cân nặng -->
            <div class="col-md-3" v-if="MASTERDATA['IPDOAGIANM92']">
              <label class="display-inline">{{__label(MASTERDATA['IPDOAGIANM92'].Items[5])}}:</label>
              <FakeInput v-if="MASTERDATA['IPDOAGIANM92'].Items[5]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM92'].Items[6].Value"/>
            </div>
            <div class="col-md-3">
              <label class="display-inline no-wrap">{{__label(MASTERDATA['IPDOAGIANM92'].Items[7])}}:</label>
              <FakeInput v-if="MASTERDATA['IPDOAGIANM92'].Items[8]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM92'].Items[8].Value"/>
            </div>
            <!-- Chiều dài -->
            <div class="col-md-3">
              <label class="display-inline no-wrap">{{__label(MASTERDATA['IPDOAGIANM92'].Items[9])}}:</label>
              <FakeInput v-if="MASTERDATA['IPDOAGIANM92'].Items[10]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM92'].Items[10].Value"/>
            </div>
            <!-- Chu vi đầu -->
            <div class="col-md-3">
              <label class="display-inline no-wrap">{{__label(MASTERDATA['IPDOAGIANM92'].Items[11])}}:</label>
              <FakeInput v-if="MASTERDATA['IPDOAGIANM92'].Items[12]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM92'].Items[12].Value"/>
            </div>
          </div>
        </td>
      </tr>
      <!-- Hồi sức sơ sinh -->
      <tr v-if="MASTERDATA['IPDOAGIANM106']" class="resuscitation" style="pointer-events: none;">
        <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM106'])}}</div></th>
        <td>
          <!-- Hút dịch -->
          <div class="flex-box flex-center v-checkbox time">
            <input :id="MASTERDATA['IPDOAGIANM106'].Items[0].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[0].Value">
            <label :for="MASTERDATA['IPDOAGIANM106'].Items[0].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[0])}}</label>
            <FakeInput v-if="MASTERDATA['IPDOAGIANM106'].Items[0].Value" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM106'].Items[21].Value"/>
          </div>
          <!-- Oxygen -->
          <div class="flex-box flex-center v-checkbox time">
            <input :id="MASTERDATA['IPDOAGIANM106'].Items[1].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[1].Value">
            <label :for="MASTERDATA['IPDOAGIANM106'].Items[1].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[1])}}</label>
            <FakeInput v-if="MASTERDATA['IPDOAGIANM106'].Items[1].Value" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM106'].Items[22].Value"/>
          </div>
          <div>
            <!-- Bóp bóng -->
            <div class="flex-box flex-center v-checkbox time">
              <input :id="MASTERDATA['IPDOAGIANM106'].Items[2].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[2].Value">
              <label :for="MASTERDATA['IPDOAGIANM106'].Items[2].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[2])}}</label>
              <div style="transform: translateX(-22px)" class="flex-box flex-center" v-if="MASTERDATA['IPDOAGIANM106'].Items[2].Value">
                <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[3])}}</label>
                <FakeInput style="margin: 0" v-model="MASTERDATA['IPDOAGIANM106'].Items[4].Value"/>
                <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[5])}}</label>
                <FakeInput style="margin: 0" v-model="MASTERDATA['IPDOAGIANM106'].Items[6].Value"/>
              </div>
            </div>
            <!-- NKQ -->
            <div class="flex-box flex-center v-checkbox time">
              <input :id="MASTERDATA['IPDOAGIANM106'].Items[7].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[7].Value">
              <label :for="MASTERDATA['IPDOAGIANM106'].Items[7].Code" class="display-inline no-wrap w140" style="display: flex; align-items: center">{{__label(MASTERDATA['IPDOAGIANM106'].Items[7])}}</label>
              <div style="transform: translateX(-22px)" class="flex-box flex-center" v-if="MASTERDATA['IPDOAGIANM106'].Items[7].Value">
                <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[8])}}</label>
                <FakeInput style="margin: 0" v-model="MASTERDATA['IPDOAGIANM106'].Items[9].Value"/>
                <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[10])}}</label>
                <FakeInput style="margin: 0" v-model="MASTERDATA['IPDOAGIANM106'].Items[11].Value"/>
              </div>
            </div>
            <!-- Ép tim -->
            <div class="flex-box flex-center v-checkbox time">
              <input :id="MASTERDATA['IPDOAGIANM106'].Items[12].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[12].Value">
              <label :for="MASTERDATA['IPDOAGIANM106'].Items[12].Code" class="display-inline no-wrap w140" style="display: flex; align-items: center">{{__label(MASTERDATA['IPDOAGIANM106'].Items[12])}}</label>
              <div style="transform: translateX(-22px)" class="flex-box flex-center" v-if="MASTERDATA['IPDOAGIANM106'].Items[12].Value">
                <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[13])}}</label>
                <FakeInput style="margin: 0" v-model="MASTERDATA['IPDOAGIANM106'].Items[14].Value"/>
                <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[15])}}</label>
                <FakeInput style="margin: 0" v-model="MASTERDATA['IPDOAGIANM106'].Items[16].Value"/>
              </div>
            </div>
            <!-- Thuốc (liều) -->
            <div class="flex-box flex-center v-checkbox">
              <input :id="MASTERDATA['IPDOAGIANM106'].Items[17].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[17].Value">
              <label style="font-weight: bold" :for="MASTERDATA['IPDOAGIANM106'].Items[17].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[17])}}</label>
              <FakeInput v-if="MASTERDATA['IPDOAGIANM106'].Items[17].Value" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM106'].Items[18].Value"/>
            </div>
            <!-- Khác -->
            <div class="flex-box flex-center v-checkbox">
              <input :id="MASTERDATA['IPDOAGIANM106'].Items[19].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[19].Value">
              <label style="font-weight: bold" :for="MASTERDATA['IPDOAGIANM106'].Items[19].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[19])}}</label>
              <FakeInput v-if="MASTERDATA['IPDOAGIANM106'].Items[19].Value" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM106'].Items[20].Value"/>
            </div>
          </div>
        </td>
      </tr>
      <!-- Tình trạng sơ sinh -->
      <tr v-if="MASTERDATA['IPDOAGIANM128']" class="CAB">
        <th width="1">
          <div class="w160">{{__t('Tình trạng sơ sinh')}}</div>
          <DropApgar class="mt-10" />
        </th>
        <td>
          <!-- Nhịp thở đầu tiên -->
          <div class="flex-box flex-center mb-10">
            <label class="display-inline no-wrap mr-5">{{__label(MASTERDATA['IPDOAGIANM128'].Items[0])}}:</label>
            <FakeInput v-if="MASTERDATA['IPDOAGIANM128'].Items[1]" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM128'].Items[1].Value"/>
          </div>
          <!-- Hỗ trợ hô hấp -->
          <div class="flex-box flex-center v-checkbox" style="pointer-events: none">
            <input :id="MASTERDATA['IPDOAGIANM128'].Items[2].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM128'].Items[2].Value">
            <label :for="MASTERDATA['IPDOAGIANM128'].Items[2].Code" class="display-inline no-wrap">{{__label(MASTERDATA['IPDOAGIANM128'].Items[2])}}:</label>
            <FakeInput v-if="MASTERDATA['IPDOAGIANM128'].Items[2].Value" style="margin: 0" v-model="MASTERDATA['IPDOAGIANM128'].Items[3].Value"/>
          </div>
          <!-- Vitamin K -->
          <div class="flex-box flex-center mb-10">
            <label style="margin: 0; transform: translateY(5px);" class="display-inline no-wrap mr-5">{{__label(MASTERDATA['IPDOAGIANM128'].Items[4])}}:</label>
            <!-- Tiêm bắp -->
            <div class="v-checkbox" style="pointer-events: none">
              <input :id="MASTERDATA['IPDOAGIANM128'].Items[5].Code" type="checkbox" v-model="MASTERDATA['IPDOAGIANM128'].Items[5].Value">
              <label style="font-weight: normal" :for="MASTERDATA['IPDOAGIANM128'].Items[5].Code" class="displaytbl">{{__label(MASTERDATA['IPDOAGIANM128'].Items[5])}}</label>
            </div>
          </div>
          <!-- Bảng chỉ số Apgar -->
          <div v-if="MASTERDATA && DataSubmit">
            <ApgarTable ref="ApgarTable" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA['IPDOAGIANM209'].Items[0].Value" :readonly="readonly" :viewonly="viewonly"/>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import ApgarTable from '@/components/IPD/ForNeonatalMaternity/ApgarTable'
import DropApgar from '@/pages/IPD/MedicalRecord/Page2CPN/DropApgar'
import MDCustomerInfo from '@/components/global/MDCustomerInfo.vue'
export default {
  name: 'ViewOnly',
  components: {
    ApgarTable, DropApgar, MDCustomerInfo
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    viewonly: {
      type: Boolean,
      default: false
    },
    MASTERDATA: {
      type: Object,
      default: () => {}
    },
    DataSubmit: {
      type: Object,
      default: () => {}
    },
    arrivalTime: {
      type: String,
      default: ''
    },
    CreatedAt: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang='stylus' scoped>
>>>.el-radio-view {
  margin: 0 !important;
}
>>>.el-radio-view.disable {
  margin: 0 !important;
}
.d-none {
  display: none;
}
.resuscitation .v-checkbox input[type=checkbox] + label:before {
  margin-left: 0;
  margin-right: 5px;
}
.resuscitation label {
  margin-bottom: 0;
}
.resuscitation .flex-box.flex-center.time label {
  display: flex;
  align-items: center;
  font-weight: bold;
}
.CAB .v-checkbox input[type=checkbox] + label:before {
  margin-left: 0;
  margin-right: 5px;
  transform: translateY(5px);
}
.search-name {
  width: 300px;
}
.analgesia-anaesthesia:not(:last-child) {
  flex-grow: 1;
}
.v-checkbox input[type=checkbox] + label {
  text-align: left !important;
}
.detail-table td {
  background-color: #F5F5F5;
}
.v-table-1 th {
  text-align: left;
}
</style>
