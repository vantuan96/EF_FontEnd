<template>
  <div v-if="loaded">
    <div v-if="IsTeleheath" class="disable_ccp">
      <div class="form-control" v-if="DataSubmit.IsNew && DataSubmit.IsShowSyncButton"><button class="btn btn-sync-data pull-right" @click="syncData()">{{__t('Lấy dữ liệu đánh giá gần nhất trong vòng 24 giờ')}}</button></div>
      <initial-assessment-form
        v-if="DataSubmit.InitialAssessmentForm"
        v-model="DataSubmit.InitialAssessmentForm"
        :showBtn="!allowEditDoctor"
        :FormType="'Telehealth'"
        ref="InitialAssessmentForm"
        :readonly="!(allowEditDoctor && !IsFormLocked(DataSubmit))"
      />
      <div v-if="allowEdit && !IsFormLocked(DataSubmit)">
        <div class="tbl-title">{{__t('Thông tin chung')}}</div>
        <table class="table v-table-1 no-margin" v-if="!syncing">
          <tr v-if="MASTERDATA['OPDIAFTPCC0']" class="border-bottom-blue">
            <th width="180px">{{__label(MASTERDATA['OPDIAFTPCC0'])}} <span class="unit-label" v-if="MASTERDATA['OPDIAFTPCC0'].Note"> ({{MASTERDATA['OPDIAFTPCC0'].Note}})</span></th>
            <td colspan="3">
              <div :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPCC0'].Items">
                <input type="text" class="form-control" v-model="item.Value" :placeholder="__label(item)"/>
              </div>
            </td>
          </tr>
          <tr>
            <th>Thông số</th>
            <th class="text-left">{{__t('Kết quả')}} <i>{{__t('(cung cấp bởi NB)')}}</i></th>
            <th class="text-left">{{__t('Chọn nếu không có thông tin')}}</th>
            <th class="text-left" width="40%">{{__t('Một số ghi chú khác')}}</th>
          </tr>
          <tr v-if="MASTERDATA['OPDIAFTPPUL']">
            <th>{{__label(MASTERDATA['OPDIAFTPPUL'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPPUL'].Note"> ({{MASTERDATA['OPDIAFTPPUL'].Note}})</span></th>
            <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPPUL'].Items">
              <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
                <input type="checkbox" :id="'OPDIAFTPPUL-' + index" :name="'OPDIAFTPPUL-' + index" v-model="item.Value">
                <label @click="checkbox2Reset(MASTERDATA['OPDIAFTPPUL'].Items, item)" :for="'OPDIAFTPPUL-' + index"></label>
              </div>
              <div v-else>
                <input :placeholder="__label(item)" :readonly="MASTERDATA['OPDIAFTPPUL'].Items[1].Value === true" class="form-control" v-model="item.Value"/>
              </div>
            </td>
            <td rowspan="8" style="vertical-align: top;">
              <div v-if="MASTERDATA['OPDIAFTPPTP']">
                <div class="group-radio">
                  <b class="flex-box-label">{{__label(MASTERDATA['OPDIAFTPPTP'])}}</b>
                  <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPPTP'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'OPDIAFTPPTPradio-' + index" v-model="item.Value">
                      <label :for="'OPDIAFTPPTPradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFTPPTP'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </template>
                </div>
              </div>
              <div v-if="MASTERDATA['OPDIAFTPUMO']">
                <div class="group-radio">
                  <b class="flex-box-label">{{__label(MASTERDATA['OPDIAFTPUMO'])}}</b>
                  <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPUMO'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'OPDIAFTPUMOradio-' + index" v-model="item.Value">
                      <label :for="'OPDIAFTPUMOradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFTPUMO'].Items, item)">{{__label(item)}}</label>
                    </span>
                  </template>
                </div>
              </div>
              <div v-if="MASTERDATA['OPDIAFTPBSL']">
                  <label class="flex-labelox-label">{{__label(MASTERDATA['OPDIAFTPBSL'])}}</label>
                  <div :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPBSL'].Items">
                    <input :placeholder="__label(item)" class="form-control" v-model="item.Value"/>
                  </div>
              </div>
              <hr/>
              <div v-if="MASTERDATA['OPDIAFTPOTH']">
                  <label class="flex-labelox-label">{{__label(MASTERDATA['OPDIAFTPOTH'])}}</label>
                  <div :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPOTH'].Items">
                    <textarea-autosize rows="5" class="form-control" :placeholder="__label(item)" v-model="item.Value"/>
                  </div>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['OPDIAFTPBP0']">
            <th>{{__label(MASTERDATA['OPDIAFTPBP0'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPBP0'].Note"> ({{MASTERDATA['OPDIAFTPBP0'].Note}})</span></th>
            <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPBP0'].Items">
              <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
                <input type="checkbox" :id="'OPDIAFTPBP0-' + index" :name="'OPDIAFTPBP0-' + index" v-model="item.Value">
                <label @click="checkbox2Reset(MASTERDATA['OPDIAFTPBP0'].Items, item)" :for="'OPDIAFTPBP0-' + index"></label>
              </div>
              <div v-else>
                <input :placeholder="__label(item)"  :readonly="MASTERDATA['OPDIAFTPBP0'].Items[1].Value === true" class="form-control" v-model="item.Value"/>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['OPDIAFTPTEM']">
            <th>{{__label(MASTERDATA['OPDIAFTPTEM'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPTEM'].Note"> ({{MASTERDATA['OPDIAFTPTEM'].Note}})</span></th>
            <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPTEM'].Items">
              <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
                <input type="checkbox" :id="'OPDIAFTPTEM-' + index" :name="'OPDIAFTPTEM-' + index" v-model="item.Value">
                <label @click="checkbox2Reset(MASTERDATA['OPDIAFTPTEM'].Items, item)" :for="'OPDIAFTPTEM-' + index"></label>
              </div>
              <div v-else>
                <input :placeholder="__label(item)" :readonly="MASTERDATA['OPDIAFTPTEM'].Items[1].Value === true" class="form-control" v-model="item.Value"/>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['OPDIAFTPSPO']">
            <th>{{__label(MASTERDATA['OPDIAFTPSPO'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPSPO'].Note"> ({{MASTERDATA['OPDIAFTPSPO'].Note}})</span></th>
            <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPSPO'].Items">
              <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
                <input type="checkbox" :id="'OPDIAFTPSPO-' + index" :name="'OPDIAFTPSPO-' + index" v-model="item.Value">
                <label @click="checkbox2Reset(MASTERDATA['OPDIAFTPSPO'].Items, item)" :for="'OPDIAFTPSPO-' + index"></label>
              </div>
              <div v-else>
                <input :placeholder="__label(item)" :readonly="MASTERDATA['OPDIAFTPSPO'].Items[1].Value === true" class="form-control" v-model="item.Value"/>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['OPDIAFTPRR0']">
            <th>{{__label(MASTERDATA['OPDIAFTPRR0'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPRR0'].Note"> ({{MASTERDATA['OPDIAFTPRR0'].Note}})</span></th>
            <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPRR0'].Items">
              <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
                <input type="checkbox" :id="'OPDIAFTPRR0-' + index" :name="'OPDIAFTPRR0-' + index" v-model="item.Value">
                <label @click="checkbox2Reset(MASTERDATA['OPDIAFTPRR0'].Items, item)" :for="'OPDIAFTPRR0-' + index"></label>
              </div>
              <div v-else>
                <input :placeholder="__label(item)" :readonly="MASTERDATA['OPDIAFTPRR0'].Items[1].Value === true" class="form-control" v-model="item.Value"/>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['OPDIAFTPHEI']">
            <th>{{__label(MASTERDATA['OPDIAFTPHEI'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPHEI'].Note"> ({{MASTERDATA['OPDIAFTPHEI'].Note}})</span></th>
            <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPHEI'].Items">
              <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
                <input type="checkbox" :id="'OPDIAFTPHEI-' + index" :name="'OPDIAFTPHEI-' + index" v-model="item.Value">
                <label @click="checkbox2Reset(MASTERDATA['OPDIAFTPHEI'].Items, item)" :for="'OPDIAFTPHEI-' + index"></label>
              </div>
              <div v-else>
                <number-input :readonly="MASTERDATA['OPDIAFTPHEI'].Items[1].Value === true" inline v-model="item.Value" :placeholder="__t('Nhập')"/>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['OPDIAFTPWEI']">
            <th>{{__label(MASTERDATA['OPDIAFTPWEI'])}}<span class="unit-label" v-if="MASTERDATA['OPDIAFTPWEI'].Note"> ({{MASTERDATA['OPDIAFTPWEI'].Note}})</span></th>
            <td :key="index" :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPWEI'].Items">
              <div v-if="checkString(item.DataType, 'CheckBox')" class="v-checkbox text-center">
                <input type="checkbox" :id="'OPDIAFTPWEI-' + index" :name="'OPDIAFTPWEI-' + index" v-model="item.Value">
                <label @click="checkbox2Reset(MASTERDATA['OPDIAFTPWEI'].Items, item)" :for="'OPDIAFTPWEI-' + index"></label>
              </div>
              <div v-else>
                <number-input :readonly="MASTERDATA['OPDIAFTPWEI'].Items[1].Value === true" inline v-model="item.Value" :placeholder="__t('Nhập')"/>
              </div>
            </td>
          </tr>
          <tr>
            <th>BMI</th>
            <td colspan="2">
              <input type="number" class="form-control" readonly :value="bmiCalculation"/>
              <height-and-weight v-if="DataSubmit.IsNew" @copy="push2Wh"/>
            </td>
          </tr>
          <tr v-if="MASTERDATA['OPDIAFTPALL']">
            <th>{{__label(MASTERDATA['OPDIAFTPALL'])}}</th>
            <td colspan="3">
              <div class="group-radio">
                <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPALL'].Items">
                  <span :key="index" v-if="item.DataType === 'Radio'">
                    <input :class="'highlight-yes-radio-' + index" type="checkbox" :id="'OPDIAFTPALLradio-' + index" v-model="item.Value">
                    <label :for="'OPDIAFTPALLradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFTPALL'].Items, item)">{{__label(item)}}</label>
                  </span>
                  <span :key="index" v-else-if="item.DataType === 'Select'">
                    <allergies-select v-model="item.Value" :multi="true" :items="JSON.parse(item.Data)" v-if="MASTERDATA['OPDIAFTPALL'].Items[0].Value"/>
                  </span>
                  <span :key="index" v-else style="flex-grow: 1;">
                    <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFTPALL'].Items[0].Value"/>
                  </span>
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['OPDIAFTPPAI']">
            <th>{{__label(MASTERDATA['OPDIAFTPPAI'])}}</th>
            <td colspan="3">
              <div class="group-radio">
                <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDIAFTPPAI'].Items">
                  <input type="checkbox" :id="'OPDIAFTPPAIradio-' + index" v-model="item.Value">
                  <label :for="'OPDIAFTPPAIradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFTPPAI'].Items, item)">{{__label(item)}}</label>
                </span>
                <i class="flex-box-label">{{__t('(VD: Tick nếu NB phải đánh giá đau bằng FPS-R score)')}}</i>
              </div>
              <template v-if="MASTERDATA['OPDIAFTPPAI'].Items[0].Value">
                <div class="row">
                  <template v-if="MASTERDATA['OPDIAFTPPS0']">
                    <div class="col-sm- col-md-3">
                      <label>{{__label(MASTERDATA['OPDIAFTPPS0'])}}</label>
                      <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'OPDIAFTPPS0'" v-for="(item,index) in MASTERDATA['OPDIAFTPPS0'].Items">
                    </div>
                  </template>
                  <template v-if="MASTERDATA['OPDIAFTPPL0']">
                    <div class="col-md-3">
                      <label>{{__label(MASTERDATA['OPDIAFTPPL0'])}}</label>
                      <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'OPDIAFTPPL0'" v-for="(item,index) in MASTERDATA['OPDIAFTPPL0'].Items">
                    </div>
                  </template>
                  <template v-if="MASTERDATA['OPDIAFTPPSD']">
                    <div class="col-md-6">
                      <label>{{__label(MASTERDATA['OPDIAFTPPSD'])}}</label>
                      <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'OPDIAFTPPSD'" v-for="(item,index) in MASTERDATA['OPDIAFTPPSD'].Items">
                    </div>
                  </template>
                </div>
                <div class="v-row">
                  <div class="group-radio">
                    <b class="flex-box-label">Tần suất đau</b>
                    <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPPF0'].Items">
                      <span :key="index" v-if="item.DataType === 'Radio'">
                        <input type="checkbox" :id="'OPDIAFTPPF0radio-' + index" v-model="item.Value">
                        <label :for="'OPDIAFTPPF0radio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFTPPF0'].Items, item)">{{__label(item)}}</label>
                      </span>
                      <span :key="index" v-else style="flex-grow: 1;">
                        <textarea-autosize  :placeholder="__label(item)" class="form-control" v-model="item.Value" v-if="MASTERDATA['OPDIAFTPPF0'].Items[3].Value"/>
                      </span>
                    </template>
                  </div>
                </div>
                <div class="v-row ">
                  <div class="group-radio">
                    <template v-if="MASTERDATA['OPDIAFTPPC0']">
                      <b>{{__label(MASTERDATA['OPDIAFTPPC0'])}}</b>
                      <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'OPDIAFTPPC0'" v-for="(item,index) in MASTERDATA['OPDIAFTPPC0'].Items">
                    </template>
                  </div>
                </div>
                <div class="v-row">
                  <template v-if="MASTERDATA['OPDIAFTPHPU']">
                    <div class="flex-box">
                      <label class="flex-box-label">{{__label(MASTERDATA['OPDIAFTPHPU'])}}</label>
                      <div class="group-radio">
                        <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDIAFTPHPU'].Items">
                          <template v-if="checkString(item.DataType, 'Radio')">
                            <input type="checkbox" :id="'OPDIAFTPHPUradio-' + index" v-model="item.Value">
                            <label :for="'OPDIAFTPHPUradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFTPHPU'].Items, item)">{{__label(item)}}</label>
                          </template>
                        </span>
                      </div>
                      <i class="flex-box-label" v-if="MASTERDATA['OPDIAFTPHPU'].Items[0].Value">Bác sĩ khai thác thông tin tại phiếu khám ngoại trú</i>
                    </div>
                  </template>
                </div>
                <div class="v-row" v-if="MASTERDATA['OPDIAFTPHPU'] && MASTERDATA['OPDIAFTPHPU'].Items[0].Value">
                  <template v-if="MASTERDATA['OPDIAFTPPME']">
                    <div class="flex-box">
                      <label class="flex-box-label">{{__label(MASTERDATA['OPDIAFTPPME'])}}</label>
                      <div class="group-radio">
                        <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDIAFTPPME'].Items">
                          <template v-if="checkString(item.DataType, 'Radio')">
                            <input type="checkbox" :id="'OPDIAFTPPMEradio-' + index" v-model="item.Value">
                            <label :for="'OPDIAFTPPMEradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFTPPME'].Items, item)">{{__label(item)}}</label>
                          </template>
                        </span>
                      </div>
                    </div>
                  </template>
                </div>
              </template>
            </td>
          </tr>
          <tr v-if="MASTERDATA['OPDIAFTPPRE']">
            <th>{{__label(MASTERDATA['OPDIAFTPPRE'])}}</th>
            <td colspan="3">
              <div class="group-radio">
                <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPPRE'].Items">
                  <span :key="index" v-if="item.DataType === 'Radio'">
                    <input type="checkbox" :id="'OPDIAFTPPREradio-' + index" v-model="item.Value">
                    <label :for="'OPDIAFTPPREradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFTPPRE'].Items, item)">{{__label(item)}}</label>
                  </span>
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="MASTERDATA['OPDIAFTPBRE']" >
            <th>{{__label(MASTERDATA['OPDIAFTPBRE'])}}</th>
            <td colspan="3">
              <div class="group-radio">
                <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPBRE'].Items">
                  <span :key="index" v-if="item.DataType === 'Radio'">
                    <input type="checkbox" :id="'OPDIAFTPBREradio-' + index" v-model="item.Value">
                    <label :for="'OPDIAFTPBREradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFTPBRE'].Items, item)">{{__label(item)}}</label>
                  </span>
                </template>
              </div>
            </td>
          </tr>
          <template v-if="DataSubmit.Version === 1">
          <tr v-if="MASTERDATA['OPDIAFTPBRE']" >
            <th>{{__label(MASTERDATA['OPDIAFTPGCD'])}} <p class="note-text">{{__t('Sàng lọc bằng bảng hỏi chung (hoàn thành 5 câu bên cạnh)')}}</p></th>
            <td :colspan="3" class="no-padding">
              <table class="no-border">
                <tr class="border-bottom" v-if="MASTERDATA['OPDIAFTPAFI']">
                  <td width="380">1. {{__label(MASTERDATA['OPDIAFTPAFI'])}}</td>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPAFI'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'">
                          <input type="checkbox" :id="'OPDIAFTPAFIradio-' + index" v-model="item.Value">
                          <label :for="'OPDIAFTPAFIradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['OPDIAFTPAFI'].Items, item)">{{__label(item)}}</label>
                        </span>
                      </template>
                    </div>
                  </td>
                  <td :rowspan="rowspanOPDIAFTPTSI" style="vertical-align: top;" class="border-left" v-if="MASTERDATA['OPDIAFTPTSI'].Items[1].Value">
                    <template >
                      <h3>{{__t('Hướng xử trí hỗ trợ')}}</h3>
                    {{__t(' Nhắc nhở người bệnh vệ sinh tay thường xuyên, lưu ý giữ thực hành vệ sinh ho hoặc hắt hơi')}}
                    </template>
                  </td>
                </tr>
                <tr class="border-bottom" v-if="MASTERDATA['OPDIAFTPARO'] && MASTERDATA['OPDIAFTPAFI'].Items[0].Value">
                  <td width="380">2. {{__label(MASTERDATA['OPDIAFTPARO'])}}</td>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPARO'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'">
                          <input type="checkbox" :id="'OPDIAFTPAROradio-' + index" v-model="item.Value">
                          <label :for="'OPDIAFTPAROradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['OPDIAFTPARO'].Items, item)">{{__label(item)}}</label>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr class="border-bottom" v-if="MASTERDATA['OPDIAFTPTOC'] && MASTERDATA['OPDIAFTPAFI'].Items[0].Value">
                  <td width="380">3. {{__label(MASTERDATA['OPDIAFTPTOC'])}}</td>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPTOC'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'">
                          <input type="checkbox" :id="'OPDIAFTPTOCradio-' + index" v-model="item.Value">
                          <label :for="'OPDIAFTPTOCradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['OPDIAFTPTOC'].Items, item)">{{__label(item)}}</label>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr class="border-bottom" v-if="MASTERDATA['OPDIAFTPSOB'] && MASTERDATA['OPDIAFTPAFI'].Items[0].Value">
                  <td width="380">4. {{__label(MASTERDATA['OPDIAFTPSOB'])}}</td>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPSOB'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'">
                          <input type="checkbox" :id="'OPDIAFTPSOBradio-' + index" v-model="item.Value">
                          <label :for="'OPDIAFTPSOBradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['OPDIAFTPSOB'].Items, item)">{{__label(item)}}</label>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr class="border-bottom" v-if="MASTERDATA['OPDIAFTPACC'] && MASTERDATA['OPDIAFTPAFI'].Items[0].Value">
                  <td width="380">5. {{__label(MASTERDATA['OPDIAFTPACC'])}}</td>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPACC'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'">
                          <input type="checkbox" :id="'OPDIAFTPACCradio-' + index" v-model="item.Value">
                          <label :for="'OPDIAFTPACCradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['OPDIAFTPACC'].Items, item)">{{__label(item)}}</label>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['OPDIAFTPTSI']">
                  <td width="380">{{__label(MASTERDATA['OPDIAFTPTSI'])}}</td>
                  <td>
                    <div class="group-radio">
                      <template :data="item"  v-for="(item,index) in MASTERDATA['OPDIAFTPTSI'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'">
                          <input type="checkbox" :id="'OPDIAFTPTSIradio-' + index" v-model="item.Value">
                          <label :for="'OPDIAFTPTSIradio-' + index" @click="checkbox2Radio(MASTERDATA['OPDIAFTPTSI'].Items, item)">{{__label(item)}}</label>
                        </span>
                      </template>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          </template>
          <tr v-else>
            <th width="20%">{{___t('Câu hỏi sàng lọc')}}</th>
            <td colspan="3">
              <CommunicableDiseasesScreening v-model="MASTERDATA" :type="'ODTH'" :version="DataSubmit.Version"/>
            </td>
          </tr>
        </table>
      </div>
      <div v-else>
        <TelehealthForm
          :DataSubmit="DataSubmit"
          :MASTERDATA="MASTERDATA"
          :VisitId="$route.params.Id"
          :hideInitialAssessmentForm="true"
        />
      </div>
      <div class="tbl-title">2. {{__t('Các thuốc đang dùng (BS khai thác thông tin khi đánh giá người bệnh)')}}</div>
      <list-of-current-medications
        ref="ListOfCurrentMedications"
        :Type="'OPD-PatientMedicationList'"
        :VisitTypeGroupCode="'OPD'"
        :RealOnly="true"
      />
      <div v-if="DataSubmit.Version >= 7">
        <Confirm
          class="mt-10"
          :MasterDataCode="'TELEHEALTHCONFIRM'"
          :FormCode="'OPDIAFTP'"
          :ReadOnly="!(allowEdit && !IsFormLocked(DataSubmit))"
          :AdInfo="DataSubmit.IsNew ? '' : [DataSubmit.Username]"
          :VisitId="$route.params.Id"
          :FormId="DataSubmit.Id"
          :ShowButtonConfirm="!DataSubmit.IsNew"
          @confirmSuccess="reload()"
          @getListConfirm="getListConfirm"
          @handleConfirm="handleSave"
          :saveSuccesss="saveSuccesss"
        />
      </div>
      <div class="status-float-block" v-if="(allowEditDoctor && !IsFormLocked(DataSubmit))">
        <div class="action-btn-block">
          <div class="container">
            <div class="content-container">
              <div class="row">
                <div class="col-sm-2 col-md-1">
                  <div class="form-group1">
                    <button class="btn v-red-btn btn-block" type="button" @click="removeETR()">{{__t('btn.xoa')}}</button>
                  </div>
                </div>
                <div class="col-sm-2 col-md-2">
                  <div class="form-group1">
                    <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                  </div>
                </div>
                <div class="col-sm-4 col-md-4">
                  <div class="form-group1">
                  </div>
                </div>
                <div class="col-sm-4 col-md-5" v-if="allowEditDoctor">
                  <div class="form-group1">
                    <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <logs :EdId="this.$route.params.Id" :Type="'OPD/InitialAssessments/ForTelehealth'" />
      <!-- <his-doctor :OpdId="this.$route.params.Id" ref="HisDoctor" @close="updateDoctor" /> -->
      <p>A02_012_080121_VE</p>
      <br/>
    </div>
    <div v-else class="text-center padding20">
      <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
      <!-- <p>Chưa có đánh giá ban đầu cho bệnh nhân sử dụng dịch vụ lẻ</p>
      <button v-if="!IsLocked" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button> -->
      <!-- <button class="btn btn-warning">Tạo form chăm sóc sức khỏe từ xa</button> -->
    </div>
  </div>
  <div v-else class="text-center"><v-loading/></div>
</template>
<script>
import Confirm from '@/components/Form/Confirm3'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
// import HisDoctor from '@/components/OPD/HisDoctor.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import InitialAssessment from '@/services/OPD/InitialAssessment'
// import moment from 'moment'
import VDatePicker from '@/components/VDateTimePicker.vue'
import NProgress from 'nprogress'
import _ from 'lodash'
import MaskedInput from 'vue-masked-input'
import VSelectBox from '@/components/VSelect.vue'
import Logs from '@/components/Logs.vue'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import InitialAssessmentForm from '@/components/OPD/InitialAssessmentForm.vue'
import TelehealthForm from '@/components/OPD/TelehealthForm.vue'
export default {
  name: 'InitialAssessmentTelehealth',
  mixins: [MixinMasterData, MixinForm],
  props: ['OpdId'],
  components: {
    ListOfCurrentMedications,
    VDatePicker,
    VSelectBox,
    MaskedInput,
    Logs,
    InitialAssessmentForm,
    CommunicableDiseasesScreening,
    TelehealthForm,
    Confirm
  },
  data () {
    return {
      DataSubmit: {
        Datas: [],
        IsShowSyncButton: false,
        IsNew: false,
        PrimaryDoctor: {}
      },
      PrimaryDoctors: [],
      IsTeleheath: false,
      syncing: false,
      IsLocked: false,
      loaded: false,
      ConfirmInfo: [],
      saveSuccesss: false,
      dataMaster: {}
    }
  },
  computed: {
    // 3: function () {
    //   return this.MASTERDATA['OPDIAFTPTSI'].Items[1].Value ? 2 : 1
    // },
    rowspanOPDIAFTPTSI: function () {
      return this.MASTERDATA['OPDIAFTPAFI'].Items[0].Value ? 6 : 2
    },
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDIAFTPWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDIAFTPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['OPDIAFTPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDIAFTPHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    },
    allowEdit () {
      if (this.DataSubmit.Version >= 7) {
        return (this.DataSubmit.IsNew || this.DataSubmit.Username === this.getCurrentUsername()) && !(this.ConfirmInfo.length > 0 && this.ConfirmInfo[0].ConfirmBy)
      }
      return true
    },
    allowEditDoctor () {
      return this.DataSubmit.IsNew || this.DataSubmit.Username === this.getCurrentUsername()
    }
  },
  mounted () {
  },
  created () {
    this.getMasterDatas({Form: 'OPDIAFTP'}, () => {
      this.getClinics()
      this.getData()
    })
  },
  methods: {
    async handleSave () {
      console.log('handleSave ~ handleSave')
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        await this.save()
      }
      this.saveSuccesss = await true
      console.log('handleSave ~ saveSuccesss', this.saveSuccesss)
    },
    getListConfirm (val) {
      this.ConfirmInfo = val
    },
    push2Wh (data) {
      if (data.Weight) this.MASTERDATA['OPDIAFTPWEI'].Items[0].Value = data.Weight
      if (data.Height) this.MASTERDATA['OPDIAFTPHEI'].Items[0].Value = data.Height
    },
    removeETR () {
      this.$modal.show('dialog', {
        title: 'Bạn muốn xóa bệnh nhân này không?',
        text: '<p>Hành động xóa hồ sơ bệnh án của bạn sẽ được lưu lại, dữ liệu đã nhập tại hồ sơ này sẽ bị mất.</p> <b>Chú ý</b>: Chỉ người tạo hồ sơ mới có quyền xóa, bạn cũng sẽ không thể xóa hồ sơ khi bác sĩ đã nhập thông tin.',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Đồng ý',
            class: 'btn',
            handler: () => {
              this.removeETRConfirmed()
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Hủy bỏ',
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    removeETRConfirmed () {
      new InitialAssessment().update('Delete/' + this.$route.params.Id, this.DataSubmit).then(response => {
        this.go2Home()
      })
    },
    syncData () {
      this.syncing = true
      new InitialAssessment().update('ForTelehealth/Sync/' + this.$route.params.Id).then(response => {
        // this.toastedSuccess(`Dữ liệu đồng bộ từ: ${response.Clinic ? (response.Clinic.ViName || 'N/A') : 'N/A'} khám lúc ${response.AdmittedDate}`)
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(response.Datas, {Code: code})
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
        this.syncing = false
      }).catch(e => {
        this.syncing = false
      })
    },
    checkbox2RadioAndTSI (items, item) {
      items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
          if (this.checkString(element.DataType, 'Select')) {
            element.Value = ''
          }
        }
      })
      setTimeout(() => {
        var checked = (this.MASTERDATA['OPDIAFTPAFI'].Items[0].Value && this.MASTERDATA['OPDIAFTPARO'].Items[0].Value) ||
                      (this.MASTERDATA['OPDIAFTPAFI'].Items[0].Value && this.MASTERDATA['OPDIAFTPTOC'].Items[0].Value) ||
                      (this.MASTERDATA['OPDIAFTPAFI'].Items[0].Value && this.MASTERDATA['OPDIAFTPSOB'].Items[0].Value && this.MASTERDATA['OPDIAFTPACC'].Items[0].Value)
        this.MASTERDATA['OPDIAFTPTSI'].Items[1].Value = checked
        this.MASTERDATA['OPDIAFTPTSI'].Items[0].Value = !checked
      }, 10)
    },
    updateDoctor (item) {
      item.DisplayName = item.Fullname
      this.DataSubmit.PrimaryDoctor = item
    },
    syncHisDoctor () {
      this.$refs.HisDoctor.open(this.DataSubmit.PrimaryDoctor)
    },
    validateForm () {
      // abc
      var isNoValidate = this.DataSubmit.InitialAssessmentForm.find(form => {
        return !form.Removed && (!(form.PrimaryDoctor && form.PrimaryDoctor.Id) || !(form.Clinic && form.Clinic.Id))
      })
      if (isNoValidate) {
        this.$modal.show('dialog', {
          title: 'Có lỗi xảy ra',
          text: 'Bạn vui lòng nhập đầy đủ thông tin phòng khám và bác sĩ',
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: 'Đồng ý',
              class: 'btn bg-yellow',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
        throw new Error('validate form')
      }
      var errors = []
      if (this.MASTERDATA['OPDIAFTPALL'].Items[0].Value && !this.MASTERDATA['OPDIAFTPALL'].Items[3].Value) {
        errors.push(this.MASTERDATA['OPDIAFTPALL'].Items[3])
      }
      if (this.MASTERDATA['OPDIAFTPALL'].Items[0].Value && !this.MASTERDATA['OPDIAFTPALL'].Items[4].Value) {
        errors.push(this.MASTERDATA['OPDIAFTPALL'].Items[4])
      }
      if (errors.length) {
        this.handlerResponse({Error: errors})
      }
    },
    save () {
      this.validateForm()
      NProgress.start()
      var obj = {}
      this.DataSubmit.Datas = []
      this.DataSubmit._Exception = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      if (!obj['OPDIAFTPPAIYES']) {
        this.resetMdData('OPDIAFTPPS0')
        this.resetMdData('OPDIAFTPPL0')
        this.resetMdData('OPDIAFTPPSD')
        this.resetMdData('OPDIAFTPPF0')
        this.resetMdData('OPDIAFTPPC0')
        this.resetMdData('OPDIAFTPHPU')
        this.resetMdData('OPDIAFTPPME')
      }
      if (!obj['OPDIAFTPAFIYES']) {
        this.resetMdData('OPDIAFTPARO')
        this.resetMdData('OPDIAFTPTOC')
        this.resetMdData('OPDIAFTPSOB')
        this.resetMdData('OPDIAFTPACC')
      }
      if (!obj['OPDIAFTPHPUYES']) {
        this.resetMdData('OPDIAFTPPME')
      }

      var DataSubmit = Object.assign({}, this.DataSubmit)
      if (typeof DataSubmit.AdmittedDate === 'object') {
        DataSubmit.AdmittedDate = this.moment2String(DataSubmit.AdmittedDate)
      }
      // if (DataSubmit.AdmittedDate) {
      //   DataSubmit._Exception.push({
      //     key: 'AdmittedDate',
      //     value: DataSubmit.AdmittedDate
      //   })
      // }
      if (DataSubmit.Clinic) {
        DataSubmit._Exception.push({
          key: 'Clinic',
          value: DataSubmit.Clinic.ViName
        })
      }
      if (DataSubmit.PrimaryDoctor) {
        DataSubmit._Exception.push({
          key: 'PrimaryDoctor',
          value: DataSubmit.PrimaryDoctor.Fullname
        })
      }
      DataSubmit.ClinicId = DataSubmit.Clinic ? DataSubmit.Clinic.Id : null
      setTimeout(() => {
        this.saveData(DataSubmit)
      }, 100)
    },
    async saveData (DataSubmit) {
      if (this.allowEdit) {
        await new InitialAssessment().update(this.$route.params.Id, DataSubmit, 'ForTelehealth/').then(response => {
          this.edited = false
        }).catch(e => {
          this._401ResponseError(e)
        })
      }
      await this.$refs.InitialAssessmentForm.save(this.allowEditDoctor)
      this.toastedSuccess()
      console.log('saveDone')
    },
    checkbox2Reset (items, item) {
      setTimeout(() => {
        items.forEach($item => {
          if (this.checkString($item.DataType, 'Text')) {
            if (item.Value) {
              $item.Value = ''
            }
            $item.IsReadOnly = item.Value
          }
        })
      }, 10)
    },
    resetMdData (key) {
      if (!this.MASTERDATA[key]) return
      this.MASTERDATA[key].Items.forEach(item => {
        item.Value = null
      })
      this.DataSubmit.Datas.forEach(item => {
        if (item.Group === key) {
          item.Value = null
        }
      })
    },
    submitTeleheath () {
      new InitialAssessment().update(this.$route.params.Id, {}, 'ForTelehealth/confirm/').then(response => {
        // this.$router.push({name: 'etr', params: {Id: response.Id}})
        // this.toastedSuccess()
        // this.edited = false
        // this.$refs.ListOfCurrentMedications.submit()
        this.reload()
      }).catch(e => {
        this.$router.push({name: 'OPDInitialAssessmentShort', params: {Id: this.$route.params.Id}})
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: 'Thông báo',
        text: 'Bạn xác định đây là bệnh nhân được chăm sóc sức khỏe từ xa?',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Tôi xác nhận',
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.submitTeleheath()
            }
          },
          {
            title: 'Bỏ qua',
            class: 'btn',
            handler: () => {
              this.$router.push({name: 'OPDInitialAssessmentShort', params: {Id: this.$route.params.Id}})
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    getData () {
      new InitialAssessment().find('ForTelehealth/' + this.$route.params.Id + '?hidemsg=false').then(response => {
        this.IsTeleheath = true
        this.DataSubmit = response
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.DataSubmit.Clinic = this.Clinics.find(e => e.Id === this.DataSubmit.ClinicId)
        // if (!this.DataSubmit.AdmittedDate) {
        //   this.DataSubmit.AdmittedDate = new Date()
        // } else {
        //   this.DataSubmit.AdmittedDate = this.string2Moment(this.DataSubmit.AdmittedDate, this.vDateTimeFormat)
        // }
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
        if (response.IsNew) {
          this.getHeightAndWeight('OPDIAFTPHEI', 'OPDIAFTPWEI')
          this.getAllergy('OPDIAFTPALL')
        }
        setTimeout(() => {
          this.dataMaster = JSON.stringify(this.MASTERDATA)
          this.edited = false
          this.loaded = true
        }, 10)
      }).catch(e => {
        console.log(e)
        this.loaded = true
        this.IsTeleheath = false
        if (e.status === 404) {
          this.IsLocked = e.data && e.data.IsLocked
        }
      })
    }
  }
}
</script>
