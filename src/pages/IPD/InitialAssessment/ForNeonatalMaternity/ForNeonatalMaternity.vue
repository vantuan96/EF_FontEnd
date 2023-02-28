<template>
  <div>
    <div v-if="loaded">
      <template v-if="DataSubmit.Datas">
        <div v-if="readonly || viewonly">
          <ViewOnly :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :arrivalTime="arrivalTime" :CreatedAt="CreatedAt" :readonly="readonly" :viewonly="viewonly" :VisitId="VisitId"/>
        </div>
        <div v-else>
          <!-- <div v-if="MASTERDATA['A02_016_050919_VE__CHI_INFO']" class="flex-box flex-center mb10 mt-10">
            <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['A02_016_050919_VE__CHI_INFO'])}}: </label>
            <div class="xxx-name">
              <MDCustomerInfo v-model="MASTERDATA['A02_016_050919_VE__CHI_INFO']" />
            </div>
          </div> -->
          <!-- Bác sĩ sản khoa -->
          <div v-if="MASTERDATA['IPDOAGIANM1']" class="flex-box flex-center mb10 mt-10">
            <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM1'])}}: </label>
            <div class="search-name">
              <UsersSelect2 :readonly="DataSubmit.IsLocked" v-model="MASTERDATA['IPDOAGIANM1'].Items[0].Value" />
            </div>
          </div>
          <!-- Bác sĩ sơ sinh -->
          <div v-if="MASTERDATA['IPDOAGIANM3']" class="flex-box flex-center mb10">
            <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM3'])}}:</label>
            <div class="search-name">
              <UsersSelect2 :readonly="DataSubmit.IsLocked" v-model="MASTERDATA['IPDOAGIANM3'].Items[0].Value" />
            </div>
          </div>
          <!-- Nữ hộ sinh -->
          <div v-if="MASTERDATA['IPDOAGIANM5']" class="flex-box flex-center mb10">
            <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM5'])}}:</label>
            <div class="search-name">
              <UsersSelect2 :readonly="DataSubmit.IsLocked" v-model="MASTERDATA['IPDOAGIANM5'].Items[0].Value" />
            </div>
          </div>
          <!-- Giờ vào khoa của trẻ -->
          <div v-if="MASTERDATA['IPDOAGIANM226']" class="flex-box flex-center mb10">
            <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM226'])}}:</label>
            <VDatePicker
                :hideTooltip="false"
                class="w1510 display-inline"
                :format="'HH:mm DD/MM/YYYY'"
                v-model="arrivalTime"
            />
          </div>
          <div v-if="MASTERDATA['IPDOAGIANM7']" class="flex-box flex-center mb10">
            <!-- Thời gian đánh giá -->
            <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['IPDOAGIANM7'])}}:</label>
              <VDatePicker
                :hideTooltip="false"
                class="w1510 display-inline"
                :format="'HH:mm DD/MM/YYYY'"
                v-model="CreatedAt"
              />
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
                <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM9'].Items[0].Value"/>
              </td>
            </tr>
            <!-- Tiền sử mang thai trước -->
            <tr v-if="MASTERDATA['IPDOAGIANM217']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM11'])}}</div></th>
              <td>
                <div v-if="syncPara" class="flex-box flex-center mb-10">
                  <div class="font-nomal-text mr-5">Thông tin Para được khai thác gần nhất lúc {{ParaUpdateAt}} bởi <ad-Info :ad="ParaUpdateBy"/> là {{syncListPara}}</div>
                  <button type="button" class="btn v-yellow-btn" @click="copy()">{{__t('Sao chép')}}</button>
                </div>
                <div class="flex-box flex-center">
                  <div>
                    <div class="flex-box flex-center mb-5">
                      <input style="width: 180px" class="form-control" v-model="MASTERDATA['IPDOAGIANM217'].Items[1].Value" :placeholder="__t('Nhập')"/>
                      <label class="display-inline font-nomal-text ml-20 w140" style="margin-bottom: 0">{{__label(MASTERDATA['IPDOAGIANM217'].Items[0])}}</label>
                    </div>
                    <div class="flex-box flex-center mb-5">
                      <input style="width: 180px" class="form-control" v-model="MASTERDATA['IPDOAGIANM217'].Items[3].Value" :placeholder="__t('Nhập')"/>
                      <label class="display-inline font-nomal-text ml-20 w140" style="margin-bottom: 0">{{__label(MASTERDATA['IPDOAGIANM217'].Items[2])}}</label>
                    </div>
                    <div class="flex-box flex-center mb-5">
                      <input style="width: 180px" class="form-control" v-model="MASTERDATA['IPDOAGIANM217'].Items[5].Value" :placeholder="__t('Nhập')"/>
                      <label class="display-inline font-nomal-text ml-20 w140" style="margin-bottom: 0">{{__label(MASTERDATA['IPDOAGIANM217'].Items[4])}}</label>
                    </div>
                    <div class="flex-box flex-center mb-10">
                      <input style="width: 180px" class="form-control" v-model="MASTERDATA['IPDOAGIANM217'].Items[7].Value" :placeholder="__t('Nhập')"/>
                      <label class="display-inline font-nomal-text ml-20 w140" style="margin-bottom: 0">{{__label(MASTERDATA['IPDOAGIANM217'].Items[6])}}</label>
                    </div>
                  </div>
                </div>
                <table style="width: 98%; transform: translateX(2%)" class="table v-table-1 no-margin">
                  <tr>
                    <th width="15%" class="no-wrap text-center">{{__label(MASTERDATA['IPDOAGIANM11'].Items[1])}}</th>
                    <th width="85%" class="no-wrap text-center">{{__label(MASTERDATA['IPDOAGIANM11'].Items[3])}}</th>
                  </tr>
                  <tr v-for="(item, index) in MASTERDATA['IPDOAGIANM205'].Items[0].Value" :key="index">
                    <td class="text-center" style="position: relative">
                      <button class="btn-pos-left" @click="deleteRowDelivery(index)"><i aria-hidden="true" class="fa fa-trash"></i></button>
                      <VNumberInput v-model="item.Year"/>
                    </td>
                    <td><textarea-autosize v-model="item.Name" rows="1" class="form-control" :placeholder="__t('Nhập')"/></td>
                  </tr>
                </table>
                <div class="text-center"><button @click="addRowDelivery()" class="btn v-green-btn v-bottom-btn"><i aria-hidden="true" class="fa fa-plus"></i> {{__t('Thêm mới')}}</button></div>
              </td>
            </tr>
            <!-- Nhóm máu -->
            <tr v-if="MASTERDATA['IPDOAGIANM17']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM17'])}}</div></th>
              <td>
                <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM17'].Items[0].Value"/>
              </td>
            </tr>
            <!-- Kháng thể -->
            <tr v-if="MASTERDATA['IPDOAGIANM19']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM19'])}}</div></th>
              <td>
                <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM19'].Items[0].Value"/>
              </td>
            </tr>
            <!-- NDKL -->
            <tr v-if="MASTERDATA['IPDOAGIANM21']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM21'])}}</div></th>
              <td>
                <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM21'].Items[0].Value"/>
              </td>
            </tr>
            <!-- Viêm gan B/C -->
            <tr v-if="MASTERDATA['IPDOAGIANM23']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM23'])}}</div></th>
              <td>
                <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM23'].Items[0].Value"/>
              </td>
            </tr>
            <!-- HIV -->
            <tr v-if="MASTERDATA['IPDOAGIANM25']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM25'])}}</div></th>
              <td>
                <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM25'].Items[0].Value"/>
              </td>
            </tr>
            <!-- Thai kỳ hiện tại -->
            <tr v-if="MASTERDATA['IPDOAGIANM27']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM27'])}}</div></th>
              <td>
                <!-- LMP -->
                <div v-if="MASTERDATA['IPDOAGIANM28']" class="flex-box flex-center mb10">
                  <label class="w-100 display-inline">{{__label(MASTERDATA['IPDOAGIANM28'])}}:</label>
                  <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM28'].Items[0].Value"/>
                </div>
                <!-- EDD -->
                <div v-if="MASTERDATA['IPDOAGIANM30']" class="flex-box flex-center mb10">
                  <label class="w-100 display-inline">{{__label(MASTERDATA['IPDOAGIANM30'])}}:</label>
                  <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM30'].Items[0].Value"/>
                </div>
                <!-- Thuốc -->
                <div v-if="MASTERDATA['IPDOAGIANM32']" class="flex-box flex-center mb10">
                  <label class="w-100 display-inline">{{__label(MASTERDATA['IPDOAGIANM32'])}}</label>
                  <textarea-autosize rows="5" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM32'].Items[0].Value"/>
                </div>
                  <!-- Celestone -->
                <div v-if="MASTERDATA['IPDOAGIANM34']" class="flex-box flex-center mb10">
                  <label class="w-100 display-inline">{{__label(MASTERDATA['IPDOAGIANM34'])}}</label>
                  <td style="border: none">
                    <MDRadio v-if="MASTERDATA['IPDOAGIANM34']" v-model="MASTERDATA['IPDOAGIANM34']"/>
                  </td>
                </div>
                <!-- GBS -->
                <div v-if="MASTERDATA['IPDOAGIANM38']" class="flex-box flex-center mb10">
                  <label class="w-100 display-inline">{{__label(MASTERDATA['IPDOAGIANM38'])}}:</label>
                  <td style="border: none">
                    <MDRadio v-if="MASTERDATA['IPDOAGIANM38']" v-model="MASTERDATA['IPDOAGIANM38']"/>
                  </td>
                </div>
                <!-- HVS -->
                <div v-if="MASTERDATA['IPDOAGIANM42']" class="flex-box flex-center mb10">
                  <label class="w-100 display-inline">{{__label(MASTERDATA['IPDOAGIANM42'])}}:</label>
                  <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM42'].Items[0].Value"/>
                </div>
                <!-- Các biến chứng sau thai kỳ -->
                <div v-if="MASTERDATA['IPDOAGIANM44']" class="mb10">
                  <label class="display-inline">{{__label(MASTERDATA['IPDOAGIANM44'])}}:</label>
                  <textarea-autosize rows="3" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM44'].Items[0].Value"/>
                </div>
              </td>
            </tr>
            <!-- Chuyển dạ -->
            <tr v-if="MASTERDATA['IPDOAGIANM46']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM46'])}}</div></th>
              <td>
              <div class="flex-box flex-center mb-10" style="align-items: center">
                <MDRadio @onChange="setIPDIAAUITV2('IPDOAGIANM46')" v-if="MASTERDATA['IPDOAGIANM46']" v-model="MASTERDATA['IPDOAGIANM46']"/>
                <div style="flex-grow: 1;" v-if="MASTERDATA['IPDOAGIANM46'].Items[2].Value">
                  <textarea-autosize rows="1" :placeholder="__t('Nhập')" class="form-control mgl-5" v-model="MASTERDATA['IPDOAGIANM46'].Items[3].Value" />
                </div>
              </div>
                <!-- Vỡ ối (thời gian) -->
                <div class="flex-box flex-center mb-10" style="align-items: center">
                  <div class="flex-box flex-center mr-20">
                    <label style="width: 120px" class="display-inline">{{__label(MASTERDATA['IPDOAGIANM51'])}}:</label>
                    <v-date-picker :hideTooltip="true" class="w1510 display-inline" :format="'HH:mm DD/MM/YYYY'" v-model="MASTERDATA['IPDOAGIANM51'].Items[0].Value"/>
                  </div>
                  <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['IPDOAGIANM51'].Items">
                    <div class="flex-box flex-center" :class="{'d-none': index === 0}">
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
                  <label class="display-inline w160 mr-5">{{__label(MASTERDATA['IPDOAGIANM55'])}}:</label>
                  <MDRadio v-if="MASTERDATA['IPDOAGIANM55']" v-model="MASTERDATA['IPDOAGIANM55']"/>
                </div>
                <div class="flex-box flex-center mb10" v-if="MASTERDATA['IPDOAGIANM55'].Items[0].Value">
                  <label class="display-inline w160 mr-5 no-wrap" style="font-weight: normal">{{__label(MASTERDATA['IPDOAGIANM55'].Items[2])}}:</label>
                  <textarea-autosize rows="1" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['IPDOAGIANM55'].Items[3].Value" />
                </div>
                <!-- CTG -->
                <div class="flex-box flex-center mb-10">
                  <label class="display-inline w160">{{__label(MASTERDATA['IPDOAGIANM60'])}}:</label>
                  <MDRadio v-if="MASTERDATA['IPDOAGIANM60']" v-model="MASTERDATA['IPDOAGIANM60']"/>
                </div>
                <!-- Nghi ngờ suy thai -->
                <div v-if="MASTERDATA['IPDOAGIANM63']" class="flex-box flex-center mb10">
                  <label class="display-inline w160">{{__label(MASTERDATA['IPDOAGIANM63'])}}:</label>
                  <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM63'].Items[0].Value"/>
                </div>
                <!-- Thời gian chuyển dạ -->
                <label class="display-inline">{{__label(MASTERDATA['IPDOAGIANM65'])}}:</label>
                <table style="width: 98%; transform: translateX(2%)" class="table v-table-1 no-margin">
                  <tr>
                    <th width="10%" class="no-wrap text-center">{{__label(MASTERDATA['IPDOAGIANM65'].Items[0])}}</th>
                    <th width="90%" class="no-wrap text-center">{{__label(MASTERDATA['IPDOAGIANM65'].Items[1])}}</th>
                  </tr>
                  <tr v-for="(item, index) in MASTERDATA['IPDOAGIANM207'].Items[0].Value" :key="index">
                    <td class="text-center" style="position: relative">
                      <button class="btn-pos-left" @click="deleteRowLabours(index)"><i aria-hidden="true" class="fa fa-trash"></i></button>
                      <span>
                        {{item.Stage}}
                      </span>
                      </td>
                    <td><textarea-autosize v-model="item.Content" rows="1" class="form-control" :placeholder="__t('Nhập')"/></td>
                  </tr>
                </table>
                <div class="text-center"><button @click="addRowLabours()" class="btn v-green-btn v-bottom-btn"><i aria-hidden="true" class="fa fa-plus"></i> {{__t('Thêm mới')}}</button></div>
              </td>
            </tr>
            <!-- Ngôi thai -->
            <tr v-if="MASTERDATA['IPDOAGIANM68']">
              <th>{{__label(MASTERDATA['IPDOAGIANM68'])}}</th>
              <td>
                <div class="flex-box flex-center">
                  <div>
                    <MDRadio v-if="MASTERDATA['IPDOAGIANM68']" v-model="MASTERDATA['IPDOAGIANM68']"/>
                  </div>
                  <div style="flex-grow: 1;" class="ml-10" v-if="MASTERDATA['IPDOAGIANM68'].Items[2].Value">
                    <textarea-autosize class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM68'].Items[3].Value"/>
                  </div>
                </div>
              </td>
            </tr>
            <!-- Kiểu sinh -->
            <tr v-if="MASTERDATA['IPDOAGIANM73']">
              <th>{{__label(MASTERDATA['IPDOAGIANM73'])}}</th>
              <td>
                <div>
                  <MDRadio v-if="MASTERDATA['IPDOAGIANM73']" v-model="MASTERDATA['IPDOAGIANM73']"/>
                </div>
                <div style="flex-grow: 1;" class="mt-10" v-if="MASTERDATA['IPDOAGIANM73'].Items[0].Value">
                    <textarea-autosize class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM73'].Items[1].Value"/>
                </div>
                <div style="flex-grow: 1;" class="mt-10" v-if="MASTERDATA['IPDOAGIANM73'].Items[2].Value">
                    <textarea-autosize class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM73'].Items[3].Value"/>
                </div>
                <div style="flex-grow: 1;" class="mt-10" v-if="MASTERDATA['IPDOAGIANM73'].Items[4].Value">
                    <textarea-autosize class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM73'].Items[5].Value"/>
                </div>
                <div style="flex-grow: 1;" class="mt-10" v-if="MASTERDATA['IPDOAGIANM73'].Items[6].Value">
                    <textarea-autosize class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM73'].Items[7].Value"/>
                </div>
                <div style="flex-grow: 1;" class="mt-10" v-if="MASTERDATA['IPDOAGIANM73'].Items[8].Value">
                    <textarea-autosize class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM73'].Items[9].Value"/>
                </div>
              </td>
            </tr>
            <!-- Giảm đau -->
            <tr v-if="MASTERDATA['IPDOAGIANM84']">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM84'])}}</div></th>
              <td>
                <div class="flex-box flex-center" style="flex-flow: row wrap;">
                  <template v-for="(item, index) in MASTERDATA['IPDOAGIANM84'].Items" v-if="item.DataType === 'Checkbox'">
                    <div :data="item" :key="index" class="flex-box flex-center analgesia-anaesthesia mr-10">
                      <div class="v-checkbox">
                        <input @click="item.Code === 'IPDOAGIANM84' && setIPDIAAUITV2('IPDOAGIANM84')" type="checkbox" :id="'IPDIAAUPSAScxo-' + index" v-model="item.Value">
                        <label :for="'IPDIAAUPSAScxo-' + index"></label>
                      </div>
                      <span class="displaytbl"><span :class="{'label-b': item.Code === 'IPDOAGIANM84'}">{{__label(item)}}</span></span>
                      <input class="form-control mgl-5 w160" v-if="index === 5 && item.Value" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM84'].Items[6].Value"/>
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
                <div v-if="MASTERDATA['A02_016_050919_VE__CHI_INFO']" class="mb10 mt-10">
                  <!-- <div class="display-inline mr-5 w140" style="font-weight: bold">{{__label(MASTERDATA['A02_016_050919_VE__CHI_INFO'])}}: </div> -->
                  <div class="xxx-name flex-box flex-center">
                    <MDCustomerInfo v-model="MASTERDATA['A02_016_050919_VE__CHI_INFO']" />
                  </div>
                </div>
                <div v-if="MASTERDATA['IPDOAGIANM92']" class="mb10 row flex-box flex-center">
                  <!-- Sinh ngày -->
                  <!-- <div class="col-md-4">
                    <label class="display-inline no-wrap">{{__label(MASTERDATA['IPDOAGIANM92'].Items[0])}}:</label>
                    <br>
                    <v-date-picker style="margin-top: 0" :hideTooltip="true" class="w1510 display-inline mt-10" :format="'HH:mm DD/MM/YYYY'" v-model="MASTERDATA['IPDOAGIANM92'].Items[1].Value"/>
                  </div>
                  <div class="col-md-4">
                    <div v-if="MASTERDATA['IPDOAGIANM92']" class="flex-box flex-center">
                      <label class="display-inline no-wrap mr-5">{{__label(MASTERDATA['IPDOAGIANM92'].Items[2])}}:</label>
                      <br>
                      <div class="group-radio">
                        <input type="radio" id="IPDOAGIANM96" :value="MASTERDATA['IPDOAGIANM92'].Items[4].EnName" v-model="MASTERDATA['IPDOAGIANM92'].Items[2].Value">
                        <label for="IPDOAGIANM96">{{__label(MASTERDATA['IPDOAGIANM92'].Items[3])}}</label>
                        <input type="radio" id="IPDOAGIANM97" :value="MASTERDATA['IPDOAGIANM92'].Items[5].EnName" v-model="MASTERDATA['IPDOAGIANM92'].Items[2].Value">
                        <label for="IPDOAGIANM97">{{__label(MASTERDATA['IPDOAGIANM92'].Items[4])}}</label>
                      </div>
                    </div>
                  </div> -->
                </div>
                <div v-if="MASTERDATA['IPDOAGIANM92']" class="mb10 row">
                  <!-- Tuổi thai -->
                  <div class="col-md-3" v-if="MASTERDATA['IPDOAGIANM92']">
                    <label class="display-inline">{{__label(MASTERDATA['IPDOAGIANM92'].Items[5])}}:</label>
                    <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM92'].Items[6].Value"/>
                  </div>
                  <!-- Cân nặng -->
                  <div class="col-md-3">
                    <label class="display-inline no-wrap">{{__label(MASTERDATA['IPDOAGIANM92'].Items[7])}}:</label>
                    <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM92'].Items[8].Value"/>
                  </div>
                  <!-- Chiều dài -->
                  <div class="col-md-3">
                    <label class="display-inline no-wrap">{{__label(MASTERDATA['IPDOAGIANM92'].Items[9])}}:</label>
                    <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM92'].Items[10].Value"/>
                  </div>
                  <!-- Chu vi đầu -->
                  <div class="col-md-3">
                    <label class="display-inline no-wrap">{{__label(MASTERDATA['IPDOAGIANM92'].Items[11])}}:</label>
                    <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM92'].Items[12].Value"/>
                  </div>
                </div>
              </td>
            </tr>
            <!-- Hồi sức sơ sinh -->
            <tr v-if="MASTERDATA['IPDOAGIANM106']" class="resuscitation">
              <th width="1"><div class="w160">{{__label(MASTERDATA['IPDOAGIANM106'])}}</div></th>
              <td>
                <!-- Hút dịch -->
                <div class="flex-box flex-center v-checkbox">
                  <input :id="MASTERDATA['IPDOAGIANM106'].Items[0].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[0].Value">
                  <label :for="MASTERDATA['IPDOAGIANM106'].Items[0].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[0])}}</label>
                  <textarea-autosize v-if="MASTERDATA['IPDOAGIANM106'].Items[0].Value" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM106'].Items[21].Value"/>
                </div>
                <!-- Oxygen -->
                <div class="flex-box flex-center v-checkbox">
                  <input :id="MASTERDATA['IPDOAGIANM106'].Items[1].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[1].Value">
                  <label :for="MASTERDATA['IPDOAGIANM106'].Items[1].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[1])}}</label>
                  <textarea-autosize v-if="MASTERDATA['IPDOAGIANM106'].Items[1].Value" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM106'].Items[22].Value"/>
                </div>
                <div>
                  <!-- Bóp bóng -->
                  <div class="flex-box flex-center v-checkbox time">
                    <input :id="MASTERDATA['IPDOAGIANM106'].Items[2].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[2].Value">
                    <label style="font-weight: normal" :for="MASTERDATA['IPDOAGIANM106'].Items[2].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[2])}}</label>
                    <div style="transform: translateX(-22px);" class="flex-box flex-center" v-if="MASTERDATA['IPDOAGIANM106'].Items[2].Value">
                      <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[3])}}</label>
                      <v-masked-input placeholder="hh:mm" mask="11:11" class="form-control w160" v-model="MASTERDATA['IPDOAGIANM106'].Items[4].Value"/>
                      <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[5])}}</label>
                      <v-masked-input placeholder="hh:mm" mask="11:11" class="form-control w160" v-model="MASTERDATA['IPDOAGIANM106'].Items[6].Value"/>
                    </div>
                  </div>
                  <!-- NKQ -->
                  <div class="flex-box flex-center v-checkbox time">
                    <input :id="MASTERDATA['IPDOAGIANM106'].Items[7].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[7].Value">
                    <label :for="MASTERDATA['IPDOAGIANM106'].Items[7].Code" class="display-inline no-wrap w140" style="display: flex; align-items: center; font-weight: normal">{{__label(MASTERDATA['IPDOAGIANM106'].Items[7])}}</label>
                    <div style="transform: translateX(-22px);" class="flex-box flex-center" v-if="MASTERDATA['IPDOAGIANM106'].Items[7].Value">
                      <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[8])}}</label>
                      <v-masked-input placeholder="hh:mm" mask="11:11" class="form-control w160" v-model="MASTERDATA['IPDOAGIANM106'].Items[9].Value"/>
                      <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[10])}}</label>
                      <v-masked-input placeholder="hh:mm" mask="11:11" class="form-control w160" v-model="MASTERDATA['IPDOAGIANM106'].Items[11].Value"/>
                    </div>
                  </div>
                  <!-- Ép tim -->
                  <div class="flex-box flex-center v-checkbox time">
                    <input :id="MASTERDATA['IPDOAGIANM106'].Items[12].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[12].Value">
                    <label :for="MASTERDATA['IPDOAGIANM106'].Items[12].Code" class="display-inline no-wrap w140" style="display: flex; align-items: center; font-weight: normal">{{__label(MASTERDATA['IPDOAGIANM106'].Items[12])}}</label>
                    <div style="transform: translateX(-22px);" class="flex-box flex-center" v-if="MASTERDATA['IPDOAGIANM106'].Items[12].Value">
                      <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[13])}}</label>
                      <v-masked-input placeholder="hh:mm" mask="11:11" class="form-control w160" v-model="MASTERDATA['IPDOAGIANM106'].Items[14].Value"/>
                      <label style="font-weight: normal" class="display-inline mr-5 ml-5">{{__label(MASTERDATA['IPDOAGIANM106'].Items[15])}}</label>
                      <v-masked-input placeholder="hh:mm" mask="11:11" class="form-control w160" v-model="MASTERDATA['IPDOAGIANM106'].Items[16].Value"/>
                    </div>
                  </div>
                  <!-- Thuốc (liều) -->
                  <div class="flex-box flex-center v-checkbox">
                    <input :id="MASTERDATA['IPDOAGIANM106'].Items[17].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[17].Value">
                    <label :for="MASTERDATA['IPDOAGIANM106'].Items[17].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[17])}}</label>
                    <textarea-autosize v-if="MASTERDATA['IPDOAGIANM106'].Items[17].Value" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM106'].Items[18].Value"/>
                  </div>
                  <!-- Khác -->
                  <div class="flex-box flex-center v-checkbox">
                    <input :id="MASTERDATA['IPDOAGIANM106'].Items[19].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM106'].Items[19].Value">
                    <label :for="MASTERDATA['IPDOAGIANM106'].Items[19].Code" class="display-inline no-wrap w140">{{__label(MASTERDATA['IPDOAGIANM106'].Items[19])}}</label>
                    <textarea-autosize v-if="MASTERDATA['IPDOAGIANM106'].Items[19].Value" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM106'].Items[20].Value"/>
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
                  <textarea-autosize rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM128'].Items[1].Value"/>
                </div>
                <!-- Hỗ trợ hô hấp -->
                <div class="flex-box flex-center v-checkbox">
                  <input :id="MASTERDATA['IPDOAGIANM128'].Items[2].Code" type="checkbox" class="mr-5" v-model="MASTERDATA['IPDOAGIANM128'].Items[2].Value">
                  <label :for="MASTERDATA['IPDOAGIANM128'].Items[2].Code" class="display-inline no-wrap">{{__label(MASTERDATA['IPDOAGIANM128'].Items[2])}}:</label>
                  <textarea-autosize v-if="MASTERDATA['IPDOAGIANM128'].Items[2].Value" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDOAGIANM128'].Items[3].Value"/>
                </div>
                <!-- Vitamin K -->
                <div class="flex-box flex-center mb-10">
                  <label style="margin: 0; transform: translateY(5px);" class="display-inline no-wrap mr-5">{{__label(MASTERDATA['IPDOAGIANM128'].Items[4])}}:</label>
                  <!-- Tiêm bắp -->
                  <div class="v-checkbox">
                    <input :id="MASTERDATA['IPDOAGIANM128'].Items[5].Code" type="checkbox" v-model="MASTERDATA['IPDOAGIANM128'].Items[5].Value">
                    <label style="font-weight: normal" :for="MASTERDATA['IPDOAGIANM128'].Items[5].Code" class="displaytbl">{{__label(MASTERDATA['IPDOAGIANM128'].Items[5])}}</label>
                  </div>
                </div>
                <!-- <span class="fake-input disable bl-input" v-if="isReadonly = true">{{MASTERDATA['EIOCRRFTIFO'].Items[0].Value || 'N/A'}}</span> -->
                <!-- Bảng chỉ số Apgar -->
                <div v-if="MASTERDATA && DataSubmit">
                  <ApgarTable ref="ApgarTable" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA['IPDOAGIANM209'].Items[0].Value" :readonly="readonly" :viewonly="viewonly"/>
                </div>
              </td>
            </tr>
          </table>
        </div>
      <br/><br/><br/>
      <div class="row">
        <div class="col-md-6 col-sm-6 text-center">
        </div>
        <div class="col-md-6 col-sm-6 text-center">
        </div>
      </div>
      <br/>
      <br/>
      <div class="ml-5" >
        <p>A02_016_050919_VE</p>
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit" :ad="DataSubmit.UpdateBy" /> {{__t('lúc')}} {{ UpdatedAt }}</p>
      </div>
      <br/>
      <br/>
      <div v-if="!viewonly">
        <FloatBlock v-if="!readonly">
          <template slot="top" v-if="synced">
            <div style="color: #fff; text-align: right">
              <b>Dữ liệu được đồng bộ từ khoa:</b> {{__t(specialty.ViName)}}
            </div>
          </template>
          <template slot='buttons'>
            <div class="col-md-2 col-sm-2">
            </div>
            <div class="col-md-2">
              <div class="form-group1">
                <p class="hidden-text">hidden-text</p>
              </div>
            </div>
            <div class="col-md-3">
              <!-- <div class="form-group1">
                <button class="btn pull-right btn-block" type="button" @click="$router.push({name: 'IPDFallRiskAssessment', params: {Id: $route.params.Id}})">{{__t('Đánh giá nguy cơ ngã')}}</button>
              </div> -->
            </div>
            <div class="col-md-5">
              <div class="form-group1">
                <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </div>
      </template>
      <div v-else style="padding: 20px;">
        <div class="text-center">
          <p>{{__t('Chưa có đánh giá ban đầu cho trẻ vừa sinh')}}</p>
          <div v-if="!viewonly">
            <button v-if="!IsLocked" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VDatePicker from '@/components/VDateTimePicker.vue'
