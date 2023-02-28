<template>
  <div v-if="DataSubmit">
    <div class="box box-table">
      <div class="box-body">
        <div class="kls-block" v-if="!DataSubmit.IsTelehealth && !showWithClinic('Normal') && !onlyClinic('FreeTextOnly-000')">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{
                  __t("Khám lâm sàng (Hiển thị trên báo cáo y tế)-2")
                }}</label>
              </div>
            </div>
          </div>
          <div class="box box-table" style="background: #eceaea">
            <div class="box-body">
              <template v-if="showWithClinic('MultiSelect-002')">
                <template>
                  <div class="row">
                    <div class="col-md-12" v-if="MASTERDATA['OPDOENYTD']">
                      <div class="form-group" v-if="readonly">
                        <label>Loại khám:  </label>
                        <MDRadioView :data="MASTERDATA['OPDOENYTD'].Items" :indexs="[1,2,3]" />
                      </div>
                      <div class="form-group" v-else>
                        <div class="group-radio">
                          <template :data="item" v-for="(item, index) in MASTERDATA['OPDOENYTD'].Items">
                            <span :key="index" v-if="item.DataType === 'Radio' && index !== 0">
                              <input type="checkbox" :id="'OPDOENYTDradio-' + index" v-model="item.Value"/>
                              <label :for="'OPDOENYTDradio-' + index">
                                {{ __label(item) }}
                              </label>
                            </span>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <!-- Kham nguoi lon -->
                <template v-if="MASTERDATA['OPDOENYTD'].Items[2].Value && !MASTERDATA['OPDOENYTD'].Items[1].Value && !MASTERDATA['OPDOENYTD'].Items[3].Value">
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0011']"
                    v-model="MASTERDATA['OPDOENTK0011']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0002']"
                    v-model="MASTERDATA['OPDOENTK0002']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0007']"
                    v-model="MASTERDATA['OPDOENTK0007']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0014']"
                    v-model="MASTERDATA['OPDOENTK0014']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0013']"
                    v-model="MASTERDATA['OPDOENTK0013']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0006']"
                    v-model="MASTERDATA['OPDOENTK0006']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0004']"
                    v-model="MASTERDATA['OPDOENTK0004']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0005']"
                    v-model="MASTERDATA['OPDOENTK0005']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOEN514']"
                    v-model="MASTERDATA['OPDOEN514']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOEN516']"
                    v-model="MASTERDATA['OPDOEN516']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0009']"
                    v-model="MASTERDATA['OPDOENTK0009']"
                  />
                </template>
                <!-- kham tre em -->
                <template v-else-if="MASTERDATA['OPDOENYTD'].Items[1].Value && !MASTERDATA['OPDOENYTD'].Items[2].Value && !MASTERDATA['OPDOENYTD'].Items[3].Value">
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0001']"
                    v-model="MASTERDATA['OPDOENTK0001']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0002']"
                    v-model="MASTERDATA['OPDOENTK0002']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0003']"
                    v-model="MASTERDATA['OPDOENTK0003']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0004']"
                    v-model="MASTERDATA['OPDOENTK0004']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0005']"
                    v-model="MASTERDATA['OPDOENTK0005']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0006']"
                    v-model="MASTERDATA['OPDOENTK0006']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0007']"
                    v-model="MASTERDATA['OPDOENTK0007']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0008']"
                    v-model="MASTERDATA['OPDOENTK0008']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0009']"
                    v-model="MASTERDATA['OPDOENTK0009']"
                  />
                </template>
                <!-- kham bai nao -->
                <template v-else-if="MASTERDATA['OPDOENYTD'].Items[3].Value && !MASTERDATA['OPDOENYTD'].Items[2].Value && !MASTERDATA['OPDOENYTD'].Items[1].Value">
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0001']"
                    v-model="MASTERDATA['OPDOENTK0001']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0002']"
                    v-model="MASTERDATA['OPDOENTK0002']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0008']"
                    v-model="MASTERDATA['OPDOENTK0008']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0009']"
                    v-model="MASTERDATA['OPDOENTK0009']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0020']"
                    v-model="MASTERDATA['OPDOENTK0020']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0023']"
                    v-model="MASTERDATA['OPDOENTK0023']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0024']"
                    v-model="MASTERDATA['OPDOENTK0024']"
                  />
                </template>
                <template v-else>
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0001'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[3].Value)"
                    v-model="MASTERDATA['OPDOENTK0001']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0002'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value || MASTERDATA['OPDOENYTD'].Items[3].Value)"
                    v-model="MASTERDATA['OPDOENTK0002']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0003'] && MASTERDATA['OPDOENYTD'].Items[1].Value"
                    v-model="MASTERDATA['OPDOENTK0003']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0004'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value)"
                    v-model="MASTERDATA['OPDOENTK0004']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0005'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value)"
                    v-model="MASTERDATA['OPDOENTK0005']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0006'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value)"
                    v-model="MASTERDATA['OPDOENTK0006']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0007'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value)"
                    v-model="MASTERDATA['OPDOENTK0007']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0008'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[3].Value)"
                    v-model="MASTERDATA['OPDOENTK0008']"
                  />
                  <md-input-text :readonly="readonly"
                    v-if="MASTERDATA['OPDOENTK0009'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value || MASTERDATA['OPDOENYTD'].Items[3].Value)"
                    v-model="MASTERDATA['OPDOENTK0009']"
                  />
                  <template v-if="MASTERDATA['OPDOENYTD'].Items[2].Value">
                    <template>
                      <md-input-text :readonly="readonly"
                        v-if="MASTERDATA['OPDOENTK0011']"
                        v-model="MASTERDATA['OPDOENTK0011']"
                      />
                      <md-input-text :readonly="readonly"
                        v-if="MASTERDATA['OPDOENTK0014']"
                        v-model="MASTERDATA['OPDOENTK0014']"
                      />
                      <md-input-text :readonly="readonly"
                        v-if="MASTERDATA['OPDOENTK0013']"
                        v-model="MASTERDATA['OPDOENTK0013']"
                      />
                      <md-input-text :readonly="readonly"
                        v-if="MASTERDATA['OPDOEN514']"
                        v-model="MASTERDATA['OPDOEN514']"
                      />
                      <md-input-text :readonly="readonly"
                        v-if="MASTERDATA['OPDOEN516']"
                        v-model="MASTERDATA['OPDOEN516']"
                      />
                    </template>
                  </template>
                  <template v-if="MASTERDATA['OPDOENYTD'].Items[3].Value">
                    <template>
                      <md-input-text :readonly="readonly"
                        v-if="MASTERDATA['OPDOENTK0020']"
                        v-model="MASTERDATA['OPDOENTK0020']"
                      />
                      <md-input-text :readonly="readonly"
                        v-if="MASTERDATA['OPDOENTK0023']"
                        v-model="MASTERDATA['OPDOENTK0023']"
                      />
                      <md-input-text :readonly="readonly"
                        v-if="MASTERDATA['OPDOENTK0024']"
                        v-model="MASTERDATA['OPDOENTK0024']"
                      />
                    </template>
                  </template>
                </template>
              </template>
              <div class="row" v-if="MASTERDATA['OPDOENNLHTE'] && showWithClinic(MASTERDATA['OPDOENNLHTE'].Clinic)">
                <div class="col-md-12">
                  <div class="form-group" v-if="readonly">
                    <label>{{__t('Đối tượng khám')}}:</label>
                    <MDRadioView :data="MASTERDATA['OPDOENNLHTE'].Items" />
                  </div>
                  <div v-else class="form-group">
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item, index) in MASTERDATA['OPDOENNLHTE'].Items">
                        <input
                          type="checkbox"
                          :id="'OPDOENNLHTEradio-' + index"
                          v-model="item.Value"
                        />
                        <label
                          :for="'OPDOENNLHTEradio-' + index"
                          @click="checkbox2Radio(MASTERDATA['OPDOENNLHTE'].Items, item)">{{ __label(item) }}</label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['OPDOENTUOI'] && showWithClinic(MASTERDATA['OPDOENTUOI'].Clinic)">
                <div class="col-md-12" v-if="MASTERDATA['OPDOENTUOI']">
                  <template>
                    <div class="flex align-center mrb10">
                      <MdRadiosInput4 :readonly="true" :indexs="[2]" v-model="MASTERDATA['OPDOENTUOI']"/>
                      <MdRadiosInput4 :readonly="true" :indexs="[1]" v-model="MASTERDATA['OPDOENTUOI']"/>
                      <MdRadiosInput4 :readonly="true" :indexs="[0]" v-model="MASTERDATA['OPDOENTUOI']"/>
                    </div>
                  </template>
                </div>
              </div>
              <div
                class="row"
                v-if="MASTERDATA['OPDOENBNTHPT'] && showWithClinic(MASTERDATA['OPDOENBNTHPT'].Clinic)">
                <div class="col-md-12">
                  <div class="form-group">
                    <label
                      >{{ __label(MASTERDATA["OPDOENBNTHPT"]) }}
                      <i class="unit-label">{{
                        MASTERDATA["OPDOENBNTHPT"].Note
                      }}</i></label
                    >
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item, index) in MASTERDATA['OPDOENBNTHPT'].Items">
                        <input type="checkbox" :id="'OPDOENBNTHPTradio-' + index" v-model="item.Value"/>
                        <label
                          :for="'OPDOENBNTHPTradio-' + index"
                          @click="checkbox2Radio(MASTERDATA['OPDOENBNTHPT'].Items, item)">{{ __label(item) }}</label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['OPDOENDG'] && showWithClinic(MASTERDATA['OPDOENDG'].Clinic) && readonly">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDOENDG'])}} <i class="unit-label">{{MASTERDATA['OPDOENDG'].Note}}</i></label>
                    <MDRadioView :data="MASTERDATA['OPDOENDG'].Items" :DataType="'CheckBox'" />
                  </div>
                </div>
              </div>
              <div class="row" v-else-if="MASTERDATA['OPDOENDG'] && showWithClinic(MASTERDATA['OPDOENDG'].Clinic)">
                <div class="col-md-12">
                  <div class="form-group">
                    <label
                      >{{ __label(MASTERDATA["OPDOENDG"]) }}
                      <i class="unit-label">{{
                        MASTERDATA["OPDOENDG"].Note
                      }}</i></label>
                    <div class="group-radio">
                      <span :data="item" :key="index" v-for="(item, index) in MASTERDATA['OPDOENDG'].Items">
                        <input type="checkbox" :id="'OPDOENDGradio-' + index" v-model="item.Value"/>
                        <label
                          :for="'OPDOENDGradio-' + index"
                          @click="checkbox2Radio(MASTERDATA['OPDOENDG'].Items, item)">{{ __label(item) }}</label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <md-input-text
                :groupDefaultLib="'GENTVKBBGEEX'"
                v-if=" MASTERDATA['OPDOENKTT'] && showWithClinic('FreeTextOnly-001,FreeTextOnly-005,MultiSelect-001,RadioYesNo-001')"
                v-model="MASTERDATA['OPDOENKTT']"
                :readonly="readonly"
              />
              <md-input-text
                :defaultLib="'GENTCTBL2'"
                v-if="MASTERDATA['OPDOENKCK'] && showWithClinic('FreeTextOnly-001,FreeTextOnly-005,MultiSelect-001,RadioYesNo-001')"
                v-model="MASTERDATA['OPDOENKCK']"
                :readonly="readonly"
              />
              <md-input-text
                :groupDefaultLib="'GENTVKBBCAEX'"
                v-if="MASTERDATA['OPDOENKTP1'] && this.checkShowOPDOENKTP1()"
                v-model="MASTERDATA['OPDOENKTP1']"
                :readonly="readonly"
              />
              <md-input-text
                :groupDefaultLib="'GENTVKBBOTOE'"
                v-if="MASTERDATA['OPDOENKCBPK'] && showWithClinic('FreeTextOnly-001,FreeTextOnly-005,MultiSelect-001,RadioYesNo-001')"
                v-model="MASTERDATA['OPDOENKCBPK']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENTSKN'] && showWithClinic(MASTERDATA['OPDOENTSKN'].Clinic) && !showWithClinic('FreeTextOnly-000')"
                v-model="MASTERDATA['OPDOENTSKN']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENTSK'] && showWithClinic(MASTERDATA['OPDOENTSK'].Clinic) && !showWithClinic('FreeTextOnly-000')"
                v-model="MASTERDATA['OPDOENTSK']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOEN526'] && showWithClinic('FreeTextOnly-002')"
                :readonly="readonly"
                v-model="MASTERDATA['OPDOEN526']"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENKTTTHGC'] && showWithClinic(MASTERDATA['OPDOENKTTTHGC'].Clinic)"
                v-model="MASTERDATA['OPDOENKTTTHGC']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENDGCGNM'] && showWithClinic(MASTERDATA['OPDOENDGCGNM'].Clinic)"
                v-model="MASTERDATA['OPDOENDGCGNM']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENDGDNM'] && showWithClinic(MASTERDATA['OPDOENDGDNM'].Clinic)"
                v-model="MASTERDATA['OPDOENDGDNM']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENKLN'] && showWithClinic(MASTERDATA['OPDOENKLN'].Clinic)"
                v-model="MASTERDATA['OPDOENKLN']"
                :readonly="readonly"
              />
              <md-input-text
                :groupDefaultLib="'GENTVKBBCAEX'"
                v-if="MASTERDATA['OPDOENKTM'] && showWithClinic(MASTERDATA['OPDOENKTM'].Clinic)"
                v-model="MASTERDATA['OPDOENKTM']"
                :readonly="readonly"
              />
              <md-input-text
                :groupDefaultLib="'GENTVKBBPUEX'"
                v-if="MASTERDATA['OPDOENKHH'] &&showWithClinic(MASTERDATA['OPDOENKHH'].Clinic)"
                v-model="MASTERDATA['OPDOENKHH']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENBHC'] && showWithClinic(MASTERDATA['OPDOENBHC'].Clinic)"
                v-model="MASTERDATA['OPDOENBHC']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENKYT'] && showWithClinic(MASTERDATA['OPDOENKYT'].Clinic)"
                v-model="MASTERDATA['OPDOENKYT']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENKCGTG'] && showWithClinic(MASTERDATA['OPDOENKCGTG'].Clinic)"
                v-model="MASTERDATA['OPDOENKCGTG']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENKTD'] && showWithClinic(MASTERDATA['OPDOENKTD'].Clinic)"
                v-model="MASTERDATA['OPDOENKTD']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENKCX'] && showWithClinic(MASTERDATA['OPDOENKCX'].Clinic)"
                v-model="MASTERDATA['OPDOENKCX']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENKHD'] && showWithClinic(MASTERDATA['OPDOENKHD'].Clinic)"
                v-model="MASTERDATA['OPDOENKHD']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENKCY'] && showWithClinic(MASTERDATA['OPDOENKCY'].Clinic)"
                v-model="MASTERDATA['OPDOENKCY']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENKTN'] && showWithClinic(MASTERDATA['OPDOENKTN'].Clinic)"
                v-model="MASTERDATA['OPDOENKTN']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENKTRT'] && showWithClinic(MASTERDATA['OPDOENKTRT'].Clinic)"
                v-model="MASTERDATA['OPDOENKTRT']"
                :readonly="readonly"
              />
              <md-input-text
                v-if="MASTERDATA['OPDOENTTL'] && showWithClinic(MASTERDATA['OPDOENTTL'].Clinic)"
                v-model="MASTERDATA['OPDOENTTL']"
                :readonly="readonly"
              />
              <template v-if="isOPDOENKNKT()">
                <md-input-text
                  :defaultLib="'GENTCTBL2'"
                  v-if="MASTERDATA['OPDOENKNKT'] && showWithClinic(MASTERDATA['OPDOENKNKT'].Clinic)"
                  v-model="MASTERDATA['OPDOENKNKT']"
                  :readonly="readonly"
                />
              </template>
              <template
                v-if="MASTERDATA['OPDOENDG'] && MASTERDATA['OPDOENDG'].Items[0].Value === true">
                <md-input-text
                  v-if="MASTERDATA['OPDOENMCN'] && showWithClinic(MASTERDATA['OPDOENMCN'].Clinic)"
                  v-model="MASTERDATA['OPDOENMCN']"
                  :readonly="readonly"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENDCT'] && showWithClinic(MASTERDATA['OPDOENDCT'].Clinic)"
                  v-model="MASTERDATA['OPDOENDCT']"
                  :readonly="readonly"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENTDTT'] && showWithClinic(MASTERDATA['OPDOENTDTT'].Clinic)"
                  v-model="MASTERDATA['OPDOENTDTT']"
                  :readonly="readonly"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENTHCVD'] && showWithClinic(MASTERDATA['OPDOENTHCVD'].Clinic)"
                  v-model="MASTERDATA['OPDOENTHCVD']"
                  :readonly="readonly"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENPHCN'] && showWithClinic(MASTERDATA['OPDOENPHCN'].Clinic)"
                  v-model="MASTERDATA['OPDOENPHCN']"
                  :readonly="readonly"
                />
              </template>
              <template
                v-if="MASTERDATA['OPDOENDG'] && MASTERDATA['OPDOENDG'].Items[1].Value === true">
                <md-input-text
                  v-if="MASTERDATA['OPDOENCNHH'] && showWithClinic(MASTERDATA['OPDOENCNHH'].Clinic)"
                  v-model="MASTERDATA['OPDOENCNHH']"
                  :readonly="readonly"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENSCD'] && showWithClinic(MASTERDATA['OPDOENSCD'].Clinic)"
                  v-model="MASTERDATA['OPDOENSCD']"
                  :readonly="readonly"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENKNGS'] && showWithClinic(MASTERDATA['OPDOENKNGS'].Clinic)"
                  v-model="MASTERDATA['OPDOENKNGS']"
                  :readonly="readonly"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENTDNT'] && showWithClinic(MASTERDATA['OPDOENTDNT'].Clinic)"
                  v-model="MASTERDATA['OPDOENTDNT']"
                  :readonly="readonly"
                />
              </template>
              <template
                v-if="MASTERDATA['OPDOENDG'] && MASTERDATA['OPDOENDG'].Items[2].Value === true">
                <md-input-text
                  v-if="MASTERDATA['OPDOENKNGT'] && showWithClinic(MASTERDATA['OPDOENKNGT'].Clinic)"
                  v-model="MASTERDATA['OPDOENKNGT']"
                  :readonly="readonly"/>
                <md-input-text
                  v-if="MASTERDATA['OPDOENTTRLN'] && showWithClinic(MASTERDATA['OPDOENTTRLN'].Clinic)"
                  v-model="MASTERDATA['OPDOENTTRLN']"
                  :readonly="readonly"/>
                <md-input-text
                  v-if=" MASTERDATA['OPDOENNTKG'] && showWithClinic(MASTERDATA['OPDOENNTKG'].Clinic)"
                  v-model="MASTERDATA['OPDOENNTKG']"
                  :readonly="readonly"/>
                <md-input-text
                  v-if="MASTERDATA['OPDOENDVTH'] && showWithClinic(MASTERDATA['OPDOENDVTH'].Clinic)"
                  v-model="MASTERDATA['OPDOENDVTH']"
                  :readonly="readonly"/>
                <md-input-text
                  v-if="MASTERDATA['OPDOENDCDL'] && showWithClinic(MASTERDATA['OPDOENDCDL'].Clinic)"
                  v-model="MASTERDATA['OPDOENDCDL']"
                  :readonly="readonly"/>
              </template>
              <md-input-text
                :defaultLib="'OPDKLSDD'"
                v-if="MASTERDATA['OPDOENKDD'] && showWithClinic(MASTERDATA['OPDOENKDD'].Clinic)"
                v-model="MASTERDATA['OPDOENKDD']"
                :readonly="readonly"/>
              <md-input-text
                v-if="MASTERDATA['OPDOENTC'] && showWithClinic(MASTERDATA['OPDOENTC'].Clinic)"
                v-model="MASTERDATA['OPDOENTC']"
                :readonly="readonly"/>
              <md-input-text
                v-if="MASTERDATA['OPDOENPTVD'] && showWithClinic(MASTERDATA['OPDOENPTVD'].Clinic)"
                v-model="MASTERDATA['OPDOENPTVD']"
                :readonly="readonly"/>
              <md-input-text
                v-if="['OPDOENPTTT'] && showWithClinic(MASTERDATA['OPDOENPTTT'].Clinic)"
                v-model="MASTERDATA['OPDOENPTTT']"
                :readonly="readonly"
              />
            </div>
          </div>
          <!-- end khams laam sangf -->
        </div>
        <md-input-text
          v-if="MASTERDATA['OPDOENCEF'] && (!DataSubmit.IsTelehealth && (showWithClinic('Normal') || onlyClinic('FreeTextOnly-000')))"
          v-model="MASTERDATA['OPDOENCEF']"
          :readonly="readonly"
        />
        <md-input-text
          v-if="MASTERDATA['OPDOENSDBP'] && DataSubmit.IsTelehealth"
          v-model="MASTERDATA['OPDOENSDBP']"
          :readonly="readonly"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
