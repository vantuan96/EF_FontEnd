<template>
  <div class="main-content">
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <div class="box box-table">
            <div class="box-body">
              <template v-if="routeType === 'Eye'">
                <Eye2 ref="Eye2" :readonly="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :SyncPastMedicalHistory="SyncPastMedicalHistory" :VisitIdDrop="VisitIdDrop" :VisitId="VisitId"/>
              </template>
              <template v-else>
                <div id="MedicalRecord-part2-block1-view">
                  <label class="block-title" v-if="MASTERDATA['IPDMRPTLDVV']">I. {{__t2(MASTERDATA['IPDMRPTLDVV'].ViName)}}:</label>
                  <div class="ml-10">
                    <md-input-text :readonly="true" :placeholder="__t('N/A')" v-if="MASTERDATA['IPDMRPTLDVV']" v-model="MASTERDATA['IPDMRPTLDVV']" :hidelabel="true"/>
                    <div class="flex-box flex-center" v-if="MASTERDATA['IPDMRPTVANT'] && routeType !== 'Neonatal' && routeType !== 'Gynecological' && routeType !== 'Oncology'">
                      <label>{{__t2('Vào ngày thứ-mdc')}}:</label>
                      <MDText style="width: 130px;" class="mrl5" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTVANT']" :readonly="true" rows="1" v-model="MASTERDATA['IPDMRPTVANT'].Items[0].Value"/> <span class="ml-5">{{__t2('của bệnh')}}</span>
                      <!-- <number-input :readonly="true" :min="0" :max="10000" inline v-model="MASTERDATA['IPDMRPTVANT'].Items[0].Value" :placeholder="__t('N/A')" class="ml-5"/> <span class="ml-5">{{__t2('của bệnh')}}</span> -->
                    </div>
                    <hr/>
                  </div>
                </div>
                <div id="MedicalRecord-part2-block2-view">
                  <label class="block-title">II. {{__t2('Hỏi bệnh')}}:</label>
                  <Neonatal :readonly="true" :box1="true" :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop" :DataSubmit="DataSubmit" v-if="routeType === 'Neonatal'"/>
                  <Obstetrics2 v-if="routeType === 'Obstetrics'"
                    :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                    :DataSubmit="DataSubmit"
                    :box1="true"
                    :readonly="true"/>
                  <div class="bg-gray-2 mt-10" v-if="routeType === 'Neonatal'">
                    <label>
                      {{__t('Thuốc đang dùng (Bao gồm cả thuốc kê đơn và không kê đơn)')}}:
                    </label>
                    <list-of-current-medications
                      ref="ListOfCurrentMedications"
                      :Type="'IPD-PatientMedicationList'"
                      :VisitTypeGroupCode="'IPD'"
                      :RealOnly="true"
                      :VisitId="VisitId"
                      :VisitIdDrop="VisitIdDrop"
                    />
                  </div>
                  <div class="ml-10" v-if="routeType !== 'Neonatal' && routeType !== 'Obstetrics'">
                    <label v-if="MASTERDATA['IPDMRPTQTBL']">{{__label(MASTERDATA['IPDMRPTQTBL'])}}:</label>
                    <div class="bg-gray-2x">
                      <md-input-text :readonly="true" :placeholder="__t('N/A')" v-if="MASTERDATA['IPDMRPTQTBL']" v-model="MASTERDATA['IPDMRPTQTBL']"  :hidelabel="true"/>
                    </div>
                    <br/>
                    <label v-if="MASTERDATA['IPDMRPTTISB']">{{__label(MASTERDATA['IPDMRPTTISB'])}}:</label>
                    <div class="bg-gray-2x" v-if="routeType === 'Pediatric' || routeType === 'Gynecological'">
                      <label>+ {{__t2('Dị ứng')}}:</label>
                      <md-input-text :hidelabel="true" :readonly="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT01']" v-model="MASTERDATA['IPDMRPT01']"/>
                    </div>
                    <div class="bg-gray-2x">
                      <template v-if="routeType === 'CardiovascularForm'">
                        <div class="fw600">{{__label(MASTERDATA['IPDMRPTBATH'])}}:</div>
                        <BMTIMMACH2 :readonly="true" :box1="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
                      </template>
                      <template v-else>
                        <md-input-text :readonly="true" :placeholder="__t('N/A')" v-if="MASTERDATA['IPDMRPTBATH']" v-model="MASTERDATA['IPDMRPTBATH']"/>
                      </template>
                      <label class="mt-10" v-if="routeType !== 'Pediatric' && routeType !== 'Gynecological' && MASTERDATA['IPDMRPTDDLQ']">{{__label(MASTERDATA['IPDMRPTDDLQ'])}}:</label>
                      <table class="table table-bordered table-bordered-x" v-if="routeType !== 'Pediatric' && routeType !== 'Gynecological' && MASTERDATA['IPDMRPTDDLQ']">
                        <tr>
                            <th width="1px">{{__t2('TT')}}</th>
                            <th width="100p">{{__t2('Ký hiệu')}}</th>
                            <th>{{__t2('Thời gian (tính theo tháng)')}}</th>
                            <th width="1px">{{__t2('TT')}}</th>
                            <th width="100px">{{__t2('Ký hiệu')}}</th>
                            <th>{{__t2('Thời gian (tính theo tháng)')}}</th>
                          </tr>
                        <tr>
                          <td>01</td>
                          <td v-if="MASTERDATA['IPDMRPTALLE']">{{__t2(MASTERDATA['IPDMRPTALLE'].ViName)}}</td>
                          <td>
                            <div class="flex-box flex-center">
                              <CheckboxsValue :data="MASTERDATA['IPDMRPTALLE'].Items" :showall="true" :hideLabel="true"/>
                              <input :readonly="true" :placeholder="__t('N/A')" class="form-control" v-model="MASTERDATA['IPDMRPTALLE'].Items[1].Value" />
                            </div>
                          </td>
                          <td>04</td>
                          <td v-if="MASTERDATA['IPDMRPTTHLA']">{{__t2(MASTERDATA['IPDMRPTTHLA'].ViName)}}</td>
                          <td>
                            <div class="flex-box flex-center">
                              <CheckboxsValue :data="MASTERDATA['IPDMRPTTHLA'].Items" :showall="true" :hideLabel="true"/>
                              <input :readonly="true" :placeholder="__t('N/A')" class="form-control" v-model="MASTERDATA['IPDMRPTTHLA'].Items[1].Value" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>02</td>
                          <td>{{__t2(MASTERDATA['IPDMRPTMATU'].ViName)}}</td>
                          <td>
                            <div class="flex-box flex-center">
                              <CheckboxsValue :data="MASTERDATA['IPDMRPTMATU'].Items" :showall="true" :hideLabel="true"/>
                              <input :readonly="true" :placeholder="__t('N/A')" class="form-control" v-model="MASTERDATA['IPDMRPTMATU'].Items[1].Value" />
                            </div>
                          </td>
                          <td>05</td>
                          <td v-if="MASTERDATA['IPDMRPTTHLO']">{{__t2(MASTERDATA['IPDMRPTTHLO'].ViName)}}</td>
                          <td>
                            <div class="flex-box flex-center">
                              <CheckboxsValue :data="MASTERDATA['IPDMRPTTHLO'].Items" :showall="true" :hideLabel="true"/>
                              <input :readonly="true" :placeholder="__t('N/A')" class="form-control" v-model="MASTERDATA['IPDMRPTTHLO'].Items[1].Value" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>03</td>
                          <td v-if="MASTERDATA['IPDMRPTRUBI']">{{__t2(MASTERDATA['IPDMRPTRUBI'].ViName)}}</td>
                          <td>
                            <div class="flex-box flex-center">
                              <CheckboxsValue :data="MASTERDATA['IPDMRPTRUBI'].Items" :showall="true" :hideLabel="true"/>
                              <input :readonly="true" :placeholder="__t('N/A')" class="form-control" v-model="MASTERDATA['IPDMRPTRUBI'].Items[1].Value" />
                            </div>
                          </td>
                          <td>06</td>
                          <td v-if="MASTERDATA['IPDMRPTKHAC']">{{__t2(MASTERDATA['IPDMRPTKHAC'].ViName)}}</td>
                          <td>
                            <div class="flex-box flex-center">
                              <CheckboxsValue :data="MASTERDATA['IPDMRPTKHAC'].Items" :showall="true" :hideLabel="true"/>
                              <input :readonly="true" :placeholder="__t('N/A')" class="form-control" v-model="MASTERDATA['IPDMRPTKHAC'].Items[1].Value" />
                            </div>
                          </td>
                        </tr>
                      </table>
                      <hr/>
                    </div>
                    <div class="bg-grays-2 mt-10">
                      <md-input-text :readonly="true" :placeholder="__t('N/A')" v-if="MASTERDATA['IPDMRPTGIDI']" v-model="MASTERDATA['IPDMRPTGIDI']"/>
                    </div>
                    <div class="bg-grays-2 mt-10">
                      <label>
                        {{__t2('Thuốc đang dùng-mdc')}} ({{__t2('Bao gồm cả thuốc kê đơn và không kê đơn')}}):
                      </label>
                      <list-of-current-medications
                        ref="ListOfCurrentMedications"
                        :Type="'IPD-PatientMedicationList'"
                        :VisitTypeGroupCode="'IPD'"
                        :RealOnly="true"
                        :VisitId="VisitId"
                        :VisitIdDrop="VisitIdDrop"
                      />
                    </div>
                    <label class="mt-10" v-if="routeType === 'Pediatric'">{{__label(MASTERDATA['IPDMRPT05'])}}</label>
                    <div class="bg-gray-2 mt-10" v-if="routeType === 'Pediatric'">
                      <div class="flex align-center">
                        <div class="form-gro2up mrr20">
                          <div class="flex-box flex-center">
                            <div class="mrr5" style="min-width: 83px;">{{__label(MASTERDATA['IPDMRPT06'])}}:</div>
                            <VNumberInput :readonly="true" style="width: 148px;" class="mrr5" v-if="MASTERDATA['IPDMRPT06']" v-model="MASTERDATA['IPDMRPT06'].Items[0].Value" :placeholder="__t('Nhập')"/>
                            <div>child</div>
                          </div>
                        </div>
                        <div class="mrr10 white-space">{{__label(MASTERDATA['IPDMRPT08'])}}</div>
                        <div>
                          <VNumberInput v-if="MASTERDATA['IPDMRPT09']" :readonly="true" class="input-para inline mrr10" v-model="MASTERDATA['IPDMRPT09'].Items[0].Value" :placeholder="__t('Nhập')"/>
                          <div class="inline mrr5 white-space">{{__label(MASTERDATA['IPDMRPT09'])}}</div>
                          <br/><br/>
                          <VNumberInput v-if="MASTERDATA['IPDMRPT11']" :readonly="true" class="input-para inline mrr10" v-model="MASTERDATA['IPDMRPT11'].Items[0].Value" :placeholder="__t('Nhập')"/>
                          <div class="inline mrr5 white-space">{{__label(MASTERDATA['IPDMRPT11'])}}</div>
                          <br/><br/>
                          <VNumberInput v-if="MASTERDATA['IPDMRPT13']" :readonly="true" class="input-para inline mrr10" v-model="MASTERDATA['IPDMRPT13'].Items[0].Value" :placeholder="__t('Nhập')"/>
                          <div class="inline mrr5 white-space">{{__label(MASTERDATA['IPDMRPT13'])}}</div>
                          <br/><br/>
                          <VNumberInput v-if="MASTERDATA['IPDMRPT15']" :readonly="true" class="input-para inline mrr10" v-model="MASTERDATA['IPDMRPT15'].Items[0].Value" :placeholder="__t('Nhập')"/>
                          <div class="inline">{{__label(MASTERDATA['IPDMRPT15'])}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="bg-gray-2 mt-10" v-if="routeType === 'Pediatric'">
                      <div>
                        <div>{{__label(MASTERDATA['IPDMRPT17'])}}</div>
                        <MdRadiosInput2 :readonly="true" :value="MASTERDATA['IPDMRPT17']"/>
                      </div>
                      <div>
                        <textarea-autosize
                        :readonly="true"
                        v-if="MASTERDATA['IPDMRPT17'] && MASTERDATA['IPDMRPT17'].Items[5].Value"
                        class="form-control mrt10"
                        rows="3"
                        :placeholder="__t('Nhập')"
                        v-model="MASTERDATA['IPDMRPT17'].Items[6].Value"/>
                      </div>
                    </div>
                    <div class="row mt-10" v-if="routeType === 'Pediatric'">
                      <div class="col-md-4">
                        <div class="form-group">
                          <div class="flex-box flex-center">
                            <div class="mrr10 lb-w2">{{__label(MASTERDATA['IPDMRPT25'])}}</div>
                            <div class="input-group mrr10" style="flex-grow: 1">
                              <input :readonly="true" v-model="MASTERDATA['IPDMRPT25'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
                            </div>
                            <span> kg</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2"></div>
                      <div class="col-md-6">
                        <div class="form-gro2up">
                          <div class="flex-box flex-center">
                            <div class="mrr10">{{__label(MASTERDATA['IPDMRPT27'])}}</div>
                            <MdRadiosInput2 :readonly="true" :value="MASTERDATA['IPDMRPT27']" :noneDex="2" />
                            <div class="input-group" style="flex-grow: 1">
                              <input :readonly="true" v-if="MASTERDATA['IPDMRPT27'].Items[0].Value" v-model="MASTERDATA['IPDMRPT27'].Items[2].Value" class="form-control" :placeholder="__t('Nhập')" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <md-input-text v-if="routeType === 'Pediatric' && MASTERDATA['IPDMRPT31']" :readonly="true" v-model="MASTERDATA['IPDMRPT31']" :placeholder="__t('Nhập')"/>
                    <md-input-text v-if="routeType === 'Pediatric' && MASTERDATA['IPDMRPT33']" :readonly="true" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT33']"/>
                    <md-input-text v-if="routeType === 'Pediatric' && MASTERDATA['IPDMRPT35']" :readonly="true" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT35']"/>
                    <div class="row flex align-center mt-10" v-if="routeType === 'Pediatric'">
                      <div class="col-md-6 flex align-center">
                        <div class="mrr10">{{__label(MASTERDATA['IPDMRPT37'])}}</div>
                        <MdRadiosInput2 :readonly="true" :value="MASTERDATA['IPDMRPT37']" />
                      </div>
                      <div class="col-md-6 flex align-center">
                        <div class="mrr10">{{__label(MASTERDATA['IPDMRPT41'])}}</div>
                        <div class="input-group mrr5" style="width: 100px!important;">
                          <FakeInput v-model="MASTERDATA['IPDMRPT41'].Items[0].Value" />
                        </div>
                        <div>{{__t('months old')}}</div>
                      </div>
                    </div>
                    <div class="row flex align-center mt-10" v-if="routeType === 'Pediatric'">
                      <div class="col-md-12 flex align-center">
                        <div class="mrr10">{{__label(MASTERDATA['IPDMRPT43'])}}</div>
                        <MdRadiosInput2 :readonly="true" :value="MASTERDATA['IPDMRPT43']" />
                      </div>
                    </div>
                    <div class="flex align-center mt-10" v-if="routeType === 'Pediatric'">
                      <div class="mrr10" style="width: 120px;">{{__label(MASTERDATA['IPDMRPT46'])}}</div>
                      <!-- <MdRadiosInput :readonly="true" :value="MASTERDATA['IPDMRPT46']" :noneDex="7" /> -->
                      <MDCheckbox v-if="MASTERDATA['IPDMRPT46']" :readonly="true" v-model="MASTERDATA['IPDMRPT46']"/>
                    </div>
                    <div class="mrt10" v-if="routeType === 'Pediatric' && MASTERDATA['IPDMRPT46'].Items[6].Value">{{__label(MASTERDATA['IPDMRPT46'].Items[7])}}</div>
                    <textarea-autosize
                        v-if="routeType === 'Pediatric' && MASTERDATA['IPDMRPT46'] && MASTERDATA['IPDMRPT46'].Items[6].Value"
                        class="form-control"
                        rows="3"
                        :placeholder="__t('Nhập')"
                        :readonly="true"
                        v-model="MASTERDATA['IPDMRPT46'].Items[7].Value"/>
                      <Gynecological2
                        class="mrt10"
                        v-if="routeType === 'Gynecological'"
                        ref="Gynecological2Box1"
                        :box1="true"
                        :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                        :readonly="true"
                        :DataSubmit="DataSubmit"/>
                    <hr/>
                  </div>
                </div>
                <div class="mrt10" v-if="routeType === 'Neonatal'">
                    <label class="block">{{__label(MASTERDATA['IPDMRPT93'])}} <span class="fw100">({{__t('Điền v nếu áp dụng')}}):</span></label>
                    <NeonatalTable
                    class="mrb10"
                    v-if="MASTERDATA['IPDMRPT93']"
                    :master="MASTERDATA['IPDMRPT93']"
                    :readonly="true"
                    :data="[MASTERDATA['IPDMRPT93'].Items[0],
                    MASTERDATA['IPDMRPT93'].Items[3],
                    MASTERDATA['IPDMRPT93'].Items[1],
                    MASTERDATA['IPDMRPT93'].Items[4],
                    MASTERDATA['IPDMRPT93'].Items[2],
                    MASTERDATA['IPDMRPT93'].Items[5],
                    MASTERDATA['IPDMRPT93'].Items[6]]"/>
                  </div>
                <div id="MedicalRecord-part2-block6-view" v-if="checkVer2() && MASTERDATA['IPDMRPT1680']">
                  <label class="block-title">III. {{__label(MASTERDATA['IPDMRPT1680'])}}:</label>
                  <div class="ml-10" v-if="MASTERDATA['IPDMRPT1680']">
                    <MdRadiosInput4 v-if="MASTERDATA['IPDMRPT1680'].Items[0].Value" :readonly="true" :disabled="DataSubmit.IsCreatedPreProcedureRiskAssessment" class="mrb10" :value="MASTERDATA['IPDMRPT1680']"/>
                    <b class="el-radio-view disable" v-else>N/A</b>
                  </div>
                </div>
                <div id="MedicalRecord-part2-block3-view">
                  <label class="block-title" v-if="checkVer2()">IV. {{__t2('Khám bệnh')}}:</label>
                  <label class="block-title" v-else>III. {{__t2('Khám bệnh')}}:</label>
                  <Neonatal :readonly="true" :box2="true" :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop" v-if="routeType === 'Neonatal'"/>
                  <Oncology2 v-if="routeType === 'Oncology'" :readonly="true" :box1="true" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"/>
                  <div class="ml-10" v-if="routeType !== 'Neonatal' && routeType !== 'Obstetrics' && routeType !== 'Oncology'">
                    <label v-if="MASTERDATA['IPDMRPTTTYT']">{{__t2(MASTERDATA['IPDMRPTTTYT'].ViName)}}:</label>
                    <div class="bg-grays-2">
                      <div class="mb-5">
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTMACH']"><b>{{__label(MASTERDATA['IPDMRPTMACH'])}}:</b> {{MASTERDATA['IPDMRPTMACH'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTMACH'].Note)}}</span>
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTNHDO']"><b>{{__label(MASTERDATA['IPDMRPTNHDO'])}}:</b> {{MASTERDATA['IPDMRPTNHDO'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTNHDO'].Note)}}</span>
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTHUAP']"><b>{{__label(MASTERDATA['IPDMRPTHUAP'])}}:</b> {{MASTERDATA['IPDMRPTHUAP'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTHUAP'].Note)}}</span>
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTNHTH']"><b>{{__label(MASTERDATA['IPDMRPTNHTH'])}}:</b> {{MASTERDATA['IPDMRPTNHTH'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTNHTH'].Note)}}</span>
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTCICA']"><b>{{__label(MASTERDATA['IPDMRPTCICA'])}}:</b> {{MASTERDATA['IPDMRPTCICA'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTCICA'].Note)}}</span>
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTCANA']"><b>{{__label(MASTERDATA['IPDMRPTCANA'])}}:</b> {{MASTERDATA['IPDMRPTCANA'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTCANA'].Note)}}</span>
                        <span class="mr-10" v-if="MASTERDATA['IPDMRPTBBMI']"><b>{{__label(MASTERDATA['IPDMRPTBBMI'])}}:</b> {{MASTERDATA['IPDMRPTBBMI'].Items[0].Value || 'N/A'}} {{___t(MASTERDATA['IPDMRPTBBMI'].Note)}}</span>
                      </div>
                      <md-input-text :readonly="true" :placeholder="__t('N/A')" v-if="MASTERDATA['IPDMRPTTTYT']" v-model="MASTERDATA['IPDMRPTTTYT']"  :hidelabel="true"/>
                      <Gynecological2
                        class="mrt10"
                        style="margin-top: -20px!important;"
                        :readonly="true"
                        v-if="routeType === 'Gynecological'"
                        ref="Gynecological2Box2"
                        :box2="true"
                        :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                        :DataSubmit="DataSubmit"/>
                    </div>
                    <div v-if="routeType === 'A01_039_050919_V' && MASTERDATA['IPDMRPT10000']" class="mt-10">
                      <label>2. {{__label(MASTERDATA['IPDMRPT10000'])}}:</label>
                      <div class="bg-gray-2">
                        <md-input-text :readonly="true" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT10000']" :hidelabel="true"/>
                        <label>{{__label(MASTERDATA['IPDMRPT10002'])}}:</label>
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :index="[0, 1]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :index="[2, 3]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :index="[4, 5]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :index="[6, 7]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :index="[8, 9]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :index="[10, 11]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :index="[12, 13]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :index="[14, 15]"
                        />
                      </div>
                    </div>
                    <div v-if="routeType === 'A01_040_050919_V' && MASTERDATA['IPDMRPT10023']" class="mt-10">
                      <label>2. {{__label(MASTERDATA['IPDMRPT10023'])}}:</label>
                      <div class="bg-gray-2">
                        <md-input-text :readonly="true" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT10023']" :hidelabel="true"/>
                        <label>{{__label(MASTERDATA['IPDMRPT10025'])}}:</label>
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :MDCODE="'IPDMRPT10025'"
                          :index="[0, 1]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :MDCODE="'IPDMRPT10025'"
                          :index="[2, 3]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :MDCODE="'IPDMRPT10025'"
                          :index="[4, 5]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :MDCODE="'IPDMRPT10025'"
                          :index="[6, 7]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :MDCODE="'IPDMRPT10025'"
                          :index="[8, 9]"
                        />
                        <IPDMRPT10002
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"
                          :readonly="true"
                          :MDCODE="'IPDMRPT10025'"
                          :index="[10, 11]"
                        />
                      </div>
                    </div>
                    <div v-if="routeType === 'A01_195_050919_V' && MASTERDATA['IPDMRPTBNK0001']" class="mt-10">
                      <label>2. {{__label(MASTERDATA['IPDMRPTBNK0001'])}}:</label>
                      <md-input-text :readonly="true" :placeholder="__t('N/A')" v-model="MASTERDATA['IPDMRPTBNK0001']" :hidelabel="true"/>
                    </div>
                    <label class="mt-10" v-if="MASTERDATA['IPDMRPTCACQ']">{{__label(MASTERDATA['IPDMRPTCACQ'])}}:</label>
                    <div class="bg-gray-2">
                      <template v-if="routeType === 'A01_039_050919_V'">
                        <div :key="index" v-for="(code, index) in IPDMRPTCACQA01_039_050919_V">
                          <template v-if="MASTERDATA[code]">
                            <label>{{__label(MASTERDATA[code])}}</label>
                            <md-input-text :readonly="true" :hidelabel="true" v-if="code === 'IPDMRPTNTDD' || code === 'IPDMRPTTHKI'" :placeholder="__t('Nhập')" :defaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
                            <md-input-text :readonly="true" :hidelabel="true" v-else-if="code === 'IPDMRPTTIHO'" :placeholder="__t('Nhập')" v-model="MASTERDATA[code]"/>
                            <md-input-text :readonly="true" :hidelabel="true" v-else :placeholder="__t('Nhập')" :groupDefaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
                          </template>
                        </div>
                      </template>
                      <template v-else-if="routeType === 'A01_040_050919_V'">
                        <div :key="index" v-for="(code, index) in IPDMRPTCACQA01_040_050919_V">
                          <template v-if="MASTERDATA[code]">
                            <label>{{__label(MASTERDATA[code])}}</label>
                            <md-input-text :readonly="true" :hidelabel="true" v-if="code === 'IPDMRPTNTDD' || code === 'IPDMRPTTHKI'" :placeholder="__t('Nhập')" :defaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
                            <md-input-text :readonly="true" :hidelabel="true" v-else-if="code === 'IPDMRPTTIHO'" :placeholder="__t('Nhập')" v-model="MASTERDATA[code]"/>
                            <md-input-text :readonly="true" :hidelabel="true" v-else :placeholder="__t('Nhập')" :groupDefaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
                          </template>
                        </div>
                      </template>
                      <template v-else>
                      <div v-if="routeType !== 'Gynecological'" :key="index" v-for="(code, index) in IPDMRPTCACQ">
                        <label v-if="code === 'IPDMRPTNTDD' && routeType !== 'Pediatric'">{{__label(MASTERDATA[code])}}</label>
                          <label v-else-if="code === 'IPDMRPTNTDD' && routeType === 'Pediatric'">+ Dinh dưỡng và các bệnh lý khác</label>
                          <label v-else>{{__label(MASTERDATA[code])}}</label>
                        <md-input-text :hidelabel="true" :readonly="true" :placeholder="__t('N/A')" v-if="MASTERDATA[code]" v-model="MASTERDATA[code]"/>
                      </div>
                      </template>
                      <Gynecological2
                          class="mrt10"
                          :readonly="true"
                          v-if="routeType === 'Gynecological'"
                          ref="Gynecological2Box3"
                          :box3="true"
                          :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                          :DataSubmit="DataSubmit"/>
                    </div>
                    <Gynecological2
                        class="mrt10"
                        :readonly="true"
                        v-if="routeType === 'Gynecological'"
                        ref="Gynecological2Box4"
                        :box4="true"
                        :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                        :DataSubmit="DataSubmit"/>
                    <Obstetrics2 v-if="routeType === 'Obstetrics'"
                      :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                      :DataSubmit="DataSubmit"
                      :box2="true"
                      :readonly="true"/>
                    <BMTIMMACH2 v-if="routeType === 'CardiovascularForm'" class="mrt10" :readonly="true" :box2="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
                    <label class="mt-10" v-if="MASTERDATA['IPDMRPTCXNC'] && routeType !== 'Obstetrics'">{{__t2(MASTERDATA['IPDMRPTCXNC'].ViName)}}:</label>
                    <div class="bg-grays-2">
                      <md-input-text :readonly="true" :placeholder="__t('N/A')" v-if="MASTERDATA['IPDMRPTCXNC'] && routeType !== 'Obstetrics'" v-model="MASTERDATA['IPDMRPTCXNC']"  :hidelabel="true"/>
                    </div>
                    <label class="mt-10" v-if="MASTERDATA['IPDMRPTTTBA'] && routeType !== 'Obstetrics'">{{__t2(MASTERDATA['IPDMRPTTTBA'].ViName)}}:</label>
                    <div class="bg-grays-2" v-if="routeType !== 'Obstetrics'">
                      <md-input-text :readonly="true" :placeholder="__t('N/A')" v-if="MASTERDATA['IPDMRPTTTBA']" v-model="MASTERDATA['IPDMRPTTTBA']"  :hidelabel="true"/>
                    </div>
                    <hr/>
                  </div>
                  <div class="ml-10" v-if="routeType === 'Obstetrics'">
                    <Obstetrics2
                    :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
                    :DataSubmit="DataSubmit"
                    :readonly="true"
                    :box2="true"
                    class="mrb10"
                    :SyncPastMedicalHistory="SyncPastMedicalHistory"
                    :SyncFamilyMedicalHistory="SyncFamilyMedicalHistory"
                    />
                  </div>
                </div>
                <div id="MedicalRecord-part2-block4-view">
                  <div class="ml-10 mrb10" v-if="routeType === 'Obstetrics'">
                    <label v-if="MASTERDATA['IPDMRPTTTBA']">5. {{__t('Tóm tắt bệnh án')}}:</label>
                    <div class="bg-gray-2">
                      <textarea-autosize v-if="MASTERDATA['IPDMRPTTTBA']" :readonly="true" class="form-control mrb10" rows="3" placeholder="N/A" v-model="MASTERDATA['IPDMRPTTTBA'].Items[0].Value"/>
                    </div>
                  </div>
                  <label v-if="routeType === 'Obstetrics'">6. {{___t('Chẩn đoán khi vào khoa điều trị')}}:</label>
                  <label v-else-if="checkVer2()" class="block-title">V. {{___t('Chẩn đoán khi vào khoa điều trị')}}:</label>
                  <label v-else class="block-title">IV. {{___t('Chẩn đoán khi vào khoa điều trị')}}:</label>
                  <div class="ml-10">
                    <div class="bg-grays-2">
                      <div class="form-group" v-if="MASTERDATA['IPDMRPTICDC']">
                        <label>{{__label(MASTERDATA['IPDMRPTICDC'])}}:</label>
                        <icd10View :mdCode="'IPDMRPTICDC'" :single="true" v-model="MASTERDATA['IPDMRPTICDC'].Items[0].Value"/>
                      </div>
                      <label>{{__t2(MASTERDATA['IPDMRPTCDBC'].ViName)}}:</label>
                      <textarea-autosize :readonly="true" v-if="MASTERDATA['IPDMRPTCDBC']" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTCDBC'].Items[0].Value"/>
                      <br>
                      <div class="form-group" v-if="MASTERDATA['IPDMRPTICDP'] && MASTERDATA['IPDMRPTCDKT'] && MASTERDATA['IPDMRPTCDKT'].Items[1].Value">
                        <label>{{__label(MASTERDATA['IPDMRPTICDP'])}}:</label>
                        <icd10View :mdCode="'IPDMRPTICDP'" :single="true" v-model="MASTERDATA['IPDMRPTICDP'].Items[0].Value"/>
                      </div>
                      <Oncology2 v-if="routeType === 'Oncology'" class="mrb10" :readonly="true" :box2="true" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"/>
                      <label>{{__t2(MASTERDATA['IPDMRPTCDKT'].ViName)}}:</label>
                      <MdRadiosInput2 :readonly="true" class="mrb10" :value="MASTERDATA['IPDMRPTCDKT']" :noneDex="0"/>
                      <textarea-autosize :readonly="true" v-if="MASTERDATA['IPDMRPTCDKT'] && MASTERDATA['IPDMRPTCDKT'].Items[1].Value" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTCDKT'].Items[0].Value"/>
                      <PathWay
                        v-if="MASTERDATA['IPDMRPTICDC'] || MASTERDATA['IPDMRPTCDKT']"
                        :MainDisease="MASTERDATA['IPDMRPTICDC'].Items[0].Value"
                        :CoMorbidity="MASTERDATA['IPDMRPTICDP'].Items[0].Value"
                      />
                      <br>
                      <md-input-text :readonly="true" :placeholder="__t('N/A')" v-if="MASTERDATA['IPDMRPTPHBI']" v-model="MASTERDATA['IPDMRPTPHBI']"/>
                      <div class="flex-box" v-if="MASTERDATA['IPDMRPTTHPT'] && routeType !== 'Oncology' && routeType !== 'A01_039_050919_V' && routeType !== 'A01_040_050919_V'">
                        <CheckboxsValue :t2="true" class="mrr10" v-if="routeType !== 'Obstetrics'" :data="MASTERDATA['IPDMRPTTHPT'].Items" :showall="true" />
                        <div style="flex-grow: 1;" v-if="routeType !== 'Obstetrics'">
                          <textarea-autosize :readonly="true" class="form-control" rows="3" :placeholder="__t('N/A')" v-model="MASTERDATA['IPDMRPTTHPT'].Items[2].Value"/>
                        </div>
                      </div>
                      <Oncology2 class="mrb10" :readonly="true" v-if="routeType === 'Oncology'" :box3="true" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA"/>
                    </div>
                    <hr/>
                  </div>
                </div>
                <div id="MedicalRecord-part2-block5-view">
                  <label class="block-title" v-if="checkVer2()">VI. {{__t('Trạng thái bệnh nhân')}}: {{__label(DataSubmit.Status)}}</label>
                  <label class="block-title" v-else-if="routeType !== 'Obstetrics' && routeType">V. {{__t('Trạng thái bệnh nhân')}}: {{__label(DataSubmit.Status)}}</label>
                  <label class="block-title" v-else>V. {{__t('Trạng thái bệnh nhân')}}: {{__label(DataSubmit.Status)}}</label>
                  <IPDMRPG :readonly="true" :routeType="routeType" :status="activeWithStatus" v-model="DataSubmit.GeneralDatas"  :Version="DataSubmit.Version"/>
                </div>
              </template>
            </div>
        </div>
      </template>
      <div v-else style="padding: 20px;">
        <div class="text-center">
          <p>{{__t(getTextWarning())}}</p>
        </div>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import MedicalRecordMixinForm from '../Mixin.js'
