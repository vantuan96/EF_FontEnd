<template>
  <div id="OutpatientExaminationNoteForm">
    <div class="tbl-title">1. {{__t('Đánh giá chung')}} <span v-if="DataSubmit.IsTelehealth" class="note-text">{{__t('Lưu ý: Các thông số bên dưới là do NB cung cấp')}}</span></div>
    <div class="box box-table">
      <div class="box-body">
        <div class="row">
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENPUL']">
            <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENPUL'].Items">
              <label>{{__label(item)}} <i class="unit-label">({{item.Note}})</i></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENTEM']">
            <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENTEM'].Items">
              <label>{{__label(item)}} <i class="unit-label">({{item.Note}})</i></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENBP0']">
            <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENBP0'].Items">
              <label>{{__label(item)}} <i class="unit-label">({{item.Note}})</i></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENSPO']">
            <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENSPO'].Items">
              <label>{{__label(item)}} <i class="unit-label">({{item.Note}})</i></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENRR0']">
            <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENRR0'].Items">
              <label>{{__label(item)}} <i class="unit-label">({{item.Note}})</i></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENHEI']">
            <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENHEI'].Items">
              <label>{{__label(item)}} <i class="unit-label">{{item.Note}}</i></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENWEI']">
            <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENWEI'].Items">
              <label>{{__label(item)}} <i class="unit-label">{{item.Note}}</i></label>
              <div class="fake-input disable">{{item.Value || 'N/A'}}</div>
              <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENWEI']">
            <div class="form-group">
              <label>BMI <i class="unit-label"></i></label>
              <input class="form-control" readonly :value="caculateBmi()">
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENWEI']">
            <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENWEI'].Items">
              <label>{{__t("Phòng khám")}} <i class="unit-label">{{item.Note}}</i></label>
              <div class="fake-input disable">{{DataSubmit.Service || 'N/A'}}</div>
            </div>
          </div>
          <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENWEI']">
            <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENWEI'].Items">
              <label>{{__t("Bác sĩ khám")}} <i class="unit-label">{{item.Note}}</i></label>
              <div class="fake-input disable"><ad-Info :ad="DataSubmit.PrimaryDoctor.Username"/></div>
            </div>
          </div>
        </div>
        <div class="row">
          <!-- <div class="col-md-6">
            <div class="form-group">
              <label>Dịch vụ</label>
              <div class="fake-input disable">{{DataSubmit.Service || 'N/A'}}</div>
            </div>
          </div> -->
          <div class="col-md-6">
            <div class="form-group">
              <label>Thời gian khám</label>
              <div class="fake-input disable">{{(DataSubmit.ExaminationTime || 'N/A') | formatDateTimeObj}}</div>
            </div>
          </div>
        </div>
        <!-- Nơi giới thiệu -->
        <div class="row" v-if="VisitVersion >= 12">
          <div class="col-md-12">
            <div class="form-group">
              <label>
                {{__label(MASTERDATA['OPDOENPT603'])}}
              </label>
              <MDRadio v-model="MASTERDATA['OPDOENPT603']" :readonly="true"/>
              <br>
              <label v-if="MASTERDATA['OPDOENPT603'].Items[0].Value" style="margin: 15px 6px 0 0">{{__label(MASTERDATA['OPDOENPT606'].Items[1])}}</label>
              <MDRadio v-if="MASTERDATA['OPDOENPT603'].Items[0].Value && MASTERDATA['OPDOENPT606'].Items[2].Value" v-model="MASTERDATA['OPDOENPT606']" :readonly="true"/>
              <FakeInput class="mt-5" style="margin-left: 0" v-if="MASTERDATA['OPDOENPT603'].Items[0].Value && !MASTERDATA['OPDOENPT606'].Items[2].Value" v-model="MASTERDATA['OPDOENPT606'].Items[1].Value"/>
            </div>
          </div>
        </div>
        <md-input-text v-model="MASTERDATA['OPDOENCC0']" :readonly="true"/>
        <template v-if="VisitVersion < 12">
          <md-input-text  v-if="MASTERDATA['OPDOENPMH'] && !showWithClinic('FreeTextOnly-000')" v-model="MASTERDATA['OPDOENPMH']" :readonly="true"/>
          <template v-if="MASTERDATA['OPDOENPMH'] && showWithClinic('FreeTextOnly-000')">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group bg-gray-2">
                  <label>{{__t('Tiền sử bệnh')}}</label>
                </div>
              </div>
            </div>
            <md-input-text v-model="MASTERDATA[c]" :readonly="true" :data="c" :key="'OPDOENTSSK' + j" v-for="(c,j) in OPDOENTSSK" v-if="MASTERDATA[c] && showWithClinic(MASTERDATA[c].Clinic)"/>
          </template>
        </template>
        <template v-else>
          <label>{{__t('Tiền sử bệnh')}}</label>
          <div class="box box-table" style="background: #eceaea;" v-if="!showWithClinic('FreeTextOnly-000')">
            <div class="box-body">
              <label v-if="VisitVersion >= 12">{{__t2('+ Bản thân-mdcGyy')}}:</label>
              <p class="fake-input disable" style="margin: 0; margin-bottom: 4px">{{MASTERDATA['OPDOENPMH'].Items[0].Value || 'N/A'}}</p>
              <label v-if="VisitVersion >= 12">{{__t2('+ Gia đình-mdcGyy')}}:</label>
              <p class="fake-input disable" style="margin: 0">{{MASTERDATA['OPDOENPT621'].Items[0].Value || 'N/A'}}</p>
            </div>
          </div>
          <div class="box box-table" style="background: #eceaea;" v-if="showWithClinic('FreeTextOnly-000')">
            <div class="box-body">
              <label v-if="VisitVersion >= 12">{{__t2('+ Bản thân-mdcGyy')}}:</label>
              <md-input-text v-model="MASTERDATA[c]" :readonly="true" :data="c" :key="'OPDOENTSSK' + j" v-for="(c,j) in OPDOENTSSK" v-if="MASTERDATA[c] && showWithClinic(MASTERDATA[c].Clinic)"/>
              <label v-if="VisitVersion >= 12">{{__t2('+ Gia đình-mdcGyy')}}:</label>
              <p class="fake-input disable" style="margin: 0">{{MASTERDATA['OPDOENPT621'].Items[0].Value || 'N/A'}}</p>
            </div>
          </div>
        </template>
        <md-input-text v-model="MASTERDATA['OPDOENHOA']" :readonly="true"/>
        <md-input-text v-model="MASTERDATA['OPDOENHPI']" :readonly="true"/>
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
        <template v-if="DataSubmit.Version >= 2 && VisitVersion >= 10">
          <MDRadio v-model="MASTERDATA['OPDOENVH600']" :readonly="true"/>
          <list-of-current-medications
            v-if="MASTERDATA['OPDOENVH600'].Items[1].Value"
            class="mt-10"
            ref="ListOfCurrentMedications"
            :Type="'OPD-PatientMedicationList'"
            :VisitTypeGroupCode="'OPD'"
            :ShowDelete="true"
            :RealOnly="true"
            :VisitId="_VisitId"
          />
        </template>
        <template v-else>
          <list-of-current-medications
            ref="ListOfCurrentMedications"
            :Type="'OPD-PatientMedicationList'"
            :VisitTypeGroupCode="'OPD'"
            :ShowDelete="true"
            :RealOnly="true"
            :VisitId="_VisitId"
          />
        </template>
      </div>
    </div>
    <div class="box box-table">
      <div class="box-body">
        <div class="kls-block" v-if="!DataSubmit.IsTelehealth && !showWithClinic('Normal') && !onlyClinic('FreeTextOnly-000')">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__t('Khám lâm sàng (Hiển thị trên báo cáo y tế)')}}</label>
              </div>
            </div>
          </div>
          <div class="box box-table" style="background: #eceaea;" v-if="!showWithClinic('MultiSelect-002')">
            <div class="box-body">
              <div class="row" v-if="MASTERDATA['OPDOENNLHTE'] && showWithClinic(MASTERDATA['OPDOENNLHTE'].Clinic)">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__t('Đối tượng khám')}}:</label>
                    <MDRadioView :data="MASTERDATA['OPDOENNLHTE'].Items" />
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['OPDOENTUOI'] && showWithClinic(MASTERDATA['OPDOENTUOI'].Clinic)">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__t('Độ tuổi')}}:</label>
                    <MDRadioView :data="MASTERDATA['OPDOENTUOI'].Items" />
                  </div>
                </div>
              </div>
              <template>
                <div class="row" v-if="MASTERDATA['OPDOENBNTHPT'] && showWithClinic(MASTERDATA['OPDOENBNTHPT'].Clinic)">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>{{__label(MASTERDATA['OPDOENBNTHPT'])}} <i class="unit-label">{{MASTERDATA['OPDOENBNTHPT'].Note}}</i></label>
                      <MDRadioView :data="MASTERDATA['OPDOENBNTHPT'].Items" />
                    </div>
                  </div>
                </div>
              </template>
              <div class="row" v-if="MASTERDATA['OPDOENDG'] && showWithClinic(MASTERDATA['OPDOENDG'].Clinic)">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDOENDG'])}} <i class="unit-label">{{MASTERDATA['OPDOENDG'].Note}}</i></label>
                    <MDRadioView :data="MASTERDATA['OPDOENDG'].Items" :DataType="'CheckBox'" />
                  </div>
                </div>
              </div>
              <md-input-text :readonly="true"
                v-if="MASTERDATA['OPDOENKTT'] &&
                showWithClinic('FreeTextOnly-001,FreeTextOnly-005,MultiSelect-001,RadioYesNo-001')"
                v-model="MASTERDATA['OPDOENKTT']"/>
              <md-input-text :readonly="true"
                v-if="MASTERDATA['OPDOENKCK'] &&
                showWithClinic('FreeTextOnly-001,FreeTextOnly-005,MultiSelect-001,RadioYesNo-001')"
                v-model="MASTERDATA['OPDOENKCK']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTP1'] && this.checkShowOPDOENKTP1()" v-model="MASTERDATA['OPDOENKTP1']"/>
              <md-input-text :readonly="true"
                v-if="MASTERDATA['OPDOENKCBPK'] &&
                showWithClinic('FreeTextOnly-001,FreeTextOnly-005,MultiSelect-001,RadioYesNo-001')"
                v-model="MASTERDATA['OPDOENKCBPK']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTSKN'] && showWithClinic(MASTERDATA['OPDOENTSKN'].Clinic) && !showWithClinic('FreeTextOnly-000')" v-model="MASTERDATA['OPDOENTSKN']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTSK'] && showWithClinic(MASTERDATA['OPDOENTSK'].Clinic) && !showWithClinic('FreeTextOnly-000')" v-model="MASTERDATA['OPDOENTSK']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENNGNG'] && showWithClinic(MASTERDATA['OPDOENNGNG'].Clinic)" v-model="MASTERDATA['OPDOENNGNG']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENNTTTXH'] && showWithClinic(MASTERDATA['OPDOENNTTTXH'].Clinic)" v-model="MASTERDATA['OPDOENNTTTXH']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENHVTTCY'] && showWithClinic(MASTERDATA['OPDOENHVTTCY'].Clinic)" v-model="MASTERDATA['OPDOENHVTTCY']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENCGXG'] && showWithClinic(MASTERDATA['OPDOENCGXG'].Clinic)" v-model="MASTERDATA['OPDOENCGXG']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTTPV'] && showWithClinic(MASTERDATA['OPDOENKTTPV'].Clinic)" v-model="MASTERDATA['OPDOENKTTPV']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENMSTTLCT'] && showWithClinic(MASTERDATA['OPDOENMSTTLCT'].Clinic)" v-model="MASTERDATA['OPDOENMSTTLCT']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOEN526'] && showWithClinic('FreeTextOnly-002')" v-model="MASTERDATA['OPDOEN526']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTTTHGC'] && showWithClinic(MASTERDATA['OPDOENKTTTHGC'].Clinic)" v-model="MASTERDATA['OPDOENKTTTHGC']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENDGCGNM'] && showWithClinic(MASTERDATA['OPDOENDGCGNM'].Clinic)" v-model="MASTERDATA['OPDOENDGCGNM']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENDGDNM'] && showWithClinic(MASTERDATA['OPDOENDGDNM'].Clinic)" v-model="MASTERDATA['OPDOENDGDNM']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKLN'] && showWithClinic(MASTERDATA['OPDOENKLN'].Clinic)" v-model="MASTERDATA['OPDOENKLN']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTM'] && showWithClinic(MASTERDATA['OPDOENKTM'].Clinic)" v-model="MASTERDATA['OPDOENKTM']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKHH'] && showWithClinic(MASTERDATA['OPDOENKHH'].Clinic)" v-model="MASTERDATA['OPDOENKHH']">
              </md-input-text>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENBHC'] && showWithClinic(MASTERDATA['OPDOENBHC'].Clinic)" v-model="MASTERDATA['OPDOENBHC']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKYT'] && showWithClinic(MASTERDATA['OPDOENKYT'].Clinic)" v-model="MASTERDATA['OPDOENKYT']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKCGTG'] && showWithClinic(MASTERDATA['OPDOENKCGTG'].Clinic)" v-model="MASTERDATA['OPDOENKCGTG']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTD'] && showWithClinic(MASTERDATA['OPDOENKTD'].Clinic)" v-model="MASTERDATA['OPDOENKTD']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKCX'] && showWithClinic(MASTERDATA['OPDOENKCX'].Clinic)" v-model="MASTERDATA['OPDOENKCX']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKHD'] && showWithClinic(MASTERDATA['OPDOENKHD'].Clinic)" v-model="MASTERDATA['OPDOENKHD']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKCY'] && showWithClinic(MASTERDATA['OPDOENKCY'].Clinic)" v-model="MASTERDATA['OPDOENKCY']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTN'] && showWithClinic(MASTERDATA['OPDOENKTN'].Clinic)" v-model="MASTERDATA['OPDOENKTN']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTRT'] && showWithClinic(MASTERDATA['OPDOENKTRT'].Clinic)" v-model="MASTERDATA['OPDOENKTRT']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTTL'] && showWithClinic(MASTERDATA['OPDOENTTL'].Clinic)" v-model="MASTERDATA['OPDOENTTL']"/>
              <template v-if="showWithClinic('FreeTextOnly-007')">
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKNKT'] && showWithClinic(MASTERDATA['OPDOENKNKT'].Clinic)" v-model="MASTERDATA['OPDOENKNKT']"/>
              </template>
              <template v-if="MASTERDATA['OPDOENDG'] && MASTERDATA['OPDOENDG'].Items[0].Value === true">
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENMCN'] && showWithClinic(MASTERDATA['OPDOENMCN'].Clinic)" v-model="MASTERDATA['OPDOENMCN']"/>
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENDCT'] && showWithClinic(MASTERDATA['OPDOENDCT'].Clinic)" v-model="MASTERDATA['OPDOENDCT']"/>
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTDTT'] && showWithClinic(MASTERDATA['OPDOENTDTT'].Clinic)" v-model="MASTERDATA['OPDOENTDTT']"/>
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTHCVD'] && showWithClinic(MASTERDATA['OPDOENTHCVD'].Clinic)" v-model="MASTERDATA['OPDOENTHCVD']"/>
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENPHCN'] && showWithClinic(MASTERDATA['OPDOENPHCN'].Clinic)" v-model="MASTERDATA['OPDOENPHCN']"/>
              </template>
              <template v-if="MASTERDATA['OPDOENDG'] && MASTERDATA['OPDOENDG'].Items[1].Value === true">
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENCNHH'] && showWithClinic(MASTERDATA['OPDOENCNHH'].Clinic)" v-model="MASTERDATA['OPDOENCNHH']"/>
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENSCD'] && showWithClinic(MASTERDATA['OPDOENSCD'].Clinic)" v-model="MASTERDATA['OPDOENSCD']"/>
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKNGS'] && showWithClinic(MASTERDATA['OPDOENKNGS'].Clinic)" v-model="MASTERDATA['OPDOENKNGS']"/>
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTDNT'] && showWithClinic(MASTERDATA['OPDOENTDNT'].Clinic)" v-model="MASTERDATA['OPDOENTDNT']"/>
              </template>
              <template v-if="MASTERDATA['OPDOENDG'] && MASTERDATA['OPDOENDG'].Items[2].Value === true">
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKNGT'] && showWithClinic(MASTERDATA['OPDOENKNGT'].Clinic)" v-model="MASTERDATA['OPDOENKNGT']"/>
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTTRLN'] && showWithClinic(MASTERDATA['OPDOENTTRLN'].Clinic)" v-model="MASTERDATA['OPDOENTTRLN']"/>
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENNTKG'] && showWithClinic(MASTERDATA['OPDOENNTKG'].Clinic)" v-model="MASTERDATA['OPDOENNTKG']"/>
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENDVTH'] && showWithClinic(MASTERDATA['OPDOENDVTH'].Clinic)" v-model="MASTERDATA['OPDOENDVTH']"/>
                <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENDCDL'] && showWithClinic(MASTERDATA['OPDOENDCDL'].Clinic)" v-model="MASTERDATA['OPDOENDCDL']"/>
              </template>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENCCQK'] && showWithClinic(MASTERDATA['OPDOENCCQK'].Clinic)" v-model="MASTERDATA['OPDOENCCQK']"/>
              <!-- <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTMH'] && showWithClinic(MASTERDATA['OPDOENKTMH'].Clinic)" v-model="MASTERDATA['OPDOENKTMH']"/> -->
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKDD'] && showWithClinic(MASTERDATA['OPDOENKDD'].Clinic)" v-model="MASTERDATA['OPDOENKDD']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTC'] && showWithClinic(MASTERDATA['OPDOENTC'].Clinic)" v-model="MASTERDATA['OPDOENTC']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENPTVD'] && showWithClinic(MASTERDATA['OPDOENPTVD'].Clinic)" v-model="MASTERDATA['OPDOENPTVD']"/>
              <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENPTTT'] && showWithClinic(MASTERDATA['OPDOENPTTT'].Clinic)" v-model="MASTERDATA['OPDOENPTTT']"/>
            </div>
          </div>
          <div class="box box-table" style="background: #eceaea;" v-else>
            <div class="box-body">
              <!-- MultiSelect-002 is PK tâm lý - trung tâm y học tái tạo -->
              <div class="row">
                <div class="col-md-12" v-if="MASTERDATA['OPDOENYTD']">
                  <div class="form-group">
                    <label>Loại khám:  </label>
                    <MDRadioView :data="MASTERDATA['OPDOENYTD'].Items" :indexs="[1,2,3]" />
                  </div>
                </div>
              </div>
              <!-- Kham nguoi lon -->
              <template v-if="MASTERDATA['OPDOENYTD'].Items[2].Value && !MASTERDATA['OPDOENYTD'].Items[1].Value && !MASTERDATA['OPDOENYTD'].Items[3].Value">
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0011']"
                  v-model="MASTERDATA['OPDOENTK0011']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0002']"
                  v-model="MASTERDATA['OPDOENTK0002']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0007']"
                  v-model="MASTERDATA['OPDOENTK0007']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0014']"
                  v-model="MASTERDATA['OPDOENTK0014']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0013']"
                  v-model="MASTERDATA['OPDOENTK0013']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0006']"
                  v-model="MASTERDATA['OPDOENTK0006']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0004']"
                  v-model="MASTERDATA['OPDOENTK0004']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0005']"
                  v-model="MASTERDATA['OPDOENTK0005']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOEN514']"
                  v-model="MASTERDATA['OPDOEN514']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOEN516']"
                  v-model="MASTERDATA['OPDOEN516']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0009']"
                  v-model="MASTERDATA['OPDOENTK0009']"
                />
              </template>
              <!-- kham tre em -->
              <template v-else-if="MASTERDATA['OPDOENYTD'].Items[1].Value && !MASTERDATA['OPDOENYTD'].Items[2].Value && !MASTERDATA['OPDOENYTD'].Items[3].Value">
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0001']"
                  v-model="MASTERDATA['OPDOENTK0001']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0002']"
                  v-model="MASTERDATA['OPDOENTK0002']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0003']"
                  v-model="MASTERDATA['OPDOENTK0003']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0004']"
                  v-model="MASTERDATA['OPDOENTK0004']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0005']"
                  v-model="MASTERDATA['OPDOENTK0005']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0006']"
                  v-model="MASTERDATA['OPDOENTK0006']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0007']"
                  v-model="MASTERDATA['OPDOENTK0007']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0008']"
                  v-model="MASTERDATA['OPDOENTK0008']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0009']"
                  v-model="MASTERDATA['OPDOENTK0009']"
                />
              </template>
              <!-- kham bai nao -->
              <template v-else-if="MASTERDATA['OPDOENYTD'].Items[3].Value && !MASTERDATA['OPDOENYTD'].Items[2].Value && !MASTERDATA['OPDOENYTD'].Items[1].Value">
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0001']"
                  v-model="MASTERDATA['OPDOENTK0001']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0002']"
                  v-model="MASTERDATA['OPDOENTK0002']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0008']"
                  v-model="MASTERDATA['OPDOENTK0008']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0009']"
                  v-model="MASTERDATA['OPDOENTK0009']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0020']"
                  v-model="MASTERDATA['OPDOENTK0020']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0023']"
                  v-model="MASTERDATA['OPDOENTK0023']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0024']"
                  v-model="MASTERDATA['OPDOENTK0024']"
                />
              </template>
              <template v-else>
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0001'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[3].Value)"
                  v-model="MASTERDATA['OPDOENTK0001']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0002'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value || MASTERDATA['OPDOENYTD'].Items[3].Value)"
                  v-model="MASTERDATA['OPDOENTK0002']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0003'] && MASTERDATA['OPDOENYTD'].Items[1].Value"
                  v-model="MASTERDATA['OPDOENTK0003']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0004'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value)"
                  v-model="MASTERDATA['OPDOENTK0004']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0005'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value)"
                  v-model="MASTERDATA['OPDOENTK0005']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0006'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value)"
                  v-model="MASTERDATA['OPDOENTK0006']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0007'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value)"
                  v-model="MASTERDATA['OPDOENTK0007']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0008'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[3].Value)"
                  v-model="MASTERDATA['OPDOENTK0008']"
                />
                <md-input-text :readonly="true"
                  v-if="MASTERDATA['OPDOENTK0009'] && (MASTERDATA['OPDOENYTD'].Items[1].Value || MASTERDATA['OPDOENYTD'].Items[2].Value || MASTERDATA['OPDOENYTD'].Items[3].Value)"
                  v-model="MASTERDATA['OPDOENTK0009']"
                />
                <template v-if="MASTERDATA['OPDOENYTD'].Items[2].Value">
                  <template>
                    <md-input-text :readonly="true"
                      v-if="MASTERDATA['OPDOENTK0011']"
                      v-model="MASTERDATA['OPDOENTK0011']"
                    />
                    <md-input-text :readonly="true"
                      v-if="MASTERDATA['OPDOENTK0014']"
                      v-model="MASTERDATA['OPDOENTK0014']"
                    />
                    <md-input-text :readonly="true"
                      v-if="MASTERDATA['OPDOENTK0013']"
                      v-model="MASTERDATA['OPDOENTK0013']"
                    />
                    <md-input-text :readonly="true"
                      v-if="MASTERDATA['OPDOEN514']"
                      v-model="MASTERDATA['OPDOEN514']"
                    />
                    <md-input-text :readonly="true"
                      v-if="MASTERDATA['OPDOEN516']"
                      v-model="MASTERDATA['OPDOEN516']"
                    />
                  </template>
                </template>
                <template v-if="MASTERDATA['OPDOENYTD'].Items[3].Value">
                  <template>
                    <md-input-text :readonly="true"
                      v-if="MASTERDATA['OPDOENTK0020']"
                      v-model="MASTERDATA['OPDOENTK0020']"
                    />
                    <md-input-text :readonly="true"
                      v-if="MASTERDATA['OPDOENTK0023']"
                      v-model="MASTERDATA['OPDOENTK0023']"
                    />
                    <md-input-text :readonly="true"
                      v-if="MASTERDATA['OPDOENTK0024']"
                      v-model="MASTERDATA['OPDOENTK0024']"
                    />
                  </template>
                </template>
              </template>
            </div>
          </div>
        </div>
        <md-input-text v-if="MASTERDATA['OPDOENCEF'] && (!DataSubmit.IsTelehealth && (showWithClinic('Normal') || onlyClinic('FreeTextOnly-000')))" v-model="MASTERDATA['OPDOENCEF']" :readonly="true"/>
        <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENSDBP'] && DataSubmit.IsTelehealth" v-model="MASTERDATA['OPDOENSDBP']"/>
        <label>{{__label(MASTERDATA['OPDOENID0'])}}</label>
        <icd10-view v-if="MASTERDATA['OPDOENICD01']" v-model="MASTERDATA['OPDOENICD01'].Items[0].Value" />
        <md-input-text :hidelabel="true" :readonly="true" v-if="MASTERDATA['OPDOENID0']" v-model="MASTERDATA['OPDOENID0']"/>
        <PathWay v-if="MASTERDATA['OPDOENID0']" :MainDisease="MASTERDATA['OPDOENICD01'].Items[0].Value"/>
        <label>{{__label(MASTERDATA['OPDOENPT0'])}}</label>
        <md-input-text :hidelabel="true" :readonly="true" v-if="MASTERDATA['OPDOENPT0']" v-model="MASTERDATA['OPDOENPT0']"/>
        <div class="row">
          <div class="col-md-12" v-if="MASTERDATA['OPDOENDD0']">
            <div class="form-group">
              <label>{{__label(MASTERDATA['OPDOENDD0'])}} <i class="unit-label">{{MASTERDATA['OPDOENDD0'].Note}}</i></label>
              <icd10-view v-if="MASTERDATA['OPDOENICD']" v-model="MASTERDATA['OPDOENICD'].Items[0].Value" />
              <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENDD0'].Items">
                <p class="fake-input disable" style="margin: 0" v-if="item.DataType === 'Text'" :data="item" :key="index">{{item.Value || noDataMsg()}}</p>
              </div>
            </div>
          </div>
        </div>
        <label v-if="MASTERDATA['OPDOENICD']">{{__label(MASTERDATA['OPDOENICD'].Items[1])}}</label>
        <icd10-view v-if="MASTERDATA['OPDOENICD']" v-model="MASTERDATA['OPDOENICD'].Items[1].Value" />
      </div>
    </div>
    <!-- Đã xử lý thuốc, chăm sóc -->
    <div class="box box-table" v-if="VisitVersion >= 12">
      <div class="box-body">
        <label>
          {{__label(MASTERDATA['OPDOENPT610'])}}
        </label>
        <MDRadio v-model="MASTERDATA['OPDOENPT610']" :readonly="true"/>
        <FakeInput class="mt-10" v-if="MASTERDATA['OPDOENPT610'].Items[1].Value" v-model="MASTERDATA['OPDOENPT610'].Items[2].Value"/>
        <!-- ss -->
      </div>
    </div>
    <div class="tbl-title">2. {{__t('Điều trị')}}</div>
    <div class="box box-table">
      <div class="box-body">
        <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTP0']" v-model="MASTERDATA['OPDOENTP0']"/>
        <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENRFU']" v-model="MASTERDATA['OPDOENRFU']"/>
        <div class="row">
          <div class="col-md-12" v-if="MASTERDATA['OPDOENDOR']">
            <div class="form-group">
              <label>{{__label(MASTERDATA['OPDOENDOR'])}} <i class="unit-label">{{MASTERDATA['OPDOENDOR'].Note}}</i></label>
              <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENDOR'].Items">
                <p class="fake-input disable" style="margin: 0">{{item.Value || 'N/A'}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box-body" style="margin-top: -15px" v-if="VisitVersion >= 12">
        <label>
          {{__label(MASTERDATA['OPDOENPT614'])}}
        </label>
        <MDRadio v-model="MASTERDATA['OPDOENPT614']" :readonly="true"/>
        <FakeInput class="mt-10" v-if="MASTERDATA['OPDOENPT614'].Items[4].Value" v-model="MASTERDATA['OPDOENPT614'].Items[5].Value"/>
      </div>
    </div>
    <div v-if="DataSubmit.Status && (DataSubmit.Status.Code === 'OPDAM')">
      <div class="tbl-title">{{__t('Nhập nội trú')}}</div>
      <div class="box box-table">
        <div class="box-body">
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENRFT'] && DataSubmit.IsUseHandOverCheckList" v-model="MASTERDATA['OPDOENRFT']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENFP1'] && DataSubmit.IsUseHandOverCheckList" v-model="MASTERDATA['OPDOENFP1']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENPS1'] && DataSubmit.IsUseHandOverCheckList" v-model="MASTERDATA['OPDOENPS1']"/>
          <div class="row">
            <div class="col-md-12" v-if="MASTERDATA['OPDOENREC']">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDOENREC'])}} <i class="unit-label">{{MASTERDATA['OPDOENREC'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENREC'].Items">
                  <v-select-box :search="true" class="full-w select-boox-full-w" v-model="item.Value" :items="getMDSPECIALITIESS"/>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-2 mt-10" style="display: flex;">
            <input :readonly="true" type="checkbox" style="display: inline !important; height: 25px; width: 25px; margin-right: 6px;" v-model="DataSubmit.IsUseHandOverCheckList">
            <b style="display: contents !important; line-height: 2.5;">{{__t('Sử dụng biên bản bàn giao NB')}}</b>
          </div>
        </div>
      </div>
    </div>
    <div v-if="DataSubmit.Status && (DataSubmit.Status.Code === 'OPDTTE')">
      <div class="tbl-title">{{__t('Nhập cấp cứu')}}</div>
      <div class="box box-table">
        <div class="box-body">
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENRFT2'] && DataSubmit.IsUseHandOverCheckList" v-model="MASTERDATA['OPDOENRFT2']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENFP2'] && DataSubmit.IsUseHandOverCheckList" v-model="MASTERDATA['OPDOENFP2']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENPS2'] && DataSubmit.IsUseHandOverCheckList" v-model="MASTERDATA['OPDOENPS2']"/>
          <div class="row">
            <div class="col-md-12" v-if="MASTERDATA['OPDOENREC2']">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDOENREC2'])}} <i class="unit-label">{{MASTERDATA['OPDOENREC2'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENREC2'].Items">
                  <v-select-box :search="true" class="full-w select-boox-full-w" v-model="item.Value" :items="getMDSPECIALITIESS"/>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-2 mt-10"  style="display: flex;">
            <input :readonly="true" type="checkbox" style="display: inline !important; height: 25px; width: 25px; margin-right: 6px;" v-model="DataSubmit.IsUseHandOverCheckList">
            <b style="display: contents !important; line-height: 2.5;">{{__t('Sử dụng biên bản bàn giao NB')}}</b>
          </div>
        </div>
      </div>
    </div>
    <div v-if="DataSubmit.Status && (DataSubmit.Status.Code === 'OPDIHT')">
      <div class="tbl-title">{{__t('Chuyển viện')}}</div>
      <div class="box box-table">
        <div class="box-body">
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENRH1']" v-model="MASTERDATA['OPDOENRH1']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENRFT3']" v-model="MASTERDATA['OPDOENRFT3']"/>
          <div class="row">
            <div class="col-md-12" v-if="MASTERDATA['OPDOENTOT']">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDOENTOT'])}} <i class="unit-label">{{MASTERDATA['OPDOENTOT'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENTOT'].Items">
                  <div class="fake-input disable">{{item.Value}}</div>
                </div>
              </div>
            </div>
          </div>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENSBC']" v-model="MASTERDATA['OPDOENSBC']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTM1']" v-model="MASTERDATA['OPDOENTM1']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENME0']" v-model="MASTERDATA['OPDOENME0']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENDU0']" v-model="MASTERDATA['OPDOENDU0']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENPSA']" v-model="MASTERDATA['OPDOENPSA']"/>
        </div>
      </div>
    </div>
    <div v-if="DataSubmit.Status && (DataSubmit.Status.Code === 'OPDUDT')">
      <div class="tbl-title">{{__t('Chuyển tuyến')}}</div>
      <div class="box box-table">
        <div class="box-body">
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENRH0']" v-model="MASTERDATA['OPDOENRH0']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENMTU']" v-model="MASTERDATA['OPDOENMTU']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENPS0']" v-model="MASTERDATA['OPDOENPS0']"/>
          <div class="row">
            <div class="col-md-12" v-if="MASTERDATA['OPDOENRFT1']">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDOENRFT1'])}} <i class="unit-label">{{MASTERDATA['OPDOENRFT1'].Note}}</i></label>
                <div class="group-radio">
                  <MDRadioView :data="MASTERDATA['OPDOENRFT1'].Items" />
                </div>
              </div>
            </div>
          </div>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTM0']" v-model="MASTERDATA['OPDOENTM0']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENNTM']" v-model="MASTERDATA['OPDOENNTM']"/>
          <div class="row">
            <div class="col-md-12" v-if="MASTERDATA['OPDOENTD0']">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDOENTD0'])}} <i class="unit-label">{{MASTERDATA['OPDOENTD0'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENTD0'].Items">
                  <div class="fake-input disable">{{item.Value}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OutpatientExaminationNoteInfo :DataSubmit="DataSubmit"/>
    <end-os-copy
      v-if="MASTERDATA['OPDOENTFEOC']"
      :readonly="true"
      v-model="MASTERDATA['OPDOENTFEOC']"
      :EOCInfo="DataSubmit.EOCInfo"
    />
    <!-- Xác nhận bệnh tật -->
    <div v-if="MASTERDATA['OPDOENXNBT'] && VisitVersion >= 12">
      <div class="box box-table">
        <div class="box-body">
          <label>
            {{__label(MASTERDATA['OPDOENXNBT'])}}
          </label>
          <MDRadio v-model="MASTERDATA['OPDOENXNBT']" :readonly="true"/>
        </div>
      </div>
    </div>
    <div>
      <div class="tbl-title">{{__t('Trạng thái bệnh nhân')}}</div>
      <div class="box box-table">
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <b>{{__label(DataSubmit.Status)}}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group" v-if="DataSubmit && DataSubmit.Status && DataSubmit.Status.Code === 'OPDWR'">
      <label>{{__t('Ngày hẹn trả KQ')}}</label>
      <template v-if="DataSubmit && DataSubmit.AppointmentDateResult && DataSubmit.AppointmentDateResult !== 'Invalid date'">
        <span class="fake-input disable no-wrap " v-if="DataSubmit.AppointmentDateResult.includes('T')">{{DataSubmit.AppointmentDateResult | formatDateWithoutSecon}}</span>
        <span class="fake-input disable no-wrap " v-else>{{DataSubmit.AppointmentDateResult}}</span>
      </template>
      <template v-else>
        <span class="fake-input disable no-wrap ">N/A</span>
      </template>
    </div>
  </div>
</template>
<script>
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import VSelectBox from '@/components/VSelectDisplay.vue'
import OutpatientExaminationNoteInfo from '@/components/OPD/OutpatientExaminationNoteDoctorInfo.vue'
import Diorpt from '@/components/OPD/DI0RPT.vue'
import EIOService from '@/services/IPD/EIOService'
import PathWay from '@/components/global/PathWay.vue'

const EndOsCopy = () => import('@/components/Endoscopy.vue')
export default {
  name: 'Ver2View',
  mixins: [],
  // props: ['DataSubmit', 'MASTERDATA', 'VisitTypeCode', 'VisitId', 'VisitVersion'],
  props: ['DataSubmit', 'MASTERDATA', 'VisitTypeCode', 'VisitId'],
  components: {
    Diorpt,
    ListOfCurrentMedications,
    VSelectBox,
    OutpatientExaminationNoteInfo,
    EndOsCopy,
    PathWay
  },
  data () {
    return {
      OPDOENDG: [
        'OPDOENMCN', 'OPDOENDCT', 'OPDOENTDTT', 'OPDOENTHCVD', 'OPDOENPHCN'
      ],
      OPDOENTSSK: ['OPDOENTSSK', 'OPDOENTSKN', 'OPDOENTSK'],
      loaded: false,
      isNew: false,
      collapseId: '',
      open: false,
      pId: null,
      message: null,
      isErrorPop: false,
      hasData: false,
      VisitVersion: null
    }
  },
  computed: {
    getMDSPECIALITIESS: function () {
      var status = ''
      if (this.DataSubmit.Status) {
        status = this.DataSubmit.Status.Code === 'OPDAM' ? 'IPD' : 'ED'
      }
      var data = this.MDSPECIALITIES.filter(e => {
        return e.VisitTypeGroup === status
      })
      return data
    },
    Version: function () {
      // return 2
      return this.DataSubmit.Version || 2
    }
  },
  mounted () {
    this.getFirstData()
  },
  created () {
  },
  methods: {
    async getFirstData () {
      await this.getVisitVersion()
      // await this.getSpecialities()
      // await this.changeData()
      // await this.checkAge()
      // this.caculateBmi()
    },
    caculateBmi () {
      var weight1 = this.MASTERDATA['OPDOENWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value) : 0
      var height1 = this.MASTERDATA['OPDOENHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100) : 0
      return (weight1 / (height1 * height1)).toFixed(2)
    },
    showWithOPDOENDG () {
      return this.MASTERDATA['OPDOENDG'].Items[0].Value || this.MASTERDATA['OPDOENDG'].Items[2].Value
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
      if (this.MASTERDATA['OPDOENDOR']) {
        this.MASTERDATA['OPDOENDOR'].ViName = 'Hẹn ngày tái khám (Hiển thị trên báo cáo y tế)'
        this.MASTERDATA['OPDOENDOR'].EnName = 'Date-of re-examination'
      }
      if (this.MASTERDATA['OPDOENDD0'] && this.VisitVersion >= 12) {
        this.MASTERDATA['OPDOENDD0'].ViName = 'Chẩn đoán ra viện'
        this.MASTERDATA['OPDOENDD0'].EnName = 'Discharge diagnosis'
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
        if (age >= 5 && age < 19) {
          this.MASTERDATA['OPDOENTUOI'].Items[1].Value = true
          this.MASTERDATA['OPDOENTUOI'].Items[0].Value = false
          this.MASTERDATA['OPDOENTUOI'].Items[2].Value = false
        }
        if (age >= 19) {
          this.MASTERDATA['OPDOENTUOI'].Items[0].Value = true
          this.MASTERDATA['OPDOENTUOI'].Items[1].Value = false
          this.MASTERDATA['OPDOENTUOI'].Items[2].Value = false
        }
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
    // Vì là phiếu khám ngoại trú nên fix cứng visittype là OPD
    getVisitVersion () {
      new EIOService().find('EMRForm/GetVersionByVisit/' + this._VisitId + '/OPD').then(async response => {
        this.VisitVersion = response.Version
        await this.getSpecialities()
        await this.changeData()
        await this.checkAge()
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>