import ProblemList from '@/components/ProblemList.vue'
import Diorpt from '@/components/OPD/DI0RPT.vue'
export default {
  name: 'Ptvver2',
  props: ['MASTERDATA', 'DataSubmit', 'readonly'],
  components: {
    ProblemList, Diorpt
  },
  data () {
    return {
      syncOPDOENPT0At: null
    }
  },
  mounted () {
    this.changeData()
  },
  methods: {
    showWithClinic (codes) {
      let check = false
      if (codes === 'Normal' && this.DataSubmit && this.DataSubmit.SetupClinic && !this.DataSubmit.SetupClinic.length) {
        check = true
      }
      if (this.DataSubmit && this.DataSubmit.SetupClinic && this.DataSubmit.SetupClinic.length) {
        this.DataSubmit.SetupClinic.forEach(code => {
          if (codes.includes(code)) {
            check = true
          }
        })
      }
      return check
    },
    copyToOPDOENICD (data) {
      this.MASTERDATA['OPDOENDD0'].Items.forEach((item) => {
        if (data.Diagnosis && item.Code === 'OPDOENDD0ANS') {
          item.Value = data.Diagnosis
        }
      })
      this.MASTERDATA['OPDOENICD'].Items.forEach((item) => {
        if (data.PrimaryICD && item.Code === 'OPDOENICDANS') {
          item.Value = data.PrimaryICD.filter((e) => e.code)
        }
      })
    },
    copyToOPDOENPT0 (str, type) {
      str = this.trim_(str)
      let old2 = this.MASTERDATA['OPDOENPT0'].Items[1].Value
        ? this.trim_(this.MASTERDATA['OPDOENPT0'].Items[1].Value)
        : ''
      // var old = this.MASTERDATA['OPDOENPT0'].Items[1].Value ? (this.trim_(this.MASTERDATA['OPDOENPT0'].Items[1].Value) + ', ') : ''
      if (type) {
        this.mapCDHAStr(old2, str, type)
      } else {
        if (old2) {
          this.MASTERDATA['OPDOENPT0'].Items[1].Value = this.trim_(
            old2 + '\n' + str,
            ', '
          )
        } else {
          this.MASTERDATA['OPDOENPT0'].Items[1].Value = this.trim_(
            old2 + str,
            ', '
          )
        }
      }
      this.toastedInfo('Đã copy')
    },
    copyToOPDOENHOA (str) {
      str = this.trim_(str)
      if (
        this.MASTERDATA['OPDOENHOA'].Items[0].Value &&
        this.MASTERDATA['OPDOENHOA'].Items[0].Value.includes(str)
      ) {
      } else {
        var old = this.MASTERDATA['OPDOENHOA'].Items[0].Value
          ? this.trim_(this.MASTERDATA['OPDOENHOA'].Items[0].Value) + ', '
          : ''
        this.MASTERDATA['OPDOENHOA'].Items[0].Value = this.trim_(
          old + str,
          ', '
        )
        this.toastedInfo('Đã copy')
      }
    },
    copyOPDOENPMH (str) {
      str = this.trim_(str)
      var old2 = this.MASTERDATA['OPDOENPMH'].Items[0].Value
        ? this.trim_(this.MASTERDATA['OPDOENPMH'].Items[0].Value) + '\n'
        : ''
      this.MASTERDATA['OPDOENPMH'].Items[0].Value = this.trim_(
        old2 + '-' + str,
        ', '
      )
      this.toastedInfo('Đã copy')
    },
    copyOPDOENTSSK (str) {
      str = this.trim_(str)
      var old2 = this.MASTERDATA['OPDOENTSSK'].Items[0].Value
        ? this.trim_(this.MASTERDATA['OPDOENTSSK'].Items[0].Value) + '\n'
        : ''
      this.MASTERDATA['OPDOENTSSK'].Items[0].Value = this.trim_(
        old2 + '-' + str,
        ', '
      )
      this.toastedInfo('Đã copy')
    },
    copyToOPDOENHPI (str) {
      str = this.trim_(str)
      var old4 = this.MASTERDATA['OPDOENHPI'].Items[0].Value
        ? this.trim_(this.MASTERDATA['OPDOENHPI'].Items[0].Value) + '\n'
        : ''
      this.MASTERDATA['OPDOENHPI'].Items[0].Value = this.trim_(
        old4 + '-' + str,
        ', '
      )
      this.toastedInfo('Đã copy')
    },
    changeData () {
      if (this.MASTERDATA['OPDOENICDOPT']) {
        this.MASTERDATA['OPDOENICDOPT'].ViName = 'Chẩn đoán kèm theo (Hiển thị trên báo cáo y tế)'
        this.MASTERDATA['OPDOENICDOPT'].EnName = 'Chẩn đoán kèm theo (Hiển thị trên báo cáo y tế)'
      }
      if (this.MASTERDATA['OPDOENKTP1']) {
        this.MASTERDATA['OPDOENKTP1'].ViName = 'Khám tim mạch, hô hấp'
        this.MASTERDATA['OPDOENKTP1'].EnName = 'Respiratory and cardiac function'
        this.MASTERDATA['OPDOENKTP1'].Items[0].ViName = 'Khám tim mạch, hô hấp'
        this.MASTERDATA['OPDOENKTP1'].Items[0].EnName = 'Respiratory and cardiac function'
      }
      if (this.DataSubmit.IsNew && this.showWithClinic('RadioYesNo-001')) {
        if (this.MASTERDATA['OPDOENBNTHPT']) {
          this.MASTERDATA['OPDOENBNTHPT'].Items[1].Value = true
        }
      }
      if (this.MASTERDATA['OPDOENICD']) {
        this.MASTERDATA['OPDOENICD'].Items[1].ViName = 'Chẩn đoán kèm theo (Hiển thị trên báo cáo y tế)'
        this.MASTERDATA['OPDOENICD'].Items[1].EnName = 'Chẩn đoán kèm theo (Hiển thị trên báo cáo y tế)'
      }
      if (this.MASTERDATA['OPDOENTK0005']) {
        this.MASTERDATA['OPDOENTK0005'].ViName = 'Chú ý'
        this.MASTERDATA['OPDOENTK0005'].EnName = 'Attention'
        this.MASTERDATA['OPDOENTK0005'].Items[0].ViName = 'Chú ý'
        this.MASTERDATA['OPDOENTK0005'].Items[0].EnName = 'Attention'
      }
      if (this.MASTERDATA['OPDOENTK0009']) {
        this.MASTERDATA['OPDOENTK0009'].ViName = 'Một số test tâm lý cần thiết'
        this.MASTERDATA['OPDOENTK0009'].EnName = 'Other necessary psychology tests'
      }
      if (this.MASTERDATA['OPDOENTK0020']) {
        this.MASTERDATA['OPDOENTK0020'].ViName = 'Trương lực cơ'
        this.MASTERDATA['OPDOENTK0020'].EnName = 'Muscular tone'
      }
      if (this.MASTERDATA['OPDOENKDD']) {
        this.MASTERDATA['OPDOENKDD'].ViName = 'Đánh giá về dinh dưỡng'
        this.MASTERDATA['OPDOENKDD'].EnName = 'Nutritional assessment'
      }
      if (this.MASTERDATA['OPDOENTC']) {
        this.MASTERDATA['OPDOENTC'].ViName = 'Đánh giá về tiêm chủng'
        this.MASTERDATA['OPDOENTC'].EnName = 'Vaccination assessment'
      }
      if (this.MASTERDATA['OPDOENPTVD']) {
        this.MASTERDATA['OPDOENPTVD'].ViName = 'Đánh giá phát triển vận động theo tuổi'
        this.MASTERDATA['OPDOENPTVD'].EnName = 'Motor development appropriate to age'
      }
      if (this.MASTERDATA['OPDOENPTTT']) {
        this.MASTERDATA['OPDOENPTTT'].ViName = 'Đánh giá phát triển tinh thần theo tuổi'
        this.MASTERDATA['OPDOENPTTT'].EnName = 'Psychological development appropriate to age'
      }
      if (this.MASTERDATA['OPDOENKCBPK']) {
        this.MASTERDATA['OPDOENKCBPK'].ViName = 'Khám các bộ phận khác'
      }
      if (this.MASTERDATA['OPDOENDG']) {
        this.MASTERDATA['OPDOENDG'].Items[0].EnName = 'Patient with mobility difficulty'
        this.MASTERDATA['OPDOENDG'].Items[1].EnName = 'Patient with cardiovascular or respiratory diseases'
        this.MASTERDATA['OPDOENDG'].Items[2].EnName = 'Patient with neurological diseases'
      }
      if (this.MASTERDATA['OPDOENMCN']) {
        this.MASTERDATA['OPDOENMCN'].EnName = 'Level of loss of function at injury region'
        this.MASTERDATA['OPDOENMCN'].Items[0].EnName = 'Level of loss of function at injury region'
      }
      if (this.MASTERDATA['OPDOENDCT']) {
        this.MASTERDATA['OPDOENDCT'].EnName = 'Ability to move on flat surface'
        this.MASTERDATA['OPDOENDCT'].Items[0].EnName = 'Ability to move on flat surface'
      }
      if (this.MASTERDATA['OPDOENTDTT']) {
        this.MASTERDATA['OPDOENTDTT'].EnName = 'Ability to change position (lying – sitting – standing)'
        this.MASTERDATA['OPDOENTDTT'].Items[0].EnName = 'Ability to change position (lying – sitting – standing)'
      }
      if (this.MASTERDATA['OPDOENTHCVD']) {
        this.MASTERDATA['OPDOENTHCVD'].EnName = 'Ability to perform coordinated motions (reach out to shake hands, bend down to pick up sandals)'
        this.MASTERDATA['OPDOENTHCVD'].Items[0].EnName = 'Ability to perform coordinated motions (reach out to shake hands, bend down to pick up sandals)'
      }
      if (this.MASTERDATA['OPDOENPHCN']) {
        this.MASTERDATA['OPDOENPHCN'].EnName = 'Ability of rehabilitation and complication levels'
        this.MASTERDATA['OPDOENPHCN'].Items[0].EnName = 'Ability of rehabilitation and complication levels'
      }
      if (this.MASTERDATA['OPDOENCNHH']) {
        this.MASTERDATA['OPDOENCNHH'].EnName = 'Respiratory function (Vital capacity, respiratory rate…)'
        this.MASTERDATA['OPDOENCNHH'].Items[0].EnName = 'Respiratory function (Vital capacity, respiratory rate…)'
      }
      if (this.MASTERDATA['OPDOENSCD']) {
        this.MASTERDATA['OPDOENSCD'].EnName = 'Symmetry and movement of rib cage'
        this.MASTERDATA['OPDOENSCD'].Items[0].EnName = 'Symmetry and movement of rib cage'
      }
      if (this.MASTERDATA['OPDOENKNGS']) {
        this.MASTERDATA['OPDOENKNGS'].EnName = 'Cardiovascular capacity (stress test for 06 minutes, Treadmill test…)'
        this.MASTERDATA['OPDOENKNGS'].Items[0].EnName = 'Cardiovascular capacity (stress test for 06 minutes, Treadmill test…)'
      }
      if (this.MASTERDATA['OPDOENTDNT']) {
        this.MASTERDATA['OPDOENTDNT'].EnName = 'Level of heart rate change after exercise'
        this.MASTERDATA['OPDOENTDNT'].Items[0].EnName = 'Level of heart rate change after exercise'
      }
      if (this.MASTERDATA['OPDOENKNGT']) {
        this.MASTERDATA['OPDOENKNGT'].EnName = 'Communication ability (mentality, pronunciation/ speech…)'
        this.MASTERDATA['OPDOENKNGT'].Items[0].EnName = 'Communication ability (mentality, pronunciation/ speech…)'
      }
      if (this.MASTERDATA['OPDOENTTRLN']) {
        this.MASTERDATA['OPDOENTTRLN'].EnName = 'Swallow disorder condition'
        this.MASTERDATA['OPDOENTTRLN'].Items[0].EnName = 'Swallow disorder condition'
      }
      if (this.MASTERDATA['OPDOENNTKG']) {
        this.MASTERDATA['OPDOENNTKG'].EnName = 'Ability to perceive space and time'
        this.MASTERDATA['OPDOENNTKG'].Items[0].EnName = 'Ability to perceive space and time'
      }
      if (this.MASTERDATA['OPDOENDVTH']) {
        this.MASTERDATA['OPDOENDVTH'].EnName = 'Ability of motor adjustment (vision, direction, balance)'
        this.MASTERDATA['OPDOENDVTH'].Items[0].EnName = 'Ability of motor adjustment (vision, direction, balance)'
      }
      if (this.MASTERDATA['OPDOENDCDL']) {
        this.MASTERDATA['OPDOENDCDL'].EnName = 'Ability to move independently on flat surface'
        this.MASTERDATA['OPDOENDCDL'].Items[0].EnName = 'Ability to move independently on flat surface'
      }
      if (this.MASTERDATA['OPDOENYTD']) {
        this.MASTERDATA['OPDOENYTD'].Items[2].EnName = 'Adult psychological examination'
      }
      if (this.MASTERDATA['OPDOENTK0002']) {
        this.MASTERDATA['OPDOENTK0002'].EnName = 'Cognitive function'
        this.MASTERDATA['OPDOENTK0002'].Items[0].EnName = 'Cognitive function'
      }
      if (this.MASTERDATA['OPDOENTK0006']) {
        this.MASTERDATA['OPDOENTK0006'].EnName = 'Emotional'
        this.MASTERDATA['OPDOENTK0006'].Items[0].EnName = 'Emotional'
      }
      if (this.MASTERDATA['OPDOENTK0007']) {
        this.MASTERDATA['OPDOENTK0007'].EnName = 'Sensory'
        this.MASTERDATA['OPDOENTK0007'].Items[0].EnName = 'Sensory'
      }
      if (this.MASTERDATA['OPDOENTK0011']) {
        this.MASTERDATA['OPDOENTK0011'].EnName = 'General manifestation'
        this.MASTERDATA['OPDOENTK0011'].Items[0].EnName = 'General manifestation'
      }
      if (this.MASTERDATA['OPDOENKTTTHGC']) {
        this.MASTERDATA['OPDOENKTTTHGC'].ViName = 'Đánh giá tình trạng tăng hoặc giảm cân và số cân tăng, giảm trong 1 - 3 tháng qua'
        this.MASTERDATA['OPDOENKTTTHGC'].EnName = 'Weight and height of patient, weight gain and weight loss condition for the last 1-3 months'
        this.MASTERDATA['OPDOENKTTTHGC'].Items[0].ViName = 'Đánh giá tình trạng tăng hoặc giảm cân và số cân tăng, giảm trong 1 - 3 tháng qua'
        this.MASTERDATA['OPDOENKTTTHGC'].Items[0].EnName = 'Weight and height of patient, weight gain and weight loss condition for the last 1-3 months'
      }
      if (this.MASTERDATA['OPDOENDGCGNM']) {
        this.MASTERDATA['OPDOENDGCGNM'].ViName = 'Đánh giá cảm giác ngon miệng, buồn nôn và nôn/trớ, đại tiểu tiện'
        this.MASTERDATA['OPDOENDGCGNM'].EnName = 'Appetite, whether patient is having nausea or vomiting, bladder and bowel habits'
        this.MASTERDATA['OPDOENDGCGNM'].Items[0].ViName = 'Đánh giá cảm giác ngon miệng, buồn nôn và nôn/trớ, đại tiểu tiện'
        this.MASTERDATA['OPDOENDGCGNM'].Items[0].EnName = 'Appetite, whether patient is having nausea or vomiting, bladder and bowel habits'
      }
      if (this.MASTERDATA['OPDOENDGDNM']) {
        this.MASTERDATA['OPDOENDGDNM'].ViName = 'Đánh giá da, niêm mạc, tóc, móng, răng, giấc ngủ'
        this.MASTERDATA['OPDOENDGDNM'].EnName = 'Skin, mucosa, hair, nail, bone, tongue, teeth and sleeping of patient'
        this.MASTERDATA['OPDOENDGDNM'].Items[0].ViName = 'Đánh giá da, niêm mạc, tóc, móng, răng, giấc ngủ'
        this.MASTERDATA['OPDOENDGDNM'].Items[0].EnName = 'Skin, mucosa, hair, nail, bone, tongue, teeth and sleeping of patient'
      }
      if (this.MASTERDATA['OPDOENKLN']) {
        this.MASTERDATA['OPDOENKLN'].ViName = 'Đánh giá lồng ngực, xương, khớp xương sọ, thóp'
        this.MASTERDATA['OPDOENKLN'].EnName = 'Chest diameter, bone, fontanelle'
        this.MASTERDATA['OPDOENKLN'].Items[0].ViName = 'Đánh giá lồng ngực, xương, khớp xương sọ, thóp'
        this.MASTERDATA['OPDOENKLN'].Items[0].EnName = 'Chest diameter, bone, fontanelle'
      }
    },
    onlyClinic (code) {
      let check = false
      if (this.DataSubmit && this.DataSubmit.SetupClinic && this.DataSubmit.SetupClinic.length === 1) {
        if (this.DataSubmit.SetupClinic[0] === code) {
          check = true
        }
      }
      return check
    },
    checkShowOPDOENKTP1 () {
      let check = false
      if (this.showWithClinic('FreeTextOnly-001,MultiSelect-001,FreeTextOnly-005') && !this.showWithClinic('RadioYesNo-001')) {
        check = true
      }
      if (this.showWithClinic('RadioYesNo-001') && this.MASTERDATA['OPDOENBNTHPT'] && this.MASTERDATA['OPDOENBNTHPT'].Items[0].Value === true) {
        check = true
      }
      return check
    },
    isOPDOENKNKT () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Code === 'FreeTextOnly-007'
      }
      return false
    },
    isVaccine () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Data === 'VCHHN'
      }
      return false
    },
    icdChange (value, code) {
      var val = (value || []).map(e => e.ViName)
      switch (code) {
        case 'OPDOENICD0101':
          if (!this.MASTERDATA['OPDOENID0'].Items[0].Value) this.MASTERDATA['OPDOENID0'].Items[0].Value = val.join(', ')
          break
        case 'OPDOENICDANS':
          if (!this.MASTERDATA['OPDOENDD0'].Items[0].Value) this.MASTERDATA['OPDOENDD0'].Items[0].Value = val.join(', ')
          break
        default:
          break
      }
    },
    autoLoadOPDOENPT0 (loading) {
      if (this.MASTERDATA && this.MASTERDATA['OPDOENPT0']) {
        this.MASTERDATA['OPDOENPT0'].Items[0].Value = null
        new OutpatientExaminationNote({ hidemsg: true, noLoading: !loading })
          .create({ Id: this.$route.params.Id }, 'SyncPrincipalTest')
          .then((response) => {
            this.syncOPDOENPT0At = new Date()
            var val = response
            if (val) {
              this.MASTERDATA['OPDOENPT0'].Items[0].Value =
                JSON.stringify(response)
            }
          })
          .catch((e) => {
            console.log(e)
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
