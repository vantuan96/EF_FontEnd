<template>
  <div>
    <template v-if="isPrimaryDoctorOrAuthorizedDoctor">
      <div id="OutpatientExaminationNoteForm">
        <h1 class="text-center">{{ __t("Phiếu tư vấn") }}</h1>
        <InfoForm :MASTERDATA="MASTERDATA" :readonly="false" :DataSubmit="DataSubmit" />
        <div class="box box-table">
          <div class="box-body">
            <div><label>Bệnh nhân/ Người giám hộ đến tư vấn về <span required="required">*</span> </label> <i> (Hiển thị trên báo cáo y tế)</i></div>
            <MdTextarea v-model="MASTERDATA['OPDOENCC0'].Items[0]" />
            <div><label>Bệnh sử (nếu có) </label><i> (Hiển thị trên báo cáo y tế)</i></div>
            <MdTextarea v-model="MASTERDATA['OPDOENHPI'].Items[0]" />
            <div
              class="kls-block"
              v-if="
                !DataSubmit.IsTelehealth &&
                DataSubmit.Clinic &&
                DataSubmit.Clinic.Code !== 'Normal'
              "
            >
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <div><label>{{
                      __t("Khám lâm sàng (nếu có)")
                    }}</label><i> (Hiển thị trên báo cáo y tế)</i>
                    </div>
                    <MDRadio
                      v-if="MASTERDATA['OPDOEN250']"
                      v-model="MASTERDATA['OPDOEN250']"
                    />
                  </div>
                </div>
              </div>
              <div v-if="MASTERDATA['OPDOEN250'].Items[1].Value">
                <template v-if="DataSubmit.Version >= 2">
                  <PhieuTuVanVer2 :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
                </template>
                <template v-else>
                  <div class="box box-table" style="background: #eceaea" v-if="DataSubmit.Clinic.Code !== 'MultiSelect-002'">
                    <div class="box-body">
                      <div class="row" v-if="MASTERDATA['OPDOENNLHTE'] && showWithClinic(MASTERDATA['OPDOENNLHTE'].Clinic)">
                        <div class="col-md-12">
                          <div class="form-group">
                            <div class="group-radio">
                              <span
                                :data="item"
                                :key="index"
                                v-for="(item, index) in MASTERDATA['OPDOENNLHTE']
                                  .Items"
                              >
                                <input
                                  type="checkbox"
                                  :id="'OPDOENNLHTEradio-' + index"
                                  v-model="item.Value"
                                />
                                <label
                                  :for="'OPDOENNLHTEradio-' + index"
                                  @click="
                                    checkbox2Radio(
                                      MASTERDATA['OPDOENNLHTE'].Items,
                                      item
                                    )
                                  "
                                  >{{ __label(item) }}</label
                                >
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="row"
                        v-if="
                          MASTERDATA['OPDOENTUOI'] &&
                          showWithClinic(MASTERDATA['OPDOENTUOI'].Clinic)
                        "
                      >
                        <div class="col-md-12">
                          <div class="form-group">
                            <div class="group-radio">
                              <span
                                :data="item"
                                :key="index"
                                v-for="(item, index) in MASTERDATA['OPDOENTUOI']
                                  .Items"
                              >
                                <input
                                  type="checkbox"
                                  :id="'OPDOENTUOIradio-' + index"
                                  v-model="item.Value"
                                />
                                <label
                                  :for="'OPDOENTUOIradio-' + index"
                                  @click="
                                    checkbox2RadioOPDOENTUOI(
                                      MASTERDATA['OPDOENTUOI'].Items,
                                      item
                                    )
                                  "
                                  >{{ __label(item) }}</label
                                >
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="row"
                        v-if="
                          MASTERDATA['OPDOENBNTHPT'] &&
                          showWithClinic(MASTERDATA['OPDOENBNTHPT'].Clinic)
                        "
                      >
                        <div class="col-md-12">
                          <div class="form-group">
                            <label
                              >{{ __label(MASTERDATA["OPDOENBNTHPT"]) }}
                              <i class="unit-label">{{
                                MASTERDATA["OPDOENBNTHPT"].Note
                              }}</i></label
                            >
                            <div class="group-radio">
                              <span
                                :data="item"
                                :key="index"
                                v-for="(item, index) in MASTERDATA['OPDOENBNTHPT']
                                  .Items"
                              >
                                <input
                                  type="checkbox"
                                  :id="'OPDOENBNTHPTradio-' + index"
                                  v-model="item.Value"
                                />
                                <label
                                  :for="'OPDOENBNTHPTradio-' + index"
                                  @click="
                                    checkbox2Radio(
                                      MASTERDATA['OPDOENBNTHPT'].Items,
                                      item
                                    )
                                  "
                                  >{{ __label(item) }}</label
                                >
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="row"
                        v-if="
                          MASTERDATA['OPDOENDG'] &&
                          showWithClinic(MASTERDATA['OPDOENDG'].Clinic)
                        "
                      >
                        <div class="col-md-12">
                          <div class="form-group">
                            <label
                              >{{ __label(MASTERDATA["OPDOENDG"]) }}
                              <i class="unit-label">{{
                                MASTERDATA["OPDOENDG"].Note
                              }}</i></label
                            >
                            <div class="group-radio">
                              <span
                                :data="item"
                                :key="index"
                                v-for="(item, index) in MASTERDATA['OPDOENDG']
                                  .Items"
                              >
                                <input
                                  type="checkbox"
                                  :id="'OPDOENDGradio-' + index"
                                  v-model="item.Value"
                                />
                                <label
                                  :for="'OPDOENDGradio-' + index"
                                  @click="
                                    checkbox2Radio(
                                      MASTERDATA['OPDOENDG'].Items,
                                      item
                                    )
                                  "
                                  >{{ __label(item) }}</label
                                >
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <md-input-text
                        :groupDefaultLib="'GENTVKBBGEEX'"
                        v-if="
                          MASTERDATA['OPDOENKTT'] &&
                          showWithClinic(MASTERDATA['OPDOENKTT'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKTT']"
                      />
                      <template v-if="hasKCK()">
                        <md-input-text
                          :defaultLib="'GENTCTBL2'"
                          v-if="
                            MASTERDATA['OPDOENKCK'] &&
                            showWithClinic(MASTERDATA['OPDOENKCK'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENKCK']"
                        >
                        </md-input-text>
                      </template>
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKTP'] &&
                          hideWithOPDOENDG() &&
                          showWithClinic(MASTERDATA['OPDOENKTP'].Clinic)
                        "
                        :groupDefaultLib="'GENTVKBBCAEX'"
                        v-model="MASTERDATA['OPDOENKTP']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKTP'] &&
                          showWithOPDOENDG() &&
                          showWithClinic(MASTERDATA['OPDOENKTP'].Clinic)
                        "
                        :groupDefaultLib="'GENTVKBBCAEX'"
                        v-model="MASTERDATA['OPDOENKTP']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENTSKN'] &&
                          showWithClinic(MASTERDATA['OPDOENTSKN'].Clinic) &&
                          DataSubmit.Clinic.Code !== 'FreeTextOnly-000'
                        "
                        v-model="MASTERDATA['OPDOENTSKN']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENTSK'] &&
                          showWithClinic(MASTERDATA['OPDOENTSK'].Clinic) &&
                          DataSubmit.Clinic.Code !== 'FreeTextOnly-000'
                        "
                        v-model="MASTERDATA['OPDOENTSK']"
                      />
                      <md-input-text
                        :groupDefaultLib="'GENTVKBBCAEX'"
                        v-if="
                          MASTERDATA['OPDOENKTP1'] &&
                          showWithClinic(MASTERDATA['OPDOENKTP1'].Clinic) &&
                          MASTERDATA['OPDOENBNTHPT'].Items[0].Value === true
                        "
                        v-model="MASTERDATA['OPDOENKTP1']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENNGNG'] &&
                          showWithClinic(MASTERDATA['OPDOENNGNG'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENNGNG']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENNTTTXH'] &&
                          showWithClinic(MASTERDATA['OPDOENNTTTXH'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENNTTTXH']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENHVTTCY'] &&
                          showWithClinic(MASTERDATA['OPDOENHVTTCY'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENHVTTCY']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENCGXG'] &&
                          showWithClinic(MASTERDATA['OPDOENCGXG'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENCGXG']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKTTPV'] &&
                          showWithClinic(MASTERDATA['OPDOENKTTPV'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKTTPV']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENMSTTLCT'] &&
                          showWithClinic(MASTERDATA['OPDOENMSTTLCT'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENMSTTLCT']"
                      />
                      <md-input
                        v-if="
                          MASTERDATA['OPDOENBMI'] &&
                          showWithClinic(MASTERDATA['OPDOENBMI'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENBMI']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKTTTHGC'] &&
                          showWithClinic(MASTERDATA['OPDOENKTTTHGC'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKTTTHGC']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENDGCGNM'] &&
                          showWithClinic(MASTERDATA['OPDOENDGCGNM'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENDGCGNM']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENDGDNM'] &&
                          showWithClinic(MASTERDATA['OPDOENDGDNM'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENDGDNM']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKLN'] &&
                          showWithClinic(MASTERDATA['OPDOENKLN'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKLN']"
                      />
                      <md-input-text
                        :groupDefaultLib="'GENTVKBBCAEX'"
                        v-if="
                          MASTERDATA['OPDOENKTM'] &&
                          showWithClinic(MASTERDATA['OPDOENKTM'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKTM']"
                      />
                      <md-input-text
                        :groupDefaultLib="'GENTVKBBPUEX'"
                        v-if="
                          MASTERDATA['OPDOENKHH'] &&
                          showWithClinic(MASTERDATA['OPDOENKHH'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKHH']"
                      >
                      </md-input-text>
                      <md-input-text
                        :groupDefaultLib="'GENTVKBBOTOE'"
                        v-if="
                          MASTERDATA['OPDOENKCBPK'] &&
                          showWithClinic(MASTERDATA['OPDOENKCBPK'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKCBPK']"
                      >
                      </md-input-text>
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENBHC'] &&
                          showWithClinic(MASTERDATA['OPDOENBHC'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENBHC']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKYT'] &&
                          showWithClinic(MASTERDATA['OPDOENKYT'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKYT']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKCGTG'] &&
                          showWithClinic(MASTERDATA['OPDOENKCGTG'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKCGTG']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKTD'] &&
                          showWithClinic(MASTERDATA['OPDOENKTD'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKTD']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKCX'] &&
                          showWithClinic(MASTERDATA['OPDOENKCX'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKCX']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKHD'] &&
                          showWithClinic(MASTERDATA['OPDOENKHD'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKHD']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKCY'] &&
                          showWithClinic(MASTERDATA['OPDOENKCY'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKCY']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKTN'] &&
                          showWithClinic(MASTERDATA['OPDOENKTN'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKTN']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENKTRT'] &&
                          showWithClinic(MASTERDATA['OPDOENKTRT'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKTRT']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENTTL'] &&
                          showWithClinic(MASTERDATA['OPDOENTTL'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENTTL']"
                      />
                      <template v-if="isOPDOENKNKT()">
                        <md-input-text
                          :defaultLib="'GENTCTBL2'"
                          v-if="
                            MASTERDATA['OPDOENKNKT'] &&
                            showWithClinic(MASTERDATA['OPDOENKNKT'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENKNKT']"
                        >
                        </md-input-text>
                      </template>
                      <template
                        v-if="
                          MASTERDATA['OPDOENDG'] &&
                          MASTERDATA['OPDOENDG'].Items[0].Value === true
                        "
                      >
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENMCN'] &&
                            showWithClinic(MASTERDATA['OPDOENMCN'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENMCN']"
                        />
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENDCT'] &&
                            showWithClinic(MASTERDATA['OPDOENDCT'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENDCT']"
                        />
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENTDTT'] &&
                            showWithClinic(MASTERDATA['OPDOENTDTT'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENTDTT']"
                        />
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENTHCVD'] &&
                            showWithClinic(MASTERDATA['OPDOENTHCVD'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENTHCVD']"
                        />
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENPHCN'] &&
                            showWithClinic(MASTERDATA['OPDOENPHCN'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENPHCN']"
                        />
                      </template>
                      <template
                        v-if="
                          MASTERDATA['OPDOENDG'] &&
                          MASTERDATA['OPDOENDG'].Items[1].Value === true
                        "
                      >
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENCNHH'] &&
                            showWithClinic(MASTERDATA['OPDOENCNHH'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENCNHH']"
                        />
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENSCD'] &&
                            showWithClinic(MASTERDATA['OPDOENSCD'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENSCD']"
                        />
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENKNGS'] &&
                            showWithClinic(MASTERDATA['OPDOENKNGS'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENKNGS']"
                        />
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENTDNT'] &&
                            showWithClinic(MASTERDATA['OPDOENTDNT'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENTDNT']"
                        />
                      </template>
                      <template
                        v-if="
                          MASTERDATA['OPDOENDG'] &&
                          MASTERDATA['OPDOENDG'].Items[2].Value === true
                        "
                      >
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENKNGT'] &&
                            showWithClinic(MASTERDATA['OPDOENKNGT'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENKNGT']"
                        />
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENTTRLN'] &&
                            showWithClinic(MASTERDATA['OPDOENTTRLN'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENTTRLN']"
                        />
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENNTKG'] &&
                            showWithClinic(MASTERDATA['OPDOENNTKG'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENNTKG']"
                        />
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENDVTH'] &&
                            showWithClinic(MASTERDATA['OPDOENDVTH'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENDVTH']"
                        />
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOENDCDL'] &&
                            showWithClinic(MASTERDATA['OPDOENDCDL'].Clinic)
                          "
                          v-model="MASTERDATA['OPDOENDCDL']"
                        />
                      </template>
                      <md-input-text
                        :defaultLib="'GENTCTBL2'"
                        v-if="
                          MASTERDATA['OPDOENCCQK'] &&
                          showWithClinic(MASTERDATA['OPDOENCCQK'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENCCQK']"
                      />
                      <md-input-text
                        :defaultLib="'OPDKLSTMH'"
                        v-if="
                          MASTERDATA['OPDOENKTMH'] &&
                          showWithClinic(MASTERDATA['OPDOENKTMH'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKTMH']"
                      />
                      <md-input-text
                        :defaultLib="'OPDKLSDD'"
                        v-if="
                          MASTERDATA['OPDOENKDD'] &&
                          showWithClinic(MASTERDATA['OPDOENKDD'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENKDD']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENTC'] &&
                          showWithClinic(MASTERDATA['OPDOENTC'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENTC']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENPTVD'] &&
                          showWithClinic(MASTERDATA['OPDOENPTVD'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENPTVD']"
                      />
                      <md-input-text
                        v-if="
                          MASTERDATA['OPDOENPTTT'] &&
                          showWithClinic(MASTERDATA['OPDOENPTTT'].Clinic)
                        "
                        v-model="MASTERDATA['OPDOENPTTT']"
                      />
                    </div>
                  </div>
                  <div class="box box-table" style="background: #eceaea" v-else>
                    <div class="box-body">
                      <!-- MultiSelect-002 is PK tâm lý - trung tâm y học tái tạo -->
                      <div class="row">
                        <div class="col-md-12" v-if="MASTERDATA['OPDOENYTD']">
                          <div class="form-group">
                            <div class="group-radio NotAllowNull">
                              <template
                                :data="item"
                                v-for="(item, index) in MASTERDATA['OPDOENYTD']
                                  .Items"
                              >
                                <span
                                  :key="index"
                                  v-if="item.DataType === 'Radio'"
                                >
                                  <input
                                    type="checkbox"
                                    :id="'OPDOENYTDradio-' + index"
                                    v-model="item.Value"
                                  />
                                  <label
                                    :for="'OPDOENYTDradio-' + index"
                                    @click="
                                      checkbox2Radio(
                                        MASTERDATA['OPDOENYTD'].Items,
                                        item
                                      )
                                    "
                                    >{{ __label(item) }}</label
                                  >
                                </span>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                      <template v-if="MASTERDATA['OPDOENYTD'].Items[0].Value">
                        <md-input-text
                          v-if="MASTERDATA['OPDOENNGNG']"
                          v-model="MASTERDATA['OPDOENNGNG']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENNTTTXH']"
                          v-model="MASTERDATA['OPDOENNTTTXH']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENHVTTCY']"
                          v-model="MASTERDATA['OPDOENHVTTCY']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENCGXG']"
                          v-model="MASTERDATA['OPDOENCGXG']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENKTTPV']"
                          v-model="MASTERDATA['OPDOENKTTPV']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENMSTTLCT']"
                          v-model="MASTERDATA['OPDOENMSTTLCT']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENCCQK']"
                          v-model="MASTERDATA['OPDOENCCQK']"
                          :defaultLib="'GENTCTBL2'"
                        />
                      </template>
                      <template v-if="MASTERDATA['OPDOENYTD'].Items[1].Value">
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0001']"
                          v-model="MASTERDATA['OPDOENTK0001']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0002']"
                          v-model="MASTERDATA['OPDOENTK0002']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0003']"
                          v-model="MASTERDATA['OPDOENTK0003']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0004']"
                          v-model="MASTERDATA['OPDOENTK0004']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0005']"
                          v-model="MASTERDATA['OPDOENTK0005']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0006']"
                          v-model="MASTERDATA['OPDOENTK0006']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0007']"
                          v-model="MASTERDATA['OPDOENTK0007']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0008']"
                          v-model="MASTERDATA['OPDOENTK0008']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0009']"
                          v-model="MASTERDATA['OPDOENTK0009']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0010']"
                          v-model="MASTERDATA['OPDOENTK0010']"
                          :defaultLib="'GENTCTBL2'"
                        />
                      </template>
                      <template v-if="MASTERDATA['OPDOENYTD'].Items[2].Value">
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0011']"
                          v-model="MASTERDATA['OPDOENTK0011']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0012']"
                          v-model="MASTERDATA['OPDOENTK0012']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0013']"
                          v-model="MASTERDATA['OPDOENTK0013']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0014']"
                          v-model="MASTERDATA['OPDOENTK0014']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0015']"
                          v-model="MASTERDATA['OPDOENTK0015']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0016']"
                          v-model="MASTERDATA['OPDOENTK0016']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0017']"
                          v-model="MASTERDATA['OPDOENTK0017']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0018']"
                          v-model="MASTERDATA['OPDOENTK0018']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0027']"
                          v-model="MASTERDATA['OPDOENTK0027']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0019']"
                          v-model="MASTERDATA['OPDOENTK0019']"
                          :defaultLib="'GENTCTBL2'"
                        />
                      </template>
                      <template v-if="MASTERDATA['OPDOENYTD'].Items[3].Value">
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0020']"
                          v-model="MASTERDATA['OPDOENTK0020']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0021']"
                          v-model="MASTERDATA['OPDOENTK0021']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0022']"
                          v-model="MASTERDATA['OPDOENTK0022']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0023']"
                          v-model="MASTERDATA['OPDOENTK0023']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0024']"
                          v-model="MASTERDATA['OPDOENTK0024']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0025']"
                          v-model="MASTERDATA['OPDOENTK0025']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0028']"
                          v-model="MASTERDATA['OPDOENTK0028']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTK0026']"
                          v-model="MASTERDATA['OPDOENTK0026']"
                          :defaultLib="'GENTCTBL2'"
                        />
                      </template>
                    </div>
                  </div>
                </template>
              </div>
              <!-- end khams laam sangf -->
            </div>
            <div><label>{{
              __t("Kết quả (nếu có)")
            }}</label><i> (Hiển thị trên báo cáo y tế)</i>
            </div>
            <div class="mb-10">
              <div class="flex-box" v-if="MASTERDATA['OPDOEN262']">
                <div class="w220">
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN262'].Items[0]" />
                </div>
                <MdRextarea
                  v-if="MASTERDATA['OPDOEN262'].Items[0].Value"
                  v-model="MASTERDATA['OPDOEN262'].Items[1]"
                />
              </div>
            </div>
            <div class="mb-10">
              <div class="flex-box" v-if="MASTERDATA['OPDOEN263']">
                <div class="w220">
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN263'].Items[0]" />
                </div>
                <MdRextarea
                  v-if="MASTERDATA['OPDOEN263'].Items[0].Value"
                  v-model="MASTERDATA['OPDOEN263'].Items[1]"
                />
              </div>
            </div>
            <div class="mb-10">
              <div class="flex-box" v-if="MASTERDATA['OPDOEN264']">
                <div class="w220">
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN264'].Items[0]" />
                </div>
                <MdRextarea
                  v-if="MASTERDATA['OPDOEN264'].Items[0].Value"
                  v-model="MASTERDATA['OPDOEN264'].Items[1]"
                />
              </div>
            </div>
            <div class="mb-10">
              <div class="flex-box" v-if="MASTERDATA['OPDOEN265']">
                <div class="w220">
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN265'].Items[0]" />
                </div>
                <MdRextarea
                  v-if="MASTERDATA['OPDOEN265'].Items[0].Value"
                  v-model="MASTERDATA['OPDOEN265'].Items[1]"
                />
              </div>
            </div>
            <div class="mb-10">
              <div class="flex-box" v-if="MASTERDATA['OPDOEN266']">
                <div class="w220">
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN266'].Items[0]" />
                </div>
                <MdRextarea
                  v-if="MASTERDATA['OPDOEN266'].Items[0].Value"
                  v-model="MASTERDATA['OPDOEN266'].Items[1]"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12" v-if="MASTERDATA['OPDOENICD']">
                <div><label>{{
                  __t("Chẩn đoán")
                }}</label> <span required="required">*</span> <i> (Hiển thị trên báo cáo y tế)</i>
                </div>
                <div class="form-group">
                  <div
                    :data="item"
                    :key="index"
                    v-for="(item, index) in MASTERDATA['OPDOENICD'].Items"
                    :id="item.Code"
                  >
                    <div
                      class="margin-bottom-10"
                      v-if="
                        item.DataType === 'ICD10' &&
                        item.Code === 'OPDOENICDANS'
                      "
                      :key="index"
                    >
                      <!--   -->
                      <icd10 v-model="item.Value" @icdChange="icdChange"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <md-input-text
              v-model="MASTERDATA['OPDOENDD0']"
              :hidelabel="true"
            />
          </div>
        </div>
        <div class="tbl-title">2. {{ __t("Kế hoạch điều trị") }} <i> (Hiển thị trên báo cáo y tế)</i></div>
        <div class="box box-table" id="OPDOEN267">
          <div class="box-body">
            <i>{{__t('Vui lòng chọn ít nhất 1 trong các kế hoạch sau:')}}</i>
            <div>
              <div class="flex-box" v-if="MASTERDATA['OPDOEN251']">
                <div>
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN251'].Items[0]" />
                </div>
                <MdRextarea
                  v-if="MASTERDATA['OPDOEN251'].Items[0].Value"
                  v-model="MASTERDATA['OPDOEN251'].Items[1]"
                />
              </div>
            </div>
            <div>
              <div class="flex-box" v-if="MASTERDATA['OPDOEN252']">
                <div>
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN252'].Items[0]" />
                </div>
              </div>
            </div>
            <div>
              <div class="flex-box" v-if="MASTERDATA['OPDOEN253']">
                <div>
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN253'].Items[0]" />
                </div>
                <MdRextarea
                  v-if="MASTERDATA['OPDOEN253'].Items[0].Value"
                  v-model="MASTERDATA['OPDOEN253'].Items[1]"
                />
              </div>
            </div>
            <div>
              <div class="flex-box" v-if="MASTERDATA['OPDOEN254']">
                <div>
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN254'].Items[0]" />
                </div>
              </div>
            </div>
            <div>
              <div class="flex-box" v-if="MASTERDATA['OPDOEN255']">
                <div>
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN255'].Items[0]" />
                </div>
              </div>
            </div>
            <div>
              <div class="flex-box" v-if="MASTERDATA['OPDOEN256']">
                <div>
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN256'].Items[0]" />
                </div>
              </div>
            </div>
            <div>
              <div class="flex-box" v-if="MASTERDATA['OPDOEN257']">
                <div>
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN257'].Items[0]" />
                </div>
                <div class="flex-box flex-center">
                  <MdRadiosInput v-model="MASTERDATA['OPDOEN258']" />
                  {{ __label(MASTERDATA["OPDOEN258"]) }}
                </div>
              </div>
            </div>
            <div>
              <div class="flex-box" v-if="MASTERDATA['OPDOEN259']">
                <div>
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN259'].Items[0]" />
                </div>
              </div>
            </div>
            <div>
              <div class="flex-box" v-if="MASTERDATA['OPDOEN260']">
                <div>
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN260'].Items[0]" />
                </div>
              </div>
            </div>
            <div>
              <div class="flex-box" v-if="MASTERDATA['OPDOEN261']">
                <div>
                  <MdCheckboxInput v-model="MASTERDATA['OPDOEN261'].Items[0]" />
                </div>
                <div class="flex-box flex-center" style="flex-grow: 1;">
                  <MdTextInput v-model="MASTERDATA['OPDOEN261'].Items[1]" />
                </div>
              </div>
              <div style="padding-left: 40px;">{{ __label(MASTERDATA["OPDOEN261"].Items[1]) }}</div>
            </div>
          </div>
        </div>
        <div class="tbl-title">3. {{ __t("Lời dặn và theo dõi") }}</div>
        <div class="box box-table">
          <div class="box-body">
            <div class="row">
              <div class="col-md-12" v-if="MASTERDATA['OPDOENDOR']">
                <div class="form-group">
                  <div><label>Bệnh nhân sẽ lên lịch hẹn để thảo luận về mối quan tâm khác vào </label> <i> (Hiển thị trên báo cáo y tế)</i></div>
                  <v-date-picker
                    :allday="'allday'"
                    v-model="MASTERDATA['OPDOENDOR'].Items[0].Value"
                    class="full-w"
                    :format="vDateFormat"
                    :id="MASTERDATA['OPDOENDOR'].Items[0].Code"
                  />
                </div>
              </div>
            </div>
            <md-input-text
              v-if="MASTERDATA['OPDOENRFU']"
              v-model="MASTERDATA['OPDOENRFU']"
              :defaultLib="'GENRELI'"
            />
          </div>
        </div>
        <div id="statusblock">
          <div
            v-if="
              DataSubmit.Status &&
              DataSubmit.Status.Code === 'OPDIHT'
            "
          >
            <div class="tbl-title">{{ __t("Chuyển viện") }}</div>
            <div class="box box-table">
              <div class="box-body">
                <md-input-text
                  v-if="MASTERDATA['OPDOENRH1']"
                  v-model="MASTERDATA['OPDOENRH1']"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENRFT3']"
                  v-model="MASTERDATA['OPDOENRFT3']"
                />
                <div class="row">
                  <div class="col-md-12" v-if="MASTERDATA['OPDOENTOT']">
                    <div class="form-group">
                      <label
                        >{{ __label(MASTERDATA["OPDOENTOT"]) }}
                        <i class="unit-label">{{
                          MASTERDATA["OPDOENTOT"].Note
                        }}</i></label
                      >
                      <div
                        :data="item"
                        :key="index"
                        v-for="(item, index) in MASTERDATA['OPDOENTOT'].Items"
                      >
                        <v-date-time-picker
                          v-model="item.Value"
                          class="select-boox"
                          :format="vDateTimeFormat"
                          :id="item.Code"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <md-input-text
                  v-if="MASTERDATA['OPDOENSBC']"
                  v-model="MASTERDATA['OPDOENSBC']"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENTM1']"
                  v-model="MASTERDATA['OPDOENTM1']"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENME0']"
                  v-model="MASTERDATA['OPDOENME0']"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENDU0']"
                  v-model="MASTERDATA['OPDOENDU0']"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENPSA']"
                  v-model="MASTERDATA['OPDOENPSA']"
                />
              </div>
            </div>
          </div>
          <div
            v-if="
              DataSubmit.Status &&
              DataSubmit.Status.Code === 'OPDUDT'
            "
          >
            <div class="tbl-title">{{ __t("Chuyển tuyến") }}</div>
            <div class="box box-table">
              <div class="box-body">
                <md-input-text
                  v-if="MASTERDATA['OPDOENRH0']"
                  v-model="MASTERDATA['OPDOENRH0']"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENMTU']"
                  v-model="MASTERDATA['OPDOENMTU']"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENPS0']"
                  v-model="MASTERDATA['OPDOENPS0']"
                />
                <div class="row">
                  <div class="col-md-12" v-if="MASTERDATA['OPDOENRFT1']">
                    <div class="form-group">
                      <label
                        >{{ __label(MASTERDATA["OPDOENRFT1"]) }}
                        <i class="unit-label">{{
                          MASTERDATA["OPDOENRFT1"].Note
                        }}</i></label
                      >
                      <div class="group-radio" id="OPDOENRFT1">
                        <template
                          :data="item"
                          v-for="(item, index) in MASTERDATA['OPDOENRFT1'].Items"
                        >
                          <span
                            :key="index"
                            v-if="item.DataType === 'Radio'"
                            :id="item.Code"
                          >
                            <input
                              type="checkbox"
                              :id="'OPDOENRFT1radio-' + index"
                              v-model="item.Value"
                            />
                            <label
                              :for="'OPDOENRFT1radio-' + index"
                              @click="
                                checkbox2Radio(
                                  MASTERDATA['OPDOENRFT1'].Items,
                                  item
                                )
                              "
                              >{{ __label(item) }}</label
                            >
                          </span>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
                <md-input-text
                  v-if="MASTERDATA['OPDOENTM0']"
                  v-model="MASTERDATA['OPDOENTM0']"
                />
                <md-input-text
                  v-if="MASTERDATA['OPDOENNTM']"
                  v-model="MASTERDATA['OPDOENNTM']"
                />
                <div class="row">
                  <div class="col-md-12" v-if="MASTERDATA['OPDOENTD0']">
                    <div class="form-group">
                      <label
                        >{{ __label(MASTERDATA["OPDOENTD0"]) }}
                        <i class="unit-label">{{
                          MASTERDATA["OPDOENTD0"].Note
                        }}</i></label
                      >
                      <div
                        :data="item"
                        :key="index"
                        v-for="(item, index) in MASTERDATA['OPDOENTD0'].Items"
                      >
                        <v-date-time-picker
                          v-model="item.Value"
                          class="select-boox"
                          :format="vDateTimeFormat"
                          :id="item.Code"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>A01_072_100122_V</p>
    </template>
  </div>
</template>
<script>
import InfoForm from '@/pages/OPD/OutpatientExaminationNote/Info.vue'
import ProblemList from '@/components/ProblemList.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import PhieuTuVanVer2 from './PhieuTuVanVer2.vue'
import MdTextarea from '@/components/global/MdInput/MdTextarea.vue'
export default {
  name: 'MedicalConsultationForm',
  props: ['DataSubmit', 'MASTERDATA', 'SyncHistoryOfPresentIllness', 'readonly'],
  components: {
    InfoForm,
    ProblemList,
    VDateTimePicker,
    PhieuTuVanVer2,
    MdTextarea
  },
  computed: {
    isPrimaryDoctorOrAuthorizedDoctor: function () {
      var currentUser = this.$store.state.account.Username
      if (this.ImSuperAdmin()) return true
      if (this.readonly) return false
      if (this.DataSubmit.locked) return false
      if (
        this.DataSubmit.PrimaryDoctor &&
        this.DataSubmit.PrimaryDoctor.Username === currentUser
      ) {
        return true
      }
      if (
        this.DataSubmit.AuthorizedDoctor &&
        this.DataSubmit.AuthorizedDoctor.Username === currentUser
      ) {
        return true
      }
      return false
    },
    isPrimaryDoctor: function () {
      if (this.ImSuperAdmin()) return true
      var currentUser = this.$store.state.account.Username
      if (
        this.DataSubmit.PrimaryDoctor &&
        this.DataSubmit.PrimaryDoctor.Username === currentUser
      ) {
        return true
      }
      return false
    },
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDOENWEI'].Items[0].Value
        ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value)
        : 0
      var height = this.MASTERDATA['OPDOENHEI'].Items[0].Value
        ? parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100
        : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  methods: {
    icdChange (value, code) {
      var currentValue = ''
      var val = (value || []).map(e => e.ViName)
      currentValue = this.MASTERDATA['OPDOENDD0'].Items[0].Value || ''
      this.MASTERDATA['OPDOENDD0'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
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
          console.log(item.Value)
        }
      })
    },
    showWithOPDOENDG () {
      return (
        this.MASTERDATA['OPDOENDG'].Items[0].Value ||
        this.MASTERDATA['OPDOENDG'].Items[2].Value
      )
    },
    hideWithOPDOENDG () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Code !== 'MultiSelect-001'
      }
      return false
    },
    isVaccine () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Data === 'VCHHN'
      }
      return false
    },
    isOPDOENKNKT () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Code === 'FreeTextOnly-007'
      }
      return false
    },
    hasKCK () {
      return (
        this.DataSubmit.Clinic &&
        [
          'FreeTextOnly-000',
          'FreeTextOnly-001',
          'FreeTextOnly-006',
          'RadioYesNo-001'
        ].includes(this.DataSubmit.Clinic.Code)
      )
    },
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
    checkbox2RadioOPDOENTUOI (items, item) {
      items.forEach((element) => {
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
        if (this.MASTERDATA['OPDOENTUOI'].Items[0].Value) {
          var weight = this.MASTERDATA['OPDOENWEI'].Items[0].Value
            ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value)
            : 0
          var height = this.MASTERDATA['OPDOENHEI'].Items[0].Value
            ? parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100
            : 0
          this.MASTERDATA['OPDOENBMI'].Items[0].Value = (
            weight /
            (height * height)
          ).toFixed(2)
        } else {
          return ''
        }
      }, 10)
    },
    copyToOPDOENHPI (str) {
      str = this.trim_(str)
      if (
        this.MASTERDATA['OPDOENHPI'].Items[0].Value &&
        this.MASTERDATA['OPDOENHPI'].Items[0].Value.includes(str)
      ) {
      } else {
        var old = this.MASTERDATA['OPDOENHPI'].Items[0].Value
          ? this.trim_(this.MASTERDATA['OPDOENHPI'].Items[0].Value) + '\n'
          : ''
        this.MASTERDATA['OPDOENHPI'].Items[0].Value = this.trim_(
          old + '-' + str,
          ', '
        )
        this.toastedInfo('Đã copy')
      }
    }
  }
}
</script>
