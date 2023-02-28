<template>
  <div class="BloodGasAnalysisEG7-Item">
    <template v-if="loaded">
      <div>
        <div class="d-flex flex-center" style="margin: 10px 0;">
          <label class="mb-0">{{__t('Thông số bệnh nhân')}}</label>
          <div class="d-flex flex-center" style="margin-left: 50px; ">
            <p class="mb-0">{{__t('Thở máy')}}</p>
            <MDRadio v-model="MASTERDATA['BGACE1']" :readonly="readonly"/>
          </div>
        </div>
        <table class="table table-bordered table-bordered-x">
          <thead>
            <tr>
              <th>{{__t('Mode thở')}}</th>
              <th>{{__t('Huyết áp')}}&nbsp;<span class="unit-label">(mmHg)</span></th>
              <th colspan="2">Vt/f</th>
              <th>{{__t('Nhịp thở')}}</th>
              <th>{{__t('FIO2')}}&nbsp;<span class="unit-label">(%)</span></th>
              <th>{{__t('Nhiệt độ')}}&nbsp;<span class="unit-label">(&#8451;)</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input v-if="!readonly" class="form-control" v-model="MASTERDATA['BGACE4'].Items[0].Value"/>
                <b class="no-wrap" v-else>{{MASTERDATA['BGACE4'].Items[0].Value || 'N/A'}}</b>
              </td>
              <td>
                <div class="d-flex flex-center">
                  <div>
                    <input v-if="!readonly" class="form-control" v-model="MASTERDATA['BGACE6'].Items[0].Value"/>
                    <b class="no-wrap" v-else>{{MASTERDATA['BGACE6'].Items[0].Value || 'N/A'}}</b>
                  </div>
                  <p style="margin: 0 5px;">/</p>
                  <div>
                    <input v-if="!readonly" class="form-control" v-model="MASTERDATA['BGACE6'].Items[1].Value"/>
                    <b class="no-wrap" v-else>{{MASTERDATA['BGACE6'].Items[1].Value || 'N/A'}}</b>
                  </div>
                </div>
              </td>
              <td>
                <div class="input-group" v-if="!readonly">
                  <span class="input-group-addon">Vt:</span>
                  <input class="form-control" v-model="MASTERDATA['BGACE9'].Items[0].Value"/>
                </div>
                <b class="no-wrap" v-else>Vt: {{MASTERDATA['BGACE9'].Items[0].Value || 'N/A'}}</b>
              </td>
              <td>
                <div class="input-group" v-if="!readonly">
                  <span class="input-group-addon">f:</span>
                  <input class="form-control" v-model="MASTERDATA['BGACE9'].Items[1].Value"/>
                </div>
                <b class="no-wrap" v-else>f: {{MASTERDATA['BGACE9'].Items[1].Value || 'N/A'}}</b>
              </td>
              <td>
                <input v-if="!readonly" class="form-control" v-model="MASTERDATA['BGACE12'].Items[0].Value"/>
                <b class="no-wrap" v-else>{{MASTERDATA['BGACE12'].Items[0].Value || 'N/A'}}</b>
              </td>
              <td>
                <input v-if="!readonly" class="form-control" v-model="MASTERDATA['BGACE14'].Items[0].Value"/>
                <b class="no-wrap" v-else>{{MASTERDATA['BGACE14'].Items[0].Value || 'N/A'}}</b>
              </td>
              <td>
                <input v-if="!readonly" class="form-control" v-model="MASTERDATA['BGACE16'].Items[0].Value"/>
                <b class="no-wrap" v-else>{{MASTERDATA['BGACE16'].Items[0].Value || 'N/A'}}</b>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="table v-table-1">
          <tr v-if="MASTERDATA['BGACE18']">
            <th width="20%" style="text-align: left;">{{__t('Allen Test')}}</th>
            <th style="background-color: #fff;">
              <FakeInput v-if="readonly" v-model="MASTERDATA['BGACE18'].Items[0].Value" class="font-normal m-0" style="text-align: left;" />
              <textarea-autosize v-else rows="1" class="form-control" style="font-weight: normal;" :placeholder="__t('Nhập')" v-model="MASTERDATA['BGACE18'].Items[0].Value"/>
            </th>
          </tr>
          <tr>
            <th width="20%" style="text-align: left;">{{__t('Vị trí lấy mẫu')}}</th>
            <th style="background-color: #fff;">
              <FakeInput v-if="readonly" v-model="MASTERDATA['BGACE20'].Items[0].Value" class="font-normal m-0" style="text-align: left;" />
              <textarea-autosize v-else rows="1" class="form-control" style="font-weight: normal;" :placeholder="__t('Nhập')" v-model="MASTERDATA['BGACE20'].Items[0].Value"/>
            </th>
          </tr>
        </table>
        <table class="table v-table-1 middle-text" id="customer-tbl">
          <thead class="bg-1375ba table header-table">
            <tr>
              <th class="text-center content-center" rowspan="2">{{__t('STT')}}</th>
              <th class="text-center content-center" rowspan="2" colspan="2">{{__t('Thông số ')}}</th>
              <th class="text-center content-center" rowspan="2" width="275px">{{__t('Khoảng tham chiếu ')}}</th>
              <th class="text-center" colspan="2" width="236px" style="border-bottom-width: 1px!important;">{{__t('Chỉ số báo động ')}}</th>
              <th class="text-center" colspan="3" style="border-bottom-width: 1px!important;">{{__t('Kết quả')}}</th>
            </tr>
            <tr>
              <th class="text-center" width="100px">{{__t('Giá trị thấp')}}</th>
              <th class="text-center" width="100px">{{__t('Giá trị cao')}}</th>
              <th class="text-center no-wrap" width="100px">{{__t('Kết quả')}}</th>
              <th class="text-center" width="100px">{{__t('Đơn vị ')}}</th>
              <th class="text-center">{{__t('Hình ảnh')}} <button v-if="!readonly" class="btn btn-sync-data" @click="openFile()"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('Tải ảnh')}}</button></th>
            </tr>
          </thead>
          <tbody>
            <!-- 1. -->
            <template>
              <tr>
                <td class="text-center" rowspan="2">1</td>
                <td class="text-center" rowspan="2" style="width: 150px;">
                  pH
                </td>
                <td style="width: 150px;">Người trưởng thành</td>
                <td class="text-center">7.35 - 7.45</td>
                <td class="text-center" rowspan="2">&#8804; 7.21</td>
                <td class="text-center" rowspan="2">&#8805; 7.59</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE22']"
                    v-model="MASTERDATA['BGACE22'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE22'].Items[0].Value, 7.21, 7.59)"
                  />
                </td>
                <td class="text-center" rowspan="2"></td>
                <td rowspan="20" style="vertical-align: top;">
                  <DropFiles id="mini-upload" :dataDropfile="dataDropfile" v-if="MASTERDATA['BGACE59'] && loaded" :readonly="readonly" v-model="MASTERDATA['BGACE59'].Items[1].Value"/>
                </td>
              </tr>
              <tr>
                <td>Trẻ em</td>
                <td></td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE22']"
                    v-model="MASTERDATA['BGACE22'].Items[1].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE22'].Items[1].Value, 7.21, 7.59)"
                  />
                </td>
              </tr>
            </template>
            <!-- 2. -->
            <template>
              <tr>
                <td class="text-center" rowspan="2">2</td>
                <td class="text-center" rowspan="2">
                  pCO<sub>2</sub>
                </td>
                <td>Người trưởng thành</td>
                <td class="text-center">35 - 45</td>
                <td class="text-center">&#8804; 19</td>
                <td class="text-center">&#8805; 67</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE25']"
                    v-model="MASTERDATA['BGACE25'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE25'].Items[0].Value, 19, 67)"
                  />
                </td>
                <td class="text-center" rowspan="2">mmHg</td>
              </tr>
              <tr>
                <td>Trẻ em</td>
                <td></td>
                <td class="text-center">&#8804; 21</td>
                <td class="text-center">&#8805; 66</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE25']"
                    v-model="MASTERDATA['BGACE25'].Items[1].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE25'].Items[1].Value, 21, 66)"
                  />
                </td>
              </tr>
            </template>
            <!-- 3. -->
            <template>
              <tr>
                <td class="text-center" rowspan="3">3</td>
                <td class="text-center" rowspan="3">
                  pO<sub>2</sub>
                </td>
                <td>Người trưởng thành</td>
                <td class="text-center">80 - 105</td>
                <td class="text-center">&#8804; 43</td>
                <td class="text-center">{{__t('Không áp dụng')}}</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE28']"
                    v-model="MASTERDATA['BGACE28'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE28'].Items[0].Value, 43)"
                  />
                </td>
                <td class="text-center" rowspan="3">mmHg</td>
              </tr>
              <tr>
                <td>Trẻ em</td>
                <td></td>
                <td class="text-center">&#8804; 45</td>
                <td class="text-center">&#8805; 124</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE28']"
                    v-model="MASTERDATA['BGACE28'].Items[1].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE28'].Items[1].Value, 45, 124)"
                  />
                </td>
              </tr>
              <tr>
                <td>Trẻ sơ sinh</td>
                <td></td>
                <td class="text-center">&#8804; 37</td>
                <td class="text-center">&#8805; 92</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE28']"
                    v-model="MASTERDATA['BGACE28'].Items[2].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE28'].Items[2].Value, 37, 92)"
                  />
                </td>
              </tr>
            </template>
            <!-- 4. -->
            <template>
              <tr>
                <td class="text-center">4</td>
                <td class="text-center">
                  BE
                </td>
                <td>Người trưởng thành</td>
                <td class="text-center">(-2) - (+3)</td>
                <td class="text-center">{{__t('Không áp dụng')}}</td>
                <td class="text-center">{{__t('Không áp dụng')}}</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE32']"
                    v-model="MASTERDATA['BGACE32'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :realNumber="true"
                    :maxlength="10"
                  />
                </td>
                <td class="text-center">mmol/L</td>
              </tr>
            </template>
            <!-- 5. -->
            <template>
              <tr>
                <td class="text-center">5</td>
                <td class="text-center">
                  HCO<sub>3</sub>
                </td>
                <td>Người trưởng thành</td>
                <td class="text-center">22 - 26</td>
                <td class="text-center">{{__t('Không áp dụng')}}</td>
                <td class="text-center">{{__t('Không áp dụng')}}</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE34']"
                    v-model="MASTERDATA['BGACE34'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength="10"
                  />
                </td>
                <td class="text-center">mmol/L</td>
              </tr>
            </template>
            <!-- 6. -->
            <template>
              <tr>
                <td class="text-center">6</td>
                <td class="text-center">
                  TCO<sub>2</sub>
                </td>
                <td>Người trưởng thành</td>
                <td class="text-center">23 - 27</td>
                <td class="text-center">{{__t('Không áp dụng')}}</td>
                <td class="text-center">{{__t('Không áp dụng')}}</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE36']"
                    v-model="MASTERDATA['BGACE36'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength="10"
                  />
                </td>
                <td class="text-center">mmol/L</td>
              </tr>
            </template>
            <!-- 7. -->
            <template>
              <tr>
                <td class="text-center">7</td>
                <td class="text-center">
                  SO<sub>2</sub>
                </td>
                <td>Người trưởng thành</td>
                <td class="text-center">95 - 98</td>
                <td class="text-center">{{__t('Không áp dụng')}}</td>
                <td class="text-center">{{__t('Không áp dụng')}}</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE38']"
                    v-model="MASTERDATA['BGACE38'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength="10"
                  />
                </td>
                <td class="text-center">%</td>
              </tr>
            </template>
            <!-- 8. -->
            <template>
              <tr>
                <td class="text-center" rowspan="2">8</td>
                <td class="text-center" rowspan="2">
                  Na<sup>+</sup>
                </td>
                <td>Người trưởng thành</td>
                <td class="text-center">138 - 146</td>
                <td class="text-center">&#8804; 120</td>
                <td class="text-center">&#8805; 158</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE40']"
                    v-model="MASTERDATA['BGACE40'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE40'].Items[0].Value, 120, 158)"
                  />
                </td>
                <td class="text-center" rowspan="2">mmol/L</td>
              </tr>
              <tr>
                <td>Trẻ em và trẻ sơ sinh</td>
                <td></td>
                <td class="text-center">&#8804; 121</td>
                <td class="text-center">&#8805; 156</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE40']"
                    v-model="MASTERDATA['BGACE40'].Items[1].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE40'].Items[1].Value, 121, 156)"
                  />
                </td>
              </tr>
            </template>
            <!-- 9. -->
            <template>
              <tr>
                <td class="text-center" rowspan="3">9</td>
                <td class="text-center" rowspan="3">
                  K<sup>+</sup>
                </td>
                <td>Người trưởng thành</td>
                <td class="text-center">3.5 - 4.9</td>
                <td class="text-center">&#8804; 2.8</td>
                <td class="text-center">&#8805; 6.2</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE43']"
                    v-model="MASTERDATA['BGACE43'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE43'].Items[0].Value, 2.8, 6.2)"
                  />
                </td>
                <td class="text-center" rowspan="3">mmol/L</td>
              </tr>
              <tr>
                <td>Trẻ em</td>
                <td></td>
                <td class="text-center">&#8804; 2.8</td>
                <td class="text-center">&#8805; 6.4</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE43']"
                    v-model="MASTERDATA['BGACE43'].Items[1].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE43'].Items[1].Value, 2.8, 6.4)"
                  />
                </td>
              </tr>
              <tr>
                <td>Trẻ sơ sinh</td>
                <td></td>
                <td class="text-center">&#8804; 2.8</td>
                <td class="text-center">&#8805; 6.5</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE43']"
                    v-model="MASTERDATA['BGACE43'].Items[2].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE43'].Items[2].Value, 2.8, 6.5)"
                  />
                </td>
              </tr>
            </template>
            <!-- 10. -->
            <template>
              <tr>
                <td class="text-center" rowspan="2">10</td>
                <td class="text-center" rowspan="2">
                  Cl<sup>-</sup>
                </td>
                <td>Người trưởng thành</td>
                <td class="text-center">98 - 109</td>
                <td class="text-center">&#8804; 75</td>
                <td class="text-center">&#8805; 126</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE47']"
                    v-model="MASTERDATA['BGACE47'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE47'].Items[0].Value, 75, 126)"
                  />
                </td>
                <td class="text-center" rowspan="2">mmol/L</td>
              </tr>
              <tr>
                <td>Trẻ em và trẻ sơ sinh</td>
                <td></td>
                <td class="text-center">&#8804; 77</td>
                <td class="text-center">&#8805; 121</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE47']"
                    v-model="MASTERDATA['BGACE47'].Items[1].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE47'].Items[1].Value, 77, 121)"
                  />
                </td>
              </tr>
            </template>
            <!-- 11. -->
            <template>
              <tr>
                <td class="text-center" rowspan="2">11</td>
                <td class="text-center" rowspan="2">
                  Ion Calciun (iCa<sup>2+</sup>)
                </td>
                <td>Người trưởng thành</td>
                <td class="text-center">1.12 - 1.32</td>
                <td class="text-center">&#8804; 0.78</td>
                <td class="text-center">&#8805; 1.58</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE50']"
                    v-model="MASTERDATA['BGACE50'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE50'].Items[0].Value, 0.78, 1.58)"
                  />
                </td>
                <td class="text-center" rowspan="2">mmol/L</td>
              </tr>
              <tr>
                <td>Trẻ em</td>
                <td></td>
                <td class="text-center">&#8804; 0.74</td>
                <td class="text-center">&#8805; 1.57</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE50']"
                    v-model="MASTERDATA['BGACE50'].Items[1].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE50'].Items[1].Value, 0.74, 1.57)"
                  />
                </td>
              </tr>
            </template>
            <!-- 12. -->
            <template>
              <tr>
                <td class="text-center" rowspan="3">12</td>
                <td class="text-center" rowspan="3">
                  HCT
                </td>
                <td>Người lớn</td>
                <td class="text-center">38 - 51</td>
                <td class="text-center">&#8804; 18</td>
                <td class="text-center">&#8805; 61</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE53']"
                    v-model="MASTERDATA['BGACE53'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE53'].Items[0].Value, 18, 61)"
                  />
                </td>
                <td class="text-center" rowspan="3">% PCV</td>
                <td rowspan="3"></td>
              </tr>
              <tr>
                <td>Trẻ em</td>
                <td></td>
                <td class="text-center">&#8804; 20</td>
                <td class="text-center">&#8805; 62</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE53']"
                    v-model="MASTERDATA['BGACE53'].Items[1].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE53'].Items[1].Value, 20, 62)"
                  />
                </td>
              </tr>
              <tr>
                <td>Trẻ sơ sinh</td>
                <td></td>
                <td class="text-center">&#8804; 33</td>
                <td class="text-center">&#8805; 71</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE53']"
                    v-model="MASTERDATA['BGACE53'].Items[2].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength='10'
                    :limitDecimal="true"
                    :limitDecimalNumber='2'
                    :class="checkRangeLimit(MASTERDATA['BGACE53'].Items[2].Value, 33, 71)"
                  />
                </td>
              </tr>
            </template>
            <!-- 13. -->
            <template>
              <tr>
                <td class="text-center">13</td>
                <td class="text-center">
                  Hgb
                </td>
                <td>Người trưởng thành</td>
                <td class="text-center">12 - 17</td>
                <td class="text-center" colspan="2">{{__t('Không áp dụng')}}</td>
                <td>
                  <MDNumberInput
                    v-if="MASTERDATA['BGACE57']"
                    v-model="MASTERDATA['BGACE57'].Items[0].Value"
                    :placeholder="__t('Nhập')"
                    :readonly="readonly"
                    :decimal="true"
                    :maxlength="10"
                  />
                </td>
                <td class="text-center">g/dL</td>
                <td></td>
              </tr>
            </template>
          </tbody>
        </table>
        <p class="italic" style="padding: 0 20px;">Chú ý: Khoảng tham chiếu trên dành cho Xét nghiệm khí máu động mạch cho người trưởng thành. Xét nghiệm khí máu tĩnh mạch và xét nghiệm cho đối tượng khác tham khảo thêm trong <b>Sổ tay khoảng tham chiếu</b></p>
        <br/>
        <Confirm
          class="mt-10"
          ref="Confirm"
          :MasterDataCode="'BGACECONFIRM'"
          :FormCode="'A03_165_061222_V'"
          :ReadOnly="viewOnly || IsLocked"
          :AdInfo="[DataSubmit.CreatedBy]"
          :VisitId="_VisitId"
          :FormId="DataSubmit.Id"
          :saveSuccesss="saveSuccesss"
          @handleConfirm="handleSubmit('confirm')"
          @ResponseData="getListConfirm"
        />
      </div>
      <p class="mrt30">A03_165_061222_V</p>
      <LogForm :DataSubmit="DataSubmit"/>
      <!-- footer -->
      <FloatBlock :openBack="true" @handleBack="handleBack" v-if="!viewOnly">
        <template slot='buttons'>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-2 col-sm-2">
            <div @click="print()" class="btn-block btn-in" title="Price"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</div>
          </div>
          <div class="col-md-6 col-sm-6" v-if="!readonly">
            <div class="form-group1">
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
      <Print v-if="loadedPrint" style="display: none;" :Data="DataSubmit" :ConfirmInfo="ConfirmInfo" :MASTERDATA="MASTERDATA" :formId="formId" :viewOnly="viewOnly" :VisitId="_VisitId" :VisitType="_VisitType"/>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>

