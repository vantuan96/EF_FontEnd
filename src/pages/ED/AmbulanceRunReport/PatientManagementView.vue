<template>
  <div class="main-content">
    <template v-if="loaded">
      <div v-if="DataSubmit">
        <table class="table v-table-1">
          <tr v-if="MASTERDATA['EDARRPAMAACCI']">
            <th width="1">{{__label(MASTERDATA['EDARRPAMAACCI'])}}</th>
            <td>
              <div class="flex-container">
                <div class="padding5-10 border-right-1">
                  <MDRadioView :data="MASTERDATA['EDARRPAMAACCI'].Items" />
                </div>
                <div class="flex-box" v-if="MASTERDATA['EDARRPAMAACCI'].Items[0].Value" style="flex-flow: row wrap;">
                  <div class="padding5-10 min-width-150 border-right-1">
                    <p>{{__label(MASTERDATA['EDARRPAMAPLAC'])}}</p>
                    <p class="fake-input disable">{{MASTERDATA['EDARRPAMAPLAC'].Items[0].Value}}</p>
                  </div>
                  <div class="padding5-10 min-width-150 border-right-1">
                    <p>{{__label(MASTERDATA['EDARRPAMAACDT'])}}</p>
                    <div class="fake-input disable">{{MASTERDATA['EDARRPAMAACDT'].Items[0].Value}}</div>
                  </div>
                  <div class="flex-break-sm"></div>
                  <div class="padding5-10 min-width-150 border-right-1">
                    <p>{{__label(MASTERDATA['EDARRPAMAPONO'])}}: <MDRadioView :data="MASTERDATA['EDARRPAMAPONO'].Items" /></p>
                  </div>
                  <div class="padding5-10 min-width-150">
                    <p>{{__label(MASTERDATA['EDARRPAMAINSU'])}}: <MDRadioView :data="MASTERDATA['EDARRPAMAINSU'].Items" /></p>
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
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMACOOA'].Items" v-if="index !== 6 && item.Value">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" />
                    <span class="displaytbl" :class="{'no-wrap': index === 5}"><span>{{__label(item)}}</span></span>
                    <span v-if="MASTERDATA['EDARRPAMACOOA'].Items[5].Value && index === 5" class="fake-input disable">{{MASTERDATA['EDARRPAMACOOA'].Items[6].Value || 'N/A'}}</span>
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
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAACCB'].Items" v-if="index !== 3 && item.Value">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" />
                    <span class="displaytbl" :class="{'no-wrap': index === 2}"><span>{{__label(item)}}</span></span>
                    <span v-if="MASTERDATA['EDARRPAMAACCB'].Items[2].Value && index === 2" class="fake-input disable">{{MASTERDATA['EDARRPAMAACCB'].Items[3].Value || 'N/A'}}</span>
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
              <MDRadioView :data="MASTERDATA['EDARRPAMALISI'].Items" />
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAMEDI']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAMEDI'])}}
            </th>
            <td>
              <MDRadioView :data="MASTERDATA['EDARRPAMAMEDI'].Items" />
              <hr v-if="MASTERDATA['EDARRPAMAMEDI'].Items[0].Value"/>
              <list-of-current-medications
                v-if="MASTERDATA['EDARRPAMAMEDI'].Items[0].Value"
                ref="ListOfCurrentMedications"
                :Type="'ED-PatientManagement'"
                :VisitTypeGroupCode="'ED'"
                :RealOnly="true"
                />
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAREAD']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAREAD'])}}
            </th>
            <td>
              <textarea-autosize readonly="readonly" :code="MASTERDATA['EDARRPAMAREAD'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('N/A')" v-model="MASTERDATA['EDARRPAMAREAD'].Items[0].Value"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAHOPI']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAHOPI'])}}
            </th>
            <td>
              <textarea-autosize readonly="readonly" :code="MASTERDATA['EDARRPAMAHOPI'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('N/A')" v-model="MASTERDATA['EDARRPAMAHOPI'].Items[0].Value"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAPAMH']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAPAMH'])}}
            </th>
            <td>
              <textarea-autosize readonly="readonly" :code="MASTERDATA['EDARRPAMAPAMH'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('N/A')" v-model="MASTERDATA['EDARRPAMAPAMH'].Items[0].Value"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAALLE']" class="borded-bottom highlighted-radio">
            <th>{{__label(MASTERDATA['EDARRPAMAALLE'])}}</th>
            <td>
              <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMAALLE'].Items">
                <template v-if="item.DataType === 'Radio' && item.Value">{{__label(item)}}, </template>
                <template v-else-if="item.DataType === 'Select' && item.Value && MASTERDATA['EDARRPAMAALLE'].Items[0].Value">
                  <allergies-select :view="true" v-model="item.Value" :items="allergies"/>
                </template>
                <template v-else-if="item.Value && MASTERDATA['EDARRPAMAALLE'].Items[0].Value">, {{item.Value}}</template>
              </span>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMATIME']">
            <th>
              <div class="mb-5 no-wrap"><span class="hidden-text"></span>{{__t('Dấu hiệu sinh tồn')}}</div>
              <div class="fake-input disable">{{MASTERDATA['EDARRPAMATIME'].Items[0].Value}}</div>
            </th>
            <td>
              <div class="mb-5">
                <div class="w150 display-inline mr-10">
                  <div :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMABLPR'].Items">
                    <div class="mb-5">{{__label(item)}} <span v-if="item.Note" class="note-text">({{item.Note}})</span></div>
                    <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
                  </div>
                </div>
                <div class="w150 display-inline mr-10">
                  <div :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMAHERA'].Items">
                    <div class="mb-5">{{__label(item)}} <span v-if="item.Note" class="note-text">({{__t(item.Note)}})</span></div>
                    <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
                  </div>
                </div>
                <div class="w150 display-inline mr-10">
                  <div :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMARERA'].Items">
                    <div class="mb-5">{{__label(item)}} <span v-if="item.Note" class="note-text">({{__t(item.Note)}})</span></div>
                    <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
                  </div>
                </div>
                <div class="w150 display-inline mr-10">
                  <div :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMASPO2'].Items">
                    <div class="mb-5">{{__label(item)}} <span v-if="item.Note" class="note-text">({{item.Note}})</span></div>
                    <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
                  </div>
                </div>
              </div>
              <div class="mt-5 mb-5">
                <div class="mb-5">{{__label(MASTERDATA['EDARRPAMATEMP'])}}<span class="note-text"> ({{__t('Độ C')}})</span></div>
                <div class="flex-box flex-center">
                  <MDRadioView class="mr-5" :data="MASTERDATA['EDARRPAMATEMP'].Items" />
                  <div class="fake-input disable" v-if="MASTERDATA['EDARRPAMATEMP'].Items.find(e => e.Value && e.DataType === 'Radio')">{{MASTERDATA['EDARRPAMATEMP'].Items[3].Value || 'N/A'}}</div>
                </div>
              </div>
              <div v-if="MASTERDATA['EDARRPAMAHEIG']" class="mt-5">
                <div class="w150 display-inline mr-10">
                  <div :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMAHEIG'].Items">
                    <div class="mb-5">{{__label(item)}} <span v-if="item.Note" class="note-text">({{item.Note}})</span></div>
                    <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
                  </div>
                </div>
                <div class="w150 display-inline mr-10">
                  <div :key="index" v-for="(item,index) in MASTERDATA['EDARRPAMAWEIG'].Items">
                    <div class="mb-5">{{__label(item)}} <span v-if="item.Note" class="note-text">({{item.Note}})</span></div>
                    <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
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
              <textarea-autosize readonly :code="MASTERDATA['EDARRPAMAVACC'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('N/A')" v-model="MASTERDATA['EDARRPAMAVACC'].Items[0].Value"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAMEST']">
            <th>
              {{__label(MASTERDATA['EDARRPAMAMEST'])}}
            </th>
            <td>
              <div class="row">
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAMEST'].Items" v-if="index !== 6 && item.Value">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" />
                    <span class="displaytbl" :class="{'no-wrap': index === 5}"><span>{{__label(item)}}</span></span>
                    <template v-if="MASTERDATA['EDARRPAMAMEST'].Items[5].Value && index === 5">
                      <span class="displaytbl"> {{MASTERDATA['EDARRPAMAMEST'].Items[6].Value || 'N/A'}}/15</span>
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
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMASKIN'].Items" v-if="item.Value">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" />
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
                  <MDRadioView :data="MASTERDATA['EDARRPAMAPAI'].Items" />
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['EDARRPAMAPAI'].Items[0].Value">
                <hr/>
                <div  v-if="item.DataType === 'Checkbox' && item.Value"  class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAPAI'].Items">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" />
                    <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    <span class="fake-input disable" v-if="MASTERDATA['EDARRPAMAPAI'].Items[4].Value && index === 4">{{MASTERDATA['EDARRPAMAPAI'].Items[5].Value || 'N/A'}}</span>
                  </div>
                </div>
              </div>
              <div class="mt-10" v-if="MASTERDATA['EDARRPAMAPAI'].Items[0].Value">
                <hr/>
                {{__label(MASTERDATA['EDARRPAMAPAI'].Items[10])}}: <span class="fake-input disable">{{MASTERDATA['EDARRPAMAPAI'].Items[10].Value || 'N/A'}}</span>
              </div>
              <div class="mt-10" v-if="MASTERDATA['EDARRPAMAPAI'].Items[0].Value">
                <hr/>
                {{__label(MASTERDATA['EDARRPAMAPAI'].Items[11])}}: {{MASTERDATA['EDARRPAMAPAI'].Items[11].Value || 'N/A'}}/10
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMABEH']">
            <th>
              {{__label(MASTERDATA['EDARRPAMABEH'])}}
            </th>
            <td>
              <div class="row">
                <div :class="{'col-md-12 col-sm-12': index === 6, 'col-md-4 col-sm-6': index !== 6}" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMABEH'].Items" v-if="index !== 7 && item.Value">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" />
                    <span class="displaytbl" :class="{'no-wrap': index === 6}"><span>{{__label(item)}}</span></span>
                    <span class="fake-input disable" v-if="MASTERDATA['EDARRPAMABEH'].Items[6].Value && index === 6">{{MASTERDATA['EDARRPAMABEH'].Items[7].Value || 'N/A'}}</span>
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
                    {{MASTERDATA['EDARRPAMAPUPI'].Items[0].Value || 'N/A'}}/8
                    <img class="ml-10" src="/static/dong_tu.png" />
                  </div>
                  <div>
                    <div class="flex-box flex-center">
                      <template :data="item"  v-for="(item, index) in MASTERDATA['EDARRPAMAPUPI'].Items" v-if="index && item.Value">
                        <template v-if="item.DataType === 'Checkbox'">
                          <CheckboxValue :key="index + 'EDARRPAMAPUPI'" v-model="item.Value" />
                          <span :key="index + 'label'" class="displaytbl"><span>{{__label(item)}}</span></span>
                        </template>
                        <template v-if="item.DataType === 'Text' && MASTERDATA['EDARRPAMAPUPI'].Items[index - 1].Value" >
                          <span class="fake-input disable" :key="index + 'input'">{{item.Value || 'N/A'}}</span> mm
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
                    <template :data="item"  v-for="(item, index) in MASTERDATA['EDARRPAMAREAC'].Items" v-if="item.Value">
                      <template v-if="item.DataType === 'Checkbox'">
                        <CheckboxValue :key="index + 'EDARRPAMAREAC'" v-model="item.Value" />
                        <span :key="index + 'label'" class="displaytbl"><span>{{__label(item)}}</span></span>
                      </template>
                      <template v-if="item.DataType === 'Text' && MASTERDATA['EDARRPAMAREAC'].Items[index - 1].Value" >
                        <span class="fake-input disable" :key="index + 'input'">{{item.Value || 'N/A'}}</span> mm
                      </template>
                    </template>
                  </div>
                </div>
              </div>
              <div v-if="MASTERDATA['EDARRPAMAPARA']" class="mt-10">
                <div class="flex-box flex-center no-wrap">
                  <MDRadioView :data="MASTERDATA['EDARRPAMAPARA'].Items" :DataType="'Checkbox'" />
                  <span class="fake-input disable"  v-if="MASTERDATA['EDARRPAMAPARA'].Items[0].Value">{{MASTERDATA['EDARRPAMAPARA'].Items[1].Value || 'N/A'}}</span>
                </div>
              </div>
              <div v-if="MASTERDATA['EDARRPAMACRNP']" class="mt-10">
                <div class="flex-box flex-center no-wrap">
                  <MDRadioView :data="MASTERDATA['EDARRPAMACRNP'].Items" :DataType="'Checkbox'" />
                  <span class="fake-input disable"  v-if="MASTERDATA['EDARRPAMACRNP'].Items[0].Value">{{MASTERDATA['EDARRPAMACRNP'].Items[1].Value || 'N/A'}}</span>
                </div>
              </div>
              <div class="flex-box flex-center mt-10" v-if="MASTERDATA['EDARRPAMASTNB']">
                <b v-if="MASTERDATA['EDARRPAMASTNB'].Items[0].Value">
                  {{__label(MASTERDATA['EDARRPAMASTNB'].Items[0])}}
                </b>
                <b v-else>
                  NA
                </b>
                <div v-if="MASTERDATA['EDARRPAMASTNB'].Items[0].Value">
                  <div class="flex-box flex-center">
                    <template :data="item"  v-for="(item, index) in MASTERDATA['EDARRPAMASTNB'].Items" v-if="index && item.Value">
                      <template v-if="item.DataType === 'Checkbox'">
                        <CheckboxValue class="ml-5 mr-5" :key="index + 'checbox'" v-model="item.Value" />
                        <span :key="index + 'label'" class="displaytbl"><span>{{__label(item)}}</span></span>
                      </template>
                      <template v-if="item.DataType === 'Text' && MASTERDATA['EDARRPAMASTNB'].Items[index - 1].Value" ><span :key="index + 'input'" class="fake-input disable">{{item.Value || 'N/A'}}</span> mm</template>
                    </template>
                  </div>
                </div>
              </div>
              <div v-if="MASTERDATA['EDARRPAMALOOS']" class="mt-10 flex-box flex-center">
                <b class="no-wrap mr-10">{{__label(MASTERDATA['EDARRPAMALOOS'])}}:</b>
                <textarea-autosize readonly :code="MASTERDATA['EDARRPAMALOOS'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('N/A')" v-model="MASTERDATA['EDARRPAMALOOS'].Items[0].Value"/>
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
                    <Painting :readonly="true" v-model="MASTERDATA['EDARRPAMAPALO'].Items[0].Value" />
                  </div>
                </div>
              </div>
              <textarea-autosize readonly :code="MASTERDATA['EDARRPAMAPALO'].Items[1].Code" class="form-control" rows="1" :placeholder="__t('N/A')" v-model="MASTERDATA['EDARRPAMAPALO'].Items[1].Value"/>
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
                  <MDRadioView :data="MASTERDATA['EDARRPAMACHPA'].Items" class="mr-10" />
                  <div class="flex-box flex-center" style="flex-flow: row wrap;" v-if="MASTERDATA['EDARRPAMACHPA'].Items[0].Value">
                    <template :data="item"  v-for="(item, index) in MASTERDATA['EDARRPAMACHPA'].Items">
                      <template v-if="item.DataType === 'Checkbox' && item.Value">
                        <div :key="index + 'checboxEDARRPAMACHPA'" class="flex-box flex-center">
                          <CheckboxValue v-model="item.Value" />
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
                  <MDRadioView :data="MASTERDATA['EDARRPAMAEDEM'].Items"/>
                </div>
              </div>
              <div class="flex-box flex-center bb1 mb10">
                <div><b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMARESP'])}}:</b></div>
                <div style="flex-grow: 1;">
                  <div class="row">
                    <div class="col-md-4 col-sm-6" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMARESP'].Items">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="item.Value" />
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
                    <div class="col-md-4 col-sm-6" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMABRSO'].Items">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="item.Value" />
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                        <div v-if="index === 1 && MASTERDATA['EDARRPAMABRSO'].Items[1].Value" class="flex-box flex-center">
                          <template v-if="$item.Value" v-for="($item, $index) in MASTERDATA['EDARRPAMARONC'].Items">
                            <CheckboxValue :key="$index + 'EDARRPAMARONCxx'"  v-model="$item.Value" />
                            <span class="displaytbl" :key="$index + 'EDARRPAMARONCx'" ><span>{{__label($item)}}</span></span>
                          </template>
                        </div>
                        <div v-if="index === 2 && MASTERDATA['EDARRPAMABRSO'].Items[2].Value" class="flex-box flex-center">
                          <template v-if="$item.Value" v-for="($item, $index) in MASTERDATA['EDARRPAMAABSE'].Items">
                            <CheckboxValue :key="$index + 'EDARRPAMAABSExx'"  v-model="$item.Value" />
                            <span class="displaytbl" :key="$index + 'EDARRPAMAABSEx'" ><span>{{__label($item)}}</span></span>
                          </template>
                        </div>
                        <div v-if="index === 3 && MASTERDATA['EDARRPAMABRSO'].Items[3].Value" class="flex-box flex-center">
                          <template v-if="$item.Value" v-for="($item, $index) in MASTERDATA['EDARRPAMAWHEE'].Items">
                            <CheckboxValue :key="$index + 'EDARRPAMAWHEExx'"  v-model="$item.Value" />
                            <span class="displaytbl" :key="$index + 'EDARRPAMAWHEEx'" ><span>{{__label($item)}}</span></span>
                          </template>
                        </div>
                        <div v-if="index === 4 && MASTERDATA['EDARRPAMABRSO'].Items[4].Value" class="flex-box flex-center">
                          <template v-if="$item.Value" v-for="($item, $index) in MASTERDATA['EDARRPAMACRAC'].Items">
                            <CheckboxValue :key="$index + 'EDARRPAMACRACxx'"  v-model="$item.Value" />
                            <span class="displaytbl" :key="$index + 'EDARRPAMACRACx'" ><span>{{__label($item)}}</span></span>
                          </template>
                        </div>
                        <div v-if="index === 5 && MASTERDATA['EDARRPAMABRSO'].Items[5].Value" class="flex-box flex-center">
                          <template v-if="$item.Value" v-for="($item, $index) in MASTERDATA['EDARRPAMADIMI'].Items">
                            <CheckboxValue :key="$index + 'EDARRPAMACRACxxx'"  v-model="$item.Value" />
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
                    <div class="col-md-4 col-sm-6" :data="item" v-if="item.Value" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAABDO'].Items">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="item.Value" />
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
                    <div class="col-md-4 col-sm-6" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMABOTO'].Items">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="item.Value" />
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-box flex-center bb1 mb10">
                <div><b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMATEND'])}}:</b></div>
                <div class="flex-box flex-center">
                  <MDRadioView :data="MASTERDATA['EDARRPAMATEND'].Items" />
                </div>
              </div>
              <div class="flex-box flex-center bb1 mb10">
                <div><b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMAPOSI'])}}:</b></div>
                <div style="flex-grow: 1;">
                  <div class="row">
                    <div class="col-md-4 col-sm-6" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAPOSI'].Items">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="item.Value" />
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
                    <div class="col-md-4 col-sm-6" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAPEAB'].Items">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="item.Value" />
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
                    <textarea-autosize readonly :code="MASTERDATA['EDARRPAMALIVE'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('N/A')" v-model="MASTERDATA['EDARRPAMALIVE'].Items[0].Value"/>
                  </div>
                </div>
              </div>
              <div v-if="MASTERDATA['EDARRPAMASPL']" class="flex-box flex-center">
                <b class="w100 display-inline mr-10">{{__label(MASTERDATA['EDARRPAMASPL'])}}:</b>
                <div class="row" style="flex-grow: 1;">
                  <div class="col-md-12">
                    <textarea-autosize readonly :code="MASTERDATA['EDARRPAMASPL'].Items[0].Code" class="form-control" rows="1" :placeholder="__t('N/A')" v-model="MASTERDATA['EDARRPAMASPL'].Items[0].Value"/>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMAEXTR']">
            <th>{{__label(MASTERDATA['EDARRPAMAEXTR'])}}</th>
            <td>
              <div class="row">
                <div class="col-md-4 col-sm-6" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAEXTR'].Items">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" />
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
                <div class="col-md-4 col-sm-6" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAGENI'].Items">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" />
                    <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    <div v-if="index === 2 && MASTERDATA['EDARRPAMAGENI'].Items[2].Value" class="flex-box flex-center">
                      <template v-if="$item.Value" v-for="($item, $index) in MASTERDATA['EDARRPAMAFLPA'].Items">
                        <CheckboxValue :key="$index + 'EDARRPAMAFLPA'" v-model="$item.Value" />
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
                <div class="col-md-4 col-sm-6" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAOBGY'].Items">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" />
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
                    <b>{{__label(MASTERDATA['EDARRPAMADRAI'])}}:</b>
                    <div class="flex-box flex-center" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMADRAI'].Items">
                      <CheckboxValue v-model="item.Value" />
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6">
                  <div class="flex-box flex-center">
                    <b>{{__label(MASTERDATA['EDARRPAMAPAIN'])}}:</b>
                    <div class="flex-box flex-center" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAPAIN'].Items">
                      <CheckboxValue v-model="item.Value" />
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-sm-6">
                  <div class="flex-box flex-center">
                    <b>{{__label(MASTERDATA['EDARRPAMATINN'])}}:</b>
                    <div class="flex-box flex-center" :data="item" v-if="item.Value" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMATINN'].Items">
                      <CheckboxValue v-model="item.Value" />
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6">
                  <div class="flex-box flex-center">
                    <b>{{__label(MASTERDATA['EDARRPAMAACDE'])}}:</b>
                    <div class="flex-box flex-center" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAACDE'].Items">
                      <CheckboxValue v-model="item.Value" />
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
              <div class="row flex-box flex-center">
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMACHDE'].Items" v-if="index !== 6 && item.Value">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" />
                    <span class="displaytbl" :class="{'no-wrap': index === 5}"><span>{{__label(item)}}</span></span>
                    <span class="fake-input disable" v-if="MASTERDATA['EDARRPAMACHDE'].Items[5].Value && index === 5">{{MASTERDATA['EDARRPAMACHDE'].Items[6].Value}}</span>
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
              <div class="row ">
                <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMANUTR'].Items" v-if="index !== 5 && item.Value">
                  <div class="flex-box flex-center">
                    <CheckboxValue v-model="item.Value" />
                    <span class="displaytbl" :class="{'no-wrap': index === 4}"><span>{{__label(item)}}</span></span>
                    <template v-if="MASTERDATA['EDARRPAMANUTR'].Items[4].Value && index === 4">
                      <span class="fake-input disable">{{MASTERDATA['EDARRPAMANUTR'].Items[5].Value || 'N/A'}}</span> {{__t('_lần')}}
                    </template>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['EDARRPAMACPRB']">
            <th>{{__label(MASTERDATA['EDARRPAMACPRB'])}}</th>
            <td>
              <div class="row ">
                <template :data="item" v-if="item.Value" v-for="(item, index) in MASTERDATA['EDARRPAMACPRB'].Items">
                  <div class="col-md-4 col-sm-6 flex-box flex-center" :key="index" v-if="item.DataType === 'Checkbox'" >
                    <div class="flex-box flex-center">
                      <CheckboxValue v-model="item.Value" />
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      <div v-if="index === 0 && MASTERDATA['EDARRPAMACPRB'].Items[0].Value">
                        : {{MASTERDATA['EDARRPAMACPRB'].Items[1].Value || 'N/A'}}
                      </div>
                      <div v-if="index === 4 && MASTERDATA['EDARRPAMACPRB'].Items[4].Value">
                        : {{MASTERDATA['EDARRPAMACPRB'].Items[5].Value || 'N/A'}}
                      </div>
                      <div v-if="index === 7 && MASTERDATA['EDARRPAMACPRB'].Items[7].Value" class="ml-5">
                        : {{MASTERDATA['EDARRPAMACPRB'].Items[8].Value || 'N/A'}}
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
                <template :data="item" v-if="item.Value" v-for="(item, index) in MASTERDATA['EDARRPAMADEPR'].Items">
                  <div class="col-md-4 col-sm-4" :key="index" v-if="item.DataType === 'Checkbox'" >
                    <div class="flex-box flex-center">
                      <CheckboxValue v-model="item.Value" />
                      <span class="displaytbl"><span>{{__label(item)}}</span></span>
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-4" :key="index" v-if="item.DataType === 'Datetime'">
                    <div class="flex-box flex-center">
                      <span class="displaytbl"><span class="ml-5">{{__label(item)}}</span></span>
                      : {{item.Value || 'N/A'}}
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
                    <CheckboxValue v-model="item.Value" />
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMACHES']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMACHES'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMACHES'].Items" class="text-center">
                    <CheckboxValue v-model="item.Value" />
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMANECK']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMANECK'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMANECK'].Items" class="text-center">
                    <CheckboxValue v-model="item.Value" />
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMAFACE']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMAFACE'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAFACE'].Items" class="text-center">
                    <CheckboxValue v-model="item.Value" />
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMAABDM']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMAABDM'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAABDM'].Items" class="text-center">
                    <CheckboxValue v-model="item.Value" />
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMAABD']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMAABD'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAABD'].Items" class="text-center">
                    <CheckboxValue v-model="item.Value" />
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMABACK']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMABACK'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMABACK'].Items" class="text-center">
                    <CheckboxValue v-model="item.Value" />
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMAPELV']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMAPELV'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMAPELV'].Items" class="text-center">
                    <CheckboxValue v-model="item.Value" />
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMALEAR']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMALEAR'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMALEAR'].Items" class="text-center">
                    <CheckboxValue v-model="item.Value" />
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMARIAR']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMARIAR'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMARIAR'].Items" class="text-center">
                    <CheckboxValue v-model="item.Value" />
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMALELE']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMALELE'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMALELE'].Items" class="text-center">
                    <CheckboxValue v-model="item.Value" />
                  </td>
                </tr>
                <tr v-if="MASTERDATA['EDARRPAMARILE']">
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMARILE'])}}</td>
                  <td :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMARILE'].Items" class="text-center">
                    <CheckboxValue v-model="item.Value" />
                  </td>
                </tr>
                <tr>
                  <td class="text-left">{{__label(MASTERDATA['EDARRPAMANOTE'])}}</td>
                  <td colspan="1000">
                    <textarea-autosize readonly :code="MASTERDATA['EDARRPAMANOTE'].Items[0].Code" class="form-control" rows="2" :placeholder="__t('N/A')" v-model="MASTERDATA['EDARRPAMANOTE'].Items[0].Value"/>
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
                    <div class="col-md-6 col-sm-6" v-if="item.DataType === 'Checkbox' && item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAMATRAU'].Items">
                      <div class="flex-box flex-center">
                        <CheckboxValue v-model="item.Value" />
                        <span class="displaytbl"><span>{{__label(item)}}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-5">
                    <p class="mb-5">{{__label(MASTERDATA['EDARRPAMATRAU'].Items[2])}}</p>
                    <textarea-autosize readonly :code="MASTERDATA['EDARRPAMATRAU'].Items[2].Code" class="form-control" rows="3" :placeholder="__t('N/A')" v-model="MASTERDATA['EDARRPAMATRAU'].Items[2].Value"/>
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
        <div class="row" v-if="DataSubmit.Version >= 9">
          <div>
            <Confirm
            class="mt-10"
            ref="ConfirmComponent"
            :MasterDataCode="'A03_006_050919_VE'"
            :FormCode="'A03_006_050919_VE'"
            :AdInfo="[DataSubmit.AssessmentPhysician.Username]"
            :VisitId="_VisitId"
            :ReadOnly="true"
            :FormId="DataSubmit.Id"
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
            <p><b>RRPN</b>: Rì rào phế nang</p>
            <p><b>RUQ</b>: Right upper quadrant</p>
          </div>
          <div class="col-md-3 col-sm-3">
            <p><b>LUQ</b>: Left upper quadrant</p>
            <p><b>RLQ</b>: Right lower quadrant</p>
          </div>
          <div class="col-md-3 col-sm-3">
            <p><b>LLQ</b>: Left lower quadrant</p>
            <p><b>ENT</b>: Ear-Nose-Throat</p>
          </div>
          <div class="col-md-3 col-sm-3">
            <p><b>OB/GYN</b>: Obstetrics and gynaecology</p>
            <p><b>CPR</b>: Cardiopulmonary resuscitation</p>
          </div>
        </div>
        <div class="mt-20">
          <LastUpdateWithFormCode :FormCode="'A03_006_050919_VE'" :DataSubmit="DataSubmit"/>
        </div>
      </div>
      <div v-else>
        <div class="text-center">
          <p>{{__t('Chưa có bệnh án cấp cứu ngoại viện')}}</p>
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
// import SyncVisitHistory from '@/services/ED/SyncVisitHistory'
// import $ from 'jquery'
import _ from 'lodash'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import Confirm from '@/components/Form/Confirm'
// import moment from 'moment'
// import NProgress from 'nprogress'
export default {
  name: 'PatientManagement',
  mixins: [MixinForm, MixinMasterData],
  props: ['VisitId'],
  data () {
    return {
      EDARRPAMAPAI: [],
      SyncHistoryOfPresentIllness: null,
      SyncPastMedicalHistory: null,
      DataSubmit: null,
      loaded: false,
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
    VDatePicker, Logs, VSelect, Painting, ListOfCurrentMedications, Confirm
  },
  watch: {
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
    getData () {
      this.loaded = false
      new AmbulanceRunReport().find('PatientManagement/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        this.$store.dispatch('setCurrentFormId', response.Id)
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
      }).catch(e => {
        this.loaded = true
        this.DataSubmit = false
        if (e.status === 404) {}
      })
    }
  }
}
</script>
