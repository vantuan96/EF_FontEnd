<template>
  <div class="main-content" id="etr-page">
    <!-- <h1 v-if="DataSubmit.Customer">Bệnh nhân: {{DataSubmit.Customer.Fullname}} - {{DataSubmit.Customer.PID}} <a href="#" class="pull-right">Xem chi tiết</a></h1> -->
    <!-- <ed :EdId="this.$route.params.Id"/> -->
    <div class="v-tab" v-if="!Loading">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="{'active': tab === 'tab1'}"><a href="#tab1" @click="tab = 'tab1'" aria-controls="tab1" role="tab" data-toggle="tab">{{__t('ETR.phan_loai_cap_cuu_benh_nhan')}}</a></li>
        <li v-if="DataSubmit.IsVisitLastUpdate" role="presentation">
          <router-link :to="{name: 'EDInitialAssessmentFallRiskScreening', params: { Id: $route.params.Id }}">
            {{__t('ETR.sang_loc_nga')}}
          </router-link>
        </li>
        <li v-else role="presentation" :class="{'active': tab === 'tab2'}"><a href="#tab2" @click="tab = 'tab2'" aria-controls="tab2" role="tab" data-toggle="tab">{{__t('ETR.sang_loc_nga')}}</a></li>
        <li role="presentation" :class="{'active': tab === 'tab3'}"><a href="#tab3" @click="tab = 'tab3'" aria-controls="tab3" role="tab" data-toggle="tab">{{__t('Y lệnh miệng')}}</a></li>
        <li role="presentation">
          <router-link :to="{name: 'ED-AssessmentForRetailServicePatient', params: { Id: $route.params.Id }}">
            {{__t('Đánh giá NB dịch vụ lẻ')}}
          </router-link>
        </li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane" id="tab1" :class="{'active': tab === 'tab1'}">
          <div class="tabs-header">
            <label required>{{__t('ETR.ngay_gio')}}</label>
            <span :class="{ 'form-group--error': $v.DataSubmit.TriageDateTime.$error }">
              <v-masked-input mask="11:11 11/11/1111" :placeholder="'HH:mm MM/DD/YYYY'" class="form-control datetime-input" v-model="DataSubmit.TriageDateTime"/>
            </span>
            <label>{{__t('ETR.giuong')}}</label>
            <input type="text" v-model="DataSubmit.Bed" class="form-control auto-width">
            <button v-if="DataSubmit.IsNew" class="btn btn-sync-data pull-right" @click="syncData()">{{__t('Lấy dữ liệu đánh giá gần nhất trong vòng 24 giờ')}}</button>
          </div>
          <table class="table v-table-1" v-if="!syncing">
            <tr v-if="DataSubmit.IsCovidSpecialty">
              <th width="20%">{{__t('Phân loại nguy cơ')}}</th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item, index) in RickGroups">
                    <input type="radio" :id="'EcTRATSradio-' + index" v-model="DataSubmit.CovidRiskGroup" :value="item.value">
                    <label :class="'EcTRATSradio-' + item.value" :for="'EcTRATSradio-' + index">{{__t(item.label)}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="DataSubmit.IsCovidSpecialty">
              <th width="20%">{{__t('Bác sĩ chính')}}</th>
              <td>
                <user-ad :field="'Id'" :position="'Doctor'" :placeholder="'Chọn bác sĩ theo dõi'" v-model="DataSubmit.PrimaryDoctorId"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRATS']">
              <th width="20%">{{__label(MASTERDATA['ETRATS'])}}aa</th>
              <td>
                <div class="group-radio NotAllowNull">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRATS'].Items" v-if="item.Code !== '6ETRATSSSP'">
                    <input type="checkbox" :id="'ETRATSradio-' + index" v-model="item.Value">
                    <label :for="'ETRATSradio-' + index" @click="checkbox2RadioNotAllowNull(MASTERDATA['ETRATS'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <th width="20%">{{__t('Dấu hiệu sinh tồn')}}</th>
              <td class="no-padding">
                <observation-table
                  :onEtr="true"
                  :VisitId="this.$route.params.Id"
                  :VisitType="'ED'"
                  ref="ObservationTable"
                />
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRCC0']">
              <th width="20%">
                <!-- Than phiền chính -->
                {{__label(MASTERDATA['ETRCC0'])}}
                <!-- <tpc ref="VisioPopup" /> -->
              </th>
              <td>
                <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRCC0'].Items" class="cursor">
                  <textarea-autosize class="form-control" v-model="item.Value"/>
                </span>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRIA0']">
              <th width="20%">
                <!-- Đánh giá sơ bộ -->
                {{__label(MASTERDATA['ETRIA0'])}}
              </th>
              <td>
                <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRIA0'].Items">
                  <textarea-autosize class="form-control" v-model="item.Value"/>
                </span>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRALL']" class="borded-bottom highlighted-radio">
              <!-- dị ứng -->
              <th width="20%">{{__label(MASTERDATA['ETRALL'])}}</th>
              <td>
                <div class="group-radio">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['ETRALL'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input :class="'highlight-yes-radio-' + index" type="checkbox" :id="'ETRALLradio-' + index" v-model="item.Value">
                      <label :for="'ETRALLradio-' + index" @click="checkbox2Radio(MASTERDATA['ETRALL'].Items, item)">{{__label(item)}}</label>
                    </span>
                    <span :key="index" v-else-if="item.DataType === 'Select'">
                      <allergies-select v-model="item.Value" :multi="true" :items="JSONParse(item.Data, true)" v-if="MASTERDATA['ETRALL'].Items[0].Value"/>
                    </span>
                    <span :key="index" v-else style="flex-grow: 1;">
                      <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['ETRALL'].Items[0].Value"/>
                    </span>
                  </template>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRRES']">
              <th width="20%">{{__label(MASTERDATA['ETRRES'])}}</th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRRES'].Items">
                    <input type="checkbox" :id="'ETRRESradio-' + index" v-model="item.Value">
                    <label :for="'ETRRESradio-' + index" @click="checkbox2Radio(MASTERDATA['ETRRES'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRBGL']">
              <th width="20%">{{__label(MASTERDATA['ETRBGL'])}}</th>
              <td>
                  <div class="v-addone-input-group" :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRBGL'].Items">
                    <input class="v-input-md2 form-control" type="text" v-model="item.Value">
                    <span>{{item.Note}}</span>
                  </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRHEA']">
              <th width="20%">{{__label(MASTERDATA['ETRHEA'])}}</th>
              <td>
                <!-- <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRHEA'].Items">
                    <input type="checkbox" :id="'ETRHEAradio-' + index" v-model="item.Value">
                    <label :for="'ETRHEAradio-' + index" @click="checkbox2Radio(MASTERDATA['ETRHEA'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div> -->
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRHEA'].Items">
                    <template v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'ETRHEAradio-' + index" v-model="item.Value">
                      <label :for="'ETRHEAradio-' + index" @click="checkbox2Radio(MASTERDATA['ETRHEA'].Items, item)">{{__label(item)}}</label>
                    </template>
                    <template v-else>
                      <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['ETRHEA'].Items[2].Value"/>
                    </template>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRRP0']">
              <th width="20%">{{__label(MASTERDATA['ETRRP0'])}}</th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRRP0'].Items">
                    <input type="checkbox" :id="'ETRRP0radio-' + index" v-model="item.Value">
                    <label :for="'ETRRP0radio-' + index" @click="checkbox2RadioETRRP0(MASTERDATA['ETRRP0'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRGCS']">
              <th width="20%">
                {{__label(MASTERDATA['ETRGCS'])}}
                <!-- Glasgow comma Scale -->
              </th>
              <td>
                <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRGCS'].Items">
                  <input class="v-input-sm form-control" readonly :value="ETRGCS"/>
                </span>
                <b>{{__label(MASTERDATA['ETREYE'])}}</b>
                <template v-for="it in MASTERDATA['ETREYE'].Items">
                  <input :key="it.Code + '-label'" type="number" class="v-input-sm form-control" v-model="it.Value"/>
                </template>
                <b>{{__label(MASTERDATA['ETRVOI'])}}</b>
                <template v-for="it in MASTERDATA['ETRVOI'].Items">
                  <input :key="it.Code + '-label'" type="number" class="v-input-sm form-control" v-model="it.Value"/>
                </template>
                <b>{{__label(MASTERDATA['ETRMOV'])}}</b>
                <template v-for="it in MASTERDATA['ETRMOV'].Items">
                  <input :key="it.Code + '-label'" type="number" class="v-input-sm form-control" v-model="it.Value"/>
                </template>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRAVP']">
              <th width="20%">{{__label(MASTERDATA['ETRAVP'])}}</th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRAVP'].Items">
                    <input type="checkbox" :id="'ETRAVPradio-' + index" v-model="item.Value">
                    <label :for="'ETRAVPradio-' + index" @click="checkbox2Radio(MASTERDATA['ETRAVP'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRPS0']" class="borded-bottom hidden-on-production">
              <!-- Điểm đau -->
              <th width="20%">{{__label(MASTERDATA['ETRPS0'])}} Cũ, tạm thời giữ lại để test đồng bộ cũ mới</th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRPS0'].Items">
                    <template v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'ETRPS0radio-' + index" v-model="item.Value">
                      <label :for="'ETRPS0radio-' + index" @click="checkbox2RadioDD(MASTERDATA['ETRPS0'].Items, item)">{{__label(item)}}</label>
                    </template>
                    <template v-else-if="item.DataType === 'Select'">
                      <v-select :placeholder="'Đơn vị'" v-model="item.Value" :items="JSONParse(item.Data, true)"/>
                    </template>
                    <template v-else>
                      <input type="number" class="v-input-sm form-control" v-model="item.Value"/>
                    </template>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRPAI']">
              <th width="20%">{{__label(MASTERDATA['ETRPAI'])}}</th>
              <td>
                <div class="group-radio">
                  <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRPAI'].Items">
                    <input type="checkbox" :id="'ETRPAIradio-' + index" v-model="item.Value">
                    <label :for="'ETRPAIradio-' + index" @click="checkbox2Radio(MASTERDATA['ETRPAI'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
                <template v-if="MASTERDATA['ETRPAI'].Items[0].Value">
                  <div class="row">
                    <template v-if="MASTERDATA['ETRPSC']">
                      <div class="col-md-3">
                        <label>{{__label(MASTERDATA['ETRPSC'])}}</label>
                        <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'ETRPSC'" v-for="(item,index) in MASTERDATA['ETRPSC'].Items">
                      </div>
                    </template>
                    <template v-if="MASTERDATA['ETRPL0']">
                      <div class="col-md-3">
                        <label>{{__label(MASTERDATA['ETRPL0'])}}</label>
                        <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'ETRPL0'" v-for="(item,index) in MASTERDATA['ETRPL0'].Items">
                      </div>
                    </template>
                    <template v-if="MASTERDATA['ETRPSD']">
                      <div class="col-md-6">
                        <label>{{__label(MASTERDATA['ETRPSD'])}}</label>
                        <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'ETRPSD'" v-for="(item,index) in MASTERDATA['ETRPSD'].Items">
                      </div>
                    </template>
                  </div>
                  <div class="v-row">
                    <div class="group-radio">
                      <b class="flex-box-label">{{__t('Tần suất đau')}}</b>
                      <template :data="item"  v-for="(item,index) in MASTERDATA['ETRPF0'].Items">
                        <span :key="index" v-if="item.DataType === 'Radio'">
                          <input type="checkbox" :id="'ETRPF0radio-' + index" v-model="item.Value">
                          <label :for="'ETRPF0radio-' + index" @click="checkbox2Radio(MASTERDATA['ETRPF0'].Items, item)">{{__label(item)}}</label>
                        </span>
                        <span :key="index" v-else style="flex-grow: 1;">
                          <textarea-autosize  :placeholder="__label(item)" class="form-control" v-model="item.Value" v-if="MASTERDATA['ETRPF0'].Items[3].Value"/>
                        </span>
                      </template>
                    </div>
                  </div>
                  <div class="v-row ">
                    <div class="group-radio">
                      <template v-if="MASTERDATA['ETRPC0']">
                        <b>{{__label(MASTERDATA['ETRPC0'])}}</b>
                        <input class="form-control" :placeholder="__label(item)" type="text" v-model="item.Value" :data="item" :key="index + 'ETRPC0'" v-for="(item,index) in MASTERDATA['ETRPC0'].Items">
                      </template>
                    </div>
                  </div>
                  <div class="v-row">
                    <template v-if="MASTERDATA['ETRHPU']">
                      <div class="flex-box">
                        <label class="flex-box-label">{{__label(MASTERDATA['ETRHPU'])}}</label>
                        <div class="group-radio">
                          <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRHPU'].Items">
                            <template v-if="checkString(item.DataType, 'Radio')">
                              <input type="checkbox" :id="'ETRHPUradio-' + index" v-model="item.Value">
                              <label :for="'ETRHPUradio-' + index" @click="checkbox2Radio(MASTERDATA['ETRHPU'].Items, item)">{{__label(item)}}</label>
                            </template>
                          </span>
                        </div>
                        <i class="flex-box-label" v-if="MASTERDATA['ETRHPU'].Items[0].Value">{{__t('Bác sĩ khai thác thông tin tại phiếu khám ngoại trú')}}</i>
                      </div>
                    </template>
                  </div>
                  <div class="v-row" v-if="MASTERDATA['ETRHPU'] && MASTERDATA['ETRHPU'].Items[0].Value">
                    <template v-if="MASTERDATA['ETRPME']">
                      <div class="flex-box">
                        <label class="flex-box-label">{{__label(MASTERDATA['ETRPME'])}}</label>
                        <div class="group-radio">
                          <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRPME'].Items">
                            <template v-if="checkString(item.DataType, 'Radio')">
                              <input type="checkbox" :id="'ETRPMEradio-' + index" v-model="item.Value">
                              <label :for="'ETRPMEradio-' + index" @click="checkbox2Radio(MASTERDATA['ETRPME'].Items, item)">{{__label(item)}}</label>
                            </template>
                          </span>
                        </div>
                      </div>
                    </template>
                  </div>
                </template>
              </td>
            </tr>
            <tr class="borded-bottom" v-if="DataSubmit.Version === 1">
              <th width="20%">{{__label(MASTERDATA['ETRAF0'])}}</th>
              <td>
                <div class="row" v-if="MASTERDATA['ETRAF0']">
                  <div class="col-md-2">
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRAF0'].Items">
                        <template v-if="item.DataType === 'Radio'">
                          <input type="checkbox" :id="'ETRAF0radio-' + index" v-model="item.Value">
                          <label :for="'ETRAF0radio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['ETRAF0'].Items, item)">{{__label(item)}}</label>
                        </template>
                        <template v-else>
                          <input class="form-control" type="text" v-model="item.Value">
                        </template>
                      </span>
                    </div>
                  </div>
                  <div class="col-md-10" v-if="MASTERDATA['ETRAF0'].Items[0].Value">
                    <label>{{__label(MASTERDATA['ETRARO'])}}</label>
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRARO'].Items">
                        <input type="checkbox" :id="'ETRAROradio-' + index" v-model="item.Value">
                        <label :for="'ETRAROradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['ETRARO'].Items, item)">{{__label(item)}}</label>
                      </span>
                    </div>
                    <label>{{__label(MASTERDATA['ETRTOC'])}}</label>
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRTOC'].Items">
                        <input type="checkbox" :id="'ETRTOCradio-' + index" v-model="item.Value">
                        <label :for="'ETRTOCradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['ETRTOC'].Items, item)">{{__label(item)}}</label>
                      </span>
                    </div>
                    <label>{{__label(MASTERDATA['ETRSOB'])}}</label>
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRSOB'].Items">
                        <input type="checkbox" :id="'ETRSOBradio-' + index" v-model="item.Value">
                        <label :for="'ETRSOBradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['ETRSOB'].Items, item)">{{__label(item)}}</label>
                      </span>
                    </div>
                    <label>{{__label(MASTERDATA['ETRACC'])}}</label>
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRACC'].Items">
                        <input type="checkbox" :id="'ETRACCradio-' + index" v-model="item.Value">
                        <label :for="'ETRACCradio-' + index" @click="checkbox2RadioAndTSI(MASTERDATA['ETRACC'].Items, item)">{{__label(item)}}</label>
                      </span>
                    </div>
                    <label>{{__label(MASTERDATA['ETRDGL'])}}</label>
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRDGL'].Items">
                        <input type="checkbox" :id="'ETRDGLradio-' + index" v-model="item.Value">
                        <label :for="'ETRDGLradio-' + index" @click="checkbox2Radio(MASTERDATA['ETRDGL'].Items, item)">{{__label(item)}}</label>
                      </span>
                    </div>
                    <template v-if="MASTERDATA['ETRDGL'] && MASTERDATA['ETRDGL'].Items[1].Value">
                    <label>{{__label(MASTERDATA['ETRLCL'])}}</label>
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRLCL'].Items">
                        <template v-if="item.DataType === 'Radio'">
                          <input type="checkbox" :id="'ETRLCLradio-' + index" v-model="item.Value">
                          <label :for="'ETRLCLradio-' + index" @click="checkbox2Radio(MASTERDATA['ETRLCL'].Items, item)">{{__label(item)}}</label>
                        </template>
                        <template v-else>
                          <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['ETRLCL'].Items[3].Value"/>
                        </template>
                      </span>
                    </div>
                    </template>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-else>
              <th width="20%">{{__t('Câu hỏi sàng lọc')}}</th>
              <td>
                <CommunicableDiseasesScreening v-model="MASTERDATA" :type="'EDET'" :version="DataSubmit.Version"/>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRPHH']">
              <th width="20%">{{__label(MASTERDATA['ETRPHH'])}}</th>
              <td>
                <div class="group-radio">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['ETRPHH'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'ETRPHHradio-' + index" v-model="item.Value">
                      <label :for="'ETRPHHradio-' + index" @click="checkbox2Radio(MASTERDATA['ETRPHH'].Items, item)">{{__label(item)}}</label>
                    </span>
                    <span :key="index" v-else style="flex-grow: 1;">
                      <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['ETRPHH'].Items[0].Value"/>
                    </span>
                  </template>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRPML']" class="borded-bottom">
              <th width="20%">{{__label(MASTERDATA['ETRPML'])}}</th>
              <td>
                <div class="group-radio">
                  <template :data="item"  v-for="(item,index) in MASTERDATA['ETRPML'].Items">
                    <span :key="index" v-if="item.DataType === 'Radio'">
                      <input type="checkbox" :id="'ETRPMLradio-' + index" v-model="item.Value">
                      <label :for="'ETRPMLradio-' + index" @click="checkbox2Radio(MASTERDATA['ETRPML'].Items, item)">{{__label(item)}}</label>
                    </span>
                    <span :key="index" v-else style="flex-grow: 1;">
                      <!-- <textarea-autosize class="form-control" v-model="item.Value" v-if="MASTERDATA['ETRPML'].Items[0].Value"/> -->
                      <template v-if="MASTERDATA['ETRPML'].Items[0].Value">
                        <p>{{item.Value}}</p>
                        <p class="note-text">{{__t('Vui lòng nhập chi tiết vào bảng phía dưới')}}</p>
                      </template>
                    </span>
                  </template>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRHEI']" class="borded-bottom">
              <th width="20%">{{__label(MASTERDATA['ETRHEI'])}}/ {{__label(MASTERDATA['ETRWEI'])}}</th>
              <td>
                <template :data="item"  v-for="(item, index) in MASTERDATA['ETRHEI'].Items">
                  <div class="v-addone-input-group2" :key="item.Code + '-' +index" >
                    <number-input inline v-model="item.Value" :placeholder="__t('Nhập')"/>
                    <span>{{item.Note}}</span>
                  </div>
                </template>
                <template :data="item"  v-for="(item, index) in MASTERDATA['ETRWEI'].Items">
                  <div class="v-addone-input-group2" :key="item.Code + '-' +index" >
                    <number-input inline v-model="item.Value" :placeholder="__t('Nhập')"/>
                    <span>{{item.Note}}</span>
                  </div>
                </template>
                <label>{{__t('ETR.chi_so_bmi')}}</label>
                <input type="number" class="v-input-md2 form-control" readonly :value="bmiCalculation"/>
                <height-and-weight v-if="DataSubmit.IsNew" @copy="push2Wh" />
              </td>
            </tr>
          </table>
          <template v-if="MASTERDATA['ETRPML'] && MASTERDATA['ETRPML'].Items[0].Value">
          <div class="tbl-title">{{__t('Khai thác thông tin thuốc đã dùng')}}</div>
          <div class="box box-table">
            <list-of-current-medications
            :EdId="$route.params.Id"
            ref="ListOfCurrentMedications"
            :Type="'ED-PatientMedicationList'"
            :VisitTypeGroupCode="'ED'"
            />
          </div>
          </template>
          <FloatBlock :openBack="true" @handleBack="handleBack">
            <template slot='buttons'>
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                  <button class="btn v-red-btn btn-block" type="button" @click="removeETR()">{{__t('btn.xoa')}}</button>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                  <button v-if="DataSubmit.IsVisitLastUpdate" class="btn btn-block v-white-btn" type="button" @click="$router.push({name: 'EDInitialAssessmentFallRiskScreening', params: {Id: $route.params.Id}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Sàng lọc ngã')}}</button>
                  <button v-else class="btn btn-block v-white-btn" type="button" @click="tab = 'tab2'"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Sàng lọc ngã')}}</button>
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
                <div class="form-group1">
                  <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                </div>
              </div>
            </template>
          </FloatBlock>
        </div>
        <div role="tabpanel" class="tab-pane" id="tab2" :class="{'active': tab === 'tab2'}">
          <div class="tabs-header">
            <label required>{{__t('ETR.ngay_gio')}}</label>
            <span :class="{ 'form-group--error': $v.DataSubmit.TriageDateTime.$error }">
              <v-masked-input mask="11:11 11/11/1111" :placeholder="'HH:mm MM/DD/YYYY'" class="form-control datetime-input" v-model="DataSubmit.TriageDateTime"/>
            </span>
            <label>{{__t('ETR.giuong')}}</label>
            <input type="text" v-model="DataSubmit.Bed" class="form-control auto-width">
          </div>
          <table class="table v-table-1 table-bordered">
            <tr v-if="MASTERDATA['ETRTD0']">
              <th rowspan="2" class="align-left">{{__t('ETR.cau_hoi_sang_loc')}}</th>
              <th :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRTD0'].Items">
                <v-masked-input mask="11:11 11/11/1111" v-model="item.Value" :placeholder="'HH:mm MM/DD/YYYY'" class="form-control datetime-input" />
                <span class="glyphicon glyphicon-time icon-now" @click="setNow(item)"></span>
              </th>
            </tr>
            <tr v-if="MASTERDATA['ETRLOC']">
              <th :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRLOC'].Items">
                <v-select style="width: 180px" class='select-full-w' :search="true" :placeholder="__t('Địa điểm')" v-model="item.Value" :items="listRooms"/>
              </th>
            </tr>
            <tr v-if="MASTERDATA['ETRDPH']">
              <td>{{__label(MASTERDATA['ETRDPH'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRDPH'].Items">
                <div class="v-btn-checkbox">
                  <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
                  <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
                </div>
                <!-- {{item.DataType}}
                <input type="checkbox" :id="'ETRDPH-yes-' + index" :name="'ETRDPH-yes-' + index" :selected="item.Value" @click="item.Value = true">
                <label :for="'ETRDPH-yes-' + index"></label>
                <input type="checkbox" :id="'ETRDPH-no-' + index" :name="'ETRDPH-no-' + index" :selected="!item.Value" @click="item.Value = false">
                <label :for="'ETRDPH-no-' + index"></label>
                {{item.Value}} -->
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRDPN']">
              <td>{{__label(MASTERDATA['ETRDPN'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRDPN'].Items">
                <div class="v-btn-checkbox">
                  <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
                  <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRHPS']">
              <td>{{__label(MASTERDATA['ETRHPS'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRHPS'].Items">
                <div class="v-btn-checkbox">
                  <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
                  <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRUTH']">
              <td>{{__label(MASTERDATA['ETRUTH'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRUTH'].Items">
                <div class="v-btn-checkbox">
                  <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
                  <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
                </div>
              </td>
            </tr>
            <tr>
              <th colspan="4" class="align-left">{{__t('ETR.bien_phap_can_thiep')}}</th>
            </tr>
            <tr v-if="MASTERDATA['ETRFRS']">
              <td>{{__label(MASTERDATA['ETRFRS'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRFRS'].Items" class="v-checkbox" align="center">
                <input type="checkbox" :id="'ETRFRS-' + index" :name="'ETRFRS-' + index" v-model="item.Value">
                <label :for="'ETRFRS-' + index"></label>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRPIO']">
              <td>{{__label(MASTERDATA['ETRPIO'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRPIO'].Items" class="v-checkbox" align="center">
                <input type="checkbox" :id="'ETRPIO-' + index" :name="'ETRPIO-' + index" v-model="item.Value">
                <label :for="'ETRPIO-' + index"></label>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRLUA']">
              <td>{{__label(MASTERDATA['ETRLUA'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRLUA'].Items" class="v-checkbox" align="center">
                <input type="checkbox" :id="'ETRLUA-' + index" :name="'ETRLUA-' + index" v-model="item.Value">
                <label :for="'ETRLUA-' + index"></label>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRIOE']">
              <td>{{__label(MASTERDATA['ETRIOE'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRIOE'].Items" class="v-checkbox" align="center">
                <input type="checkbox" :id="'ETRIOE-' + index" :name="'ETRIOE-' + index" v-model="item.Value">
                <label :for="'ETRIOE-' + index"></label>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRSMA']">
              <td>{{__label(MASTERDATA['ETRSMA'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRSMA'].Items" class="v-checkbox" align="center">
                <input type="checkbox" :id="'ETRSMA-' + index" :name="'ETRSMA-' + index" v-model="item.Value">
                <label :for="'ETRSMA-' + index"></label>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRPAA']">
              <td>{{__label(MASTERDATA['ETRPAA'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRPAA'].Items" class="v-checkbox" align="center">
                <input type="checkbox" :id="'ETRPAA-' + index" :name="'ETRPAA-' + index" v-model="item.Value">
                <label :for="'ETRPAA-' + index"></label>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETREDF']">
              <td>{{__label(MASTERDATA['ETREDF'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETREDF'].Items" class="v-checkbox" align="center">
                <input type="checkbox" :id="'ETREDF-' + index" :name="'ETREDF-' + index" v-model="item.Value">
                <label :for="'ETREDF-' + index"></label>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRRM0']">
              <td>{{__label(MASTERDATA['ETRRM0'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRRM0'].Items" class="v-checkbox" align="center">
                <input type="checkbox" :id="'ETRRM0-' + index" :name="'ETRRM0-' + index" v-model="item.Value">
                <label :for="'ETRRM0-' + index"></label>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRRBR']">
              <td>{{__label(MASTERDATA['ETRRBR'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRRBR'].Items" class="v-checkbox" align="center">
                <input type="checkbox" :id="'ETRRBR-' + index" :name="'ETRRBR-' + index" v-model="item.Value">
                <label :for="'ETRRBR-' + index"></label>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRUTY']">
              <td>{{__label(MASTERDATA['ETRUTY'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRUTY'].Items" class="v-checkbox" align="center">
                <input type="checkbox" :id="'ETRUTY-' + index" :name="'ETRUTY-' + index" v-model="item.Value">
                <label :for="'ETRUTY-' + index"></label>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRIOT']">
              <td>
                {{__label(MASTERDATA['ETRIOT'])}}
                <template v-for="(item,index) in MASTERDATA['ETRIOT'].Items">
                  <input :data="item" :key="index"  v-if="item.DataType === 'Text'" v-model="item.Value" class="form-control" />
                </template>
              </td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRIOT'].Items" class="v-checkbox" align="center" v-if="item.DataType === 'CheckBox'">
                <input type="checkbox" :id="'ETRIOT-' + index" :name="'ETRIOT-' + index" v-model="item.Value">
                <label :for="'ETRIOT-' + index"></label>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRINT13']">
              <td>{{__label(MASTERDATA['ETRINT13'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRINT13'].Items" class="v-checkbox" align="center">
                <input type="checkbox" :id="'ETRINT13-' + index" :name="'ETRINT13-' + index" v-model="item.Value">
                <label :for="'ETRINT13-' + index"></label>
              </td>
            </tr>
            <tr v-if="MASTERDATA['ETRINT14']">
              <td>{{__label(MASTERDATA['ETRINT14'])}}</td>
              <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['ETRINT14'].Items" class="v-checkbox" align="center">
                <input class="form-control" type="text" :id="'ETRINT14-' + index" :name="'ETRINT14-' + index" v-model="item.Value">
                <label :for="'ETRINT14-' + index"></label>
              </td>
            </tr>
          </table>
          <FloatBlock :openBack="true" @handleBack="handleBack">
            <template slot='buttons'>
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                  <button class="btn v-red-btn btn-block" type="button" @click="removeETR()">{{__t('btn.xoa')}}</button>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
                <div class="form-group1">
                  <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                </div>
              </div>
            </template>
          </FloatBlock>
        </div>
        <div role="tabpanel" class="tab-pane" id="tab3" :class="{'active': tab === 'tab3'}">
          <!-- <div class="tabs-header">
            <label required>{{__t('ETR.ngay_gio')}}</label>
            <span :class="{ 'form-group--error': $v.DataSubmit.TriageDateTime.$error }">
              <v-masked-input mask="11:11 11/11/1111" :placeholder="'HH:mm MM/DD/YYYY'" class="form-control datetime-input" v-model="DataSubmit.TriageDateTime"/>
            </span>
            <label>{{__t('ETR.giuong')}}</label>
            <input type="text" v-model="DataSubmit.Bed" class="form-control auto-width">
          </div> -->
          <orders-table :EdId="this.$route.params.Id"/>
        </div>
        <!-- <div role="tabpanel" class="tab-pane" id="tab4">
        </div> -->
      </div>
    </div>
    <logs :EdId="this.$route.params.Id" :Type="'EmergencyTriageRecords'" />
    <popup-delete @handleSubmit="removeETRConfirmed"/>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */

// import MaskedInput from 'vue-v-masked-input'
import PopupDelete from './popup/PopupDelete.vue'
import EmergencyTriageRecords from '@/services/ED/EmergencyTriageRecords'
import ObservationTable from '@/pages/ProgressNote/ObservationTable.vue'
import Logs from '@/components/Logs.vue'
import OrdersTable from '@/components/ED/Orders.vue'
import NProgress from 'nprogress'
import { required, helpers } from 'vuelidate/lib/validators'
import moment from 'moment'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import _ from 'lodash'
import Ed from '@/components/ED/VIEW_ED.vue'
import Tpc from '@/components/c_TPC.vue'
import VSelect from '@/components/VSelect.vue'
import EventBus from '@/lib/eventBus'
import VDatePicker from '@/components/VDateTimePicker.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import constants from '@/constants'

// import Allergy from '@/services/Allergy.js'
const isDate = (value) => !helpers.req(value) || moment(value, process.env.DATETIME_FORMAT, true).isValid()
export default {
  /**
   * The name of the page.
   */
  name: 'ETR',
  data () {
    return {
      syncing: false,
      tab: 'tab1',
      DataSubmit: {
        TriageDateTime: null,
        Room: null,
        Datas: [],
        Customer: {},
        Note: ''
      },
      Loading: true,
      YESNOFIELD: ['ETRALL'],
      RickGroups: constants.RISKGROUP,
      dataMaster: null,
      listRooms: []
    }
  },
  mixins: [MixinMasterData, MixinForm],
  validations: {
    DataSubmit: {
      TriageDateTime: {
        isDate, required
      }
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    // MaskedInput,
    Ed,
    VSelect,
    Tpc,
    ObservationTable,
    VDatePicker,
    OrdersTable,
    Logs,
    ListOfCurrentMedications,
    CommunicableDiseasesScreening,
    PopupDelete
  },
  mounted () {
    this.tab = this.$route.query.tab || 'tab1'
    this.getMasterDatas({Form: 'ETR'}, () => {
      this.getRooms()
      this.getData()
    })
  },
  computed: {
    ETRGCS: function () {
      return parseFloat(this.MASTERDATA['ETREYE'].Items[0].Value || 0) + parseFloat(this.MASTERDATA['ETRVOI'].Items[0].Value || 0) + parseFloat(this.MASTERDATA['ETRMOV'].Items[0].Value || 0)
    },
    bmiCalculation: function () {
      var weight = this.MASTERDATA['ETRWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['ETRWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['ETRHEI'].Items[0].Value ? parseFloat(this.MASTERDATA['ETRHEI'].Items[0].Value) / 100 : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  watch: {
    DataSubmit: {
      handler () {
        this.edited = true
      },
      deep: true
    }
  },
  methods: {
    checkbox2RadioETRRP0 (items, item) {
      var arr = ['ETRRP0STR', 'ETRRP0WEA']
      var isETRRP0IRR = item.Code === 'ETRRP0IRR'
      console.log(isETRRP0IRR)
      items.forEach(element => {
        if (element.Code !== item.Code) {
          console.log(isETRRP0IRR, arr.includes(element.Code))
          if (isETRRP0IRR && arr.includes(element.Code)) {
            // pass
          } else if (arr.includes(item.Code) && element.Code === 'ETRRP0IRR') {
            // pass
          } else {
            element.Value = false
          }
        }
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
        var checked = (this.MASTERDATA['ETRAF0'].Items[0].Value && this.MASTERDATA['ETRARO'].Items[0].Value) ||
                      (this.MASTERDATA['ETRAF0'].Items[0].Value && this.MASTERDATA['ETRTOC'].Items[0].Value) ||
                      (this.MASTERDATA['ETRAF0'].Items[0].Value && this.MASTERDATA['ETRSOB'].Items[0].Value && this.MASTERDATA['ETRACC'].Items[0].Value)
        this.MASTERDATA['ETRDGL'].Items[1].Value = checked
        this.MASTERDATA['ETRDGL'].Items[0].Value = !checked
      }, 10)
    },
    push2Wh (data) {
      if (data.Weight) this.MASTERDATA['ETRWEI'].Items[0].Value = data.Weight
      if (data.Height) this.MASTERDATA['ETRHEI'].Items[0].Value = data.Height
    },
    setNow (item) {
      item.Value = moment(new Date()).format(this.vDateTimeFormat)
    },
    checkbox2RadioDD (items, item) {
      items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
        }
      })
    },
    checkbox2RadioETRAF0 (items, item) {
      items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
        }
      })
      this.MASTERDATA['ETRARO'].Items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
        }
      })
      this.MASTERDATA['ETRTOC'].Items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
        }
      })
      this.MASTERDATA['ETRSOB'].Items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
        }
      })
      this.MASTERDATA['ETRACC'].Items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
        }
      })
      this.MASTERDATA['ETRDGL'].Items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
        }
      })
      this.MASTERDATA['ETRLCL'].Items.forEach(element => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
        }
      })
    },
    syncData () {
      this.syncing = true
      new EmergencyTriageRecords().update('Sync/' + this.$route.params.Id, {}).then(response => {
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(response.Datas, {Code: code})
              if (exited && this.MASTERDATA[property].Order < 24) {
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
    getData () {
      new EmergencyTriageRecords().find(this.$route.params.Id).then(response => {
        this.DataSubmit = response
        if (!this.DataSubmit.TriageDateTime) {
          this.DataSubmit.TriageDateTime = moment(new Date()).format(this.vDateTimeFormat)
        }
        response.Rooms.map(room => {
          this.listRooms.push(
            {
              value: room.Value,
              label: room.ViName,
              EnLabel: room.EnName || (room.ViName + '.'),
              code: room.Id
            }
          )
        })
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
        this.Loading = false
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        if (response.IsNew) {
          this.getHeightAndWeight('ETRHEI', 'ETRWEI')
          this.getAllergy('ETRALL')
        }
      }).catch(e => {
        if (e.status === 400) {
          this._404()
        }
      })
    },
    removeETR () {
      this.$modal.show('DeleteNote')
      // this.$modal.show('dialog', {
      //   title: this.__t('Bạn muốn xóa bệnh nhân này không?'),
      //   text: this.__t('<p>Hành động xóa hồ sơ bệnh án của bạn sẽ được lưu lại, dữ liệu đã nhập tại hồ sơ này sẽ bị mất.</p> <b>Chú ý</b>: Chỉ người tạo hồ sơ mới có quyền xóa, bạn cũng sẽ không thể xóa hồ sơ khi bác sĩ đã nhập thông tin.<br><b>Lý do xoá</b><br><textarea-autosize class="form-control" id="deleteNote" rows="2" placeholder="Lý do xoá hồ sơ" v-model="DataSubmit.Note"></textarea-autosize>'),
      //   class: 'v-dialog v-dialog-warning',
      //   buttons: [
      //     {
      //       title: this.__t('Đồng ý'),
      //       class: 'btn',
      //       handler: () => {
      //         this.removeETRConfirmed()
      //         this.$modal.hide('dialog')
      //       }
      //     },
      //     {
      //       title: this.__t('Hủy bỏ'),
      //       class: 'btn bg-yellow',
      //       handler: () => {
      //         this.$modal.hide('dialog')
      //       }
      //     }
      //   ]
      // })
    },
    removeETRConfirmed (note) {
      if (note) {
        this.DataSubmit.Note = note
      } else {
        this.DataSubmit.Note = ''
      }
      new EmergencyTriageRecords().update('Delete/' + this.$route.params.Id, this.DataSubmit).then(response => {
        this.go2Home()
      })
    },
    validateForm () {
      var errors = []
      if (this.MASTERDATA['ETRALL'].Items[0].Value && !this.MASTERDATA['ETRALL'].Items[3].Value) {
        errors.push(this.MASTERDATA['ETRALL'].Items[3])
      }
      if (this.MASTERDATA['ETRALL'].Items[0].Value && !this.MASTERDATA['ETRALL'].Items[4].Value) {
        errors.push(this.MASTERDATA['ETRALL'].Items[4])
      }
      if (errors.length) {
        this.handlerResponse({Error: errors})
      }
    },
    submit () {
      this.$v.DataSubmit.$touch()
      if (this.$v.DataSubmit.$error) {
        return false
      }
      this.validateForm()
      this.DataSubmit._Exception = []
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            if (property === 'ETRTD0') console.log(item.Value)
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      if (this.DataSubmit.Bed) {
        this.DataSubmit._Exception.push({
          key: 'Bed',
          value: this.DataSubmit.Bed
        })
      }
      if (this.DataSubmit.TriageDateTime) {
        this.DataSubmit._Exception.push({
          key: 'TriageDateTime',
          value: this.DataSubmit.TriageDateTime
        })
      }
      if (!obj['ETRDGLPOS']) {
        this.resetMdData('ETRLCL')
      }
      setTimeout(() => {
        this.DataSubmit.Room = {}
        new EmergencyTriageRecords().update(this.$route.params.Id, this.DataSubmit).then(response => {
          this.toastedSuccess()
          this.edited = false
          EventBus.$emit('updateGlobalEd', 'thangdc in here')
          if (this.$refs.ListOfCurrentMedications) {
            this.$refs.ListOfCurrentMedications.submit()
          }
          if (this.$refs.ObservationTable) {
            this.$refs.ObservationTable.submitFromEtr()
          }
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
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
    openVisio (value, key) {
      this.$refs.VisioPopup.open(value, key)
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
