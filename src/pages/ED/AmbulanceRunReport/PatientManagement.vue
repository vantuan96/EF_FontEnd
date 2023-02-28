<template>
  <div class="main-content">
    <template v-if="loaded">
      <div v-if="isConfirm">
        <PatientManagementView :ViewOnly="true" :VisitId="VisitId" />
      </div>
      <div v-else>
      <div v-if="DataSubmit">
        <table class="table v-table-1">
          <tr v-if="MASTERDATA['EDARRPAMAACCI']">
            <th width="1">{{__label(MASTERDATA['EDARRPAMAACCI'])}}</th>
            <td>
              <div class="flex-container">
                <div class="padding5-10 border-right-1">
                  <div class="group-radio" :data="item" :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMAACCI'].Items">
                    <span>
                      <input type="checkbox" :id="'EDARRPAMAACCIradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAACCIradio-' + index" @click="checkbox2Radio(MASTERDATA['EDARRPAMAACCI'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </div>
                <div class="flex-box" v-if="MASTERDATA['EDARRPAMAACCI'].Items[0].Value" style="flex-flow: row wrap;">
                  <div class="padding5-10 min-width-150 border-right-1">
                    <p>{{__label(MASTERDATA['EDARRPAMAPLAC'])}}</p>
                    <textarea-autosize :code="MASTERDATA['EDARRPAMAPLAC'].Items[0].Code" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAMAPLAC'].Items[0].Value"/>
                  </div>
                  <div class="padding5-10 min-width-150 border-right-1">
                    <p>{{__label(MASTERDATA['EDARRPAMAACDT'])}}</p>
                    <v-date-picker :format="'HH:mm DD/MM/YYYY'" v-model="MASTERDATA['EDARRPAMAACDT'].Items[0].Value" class="full-w"/>
                  </div>
                  <div class="flex-break-sm"></div>
                  <div class="padding5-10 min-width-150 border-right-1">
                    <p>{{__label(MASTERDATA['EDARRPAMAPONO'])}}</p>
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMAPONO'].Items">
                        <input type="checkbox" :id="'EDARRPAMAPONOradio-' + index" v-model="item.Value">
                        <label :for="'EDARRPAMAPONOradio-' + index" @click="checkbox2Radio(MASTERDATA['EDARRPAMAPONO'].Items, item)">{{__label(item)}}</label>
                      </span>
                    </div>
                  </div>
                  <div class="padding5-10 min-width-150">
                    <p>{{__label(MASTERDATA['EDARRPAMAINSU'])}}</p>
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMAINSU'].Items">
                        <input type="checkbox" :id="'EDARRPAMAINSUradio-' + index" v-model="item.Value">
                        <label :for="'EDARRPAMAINSUradio-' + index" @click="checkbox2Radio(MASTERDATA['EDARRPAMAINSU'].Items, item)">{{__label(item)}}</label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMACOOA']">
            <th>
              {{__label(MASTERDATA['EDARRPAMACOOA'])}}
            </th>
            <td>
              <div class="row">
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMACOOA'].Items" v-if="index !== 6">
                  <div class="flex-box flex-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMACOOAradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMACOOAradio-' + index"></label>
                    </div>
                    <span class="displaytbl" :class="{'no-wrap': index === 5}"><span>{{__label(item)}}</span></span>
                    <input :placeholder="__t('Nhập')" v-if="MASTERDATA['EDARRPAMACOOA'].Items[5].Value && index === 5" class="form-control ml-5" v-model="MASTERDATA['EDARRPAMACOOA'].Items[6].Value" />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAACCB']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAACCB'])}}
            </th>
            <td>
              <div class="row">
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAACCB'].Items" v-if="index !== 3">
                  <div class="flex-box flex-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMAACCBradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAACCBradio-' + index"></label>
                    </div>
                    <span class="displaytbl" :class="{'no-wrap': index === 2}"><span>{{__label(item)}}</span></span>
                    <input :placeholder="__t('Nhập')" v-if="MASTERDATA['EDARRPAMAACCB'].Items[2].Value && index === 2" class="ml-5 form-control" v-model="MASTERDATA['EDARRPAMAACCB'].Items[3].Value" />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMALISI']">
            <th>
              {{__label(MASTERDATA['EDARRPAMALISI'])}}
            </th>
            <td>
              <div class="group-radio">
                <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMALISI'].Items">
                  <input type="checkbox" :id="'EDARRPAMALISIradio-' + index" v-model="item.Value">
                  <label :for="'EDARRPAMALISIradio-' + index" @click="checkbox2Radio(MASTERDATA['EDARRPAMALISI'].Items, item)">{{__label(item)}}</label>
                </span>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAMEDI']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAMEDI'])}}
            </th>
            <td>
              <div class="group-radio">
                <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMAMEDI'].Items">
                  <input type="checkbox" :id="'EDARRPAMAMEDIradio-' + index" v-model="item.Value">
                  <label :for="'EDARRPAMAMEDIradio-' + index" @click="checkbox2Radio(MASTERDATA['EDARRPAMAMEDI'].Items, item)">{{__label(item)}}</label>
                </span>
              </div>
              <br v-if="MASTERDATA['EDARRPAMAMEDI'].Items[0].Value"/>
              <list-of-current-medications
                v-if="MASTERDATA['EDARRPAMAMEDI'].Items[0].Value"
                ref="ListOfCurrentMedications"
                :Type="'ED-PatientManagement'"
                :VisitTypeGroupCode="'ED'"
                />
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAREAD']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAREAD'])}}
            </th>
            <td>
              <textarea-autosize :code="MASTERDATA['EDARRPAMAREAD'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAMAREAD'].Items[0].Value"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAHOPI']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAHOPI'])}}
            </th>
            <td>
              <textarea-autosize :code="MASTERDATA['EDARRPAMAHOPI'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAMAHOPI'].Items[0].Value"/>
              <div class="HistoryOfPresentIllness"  v-if="SyncHistoryOfPresentIllness && SyncHistoryOfPresentIllness.length">
                <label> {{__t('Thông tin khai thác bệnh sử')}}</label>
                <vue-scrolling-table v-if="SyncHistoryOfPresentIllness.length">
                  <template slot="tbl">
                    <table class="table table-bordered table-bordered-x">
                      <thead>
                        <tr>
                          <th width="130" class="no-wrap text-left">{{__t('Ngày khám')}}</th>
                          <th width="1" class="no-wrap text-left">{{__t('Người tạo')}}</th>
                          <th width="1" class="no-wrap text-left">{{__t('Khoa Phòng')}}</th>
                          <th class="text-left">{{__t('Nội dung')}}</th>
                          <th width="1"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr :data="HistoryOfPresent" :key="index"  v-for="(HistoryOfPresent, index) in SyncHistoryOfPresentIllness">
                          <td class="no-wrap">{{HistoryOfPresent.ExaminationTime}}</td>
                          <td class="no-wrap"><ad-Info :ad="HistoryOfPresent.Username" :type="HistoryOfPresent.Type"/></td>
                          <td class="no-wrap text-left">{{__label(HistoryOfPresent)}}</td>
                          <td class="text-left"><p v-if="HistoryOfPresent.HistoryOfPresentIllness">{{HistoryOfPresent.HistoryOfPresentIllness}}</p></td>
                          <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToOPDOENHPI(HistoryOfPresent.HistoryOfPresentIllness)">Copy</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </vue-scrolling-table>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAPAMH']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAPAMH'])}}
            </th>
            <td>
              <textarea-autosize :code="MASTERDATA['EDARRPAMAPAMH'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAMAPAMH'].Items[0].Value"/>
              <div class="HistoryOfPresentIllness"  v-if="SyncPastMedicalHistory && SyncPastMedicalHistory.length">
                <label>{{__t('Thông tin khai thác tiền sử bệnh')}}</label>
                <vue-scrolling-table v-if="SyncPastMedicalHistory.length">
                  <template slot="tbl">
                    <table class="table table-bordered table-bordered-x">
                      <thead>
                        <tr>
                          <th width="1" class="no-wrap text-left">{{__t('Ngày khám')}}</th>
                          <th width="1" class="no-wrap text-left">{{__t('Bác sĩ khám')}}</th>
                          <th width="1" class="no-wrap text-left">{{__t('Khoa Phòng')}}</th>
                          <th class="text-left">{{__t('Tiền sử bệnh')}}</th>
                          <th width="1"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr :data="item" :key="index"  v-for="(item, index) in SyncPastMedicalHistory">
                          <td class="no-wrap">{{item.ExaminationTime}}</td>
                          <td class="no-wrap"><ad-Info :ad="item.PrimaryDoctor" :type="item.Type" /></td>
                          <td class="no-wrap">{{__label(item.Clinic)}}</td>
                          <td><p v-if="item.Value">{{item.Value}}</p></td>
                          <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyOPDOENPMH(item.Value)">Copy</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </vue-scrolling-table>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAALLE']" class="borded-bottom highlighted-radio">
            <th>{{__label(MASTERDATA['EDARRPAMAALLE'])}}</th>
            <td>
              <div class="group-radio">
                <template :data="item"  v-for="(item,index) in MASTERDATA['EDARRPAMAALLE'].Items">
                  <span :key="index" v-if="item.DataType === 'Radio'">
                    <input :class="'highlight-yes-radio-' + index" type="checkbox" :id="'EDARRPAMAALLEradio-' + index" v-model="item.Value">
                    <label :for="'EDARRPAMAALLEradio-' + index" @click="checkbox2Radio(MASTERDATA['EDARRPAMAALLE'].Items, item)">{{__label(item)}}</label>
                  </span>
                  <span :key="index" v-else-if="item.DataType === 'Select'">
                    <allergies-select v-model="item.Value" :multi="true" :items="allergies" v-if="MASTERDATA['EDARRPAMAALLE'].Items[0].Value"/>
                  </span>
                  <span :key="index" v-else style="flex-grow: 1;">
                    <textarea-autosize :placeholder="__t('Nhập')" :code="MASTERDATA['EDARRPAMAALLE'].Items[0].Code" class="form-control" v-model="item.Value" v-if="MASTERDATA['EDARRPAMAALLE'].Items[0].Value"/>
                  </span>
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMATIME']">
            <th>
              <div class="mb-5 no-wrap"><span class="hidden-text"></span>{{__t('Dấu hiệu sinh tồn')}}</div>
              <v-date-picker :format="'HH:mm DD/MM/YYYY'" v-model="MASTERDATA['EDARRPAMATIME'].Items[0].Value" class="wmg"/>
            </th>
            <td>
              <div class="mb-5">
                <div class="w150 display-inline mr-10">
                  <div :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMABLPR'].Items">
                    <div class="mb-5">{{__label(item)}} <span v-if="item.Note" class="note-text">({{__t(item.Note)}})</span></div>
                    <input class="form-control" v-model="item.Value" :placeholder="__t('Nhập')" />
                  </div>
                </div>
                <div class="w150 display-inline mr-10">
                  <div :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMAHERA'].Items">
                    <div class="mb-5">{{__label(item)}} <span v-if="item.Note" class="note-text">({{__t(item.Note)}})</span></div>
                    <input class="form-control" v-model="item.Value" :placeholder="__t('Nhập')" />
                  </div>
                </div>
                <div class="w150 display-inline mr-10">
                  <div :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMARERA'].Items">
                    <div class="mb-5">{{__label(item)}} <span v-if="item.Note" class="note-text">({{__t(item.Note)}})</span></div>
                    <input class="form-control" v-model="item.Value" :placeholder="__t('Nhập')"/>
                  </div>
                </div>
                <div class="w150 display-inline mr-10">
                  <div :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMASPO2'].Items">
                    <div class="mb-5">{{__label(item)}} <span v-if="item.Note" class="note-text">({{__t(item.Note)}})</span></div>
                    <input class="form-control" v-model="item.Value" :placeholder="__t('Nhập')"/>
                  </div>
                </div>
              </div>
              <div class="mt-5 mb-5">
                <div class="mb-5">{{__label(MASTERDATA['EDARRPAMATEMP'])}}<span class="note-text"> ({{__t('Độ C')}})</span></div>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMATEMP'].Items" v-if="index < 3">
                    <input type="checkbox" :id="'EDARRPAMATEMPradio-' + index" v-model="item.Value">
                    <label :for="'EDARRPAMATEMPradio-' + index" @click="checkbox2Radio(MASTERDATA['EDARRPAMATEMP'].Items, item)">{{__label(item)}}</label>
                  </span>
                  <input v-if="MASTERDATA['EDARRPAMATEMP'].Items.find(e => e.Value && e.DataType === 'Radio')" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['EDARRPAMATEMP'].Items[3].Value" />
                </div>
              </div>
              <div v-if="MASTERDATA['EDARRPAMAHEIG']" class="mt-5">
                <div class="w150 display-inline mr-10">
                  <div :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMAHEIG'].Items">
                    <div class="mb-5">{{__label(item)}} <span v-if="item.Note" class="note-text">({{__t(item.Note)}})</span></div>
                    <input class="form-control" v-model="item.Value" :placeholder="__t('Nhập')"/>
                  </div>
                </div>
                <div class="w150 display-inline mr-10">
                  <div :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMAWEIG'].Items">
                    <div class="mb-5">{{__label(item)}} <span v-if="item.Note" class="note-text">({{__t(item.Note)}})</span></div>
                    <input class="form-control" v-model="item.Value" :placeholder="__t('Nhập')"/>
                  </div>
                </div>
                <div class="w150 display-inline mr-10">
                  <div class="mb-5">BMI</div>
                  <input type="number" class="v-input-md2 form-control" readonly :value="bmiCalculation"/>
                </div>
                <height-and-weight v-if="DataSubmit.IsNew" @copy="push2Wh" />
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAVACC']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAVACC'])}}
            </th>
            <td>
              <textarea-autosize :code="MASTERDATA['EDARRPAMAVACC'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAMAVACC'].Items[0].Value"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAMEST']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAMEST'])}}
            </th>
            <td>
              <div class="row">
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAMEST'].Items" v-if="index !== 6">
                  <div class="flex-box flex-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMAMESTradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAMESTradio-' + index"></label>
                    </div>
                    <span class="displaytbl" :class="{'no-wrap': index === 5}"><span>{{__label(item)}}</span></span>
                    <template v-if="MASTERDATA['EDARRPAMAMEST'].Items[5].Value && index === 5">
                      <v-select :disabeleclear="true" class='display-inline ml-5' v-model="MASTERDATA['EDARRPAMAMEST'].Items[6].Value" :placeholder="__t('Chọn')" :items="itemsOption(15)"/>/15
                    </template>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMASKIN']">
            <th>
              {{__label(MASTERDATA['EDARRPAMASKIN'])}}
            </th>
            <td>
              <div class="row">
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMASKIN'].Items">
                  <div class="flex-box flex-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMASKINradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMASKINradio-' + index"></label>
                    </div>
                    <span class="displaytbl"><span>{{__label(item)}}</span></span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAPAI']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAPAI'])}}
            </th>
            <td>
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="group-radio">
                    <div v-if="item.DataType === 'Radio'" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAPAI'].Items">
                      <span>
                        <input type="checkbox" :id="'EDARRPAMAPAIradio-' + index" v-model="item.Value">
                        <label :for="'EDARRPAMAPAIradio-' + index" @click="checkbox2Radio2(MASTERDATA['EDARRPAMAPAI'].Items, item)">{{__label(item)}}</label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['EDARRPAMAPAI'].Items[0].Value">
                <div  v-if="item.DataType === 'Checkbox'"  class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAPAI'].Items">
                  <div class="flex-box flex-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMAPAIcxo-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAPAIcxo-' + index"></label>
                    </div>
                    <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    <input :placeholder="__t('Nhập')" v-if="MASTERDATA['EDARRPAMAPAI'].Items[4].Value && index === 4" class="form-control" v-model="MASTERDATA['EDARRPAMAPAI'].Items[5].Value" />
                  </div>
                </div>
              </div>
              <div class="mt-10" v-if="MASTERDATA['EDARRPAMAPAI'].Items[0].Value">
                {{__label(MASTERDATA['EDARRPAMAPAI'].Items[10])}}:  <v-date-picker class="w150 display-inline" :format="'HH:mm DD/MM/YYYY'" v-model="MASTERDATA['EDARRPAMAPAI'].Items[10].Value"/>
              </div>
              <div class="mt-10" v-if="MASTERDATA['EDARRPAMAPAI'].Items[0].Value">
                {{__label(MASTERDATA['EDARRPAMAPAI'].Items[11])}}:  <v-select :disabeleclear="true" class='display-inline' v-model="MASTERDATA['EDARRPAMAPAI'].Items[11].Value" :placeholder="__t('Chọn')" :items="EDARRPAMAPAI"/>/10
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMABEH']">
            <th>
              {{__label(MASTERDATA['EDARRPAMABEH'])}}
            </th>
            <td>
              <div class="row">
                <div :class="{'col-md-12 col-sm-12': index === 6, 'col-md-4 col-sm-6': index !== 6}" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMABEH'].Items" v-if="index !== 7">
                  <div class="flex-box flex-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMABEHradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMABEHradio-' + index"></label>
                    </div>
                    <span class="displaytbl" :class="{'no-wrap': index === 6}"><span>{{__label(item)}}</span></span>
                    <input :placeholder="__t('Nhập')" v-if="MASTERDATA['EDARRPAMABEH'].Items[6].Value && index === 6" class="form-control ml-5" v-model="MASTERDATA['EDARRPAMABEH'].Items[7].Value" />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMANEU']">
            <th>
              {{__label(MASTERDATA['EDARRPAMANEU'])}}
            </th>
            <td>
              <div class="flex-box flex-center" v-if="MASTERDATA['EDARRPAMAPUPI']">
                <div>
                  <b class="mr-10">{{__label(MASTERDATA['EDARRPAMAPUPI'])}}:</b>
                </div>
                <div>
                  <div>
                    <span class="mr-10">{{__t('Độ giãn của đồng tử')}}</span>
                    <v-select :disabeleclear="true" class='display-inline' v-model="MASTERDATA['EDARRPAMAPUPI'].Items[0].Value" :placeholder="__t('Chọn')" :items="itemsOption(8)"/>/8
                    <img class="ml-10" src="/static/dong_tu.png" />
                  </div>
                  <div>
                    <div class="flex-box flex-center">
                      <template :data="item"  v-for="(item, index) in MASTERDATA['EDARRPAMAPUPI'].Items" v-if="index">
                        <template v-if="item.DataType === 'Checkbox'">
                          <div class="v-checkbox" :key="index + 'checbox'">
                            <input type="checkbox" :id="'EDARRPAMAPUPIradio-' + index" v-model="item.Value">
                            <label :for="'EDARRPAMAPUPIradio-' + index"></label>
                          </div>
                          <span :key="index + 'label'" class="displaytbl"><span>{{__label(item)}}</span></span>
                        </template>
                        <template v-if="item.DataType === 'Text' && MASTERDATA['EDARRPAMAPUPI'].Items[index - 1].Value" >
                          <input :placeholder="__t('Nhập')" :key="index + 'input'"  class="form-control v-input-md2 ml-5" v-model="item.Value" /> mm
                        </template>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-box flex-center mt-10" v-if="MASTERDATA['EDARRPAMAREAC']">
                <div>
                  <b class="mr-10">{{__label(MASTERDATA['EDARRPAMAREAC'])}}:</b>
                </div>
                <div>
                  <div class="flex-box flex-center">
                    <template :data="item"  v-for="(item, index) in MASTERDATA['EDARRPAMAREAC'].Items">
                      <template v-if="item.DataType === 'Checkbox'">
                        <div class="v-checkbox" :key="index + 'checbox'">
                          <input type="checkbox" :id="'EDARRPAMAREACradio-' + index" v-model="item.Value">
                          <label :for="'EDARRPAMAREACradio-' + index"></label>
                        </div>
                        <span :key="index + 'label'" class="displaytbl"><span>{{__label(item)}}</span></span>
                      </template>
                      <template v-if="item.DataType === 'Text' && MASTERDATA['EDARRPAMAREAC'].Items[index - 1].Value" >
                        <input :placeholder="__t('Nhập')" :key="index + 'input'"  class="form-control v-input-md2 ml-5" v-model="item.Value" /> mm
                      </template>
                    </template>
                  </div>
                </div>
              </div>
              <div v-if="MASTERDATA['EDARRPAMAPARA']" class="mt-10">
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMAPARA'].Items" v-if="!index">
                    <input type="checkbox" :id="'EDARRPAMAPARAradio-' + index" v-model="item.Value">
                    <label :for="'EDARRPAMAPARAradio-' + index" @click="checkbox2Radio(MASTERDATA['EDARRPAMAPARA'].Items, item)">{{__label(item)}}</label>
                  </span>
                  <input v-if="MASTERDATA['EDARRPAMAPARA'].Items[0].Value" :placeholder="__t('Nhập')" class="form-control ml-5" v-model="MASTERDATA['EDARRPAMAPARA'].Items[1].Value" />
                </div>
              </div>
              <div v-if="MASTERDATA['EDARRPAMACRNP']" class="mt-10">
                <div class="group-radio">
                  <span>
                    <input type="checkbox" :id="'EDARRPAMACRNPradio-0'" v-model="MASTERDATA['EDARRPAMACRNP'].Items[0].Value">
                    <label :for="'EDARRPAMACRNPradio-0'">{{__label(MASTERDATA['EDARRPAMACRNP'].Items[0])}}</label>
                  </span>
                  <input v-if="MASTERDATA['EDARRPAMACRNP'].Items[0].Value" :placeholder="__t('Nhập')" class="form-control" v-model="MASTERDATA['EDARRPAMACRNP'].Items[1].Value" />
                </div>
              </div>
              <div class="flex-box flex-center mt-10" v-if="MASTERDATA['EDARRPAMASTNB']">
                <div>
                  <div class="group-radio">
                    <span>
                      <input type="checkbox" :id="'EDARRPAMASTNBradio-0'" v-model="MASTERDATA['EDARRPAMASTNB'].Items[0].Value">
                      <label :for="'EDARRPAMASTNBradio-0'">{{__label(MASTERDATA['EDARRPAMASTNB'].Items[0])}}</label>
                    </span>
                  </div>
                </div>
                <div v-if="MASTERDATA['EDARRPAMASTNB'].Items[0].Value">
                  <div class="flex-box flex-center">
                    <template :data="item"  v-for="(item, index) in MASTERDATA['EDARRPAMASTNB'].Items" v-if="index">
                      <template v-if="item.DataType === 'Checkbox'">
                        <div class="v-checkbox" :key="index + 'checbox'">
                          <input type="checkbox" :id="'EDARRPAMASTNBradio-' + index" v-model="item.Value">
                          <label :for="'EDARRPAMASTNBradio-' + index"></label>
                        </div>
                        <span :key="index + 'label'" class="displaytbl"><span>{{__label(item)}}</span></span>
                      </template>
                      <template v-if="item.DataType === 'Text' && MASTERDATA['EDARRPAMASTNB'].Items[index - 1].Value" ><input :placeholder="__t('Nhập')" :key="index + 'input'"  class="form-control v-input-md2 ml-5" v-model="item.Value" /> mm</template>
                    </template>
                  </div>
                </div>
              </div>
              <div v-if="MASTERDATA['EDARRPAMALOOS']" class="mt-10 flex-box flex-center">
                <b class="no-wrap mr-10">{{__label(MASTERDATA['EDARRPAMALOOS'])}}:</b>
                <textarea-autosize :code="MASTERDATA['EDARRPAMALOOS'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAMALOOS'].Items[0].Value"/>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAPALO']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAPALO'])}}
            </th>
            <td>
              <div class="text-center">
                <div class="EDARRPAMAPALO-BG">
                  <img src="static/image_5.png" style="width: 550px" />
                  <div class="paint-content">
                    <Painting v-model="MASTERDATA['EDARRPAMAPALO'].Items[0].Value" />
                  </div>
                </div>
              </div>
              <textarea-autosize :code="MASTERDATA['EDARRPAMAPALO'].Items[1].Code" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAMAPALO'].Items[1].Value"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMACARD']">
            <th>
              {{__label(MASTERDATA['EDARRPAMACARD'])}}
            </th>
            <td>
              <div class="flex-box flex-center bb1 mb10">
                <div><b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMACHPA'])}}:</b></div>
                <div class="flex-box flex-center">
                  <div class="group-radio" v-if="item.DataType === 'Radio'" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMACHPA'].Items">
                    <span>
                      <input type="checkbox" :id="'EDARRPAMACHPAradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMACHPAradio-' + index" @click="checkbox2Radio2(MASTERDATA['EDARRPAMACHPA'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                  <div class="flex-box flex-center" style="flex-flow: row wrap;" v-if="MASTERDATA['EDARRPAMACHPA'].Items[0].Value">
                    <template :data="item"  v-for="(item, index) in MASTERDATA['EDARRPAMACHPA'].Items">
                      <template v-if="item.DataType === 'Checkbox'">
                        <div :key="index + 'checboxEDARRPAMACHPA'" class="flex-box flex-center">
                          <div class="v-checkbox" >
                            <input type="checkbox" :id="'EDARRPAMACHPAradio-' + index" v-model="item.Value">
                            <label :for="'EDARRPAMACHPAradio-' + index"></label>
                          </div>
                          <span class="displaytbl"><span>{{__label(item)}}</span></span>
                          <div v-if="index === 5"  class="flex-break-sm"></div>
                        </div>
                      </template>
                    </template>
                  </div>
                </div>
              </div>
              <div class="flex-box flex-center bb1 mb10">
                <div><b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMAEDEM'])}}:</b></div>
                <div class="flex-box flex-center">
                  <div class="group-radio" v-if="item.DataType === 'Radio'" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAEDEM'].Items">
                    <span>
                      <input type="checkbox" :id="'EDARRPAMAEDEMradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAEDEMradio-' + index" @click="checkbox2Radio2(MASTERDATA['EDARRPAMAEDEM'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex-box flex-center bb1 mb10">
                <div><b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMARESP'])}}:</b></div>
                <div style="flex-grow: 1;">
                  <div class="row">
                    <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMARESP'].Items">
                      <div class="flex-box flex-center">
                        <div class="v-checkbox">
                          <input type="checkbox" :id="'EDARRPAMARESPradio-' + index" v-model="item.Value">
                          <label :for="'EDARRPAMARESPradio-' + index"></label>
                        </div>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-box flex-center bb1 mb10">
                <div><b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMABRSO'])}}:</b></div>
                <div style="flex-grow: 1;">
                  <div class="row">
                    <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMABRSO'].Items">
                      <div class="flex-box flex-center">
                        <div class="v-checkbox">
                          <input type="checkbox" :id="'EDARRPAMABRSOradio-' + index" v-model="item.Value">
                          <label :for="'EDARRPAMABRSOradio-' + index"></label>
                        </div>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                        <div v-if="index === 1 && MASTERDATA['EDARRPAMABRSO'].Items[1].Value" class="flex-box flex-center">
                          <template v-for="($item, $index) in MASTERDATA['EDARRPAMARONC'].Items">
                            <div class="v-checkbox" :data="$item" :key="$index + 'EDARRPAMARONC'" >
                              <input type="checkbox" :id="'EDARRPAMARONCradio-' + $index" v-model="$item.Value">
                              <label :for="'EDARRPAMARONCradio-' + $index"></label>
                            </div>
                            <span class="displaytbl" :key="$index + 'EDARRPAMARONCx'" ><span>{{__label($item)}}</span></span>
                          </template>
                        </div>
                        <div v-if="index === 2 && MASTERDATA['EDARRPAMABRSO'].Items[2].Value" class="flex-box flex-center">
                          <template v-for="($item, $index) in MASTERDATA['EDARRPAMAABSE'].Items">
                            <div class="v-checkbox" :data="$item" :key="$index + 'EDARRPAMAABSE'" >
                              <input type="checkbox" :id="'EDARRPAMAABSEradio-' + $index" v-model="$item.Value">
                              <label :for="'EDARRPAMAABSEradio-' + $index"></label>
                            </div>
                            <span class="displaytbl" :key="$index + 'EDARRPAMAABSEx'" ><span>{{__label($item)}}</span></span>
                          </template>
                        </div>
                        <div v-if="index === 3 && MASTERDATA['EDARRPAMABRSO'].Items[3].Value" class="flex-box flex-center">
                          <template v-for="($item, $index) in MASTERDATA['EDARRPAMAWHEE'].Items">
                            <div class="v-checkbox" :data="$item" :key="$index + 'EDARRPAMAWHEE'" >
                              <input type="checkbox" :id="'EDARRPAMAWHEEradio-' + $index" v-model="$item.Value">
                              <label :for="'EDARRPAMAWHEEradio-' + $index"></label>
                            </div>
                            <span class="displaytbl" :key="$index + 'EDARRPAMAWHEEx'" ><span>{{__label($item)}}</span></span>
                          </template>
                        </div>
                        <div v-if="index === 4 && MASTERDATA['EDARRPAMABRSO'].Items[4].Value" class="flex-box flex-center">
                          <template v-for="($item, $index) in MASTERDATA['EDARRPAMACRAC'].Items">
                            <div class="v-checkbox" :data="$item" :key="$index + 'EDARRPAMACRAC'" >
                              <input type="checkbox" :id="'EDARRPAMACRACradio-' + $index" v-model="$item.Value">
                              <label :for="'EDARRPAMACRACradio-' + $index"></label>
                            </div>
                            <span class="displaytbl" :key="$index + 'EDARRPAMACRACx'" ><span>{{__label($item)}}</span></span>
                          </template>
                        </div>
                        <div v-if="index === 5 && MASTERDATA['EDARRPAMABRSO'].Items[5].Value" class="flex-box flex-center">
                          <template v-for="($item, $index) in MASTERDATA['EDARRPAMADIMI'].Items">
                            <div class="v-checkbox" :data="$item" :key="$index + 'EDARRPAMADIMI'" >
                              <input type="checkbox" :id="'EDARRPAMADIMIradio-' + $index" v-model="$item.Value">
                              <label :for="'EDARRPAMADIMIradio-' + $index"></label>
                            </div>
                            <span class="displaytbl" :key="$index + 'EDARRPAMADIMIx'" ><span>{{__label($item)}}</span></span>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-box flex-center bb1 mb10">
                <div><b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMAABDO'])}}:</b></div>
                <div style="flex-grow: 1;">
                  <div class="row">
                    <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAABDO'].Items">
                      <div class="flex-box flex-center">
                        <div class="v-checkbox">
                          <input type="checkbox" :id="'EDARRPAMAABDOradio-' + index" v-model="item.Value">
                          <label :for="'EDARRPAMAABDOradio-' + index"></label>
                        </div>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-box flex-center bb1 mb10">
                <div><b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMABOTO'])}}:</b></div>
                <div style="flex-grow: 1;">
                  <div class="row">
                    <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMABOTO'].Items">
                      <div class="flex-box flex-center">
                        <div class="v-checkbox">
                          <input type="checkbox" :id="'EDARRPAMABOTOradio-' + index" v-model="item.Value">
                          <label :for="'EDARRPAMABOTOradio-' + index"></label>
                        </div>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-box flex-center bb1 mb10">
                <div><b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMATEND'])}}:</b></div>
                <div class="flex-box flex-center">
                  <div class="group-radio" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMATEND'].Items">
                    <span>
                      <input type="checkbox" :id="'EDARRPAMATENDradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMATENDradio-' + index" @click="checkbox2Radio2(MASTERDATA['EDARRPAMATEND'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex-box flex-center bb1 mb10">
                <div><b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMAPOSI'])}}:</b></div>
                <div style="flex-grow: 1;">
                  <div class="row">
                    <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAPOSI'].Items">
                      <div class="flex-box flex-center">
                        <div class="v-checkbox">
                          <input type="checkbox" :id="'EDARRPAMAPOSIradio-' + index" v-model="item.Value">
                          <label :for="'EDARRPAMAPOSIradio-' + index"></label>
                        </div>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-box flex-center bb1 mb10">
                <div><b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMAPEAB'])}}:</b></div>
                <div style="flex-grow: 1;">
                  <div class="row">
                    <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAPEAB'].Items">
                      <div class="flex-box flex-center">
                        <div class="v-checkbox">
                          <input type="checkbox" :id="'EDARRPAMAPEABradio-' + index" v-model="item.Value">
                          <label :for="'EDARRPAMAPEABradio-' + index"></label>
                        </div>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="MASTERDATA['EDARRPAMALIVE']" class="flex-box flex-center bb1 mb10">
                <b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMALIVE'])}}:</b>
                <div class="row" style="flex-grow: 1;">
                  <div class="col-md-12">
                    <textarea-autosize :code="MASTERDATA['EDARRPAMALIVE'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAMALIVE'].Items[0].Value"/>
                  </div>
                </div>
              </div>
              <div v-if="MASTERDATA['EDARRPAMASPL']" class="flex-box flex-center">
                <b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMASPL'])}}:</b>
                <div class="row" style="flex-grow: 1;">
                  <div class="col-md-12">
                    <textarea-autosize :code="MASTERDATA['EDARRPAMASPL'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAMASPL'].Items[0].Value"/>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAEXTR']">
            <th>{{__label(MASTERDATA['EDARRPAMAEXTR'])}}</th>
            <td>
              <div class="row">
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAEXTR'].Items">
                  <div class="flex-box flex-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMAEXTRradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAEXTRradio-' + index"></label>
                    </div>
                    <span class="displaytbl"><span>{{__label(item)}}</span></span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAGENI']">
            <th>{{__label(MASTERDATA['EDARRPAMAGENI'])}}</th>
            <td>
              <div class="row">
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAGENI'].Items">
                  <div class="flex-box flex-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMAGENIradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAGENIradio-' + index"></label>
                    </div>
                    <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    <div v-if="index === 2 && MASTERDATA['EDARRPAMAGENI'].Items[2].Value" class="flex-box flex-center">
                      <template v-for="($item, $index) in MASTERDATA['EDARRPAMAFLPA'].Items">
                        <div class="v-checkbox" :data="$item" :key="$index + 'EDARRPAMAFLPA'" >
                          <input type="checkbox" :id="'EDARRPAMAFLPAradio-' + $index" v-model="$item.Value">
                          <label :for="'EDARRPAMAFLPAradio-' + $index"></label>
                        </div>
                        <span class="displaytbl" :key="$index + 'EDARRPAMAFLPAx'" ><span>{{__label($item)}}</span></span>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAOBGY']">
            <th>{{__label(MASTERDATA['EDARRPAMAOBGY'])}}</th>
            <td>
              <div class="row">
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAOBGY'].Items">
                  <div class="flex-box flex-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMAOBGYradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAOBGYradio-' + index"></label>
                    </div>
                    <span class="displaytbl"><span>{{__label(item)}}</span></span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAERNT']">
            <th>{{__label(MASTERDATA['EDARRPAMAERNT'])}}</th>
            <td>
              <div class="row">
                <div class="col-md-6 col-sm-6">
                  <div class="flex-box flex-center">
                    <label>{{__label(MASTERDATA['EDARRPAMADRAI'])}}:</label>
                    <div class="flex-box flex-center" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMADRAI'].Items">
                      <div class="v-checkbox">
                        <input type="checkbox" :id="'EDARRPAMADRAIradio-' + index" v-model="item.Value">
                        <label :for="'EDARRPAMADRAIradio-' + index"></label>
                      </div>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6">
                  <div class="flex-box flex-center">
                    <label>{{__label(MASTERDATA['EDARRPAMAPAIN'])}}:</label>
                    <div class="flex-box flex-center" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAPAIN'].Items">
                      <div class="v-checkbox">
                        <input type="checkbox" :id="'EDARRPAMAPAINradio-' + index" v-model="item.Value">
                        <label :for="'EDARRPAMAPAINradio-' + index"></label>
                      </div>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-sm-6">
                  <div class="flex-box flex-center">
                    <label>{{__label(MASTERDATA['EDARRPAMATINN'])}}:</label>
                    <div class="flex-box flex-center" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMATINN'].Items">
                      <div class="v-checkbox">
                        <input type="checkbox" :id="'EDARRPAMATINNradio-' + index" v-model="item.Value">
                        <label :for="'EDARRPAMATINNradio-' + index"></label>
                      </div>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6">
                  <div class="flex-box flex-center">
                    <label>{{__label(MASTERDATA['EDARRPAMAACDE'])}}:</label>
                    <div class="flex-box flex-center" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAACDE'].Items">
                      <div class="v-checkbox">
                        <input type="checkbox" :id="'EDARRPAMAACDEradio-' + index" v-model="item.Value">
                        <label :for="'EDARRPAMAACDEradio-' + index"></label>
                      </div>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMACHDE']">
            <th>
              {{__label(MASTERDATA['EDARRPAMACHDE'])}}
            </th>
            <td>
              <div class="row">
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMACHDE'].Items" v-if="index !== 6">
                  <div class="flex-box flex-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMACHDEradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMACHDEradio-' + index"></label>
                    </div>
                    <span class="displaytbl" :class="{'no-wrap': index === 5}"><span>{{__label(item)}}</span></span>
                    <input :placeholder="__t('Nhập')" v-if="MASTERDATA['EDARRPAMACHDE'].Items[5].Value && index === 5" class="form-control ml-5" v-model="MASTERDATA['EDARRPAMACHDE'].Items[6].Value" />
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMANUTR']">
            <th>
              {{__label(MASTERDATA['EDARRPAMANUTR'])}}
            </th>
            <td>
              <div class="row">
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMANUTR'].Items" v-if="index !== 5">
                  <div class="flex-box flex-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMANUTRradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMANUTRradio-' + index"></label>
                    </div>
                    <span class="displaytbl" :class="{'no-wrap': index === 4}"><span>{{__label(item)}}</span></span>
                    <template v-if="MASTERDATA['EDARRPAMANUTR'].Items[4].Value && index === 4"><input :placeholder="__t('Nhập')" class="form-control mr-5 ml-5" v-model="MASTERDATA['EDARRPAMANUTR'].Items[5].Value" /> {{__t('_lần')}}</template>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMACPRB']">
            <th>{{__label(MASTERDATA['EDARRPAMACPRB'])}}</th>
            <td>
              <div class="row">
                <template :data="item" v-for="(item, index) in MASTERDATA['EDARRPAMACPRB'].Items">
                  <div class="col-md-4 col-sm-6" :key="index" v-if="item.DataType === 'Checkbox'" >
                    <div class="flex-box flex-center">
                      <div class="v-checkbox">
                        <input type="checkbox" :id="'EDARRPAMACPRBradio-' + index" v-model="item.Value">
                        <label :for="'EDARRPAMACPRBradio-' + index"></label>
                      </div>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      <div v-if="index === 0 && MASTERDATA['EDARRPAMACPRB'].Items[0].Value">
                        <v-date-picker :format="'HH:mm DD/MM/YYYY'" v-model="MASTERDATA['EDARRPAMACPRB'].Items[1].Value" class="wmg ml-5"/>
                      </div>
                      <div v-if="index === 4 && MASTERDATA['EDARRPAMACPRB'].Items[4].Value">
                        <v-date-picker :format="'HH:mm DD/MM/YYYY'" v-model="MASTERDATA['EDARRPAMACPRB'].Items[5].Value" class="wmg ml-5"/>
                      </div>
                      <div v-if="index === 7 && MASTERDATA['EDARRPAMACPRB'].Items[7].Value" class="ml-5">
                        <textarea-autosize :code="MASTERDATA['EDARRPAMACPRB'].Items[8].Code" class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAMACPRB'].Items[8].Value"/>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMADEPR']">
            <th>{{__label(MASTERDATA['EDARRPAMADEPR'])}}</th>
            <td>
              <div class="row">
                <template :data="item" v-for="(item, index) in MASTERDATA['EDARRPAMADEPR'].Items">
                  <div class="col-md-4 col-sm-4" :key="index" v-if="item.DataType === 'Checkbox'" >
                    <div class="flex-box flex-center">
                      <div class="v-checkbox">
                        <input type="checkbox" :id="'EDARRPAMADEPRradio-' + index" v-model="item.Value">
                        <label :for="'EDARRPAMADEPRradio-' + index"></label>
                      </div>
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-4" :key="index" v-if="item.DataType === 'Datetime'">
                    <div class="flex-box flex-center">
                      <span class="displaytbl"><span class="ml-5">{{__label(item)}}</span></span>
                      <v-date-picker :format="'HH:mm DD/MM/YYYY'" v-model="item.Value" class="wmg ml-5"/>
                    </div>
                  </div>
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAMULT']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAMULT'])}}
            </th>
            <td>
              <table width="100%">
                <tr>
                  <th class="text-left">{{__t('Vị trí chấn thương')}}</th><th class="text-center">{{__t('Đau')}}</th><th class="text-center">{{__t('Bỏng')}}</th><th class="text-center">{{__t('Bắn')}}</th><th class="text-center">{{__t('Bị đâm')}}</th><th class="text-center">{{__t('Gãy')}}</th>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMAHEAD']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMAHEAD'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAHEAD'].Items" class="text-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMAHEADradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAHEADradio-' + index"></label>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMACHES']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMACHES'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMACHES'].Items" class="text-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMACHESradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMACHESradio-' + index"></label>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMANECK']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMANECK'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMANECK'].Items" class="text-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMANECKradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMANECKradio-' + index"></label>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMAFACE']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMAFACE'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAFACE'].Items" class="text-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMAFACEradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAFACEradio-' + index"></label>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMAABDM']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMAABDM'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAABDM'].Items" class="text-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMAABDMradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAABDMradio-' + index"></label>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMAABD']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMAABD'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAABD'].Items" class="text-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMAABDradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAABDradio-' + index"></label>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMABACK']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMABACK'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMABACK'].Items" class="text-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMABACKradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMABACKradio-' + index"></label>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMAPELV']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMAPELV'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAPELV'].Items" class="text-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMAPELVradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMAPELVradio-' + index"></label>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMALEAR']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMALEAR'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMALEAR'].Items" class="text-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMALEARradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMALEARradio-' + index"></label>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMARIAR']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMARIAR'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMARIAR'].Items" class="text-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMARIARradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMARIARradio-' + index"></label>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMALELE']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMALELE'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMALELE'].Items" class="text-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMALELEradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMALELEradio-' + index"></label>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMARILE']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMARILE'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMARILE'].Items" class="text-center">
                    <div class="v-checkbox">
                      <input type="checkbox" :id="'EDARRPAMARILEradio-' + index" v-model="item.Value">
                      <label :for="'EDARRPAMARILEradio-' + index"></label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMANOTE'])}}</td>
                  <td colspan="1000">
                    <textarea-autosize :code="MASTERDATA['EDARRPAMANOTE'].Items[0].Code" class="form-control" rows="2" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAMANOTE'].Items[0].Value"/>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMATRAU']">
            <th>
              {{__label(MASTERDATA['EDARRPAMATRAU'])}}
            </th>
            <td>
              <div class="row">
                <div class="col-md-8">
                  <div class="row">
                    <div class="col-md-6 col-sm-6" v-if="item.DataType === 'Checkbox'" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMATRAU'].Items">
                      <div class="flex-box flex-center">
                        <div class="v-checkbox">
                          <input type="checkbox" :id="'EDARRPAMATRAUradio-' + index" v-model="item.Value">
                          <label :for="'EDARRPAMATRAUradio-' + index"></label>
                        </div>
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-5">
                    <p class="mb-5">{{__label(MASTERDATA['EDARRPAMATRAU'].Items[2])}}</p>
                    <textarea-autosize :code="MASTERDATA['EDARRPAMATRAU'].Items[2].Code" class="form-control" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAMATRAU'].Items[2].Value"/>
                  </div>
                  <p>
                    <img src="/static/image_6.png" />
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <br/>
        <br/>
        <div class="row" v-if="DataSubmit.Version >= 7">
          <div>
            <Confirm
            class="mt-10"
            ref="ConfirmComponent"
            :MasterDataCode="'A03_006_050919_VE'"
            :FormCode="'A03_006_050919_VE'"
            :AdInfo="[DataSubmit.AssessmentPhysician.Username]"
            :VisitId="_VisitId"
            :ReadOnly="false"
            :FormId="DataSubmit.Id"
            :saveSuccesss="saveSuccesss"
            @handleConfirm="submit('confirm')"
            @confirmSuccess="getData()"
            :TabActive="'TAB1'"
          />
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.AssessmentNurseTime && DataSubmit.AssessmentNurse">
              <p>{{DataSubmit.AssessmentNurseTime}}</p>
              <EformSignature :title="('Điều dưỡng đánh giá')" :ad="DataSubmit.AssessmentNurse.Username" />
            </template>
          </div>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.AssessmentPhysicianTime && DataSubmit.AssessmentPhysician">
              <p>{{DataSubmit.AssessmentPhysicianTime}}</p>
              <EformSignature :title="('Bác sĩ đánh giá')" :ad="DataSubmit.AssessmentPhysician.Username" />
            </template>
          </div>
        </div>
        <br/>
        <br/>
        <div class="row">
          <div class="col-md-3 col-sm-3">
            <p v-if="this.$i18n.locale === 'vi'"><b>RRPN</b>: Rì rào phế nang</p>
            <p v-if="this.$i18n.locale === 'en'"><b>RUQ</b>: Right upper quadrant</p>
          </div>
          <div class="col-md-3 col-sm-3">
            <p v-if="this.$i18n.locale === 'en'"><b>LUQ</b>: Left upper quadrant</p>
            <p v-if="this.$i18n.locale === 'en'"><b>RLQ</b>: Right lower quadrant</p>
          </div>
          <div class="col-md-3 col-sm-3">
            <p v-if="this.$i18n.locale === 'en'"><b>LLQ</b>: Left lower quadrant</p>
            <p v-if="this.$i18n.locale === 'en'"><b>ENT</b>: Ear-Nose-Throat</p>
          </div>
          <div class="col-md-3 col-sm-3">
            <p v-if="this.$i18n.locale === 'en'"><b>OB/GYN</b>: Obstetrics and gynaecology</p>
            <p v-if="this.$i18n.locale === 'en'"><b>CPR</b>: Cardiopulmonary resuscitation</p>
          </div>
        </div>
        <div class="mt-20">
          <LastUpdateWithFormCode :FormCode="'A03_006_050919_VE'" :DataSubmit="DataSubmit"/>
        </div>
        <FloatBlock :openBack="true" @handleBack="handleBack">
          <template slot='buttons'>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="form-group1">
                <button v-if="!isConfirm" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </div>
      <div v-else>
        <div class="text-center">
          <p>{{__t('Chưa có bệnh án cấp cứu ngoại viện')}}</p>
          <button class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
        </div>
      </div>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import AmbulanceRunReport from '@/services/ED/AmbulanceRunReport'
