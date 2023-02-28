<template>
  <div class="main-content" id="OutpatientExaminationNote-page" v-if="loaded">
    <template v-if="DataSubmit.IsConsultation === false">
        <initial-assessment :VisitId="$route.params.Id" :pkFormat="true"/>
        <div v-if="DataSubmit.IsConsultation === false">
          <template v-if="isPrimaryDoctorOrAuthorizedDoctor">
            <div id="OutpatientExaminationNoteForm">
              <h1 v-if="DataSubmit.IsTelehealth" class="text-center">{{ __t("general.phieu_kham_telehealth") }}</h1>
              <h1 v-else class="text-center">{{ __t("general.phieu_kham_ngoai_tru") }}</h1>
              <InfoForm :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
              <!-- Nơi giới thiệu/ Referred by -->
              <div class="box box-table" v-if="VisitVersion >= 12">
                <div class="box-body">
                  <label>
                    {{__label(MASTERDATA['OPDOENPT603'])}}
                  </label>
                  <template v-if="VisitVersion >= 12 && MASTERDATA['OPDOENPT603']">
                    <div class="d-flex flex-center">
                      <div style="flex-grow: 1">
                        <div class="d-flex">
                          <MDRadio id="OPDOENPT603" v-model="MASTERDATA['OPDOENPT603']"/>
                        </div>
                        <div class="mt-10"></div>
                        <label v-if="MASTERDATA['OPDOENPT603'].Items[0].Value === true">{{__label(MASTERDATA['OPDOENPT606'].Items[0])}}</label>
                        <div class="d-flex" style="flex-grow: 1;">
                          <!-- <span>
                            <MDRadio v-if="MASTERDATA['OPDOENPT603'].Items[0].Value" :indexs="[0]" id="OPDOENPT606" v-model="MASTERDATA['OPDOENPT606']" />
                          </span> -->
                          <textarea-autosize style="line-height: 27px; margin: 0"  :class="MASTERDATA['OPDOENPT606'].Items[2].Value ? 'form-control mt-5 fake-input disable' : 'form-control mt-5'" :placeholder="__t('Nhập')" :code="MASTERDATA['OPDOENPT606'].Items[1].Code" v-model="MASTERDATA['OPDOENPT606'].Items[1].Value" v-if="MASTERDATA['OPDOENPT603'].Items[0].Value === true"/>
                          <MDRadio v-if="MASTERDATA['OPDOENPT603'].Items[0].Value" :indexs="[2]" id="OPDOENPT606" v-model="MASTERDATA['OPDOENPT606']"/>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <!-- End nơi giới thiệu -->
              <div class="box box-table">
                <div class="box-body">
                  <md-input-text v-model="MASTERDATA['OPDOENCC0']" />
                  <div class="row" v-if="MASTERDATA['OPDOENPMH'] && !showWithClinic('FreeTextOnly-000')">
                    <div class="col-md-12">
                      <label v-if="VisitVersion >= 12">{{__t('Tiền sử bệnh')}}</label>
                      <div class="form-group bg-gray-2">
                        <label v-if="VisitVersion >= 12">{{__t2('+ Bản thân-mdcGyy')}}:</label>
                        <label v-else>{{__label(MASTERDATA["OPDOENPMH"])}}<i class="unit-label">{{MASTERDATA["OPDOENPMH"].Note}}</i></label>
                        <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['OPDOENPMH'].Items">
                          <textarea-autosize :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                        </div>
                        <div class="HistoryOfPresentIllness" v-if="SyncPastMedicalHistory && SyncPastMedicalHistory.length">
                          <label>{{__t("Thông tin khai thác tiền sử bệnh")}}</label>
                          <vue-scrolling-table v-if="SyncPastMedicalHistory.length">
                            <template slot="tbl">
                              <table class="table table-bordered table-bordered-x">
                                <thead>
                                  <tr>
                                    <th width="126px" class="no-wrap">
                                      {{ __t("Ngày khám") }}
                                    </th>
                                    <th width="140px" class="no-wrap">
                                      {{ __t("Bác sĩ khám") }}
                                    </th>
                                    <th width="250px" class="no-wrap">
                                      {{ __t("Khoa Phòng") }}
                                    </th>
                                    <th>{{ __t("Tiền sử bệnh") }}</th>
                                    <th width="60px"></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr :data="item" :key="index" v-for="(item, index) in SyncPastMedicalHistory">
                                    <td class="no-wrap">
                                      {{ item.ExaminationTime }}
                                    </td>
                                    <td class="no-wrap">
                                      <ad-Info :ad="item.PrimaryDoctor" :type="item.Type"/>
                                    </td>
                                    <td class="no-wrap">
                                      {{ __label(item.Clinic) }}
                                    </td>
                                    <td>
                                      <p v-if="item.Value">{{ item.Value }}</p>
                                    </td>
                                    <td width="1" class="no-wrap">
                                      <button class="btn btn-xs v-white-btn" @click="copyOPDOENPMH(item.Value)">Copy</button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </template>
                          </vue-scrolling-table>
                        </div>
                      </div>
                      <div class="form-group bg-gray-2"  v-if="VisitVersion >= 12 && MASTERDATA['OPDOENPT621']">
                        <label>{{__t2('+ Gia đình-mdcGyy')}}:</label>
                        <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['OPDOENPT621'].Items">
                          <textarea-autosize :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                        </div>
                        <div class="HistoryOfPresentIllness" v-if="SyncFamilyMedicalHistory && SyncFamilyMedicalHistory.length">
                          <label>{{__t("Thông tin khai thác tiền sử bệnh của người thân")}}</label>
                          <vue-scrolling-table v-if="SyncFamilyMedicalHistory.length">
                            <template slot="tbl">
                              <table class="table table-bordered table-bordered-x">
                                <thead>
                                  <tr>
                                    <th width="126px" class="no-wrap">
                                      {{ __t("Ngày khám") }}
                                    </th>
                                    <th width="140px" class="no-wrap">
                                      {{ __t("Bác sĩ khám") }}
                                    </th>
                                    <th width="250px" class="no-wrap">
                                      {{ __t("Khoa Phòng") }}
                                    </th>
                                    <th>{{ __t("Tiền sử bệnh") }}</th>
                                    <th width="60px"></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr :data="item" :key="index" v-for="(item, index) in SyncFamilyMedicalHistory">
                                    <template v-if="item.PastMedicalHistory">
                                      <td class="no-wrap">
                                        {{ item.ExaminationTime | formatDateWithoutSecon }}
                                      </td>
                                      <td class="no-wrap">
                                        <ad-Info :ad="item.DoctorExam" :type="item.Type"/>
                                      </td>
                                      <td class="no-wrap">
                                        <!-- {{ __label(item.Clinic) }} -->
                                        {{ $i18n.locale === 'en' ? item.SpecialtyEn : item.SpecialtyVi}}
                                      </td>
                                      <td>
                                        <p v-if="item.PastMedicalHistory">{{ item.PastMedicalHistory }}</p>
                                      </td>
                                      <td width="1" class="no-wrap">
                                        <button class="btn btn-xs v-white-btn" @click="copyOPDOENPT621(item.PastMedicalHistory)">Copy</button>
                                      </td>
                                    </template>
                                  </tr>
                                </tbody>
                              </table>
                            </template>
                          </vue-scrolling-table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <template v-if="MASTERDATA['OPDOENPMH'] && showWithClinic('FreeTextOnly-000')">
                    <div class="row">
                      <div class="col-md-12">
                      <label v-if="VisitVersion >= 12">{{__t('Tiền sử bệnh')}}</label>
                        <div class="form-group bg-gray-2">
                          <label v-if="VisitVersion >= 12">{{__t2('+ Bản thân-mdcGyy')}}:</label>
                          <label v-else>{{ __t("Tiền sử bệnh") }}</label>
                          <div class="row" :data="c" :key="'OPDOENTSSK' + j" v-for="(c, j) in OPDOENTSSK" v-if="MASTERDATA[c] && showWithClinic(MASTERDATA[c].Clinic) && VisitVersion >= 12">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label>{{__label(MASTERDATA[c])}}<i class="unit-label">{{MASTERDATA[c].Note}}</i></label>
                                <div :data="item" :key="index" v-for="(item, index) in MASTERDATA[c].Items">
                                  <textarea-autosize
                                    :data-code="item.Code"
                                    :id="item.Code"
                                    :data="item"
                                    class="form-control"
                                    rows="3"
                                    :placeholder="__label(item)"
                                    v-model="item.Value"/>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="HistoryOfPresentIllness" v-if="SyncPastMedicalHistory && SyncPastMedicalHistory.length">
                            <label>{{__t("Thông tin khai thác tiền sử bệnh")}}</label>
                            <vue-scrolling-table v-if="SyncPastMedicalHistory.length">
                              <template slot="tbl">
                                <table class="table table-bordered table-bordered-x">
                                  <thead>
                                    <tr>
                                      <th width="1" class="no-wrap">
                                        {{ __t("Ngày khám") }}
                                      </th>
                                      <th width="1" class="no-wrap">
                                        {{ __t("Bác sĩ khám") }}
                                      </th>
                                      <th width="1" class="no-wrap">
                                        {{ __t("Khoa Phòng") }}
                                      </th>
                                      <th>{{ __t("Tiền sử bệnh") }}</th>
                                      <th width="1"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr :data="item" :key="index" v-for="(item, index) in SyncPastMedicalHistory">
                                      <td class="no-wrap">
                                        {{ item.ExaminationTime }}
                                      </td>
                                      <td class="no-wrap">
                                        <ad-Info :ad="item.PrimaryDoctor" :type="item.Type"/>
                                      </td>
                                      <td class="no-wrap">
                                        {{ __label(item.Clinic) }}
                                      </td>
                                      <td>
                                        <p>{{ item.Value }}</p>
                                      </td>
                                      <td width="1" class="no-wrap">
                                        <button class="btn btn-xs v-white-btn" @click="copyOPDOENTSSK(item)">Copy</button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </template>
                            </vue-scrolling-table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row" :data="c" :key="'OPDOENTSSK' + j" v-for="(c, j) in OPDOENTSSK" v-if="MASTERDATA[c] && showWithClinic(MASTERDATA[c].Clinic) && VisitVersion < 12">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>{{__label(MASTERDATA[c])}}<i class="unit-label">{{MASTERDATA[c].Note}}</i></label>
                          <div :data="item" :key="index" v-for="(item, index) in MASTERDATA[c].Items">
                            <textarea-autosize
                              :data-code="item.Code"
                              :id="item.Code"
                              :data="item"
                              class="form-control"
                              rows="3"
                              :placeholder="__label(item)"
                              v-model="item.Value"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group bg-gray-2"  v-if="VisitVersion >= 12 && MASTERDATA['OPDOENPT621']">
                          <label>{{__t2('+ Gia đình-mdcGyy')}}:</label>
                          <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['OPDOENPT621'].Items">
                            <textarea-autosize :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                          </div>
                          <div class="HistoryOfPresentIllness" v-if="SyncFamilyMedicalHistory && SyncFamilyMedicalHistory.length">
                            <label>{{__t("Thông tin khai thác tiền sử bệnh của người thân")}}</label>
                            <vue-scrolling-table v-if="SyncFamilyMedicalHistory.length">
                              <template slot="tbl">
                                <table class="table table-bordered table-bordered-x">
                                  <thead>
                                    <tr>
                                      <th width="126px" class="no-wrap">
                                        {{ __t("Ngày khám") }}
                                      </th>
                                      <th width="140px" class="no-wrap">
                                        {{ __t("Bác sĩ khám") }}
                                      </th>
                                      <th width="250px" class="no-wrap">
                                        {{ __t("Khoa Phòng") }}
                                      </th>
                                      <th>{{ __t("Tiền sử bệnh") }}</th>
                                      <th width="60px"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr :data="item" :key="index" v-for="(item, index) in SyncFamilyMedicalHistory">
                                      <template v-if="item.PastMedicalHistory">
                                        <td class="no-wrap">
                                          {{ item.ExaminationTime | formatDateWithoutSecon }}
                                        </td>
                                        <td class="no-wrap">
                                          <ad-Info :ad="item.DoctorExam" :type="item.Type"/>
                                        </td>
                                        <td class="no-wrap">
                                          {{ $i18n.locale === 'en' ? item.SpecialtyEn : item.SpecialtyVi}}
                                        </td>
                                        <td>
                                          <p v-if="item.PastMedicalHistory">{{ item.PastMedicalHistory }}</p>
                                        </td>
                                        <td width="1" class="no-wrap">
                                          <button class="btn btn-xs v-white-btn" @click="copyOPDOENPT621(item.PastMedicalHistory)">Copy</button>
                                        </td>
                                      </template>
                                    </tr>
                                  </tbody>
                                </table>
                              </template>
                            </vue-scrolling-table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <div class="row highlighted-">
                    <div class="col-md-12" v-if="MASTERDATA['OPDOENHOA']">
                      <div class="form-group bg-gray-2">
                        <div class="v-row" v-if="InitialAssessmentAllergies">
                          <div class="group-radio cp-block">
                            <b style="padding: 7px 10px 0 0" class="no-wrap">{{__t("Thông tin tiền sử dị ứng điều dưỡng đã khai khác")}}</b>
                            <input readonly v-model="InitialAssessmentAllergies" class="form-control"/>
                            <button class="btn btn-xs v-white-btn" @click="copyToOPDOENHOA(InitialAssessmentAllergies)">Copy</button>
                          </div>
                        </div>
                        <label class="color-red"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>{{ __label(MASTERDATA["OPDOENHOA"]) }}<i class="unit-label">{{MASTERDATA["OPDOENHOA"].Note}}</i></label>
                        <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['OPDOENHOA'].Items">
                          <textarea-autosize
                            :data-code="item.Code"
                            :id="item.Code"
                            :data="item"
                            class="form-control"
                            rows="3"
                            :placeholder="__label(item)"
                            v-model="item.Value"/>
                        </div>
                        <div class="HistoryOfPresentIllness" v-if="HistoryOfAllergies && HistoryOfAllergies.length">
                          <label>
                            {{
                              HistoryOfAllergies.length
                                ? "Thông tin khai thác dị ứng"
                                : "Không có thông tin khai thác dị ứng"
                            }}</label>
                          <vue-scrolling-table v-if="HistoryOfAllergies.length">
                            <template slot="tbl">
                              <table
                                class="table table-bordered table-bordered-x"
                                v-if="HistoryOfAllergies.length"
                              >
                                <thead>
                                  <tr>
                                    <th width="1" class="no-wrap">
                                      {{ __t("Ngày khám") }}
                                    </th>
                                    <th width="1" class="no-wrap">
                                      {{ __t("Bác sĩ khám") }}
                                    </th>
                                    <th width="1" class="no-wrap">
                                      {{ __t("Khoa Phòng") }}
                                    </th>
                                    <th>{{ __t("Tiền sử dị ứng") }}</th>
                                    <th width="1"></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    :data="HistoryOfAllergie"
                                    :key="index"
                                    v-for="(
                                      HistoryOfAllergie, index
                                    ) in HistoryOfAllergies"
                                  >
                                    <td class="no-wrap">
                                      {{ HistoryOfAllergie.ExaminationTime }}
                                    </td>
                                    <td class="no-wrap">
                                      <ad-Info
                                        :ad="HistoryOfAllergie.Username"
                                        :type="HistoryOfAllergie.Type"
                                      />
                                    </td>
                                    <td class="no-wrap">
                                      {{ __label(HistoryOfAllergie) }}
                                    </td>
                                    <td>
                                      <p
                                        v-if="HistoryOfAllergie.HistoryOfAllergies"
                                      >
                                        {{ HistoryOfAllergie.HistoryOfAllergies }}
                                      </p>
                                    </td>
                                    <td width="1" class="no-wrap">
                                      <button
                                        class="btn btn-xs v-white-btn"
                                        @click="
                                          copyToOPDOENHOA(
                                            HistoryOfAllergie.HistoryOfAllergies
                                          )
                                        "
                                      >
                                        Copy
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </template>
                          </vue-scrolling-table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12" v-if="MASTERDATA['OPDOENHPI']">
                      <div class="form-group bg-gray-2">
                        <label
                          >{{ __label(MASTERDATA["OPDOENHPI"]) }}
                          <i class="unit-label">{{
                            MASTERDATA["OPDOENHPI"].Note
                          }}</i></label
                        >
                        <div
                          :data="item"
                          :key="index"
                          v-for="(item, index) in MASTERDATA['OPDOENHPI'].Items"
                        >
                          <textarea-autosize
                            :data-code="item.Code"
                            :id="item.Code"
                            :data="item"
                            class="form-control"
                            rows="3"
                            :placeholder="__label(item)"
                            v-model="item.Value"
                          />
                        </div>
                        <div
                          class="HistoryOfPresentIllness"
                          v-if="
                            SyncHistoryOfPresentIllness &&
                            SyncHistoryOfPresentIllness.length
                          "
                        >
                          <label> {{ __t("Thông tin khai thác bệnh sử") }}</label>
                          <vue-scrolling-table
                            v-if="SyncHistoryOfPresentIllness.length"
                          >
                            <template slot="tbl">
                              <table class="table table-bordered table-bordered-x">
                                <thead>
                                  <tr>
                                    <th width="130" class="no-wrap">
                                      {{ __t("Ngày khám") }}
                                    </th>
                                    <th width="1" class="no-wrap">
                                      {{ __t("Bác sĩ khám") }}
                                    </th>
                                    <th width="1" class="no-wrap">
                                      {{ __t("Khoa-pknt") }}
                                    </th>
                                    <th>{{ __t("Bệnh sử-pknt") }}</th>
                                    <th width="1"></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    :data="HistoryOfPresent"
                                    :key="index"
                                    v-for="(
                                      HistoryOfPresent, index
                                    ) in SyncHistoryOfPresentIllness"
                                  >
                                    <td class="no-wrap">
                                      {{ HistoryOfPresent.ExaminationTime }}
                                    </td>
                                    <td class="no-wrap">
                                      <ad-Info
                                        :ad="HistoryOfPresent.Username"
                                        :type="HistoryOfPresent.Type"
                                      />
                                    </td>
                                    <td class="no-wrap">
                                      {{ __label(HistoryOfPresent) }}
                                    </td>
                                    <td>
                                      <p v-if="HistoryOfPresent.HistoryOfPresentIllness">{{ HistoryOfPresent.HistoryOfPresentIllness }}</p>
                                      <!-- <p
                                        v-if="
                                          HistoryOfPresent.HistoryOfPresentIllness
                                        "
                                      >
                                        {{HistoryOfPresent.HistoryOfPresentIllness}}
                                      </p> -->
                                    </td>
                                    <td width="1" class="no-wrap">
                                      <button
                                        class="btn btn-xs v-white-btn"
                                        @click="
                                          copyToOPDOENHPI(
                                            HistoryOfPresent.HistoryOfPresentIllness
                                          )
                                        "
                                      >
                                        Copy
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </template>
                          </vue-scrolling-table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box box-table">
                <div class="box-body">
                  <label v-if="VisitVersion >= 12">
                    {{ __t("Khai thác thông tin thuốc đang dùng tại nhà (nếu có)") }}
                  </label>
                  <label v-else>
                    {{ __t("Khai thác thông tin thuốc đã dùng tại nhà (nếu có)") }}
                  </label>
                  <template v-if="(DataSubmit.Version >= 2 && VisitVersion >= 10) && MASTERDATA['OPDOENVH600']">
                    <MDRadio id="OPDOENVH600" v-model="MASTERDATA['OPDOENVH600']"/>
                    <list-of-current-medications
                      v-show="MASTERDATA['OPDOENVH600'].Items[1].Value"
                      class="mt-10"
                      ref="ListOfCurrentMedications"
                      :Type="'OPD-PatientMedicationList'"
                      :VisitTypeGroupCode="'OPD'"
                      :ShowDelete="true"
                    />
                  </template>
                  <template v-else>
                    <list-of-current-medications
                      ref="ListOfCurrentMedications"
                      :Type="'OPD-PatientMedicationList'"
                      :VisitTypeGroupCode="'OPD'"
                      :ShowDelete="true"
                    />
                  </template>
                </div>
              </div>
              <!-- <div v-if="hasRole('TESTER') || this.$store.state.account.Username === 'hunglq25'">
                <p>Test hien thi theo setup:</p>
                <v-select v-model="fakeClinic" :options="ClinicSetupOptions" :multiple="true"/>
              </div> -->
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
                                <div class="form-group">
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
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0011']"
                              v-model="MASTERDATA['OPDOENTK0011']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0002']"
                              v-model="MASTERDATA['OPDOENTK0002']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0007']"
                              v-model="MASTERDATA['OPDOENTK0007']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0014']"
                              v-model="MASTERDATA['OPDOENTK0014']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0013']"
                              v-model="MASTERDATA['OPDOENTK0013']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0006']"
                              v-model="MASTERDATA['OPDOENTK0006']"
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
                              v-if="MASTERDATA['OPDOEN514']"
                              v-model="MASTERDATA['OPDOEN514']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOEN516']"
                              v-model="MASTERDATA['OPDOEN516']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0009']"
                              v-model="MASTERDATA['OPDOENTK0009']"
                            />
                          </template>
                          <!-- kham tre em -->
                          <template v-else-if="MASTERDATA['OPDOENYTD'].Items[1].Value && !MASTERDATA['OPDOENYTD'].Items[2].Value && !MASTERDATA['OPDOENYTD'].Items[3].Value">
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
                          </template>
                          <!-- kham bai nao -->
                          <template v-else-if="MASTERDATA['OPDOENYTD'].Items[3].Value && !MASTERDATA['OPDOENYTD'].Items[2].Value && !MASTERDATA['OPDOENYTD'].Items[1].Value">
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0001']"
                              v-model="MASTERDATA['OPDOENTK0001']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0002']"
                              v-model="MASTERDATA['OPDOENTK0002']"
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
                              v-if="MASTERDATA['OPDOENTK0020']"
                              v-model="MASTERDATA['OPDOENTK0020']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0023']"
                              v-model="MASTERDATA['OPDOENTK0023']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0024']"
                              v-model="MASTERDATA['OPDOENTK0024']"
                            />
                          </template>
                          <template v-else>
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0001'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[3].Value)"
                              v-model="MASTERDATA['OPDOENTK0001']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0002'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value || MASTERDATA['OPDOENYTD'].Items[3].Value)"
                              v-model="MASTERDATA['OPDOENTK0002']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0003'] && MASTERDATA['OPDOENYTD'].Items[1].Value"
                              v-model="MASTERDATA['OPDOENTK0003']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0004'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value)"
                              v-model="MASTERDATA['OPDOENTK0004']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0005'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value)"
                              v-model="MASTERDATA['OPDOENTK0005']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0006'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value)"
                              v-model="MASTERDATA['OPDOENTK0006']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0007'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value)"
                              v-model="MASTERDATA['OPDOENTK0007']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0008'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[3].Value)"
                              v-model="MASTERDATA['OPDOENTK0008']"
                            />
                            <md-input-text
                              v-if="MASTERDATA['OPDOENTK0009'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value || MASTERDATA['OPDOENYTD'].Items[3].Value)"
                              v-model="MASTERDATA['OPDOENTK0009']"
                            />
                            <template v-if="MASTERDATA['OPDOENYTD'].Items[2].Value">
                              <template>
                                <md-input-text
                                  v-if="MASTERDATA['OPDOENTK0011']"
                                  v-model="MASTERDATA['OPDOENTK0011']"
                                />
                                <md-input-text
                                  v-if="MASTERDATA['OPDOENTK0014']"
                                  v-model="MASTERDATA['OPDOENTK0014']"
                                />
                                <md-input-text
                                  v-if="MASTERDATA['OPDOENTK0013']"
                                  v-model="MASTERDATA['OPDOENTK0013']"
                                />
                                <md-input-text
                                  v-if="MASTERDATA['OPDOEN514']"
                                  v-model="MASTERDATA['OPDOEN514']"
                                />
                                <md-input-text
                                  v-if="MASTERDATA['OPDOEN516']"
                                  v-model="MASTERDATA['OPDOEN516']"
                                />
                              </template>
                            </template>
                            <template v-if="MASTERDATA['OPDOENYTD'].Items[3].Value">
                              <template>
                                <md-input-text
                                  v-if="MASTERDATA['OPDOENTK0020']"
                                  v-model="MASTERDATA['OPDOENTK0020']"
                                />
                                <md-input-text
                                  v-if="MASTERDATA['OPDOENTK0023']"
                                  v-model="MASTERDATA['OPDOENTK0023']"
                                />
                                <md-input-text
                                  v-if="MASTERDATA['OPDOENTK0024']"
                                  v-model="MASTERDATA['OPDOENTK0024']"
                                />
                              </template>
                            </template>
                          </template>
                        </template>
                        <div
                          class="row"
                          v-if="
                            MASTERDATA['OPDOENNLHTE'] &&
                            showWithClinic(MASTERDATA['OPDOENNLHTE'].Clinic)
                          "
                        >
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
                            showWithClinic('FreeTextOnly-001,FreeTextOnly-005,MultiSelect-001,RadioYesNo-001')
                          "
                          v-model="MASTERDATA['OPDOENKTT']"
                        />
                        <md-input-text
                          :defaultLib="'GENTCTBL2'"
                          v-if="MASTERDATA['OPDOENKCK'] &&
                          showWithClinic('FreeTextOnly-001,FreeTextOnly-005,MultiSelect-001,RadioYesNo-001')"
                          v-model="MASTERDATA['OPDOENKCK']"
                        />
                        <md-input-text
                          :groupDefaultLib="'GENTVKBBCAEX'"
                          v-if="MASTERDATA['OPDOENKTP1'] && this.checkShowOPDOENKTP1()"
                          v-model="MASTERDATA['OPDOENKTP1']"
                        />
                        <md-input-text
                          :groupDefaultLib="'GENTVKBBOTOE'"
                          v-if="
                            MASTERDATA['OPDOENKCBPK'] &&
                            showWithClinic('FreeTextOnly-001,FreeTextOnly-005,MultiSelect-001,RadioYesNo-001')"
                          v-model="MASTERDATA['OPDOENKCBPK']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTSKN'] && showWithClinic(MASTERDATA['OPDOENTSKN'].Clinic) && !showWithClinic('FreeTextOnly-000')"
                          v-model="MASTERDATA['OPDOENTSKN']"
                        />
                        <md-input-text
                          v-if="MASTERDATA['OPDOENTSK'] && showWithClinic(MASTERDATA['OPDOENTSK'].Clinic) && !showWithClinic('FreeTextOnly-000')"
                          v-model="MASTERDATA['OPDOENTSK']"
                        />
                        <md-input-text
                          v-if="
                            MASTERDATA['OPDOEN526'] &&
                            showWithClinic('FreeTextOnly-002')
                          "
                          v-model="MASTERDATA['OPDOEN526']"
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
                        />
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
                          />
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
                    <!-- end khams laam sangf -->
                  </div>
                  <md-input-text
                    v-if="MASTERDATA['OPDOENCEF'] && (!DataSubmit.IsTelehealth && (showWithClinic('Normal') || onlyClinic('FreeTextOnly-000')))"
                    v-model="MASTERDATA['OPDOENCEF']"
                  />
                  <md-input-text
                    v-if="MASTERDATA['OPDOENSDBP'] && DataSubmit.IsTelehealth"
                    v-model="MASTERDATA['OPDOENSDBP']"
                  />
                  <template v-if="!isVaccine()">
                  <label>{{__label(MASTERDATA['OPDOENID0'])}}</label>
                  <icd10 id="OPDOENICD0101" v-if="MASTERDATA['OPDOENICD01']" @icdChange="icdChange" :mdCode="'OPDOENICD0101'" :single="true" v-model="MASTERDATA['OPDOENICD01'].Items[0].Value" class="mrb10"/>
                  <md-input-text
                    :hidelabel="true"
                    v-if="MASTERDATA['OPDOENID0']"
                    v-model="MASTERDATA['OPDOENID0']"
                  />
                  </template>
                  <PathWay v-if="MASTERDATA['OPDOENID0']" :MainDisease="MASTERDATA['OPDOENICD01'].Items[0].Value"/>
                  <div class="row">
                    <div class="col-md-12" v-if="MASTERDATA['OPDOENPT0']">
                      <div class="form-group">
                        <label
                          >{{ __label(MASTERDATA["OPDOENPT0"]) }}
                          <i class="unit-label">{{
                            MASTERDATA["OPDOENPT0"].Note
                          }}</i>
                          <button
                            class="btn btn-sync-data"
                            @click="autoLoadOPDOENPT0(true)"
                          >
                            {{ __t("Lấy kết quả mới nhất") }}
                          </button>
                        </label>
                        <div
                          :data="item"
                          :key="index"
                          v-for="(item, index) in MASTERDATA['OPDOENPT0'].Items"
                        >
                          <div v-if="item.IsReadOnly">
                            <diorpt
                              :dataJson="item.Value"
                              v-model="item.Value"
                              @copy="copyToOPDOENPT0"
                            />
                          </div>
                          <p v-if="item.IsReadOnly" class="note-text text-right">
                            <template v-if="syncOPDOENPT0At"
                              ><label class="label label-warning"
                                ><i
                                  aria-hidden="true"
                                  class="fa fa-check v-green"
                                ></i>
                                {{ __t("Đồng bộ lần cuối lúc") }}:
                                {{
                                  syncOPDOENPT0At
                                    | formatDateTime("HH:mm:ss DD/MM/YYYY")
                                }}</label
                              ></template
                            ><template v-else
                              ><label class="label label-warning"
                                ><i
                                  aria-hidden="true"
                                  class="fa fa-spin fa-loading v-green"
                                ></i
                                >{{ __t("Đang tải...") }}</label
                              ></template
                            >
                          </p>
                          <textarea-autosize
                            v-else
                            :data-code="item.Code"
                            :id="item.Code"
                            :data="item"
                            class="form-control"
                            rows="3"
                            :placeholder="__label(item)"
                            v-model="item.Value"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <template v-if="!isEHOS()">
                    <ProblemList @copy="copyToOPDOENICD" />
                    <br />
                  </template>
                  <div class="row">
                    <div class="col-md-12" v-if="MASTERDATA['OPDOENDD0']">
                      <div class="form-group">
                        <label
                          >{{ __label(MASTERDATA["OPDOENDD0"]) }}
                          <i class="unit-label">{{
                            MASTERDATA["OPDOENDD0"].Note
                          }}</i></label
                        >
                        <icd10 id="OPDOENICDANS" v-if="MASTERDATA['OPDOENICD']" @icdChange="icdChange" :mdCode="'OPDOENICDANS'" :single="true" v-model="MASTERDATA['OPDOENICD'].Items[0].Value" class="mrb10"/>
                        <div
                          :data="item"
                          :key="index"
                          v-for="(item, index) in MASTERDATA['OPDOENDD0'].Items"
                        >
                          <template v-if="isEHOS()">
                            <p
                              class="margin-bottom-10 label-text"
                              v-if="item.DataType === 'Text'"
                              :data="item"
                              :key="index"
                            >
                              {{ item.Value || noDataMsg() }}
                            </p>
                          </template>
                          <textarea-autosize
                            v-else
                            :data-code="item.Code"
                            :id="item.Code"
                            :data="item"
                            class="form-control"
                            rows="3"
                            :placeholder="__label(item)"
                            v-model="item.Value"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <label v-if="MASTERDATA['OPDOENICD']">{{__label(MASTERDATA['OPDOENICD'].Items[1])}}</label>
                  <icd10 id="OPDOENICDOPT" v-if="MASTERDATA['OPDOENICD']" @icdChange="icdChange" :mdCode="'OPDOENICDOPT'" v-model="MASTERDATA['OPDOENICD'].Items[1].Value" class="mrb10"/>
                </div>
              </div>
              <!-- Đã xử lý thuốc -->
              <div class="box box-table" v-if="VisitVersion >= 12">
                <div class="box-body">
                  <label>
                    {{__label(MASTERDATA['OPDOENPT610'])}}
                  </label>
                  <template v-if="VisitVersion >= 12 && MASTERDATA['OPDOENPT610']">
                    <div class="d-flex flex-center">
                      <div style="flex-grow: 1">
                        <div class="d-flex" style="flex-grow: 1;">
                          <span>
                            <MDRadio id="OPDOENPT610" v-model="MASTERDATA['OPDOENPT610']"/>
                          </span>
                          <textarea-autosize style="line-height: 27px;"  class="form-control" :placeholder="__t('Nhập')" :code="MASTERDATA['OPDOENPT610'].Items[2].Code" v-model="MASTERDATA['OPDOENPT610'].Items[2].Value" v-if="MASTERDATA['OPDOENPT610'].Items[1].Value === true"/>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <!-- End đã xử lý thuốc -->
              <div class="tbl-title">2. {{ __t("Điều trị") }}</div>
              <div class="box box-table">
                <div class="box-body">
                  <md-input-text
                    v-if="MASTERDATA['OPDOENTP0']"
                    v-model="MASTERDATA['OPDOENTP0']"
                  />
                  <md-input-text
                    v-if="MASTERDATA['OPDOENRFU']"
                    v-model="MASTERDATA['OPDOENRFU']"
                    :defaultLib="'GENRELI'"
                  />
                  <div class="row">
                    <div class="col-md-4" v-if="MASTERDATA['OPDOENDOR']">
                      <div class="form-group">
                        <label
                          >{{ __label(MASTERDATA["OPDOENDOR"]) }}
                          <i class="unit-label">{{
                            MASTERDATA["OPDOENDOR"].Note
                          }}</i></label
                        >
                        <div
                          :data="item"
                          :key="index"
                          v-for="(item, index) in MASTERDATA['OPDOENDOR'].Items">
                          <VDateTimePicker5 class="full-w" :id="item.Code" :allday="'allday'" v-model="item.Value" :format="vDateFormat" :showshortcuts="true" :type="'date'"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Tình trạng người bệnh ra viện -->
                  <div class="row" v-if="VisitVersion >= 12">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label>
                          {{__label(MASTERDATA['OPDOENPT614'])}}
                        </label>
                        <template v-if="VisitVersion >= 12 && MASTERDATA['OPDOENPT614']">
                          <div class="d-flex flex-center">
                            <div style="flex-grow: 1">
                              <div class="d-flex" style="flex-grow: 1;">
                                <span>
                                  <MDRadio id="OPDOENPT614" v-model="MASTERDATA['OPDOENPT614']"/>
                                </span>
                              </div>
                              <textarea-autosize style="line-height: 27px; margin: 5px;"  class="form-control" :placeholder="__t('Nhập')" :code="MASTERDATA['OPDOENPT614'].Items[5].Code" v-model="MASTERDATA['OPDOENPT614'].Items[5].Value" v-if="MASTERDATA['OPDOENPT614'].Items[4].Value === true"/>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="DataSubmit.Status && DataSubmit.Status.Code === 'OPDAM'">
                <div class="tbl-title">{{ __t("Nhập nội trú") }}</div>
                <div class="box box-table">
                  <div class="box-body">
                    <md-input-text
                      v-if="MASTERDATA['OPDOENRFT'] && IsUseHandOverCheckList"
                      v-model="MASTERDATA['OPDOENRFT']"
                    />
                    <md-input-text
                      v-if="MASTERDATA['OPDOENFP1'] && IsUseHandOverCheckList"
                      v-model="MASTERDATA['OPDOENFP1']"
                    />
                    <md-input-text
                      v-if="MASTERDATA['OPDOENPS1'] && IsUseHandOverCheckList"
                      v-model="MASTERDATA['OPDOENPS1']"
                    />
                    <div class="row">
                      <div class="col-md-12" v-if="MASTERDATA['OPDOENREC']">
                        <div class="form-group">
                          <label
                            >{{ __label(MASTERDATA["OPDOENREC"]) }}
                            <i class="unit-label">{{
                              MASTERDATA["OPDOENREC"].Note
                            }}</i></label
                          >
                          <div
                            :data="item"
                            :key="index"
                            v-for="(item, index) in MASTERDATA['OPDOENREC'].Items"
                          >
                            <v-select-box
                              :search="true"
                              class="full-w select-boox-full-w"
                              v-model="item.Value"
                              :items="getMDSPECIALITIESS"
                              :id="item.Code"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-2 mt-10" style="display: flex;">
                      <input :readonly="IsReadOnLy"  type="checkbox" style="display: inline !important; height: 25px; width: 25px; margin-right: 6px;" v-model="IsUseHandOverCheckList">
                      <b style="display: contents !important; line-height: 2.5;">{{__t('Sử dụng biên bản bàn giao NB')}}</b>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="DataSubmit.Status && DataSubmit.Status.Code === 'OPDTTE'">
                <div class="tbl-title">{{ __t("Nhập cấp cứu") }}</div>
                <div class="box box-table">
                  <div class="box-body">
                    <md-input-text
                      v-if="MASTERDATA['OPDOENRFT2'] && IsUseHandOverCheckList"
                      v-model="MASTERDATA['OPDOENRFT2']"
                    />
                    <md-input-text
                      v-if="MASTERDATA['OPDOENFP2'] && IsUseHandOverCheckList"
                      v-model="MASTERDATA['OPDOENFP2']"
                    />
                    <md-input-text
                      v-if="MASTERDATA['OPDOENPS2'] && IsUseHandOverCheckList"
                      v-model="MASTERDATA['OPDOENPS2']"
                    />
                    <div class="row">
                      <div class="col-md-12" v-if="MASTERDATA['OPDOENREC2']">
                        <div class="form-group">
                          <label
                            >{{ __label(MASTERDATA["OPDOENREC2"]) }}
                            <i class="unit-label">{{
                              MASTERDATA["OPDOENREC2"].Note
                            }}</i></label
                          >
                          <div
                            :data="item"
                            :key="index"
                            v-for="(item, index) in MASTERDATA['OPDOENREC2'].Items"
                          >
                            <v-select-box
                              :search="true"
                              class="full-w select-boox-full-w"
                              v-model="item.Value"
                              :items="getMDSPECIALITIESS"
                              :id="item.Code"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-2 mt-10" style="display: flex;">
                      <input :readonly="IsReadOnLy" type="checkbox" style="display: inline !important; height: 25px; width: 25px; margin-right: 6px;" v-model="IsUseHandOverCheckList">
                      <b style="display: contents !important; line-height: 2.5;">{{__t('Sử dụng biên bản bàn giao NB')}}</b>
                    </div>
                  </div>
                </div>
              </div>
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
                              v-for="(item, index) in MASTERDATA['OPDOENRFT1']
                                .Items"
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
              <OutpatientExaminationNoteInfo
                :DataSubmit="DataSubmit"
                :allowEdit="isPrimaryDoctor"
              />
              <Endoscopyyyyyyy
                v-if="MASTERDATA['OPDOENTFEOC'] && DataSubmit && DataSubmit.EOCInfo"
                v-model="MASTERDATA['OPDOENTFEOC']"
                :EOCInfo="DataSubmit.EOCInfo"
              />
              <div class="box box-table" style="padding:10px" v-if="MASTERDATA['OPDOENXNBT']">
                <div class="text-bold">
                {{ __label(MASTERDATA["OPDOENXNBT"]) }}:
              </div>
              <div>
                <MDRadio
                v-if="MASTERDATA['OPDOENXNBT']"
                v-model="MASTERDATA['OPDOENXNBT']"
              />
              </div>
              </div>
              <div class="form-group" v-if="DataSubmit && DataSubmit.Status && DataSubmit.Status.Code === 'OPDWR'">
                <label>Ngày hẹn trả KQ</label>
                <VDateTimePicker3 id="AppointmentDateResult" :min="DataSubmit.ExaminationTime" v-model="DataSubmit.AppointmentDateResult" class="select-boox" :format="vDateTimeFormat"/>
              </div>
            </div>
          </template>
          <div v-else>
            <p
              style="background-color: #f8c736; padding: 5px"
              v-if="DataSubmit.locked"
            >
              <i aria-hidden="true" class="fa fa-warning"></i> Hồ sơ đã khóa 24h hoặc bạn không có quyền chỉnh sửa
            </p>
            <!-- <h1 class="text-center">{{ __t("general.phieu_kham_ngoai_tru") }}</h1> -->
            <OutpatientExaminationNoteViewOnly
              :VisitId="this.$route.params.Id"
              :DataSubmit="DataSubmit"
              :MASTERDATA="MASTERDATA"
              :VisitVersion="VisitVersion"
            />
          </div>
        </div>
        <!-- <div v-else-if="DataSubmit.IsConsultation === true"> -->
        <div v-if="false">
          <template v-if="isPrimaryDoctorOrAuthorizedDoctor">
            <p
              style="background-color: #f8c736; padding: 5px"
              v-if="DataSubmit.locked"
            >
              <i aria-hidden="true" class="fa fa-warning"></i> Hồ sơ đã khóa 24h hoặc bạn không có quyền chỉnh sửa
            </p>
          <MedicalConsultationForm :readonly="false" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :SyncHistoryOfPresentIllness="SyncHistoryOfPresentIllness"/>
          </template>
          <template v-else>
            <p
              style="background-color: #f8c736; padding: 5px"
              v-if="DataSubmit.locked"
            >
              <i aria-hidden="true" class="fa fa-warning"></i> Hồ sơ đã khóa 24h hoặc bạn không có quyền chỉnh sửa
            </p>
            <MedicalConsultationFormView :readonly="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :SyncHistoryOfPresentIllness="SyncHistoryOfPresentIllness"/>
          </template>
        </div>
        <p v-if="DataSubmit && isPrimaryDoctorOrAuthorizedDoctor && VisitVersion >= 12">A01_251_221222_V</p>
        <p v-if="DataSubmit && isPrimaryDoctorOrAuthorizedDoctor">{{__t('Chỉnh sửa lần cuối bởi')}} <ad-info :ad="DataSubmit.UpdatedBy || DataSubmit.CreatedBy" /> {{__t('lúc')}} {{getFTime(DataSubmit.UpdatedAt) || getFTime(DataSubmit.CreatedAt)}}</p>
    </template>
    <template v-else>
      <div class="text-center">
        <h4 v-if="DataSubmit.IsTelehealth">{{__t('Chưa có phiếu khám Telehealth')}}</h4>
        <h4 v-else>{{__t('Chưa có phiếu khám ngoại trú')}}</h4>
        <button
          class="btn btn-green"
          type="button"
          @click="DataSubmit.IsConsultation !== false && setConsultation(false)"
        >
          {{ __t("customer.btn_tao_moi") }} <i v-if="DataSubmit.IsConsultation === false" aria-hidden="true" class="fa fa-check"></i>
        </button>
      </div>
    </template>
    <FloatBlock v-if="isPrimaryDoctorOrAuthorizedDoctor && DataSubmit.IsConsultation === false" :openBack="true" @handleBack="handleBack">
      <template slot="top">
        <TranferMsg :data="DataSubmit.visit_transfer" />
        <div class="group-radio" :class="{readonly: DataSubmit.visit_transfer, 'only-wr': onlyWr}" v-if="DataSubmit.ListStatus">
          <div v-for="(status, index) in DataSubmit.ListStatus.filter(e => !this.DataSubmit.IsConsultation || (!['OPDAM', 'OPDTTE'].includes(e.Code)))" :key="index">
            <input :data="status" type="radio" :id="'a' + index" name="status" :value="status" v-model="DataSubmit.Status"/>
            <label :class="'status-' + status.Code" :id="'status-' + status.Id" :key="'a' + index" :for="'a' + index">
              {{ __label(status) }}
            </label>
          </div>
        </div>
      </template>
      <template slot="buttons">
        <div class="col-md-3"></div>
        <div class="col-md-3">
          <div class="form-group1">
            <button
              class="btn btn-block v-white-btn"
              type="button"
              @click="
                $router.push({
                  name: 'OPDMedicalReport',
                  params: { Id: $route.params.Id },
                })
              "
            >
              <i class="fa fa-file-o" aria-hidden="true"></i>
              {{ __t("Báo cáo y tế") }}
            </button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group1">
            <button
              v-if="
                DataSubmit.Status &&
                DataSubmit.Status.Code=== 'OPDNE'
              "
              class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
              type="button"
              v-shortkey="['ctrl', 's']"
              @shortkey="noExaminationConfirm()"
              @click="noExaminationConfirm()"
            >
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
              {{ __t("btn.luu") }}
            </button>
            <button
              v-else
              class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
              type="button"
              v-shortkey="['ctrl', 's']"
              @shortkey="submit()"
              @click="submit()"
            >
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
              {{ __t("btn.luu") }}
            </button>
          </div>
        </div>
      </template>
    </FloatBlock>
    <FloatBlock v-else>
      <template slot="buttons">
        <div class="col-md-3"></div>
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="form-group1">
            <button
              class="btn btn-block v-white-btn"
              type="button"
              @click="
                $router.push({
                  name: 'OPDMedicalReport',
                  params: { Id: $route.params.Id },
                })
              "
            >
              <i class="fa fa-file-o" aria-hidden="true"></i>
              {{ __t("Báo cáo y tế") }}
            </button>
          </div>
        </div>
      </template>
    </FloatBlock>
    <div class="mg-bt-120"></div>
  </div>
  <div v-else class="text-center">
    <v-loading/>
  </div>