import MixinMasterData from '@/mixins/masterdata.js'
import MedicalRecord from '@/services/IPD/MedicalRecord'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import Logs from '@/components/Logs.vue'
// import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
import VSelectBox from '@/components/VSelect.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
// import $ from 'jquery'
import _ from 'lodash'
import IPDMRPG from '../IPDMRPG.vue'
// import moment from 'moment'
import Neonatal from '@/pages/IPD/MedicalRecord/Page2CPN/Neonatal2.vue'
import NeonatalTable from '@/pages/IPD/MedicalRecord/Suport/NeonatalTable.vue'
import Obstetrics2 from '@/pages/IPD/MedicalRecord/Page2CPN/Obstetrics2.vue'
import Gynecological2 from '@/pages/IPD/MedicalRecord/Page2CPN/Gynecological2.vue'
import Oncology2 from '@/pages/IPD/MedicalRecord/Page2CPN/Oncology2.vue'
import IPDMRPT10002 from '../IPDMRPT10002.vue'
import Eye2 from '@/pages/IPD/MedicalRecord/Page2CPN/Eye2.vue'
import BMTIMMACH2 from '@/pages/IPD/MedicalRecord/Page2CPN/BMTIMMACH2.vue'
import PathWay from '@/components/global/PathWay.vue'
export default {
  name: 'IPDMedicalRecordPart2',
  mixins: [MixinMasterData, MedicalRecordMixinForm],
  props: ['routeType', 'VisitIdDrop', 'VisitId'],
  data () {
    return {
      isErrorPop: false,
      DataSubmit: null,
      loaded: false,
      HistoryOfAllergies: null,
      InitialAssessmentAllergies: null,
      SyncHistoryOfPresentIllness: null,
      SyncPastMedicalHistory: null,
      SyncFamilyMedicalHistory: null,
      IPDMRPTCACQ: [
        'IPDMRPTTUHO',
        'IPDMRPTHOHA',
        'IPDMRPTTIHO',
        'IPDMRPTTTNS',
        'IPDMRPTTHKI',
        'IPDMRPTCOXK',
        'IPDMRPTTAMH',
        'IPDMRPTRAHM',
        'IPDMRPTMMAT',
        'IPDMRPTNTDD'
      ],
      isFirst: true,
      icd10Code: [
        'IPDMRPTICDTANS',
        'IPDMRPTICDKANS',
        'IPDMRPTICDCANS',
        'IPDMRPTICDPANS',
        'IPDMRPT83',
        'IPDMRPT86',
        'IPDMRPT89',
        'IPDMRPT1005',
        'IPDMRPTR1255',
        'IPDMRPTL1255',
        'IPDMRPTR1145',
        'IPDMRPTL1145'
      ],
      IPDMRPTCACQA01_040_050919_V: [
        'IPDMRPTTHKI',
        'IPDMRPTTUHO',
        'IPDMRPTHOHA',
        'IPDMRPTTIHO',
        'IPDMRPT10021',
        'IPDMRPTCOXK',
        'IPDMRPTTTNS',
        'IPDMRPTNTDD'
      ],
      IPDMRPTCACQA01_039_050919_V: [
        'IPDMRPTTHKI',
        'IPDMRPTTUHO',
        'IPDMRPTHOHA',
        'IPDMRPTTIHO',
        'IPDMRPTCOXK',
        'IPDMRPT10021',
        'IPDMRPTTTNS',
        'IPDMRPTNTDD'
      ]
    }
  },
  components: {
    ListOfCurrentMedications,
    VSelectBox,
    VDateTimePicker,
    Logs,
    IPDMRPG,
    Neonatal,
    NeonatalTable,
    Obstetrics2,
    Gynecological2,
    Oncology2,
    IPDMRPT10002,
    Eye2,
    BMTIMMACH2,
    PathWay
  },
  watch: {
    watch: {
      VisitIdDrop () {
        this.getData()
      }
    }
  },
  mounted () {
    this.getSpecialities()
    this.getMasterDatas({Form: 'IPDMRPT'}, () => {
      this.getData()
    })
  },
  computed: {
    activeWithStatus: function () {
      return this.DataSubmit.Status ? this.DataSubmit.Status : ''
    },
    typeForm () {
      return this.MedicalRecordFormCode
    }
  },
  methods: {
    setBMI () {
      var weight = this.MASTERDATA['IPDMRPTCANA'].Items[0].Value ? parseFloat(this.MASTERDATA['IPDMRPTCANA'].Items[0].Value) : 0
      var height = this.MASTERDATA['IPDMRPTCICA'].Items[0].Value ? parseFloat(this.MASTERDATA['IPDMRPTCICA'].Items[0].Value) / 100 : 0
      this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value = (weight / (height * height)).toFixed(2)
    },
    getData () {
      new MedicalRecord().find('Part2/' + this.typeForm + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else if (this.icd10Code.includes(item.Code) || this.checkString(item.DataType, 'UploadFiles')) {
                  item.Value = this.JSONParse(exited.Value, true)
                } else {
                  item.Value = exited.Value
                  // if (!exited.Value && this.checkString(item.DataType, 'Text') && this.$store.state.account.Username === 'thangdc3') {
                  //   item.Value = item.ViName
                  // }
                }
              } else {
                // if (this.checkString(item.DataType, 'Text') && this.$store.state.account.Username === 'thangdc3') {
                //   item.Value = item.ViName
                // }
              }
            })
          }
        }
        if (this.MASTERDATA['IPDMRPTCDKT'] && this.MASTERDATA['IPDMRPTCDKT'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTCDKT'].Items[1].Value = true
        }
        this.changeData()
        if (response.IsNew) {
          if (this.MASTERDATA['IPDMRPT141'] && !this.MASTERDATA['IPDMRPT141'].Items[0].Value && response.NhipTho) {
            this.MASTERDATA['IPDMRPT141'].Items[0].Value = response.NhipTho
          }
        }
        this.setBMI()
        setTimeout(() => {
          this.loaded = true
        }, 100)
      }).catch(e => {
        console.log(e)
        this.loaded = true
        this.DataSubmit = false
        if (e.status === 404) {}
      })
    },
    getTextWarning () {
      return 'CHƯA CÓ BỆNH ÁN ' + this.MedicalRecordFormName + ' - BỆNH ÁN'
    },
    changeData () {
      if (this.routeType === 'Neonatal' && this.MASTERDATA['IPDMRPTTHPT']) {
        this.MASTERDATA['IPDMRPTTHPT'].Items[0].ViName = 'Thủ thuật sau sinh'
        this.MASTERDATA['IPDMRPTTHPT'].Items[0].EnName = 'Procedure after birth'
        this.MASTERDATA['IPDMRPTTHPT'].Items[1].ViName = 'Phẫu thuật sau sinh'
        this.MASTERDATA['IPDMRPTTHPT'].Items[1].EnName = 'Surgery after birth'
      }
      if (this.routeType === 'Neonatal' && this.MASTERDATA['IPDMRPTTHPT']) {
        this.MASTERDATA['IPDMRPTTHPT'].Items[1].ViName = 'Thủ thuật sau sinh'
        this.MASTERDATA['IPDMRPTTHPT'].Items[1].EnName = 'Procedure after birth'
      }
      if (this.routeType === 'Obstetrics' && this.MASTERDATA['IPDMRPTTISB']) {
        this.MASTERDATA['IPDMRPTTISB'].ViName = '3. Tiền sử bệnh'
        this.MASTERDATA['IPDMRPTTISB'].EnName = '3. Medical history'
      }
      if ((this.routeType === 'A01_195_050919_V' || this.routeType === 'A01_039_050919_V') && this.MASTERDATA['IPDMRPTCACQ']) {
        this.MASTERDATA['IPDMRPTCACQ'].ViName = '3. Các cơ quan'
        this.MASTERDATA['IPDMRPTCACQ'].EnName = '3. Other organs'
        this.MASTERDATA['IPDMRPTCXNC'].ViName = '4. Các xét nghiệm cận lâm sàng cần làm'
        this.MASTERDATA['IPDMRPTCXNC'].EnName = '4. Neccessary laboratory tests'
        this.MASTERDATA['IPDMRPTTTBA'].ViName = '5. Tóm tắt bệnh án'
        this.MASTERDATA['IPDMRPTTTBA'].EnName = '5. Summary'
      }
      if (this.routeType === 'A01_039_050919_V' || this.routeType === 'A01_040_050919_V') {
        this.MASTERDATA['IPDMRPTTHKI'].ViName = '+ Tâm thần, Thần kinh'
        this.MASTERDATA['IPDMRPTTHKI'].EnName = '+ Psychological, nervous system'
        this.MASTERDATA['IPDMRPTTTNS'].ViName = '+ Tiết niệu - Sinh dục'
        this.MASTERDATA['IPDMRPTTTNS'].EnName = '+ Nephro-urological system'
        this.MASTERDATA['IPDMRPTNTDD'].ViName = '+ Khác'
        this.MASTERDATA['IPDMRPTNTDD'].EnName = '+ Others'
      }
    },
    checkVer2 () {
      if (this.DataSubmit) {
        return (!this.routeType && this.DataSubmit.Version >= 2) || this.routeType === 'CardiovascularForm'
      }
      return false
    }
  }
}
</script>