import VDatePicker from '@/components/VDateTimePicker.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import VSelect from '@/components/VSelect.vue'
import Painting from '@/components/Painting.vue'
import SyncVisitHistory from '@/services/ED/SyncVisitHistory'
import $ from 'jquery'
import _ from 'lodash'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import Confirm from '@/components/Form/Confirm.vue'
import EIOService from '@/services/IPD/EIOService'
import PatientManagementView from './PatientManagementView.vue'
// import moment from 'moment'
import NProgress from 'nprogress'
export default {
  name: 'PatientManagement',
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      isConfirm: false,
      dataMaster: null,
      confirmData: {},
      EDARRPAMAPAI: [],
      SyncHistoryOfPresentIllness: null,
      SyncPastMedicalHistory: null,
      DataSubmit: null,
      loaded: false,
      saveSuccesss: false,
      allergies: [
        {
          label: 'Thực phẩm',
          value: '1'
        },
        {
          label: 'Thời tiết',
          value: '2'
        },
        {
          label: 'Thuốc',
          value: '3'
        },
        {
          label: 'Khác',
          value: '4'
        }
      ]
    }
  },
  components: {
    VDatePicker, Logs, VSelect, Painting, ListOfCurrentMedications, Confirm, PatientManagementView
  },
  watch: {
    DataSubmit (a, b) {
      if (this.DataSubmit) {
        $('#AmbulanceRunReportTab').show()
      } else {
        $('#AmbulanceRunReportTab').hide()
      }
    },
    MASTERDATA: {
      handler () {
        this.edited = true
      },
      deep: true
    },
    data: {
      handler (a, b) {
        this.edit = true
      },
      deep: true
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'EDARRPAMA'}, () => {
      this.getData()
    })
    for (let index = 0; index < 10; index++) {
      this.EDARRPAMAPAI.push({
        value: String(index + 1),
        label: String(index + 1)
      })
    }
  },
  computed: {
    bmiCalculation: function () {
      var weight = this.MASTERDATA['EDARRPAMAWEIG'].Items[0].Value ? parseFloat(this.MASTERDATA['EDARRPAMAWEIG'].Items[0].Value) : 0
      var height = this.MASTERDATA['EDARRPAMAHEIG'].Items[0].Value ? parseFloat(this.MASTERDATA['EDARRPAMAHEIG'].Items[0].Value) / 100 : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  methods: {
    handleBack () {
      if (this.edited) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
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
    },
    getConfirm () {
      new EIOService().find('ConfirmForms/GetDetail/' + this.DataSubmit.Id).then(res => {
        if (res) {
          this.isConfirm = true
        }
      }).catch((e) => {
      })
    },
    itemsOption (l) {
      var arr = []
      for (let index = 0; index < l; index++) {
        arr.push({
          value: String(index + 1),
          label: String(index + 1)
        })
      }
      return arr
    },
    copyToOPDOENHPI (str) {
      str = this.trim_(str)
      if (this.MASTERDATA['EDARRPAMAHOPI'].Items[0].Value && this.MASTERDATA['EDARRPAMAHOPI'].Items[0].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA['EDARRPAMAHOPI'].Items[0].Value ? (this.trim_(this.MASTERDATA['EDARRPAMAHOPI'].Items[0].Value) + '\n') : ''
        this.MASTERDATA['EDARRPAMAHOPI'].Items[0].Value = this.trim_(old + '-' + str, ', ')
        this.toastedInfo('Đã copy')
      }
    },
    copyOPDOENPMH (str) {
      str = this.trim_(str)
      if (this.MASTERDATA['EDARRPAMAPAMH'].Items[0].Value && this.MASTERDATA['EDARRPAMAPAMH'].Items[0].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA['EDARRPAMAPAMH'].Items[0].Value ? (this.trim_(this.MASTERDATA['EDARRPAMAPAMH'].Items[0].Value) + '\n') : ''
        this.MASTERDATA['EDARRPAMAPAMH'].Items[0].Value = this.trim_(old + '-' + str, ', ')
        this.toastedInfo('Đã copy')
      }
    },
    SyncVisitHistory () {
      new SyncVisitHistory().create({Id: this.$route.params.Id}).then(response => {
        this.SyncHistoryOfPresentIllness = response.HistoryOfPresentIllness
        this.SyncPastMedicalHistory = response.PastMedicalHistory
      })
    },
    submit (confirm) {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (item.Code === 'EDARRPAMAPALOPOI') val = JSON.stringify(item.Value)
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      new AmbulanceRunReport().update('PatientManagement/' + this.$route.params.Id, this.DataSubmit).then(response => {
        if (confirm === 'confirm') {
          this.saveSuccesss = !this.saveSuccesss
        }
        setTimeout(() => {
          this.toastedSuccess().getData()
        }, 500)
        this.edited = false
        if (this.$refs.ListOfCurrentMedications) {
          this.$refs.ListOfCurrentMedications.submit()
        }
        console.log('dsd', this.saveSuccesss)
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    push2Wh (data) {
      if (data.Weight) this.MASTERDATA['EDARRPAMAWEIG'].Items[0].Value = data.Weight
      if (data.Height) this.MASTERDATA['EDARRPAMAHEIG'].Items[0].Value = data.Height
    },
    getData () {
      this.loaded = false
      new AmbulanceRunReport().find('PatientManagement/' + this.$route.params.Id + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.getConfirm()
        this.loaded = true
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
              } else {
              }
            })
          }
        }
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        this.edited = false
        if (response.IsNew) {
          this.getAllergy('EDARRPAMAALLE')
        }
        setTimeout(() => {
          this.SyncVisitHistory()
        }, 500)
      }).catch(e => {
        this.loaded = true
        this.DataSubmit = false
        if (e.status === 404) {}
      })
    },
    create () {
      new AmbulanceRunReport().update(this.$route.params.Id, {}, 'Create/').then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới bệnh án cấp cứu ngoại viện *?'),
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
              this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>
