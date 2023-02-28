<template>
  <div id="PageNurse" class="mrb40">
    <div class="box-title fw600 fs14 color-white mrb10 cap">
      {{ __t("HospitalDischargeTable.title2") }}
    </div>
    <div class="box-button flex space-center" :class="!isNull ? 'none' : null">
      <button
        v-if="condition && condition === 'Nurse' && !viewOnly && !getIsLocked"
        type="button"
        class="btn btn-flat v-yellow-btn"
        @click="confirmPopup"
      >
        {{ __t("HospitalDischargeTable.textButton") }}
      </button>
      <div v-else class="fw400">
        {{ __t("HospitalDischargeTable.labelNull") }}
      </div>
    </div>
    <div class="box-content" :class="isNull ? 'none' : null">
      <!-- box date time -->
      <div class="box1 mrb30 flex align-center">
        <div class="box-date flex align-center space-between">
          <div class="title-date">{{ __t("HospitalDischargeTable.label1") }}</div>
          <v-date-time-picker
            v-if="condition && condition === 'Nurse' && !viewOnly && !viewOnly2 && !getIsLocked"
            :hideTooltip="true"
            v-model="time"
            :format="vDateTimeFormat"
          />
          <FakeInput v-else v-model="time" />
        </div>
        <div class="name">
          {{ __t("HospitalDischargeTable.label2") }}
          <ad-Info v-if="DataNurse.CreatedBy" :ad="DataNurse.CreatedBy" />
        </div>
      </div>
      <!-- box table -->
      <div v-if="condition && condition === 'Nurse' && !viewOnly && !viewOnly2 && !getIsLocked">
        <div class="box2">
          <!-- Phương tiện vận chuyển -->
          <div v-if="VisitVersion < 12" class="table1">
            <table class="table observation-table noneMg">
              <thead>
                <tr>
                  <th width="50%" class="bg-white">
                    {{ __t("HospitalDischargeTable.labelTable1") }}
                  </th>
                  <th width="50%" class="bg-white">
                    {{ __t("HospitalDischargeTable.labelTable2") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="cap fw600 fs14 bg-gray" colspan="2">
                    {{ __t("HospitalDischargeTable.labelTable3") }}
                  </td>
                </tr>
              </tbody>
              <tbody v-if="showTable1">
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN02'] &&
                      !MASTERDATA['IPDDPCN06'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN22'].Items[0].Value
                  "
                >
                  <td class="" v-html="__label(MASTERDATA['IPDDPCN02'])"></td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN02']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN02']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN02'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN02'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN06'] &&
                      !MASTERDATA['IPDDPCN02'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN22'].Items[0].Value
                  "
                >
                  <td class="fw600">{{ __label(MASTERDATA["IPDDPCN06"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN06']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN06']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN06'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN06'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN22'] &&
                      !MASTERDATA['IPDDPCN02'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN06'].Items[0].Value
                  "
                >
                  <td class="" v-html="__label(MASTERDATA['IPDDPCN22'])"></td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN22']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN22']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN22'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN22'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="
                MASTERDATA['IPDDPCN06'] &&
                  MASTERDATA['IPDDPCN06'].Items[0].Value &&
                  showTable1
              "
              class="noneMg"
            >
              <div class="box-ed-content">
                <table class="table observation-table table-mini noneMg">
                  <tbody>
                    <tr v-if="MASTERDATA['IPDDPCN10']">
                      <td width="55%">
                        1. {{ __label(MASTERDATA["IPDDPCN10"]) }}
                      </td>
                      <td width="45%" class="box-action">
                        <template>
                          <div class="mrb10 flex align-center space-center">
                            <div class="btn-action radio-left">
                              <MDRadio
                                :noFlex="true"
                                :indexs="[0]"
                                v-model="MASTERDATA['IPDDPCN10']"
                              />
                            </div>
                            <div class="btn-action">
                              <MDRadio
                                :noFlex="true"
                                :indexs="[1]"
                                v-model="MASTERDATA['IPDDPCN10']"
                              />
                            </div>
                          </div>
                          <div class="box-reason">
                            <textarea-autosize
                              :code="MASTERDATA['IPDDPCN10'].Items[2].Code"
                              class="form-control"
                              :placeholder="__t('_Note2')"
                              v-model="MASTERDATA['IPDDPCN10'].Items[2].Value"
                            />
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDDPCN14']">
                      <td width="55%">
                        2. {{ __label(MASTERDATA["IPDDPCN14"]) }}
                      </td>
                      <td width="45%" class="box-action">
                        <template>
                          <div class="mrb10 flex align-center space-center">
                            <div class="btn-action radio-left">
                              <MDRadio
                                :noFlex="true"
                                :indexs="[0]"
                                v-model="MASTERDATA['IPDDPCN14']"
                              />
                            </div>
                            <div class="btn-action">
                              <MDRadio
                                :noFlex="true"
                                :indexs="[1]"
                                v-model="MASTERDATA['IPDDPCN14']"
                              />
                            </div>
                          </div>
                          <div class="box-reason">
                            <textarea-autosize
                              :code="MASTERDATA['IPDDPCN14'].Items[2].Code"
                              class="form-control"
                              :placeholder="__t('_Note2')"
                              v-model="MASTERDATA['IPDDPCN14'].Items[2].Value"
                            />
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDDPCN18']">
                      <td width="55%">
                        3. {{ __label(MASTERDATA["IPDDPCN18"]) }}
                      </td>
                      <td width="45%" class="box-action">
                        <template>
                          <div class="mrb10 flex align-center space-center">
                            <div class="btn-action radio-left">
                              <MDRadio
                                :noFlex="true"
                                :indexs="[0]"
                                v-model="MASTERDATA['IPDDPCN18']"
                              />
                            </div>
                            <div class="btn-action">
                              <MDRadio
                                :noFlex="true"
                                :indexs="[1]"
                                v-model="MASTERDATA['IPDDPCN18']"
                              />
                            </div>
                          </div>
                          <div class="box-reason">
                            <textarea-autosize
                              :code="MASTERDATA['IPDDPCN18'].Items[2].Code"
                              class="form-control"
                              :placeholder="__t('_Note2')"
                              v-model="MASTERDATA['IPDDPCN18'].Items[2].Value"
                            />
                          </div>
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="flex align-center space-center mrb20"
              :class="showTable1 ? 'view-full' : null"
            >
              <button
                @click="showMore(1)"
                class="btn v-green-btn v-bottom-btn btn-swit-icon"
              >
                <span class="span-down-cion">{{ __t("btn.mo_rong") }}</span>
                <span class="span-up-cion">{{ __t("btn.thu_gon") }}</span>
              </button>
            </div>
          </div>
          <!-- Thuốc ra viện -->
          <div v-if="VisitVersion >= 12" class="table1">
            <table class="table observation-table noneMg">
              <thead>
                <tr>
                  <th width="50%" class="bg-white">
                    {{ __t("HospitalDischargeTable.labelTable1") }}
                  </th>
                  <th width="50%" class="bg-white">
                    {{ __t("HospitalDischargeTable.labelTable2") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="cap fw600 fs14 bg-gray" colspan="2">
                    {{ __t("HospitalDischargeTable.labelTable8") }}
                  </td>
                </tr>
              </tbody>
              <tbody v-if="showTable5">
                <tr v-if="MASTERDATA['IPDDPCN117']">
                  <td class="fw600">{{ __label(MASTERDATA["IPDDPCN117"]) }}</td>
                  <td class="box-action">
                    <template>
                      <MDRadio style="display: flex; justify-content: center;" v-model="MASTERDATA['IPDDPCN117']"/>
                      <div class="box-reason">
                        <textarea-autosize
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN117'].Items[2].Value"
                        />
                      </div>
                      <div class="d-flex flex-center mt-5">
                        <p class="mb-0 mr-0 ml-5">{{__label(MASTERDATA['IPDDPCN125'])}}:</p>
                        <MDRadio class="d-flex justify-content-center mb-0" v-model="MASTERDATA['IPDDPCN125']"/>
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN121']">
                  <td class="fw600">{{ __label(MASTERDATA["IPDDPCN121"]) }}</td>
                  <td class="box-action">
                    <template>
                      <MDRadio style="display: flex; justify-content: center;" v-model="MASTERDATA['IPDDPCN121']"/>
                      <div class="box-reason">
                        <textarea-autosize
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN121'].Items[2].Value"
                        />
                      </div>
                      <div class="d-flex flex-center mt-5">
                        <p class="mb-0 mr-0 ml-5">{{__label(MASTERDATA['IPDDPCN129'])}}:</p>
                        <MDRadio class="d-flex justify-content-center mb-0" v-model="MASTERDATA['IPDDPCN129']"/>
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="flex align-center space-center mrb20"
              :class="showTable5 ? 'view-full' : null"
            >
              <button
                @click="showMore(5)"
                class="btn v-green-btn v-bottom-btn btn-swit-icon"
              >
                <span class="span-down-cion">{{ __t("btn.mo_rong") }}</span>
                <span class="span-up-cion">{{ __t("btn.thu_gon") }}</span>
              </button>
            </div>
          </div>
          <!-- Phương tiện vận chuyển ver 2 -->
          <div v-if="VisitVersion >= 12" class="table1">
            <table class="table observation-table noneMg">
              <thead>
                <tr>
                  <td class="cap fw600 fs14 bg-gray" colspan="2">
                    {{ __t("HospitalDischargeTable.labelTable3") }}
                  </td>
                </tr>
              </thead>
              <tbody v-if="showTable1">
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN02'] &&
                      !MASTERDATA['IPDDPCN06'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN22'].Items[0].Value
                  "
                >
                  <td class="" v-html="__label(MASTERDATA['IPDDPCN02'])"></td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN02']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN02']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN02'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN02'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN06'] &&
                      !MASTERDATA['IPDDPCN02'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN22'].Items[0].Value
                  "
                >
                  <td class="fw600">{{ __label(MASTERDATA["IPDDPCN06"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN06']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN06']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN06'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN06'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN22'] &&
                      !MASTERDATA['IPDDPCN02'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN06'].Items[0].Value
                  "
                >
                  <td class="" v-html="__label(MASTERDATA['IPDDPCN22'])"></td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN22']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN22']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN22'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN22'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="
                MASTERDATA['IPDDPCN06'] &&
                  MASTERDATA['IPDDPCN06'].Items[0].Value &&
                  showTable1
              "
              class="noneMg"
            >
              <div class="box-ed-content">
                <table class="table observation-table table-mini noneMg">
                  <tbody>
                    <tr v-if="MASTERDATA['IPDDPCN10']">
                      <td width="55%">
                        1. {{ __label(MASTERDATA["IPDDPCN10"]) }}
                      </td>
                      <td width="45%" class="box-action">
                        <template>
                          <div class="mrb10 flex align-center space-center">
                            <div class="btn-action radio-left">
                              <MDRadio
                                :noFlex="true"
                                :indexs="[0]"
                                v-model="MASTERDATA['IPDDPCN10']"
                              />
                            </div>
                            <div class="btn-action">
                              <MDRadio
                                :noFlex="true"
                                :indexs="[1]"
                                v-model="MASTERDATA['IPDDPCN10']"
                              />
                            </div>
                          </div>
                          <div class="box-reason">
                            <textarea-autosize
                              :code="MASTERDATA['IPDDPCN10'].Items[2].Code"
                              class="form-control"
                              :placeholder="__t('_Note2')"
                              v-model="MASTERDATA['IPDDPCN10'].Items[2].Value"
                            />
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDDPCN14']">
                      <td width="55%">
                        2. {{ __label(MASTERDATA["IPDDPCN14"]) }}
                      </td>
                      <td width="45%" class="box-action">
                        <template>
                          <div class="mrb10 flex align-center space-center">
                            <div class="btn-action radio-left">
                              <MDRadio
                                :noFlex="true"
                                :indexs="[0]"
                                v-model="MASTERDATA['IPDDPCN14']"
                              />
                            </div>
                            <div class="btn-action">
                              <MDRadio
                                :noFlex="true"
                                :indexs="[1]"
                                v-model="MASTERDATA['IPDDPCN14']"
                              />
                            </div>
                          </div>
                          <div class="box-reason">
                            <textarea-autosize
                              :code="MASTERDATA['IPDDPCN14'].Items[2].Code"
                              class="form-control"
                              :placeholder="__t('_Note2')"
                              v-model="MASTERDATA['IPDDPCN14'].Items[2].Value"
                            />
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDDPCN18']">
                      <td width="55%">
                        3. {{ __label(MASTERDATA["IPDDPCN18"]) }}
                      </td>
                      <td width="45%" class="box-action">
                        <template>
                          <div class="mrb10 flex align-center space-center">
                            <div class="btn-action radio-left">
                              <MDRadio
                                :noFlex="true"
                                :indexs="[0]"
                                v-model="MASTERDATA['IPDDPCN18']"
                              />
                            </div>
                            <div class="btn-action">
                              <MDRadio
                                :noFlex="true"
                                :indexs="[1]"
                                v-model="MASTERDATA['IPDDPCN18']"
                              />
                            </div>
                          </div>
                          <div class="box-reason">
                            <textarea-autosize
                              :code="MASTERDATA['IPDDPCN18'].Items[2].Code"
                              class="form-control"
                              :placeholder="__t('_Note2')"
                              v-model="MASTERDATA['IPDDPCN18'].Items[2].Value"
                            />
                          </div>
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="flex align-center space-center mrb20"
              :class="showTable1 ? 'view-full' : null"
            >
              <button
                @click="showMore(1)"
                class="btn v-green-btn v-bottom-btn btn-swit-icon"
              >
                <span class="span-down-cion">{{ __t("btn.mo_rong") }}</span>
                <span class="span-up-cion">{{ __t("btn.thu_gon") }}</span>
              </button>
            </div>
          </div>
          <!-- Địa điểm vận chuyển sau khi ra viện -->
          <div class="table2">
            <table class="table observation-table noneMg">
              <thead>
                <tr>
                  <th colspan="2">
                    {{ __t("HospitalDischargeTable.labelTbale4") }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="showTable2">
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN27'] &&
                      !MASTERDATA['IPDDPCN31'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN39'].Items[1].Value
                  "
                >
                  <td class="fw600">{{ __label(MASTERDATA["IPDDPCN27"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN27']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN27']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN27'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN27'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN31'] &&
                      !MASTERDATA['IPDDPCN27'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN39'].Items[1].Value
                  "
                >
                  <td class="fw600">{{ __label(MASTERDATA["IPDDPCN31"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN31']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN31']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN31'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN31'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN35'] &&
                      MASTERDATA['IPDDPCN31'].Items[0].Value
                  "
                >
                  <td>{{ __label(MASTERDATA["IPDDPCN35"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN35']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN35']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN35'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN35'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN39'] &&
                      !MASTERDATA['IPDDPCN27'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN31'].Items[0].Value
                  "
                >
                  <td style="padding-top: 25px;">
                    <template>
                      <div style="margin-bottom: 14px;" class="fw600">
                        {{ __label(MASTERDATA["IPDDPCN39"]) }}
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN39'].Items[0].Code"
                          class="form-control"
                          :placeholder="
                            __t('HospitalDischargeTable.placeholder')
                          "
                          v-model="MASTERDATA['IPDDPCN39'].Items[0].Value"
                        />
                      </div>
                    </template>
                  </td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN39']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[2]"
                            v-model="MASTERDATA['IPDDPCN39']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN39'].Items[3].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN39'].Items[3].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="flex align-center space-center mrb20"
              :class="showTable2 ? 'view-full' : null"
            >
              <button
                @click="showMore(2)"
                class="btn v-green-btn v-bottom-btn btn-swit-icon"
              >
                <span class="span-down-cion">{{ __t("btn.mo_rong") }}</span>
                <span class="span-up-cion">{{ __t("btn.thu_gon") }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="box3">
          <div class="table3">
            <table class="table observation-table noneMg">
              <thead>
                <tr>
                  <th colspan="2">
                    {{ __t("HospitalDischargeTable.labelTbale5") }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="showTable3">
                <tr v-if="MASTERDATA['IPDDPCN45']">
                  <td>{{ __label(MASTERDATA["IPDDPCN45"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN45'].Items" />
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN45'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN45'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN49']">
                  <td>{{ __label(MASTERDATA["IPDDPCN49"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN49'].Items" />
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN49'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN49'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN53']">
                  <td>{{ __label(MASTERDATA["IPDDPCN53"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN53']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN53']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN53'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN53'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN57']">
                  <td>{{ __label(MASTERDATA["IPDDPCN57"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN57']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN57']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN57'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN57'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN61']">
                  <td>{{ __label(MASTERDATA["IPDDPCN61"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN61']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN61']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN61'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN61'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN65']">
                  <td>{{ __label(MASTERDATA["IPDDPCN65"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN65']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN65']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN65'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN65'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN69']">
                  <td>{{ __label(MASTERDATA["IPDDPCN69"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN69']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN69']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN69'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN69'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="flex align-center space-center mrb20"
              :class="showTable3 ? 'view-full' : null"
            >
              <button
                @click="showMore(3)"
                class="btn v-green-btn v-bottom-btn btn-swit-icon"
              >
                <span class="span-down-cion">{{ __t("btn.mo_rong") }}</span>
                <span class="span-up-cion">{{ __t("btn.thu_gon") }}</span>
              </button>
            </div>
          </div>
          <div class="table4">
            <table class="table observation-table noneMg">
              <thead>
                <tr>
                  <th colspan="2">
                    {{ __t("HospitalDischargeTable.labelTbale6") }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="showTable4">
                <tr v-if="MASTERDATA['IPDDPCN74']">
                  <td>{{ __label(MASTERDATA["IPDDPCN74"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN74']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN74']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN74'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN74'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN78'] && VisitVersion < 12">
                  <td>{{ __label(MASTERDATA["IPDDPCN78"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN78']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN78']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN78'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN78'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN82']">
                  <td>{{ __label(MASTERDATA["IPDDPCN82"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="flex align-center space-center">
                        <div class="btn-action radio-left">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[0]"
                            v-model="MASTERDATA['IPDDPCN82']"
                          />
                        </div>
                        <div class="btn-action">
                          <MDRadio
                            :noFlex="true"
                            :indexs="[1]"
                            v-model="MASTERDATA['IPDDPCN82']"
                          />
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="MASTERDATA['IPDDPCN82'].Items[2].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="MASTERDATA['IPDDPCN82'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
              <!-- add them cot -->
              <tbody
                v-for="(item, index) in this.dataTable"
                :key="index"
                v-if="showTable4 && !item.removed"
              >
                <tr v-if="item.Items[4].Value">
                  <td style="position: relative;">
                    <div v-if="!item.Code" class="delete" @click="item.removed = true">
                      <div><i class="fa fa-trash" aria-hidden="true"></i></div>
                    </div>
                    <template>
                      <div>
                        <textarea-autosize
                          class="form-control"
                          :placeholder="__t('_Note3')"
                          v-model="item.Items[0].Value"
                        />
                      </div>
                    </template>
                  </td>
                  <td class="box-action td-box-add">
                    <template>
                      <div class="group-radio flex align-center space-center">
                        <div class="btn-action radio-left" @click="onChangeRadioAdd(index)">
                          <input type="checkbox" :id="index + 'yes'" :name="index + 'Note'" v-model="item.Items[1].Value">
                          <label class="no-margin" :for="index + 'yes'">{{__t('HospitalDischargeTable.radio')}}</label>
                        </div>
                        <div class="btn-action" @click="onChangeRadioAdd2(index)">
                          <input type="checkbox" :id="index + 'no'" :name="index + 'Note'" v-model="item.Items[2].Value">
                          <label class="no-margin" :for="index + 'no'">{{__t('HospitalDischargeTable.radio2')}}</label>
                        </div>
                      </div>
                      <div class="box-reason">
                        <textarea-autosize
                          :code="item.Items[3].Code"
                          class="form-control"
                          :placeholder="__t('_Note2')"
                          v-model="item.Items[3].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
              <!-- buton add -->
              <tbody v-if="showTable4">
                <tr>
                  <td>
                    <template>
                      <div
                        class="box-add flex align-center cursor"
                        @click="addRow()"
                      >
                        <span class="icon-plus fs20"
                          ><i class="fa fa-plus" aria-hidden="true"></i
                        ></span>
                        <span class="add fs14">{{
                          __t("HospitalDischargeTable.add")
                        }}</span>
                      </div>
                    </template>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div
              class="flex align-center space-center mrb20"
              :class="showTable4 ? 'view-full' : null"
            >
              <button
                @click="showMore(4)"
                class="btn v-green-btn v-bottom-btn btn-swit-icon"
              >
                <span class="span-down-cion">{{ __t("btn.mo_rong") }}</span>
                <span class="span-up-cion">{{ __t("btn.thu_gon") }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="box2">
          <!-- Phương tiện vận chuyển -->
          <div v-if="VisitVersion < 12" class="table1">
            <table
              v-if="MASTERDATA['IPDDPCN06']"
              class="table observation-table noneMg"
              :class="MASTERDATA['IPDDPCN06'].Items[0].Value ? 'noneMg' : null"
            >
              <thead>
                <tr>
                  <th width="50%" class="bg-white">
                    {{ __t("HospitalDischargeTable.labelTable1") }}
                  </th>
                  <th width="50%" class="bg-white">
                    {{ __t("HospitalDischargeTable.labelTable2") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="cap fw600 fs14 bg-gray" colspan="2">
                    {{ __t("HospitalDischargeTable.labelTable3") }}
                  </td>
                </tr>
              </tbody>
              <tbody v-if="showTable1">
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN02'] &&
                      !MASTERDATA['IPDDPCN06'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN22'].Items[0].Value
                  "
                >
                  <td class="" v-html="__label(MASTERDATA['IPDDPCN02'])"></td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN02'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN02'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN06'] &&
                      !MASTERDATA['IPDDPCN02'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN22'].Items[0].Value
                  "
                >
                  <td class="fw600">{{ __label(MASTERDATA["IPDDPCN06"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN06'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN06'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN22'] &&
                      !MASTERDATA['IPDDPCN02'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN06'].Items[0].Value
                  "
                >
                  <td class="" v-html="__label(MASTERDATA['IPDDPCN22'])"></td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN22'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN22'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="
                MASTERDATA['IPDDPCN06'] &&
                  MASTERDATA['IPDDPCN06'].Items[0].Value
              "
              class=""
            >
              <div class="box-ed-content">
                <table class="table observation-table table-mini noneMg">
                  <tbody v-if="showTable1">
                    <tr v-if="MASTERDATA['IPDDPCN10']">
                      <td width="55%">
                        1. {{ __label(MASTERDATA["IPDDPCN10"]) }}
                      </td>
                      <td width="45%" class="box-action">
                        <template>
                          <div class="mrb10 flex align-center space-center">
                            <MDRadioView
                              :data="MASTERDATA['IPDDPCN10'].Items"
                            />
                          </div>
                          <div class="box-reason">
                            <FakeInput
                              v-model="MASTERDATA['IPDDPCN10'].Items[2].Value"
                            />
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDDPCN14']">
                      <td width="55%">
                        2. {{ __label(MASTERDATA["IPDDPCN14"]) }}
                      </td>
                      <td width="45%" class="box-action">
                        <template>
                          <div class="mrb10 flex align-center space-center">
                            <MDRadioView
                              :data="MASTERDATA['IPDDPCN14'].Items"
                            />
                          </div>
                          <div class="box-reason">
                            <FakeInput
                              v-model="MASTERDATA['IPDDPCN14'].Items[2].Value"
                            />
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDDPCN18']">
                      <td width="55%">
                        3. {{ __label(MASTERDATA["IPDDPCN18"]) }}
                      </td>
                      <td width="45%" class="box-action">
                        <template>
                          <div class="mrb10 flex align-center space-center">
                            <MDRadioView
                              :data="MASTERDATA['IPDDPCN18'].Items"
                            />
                          </div>
                          <div class="box-reason">
                            <FakeInput
                              v-model="MASTERDATA['IPDDPCN18'].Items[2].Value"
                            />
                          </div>
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="flex align-center space-center mrb20"
              :class="showTable1 ? 'view-full' : null"
            >
              <button
                @click="showMore(1);"
                class="btn v-green-btn v-bottom-btn btn-swit-icon"
              >
                <span class="span-down-cion">{{ __t("btn.mo_rong") }}</span>
                <span class="span-up-cion">{{ __t("btn.thu_gon") }}</span>
              </button>
            </div>
          </div>
          <!-- Thuốc ra viện -->
          <!-- <div class="table5"> -->
          <div v-if="VisitVersion >= 12" class="table1">
            <table class="table observation-table noneMg">
              <thead>
                <tr>
                  <th width="50%" class="bg-white text-center">
                    {{ __t("HospitalDischargeTable.labelTable1") }}
                  </th>
                  <th width="50%" class="bg-white text-center">
                    {{ __t("HospitalDischargeTable.labelTable2") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <!-- <td class="cap fw600 fs14 bg-gray" colspan="2"> -->
                  <td class="cap fw600 fs14 bg-gray" colspan="2">
                    {{ __t("HospitalDischargeTable.labelTable8") }}
                  </td>
                </tr>
              </tbody>
              <tbody v-if="showTable5">
                <tr v-if="MASTERDATA['IPDDPCN117']">
                  <td class="fw600">{{ __label(MASTERDATA["IPDDPCN117"]) }}</td>
                  <td class="box-action">
                    <template>
                      <MDRadioView class="d-flex justify-content-center" :data="MASTERDATA['IPDDPCN117'].Items" />
                      <div class="box-reason mt-5">
                        <FakeInput v-model="MASTERDATA['IPDDPCN117'].Items[2].Value" />
                      </div>
                      <div class="d-flex flex-center mt-5">
                        <p class="mb-0 mr-0 ml-5">{{__label(MASTERDATA['IPDDPCN125'])}}:</p>
                        <MDRadioView :data="MASTERDATA['IPDDPCN125'].Items" />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN121']">
                  <td class="fw600">{{ __label(MASTERDATA["IPDDPCN121"]) }}</td>
                  <td class="box-action">
                    <template>
                      <MDRadioView class="d-flex justify-content-center" :data="MASTERDATA['IPDDPCN121'].Items" />
                      <div class="box-reason mt-5">
                        <FakeInput v-model="MASTERDATA['IPDDPCN121'].Items[2].Value" />
                      </div>
                      <div class="d-flex flex-center mt-5">
                        <p class="mb-0 mr-0 ml-5">{{__label(MASTERDATA['IPDDPCN129'])}}:</p>
                        <MDRadioView :data="MASTERDATA['IPDDPCN129'].Items" />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="flex align-center space-center mrb20"
              :class="showTable5 ? 'view-full' : null"
            >
              <button
                @click="showMore(5)"
                class="btn v-green-btn v-bottom-btn btn-swit-icon"
              >
                <span class="span-down-cion">{{ __t("btn.mo_rong") }}</span>
                <span class="span-up-cion">{{ __t("btn.thu_gon") }}</span>
              </button>
            </div>
          </div>
          <!-- Phương tiện vận chuyển v2 -->
          <div v-if="VisitVersion >= 12" class="table1">
            <table
              v-if="MASTERDATA['IPDDPCN06']"
              class="table observation-table noneMg"
              :class="MASTERDATA['IPDDPCN06'].Items[0].Value ? 'noneMg' : null"
            >
              <thead>
                <tr>
                  <td class="cap fw600 fs14 bg-gray" colspan="2">
                    {{ __t("HospitalDischargeTable.labelTable3") }}
                  </td>
                </tr>
              </thead>
              <tbody v-if="showTable1">
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN02'] &&
                      !MASTERDATA['IPDDPCN06'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN22'].Items[0].Value
                  "
                >
                  <td class="" v-html="__label(MASTERDATA['IPDDPCN02'])"></td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN02'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN02'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN06'] &&
                      !MASTERDATA['IPDDPCN02'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN22'].Items[0].Value
                  "
                >
                  <td class="fw600">{{ __label(MASTERDATA["IPDDPCN06"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN06'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN06'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN22'] &&
                      !MASTERDATA['IPDDPCN02'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN06'].Items[0].Value
                  "
                >
                  <td class="" v-html="__label(MASTERDATA['IPDDPCN22'])"></td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN22'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN22'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="
                MASTERDATA['IPDDPCN06'] &&
                  MASTERDATA['IPDDPCN06'].Items[0].Value
              "
              class=""
            >
              <div class="box-ed-content">
                <table class="table observation-table table-mini noneMg">
                  <tbody v-if="showTable1">
                    <tr v-if="MASTERDATA['IPDDPCN10']">
                      <td width="55%">
                        1. {{ __label(MASTERDATA["IPDDPCN10"]) }}
                      </td>
                      <td width="45%" class="box-action">
                        <template>
                          <div class="mrb10 flex align-center space-center">
                            <MDRadioView
                              :data="MASTERDATA['IPDDPCN10'].Items"
                            />
                          </div>
                          <div class="box-reason">
                            <FakeInput
                              v-model="MASTERDATA['IPDDPCN10'].Items[2].Value"
                            />
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDDPCN14']">
                      <td width="55%">
                        2. {{ __label(MASTERDATA["IPDDPCN14"]) }}
                      </td>
                      <td width="45%" class="box-action">
                        <template>
                          <div class="mrb10 flex align-center space-center">
                            <MDRadioView
                              :data="MASTERDATA['IPDDPCN14'].Items"
                            />
                          </div>
                          <div class="box-reason">
                            <FakeInput
                              v-model="MASTERDATA['IPDDPCN14'].Items[2].Value"
                            />
                          </div>
                        </template>
                      </td>
                    </tr>
                    <tr v-if="MASTERDATA['IPDDPCN18']">
                      <td width="55%">
                        3. {{ __label(MASTERDATA["IPDDPCN18"]) }}
                      </td>
                      <td width="45%" class="box-action">
                        <template>
                          <div class="mrb10 flex align-center space-center">
                            <MDRadioView
                              :data="MASTERDATA['IPDDPCN18'].Items"
                            />
                          </div>
                          <div class="box-reason">
                            <FakeInput
                              v-model="MASTERDATA['IPDDPCN18'].Items[2].Value"
                            />
                          </div>
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="flex align-center space-center mrb20"
              :class="showTable1 ? 'view-full' : null"
            >
              <button
                @click="showMore(1);"
                class="btn v-green-btn v-bottom-btn btn-swit-icon"
              >
                <span class="span-down-cion">{{ __t("btn.mo_rong") }}</span>
                <span class="span-up-cion">{{ __t("btn.thu_gon") }}</span>
              </button>
            </div>
          </div>
          <!-- Địa điểm vận chuyển sau khi ra viện -->
          <div class="table2">
            <table class="table observation-table noneMg">
              <thead>
                <tr>
                  <th colspan="2">
                    {{ __t("HospitalDischargeTable.labelTbale4") }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="showTable2">
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN27'] &&
                      !MASTERDATA['IPDDPCN31'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN39'].Items[1].Value
                  "
                >
                  <td class="fw600">{{ __label(MASTERDATA["IPDDPCN27"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN27'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN27'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN31'] &&
                      !MASTERDATA['IPDDPCN27'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN39'].Items[1].Value
                  "
                >
                  <td class="fw600">{{ __label(MASTERDATA["IPDDPCN31"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN31'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN31'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN35'] &&
                      MASTERDATA['IPDDPCN31'].Items[0].Value
                  "
                >
                  <td>{{ __label(MASTERDATA["IPDDPCN35"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN35'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN35'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN39'] &&
                      !MASTERDATA['IPDDPCN27'].Items[0].Value &&
                      !MASTERDATA['IPDDPCN31'].Items[0].Value
                  "
                >
                  <td style="padding-top: 25px;">
                    <template>
                      <div style="margin-bottom: 14px;" class="fw600">
                        {{ __label(MASTERDATA["IPDDPCN39"]) }}
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN39'].Items[0].Value"
                        />
                      </div>
                    </template>
                  </td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN39'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN39'].Items[3].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="flex align-center space-center mrb20"
              :class="showTable2 ? 'view-full' : null"
            >
              <button
                @click="showMore(2)"
                class="btn v-green-btn v-bottom-btn btn-swit-icon"
              >
                <span class="span-down-cion">{{ __t("btn.mo_rong") }}</span>
                <span class="span-up-cion">{{ __t("btn.thu_gon") }}</span>
              </button>
            </div>
          </div>
        </div>
        <div class="box3">
          <div class="table3">
            <table class="table observation-table noneMg">
              <thead>
                <tr>
                  <th colspan="2">
                    {{ __t("HospitalDischargeTable.labelTbale5") }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="showTable3">
                <tr v-if="MASTERDATA['IPDDPCN45']">
                  <td>{{ __label(MASTERDATA["IPDDPCN45"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN45'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN45'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN49']">
                  <td>{{ __label(MASTERDATA["IPDDPCN49"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN49'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN49'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN53']">
                  <td>{{ __label(MASTERDATA["IPDDPCN53"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN53'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN53'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN57']">
                  <td>{{ __label(MASTERDATA["IPDDPCN57"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN57'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN57'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN61']">
                  <td>{{ __label(MASTERDATA["IPDDPCN61"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN61'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN61'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN65']">
                  <td>{{ __label(MASTERDATA["IPDDPCN65"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN65'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN65'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN69']">
                  <td>{{ __label(MASTERDATA["IPDDPCN69"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN69'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN69'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="flex align-center space-center mrb20"
              :class="showTable3 ? 'view-full' : null"
            >
              <button
                @click="showMore(3)"
                class="btn v-green-btn v-bottom-btn btn-swit-icon"
              >
                <span class="span-down-cion">{{ __t("btn.mo_rong") }}</span>
                <span class="span-up-cion">{{ __t("btn.thu_gon") }}</span>
              </button>
            </div>
          </div>
          <div class="table4">
            <table class="table observation-table noneMg">
              <thead>
                <tr>
                  <th colspan="2">
                    {{ __t("HospitalDischargeTable.labelTbale6") }}
                  </th>
                </tr>
              </thead>
              <tbody v-if="showTable4">
                <tr v-if="MASTERDATA['IPDDPCN74']">
                  <td>{{ __label(MASTERDATA["IPDDPCN74"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN74'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN74'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN78'] && VisitVersion < 12">
                  <td>{{ __label(MASTERDATA["IPDDPCN78"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN78'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN78'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="MASTERDATA['IPDDPCN82']">
                  <td>{{ __label(MASTERDATA["IPDDPCN82"]) }}</td>
                  <td class="box-action">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN82'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN82'].Items[2].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
              <!-- add them cot -->
              <tbody v-if="showTable4">
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN87'] &&
                      MASTERDATA['IPDDPCN87'].Items[4].Value
                  "
                >
                  <td><p>{{ MASTERDATA["IPDDPCN87"].Items[0].Value }}</p></td>
                  <td class="box-action td-box-add">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN87'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN87'].Items[3].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN93'] &&
                      MASTERDATA['IPDDPCN93'].Items[4].Value
                  "
                >
                  <td><p>{{ MASTERDATA["IPDDPCN93"].Items[0].Value }}</p></td>
                  <td class="box-action td-box-add">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN93'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN93'].Items[3].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN99'] &&
                      MASTERDATA['IPDDPCN99'].Items[4].Value
                  "
                >
                  <td><p>{{ MASTERDATA["IPDDPCN99"].Items[0].Value }}</p></td>
                  <td class="box-action td-box-add">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN99'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN99'].Items[3].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN105'] &&
                      MASTERDATA['IPDDPCN105'].Items[4].Value
                  "
                >
                  <td><p>{{ MASTERDATA["IPDDPCN105"].Items[0].Value }}</p></td>
                  <td class="box-action td-box-add">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN105'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN105'].Items[3].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
                <tr
                  v-if="
                    MASTERDATA['IPDDPCN111'] &&
                      MASTERDATA['IPDDPCN111'].Items[4].Value
                  "
                >
                  <td><p>{{ MASTERDATA["IPDDPCN111"].Items[0].Value }}</p></td>
                  <td class="box-action td-box-add">
                    <template>
                      <div class="mrb10 flex align-center space-center">
                        <MDRadioView :data="MASTERDATA['IPDDPCN111'].Items" />
                      </div>
                      <div class="box-reason">
                        <FakeInput
                          v-model="MASTERDATA['IPDDPCN111'].Items[3].Value"
                        />
                      </div>
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              class="flex align-center space-center mrb20"
              :class="showTable4 ? 'view-full' : null"
            >
              <button
                @click="showMore(4)"
                class="btn v-green-btn v-bottom-btn btn-swit-icon"
              >
                <span class="span-down-cion">{{ __t("btn.mo_rong") }}</span>
                <span class="span-up-cion">{{ __t("btn.thu_gon") }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div :class="isNull ? 'none-btn-save' : null">
      <FloatBlock v-if="condition && condition === 'Nurse' && !viewOnly">
        <template slot="buttons">
          <div class="col-md-2 col-sm-2"><div class="form-group1"></div></div>
          <div class="col-md-4 col-sm-4"><div class="form-group1"></div></div>
          <div class="col-md-6 col-sm-6" v-if="!getIsLocked">
            <div class="form-group1">
              <button
                class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
                type="button"
                v-shortkey="['ctrl', 's']"
                @click="submit()"
              >
                <i class="fa fa-floppy-o" aria-hidden="true"></i>
                {{ __t("btn.luu") }}
              </button>
            </div>
          </div>
        </template>
      </FloatBlock>
    </div>
  </div>
</template>

<script>
import MixinMasterData from '@/mixins/masterdata.js'
import CreateChecklistNurse from '@/services/IPD/HospitalDischargeTable/CreateChecklistNurse'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
import IPDDischargePreparationChecklistNurse from '@/services/IPD/HospitalDischargeTable/GetProfileNurse'
export default {
  name: 'PageNurse',
  props: {
    condition: '',
    visitStatus: '',
    isNull: {
      type: Boolean,
      default: true
    },
    viewOnly: {
      type: Boolean,
      default: false
    },
    viewOnly2: {
      type: Boolean,
      default: false
    },
    VisitId: '',
    VisitVersion: null
  },
  data () {
    return {
      DataSubmit: {},
      DataNurse: {},
      time: moment().format('HH:mm DD/MM/YYYY'),
      dataTable: [],
      showTable1: false,
      showTable2: false,
      showTable3: false,
      showTable4: false,
      showTable5: false,
      updatedBy: ''
    }
  },
  mixins: [MixinMasterData],
  components: {
    VDateTimePicker
  },
  mounted () {
    // master data
    this.getMasterDatas({ Form: 'A03_046_050919_VE' }, () => {
      this.getData()
      this.checkTime()
    })
  },
  computed: {
    getIsLocked: function () {
      return (
        this.DataSubmit &&
        this.DataSubmit.IsLocked
      )
    },
    isNew: function () {
      return (
        !this.isReadonly &&
        this.DataSubmit &&
        this.DataSubmit.CreatedAt === this.DataSubmit.UpdatedAt
      )
    },
    isReadonly: function () {
      return this.DataSubmit.ConfirmBy || this.readonly
    }
  },
  methods: {
    // master data
    getData () {
      new CreateChecklistNurse()
        .find(this._VisitId + '?hidemsg=' + true)
        .then(response => {
          this.DataSubmit = response
          this.mapMdData2Data()
          this.loaded = true
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].ViName === 'Mô tả') {
              if (this.MASTERDATA[property].Items[4].Value) {
                this.dataTable.push(this.MASTERDATA[property])
              }
            }
          }
          this.autoFill()
          this.autoFill2()
        })
        .catch(e => {
          this.loaded = true
          this.DataSubmit = {}
          if (e.data.IsLocked) {
            this.DataSubmit.IsLocked = true
          }
          if (e.status === 404) {
          }
        })
    },
    checkTime () {
      if (!this._VisitId) return
      new IPDDischargePreparationChecklistNurse()
        .hideErrorMsg()
        .find(this._VisitId)
        .then(res => {
          this.DataNurse = res
          if (res) {
            this.updatedBy = res.UpdatedBy
            this.time = res.Time
          }
        })
        .catch(e => {
          if (e.status === 404) {
            this.isNullDocter = true
          }
        })
    },
    autoFill () {
      if (this.visitStatus && this.MASTERDATA) {
        if (this.visitStatus === 'In hospital') {
          this.MASTERDATA['IPDDPCN45'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN45'].Items[1].Value = true
        } else {
          this.MASTERDATA['IPDDPCN45'].Items[0].Value = true
          this.MASTERDATA['IPDDPCN45'].Items[1].Value = ''
        }
      }
    },
    autoFill2 () {
      if (this.visitStatus && this.MASTERDATA) {
        if (this.visitStatus === 'Inter-hospital transfer') {
          this.MASTERDATA['IPDDPCN49'].Items[0].Value = true
          this.MASTERDATA['IPDDPCN49'].Items[1].Value = ''
        } else {
          this.MASTERDATA['IPDDPCN49'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN49'].Items[1].Value = true
        }
      }
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('HospitalDischargeTable.conFirm1'),
        text: this.__t('HospitalDischargeTable.conFirm2'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('HospitalDischargeTable.conFirm3'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleCreateContent()
            }
          },
          {
            title: this.__t('HospitalDischargeTable.conFirm4'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },

    handleCreateContent () {
      if (!this._VisitId) return
      const data = {
        Time: this.time
      }
      new CreateChecklistNurse()
        .update('Create/' + this._VisitId, data)
        .then(() => {
          this.$emit('reloadIsNull')
          this.reload()
        })
        .catch(e => {
          // this.back()
        })
    },
    submit () {
      this.checkValidate()
      this.addData()
      this.mapData2MDData()
      const DataSubmit = Object.assign({}, this.DataSubmit)
      if (this.time) {
        DataSubmit.Time = this.time
      }
      new CreateChecklistNurse()
        .update('/Update/' + this._VisitId, DataSubmit)
        .then(() => {
          this.toastedSuccess()
          this.reloadDataTable()
          this.$emit('reloadTimeUpdate')
          // this.reload()
        })
        .catch(e => {})
    },
    // check validate
    checkValidate () {
      if (this.MASTERDATA['IPDDPCN06']) {
        if (!this.MASTERDATA['IPDDPCN06'].Items[0].Value) {
          this.MASTERDATA['IPDDPCN10'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN10'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN10'].Items[2].Value = ''
          this.MASTERDATA['IPDDPCN14'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN14'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN14'].Items[2].Value = ''
          this.MASTERDATA['IPDDPCN18'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN18'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN18'].Items[2].Value = ''
        } else {
          this.MASTERDATA['IPDDPCN02'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN02'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN02'].Items[2].Value = ''

          this.MASTERDATA['IPDDPCN22'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN22'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN22'].Items[2].Value = ''
        }

        if (this.MASTERDATA['IPDDPCN02'].Items[0].Value) {
          this.MASTERDATA['IPDDPCN06'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN06'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN06'].Items[2].Value = ''

          this.MASTERDATA['IPDDPCN22'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN22'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN22'].Items[2].Value = ''
        }

        if (this.MASTERDATA['IPDDPCN22'].Items[0].Value) {
          this.MASTERDATA['IPDDPCN06'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN22'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN06'].Items[2].Value = ''

          this.MASTERDATA['IPDDPCN02'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN02'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN02'].Items[2].Value = ''
        }

        if (!this.MASTERDATA['IPDDPCN31'].Items[0].Value) {
          this.MASTERDATA['IPDDPCN35'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN35'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN35'].Items[2].Value = ''
        } else {
          this.MASTERDATA['IPDDPCN27'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN27'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN27'].Items[2].Value = ''

          this.MASTERDATA['IPDDPCN39'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN39'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN39'].Items[2].Value = ''
          this.MASTERDATA['IPDDPCN39'].Items[3].Value = ''
        }

        if (this.MASTERDATA['IPDDPCN27'].Items[0].Value) {
          this.MASTERDATA['IPDDPCN31'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN31'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN31'].Items[2].Value = ''

          this.MASTERDATA['IPDDPCN39'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN39'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN39'].Items[2].Value = ''
          this.MASTERDATA['IPDDPCN39'].Items[3].Value = ''
        }

        if (this.MASTERDATA['IPDDPCN39'].Items[1].Value) {
          this.MASTERDATA['IPDDPCN31'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN31'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN31'].Items[2].Value = ''

          this.MASTERDATA['IPDDPCN27'].Items[0].Value = ''
          this.MASTERDATA['IPDDPCN27'].Items[1].Value = ''
          this.MASTERDATA['IPDDPCN27'].Items[2].Value = ''
        }
      }
    },
    addData () {
      this.dataTable = this.dataTable.filter(e => !e.removed && e.Items[0].Value)
      this.dataTable.forEach((elm, index) => {
        if (index === 0) {
          const code = 'IPDDPCN87'
          this.MASTERDATA[code].Items[0].Value = elm.Items[0].Value
          this.MASTERDATA[code].Items[1].Value = elm.Items[1].Value
          this.MASTERDATA[code].Items[2].Value = elm.Items[2].Value
          this.MASTERDATA[code].Items[3].Value = elm.Items[3].Value
          this.MASTERDATA[code].Items[4].Value = elm.Items[4].Value
        }
        if (index === 1) {
          const code = 'IPDDPCN93'
          this.MASTERDATA[code].Items[0].Value = elm.Items[0].Value
          this.MASTERDATA[code].Items[1].Value = elm.Items[1].Value
          this.MASTERDATA[code].Items[2].Value = elm.Items[2].Value
          this.MASTERDATA[code].Items[3].Value = elm.Items[3].Value
          this.MASTERDATA[code].Items[4].Value = elm.Items[4].Value
        }
        if (index === 2) {
          const code = 'IPDDPCN99'
          this.MASTERDATA[code].Items[0].Value = elm.Items[0].Value
          this.MASTERDATA[code].Items[1].Value = elm.Items[1].Value
          this.MASTERDATA[code].Items[2].Value = elm.Items[2].Value
          this.MASTERDATA[code].Items[3].Value = elm.Items[3].Value
          this.MASTERDATA[code].Items[4].Value = elm.Items[4].Value
        }
        if (index === 3) {
          const code = 'IPDDPCN105'
          this.MASTERDATA[code].Items[0].Value = elm.Items[0].Value
          this.MASTERDATA[code].Items[1].Value = elm.Items[1].Value
          this.MASTERDATA[code].Items[2].Value = elm.Items[2].Value
          this.MASTERDATA[code].Items[3].Value = elm.Items[3].Value
          this.MASTERDATA[code].Items[4].Value = elm.Items[4].Value
        }
        if (index === 4) {
          const code = 'IPDDPCN111'
          this.MASTERDATA[code].Items[0].Value = elm.Items[0].Value
          this.MASTERDATA[code].Items[1].Value = elm.Items[1].Value
          this.MASTERDATA[code].Items[2].Value = elm.Items[2].Value
          this.MASTERDATA[code].Items[3].Value = elm.Items[3].Value
          this.MASTERDATA[code].Items[4].Value = elm.Items[4].Value
        }
      })
    },
    reloadDataTable () {
      this.dataTable = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].ViName === 'Mô tả') {
          if (this.MASTERDATA[property].Items[4].Value) {
            this.dataTable.push(this.MASTERDATA[property])
          }
        }
      }
    },
    addRow () {
      const dataTable = this.dataTable.filter(e => !e.removed)
      if (dataTable.length < 5) {
        const data = {
          Code: '',
          DataType: 'InputText',
          removed: false,
          Items: [
            {
              DataType: 'InputText',
              Value: ''
            },
            {
              DataType: 'Radio',
              Value: ''
            },
            {
              DataType: 'Radio',
              Value: ''
            },
            {
              DataType: 'InputText',
              Value: ''
            },
            {
              DataType: 'Checkbox',
              Value: true
            }
          ]
        }
        this.dataTable.push(data)
      }
    },
    // show more
    showMore (num) {
      if (num === 1) {
        this.showTable1 = !this.showTable1
      }
      if (num === 2) {
        this.showTable2 = !this.showTable2
      }
      if (num === 3) {
        this.showTable3 = !this.showTable3
      }
      if (num === 4) {
        this.showTable4 = !this.showTable4
      }
      if (num === 5) {
        this.showTable5 = !this.showTable5
      }
    },
    onChangeRadioAdd (index) {
      if (!this.dataTable[index].Items[1].Value) {
        this.dataTable[index].Items[2].Value = ''
      }
    },
    onChangeRadioAdd2 (index) {
      if (!this.dataTable[index].Items[2].Value) {
        this.dataTable[index].Items[1].Value = ''
      }
    }
  },
  watch: {}
}
</script>
<style lang="stylus" scoped>
.test-enter-active {
  transition: all 0.3s ease-out;
}

.test-leave-active {
  transition: all 0.3s ease-out;
}

.test-enter-from {
  height: 0;
  opacity: 0;
}

.test-enter-to {
  height: 100%;
  opacity: 1;
}

.test-leave-to {
  height: 100%;
  opacity: 0;
}
.box-title {
  background: #1e5584;
  border-radius: 6px;
  padding: 4px 10px;
}

.box-btn-mini {
  cursor: pointer;
  border: 1px solid black;
  border-radius: 4px;
  color: black;
  padding: 3px 5px;
  background: linear-gradient(180deg, #ffdb71 0%, #f3b600 100%);
}

.box-btn-mini:hover {
  background: #d09e0b;
}

/* box date */
.box1 {
  word-break: break-word;
}

.box-date {
  margin-right: 20px;
}

.title-date {
  min-width: 118px;
  margin-right: 10px;
}

.table {
}

th {
  text-align: left;
  text-transform: uppercase;
  font-weight: 600;
}

.box-add {
  max-width: 20%;
  height: 40px;
  border-radius: 4px;
  background-color: #d4d4d4;
  border-color: #8c8c8c;
  color: #333;
}

.icon-plus {
  margin-right: 5px;
  margin-left: 10px;
}

.td-box-add {
  position: relative;
}

.delete {
  position: absolute;
  left: -31px;
  background-color: #f39c12;
  border: none;
  height: 100%;
  top: 0;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.noneMg {
  margin-bottom: 0px;
}

.table-mini > td {
  padding-left: 10px;
}

.box-action {
  width: 50%;
}

th {
  width: 50%;
}

td {
  width: 50%;
}

.table1 {
  th {
    text-align: center;
  }
  .bg-white {
    background-color: #fff;
  }
  .bg-gray {
    background-color: #f5f5f5!important;
  }
}
.group-radio {
  margin-bottom: 10px;
  .no-margin {
    font-weight: 100;
  }
  .radio-left {
    margin-right: 10px;
  }
}
.td-box-add {
  label {
    font-weight: 400!important;
  }
}
</style>