import MixinMasterData from '@/mixins/masterdata.js'
// import MixinForm from '@/mixins/form.js'
import UsersSelect2 from '@/components/UsersSelect2.vue'
// import FormMixin from '../Mixi.js'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import DropApgar from '@/pages/IPD/MedicalRecord/Page2CPN/DropApgar'
import Logs from '@/components/Logs.vue'
import RemoveBtn from '../Delete.vue'
// import NProgress from 'nprogress'
import ViewOnly from '@/components/IPD/ForNeonatalMaternity/ForNeonatalMaternityView'
import ApgarTable from '@/components/IPD/ForNeonatalMaternity/ApgarTable'
import _ from 'lodash'
import moment from 'moment'
import MDCustomerInfo from '@/components/global/MDCustomerInfo.vue'
export default {
  name: 'IPDInitialAssessmentForNeonatalMaternity',
  mixins: [MixinMasterData],
  components: {
    Logs, RemoveBtn, VDatePicker, ViewOnly, ApgarTable, UsersSelect2, DropApgar, MDCustomerInfo
  },
  props: ['viewonly', 'VisitId'],
  data () {
    return {
      listDoctors: [],
      arrivalTime: null,
      Stage: 1,
      selectOption: [
        {
          value: 0,
          text: '0'
        },
        {
          value: 1,
          text: '1'
        },
        {
          value: 2,
          text: '2'
        }
      ],
      DataSubmit: {},
      DataPara: null,
      loaded: false,
      menu: [
        {
          label: 'Đánh giá sản phụ',
          blockId: '#InitialAssessment-ForAdult-block1'
        },
        {
          label: 'Đánh giá trẻ sơ sinh',
          blockId: '#InitialAssessment-ForAdult-block2'
        }
      ],

      UpdatedAt: '',
      CreatedAt: '',
      IsLocked: false,
      syncInfo: null,
      specialty: '',
      synced: false,
      ParaUpdateAt: '',
      ParaUpdateBy: '',
      ParaYear: '',
      syncPara: false,
      syncListPara: [],
      isNew: null,
      MedicalRecordCode: ''
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'A02_016_050919_VE'}, () => {
      this.getInfo()
    })
    // console.log('this.$route.params.Id:', this.$route.params.Type)
  },
  computed: {
    readonly: function () {
      if (this.DataSubmit.CreatedBy === '') {
        return this.DataSubmit.IsLocked === true
      }
      return (this.DataSubmit.CreatedBy !== this.$store.state.account.Username) || this.DataSubmit.IsLocked === true
    }
  },
  methods: {
    clearInput () {
      if (this.MASTERDATA) {
        if (this.MASTERDATA['IPDOAGIANM106'].Items[0].Value === false && this.MASTERDATA['IPDOAGIANM106'].Items[21].Value) {
          this.MASTERDATA['IPDOAGIANM106'].Items[21].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM106'].Items[1].Value === false && this.MASTERDATA['IPDOAGIANM106'].Items[22].Value) {
          this.MASTERDATA['IPDOAGIANM106'].Items[22].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM106'].Items[2].Value === false && (this.MASTERDATA['IPDOAGIANM106'].Items[4].Value || this.MASTERDATA['IPDOAGIANM106'].Items[6].Value)) {
          this.MASTERDATA['IPDOAGIANM106'].Items[4].Value = ''
          this.MASTERDATA['IPDOAGIANM106'].Items[6].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM106'].Items[7].Value === false && (this.MASTERDATA['IPDOAGIANM106'].Items[9].Value || this.MASTERDATA['IPDOAGIANM106'].Items[11].Value)) {
          this.MASTERDATA['IPDOAGIANM106'].Items[9].Value = ''
          this.MASTERDATA['IPDOAGIANM106'].Items[11].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM106'].Items[12].Value === false && (this.MASTERDATA['IPDOAGIANM106'].Items[14].Value || this.MASTERDATA['IPDOAGIANM106'].Items[16].Value)) {
          this.MASTERDATA['IPDOAGIANM106'].Items[14].Value = ''
          this.MASTERDATA['IPDOAGIANM106'].Items[16].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM106'].Items[17].Value === false && this.MASTERDATA['IPDOAGIANM106'].Items[18].Value) {
          this.MASTERDATA['IPDOAGIANM106'].Items[18].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM106'].Items[19].Value === false && this.MASTERDATA['IPDOAGIANM106'].Items[20].Value) {
          this.MASTERDATA['IPDOAGIANM106'].Items[20].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM128'].Items[2].Value === false && this.MASTERDATA['IPDOAGIANM128'].Items[3].Value) {
          this.MASTERDATA['IPDOAGIANM128'].Items[3].Value = ''
        }
        if (this.MASTERDATA['IPDOAGIANM84'].Items[5].Value === false && this.MASTERDATA['IPDOAGIANM84'].Items[6].Value) {
          this.MASTERDATA['IPDOAGIANM84'].Items[6].Value = ''
        }
      }
    },
    resetStage () {
      this.MASTERDATA['IPDOAGIANM207'].Items[0].Value.map((item, index) => {
        item.Stage = index + 1
        item.Order = index + 1
      })
    },
    addRowDelivery () {
      if (!this.MASTERDATA['IPDOAGIANM205'].Items[0].Value) {
        this.MASTERDATA['IPDOAGIANM205'].Items[0].Value = []
      } else {
        this.MASTERDATA['IPDOAGIANM205'].Items[0].Value = [...this.MASTERDATA['IPDOAGIANM205'].Items[0].Value]
      }
      this.MASTERDATA['IPDOAGIANM205'].Items[0].Value.push({
        Year: '',
        Name: ''
      })
    },
    deleteRowDelivery (index) {
      this.MASTERDATA['IPDOAGIANM205'].Items[0].Value.splice(index, 1)
    },
    addRowLabours () {
      if (!this.MASTERDATA['IPDOAGIANM207'].Items[0].Value) {
        this.MASTERDATA['IPDOAGIANM207'].Items[0].Value = []
      } else {
        this.MASTERDATA['IPDOAGIANM207'].Items[0].Value = [...this.MASTERDATA['IPDOAGIANM207'].Items[0].Value]
      }
      this.MASTERDATA['IPDOAGIANM207'].Items[0].Value.push({
        Stage: this.Stage++,
        Content: '',
        Order: this.Stage++
      })
      this.resetStage()
    },
    deleteRowLabours (index) {
      if (index === 0) {
        this.Stage = 1
      }
      this.MASTERDATA['IPDOAGIANM207'].Items[0].Value.splice(index, 1)
      this.resetStage()
    },
    submit () {
      // this.validateForm()
      var obj = {}
      // NProgress.start()
      this.MASTERDATA['IPDOAGIANM209'].Items[0].Value = this.$refs.ApgarTable.tableApgar
      this.MASTERDATA['IPDOAGIANM7'].Items[0].Value = this.CreatedAt
      this.clearInput()
      this.DataSubmit.Datas = []
      if (this.arrivalTime) {
        const timeSubmit = moment(this.arrivalTime, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')
        this.DataSubmit.Time = {
          AdmittedFrom: timeSubmit
        }
      } else {
        this.DataSubmit.Time = {
          AdmittedFrom: null
        }
      }
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (item.Code === 'IPDOAGIANM206') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'IPDOAGIANM208') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'IPDOAGIANM210') {
              val = JSON.stringify(item.Value)
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      new InitialAssessment().update('ForNewborns/Update/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity/', this.DataSubmit).then(response => {
        this.toastedSuccess()
        setTimeout(() => {
          this.reload()
        }, 500)
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    getInfo () {
      new InitialAssessment().find('ForNewborns/Info/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity/').then(response => {
        this.IsLocked = response.IsLocked
        this.isNew = response.isNew
        if (response.DateOfAdmission && this.isNew) {
          const responseArrivalTime = moment(response.DateOfAdmission).format('HH:mm DD/MM/YYYY')
          this.arrivalTime = responseArrivalTime
        }
        if (response.OldDatas && response.SpecialtyOld) {
          this.syncInfo = response.OldDatas
          this.specialty = response.SpecialtyOld
        } else {
          this.syncInfo = null
          this.specialty = ''
        }
        this.getData()
      }).catch(e => {
        this.IsLocked = e.data.IsLocked
        this.loaded = true
        this._401ResponseError(e)
      })
    },
    getData () {
      new InitialAssessment().find('ForNewborns/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity/' + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        if (response.DataPara !== null) {
          this.DataPara = response.DataPara.Datas
          this.ParaUpdateAt = response.DataPara.UpdateAt
          this.ParaUpdateBy = response.DataPara.UpdateBy
          this.ParaYear = response.DataPara.Year
          this.DataPara.map(item => {
            if (item.Value) {
              this.syncPara = true
              this.syncListPara.push(item.Value)
            }
          })
          this.syncListPara = this.syncListPara.toString()
        }
        if (this.syncInfo && response.Datas.length === 0) {
          this.DataSubmit.Datas = this.syncInfo
          this.synced = true
        }
        if (response.DateOfAdmission && !this.isNew) {
          const responseArrivalTime = moment(response.DateOfAdmission).format('HH:mm DD/MM/YYYY')
          this.arrivalTime = responseArrivalTime
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
                } else if (item.Code === 'IPDOAGIANM206' || item.Code === 'IPDOAGIANM208' || item.Code === 'IPDOAGIANM210') {
                  item.Value = this.JSONParse(exited.Value)
                } else if (item.Code === 'IPDOAGIANM2' || item.Code === 'IPDOAGIANM4' || item.Code === 'IPDOAGIANM6') {
                  item.Value = this.JSONParse(exited.Value)
                  this.listDoctors.push(item.Value)
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
        this.UpdatedAt = moment(this.DataSubmit.UpdatedAt).format('HH:mm DD/MM/YYYY')
        if (!this.MASTERDATA['IPDOAGIANM7'].Items[0].Value && this.isNew) {
          this.CreatedAt = moment(this.DataSubmit.CreatedAt).format('HH:mm DD/MM/YYYY')
        } else {
          this.CreatedAt = this.MASTERDATA['IPDOAGIANM7'].Items[0].Value
        }
        this.loaded = true
      }).catch(e => {
        this.loaded = true
        this.DataSubmit = {}
        if (e.status === 404) {}
      })
    },
    create () {
      new InitialAssessment().update('ForNewborns/Create/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity/').then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    handleCreate () {
      new InitialAssessment().update('ForNewborns/Create/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity/').then(response => {
        this.toastedSuccess()
        this.$router.push({name: 'IPDNeonatalMaternityV2', params: { Id: this._VisitId, Item: response.Id }})
      })
    },
    getTypeOfSpecial () {
      new InitialAssessment().find('ForNewborns/InforVersion/' + this._VisitId).then(response => {
        console.log('get special', response)
        this.MedicalRecordCode = response.MedicalRecordCode
        // this.checkInfoVersion = response
      }).catch(err => {
        console.log(err)
      })
    },
    copy () {
      if (this.MASTERDATA['IPDOAGIANM217'].Items) {
        this.MASTERDATA['IPDOAGIANM217'].Items[1].Value = this.DataPara[0].Value
        this.MASTERDATA['IPDOAGIANM217'].Items[3].Value = this.DataPara[1].Value
        this.MASTERDATA['IPDOAGIANM217'].Items[5].Value = this.DataPara[2].Value
        this.MASTERDATA['IPDOAGIANM217'].Items[7].Value = this.DataPara[3].Value
      }
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới đánh giá ban đầu cho trẻ vừa sinh'),
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
    }
  }
}
</script>
<style scoped>
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
  width: 450px;
}
.analgesia-anaesthesia:last-child {
  width: 41.5%;
  margin: 0 !important;
}
.analgesia-anaesthesia:last-child > input{
  width: 100%;
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