<script>
import FormApi from '@/services/FormAPI.js'
import UploadFileService from '@/services/IPD/UploadFileService'
import MixinMasterData from '@/mixins/masterdata.js'
import Print from './Print.vue'
import Confirm from '@/components/Form/Confirm'
import DropFiles from '@/components/DropFiles.vue'
import _ from 'lodash'
import $ from 'jquery'
export default {
  name: 'BloodGasAnalysisEG7Item',
  components: {
    Print,
    DropFiles,
    Confirm
  },
  props: ['viewOnly', 'VisitId', 'formId', 'VisitType'],
  mixins: [MixinMasterData],
  data () {
    return {
      loaded: false,
      loadedPrint: false,
      dataMaster: '',
      DataSubmit: {},
      IsLocked: false,
      ConfirmInfo: [],
      saveSuccesss: false,
      dataDropfile: {}
    }
  },
  watch: {
    formId: function (val) {
      if (val) {
        this._ItemId = val
        this.getData()
      }
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A03_165_061222_V'
    })
    this.getMasterDatas({Form: 'A03_165_061222_V'}, () => {
      this.getData()
    })
  },
  computed: {
    _ItemId () {
      return this.formId || this.$route.params.Item
    },
    readonly () {
      return this.viewOnly || this.IsLocked || this.Confirmed
      // return true
    },
    Confirmed () {
      if ((this.ConfirmInfo.length > 0 && this.ConfirmInfo[0].ConfirmBy) || (this.ConfirmInfo.length > 0 && this.ConfirmInfo[1].ConfirmBy)) {
        return true
      }
      return false
    }
  },
  methods: {
    getListConfirm (val) {
      this.ConfirmInfo = val
      this.loadedPrint = true
    },
    getData () {
      this.loaded = false
      if (!this._ItemId) return
      this.APIService.GetDetail(this._ItemId + '?hidemsg=' + true).then(res => {
        console.log('res', res)
        this.Version = res.data.Version
        this.IsLocked = res.IsLock24h
        this.DataSubmit = res.data
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: res.data.Id || res.data.ID
        }
        this.mapData()
        this.loaded = true
      }).catch((e) => {
        console.log(e)
        this.IsLocked = e.data.IsLock24h
        this.loaded = true
      })
    },
    mapData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (item.Code === 'BGACE61') {
                item.Value = this.JSONParse(exited.Value || [], true)
              } else {
                item.Value = exited.Value
              }
            } else {
              item.Value = ''
            }
          })
        }
      }
      // Auto choose Khong field Tho may
      if (!this.MASTERDATA['BGACE1'].Items[0].Value && !this.MASTERDATA['BGACE1'].Items[1].Value) {
        this.MASTERDATA['BGACE1'].Items[1].Value = true
      }
      setTimeout(() => {
        this.dataMaster = JSON.stringify(this.MASTERDATA)
      }, 500)
    },
    print () {
      this.$PointOfCareTestingPrinter('BloodGasAnalysisEG7-Print', false, 'A03_165_061222_V')
    },
    async handleSubmit (str) {
      console.log('valuesubmit', this.MASTERDATA['BGACE59'].Items[1].Value)
      var urlSubmit = this.MASTERDATA['BGACE59'].Items[1].Value
      await this.mapData2MDData()
      const DataSubmit = Object.assign({}, this.DataSubmit)
      this.APIService.UpdateForm(this._ItemId, DataSubmit).then(async res => {
        await this.removedFile(urlSubmit)
        if (str !== 'confirm') {
          this.toastedSuccess()
          this.reload()
        }
        if (str === 'confirm') {
          this.saveSuccesss = await !this.saveSuccesss
          await setTimeout(() => {
            this.$refs.Confirm.getConfirm()
            this.getData()
          }, 1000)
        }
        // this.reload()
      }).catch((e) => {
        if (str === 'confirm') {
          this.reload()
        }
      })
    },
    checkRangeLimit (val, min, max) {
      val = val && parseFloat(val)
      max = max && parseFloat(max)
      min = min && parseFloat(min)
      if (val || val === 0) {
        if (val <= min) {
          return 'input-yellow'
        }
        if (val >= max) {
          return 'input-red'
        }
        return ''
      }
      return ''
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    openFile () {
      $('#dropzone').click()
    },
    removedFile (urlSubmit) {
      console.log('value', urlSubmit)
      var arr = urlSubmit || []
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this._ItemId, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    // popup canh bao chưa lưu dữ liệu
    confirmPopupBack () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn btn-warning',
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

<style lang="stylus" scoped>
.middle-text {
  td {
    vertical-align: middle;
  }
}
.input-red {
  background-color: #dd4b39 !important;
  color: #fff;
  &::placeholder {
    color: #fff;
  }
};
.input-yellow {
  background-color: #FFD966 !important;
  color: #000;
  &::placeholder {
    color: #000;
  }
}
</style>
