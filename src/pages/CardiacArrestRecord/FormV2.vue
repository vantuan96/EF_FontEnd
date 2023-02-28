<template>
  <div>
    <div v-if="DataSubmit">
      <table class="table standing-order-tbl td-re">
        <tr>
          <th colspan="4">{{__t('Thông tin ban đầu')}}</th>
        </tr>
        <tr>
          <td colspan="4">
            <div style="padding: 5px 0">
              <label style="margin-right: 10px" v-if="MASTERDATA['EIOCRRFWEIG']">{{__label(MASTERDATA['EIOCRRFWEIG'])}}: </label>
              <span class="fake-input disable" v-if="isReadonly">{{MASTERDATA['EIOCRRFWEIG'].Items[0].Value || 'N/A'}}</span>
              <input v-else style="width: 80px;" v-model="MASTERDATA['EIOCRRFWEIG'].Items[0].Value" class="form-control input-md"/> kg
              <label style="margin-right: 10px" v-if="MASTERDATA['EIOCRRFHEIG']">{{__label(MASTERDATA['EIOCRRFHEIG'])}}: </label>
              <span class="fake-input disable" v-if="isReadonly">{{MASTERDATA['EIOCRRFHEIG'].Items[0].Value || 'N/A'}}</span>
              <input v-else style="width: 80px;" v-model="MASTERDATA['EIOCRRFHEIG'].Items[0].Value" class="form-control input-md"/> cm
              <height-and-weight v-if="!isReadonly"  @copy="push2Wh"/>
            </div>
          </td>
        </tr>
        <tr>
          <td width="50%" colspan="2">
            <div v-if="isReadonly"><MDRadioView :data="MASTERDATA['EIOCRRFCOBL'].Items"/></div>
            <div class="group-radio" v-else>
              <span v-for="(item, index) in MASTERDATA['EIOCRRFCOBL'].Items" :key="'EIOCRRFCOBL' + index">
                <input type="checkbox" :id="'EIOCRRFCOBLradio-' + index" v-model="item.Value">
                <label :for="'EIOCRRFCOBLradio-' + index" @click="checkbox2Radio2(MASTERDATA['EIOCRRFCOBL'].Items, item)">{{__label(item)}}</label>
              </span>
            </div>
          </td>
          <td width="50%" colspan="2">
            <div v-if="isReadonly"><MDRadioView :data="MASTERDATA['EIOCRRFCCAA'].Items"/></div>
            <div class="group-radio" v-else>
              <span v-for="(item, index) in MASTERDATA['EIOCRRFCCAA'].Items" :key="'EIOCRRFCCAA' + index">
                <input type="checkbox" :id="'EIOCRRFCCAAradio-' + index" v-model="item.Value">
                <label :for="'EIOCRRFCCAAradio-' + index" @click="checkbox2Radio2(MASTERDATA['EIOCRRFCCAA'].Items, item)">{{__label(item)}}</label>
              </span>
            </div>
          </td>
          <!-- <td width="25%">
            <CheckboxsValue :showall="true" v-if="isReadonly" :data="MASTERDATA['EIOCRRFCCAA'].Items" />
            <div class="flex-box flex-center" v-else>
              <span class="displaytbl"><span>{{__label(MASTERDATA['EIOCRRFCCAA'].Items[0])}}</span></span>
              <div class="v-checkbox">
                <input type="checkbox" :id="'EIOCRRFCCAAradio-'" v-model="MASTERDATA['EIOCRRFCCAA'].Items[0].Value">
                <label :for="'EIOCRRFCCAAradio-'"></label>
              </div>
            </div>
          </td> -->
          <!-- <td width="25%">
            <CheckboxsValue :showall="true" v-if="isReadonly" :data="MASTERDATA['EIOCRRFRRAA'].Items" />
            <div class="flex-box flex-center" v-else>
              <span class="displaytbl"><span>{{__label(MASTERDATA['EIOCRRFRRAA'].Items[0])}}</span></span>
              <div class="v-checkbox">
                <input type="checkbox" :id="'EIOCRRFRRAAradio-'" v-model="MASTERDATA['EIOCRRFRRAA'].Items[0].Value">
                <label :for="'EIOCRRFRRAAradio-'"></label>
              </div>
            </div>
          </td> -->
        </tr>
        <tr>
          <td>{{__label(MASTERDATA['EIOCRRFTIFO'])}}</td>
          <td>
            <span class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFTIFO'].Items[0].Value || 'N/A'}}</span>
            <v-masked-input mask="11:11" v-else v-model="MASTERDATA['EIOCRRFTIFO'].Items[0].Value" placeholder="...h.." class="form-control" />
          </td>
          <td>{{__label(MASTERDATA['EIOCRRFTOAC'])}}</td>
          <td>
            <span class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFTOAC'].Items[0].Value || 'N/A'}}</span>
            <v-masked-input v-else mask="11:11" v-model="MASTERDATA['EIOCRRFTOAC'].Items[0].Value" placeholder="...h.." class="form-control" />
          </td>
        </tr>
        <tr>
          <td>{{__label(MASTERDATA['EIOCRRFCPST'])}}</td>
          <td>
            <span class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFCPST'].Items[0].Value || 'N/A'}}</span>
            <v-masked-input mask="11:11" v-else v-model="MASTERDATA['EIOCRRFCPST'].Items[0].Value" placeholder="...h.." class="form-control" />
          </td>
          <td>{{__label(MASTERDATA['EIOCRRFTIOS'])}}</td>
          <td>
            <span class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFTIOS'].Items[0].Value || 'N/A'}}</span>
            <v-masked-input mask="11:11"  v-else v-model="MASTERDATA['EIOCRRFTIOS'].Items[0].Value" placeholder="...h.." class="form-control" />
          </td>
        </tr>
        <tr>
          <td colspan="3"><b>{{__label(MASTERDATA['EIOCRRFPEBB'])}} ({{__t('Phút')}})</b></td>
          <td>
            <span class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFPEBB'].Items[0].Value || 'N/A'}}</span>
            <input v-model="MASTERDATA['EIOCRRFPEBB'].Items[0].Value" v-else :placeholder="__t('Phút')" class="form-control" />
          </td>
        </tr>
        <tr>
          <th colspan="4">{{__t('Địa điểm ngừng tuần hoàn')}}</th>
        </tr>
        <tr>
          <td width="50%" colspan="2">
            <div v-if="isReadonly"><MDRadioView :data="MASTERDATA['EIOCRRFLOCA'].Items" :DataType="'checkbox'" /></div>
            <div class="group-radio" v-else>
              <span>
                <input type="checkbox" :id="'EIOCRRFLOCAradio-0'" v-model="MASTERDATA['EIOCRRFLOCA'].Items[0].Value">
                <label @click="MASTERDATA['EIOCRRFLOCA'].Items[2].Value = false" :for="'EIOCRRFLOCAradio-0'">{{__label(MASTERDATA['EIOCRRFLOCA'].Items[0])}}</label>
              </span>
              <span>
                <input type="checkbox" :id="'EIOCRRFLOCAradio-1'" v-model="MASTERDATA['EIOCRRFLOCA'].Items[2].Value">
                <label @click="MASTERDATA['EIOCRRFLOCA'].Items[0].Value = false" :for="'EIOCRRFLOCAradio-1'">{{__label(MASTERDATA['EIOCRRFLOCA'].Items[2])}}</label>
              </span>
            </div>
          </td>
          <td colspan="2">
            <div class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFLOCA'].Items[1].Value || 'N/A'}}</div>
            <textarea-autosize class="form-control" v-else rows="3" :placeholder="__label(MASTERDATA['EIOCRRFLOCA'].Items[1])" v-model="MASTERDATA['EIOCRRFLOCA'].Items[1].Value"/>
          </td>
        </tr>
        <tr>
          <th colspan="4">{{__label(MASTERDATA['EIOCRRFINRH'])}}</th>
        </tr>
        <tr>
          <td colspan="4" >
            <div v-if="isReadonly"><MDRadioView :data="MASTERDATA['EIOCRRFINRH'].Items" :DataType="'CheckBox'"/></div>
            <div class="group-radio" v-else>
              <span v-for="(item, index) in MASTERDATA['EIOCRRFINRH'].Items" :key="'EIOCRRFINRH' + index">
                <input type="checkbox" :id="'EIOCRRFINRHradio-' + index" v-model="item.Value">
                <label :for="'EIOCRRFINRHradio-' + index" @click="checkbox2Radio2(MASTERDATA['EIOCRRFINRH'].Items, item)">{{__label(item)}}</label>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <th colspan="4">{{__label(MASTERDATA['EIOCRRFCOCA'])}}</th>
        </tr>
        <tr>
          <td>
            {{__label(MASTERDATA['EIOCRRFCOCA'].Items[0])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFCOCA'].Items[0].Value"/>
            <div v-else class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFCOCAradio-0'" v-model="MASTERDATA['EIOCRRFCOCA'].Items[0].Value">
              <label :for="'EIOCRRFCOCAradio-0'"></label>
            </div>
          </td>
          <td>
            {{__label(MASTERDATA['EIOCRRFCOCA'].Items[1])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFCOCA'].Items[1].Value"/>
            <div v-else class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFCOCAradio-1'" v-model="MASTERDATA['EIOCRRFCOCA'].Items[1].Value">
              <label :for="'EIOCRRFCOCAradio-1'"></label>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            {{__label(MASTERDATA['EIOCRRFCOCA'].Items[2])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFCOCA'].Items[2].Value"/>
            <div v-else  class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFCOCAradio-2'" v-model="MASTERDATA['EIOCRRFCOCA'].Items[2].Value">
              <label :for="'EIOCRRFCOCAradio-2'"></label>
            </div>
          </td>
          <td>
            {{__label(MASTERDATA['EIOCRRFCOCA'].Items[3])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFCOCA'].Items[3].Value"/>
            <div v-else  class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFCOCAradio-3'" v-model="MASTERDATA['EIOCRRFCOCA'].Items[3].Value">
              <label :for="'EIOCRRFCOCAradio-3'"></label>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            {{__label(MASTERDATA['EIOCRRFCOCA'].Items[4])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFCOCA'].Items[4].Value"/>
            <div v-else  class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFCOCAradio-4'" v-model="MASTERDATA['EIOCRRFCOCA'].Items[4].Value">
              <label :for="'EIOCRRFCOCAradio-4'"></label>
            </div>
          </td>
          <td>
            {{__label(MASTERDATA['EIOCRRFCOCA'].Items[5])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFCOCA'].Items[5].Value"/>
            <div v-else  class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFCOCAradio-5'" v-model="MASTERDATA['EIOCRRFCOCA'].Items[5].Value">
              <label :for="'EIOCRRFCOCAradio-5'"></label>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            {{__label(MASTERDATA['EIOCRRFCOCA'].Items[6])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFCOCA'].Items[6].Value"/>
            <div v-else  class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFCOCAradio-6'" v-model="MASTERDATA['EIOCRRFCOCA'].Items[6].Value">
              <label :for="'EIOCRRFCOCAradio-6'"></label>
            </div>
          </td>
          <td>
            {{__label(MASTERDATA['EIOCRRFCOCA'].Items[7])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFCOCA'].Items[7].Value"/>
            <div v-else  class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFCOCAradio-7'" v-model="MASTERDATA['EIOCRRFCOCA'].Items[7].Value">
              <label :for="'EIOCRRFCOCAradio-7'"></label>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            {{__label(MASTERDATA['EIOCRRFCOCA'].Items[8])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFCOCA'].Items[8].Value"/>
            <div v-else  class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFCOCAradio-8'" v-model="MASTERDATA['EIOCRRFCOCA'].Items[8].Value">
              <label :for="'EIOCRRFCOCAradio-8'"></label>
            </div>
          </td>
          <td>
            {{__label(MASTERDATA['EIOCRRFCOCA'].Items[9])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFCOCA'].Items[9].Value"/>
            <div v-else class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFCOCAradio-9'" v-model="MASTERDATA['EIOCRRFCOCA'].Items[9].Value">
              <label :for="'EIOCRRFCOCAradio-9'"></label>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            {{__label(MASTERDATA['EIOCRRFCOCA'].Items[11])}}
            <div class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFCOCA'].Items[11].Value || 'N/A'}}</div>
            <input v-else class="form-control" v-model="MASTERDATA['EIOCRRFCOCA'].Items[11].Value" />
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFCOCA'].Items[10].Value"/>
            <div v-else class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFCOCAradio-10'" v-model="MASTERDATA['EIOCRRFCOCA'].Items[10].Value">
              <label :for="'EIOCRRFCOCAradio-10'"></label>
            </div>
          </td>
          <td>
            {{__label(MASTERDATA['EIOCRRFCOCA'].Items[12])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFCOCA'].Items[12].Value"/>
            <div v-else class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFCOCAradio-12'" v-model="MASTERDATA['EIOCRRFCOCA'].Items[12].Value">
              <label :for="'EIOCRRFCOCAradio-12'"></label>
            </div>
          </td>
        </tr>
        <tr>
          <th colspan="4">{{__label(MASTERDATA['EIOCRRFAMAV'])}}</th>
        </tr>
        <tr>
          <td>
            {{__label(MASTERDATA['EIOCRRFAMAV'].Items[0])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFAMAV'].Items[0].Value"/>
            <div v-else class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFAMAVradio-0'" v-model="MASTERDATA['EIOCRRFAMAV'].Items[0].Value">
              <label :for="'EIOCRRFAMAVradio-0'"></label>
            </div>
          </td>
          <td>
            {{__label(MASTERDATA['EIOCRRFAMAV'].Items[1])}}
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFAMAV'].Items[1].Value"/>
            <div v-else class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFAMAVradio-1'" v-model="MASTERDATA['EIOCRRFAMAV'].Items[1].Value">
              <label :for="'EIOCRRFAMAVradio-1'"></label>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            {{__label(MASTERDATA['EIOCRRFAMAV'].Items[2])}}
            <div class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFAMAV'].Items[3].Value || 'N/A'}}</div>
            <input v-else class="form-control" v-model="MASTERDATA['EIOCRRFAMAV'].Items[3].Value" />
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFAMAV'].Items[2].Value"/>
            <div v-else class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFAMAVradio-2'" v-model="MASTERDATA['EIOCRRFAMAV'].Items[2].Value">
              <label :for="'EIOCRRFAMAVradio-2'"></label>
            </div>
          </td>
          <td>
            {{__label(MASTERDATA['EIOCRRFAMAV'].Items[4])}}
            <div class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFAMAV'].Items[5].Value || 'N/A'}}</div>
            <input v-else class="form-control" v-model="MASTERDATA['EIOCRRFAMAV'].Items[5].Value" />
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFAMAV'].Items[4].Value"/>
            <div v-else class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFAMAVradio-4'" v-model="MASTERDATA['EIOCRRFAMAV'].Items[4].Value">
              <label :for="'EIOCRRFAMAVradio-4'"></label>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            {{__label(MASTERDATA['EIOCRRFAMAV'].Items[6])}}
            <div class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFAMAV'].Items[7].Value || 'N/A'}}</div>
            <input v-else class="form-control" v-model="MASTERDATA['EIOCRRFAMAV'].Items[7].Value" />
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFAMAV'].Items[6].Value"/>
            <div v-else class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFAMAVradio-6'" v-model="MASTERDATA['EIOCRRFAMAV'].Items[6].Value">
              <label :for="'EIOCRRFAMAVradio-6'"></label>
            </div>
          </td>
          <td>
            {{__label(MASTERDATA['EIOCRRFAMAV'].Items[8])}}
            <div class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFAMAV'].Items[9].Value || 'N/A'}}</div>
            <input v-else class="form-control" v-model="MASTERDATA['EIOCRRFAMAV'].Items[9].Value" />
          </td>
          <td class="text-center">
            <CheckboxValue v-if="isReadonly" v-model="MASTERDATA['EIOCRRFAMAV'].Items[8].Value"/>
            <div v-else class="v-checkbox">
              <input type="checkbox" :id="'EIOCRRFAMAVradio-8'" v-model="MASTERDATA['EIOCRRFAMAV'].Items[8].Value">
              <label :for="'EIOCRRFAMAVradio-8'"></label>
            </div>
          </td>
        </tr>
        <tr>
          <th colspan="4">{{__t('Quá trình cấp cứu NTH')}}</th>
        </tr>
        <tr>
          <td colspan="4">
            <table class="table table-bordered table-bordered-x no-margin chil-tbl">
              <tr>
                <th width="150px">{{__t('Thời gian')}}</th>
                <th width="150px">{{__t('Nhịp tim')}}</th>
                <th width="150px">{{__t('Khử rung')}}</th>
                <th width="150px">{{__t('Adernalin 1mg/ml')}}</th>
                <th width="150px">{{__t('Amiodarone')}}</th>
                <th>{{__t('Can thiệp và thuốc khác')}}</th>
              </tr>
              <tbody>
                <tr v-for="(item, index) in DataSubmit.Table" :key="index" v-if="!item.removed">
                  <td style="position: relative;">
                    <div class="fake-input disable bl-input" v-if="isReadonly">{{item.Time || 'N/A'}}</div>
                    <template v-else>
                      <button @click="item.removed = true" class="btn-pos-left" v-if="!item.Id"><i aria-hidden="true" class="fa fa-trash"></i></button>
                      <v-date-picker v-model="item.Time"  class="full-w" :format="vDateTimeFormat"/>
                    </template>
                  </td>
                  <td>
                    <div class="fake-input disable bl-input" v-if="isReadonly">{{item.Rhythm || 'N/A'}}</div>
                    <input v-else v-model="item.Rhythm" class="form-control"/>
                  </td>
                  <td>
                    <div class="fake-input disable bl-input" v-if="isReadonly">{{item.Defib || 'N/A'}}</div>
                    <input v-else v-model="item.Defib" class="form-control"/>
                  </td>
                  <td>
                    <div class="fake-input disable bl-input" v-if="isReadonly">{{item.Andrenalin || 'N/A'}}</div>
                    <input v-else v-model="item.Andrenalin" class="form-control"/>
                  </td>
                  <td>
                    <div class="fake-input disable bl-input" v-if="isReadonly">{{item.Amiodarone || 'N/A'}}</div>
                    <input v-else v-model="item.Amiodarone" class="form-control"/>
                  </td>
                  <td>
                    <div class="fake-input disable bl-input" v-if="isReadonly">{{item.Other || 'N/A'}}</div>
                    <textarea-autosize v-else class="form-control" rows="2" v-model="item.Other"/>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="!isReadonly" class="text-center"><button @click="DataSubmit.Table.push({Time: '', Rhythm: '', Defib: '', Andrenalin: '', Amiodarone: '', Other: '', removed: false})" class="btn v-green-btn v-bottom-btn"><i aria-hidden="true" class="fa fa-plus"></i> {{__t('Thêm mới')}}</button></div>
          </td>
        </tr>
        <tr>
          <th colspan="4">{{__t('Sau cấp cứu')}}</th>
        </tr>
        <tr>
          <td>{{__label(MASTERDATA['EIOCRRFCPSA'])}}</td>
          <td>
            <div class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFCPSA'].Items[0].Value || 'N/A'}}</div>
            <v-masked-input v-else mask="11:11" v-model="MASTERDATA['EIOCRRFCPSA'].Items[0].Value" placeholder="...h.." class="form-control" />
          </td>
          <td>
            <div class="flex-box flex-center">
              {{__label(MASTERDATA['EIOCRRFTORT'])}}
              <div class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFTORT'].Items[0].Value || 'N/A'}}</div>
              <input v-else class="form-control" v-model="MASTERDATA['EIOCRRFTORT'].Items[0].Value" />
            </div>
          </td>
          <td>
            <div class="flex-box flex-center">
              {{__label(MASTERDATA['EIOCRRFCCFA'])}}
              <div class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFCCFA'].Items[0].Value || 'N/A'}}</div>
              <input v-else class="form-control" v-model="MASTERDATA['EIOCRRFCCFA'].Items[0].Value" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2"><label>{{__label(MASTERDATA['EIOCRRFRCPR'])}}</label></td>
          <td colspan="2"><label>{{__label(MASTERDATA['EIOCRRFROSC'])}}</label></td>
        </tr>
        <tr>
          <td colspan="2">
            <div v-if="isReadonly"><MDRadioView :data="[MASTERDATA['EIOCRRFRCPR'].Items[0], MASTERDATA['EIOCRRFRCPR'].Items[1]]" :DataType="'checkbox'" /></div>
            <div class="group-radio" v-else>
              <span>
                <input type="checkbox" :id="'EIOCRRFRCPRradio-0'" v-model="MASTERDATA['EIOCRRFRCPR'].Items[0].Value">
                <label @click="MASTERDATA['EIOCRRFRCPR'].Items[1].Value = false" :for="'EIOCRRFRCPRradio-0'">{{__label(MASTERDATA['EIOCRRFRCPR'].Items[0])}}</label>
              </span>
              <span>
                <input type="checkbox" :id="'EIOCRRFRCPRradio-1'" v-model="MASTERDATA['EIOCRRFRCPR'].Items[1].Value">
                <label @click="MASTERDATA['EIOCRRFRCPR'].Items[0].Value = false" :for="'EIOCRRFRCPRradio-1'">{{__label(MASTERDATA['EIOCRRFRCPR'].Items[1])}}</label>
              </span>
            </div>
          </td>
          <td colspan="2">
            <div v-if="isReadonly"><MDRadioView :data="[MASTERDATA['EIOCRRFROSC'].Items[0], MASTERDATA['EIOCRRFROSC'].Items[1], MASTERDATA['EIOCRRFROSC'].Items[2]]" :DataType="'checkbox'" /></div>
            <div class="group-radio" v-else>
              <span>
                <input type="checkbox" :id="'EIOCRRFROSCradio-0'" v-model="MASTERDATA['EIOCRRFROSC'].Items[0].Value">
                <label @click="checkbox2Radio(MASTERDATA['EIOCRRFROSC'].Items, MASTERDATA['EIOCRRFROSC'].Items[0])" :for="'EIOCRRFROSCradio-0'">{{__label(MASTERDATA['EIOCRRFROSC'].Items[0])}}</label>
              </span>
              <span>
                <input type="checkbox" :id="'EIOCRRFROSCradio-1'" v-model="MASTERDATA['EIOCRRFROSC'].Items[1].Value">
                <label @click="checkbox2Radio(MASTERDATA['EIOCRRFROSC'].Items, MASTERDATA['EIOCRRFROSC'].Items[1])" :for="'EIOCRRFROSCradio-1'">{{__label(MASTERDATA['EIOCRRFROSC'].Items[1])}}</label>
              </span>
              <span>
                <input type="checkbox" :id="'EIOCRRFROSCradio-2'" v-model="MASTERDATA['EIOCRRFROSC'].Items[2].Value">
                <label @click="checkbox2Radio(MASTERDATA['EIOCRRFROSC'].Items, MASTERDATA['EIOCRRFROSC'].Items[2])" :for="'EIOCRRFROSCradio-2'">{{__label(MASTERDATA['EIOCRRFROSC'].Items[2])}}</label>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2"><label>{{__t('Giấy từ chối cấp cứu(nếu có)')}}</label></td>
          <td colspan="2"><label>{{__label(MASTERDATA['EIOCRRFNSAC'])}}</label></td>
        </tr>
        <tr>
          <td colspan="2">
            <div v-if="isReadonly"><MDRadioView :data="[MASTERDATA['EIOCRRFRCPR'].Items[2], MASTERDATA['EIOCRRFRCPR'].Items[3]]" :DataType="'checkbox'" /></div>
            <div class="group-radio" v-else>
              <span>
                <input type="checkbox" :id="'EIOCRRFRCPRradio-2'" v-model="MASTERDATA['EIOCRRFRCPR'].Items[2].Value">
                <label @click="MASTERDATA['EIOCRRFRCPR'].Items[3].Value = false" :for="'EIOCRRFRCPRradio-2'">{{__label(MASTERDATA['EIOCRRFRCPR'].Items[2])}}</label>
              </span>
              <span>
                <input type="checkbox" :id="'EIOCRRFRCPRradio-3'" v-model="MASTERDATA['EIOCRRFRCPR'].Items[3].Value">
                <label @click="MASTERDATA['EIOCRRFRCPR'].Items[2].Value = false" :for="'EIOCRRFRCPRradio-3'">{{__label(MASTERDATA['EIOCRRFRCPR'].Items[3])}}</label>
              </span>
            </div>
          </td>
          <td colspan="2">
            <div v-if="isReadonly"><MDRadioView :data="MASTERDATA['EIOCRRFNSAC'].Items" :DataType="'checkbox'" /></div>
            <div class="group-radio" v-else>
              <span  v-for="(item, index) in MASTERDATA['EIOCRRFNSAC'].Items" :key="index">
                <input type="checkbox" :id="'EIOCRRFNSACradio-0' + index" v-model="item.Value">
                <label @click="checkbox2Radio(MASTERDATA['EIOCRRFNSAC'].Items, item)" :for="'EIOCRRFNSACradio-0' + index">{{__label(item)}}</label>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td>{{__label(MASTERDATA['EIOCRRFPOAD'])}}</td>
          <td colspan="3">
            <div v-if="isReadonly"><MDRadioView :data="MASTERDATA['EIOCRRFPOAD'].Items" :DataType="'checkbox'" /></div>
            <div class="group-radio" v-else>
              <span  v-for="(item, index) in MASTERDATA['EIOCRRFPOAD'].Items" :key="index" v-if="item.DataType === 'CheckBox'">
                <input type="checkbox" :id="'EIOCRRFPOADradio-0' + index" v-model="item.Value">
                <label @click="checkbox2Radio(MASTERDATA['EIOCRRFPOAD'].Items, item)" :for="'EIOCRRFPOADradio-0' + index">{{__label(item)}}</label>
              </span>
            </div>
            <template v-if="MASTERDATA['EIOCRRFPOAD'].Items[3].Value">
              <div class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFPOAD'].Items[4].Value || 'N/A'}}</div>
              <textarea-autosize v-else class="form-control" rows="3" :placeholder="__label(MASTERDATA['EIOCRRFPOAD'].Items[4])" v-model="MASTERDATA['EIOCRRFPOAD'].Items[4].Value"/>
            </template>
          </td>
        </tr>
        <tr>
          <td>{{__label(MASTERDATA['EIOCRRFCAOD'])}}</td>
          <td colspan="3">
            <div class="fake-input disable bl-input" v-if="isReadonly">{{MASTERDATA['EIOCRRFCAOD'].Items[0].Value || 'N/A'}}</div>
            <textarea-autosize v-else class="form-control" rows="3" :placeholder="__label(MASTERDATA['EIOCRRFCAOD'].Items[0])" v-model="MASTERDATA['EIOCRRFCAOD'].Items[0].Value"/>
          </td>
        </tr>
        <tr>
          <td>{{__label(MASTERDATA['EIOCRRFICDT'])}}</td>
          <td colspan="3" style="padding: 10px">
            <icd10View v-if="isReadonly" v-model="MASTERDATA['EIOCRRFICDT'].Items[0].Value"/>
            <icd10 v-else v-model="MASTERDATA['EIOCRRFICDT'].Items[0].Value"/>
          </td>
        </tr>
      </table>
      <p>(*)Khoảng thời gian duy trì được ROSC; CPC: Cerebral Performance Category; CCF: chest compression fraction</p>
      <div class="row">
        <div class="col-md-6 col-sm-6 text-center">
          <template v-if="readonly">
            <!-- <p><b>{{__t('Nhóm trưởng ký')}}</b></p> -->
            <template v-if="DataSubmit.TeamLeader && DataSubmit.TeamLeader.Username">
              <!-- <div>{{DataSubmit.TeamLeader.Fullname}}</div>
              <div><ad-Info :ad="DataSubmit.TeamLeader.Username" /></div> -->
              <p class="text-center">{{ getFTime(DataSubmit.TeamLeaderTime) }}</p>
              <EformSignature2 :title="__t('Nhóm trưởng ký')" :ad="DataSubmit.TeamLeader.Username"/>
            </template>
            <template v-else>
              <p><b>{{__t('Nhóm trưởng ký')}}</b></p>
              <p class="italic" style="color: green">({{__t('Chưa ký xác nhận')}})</p>
            </template>
            <!-- <p v-else class="italic" style="color: green">({{__t('Chưa ký xác nhận')}})</p> -->
          </template>
          <template v-else>
            <div v-if="DataSubmit.TeamLeader && DataSubmit.TeamLeader.Username">
              <p class="text-center">{{ getFTime(DataSubmit.TeamLeaderTime) }}</p>
              <EformSignature2 :title="__t('Nhóm trưởng ký')" :ad="DataSubmit.TeamLeader.Username"/>
            </div>
            <div v-else>
              <p><b>{{__t('Nhóm trưởng ký')}}</b></p>
                <button @click="showDoctorConfirm('TeamLeader', 'Nhóm trưởng ký')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
              </div>
          </template>
        </div>
        <div class="col-md-6 col-sm-6 text-center">
          <template v-if="readonly">
            <!-- <p><b>{{__t('Người lập bảng')}}</b></p> -->
            <template v-if="DataSubmit.FormCompleted && DataSubmit.FormCompleted.Username">
              <p class="text-center">{{ getFTime(DataSubmit.FormCompletedTime) }}</p>
              <EformSignature2 :title="__t('Người lập bảng')" :ad="DataSubmit.FormCompleted.Username"/>
            </template>
            <template v-else>
              <p><b>{{__t('Người lập bảng')}}</b></p>
              <p class="italic" style="color: green">({{__t('Chưa ký xác nhận')}})</p>
            </template>
          </template>
          <template v-else>
            <div v-if="DataSubmit.FormCompleted && DataSubmit.FormCompleted.Username">
              <p class="text-center">{{ getFTime(DataSubmit.FormCompletedTime) }}</p>
              <EformSignature2 :title="__t('Người lập bảng')" :ad="DataSubmit.FormCompleted.Username"/>
            </div>
            <div v-else>
                <p><b>{{__t('Người lập bảng')}}</b></p>
                <button @click="showDoctorConfirm('Doctor', 'Bác sĩ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </template>
        </div>
      </div>
      <br/><br/>
      <LastUpdateWithFormCode :FormCode="'A03_050_120421_VE'" :DataSubmit="DataSubmit"/>
      <!-- <p>A03_050_120421_VE</p>
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit.UpdatedBy" :ad="DataSubmit.UpdatedBy" /> {{__t('lúc')}} {{ DataSubmit.UpdatedAt | formatDateWithoutSecon}}</p> -->
      <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
        <div class="box v-model-content-popup">
          <div class="box-header text-center">
            <h3 class="box-title">{{__t(popupTitle)}}.</h3>
            <div style="color: #fff">{{__t('Bác sĩ đang thực hiện tao tác xác nhận bảng hồi sinh tim phổi bao gồm thông tin hồi sinh tim phổi và bảng hồi sinh tim phổi. Để xác nhận, nhập thông tin đăng nhập phía dưới')}}</div>
          </div>
          <div class="form-confirm">
            <div class="form-group has-feedback">
              <input v-model="user.username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <input v-model="user.password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
              <div class="col-xs-6">
                <button type="button" class="btn btn-block v-white-btn" @click="$modal.hide('doctorConfirm')">{{__t('Thoát')}}</button>
              </div>
              <div class="col-xs-6">
                <button type="button" class="btn btn-block v-yellow-btn" @click="confirm()">{{__t('Xác nhận')}}</button>
              </div>
            </div>
            <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính')}}</p>
            <p style="margin-top: 10px; text-align:center">{{__t('Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu')}}</p>
          </div>
        </div>
      </modal>
      <div class="status-float-block" v-if="!isReadonly">
        <div class="action-btn-block">
          <div class="container">
            <div class="content-container">
              <div class="row">
                <div class="col-md-2 col-sm-2">
                  <div class="form-group1">
                    <button class="btn btn-block v-white-btn" type="button" @click="handleBack"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                  </div>
                </div>
                <div class="col-md-4 col-sm-4">
                  <div class="form-group1">
                    <p class="hidden-text">hidden-text</p>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6">
                  <div class="form-group1">
                    <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import _ from 'lodash'
import VDatePicker from '@/components/VDateTimePicker.vue'
import CardiacArrestRecord from '@/services/CardiacArrestRecord'
import NProgress from 'nprogress'
import Logs from '@/components/Logs.vue'
export default {
  name: 'CardiacArrestRecordV2',
  props: ['formdata', 'VisitType', 'readonly', 'VisitId'],
  mixins: [MixinMasterData, MixinForm],
  components: {
    VDatePicker, Logs
  },
  data () {
    return {
      loaded: false,
      DataSubmit: null,
      user: {},
      popupTitle: '',
      dataMaster: null
    }
  },
  watch: {
    DataSubmit: {
      handler (a, b) {
        this.edited = true
      },
      deep: true
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'EIOCRRF'}, () => {
      this.getData()
    })
  },
  computed: {
    isReadonly: function () {
      return !this.DataSubmit || this.DataSubmit.TeamLeader.Username || this.DataSubmit.FormCompleted.Username || this.readonly
    }
  },
  methods: {
    push2Wh (data) {
      if (data.Weight) this.MASTERDATA['EIOCRRFWEIG'].Items[0].Value = data.Weight
      if (data.Height) this.MASTERDATA['EIOCRRFHEIG'].Items[0].Value = data.Height
    },
    checkbox2Radio (items, item) {
      items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'CheckBox')) {
            element.Value = false
          }
        }
      })
    },
    async confirm () {
      if (this.edited) {
        await this.save()
      }
      new CardiacArrestRecord(this._VisitType).update('Confirm/' + this._VisitId, this.user).then(response => {
        this.$modal.hide('doctorConfirm')
        this.reload()
        this.toastedSuccess(this.$t('Xác nhận thành công'))
      }).catch(e => {
        this.$modal.hide('doctorConfirm')
      })
    },
    showDoctorConfirm (kind, title, id) {
      this.confirmId = id
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    save () {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (item.Code === 'EIOJCGMJCTANS' && typeof item.Value === 'object') {
              val = this.moment2String(item.Value, this.vDateFormat)
            }
            if (item.Code === 'EIOCRRFICDTANS') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'EIOCAARRETIMANS' && typeof item.Value === 'object') {
              val = this.moment2String(item.Value)
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
      this.DataSubmit.Table = this.DataSubmit.Table.filter(e => !e.removed)
      return new CardiacArrestRecord(this._VisitType).update('Info/' + this._VisitId, this.DataSubmit).then(response => {
        this.toastedSuccess()
        this.edited = false
        this.reload()
      })
    },
    getData () {
      this.DataSubmit = this.formdata
      console.log('DataSubmit', this.DataSubmit)
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (item.Code === 'EIOCRRFICDTANS') {
                item.Value = this.JSONParse(exited.Value)
              } else {
                item.Value = exited.Value
              }
            }
          })
        }
      }
      this.dataMaster = JSON.stringify(this.MASTERDATA)
      setTimeout(() => {
        this.edited = false
      }, 100)
      this.loaded = true
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    // popup canh bao
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
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>