</template>

<script>
import EIOService from '@/services/IPD/EIOService'
import InitialAssessment from '@/pages/OPD/InitialAssessment/View.vue'
import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/FormOutpatientExaminationNew.js'
import _ from 'lodash'
import TranferMsg from '@/components/TranferMsg.vue'
import Diorpt from '@/components/OPD/DI0RPT.vue'
import ICD10Service from '@/services/ICD10'
import NProgress from 'nprogress'
import Logs from '@/components/Logs.vue'
import VSelectBox from '@/components/VSelect.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import PatientProgressNotes from '@/pages/ProgressNote/PatientProgressNotesView.vue'
import MedicalConsultationFormView from '@/pages/OPD/OutpatientExaminationNote/MedicalConsultationFormView.vue'
import MedicalConsultationForm from '@/pages/OPD/OutpatientExaminationNote/MedicalConsultationForm.vue'
import InfoForm from '@/pages/OPD/OutpatientExaminationNote/Info.vue'
import ProblemList from '@/components/ProblemList.vue'
import StandingOrder from '@/components/OPD/StandingOrder.vue'
import EventBus from '@/lib/eventBus'
import $ from 'jquery'
import storage from '@/lib/storage'
import FloatingMenu from '@/components/FloatingMenu.vue'
import OutpatientExaminationNoteViewOnly from '@/components/OPD/OutpatientExaminationNoteForm.vue'
import Endoscopyyyyyyy from '@/components/EDCInfo.vue'
import OutpatientExaminationNoteInfo from '@/components/OPD/OutpatientExaminationNoteDoctorInfo.vue'
import KLSCODE from './KLSCode.js'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
import VDateTimePicker5 from '@/components/VDateTimePicker5.vue'
import PathWay from '@/components/global/PathWay.vue'
const MODAL_WIDTH = 750
export default {
  name: 'OutpatientExaminationNote-ver2',
  mixins: [MixinMasterData, MixinForm],
  props: ['VisitType'],
  data () {
    return {
      ClinicSetupOptions: [
        {label: 'Sản phụ khoa', code: 'FreeTextOnly-000'},
        {label: 'Nhi/ Vaccine', code: 'FreeTextOnly-005'},
        {label: 'Phục hồi chức năng', code: 'MultiSelect-001'},
        {label: 'Liên chuyên khoa/ Da liễu', code: 'RadioYesNo-001'},
        {label: 'Tâm lý', code: 'MultiSelect-002'},
        {label: 'Chung', code: 'FreeTextOnly-001'},
        {label: 'Dinh dưỡng', code: 'FreeTextOnly-002'}
      ],
      fakeClinic: '',
      checkMessage: 0,
      loaded: false,
      errors: [],
      modalWidth: MODAL_WIDTH,
      MenuItems: [],
      OPDOENPT0Timeout: null,
      CODE1: ['OPDOENKTT'],
      CODE1y: [
        'OPDOENKCBPK',
        'OPDOENBHC',
        'OPDOENKYT',
        'OPDOENKCGTG',
        'OPDOENKTD',
        'OPDOENKCX',
        'OPDOENKHD',
        'OPDOENKCY',
        'OPDOENKTN',
        'OPDOENKTRT',
        'OPDOENTTL'
      ],
      CODE1y_1: ['OPDOENKNKT'],
      CODE1_1: ['OPDOENTSKN', 'OPDOENTSK'],
      CODE2Adults: [
        // 'OPDOENBHC', 'OPDOENKYT', 'OPDOENKCGTG', 'OPDOENKTD', 'OPDOENKCX', 'OPDOENKHD',
        // 'OPDOENKCY', 'OPDOENKTN', 'OPDOENKTRT', 'OPDOENTTL'
      ],
      CODE2Child: [
        'OPDOENNGNG',
        'OPDOENNTTTXH',
        'OPDOENHVTTCY',
        'OPDOENCGXG',
        'OPDOENKTTPV',
        'OPDOENMSTTLCT'
      ],
      CODE3: ['OPDOENKTTTHGC', 'OPDOENDGCGNM', 'OPDOENDGDNM', 'OPDOENKLN'],
      CODE4: ['OPDOENKTM', 'OPDOENKHH'],
      OPDOENDG: [
        'OPDOENMCN',
        'OPDOENDCT',
        'OPDOENTDTT',
        'OPDOENTHCVD',
        'OPDOENPHCN'
      ],
      OPDOENDG1: ['OPDOENCNHH', 'OPDOENSCD', 'OPDOENKNGS', 'OPDOENTDNT'],
      OPDOENDG2: [
        'OPDOENKNGT',
        'OPDOENTTRLN',
        'OPDOENNTKG',
        'OPDOENDVTH',
        'OPDOENDCDL'
      ],
      CODE5: [
        'OPDOENCCQK',
        'OPDOENKTMH',
        'OPDOENKDD',
        'OPDOENTC',
        'OPDOENPTVD',
        'OPDOENPTTT'
      ],
      OPDOENTSSK: ['OPDOENTSSK', 'OPDOENTSKN', 'OPDOENTSK'],
      DataSubmit: null,
      options: [],
      pId: null,
      message: null,
      isErrorPop: false,
      SyncHistoryOfPresentIllness: null,
      HistoryOfAllergies: null,
      InitialAssessmentAllergies: null,
      SyncPastMedicalHistory: null,
      AdmittedCode: ['OPDOENRFT', 'OPDOENFP1', 'OPDOENPS1', 'OPDOENREC'],
      TransferToEDCode: ['OPDOENRFT2', 'OPDOENFP2', 'OPDOENPS2', 'OPDOENREC2'],
      InterHospitalTransferCode: [
        'OPDOENRH1',
        'OPDOENRFT3',
        'OPDOENTOT',
        'OPDOENSBC',
        'OPDOENTM1',
        'OPDOENME0',
        'OPDOENDU0',
        'OPDOENPSA'
      ],
      UpstreamDownstreamTransfer: [
        'OPDOENRH0',
        'OPDOENMTU',
        'OPDOENPS0',
        'OPDOENRFT1',
        'OPDOENTM0',
        'OPDOENNTM'
      ],
      isFirst: true,
      syncIcdInterval: null,
      syncIcdAt: null,
      syncOPDOENPT0At: null,
      OPDOENTUCO_TMP: [],
      MDITEMINFO: {},
      rawData: {},
      defaultData: {
        'xx': 12
      },
      IsUseHandOverCheckList: true,
      IsAcceptPhysician: false,
      IsAcceptNurse: false,
      IsReadOnLy: false,
      dataMaster: null,
      VisitVersion: null,
      SyncFamilyMedicalHistory: null
    }
  },
  components: {
    InitialAssessment,
    VDateTimePicker,
    Diorpt,
    VSelectBox,
    ListOfCurrentMedications,
    Logs,
    PatientProgressNotes,
    StandingOrder,
    FloatingMenu,
    OutpatientExaminationNoteViewOnly,
    OutpatientExaminationNoteInfo,
    TranferMsg,
    ProblemList,
    Endoscopyyyyyyy,
    MedicalConsultationForm,
    InfoForm,
    MedicalConsultationFormView,
    VDateTimePicker3,
    VDateTimePicker5,
    PathWay
  },
  mounted () {
    console.log(this.MedicalRecordFormCode, 'check form code:')
    this.getVisitVersion()
    this.getSpecialities()
    this.loadDoctorRecommenWithIcd10()
    this.getMasterDatas({ Form: 'OPDOEN' }, () => {
      this.getData()
    })
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
    EventBus.$on('ICDUPDATED', this.updateIcd)
    new ICD10Service({ search: 'a' })
      .create({ search: 'a', pageSize: 25 })
      .then((res) => {
        this.options = res.map((e) => {
          return {
            code: e.Code,
            label: e.Code + ', ' + e.ViName
          }
        })
      })
  },
  watch: {
    fakeClinic: {
      handler () {
        if (this.fakeClinic && this.DataSubmit && this.loaded) {
          this.DataSubmit.SetupClinic = this.fakeClinic.map(e => {
            return e.code
          })
          console.log(this.DataSubmit.SetupClinic)
        }
      },
      deep: true
    }
  },
  computed: {
    onlyWr () {
      return (
        this.MASTERDATA['OPDOENTFEOC'] &&
        this.MASTERDATA['OPDOENTFEOC'].Items.find((e) => e.Value) &&
        !this.DataSubmit.EOCInfo.IsDone
      )
    },
    isPrimaryDoctorOrAuthorizedDoctor: function () {
      if (this.$store.state.account.Username === 'hunglq25' || this.getUser() === 'haulv4' || this.getUser() === 'tungpa1') {
        return true
      }
      var currentUser = this.$store.state.account.Username
      if (this.ImSuperAdmin()) return true
      if (this.DataSubmit.locked) return false
      if (
        this.DataSubmit.PrimaryDoctor &&
        this.DataSubmit.PrimaryDoctor.Username === currentUser
      ) { return true }
      if (
        this.DataSubmit.AuthorizedDoctor &&
        this.DataSubmit.AuthorizedDoctor.Username === currentUser
      ) { return true }

      return false
    },
    isPrimaryDoctor: function () {
      if (this.ImSuperAdmin()) return true
      var currentUser = this.$store.state.account.Username
      if (
        this.DataSubmit.PrimaryDoctor &&
        this.DataSubmit.PrimaryDoctor.Username === currentUser
      ) { return true }
      return false
    },
    hasShowDe: function () {
      return this.MASTERDATA['OPDOENTUCO'].Items.find((e) => e.Value)
    },
    OPDOENBMIlabel: function () {
      if (this.MASTERDATA['OPDOENTUOI'].Items[0].Value) {
        return 'BMI'
      }
      if (this.MASTERDATA['OPDOENTUOI'].Items[1].Value) {
        return 'BMI theo Z-score'
      }
      if (this.MASTERDATA['OPDOENTUOI'].Items[2].Value) {
        return 'Z-score theo cân nặng/tuổi, chiều/tuổi,cân nặng/chiều cao theo tuổi và giới'
      }
      return 'BMI'
    },
    OPDOENBMICalculation: function () {
      if (this.MASTERDATA['OPDOENTUOI'].Items[0].Value) {
        var weight = this.MASTERDATA['OPDOENWEI'].Items[0].Value
          ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value)
          : 0
        var height = this.MASTERDATA['OPDOENHEI'].Items[0].Value
          ? parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100
          : 0
        return (weight / (height * height)).toFixed(2)
      } else {
        return this.MASTERDATA['OPDOENBMI'].Items[0].Value
      }
    },
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDOENWEI'].Items[0].Value
        ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value)
        : 0
      var height = this.MASTERDATA['OPDOENHEI'].Items[0].Value
        ? parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100
        : 0
      return (weight / (height * height)).toFixed(2)
    },
    getMDSPECIALITIESS: function () {
      // if (this.MASTERDATA['OPDOENREC'].Items[0].Value) {
      //   return this.MDSPECIALITIES.map(e => {
      //     return e
      //   })
      // }
      var status = ''
      if (this.DataSubmit.Status) {
        status = this.DataSubmit.Status.Code === 'OPDAM' ? 'IPD' : 'ED'
      }
      return (this.getSpecialitiesInCurrentSite() || []).filter((e) => {
        return e.VisitTypeGroup === status
      })
    },
    number: function () {
      let num = ''
      if (this.MASTERDATA['OPDOEN663'] && this.MASTERDATA['OPDOEN665'] && this.MASTERDATA['OPDOEN667']) {
        if (this.MASTERDATA['OPDOEN663'].Items[0].Value && this.MASTERDATA['OPDOEN665'].Items[0].Value && this.MASTERDATA['OPDOEN667'].Items[0].Value) {
          num = '123'
        }
        if (this.MASTERDATA['OPDOEN663'].Items[0].Value && this.MASTERDATA['OPDOEN665'].Items[0].Value && !this.MASTERDATA['OPDOEN667'].Items[0].Value) {
          num = '12'
        }
        if (this.MASTERDATA['OPDOEN663'].Items[0].Value && !this.MASTERDATA['OPDOEN665'].Items[0].Value && this.MASTERDATA['OPDOEN667'].Items[0].Value) {
          num = '13'
        }
        if (!this.MASTERDATA['OPDOEN663'].Items[0].Value && this.MASTERDATA['OPDOEN665'].Items[0].Value && this.MASTERDATA['OPDOEN667'].Items[0].Value) {
          num = '23'
        }
        if (this.MASTERDATA['OPDOEN663'].Items[0].Value && !this.MASTERDATA['OPDOEN665'].Items[0].Value && !this.MASTERDATA['OPDOEN667'].Items[0].Value) {
          num = '1'
        }
        if (!this.MASTERDATA['OPDOEN663'].Items[0].Value && this.MASTERDATA['OPDOEN665'].Items[0].Value && !this.MASTERDATA['OPDOEN667'].Items[0].Value) {
          num = '2'
        }
        if (!this.MASTERDATA['OPDOEN663'].Items[0].Value && !this.MASTERDATA['OPDOEN665'].Items[0].Value && this.MASTERDATA['OPDOEN667'].Items[0].Value) {
          num = '3'
        }
      }
      return num
    },
    // ver 4
    typeForm () {
      return this.MedicalRecordFormCode
    }
  },
  methods: {
    handleClearData () {
      if (!this.MASTERDATA['OPDOENPT603'].Items[0].Value && this.VisitVersion >= 12) {
        this.resetMdData('OPDOENPT606')
      }
    },
    getVisitVersion () {
      new EIOService().find('EMRForm/GetVersionByVisit/' + this._VisitId + '/' + this._VisitType).then(response => {
        this.VisitVersion = response.Version
      }).catch((e) => {
        console.log(e)
      })
    },
    setForm () {
      if (this.$route.name === 'OutpatientExaminationNote') {
        new OutpatientExaminationNote({IsConsultation: 'false'})
          .update('SetConsultation/' + this.$route.params.Id)
          .then(() => {
          })
      }
    },
    pushRoute () {
      this.$router.push({name: 'CustomerOPDInfo', params: {Id: this.$route.params.Id, Check: true}})
    },
    popUpWarning (message) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t(message),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng bộ'),
            class: 'btn btn-warning',
            handler: () => {
              // this.pushRoute()
              this.$modal.hide('dialog')
              // var check = 0
              if (message === 'Vui lòng đồng bộ PID của NB!') {
                this.checkMessage = 1
              } else if (message === 'Vui lòng đồng bộ lượt tiếp nhận của NB!') {
                this.checkMessage = 2
              } else {
                this.checkMessage = 3
              }
              this.$router.push({
                name: 'CustomerOPDInfo',
                params: {Id: this.$route.params.Id, Check: this.checkMessage}
              })
            }
          },
          {
            title: this.__t('Quay lại'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    setConsultation (type) {
      console.log('isTelehealth', this.DataSubmit.IsTelehealth)
      this.$modal.show('dialog', {
        title: this.__t(
          'Thông báo'
        ),
        text: this.__t(`Bạn có chắc chắn sử dụng ${(type ? 'phiếu tư vấn' : this.DataSubmit.IsTelehealth ? 'phiếu khám Telehealth' : 'phiếu khám ngoại trú')}`),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi đồng ý'),
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
              new OutpatientExaminationNote({IsConsultation: type ? 'true' : 'false'})
                .update('SetConsultation/' + this.$route.params.Id)
                .then(() => {
                  this.reload()
                })
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    onchangeOPDOENTUCO (item) {
      setTimeout(() => {
        var oldValue = item.Value
        var dataOldValue = oldValue ? oldValue.split(',\n') : []
        var defaultValueSelected = this.getSelectedValue()
        var newDataValue = dataOldValue.filter((e) => {
          return !this.OPDOENTUCO_TMP.find((ev) => {
            return ev.Data === e
          })
        })
        defaultValueSelected.forEach((d) => {
          if (!newDataValue.includes(d.Data)) {
            newDataValue.push(d.Data)
          }
        })
        item.Value = newDataValue ? newDataValue.join(',\n') : ''
      }, 100)
    },
    getSelectedValue () {
      var data = []
      this.MASTERDATA['OPDOENTUCO'].Items.forEach((item) => {
        var dataItem = item.Data.filter((e) => {
          return (
            !e.Code ||
            (e.Code === 'OPDOENCSMCYES' &&
              this.MASTERDATA['OPDOENCSMC'].Items[0].Value) ||
            (e.Code === 'OPDOENCSMCNOO' &&
              this.MASTERDATA['OPDOENCSMC'].Items[1].Value) ||
            (e.Code === 'OPDOENTRTRYES' &&
              this.MASTERDATA['OPDOENTRTR'].Items[0].Value) ||
            (e.Code === 'OPDOENTRTRNOO' &&
              this.MASTERDATA['OPDOENTRTR'].Items[1].Value) ||
            (e.Code === 'OPDOENBPSDYES' &&
              this.MASTERDATA['OPDOENBPSD'].Items[0].Value) ||
            (e.Code === 'OPDOENBPSDNOO' &&
              this.MASTERDATA['OPDOENBPSD'].Items[1].Value)
          )
        })
        if (item.Value) data = data.concat(dataItem)
      })
      return data
    },
    setDefaultValue (item) {
      // item.Value = item.Data
      if (!item.Data) return false
      var defaultData = this.JSONParse(item.Data) || []
      var input = item.Value
      var inputValue = input ? input.split(',\n') : []
      defaultData.forEach((e) => {
        if (!inputValue.includes(e)) input = (input || '') + ',\n' + e
      })
      input = this.trim_(input, ',\n')
      item.Value = input
    },
    updateIcd (value) {
      var icdSelected = value
        .map((e) => this.DoctorRecommendations[e.code])
        .filter((e) => e)
      this.copyOPDOENRFU(icdSelected)
    },
    setMenuItems () {
      this.MenuItems = [
        {
          ViName: 'Đánh giá chung',
          EnName: 'Đánh giá chung'
        },
        this.MASTERDATA['OPDOENPMH'],
        this.MASTERDATA['OPDOENPT0'],
        this.MASTERDATA['OPDOENDD0'],
        {
          ViName: 'Điều trị',
          EnName: 'Điều trị'
        }
      ]
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
    checkInClinic (codes) {
      if (codes === null || codes === '' || this.DataSubmit.Clinic) {
        return true
      }
      if (this.DataSubmit.Clinic && this.DataSubmit.Clinic.Code) {
        var codess = codes.replace(/\s/g, '').split(',')
        return codess.includes(this.DataSubmit.Clinic.Code)
      }
      return true
    },
    syncGetAction () {
      this.$refs.ListOfCurrentMedications.sync()
    },
    noExaminationConfirm () {
      this.$modal.show('dialog', {
        title: this.__t(
          'Bạn có chắc chắn đây là bệnh nhân không sử dụng dịch vụ khám bệnh.'
        ),
        text: this.__t('Chú ý: Mọi thông tin nhập trên form sẽ bị xóa'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi đồng ý'),
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
              this.resetMdDataValue()
              this.submit()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    submit () {
      console.log('this.DataSubmit.Status', this.DataSubmit.Status)
      if (this.MASTERDATA['OPDOEN661'] && this.MASTERDATA['OPDOEN661'].Items[0].Value) {
        this.MASTERDATA['OPDOEN661'].Items[0].Value = JSON.stringify(this.MASTERDATA['OPDOEN661'].Items[0].Value)
      }
      if (this.MASTERDATA['OPDOEN659'] && this.MASTERDATA['OPDOEN659'].Items[0].Value) {
        this.MASTERDATA['OPDOEN659'].Items[0].Value = JSON.stringify(this.MASTERDATA['OPDOEN659'].Items[0].Value)
      }
      if (this.MASTERDATA['OPDOENDOR']) {
        if (this.MASTERDATA['OPDOENDOR'].Items[0].Value === 'Invalid date') {
          this.MASTERDATA['OPDOENDOR'].Items[0].Value = ''
        }
      }
      this.handleClearData()
      var DataSubmit = this.getDataSubmit()
      NProgress.start()
      if (this.DataSubmit.Version >= 2 && this.VisitVersion >= 10 && this.$refs.ListOfCurrentMedications) {
        if (!this.MASTERDATA['OPDOENVH600'].Items[1].Value) this.$refs.ListOfCurrentMedications.clear()
        this.$refs.ListOfCurrentMedications.submit(true)
      } else {
        if (this.$refs.ListOfCurrentMedications) this.$refs.ListOfCurrentMedications.submit(true)
      }
      setTimeout(() => {
        this.DataSubmit.Room = {}
        new OutpatientExaminationNote()
          .update(this.$route.params.Id, DataSubmit)
          .then((response) => {
            this.handlerResponse(response)
            // this.$router.push({name: 'etr', params: {Id: response.Id}})
            storage.removeItem(
              'OutpatientExaminationNote#' + this.$route.params.Id
            )
            this.toastedSuccess()
            this.setLastData()
            this.rawData = this.cloneObj(this.DataSubmit)
            if (response.IsChronic) {
              EventBus.$emit('updateGlobalOpd', 'thangdc in here')
              this.$modal.show('dialog', {
                title: this.__t('Cảnh báo!'),
                text: this.__t('Đây là ca bệnh ngoại trú phức tạp.'),
                class: 'v-dialog v-dialog-warning',
                buttons: [
                  {
                    title: this.__t('Đi đến tóm tắt ca bệnh'),
                    class: 'btn bg-yellow',
                    handler: () => {
                      this.$modal.hide('dialog')
                      this.$router.push({
                        name: 'OPDComplexOutpatientCaseSummary',
                        params: { Id: this.$route.params.Id }
                      })
                    }
                  },
                  {
                    title: this.__t('Hủy bỏ'),
                    class: 'btn',
                    handler: () => {
                      this.$modal.hide('dialog')
                      this.reload()
                    }
                  }
                ]
              })
            } else {
              this.reload()
            }
          })
          .catch((e) => {
            if (e.data.IsErorr) {
              this.popUpWarning(e.data.ViMessage)
            }
          })
      }, 100)
    },
    validateForm () {
      $('.error').removeClass('error')
      if (
        (this.DataSubmit.Status.Code === 'OPDIH' && this.VisitVersion < 12) ||
        this.DataSubmit.Status.Code === 'OPDNE'
      ) { return true }
      var error = []
      $('#OutpatientExaminationNoteForm')
        .find('textarea')
        .each((e, elm) => {
          var val = $(elm).val() || ''
          if ($(elm).data('code') && !val.trim()) {
            if (
              this.DataSubmit.Status.Code === 'OPDWR' &&
              [
                'OPDOENTP0ANS',
                'OPDOENRFUANS',
                'OPDOENDORANS',
                'OPDOENPT0ANS',
                'OPDOENDD0ANS'
              ].includes($(elm).data('code'))
            ) {
              // pass
            } else {
              if (this.VisitVersion >= 12 && this.DataSubmit.Status.Code === 'OPDIH') {
                // Nothing
              } else {
                error.push(this.MDITEMINFO[$(elm).data('code')])
              }
            }
          }
        })
      if (
        this.DataSubmit.Status.Code === 'OPDTTE' &&
        !this.MASTERDATA['OPDOENREC2'].Items[0].Value
      ) {
        error.push(this.MASTERDATA['OPDOENREC2'].Items[0])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDIHT' &&
        !this.MASTERDATA['OPDOENTOT'].Items[0].Value
      ) {
        error.push(this.MASTERDATA['OPDOENTOT'].Items[0])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDAM' &&
        !this.MASTERDATA['OPDOENREC'].Items[0].Value
      ) {
        error.push(this.MASTERDATA['OPDOENREC'].Items[0])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDUDT' &&
        !this.MASTERDATA['OPDOENRFT1'].Items[0].Value &&
        !this.MASTERDATA['OPDOENRFT1'].Items[1].Value
      ) {
        error.push(this.MASTERDATA['OPDOENRFT1'])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDUDT' &&
        !this.MASTERDATA['OPDOENTD0'].Items[0].Value
      ) {
        error.push(this.MASTERDATA['OPDOENTD0'].Items[0])
      }
      if (!this.isEHOS()) {
        if (
          this.DataSubmit.Status.Code !== 'OPDWR' &&
          !this.MASTERDATA['OPDOENICD'].Items[0].Value
        ) {
          if (this.VisitVersion >= 12 && this.DataSubmit.Status.Code === 'OPDIH') {
            // Nothing
          } else {
            error.push(this.MASTERDATA['OPDOENICD'].Items[0])
          }
        }
      }
      if (this.DataSubmit.Status.Code === 'OPDWR' && this.DataSubmit && (this.DataSubmit.AppointmentDateResult === 'Invalid date' || !this.DataSubmit.AppointmentDateResult)) {
        const obj = {
          ViName: 'Ngày hẹn trả KQ',
          EnName: 'Appointment date result',
          Code: 'AppointmentDateResult'
        }
        error.push(obj)
      }
      if (this.DataSubmit.Status.Code !== 'OPDIH' && this.DataSubmit.Version >= 2 && this.VisitVersion >= 10) {
        if (!this.MASTERDATA['OPDOENVH600'].Items[0].Value && !this.MASTERDATA['OPDOENVH600'].Items[1].Value && this.VisitVersion < 12) {
          const obj = {
            ViName: 'Khai thác thông tin thuốc đã dùng tại nhà (nếu có)',
            EnName: 'List of current medications that patient using at home',
            Code: 'OPDOENVH600'
          }
          error.push(obj)
        } else if (!this.MASTERDATA['OPDOENVH600'].Items[0].Value && !this.MASTERDATA['OPDOENVH600'].Items[1].Value && this.VisitVersion >= 12) {
          const obj = {
            ViName: 'Khai thác thông tin thuốc đang dùng tại nhà (nếu có)',
            EnName: 'List of current medications that patient using at home',
            Code: 'OPDOENVH600'
          }
          error.push(obj)
        }
      }
      // validate ver 4
      if (this.MASTERDATA['OPDOENPT603'].Items[0].Value && !this.MASTERDATA['OPDOENPT606'].Items[1].Value && this.VisitVersion >= 12 && !this.MASTERDATA['OPDOENPT606'].Items[2].Value) {
        error.push(this.MASTERDATA['OPDOENPT606'].Items[1])
      }
      if (this.MASTERDATA['OPDOENPT614'].Items[4].Value && !this.MASTERDATA['OPDOENPT614'].Items[5].Value && this.VisitVersion >= 12) {
        error.push(this.MASTERDATA['OPDOENPT614'].Items[5])
      }
      this.errors = error
      if (this.errors.length) {
        this.handlerResponse({ Error: this.errors })
      }
    },
    validateFormConsultation () {
      if (
        this.DataSubmit.Status.Code === 'OPDIH' ||
        this.DataSubmit.Status.Code === 'OPDNE'
      ) { return true }
      var error = []
      $('.error').removeClass('error')
      $('#OutpatientExaminationNoteForm #statusblock')
        .find('textarea')
        .each((e, elm) => {
          var val = $(elm).val() || ''
          if ($(elm).data('code') && !val.trim()) {
            if (
              this.DataSubmit.Status.Code === 'OPDWR' &&
              [
                'OPDOENTP0ANS',
                'OPDOENRFUANS',
                'OPDOENDORANS',
                'OPDOENPT0ANS',
                'OPDOENDD0ANS'
              ].includes($(elm).data('code'))
            ) {
              // pass
            } else {
              error.push(this.MDITEMINFO[$(elm).data('code')])
            }
          }
        })
      if (!this.MASTERDATA['OPDOENICD'].Items[0].Value) {
        error.push(this.MASTERDATA['OPDOENICD'].Items[0])
      }
      if (!this.MASTERDATA['OPDOENDD0'].Items[0].Value) {
        error.push(this.MASTERDATA['OPDOENDD0'].Items[0])
      }
      if (!this.MASTERDATA['OPDOENCC0'].Items[0].Value) {
        error.push(this.MASTERDATA['OPDOENCC0'].Items[0])
      }
      if (!this.MASTERDATA['OPDOENRFU'].Items[0].Value) {
        error.push(this.MASTERDATA['OPDOENRFU'].Items[0])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDUDT' &&
        !this.MASTERDATA['OPDOENRFT1'].Items[0].Value &&
        !this.MASTERDATA['OPDOENRFT1'].Items[1].Value
      ) {
        error.push(this.MASTERDATA['OPDOENRFT1'])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDUDT' &&
        !this.MASTERDATA['OPDOENTD0'].Items[0].Value
      ) {
        error.push(this.MASTERDATA['OPDOENTD0'].Items[0])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDIHT' &&
        !this.MASTERDATA['OPDOENTOT'].Items[0].Value
      ) {
        error.push(this.MASTERDATA['OPDOENTOT'].Items[0])
      }
      var planOfCare = [
        this.MASTERDATA['OPDOEN251'].Items[0].Value,
        this.MASTERDATA['OPDOEN252'].Items[0].Value,
        this.MASTERDATA['OPDOEN253'].Items[0].Value,
        this.MASTERDATA['OPDOEN254'].Items[0].Value,
        this.MASTERDATA['OPDOEN256'].Items[0].Value,
        this.MASTERDATA['OPDOEN257'].Items[0].Value,
        this.MASTERDATA['OPDOEN259'].Items[0].Value,
        this.MASTERDATA['OPDOEN260'].Items[0].Value,
        this.MASTERDATA['OPDOEN261'].Items[0].Value
      ]
      if (planOfCare.filter(e => e).length < 1) {
        error.push(this.MASTERDATA['OPDOEN267'])
      }
      this.errors = error
      if (this.errors.length) {
        this.handlerResponse({ Error: this.errors })
      }
    },
    getDataSubmit () {
      if (this.DataSubmit && this.DataSubmit.Status && this.DataSubmit.Status.Code !== 'OPDWR') {
        this.DataSubmit.AppointmentDateResult = ''
      }
      if (this.DataSubmit.IsConsultation) {
        this.validateFormConsultation()
      } else {
        this.validateForm()
      }
      this.DataSubmit.Datas = []
      this.DataSubmit.IsUseHandOverCheckList = this.IsUseHandOverCheckList
      this.DataSubmit._Exception = []
      var obj = {}
      for (const property in this.MASTERDATA) {
        this.MASTERDATA[property].Items.forEach((item) => {
          obj[item.Code] = item.Value
        })
      }
      for (const property in this.MASTERDATA) {
        if (
          this.MASTERDATA[property].Items &&
          this.checkInClinic(this.MASTERDATA[property].Clinic)
        ) {
          this.MASTERDATA[property].Items.forEach((item) => {
            var val = item.Value
            if (this.DataSubmit.IsConsultation) {
              if (KLSCODE.KLSCODE.includes(property) && !obj['OPDOEN25002']) {
                val = null
              }
            }
            if (item.Code === 'OPDOENICDANS' || item.Code === 'OPDOENICDOPT' || item.Code === 'OPDOENICD0101') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'OPDOENDORANS' && typeof item.Value === 'object') {
              val = this.moment2String(item.Value, this.vDateFormat)
            }
            if (item.Code === 'OPDOENTD0ANS' && typeof item.Value === 'object') {
              val = this.moment2String(item.Value)
            }
            obj[item.Code] = item.Value
            if (item.Code === 'OPDOEN262002' && !obj['OPDOEN262001']) {
              val = null
            }
            if (item.Code === 'OPDOEN263002' && !obj['OPDOEN263001']) {
              val = null
            }
            if (item.Code === 'OPDOEN264002' && !obj['OPDOEN264001']) {
              val = null
            }
            if (item.Code === 'OPDOEN265002' && !obj['OPDOEN265001']) {
              val = null
            }
            if (item.Code === 'OPDOEN266002' && !obj['OPDOEN266001']) {
              val = null
            }
            if (item.Code === 'OPDOEN251002' && !obj['OPDOEN251001']) {
              val = null
            }
            if (item.Code === 'OPDOEN253002' && !obj['OPDOEN253001']) {
              val = null
            }
            if (item.Code === 'OPDOEN261002' && !obj['OPDOEN261001']) {
              val = null
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val
            })
            if (item.Code === 'OPDOENREC2ANS') {
              var objOPDOENREC2ANS = this.MDSPECIALITIES.find(
                (e) => e.Id === obj['OPDOENREC2ANS']
              )
              this.DataSubmit._Exception.push({
                key: '_OPDOENREC2ANS',
                value: objOPDOENREC2ANS ? objOPDOENREC2ANS.ViName : 'N/A'
              })
            }
            if (item.Code === 'OPDOENRECANS') {
              var objOPDOENRECANS = this.MDSPECIALITIES.find(
                (e) => e.Id === obj['OPDOENRECANS']
              )
              this.DataSubmit._Exception.push({
                key: '_OPDOENRECANS',
                value: objOPDOENRECANS ? objOPDOENRECANS.ViName : 'N/A'
              })
            }
          })
        }
      }

      var DataSubmit = Object.assign({}, this.DataSubmit)
      if (typeof DataSubmit.ExaminationTime === 'object') {
        DataSubmit.ExaminationTime = this.moment2String(
          DataSubmit.ExaminationTime
        )
      }
      if (
        DataSubmit.ExaminationTime &&
        this.rawData.ExaminationTime !== DataSubmit.ExaminationTime
      ) {
        DataSubmit._Exception.push({
          key: 'ExaminationTime',
          value: DataSubmit.ExaminationTime
        })
      }
      return DataSubmit
    },
    resetMdData (key) {
      if (!this.MASTERDATA[key]) return
      this.MASTERDATA[key].Items.forEach((item) => {
        item.Value = null
      })
      this.DataSubmit.Datas.forEach((item) => {
        if (item.Group === key) {
          item.Value = null
        }
      })
    },
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      new ICD10Service({ search: search, pageSize: 25 })
        .create({ search: search, pageSize: 25 })
        .then((res) => {
          vm.options = res.map((e) => {
            return {
              code: e.Code,
              label: e.Code + ', ' + e.ViName
            }
          })
        })
    }, 350),
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
            // this.OPDOENPT0Timeout = setTimeout(() => {
            //   this.autoLoadOPDOENPT0()
            // }, 30 * 1000)
          })
          .catch((e) => {
            console.log(e)
            // data[0].Value = ''
          })
      }
    },
    loadOPDOENHPI () {
      new OutpatientExaminationNote()
        .update('SyncHistoryOfPresentIllness/' + this.$route.params.Id)
        .then((response) => {
          this.SyncHistoryOfPresentIllness = response
          if (response.length === 0) {
            this.toastedInfo(
              this.__t('Không có thông tin khai thác bệnh sử trong 24h')
            )
          }
        })
        .catch((e) => {})
    },
    loadOPDOENHOA () {
      new OutpatientExaminationNote()
        .update('SyncHistoryOfAllergies/' + this.$route.params.Id)
        .then((response) => {
          this.HistoryOfAllergies = response.HistoryOfAllergies
          this.InitialAssessmentAllergies = response.InitialAssessmentAllergies
          if (this.HistoryOfAllergies.length === 0) {
            this.toastedInfo('Không có thông tin khai thác dị ứng')
          }
        })
        .catch((e) => {})
    },
    loadOPDOENPMH (data) {
      new OutpatientExaminationNote()
        .update('SyncPastMedicalHistory/' + this.$route.params.Id)
        .then((response) => {
          this.SyncPastMedicalHistory = response
          if (this.SyncPastMedicalHistory.length === 0) {
            this.toastedError(this.__t('Không có dữ liệu'))
          }
        })
        .catch((e) => {})
    },
    pushToOPDOENPT0 (pa) {
      var str1 = ''
      var str2 = ''
      if (pa[0]) {
        str1 = `${pa[0]}`
      }
      if (pa[1]) {
        str2 = `\nKết quả chẩn đoán hình ảnh: \n ${pa[1]}`
      }
      this.MASTERDATA['OPDOENPT0'].Items[1].Value =
        (str1 ? 'Kết quả xét nghiệm: \n ' + str1 : '') + str2
      return str1 + str2
    },
    parserOPDOENPT0 (str) {
      if (!str) return ['', '']
      var parstring = str
        .replace('Kết quả xét nghiệm: \n', '')
        .split('Kết quả chẩn đoán hình ảnh: \n')
      if (parstring.length === 1) return ['', parstring[0]]
      return parstring
    },
    mapCDHAStr (oldstr, newstr, type) {
      newstr = '- ' + newstr
      if (type === 1) {
        if (this.hasCDHA(oldstr)) {
          oldstr = oldstr.replace(
            'Kết quả chẩn đoán hình ảnh:',
            `Kết quả chẩn đoán hình ảnh:\n${newstr}`
          )
        } else {
          if (this.hasKQXN(oldstr)) {
            oldstr = oldstr + '\nKết quả chẩn đoán hình ảnh:\n' + newstr
          } else {
            oldstr = 'Kết quả chẩn đoán hình ảnh:\n' + newstr + '\n' + oldstr
          }
        }
      }
      if (type === 2) {
        if (this.hasKQXN(oldstr)) {
          oldstr = oldstr.replace(
            'Kết quả xét nghiệm:',
            `Kết quả xét nghiệm:\n${newstr}`
          )
        } else {
          oldstr = 'Kết quả xét nghiệm:\n' + newstr + '\n' + oldstr
        }
      }
      this.MASTERDATA['OPDOENPT0'].Items[1].Value = this.trim_(oldstr, '\n')
    },
    hasKQXN (str) {
      return str.includes('Kết quả xét nghiệm:')
    },
    hasCDHA (str) {
      return str.includes('Kết quả chẩn đoán hình ảnh:')
    },
    SyncVisitHistory () {
      new OutpatientExaminationNote()
        .update('SyncVisitHistory', { Id: this.$route.params.Id })
        .then((response) => {
          this.HistoryOfAllergies = response.HistoryOfAllergies
          this.InitialAssessmentAllergies = response.InitialAssessmentAllergies
          this.SyncHistoryOfPresentIllness = response.HistoryOfPresentIllness
          this.SyncPastMedicalHistory = response.PastMedicalHistory
          // this.SyncFamilyMedicalHistory = response.FamilyMedicalHistory
          this.SyncFamilyMedicalHistory = response.FamilyMedicalHistory
        })
    },
    getData () {
      this.OPDOENTUCO_TMP = []
      this.loaded = false
      this.MDITEMINFO = {}
      if (this.$route.params.Id) {
        new OutpatientExaminationNote()
          .find(this.$route.params.Id)
          .then((response) => {
            if (response.AppointmentDateResult) {
              response.AppointmentDateResult = this.$options.filters.formatDateWithoutSecon(response.AppointmentDateResult)
            }
            // test
            // response.SetupClinic = []
            if (response.IscheckVisitPreAnes && response.ListStatus && response.ListStatus.length) {
              response.ListStatus = response.ListStatus.filter(e => {
                if (e.Code !== 'OPDAM' && e.Code !== 'OPDTTE' && e.Code !== 'OPDUDT' && e.Code !== 'OPDIHT') {
                  return e
                }
              })
            }
            this.DataSubmit = response
            EventBus.$emit('getHandOverCheckList', response)
            this.IsUseHandOverCheckList = this.DataSubmit.IsUseHandOverCheckList

            this.IsAcceptPhysician = response.IsAcceptPhysician
            this.IsAcceptNurse = response.IsAcceptNurse
            if (this.IsAcceptPhysician || this.IsAcceptNurse) {
              this.IsReadOnLy = true
            }

            if (this.IsUseHandOverCheckList === undefined || this.IsUseHandOverCheckList === null) {
              this.IsUseHandOverCheckList = true
            }
            if (!this.DataSubmit.ExaminationTime) {
              this.DataSubmit.ExaminationTime = new Date()
            } else {
              this.DataSubmit.ExaminationTime = this.string2Moment(
                this.DataSubmit.ExaminationTime
              )
            }
            this.DataSubmit.Room = this.Rooms.find(
              (e) => e.Id === this.DataSubmit.RoomId
            )
            for (const property in this.MASTERDATA) {
              if (property === 'OPDOENRFU' && this.DataSubmit.IsConsultation) {
                this.MASTERDATA[property].ViName = 'Lời dặn chung (Hiển thị trên báo cáo y tế)'
                this.MASTERDATA[property].Items[0].ViName = 'Lời dặn chung (Hiển thị trên báo cáo y tế)'
              }
              if (property === 'OPDOENCC0' && this.DataSubmit.IsConsultation) {
                this.MASTERDATA[property].ViName = 'Bệnh nhân/ Người giám hộ đến tư vấn về'
                this.MASTERDATA[property].Items[0].ViName = 'Bệnh nhân/ Người giám hộ đến tư vấn về'
              }
              if (property === 'OPDOENDOR' && this.DataSubmit.IsConsultation) this.MASTERDATA[property].ViName = 'Bệnh nhân sẽ lên lịch hẹn để thảo luận về mối quan tâm khác vào *(Hiển thị trên báo cáo y tế)'
              if (this.MASTERDATA[property].Items) {
                this.MASTERDATA[property].Items.forEach((item) => {
                  this.$set(this.MDITEMINFO, item.Code, item)
                  if (property === 'OPDOENTUCO') {
                    item.Data = this.JSONParse(item.Data)
                    this.OPDOENTUCO_TMP = [
                      ...this.OPDOENTUCO_TMP,
                      ...item.Data
                    ]
                  }
                  var code = item.Code
                  var exited = _.find(this.DataSubmit.Datas, { Code: code })
                  if (exited) {
                    if (
                      this.checkString(item.DataType, 'CheckBox') ||
                      this.checkString(item.DataType, 'Radio')
                    ) {
                      var isTrue = exited.Value === 'True'
                      item.Value = isTrue
                    } else if (
                      item.Code === 'OPDOENICDANS' ||
                      item.Code === 'OPDOENICDOPT' ||
                      item.Code === 'OPDOENICD0101'
                    ) {
                      item.Value = this.JSONParse(exited.Value)
                    } else if (
                      item.Group === 'OPDOENYTD'
                    ) {
                      item.DataType = 'Checkbox'
                    } else if (
                      exited.Value &&
                      (item.Code === 'OPDOENDORANS_' ||
                        item.Code === 'OPDOENTD0ANS')
                    ) {
                      item.Value = this.string2Moment(exited.Value)
                    } else {
                      item.Value = exited.Value
                      // if (!exited.Value && this.checkString(item.DataType, 'Text') && item.Data) {
                      //   console.log((JSON.stringify(item.Data)).join(', \n'))
                      //   item.Value = (JSON.stringify(item.Data)).join(', \n')
                      // }
                    }
                  } else {
                    item.Value = null
                    if (this.DataSubmit.IsConsultation && code === 'OPDOENICDANS') {
                      item.Value = [
                        {
                          code: 'Z71.9',
                          label: 'Z71.9, Tư vấn không đặc hiệu',
                          ViName: 'Tư vấn không đặc hiệu'
                        }
                      ]
                    }
                    if (this.DataSubmit.IsConsultation && code === 'OPDOENDD0ANS') {
                      item.Value = 'Tư vấn không đặc hiệu'
                    }
                    if (this.DataSubmit.IsConsultation && code === 'OPDOEN25001') {
                      item.Value = true
                    }
                  }
                })
              }
            }
            if (this.isEHOS() && this.isPrimaryDoctorOrAuthorizedDoctor) { this.autoSyncIcd() }
            if (this.isPrimaryDoctorOrAuthorizedDoctor) { this.autoLoadOPDOENPT0() }
            setTimeout(() => {
              this.setMenuItems()
              // if (this.MASTERDATA['OPDOENYTD']) {
              //   if (!this.MASTERDATA['OPDOENYTD'].Items.find((e) => e.Value)) { this.MASTERDATA['OPDOENYTD'].Items[0].Value = true }
              // }
              if (this.isPrimaryDoctorOrAuthorizedDoctor) {
                this.SyncVisitHistory()
              }
              // this.setLastData()
              this.rawData = this.cloneObj(this.DataSubmit)
              this.setLastData()
              if (this.isVaccine() && this.DataSubmit.IsNew && this.isPrimaryDoctorOrAuthorizedDoctor) {
                this.setDefaultsValue()
              }
              this.checkAge()
              this.changeData()
            }, 100)
          })
          .catch((e) => {
            console.log(e)
            if (e.status === 400) {
              this._404()
            }
          })
      }
    },
    setDefaultsValue () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach((item) => {
            if (item.DefaultValue) item.Value = item.DefaultValue
          })
        }
      }
    },
    autoSyncIcd () {
      if (!this.$route.params.Id) return false
      new OutpatientExaminationNote({ hidemsg: true, noLoading: true })
        .update('SyncDiagnosisAndICD', { Id: this.$route.params.Id })
        .then((response) => {
          this.syncIcdAt = new Date()
          this.syncIcdInterval = setTimeout(() => {
            this.autoSyncIcd()
          }, 15 * 1000)
          if (response) {
            this.MASTERDATA['OPDOENID0'].Items.forEach((item) => {
              if (
                response.InitialDiagnosis &&
                item.Code === 'OPDOENID0ANS' &&
                !item.Value
              ) {
                item.Value = response.InitialDiagnosis
              }
            })
            this.MASTERDATA['OPDOENDD0'].Items.forEach((item) => {
              if (response.Diagnosis && item.Code === 'OPDOENDD0ANS') {
                item.Value = response.Diagnosis
              }
            })
            this.MASTERDATA['OPDOENICD'].Items.forEach((item) => {
              if (response.PrimaryICD && item.Code === 'OPDOENICDANS') {
                item.Value = response.PrimaryICD.filter((e) => e.code)
              }
              if (
                response.OptionICD &&
                item.Code === 'OPDOENICDOPT' &&
                (!item.Value || item.Value.length === 0)
              ) {
                item.Value = response.OptionICD.filter((e) => e.code)
              }
            })
          }
          if (
            this.MASTERDATA['OPDOENRFU'] &&
            !this.MASTERDATA['OPDOENRFU'].Items[0].Value
          ) {
            if (response.PrimaryICD && this.isNew) { this.updateIcd(response.PrimaryICD) }
            if (response.OptionICD && this.isNew) { this.updateIcd(response.OptionICD) }
          }
        })
    },
    autoSaveDraft () {
      // var DataSubmit = this.getDataSubmit()
      // setTimeout(() => {
      //   storage.set('OutpatientExaminationNote#' + this.$route.params.Id, JSON.stringify(DataSubmit))
      // }, 100)
    },
    getDataDraft () {
      return storage.get('OutpatientExaminationNote#' + this.$route.params.Id)
    },
    OPDOENICD01icdChange (value) {
      var val = (value || []).map(e => e.ViName)
      var currentValue = ''
      currentValue = this.MASTERDATA['OPDOENID0'].Items[0].Value || ''
      this.MASTERDATA['OPDOENID0'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
    },
    // ver2
    checkAge () {
      let age = 0
      if (this.DataSubmit && (this.DataSubmit.Age === 0 || this.DataSubmit.Age)) {
        age = this.DataSubmit.Age
      }
      if (this.MASTERDATA['OPDOENTUOI']) {
        if (age < 5) {
          this.MASTERDATA['OPDOENTUOI'].Items[2].Value = true
          this.MASTERDATA['OPDOENTUOI'].Items[1].Value = false
          this.MASTERDATA['OPDOENTUOI'].Items[0].Value = false
        }
        if (age >= 5 && age <= 19) {
          this.MASTERDATA['OPDOENTUOI'].Items[1].Value = true
          this.MASTERDATA['OPDOENTUOI'].Items[0].Value = false
          this.MASTERDATA['OPDOENTUOI'].Items[2].Value = false
        }
        if (age > 19) {
          this.MASTERDATA['OPDOENTUOI'].Items[0].Value = true
          this.MASTERDATA['OPDOENTUOI'].Items[1].Value = false
          this.MASTERDATA['OPDOENTUOI'].Items[2].Value = false
        }
      }
    },
    copyOPDOENRFU (selectedValue) {
      if (!selectedValue) return
      var input = this.MASTERDATA['OPDOENRFU'].Items[0].Value
      var inputValue = input ? input.split('\n') : []
      selectedValue.forEach((e) => {
        if (!inputValue.includes(this.trim_(e, '\n'))) { input = (input || '') + '\n' + e }
      })
      input = this.trim_(input || '', '\n')
      this.MASTERDATA['OPDOENRFU'].Items[0].Value = input
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
    onlyClinic (code) {
      let check = false
      if (this.DataSubmit && this.DataSubmit.SetupClinic && this.DataSubmit.SetupClinic.length === 1) {
        if (this.DataSubmit.SetupClinic[0] === code) {
          check = true
        }
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
      console.log('str: ', str)
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
    copyOPDOENPT621 (str) {
      console.log('str: ', str)
      str = this.trim_(str)
      var old2 = this.MASTERDATA['OPDOENPT621'].Items[0].Value
        ? this.trim_(this.MASTERDATA['OPDOENPT621'].Items[0].Value) + '\n'
        : ''
      this.MASTERDATA['OPDOENPT621'].Items[0].Value = this.trim_(
        old2 + '-' + str,
        ', '
      )
      this.toastedInfo('Đã copy')
    },
    copyOPDOENTSSK (item) {
      if (item.ClinicCode === 'FreeTextOnly-000' && this.showWithClinic('FreeTextOnly-000')) {
        if (item.Sk_OPDOENTSSKANS) {
          if (this.MASTERDATA['OPDOENTSSK'].Items[0].Value) {
            this.MASTERDATA['OPDOENTSSK'].Items[0].Value += '\n'
            this.MASTERDATA['OPDOENTSSK'].Items[0].Value += item.Sk_OPDOENTSSKANS
          } else {
            this.MASTERDATA['OPDOENTSSK'].Items[0].Value = item.Sk_OPDOENTSSKANS
          }
        }
        if (item.Sk_OPDOENTSKNANS) {
          if (this.MASTERDATA['OPDOENTSKN'].Items[0].Value) {
            this.MASTERDATA['OPDOENTSKN'].Items[0].Value += '\n'
            this.MASTERDATA['OPDOENTSKN'].Items[0].Value += item.Sk_OPDOENTSKNANS
          } else {
            this.MASTERDATA['OPDOENTSKN'].Items[0].Value = item.Sk_OPDOENTSKNANS
          }
        }
        if (item.Sk_OPDOENTSKANS) {
          if (this.MASTERDATA['OPDOENTSK'].Items[0].Value) {
            this.MASTERDATA['OPDOENTSK'].Items[0].Value += '\n'
            this.MASTERDATA['OPDOENTSK'].Items[0].Value += item.Sk_OPDOENTSKANS
          } else {
            this.MASTERDATA['OPDOENTSK'].Items[0].Value = item.Sk_OPDOENTSKANS
          }
        }
      } else {
        let str = item.Value
        str = this.trim_(str)
        var old2 = this.MASTERDATA['OPDOENTSSK'].Items[0].Value
          ? this.trim_(this.MASTERDATA['OPDOENTSSK'].Items[0].Value) + '\n'
          : ''
        this.MASTERDATA['OPDOENTSSK'].Items[0].Value = this.trim_(
          old2 + '-' + str,
          ', '
        )
      }
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
      if (this.MASTERDATA['OPDOENCC0']) {
        this.MASTERDATA['OPDOENCC0'].ViName = 'Lý do đến khám (Hiển thị trên báo cáo y tế)'
        this.MASTERDATA['OPDOENCC0'].EnName = 'Chief complain'
      }
      if (this.MASTERDATA['OPDOENHPI']) {
        this.MASTERDATA['OPDOENHPI'].ViName = 'Bệnh sử (Hiển thị trên báo cáo y tế)'
        this.MASTERDATA['OPDOENHPI'].EnName = 'History of present illness'
      }
      if (this.MASTERDATA['OPDOENID0'] && this.VisitVersion >= 12) {
        this.MASTERDATA['OPDOENID0'].ViName = 'Chẩn đoán ban đầu'
        this.MASTERDATA['OPDOENID0'].EnName = 'Initial diagnosis'
      }
      if (this.MASTERDATA['OPDOENID0'] && this.VisitVersion >= 12) {
        this.MASTERDATA['OPDOENID0'].Items[0].ViName = 'Chẩn đoán ban đầu'
        this.MASTERDATA['OPDOENID0'].Items[0].EnName = 'Initial diagnosis'
      }
      if (this.MASTERDATA['OPDOENDOR']) {
        this.MASTERDATA['OPDOENDOR'].ViName = 'Hẹn ngày tái khám (Hiển thị trên báo cáo y tế)'
        this.MASTERDATA['OPDOENDOR'].EnName = 'Date-of re-examination'
      }
      if (this.MASTERDATA['OPDOENDD0'] && this.VisitVersion >= 12) {
        this.MASTERDATA['OPDOENDD0'].ViName = 'Chẩn đoán ra viện'
        this.MASTERDATA['OPDOENDD0'].EnName = 'Discharge diagnosis'
      }
      if (this.MASTERDATA['OPDOENDD0'] && this.VisitVersion >= 12) {
        this.MASTERDATA['OPDOENDD0'].Items[0].ViName = 'Chẩn đoán ra viện'
        this.MASTERDATA['OPDOENDD0'].Items[0].EnName = 'Discharge diagnosis'
      }
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
      setTimeout(() => {
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        this.loaded = true
      }, 1500)
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
    handleBack () {
      this.edited = false
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    // popup cảnh báo dữ liệu chưa lưu
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
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
    }
  },
  beforeDestroy () {
    if (this.syncIcdInterval) clearTimeout(this.syncIcdInterval)
    if (this.OPDOENPT0Timeout) clearTimeout(this.OPDOENPT0Timeout)
    EventBus.$off('ICDUPDATED')
  }
}
</script>
