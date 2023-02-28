<template>
  <div class="min-height-200">
    <h1 class="text-center" v-if="$route.name === 'EOCOutpatientExaminationNote' || $route.name ==='EOCView'">{{__t('Phiếu khám bệnh')}}</h1>
    <h1 class="text-center" v-else-if="DataSubmit.IsTelehealth">{{__t('Phiếu khám Telehealth')}}</h1>
    <h1 class="text-center" v-else>{{__t('Phiếu khám ngoại trú')}}</h1>
    <template v-if="DataSubmit.ErrorPopup">
      <div class="no-data-msg">{{__label({ViName: DataSubmit.ViMessage, EnName: DataSubmit.EnMessage})}}</div>
    </template>
    <template v-else>
      <div id="OutpatientExaminationNoteForm">
        <div class="tbl-title">1. {{__t('Đánh giá chung')}} <span v-if="DataSubmit.IsTelehealth" class="note-text">{{__t('Lưu ý: Các thông số bên dưới là do NB cung cấp')}}</span></div>
        <div class="box box-table">
          <div class="box-body">
            <div class="row">
              <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENPUL']">
                <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENPUL'].Items">
                  <label>{{__label(item)}} <i class="unit-label">({{item.Note}})</i></label>
                  <div class="fake-input disable">{{checkEoc ? DataSubmit.Customer.Pulse || item.Value || 'N/A' : item.Value || 'N/A'}}</div>
                  <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
                </div>
              </div>
              <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENTEM']">
                <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENTEM'].Items">
                  <label>{{__label(item)}} <i class="unit-label">({{item.Note}})</i></label>
                  <div class="fake-input disable">{{checkEoc ? DataSubmit.Customer.T || item.Value || 'N/A' : item.Value || 'N/A'}}</div>
                  <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
                </div>
              </div>
              <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENBP0']">
                <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENBP0'].Items">
                  <label>{{__label(item)}} <i class="unit-label">({{item.Note}})</i></label>
                  <div class="fake-input disable">{{checkEoc ? DataSubmit.Customer.BP || item.Value || 'N/A' : item.Value || 'N/A'}}</div>
                  <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
                </div>
              </div>
              <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENSPO']">
                <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENSPO'].Items">
                  <label>{{__label(item)}} <i class="unit-label">({{item.Note}})</i></label>
                  <div class="fake-input disable">{{checkEoc ? DataSubmit.Customer.SpO2 || item.Value || 'N/A' : item.Value || 'N/A'}}</div>
                  <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
                </div>
              </div>
              <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENRR0']">
                <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENRR0'].Items">
                  <label>{{__label(item)}} <i class="unit-label">({{item.Note}})</i></label>
                  <div class="fake-input disable">{{checkEoc ? DataSubmit.Customer.RR || item.Value || 'N/A' : item.Value || 'N/A'}}</div>
                  <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENHEI']">
                <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENHEI'].Items">
                  <label>{{__label(item)}} <i class="unit-label">{{item.Note}}</i></label>
                  <div class="fake-input disable">{{checkEoc ? DataSubmit.Customer.Height || item.Value || 'N/A' : item.Value || 'N/A'}}</div>
                  <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
                </div>
              </div>
              <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENWEI']">
                <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENWEI'].Items">
                  <label>{{__label(item)}} <i class="unit-label">{{item.Note}}</i></label>
                  <div class="fake-input disable">{{checkEoc ? DataSubmit.Customer.Weight || item.Value || 'N/A' : item.Value || 'N/A'}}</div>
                  <!-- <div class="fake-input disable">{{item.Value || 'N/A'}}</div> -->
                </div>
              </div>
              <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENWEI']">
                <div class="form-group">
                  <label>BMI <i class="unit-label"></i></label>
                  <input class="form-control" readonly :value="caculateBmi()">
                </div>
              </div>
              <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENWEI'] && Version === 2 && !checkEoc">
                <div class="form-group" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENWEI'].Items">
                  <label>{{__t("Phòng khám")}} <i class="unit-label">{{item.Note}}</i></label>
                  <div class="fake-input disable">{{DataSubmit.Service || 'N/A'}}</div>
                </div>
              </div>
              <div class="col-md-2 col-25" v-if="MASTERDATA['OPDOENWEI'] && Version === 2 && !checkEoc">
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
            <md-input-text v-model="MASTERDATA['OPDOENCC0']" :readonly="true"/>
            <md-input-text  v-if="MASTERDATA['OPDOENPMH'] && DataSubmit.Clinic && DataSubmit.Clinic.Code !== 'FreeTextOnly-000'" v-model="MASTERDATA['OPDOENPMH']" :readonly="true"/>
            <template v-if="MASTERDATA['OPDOENPMH'] && DataSubmit.Clinic && DataSubmit.Clinic.Code === 'FreeTextOnly-000'">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group bg-gray-2">
                    <label>{{__t('Tiền sử bệnh')}}</label>
                  </div>
                </div>
              </div>
              <md-input-text v-model="MASTERDATA[c]" :readonly="true" :data="c" :key="'OPDOENTSSK' + j" v-for="(c,j) in OPDOENTSSK" v-if="MASTERDATA[c] && showWithClinic(MASTERDATA[c].Clinic)"/>
            </template>
            <template v-if="checkSetupClinic('SANPHUKHOA') && Version === 2">
              <div class="mrt10">
                <label class="mrb10">{{__label(MASTERDATA['OPDOEN514'])}}</label>
                <MDText v-if="MASTERDATA['OPDOEN514']" :placeholder="__t('Nhập')" :readonly="true" v-model="MASTERDATA['OPDOEN514'].Items[0].Value"/>
              </div>
              <div class="mrt10">
                <label class="mrb10">{{__label(MASTERDATA['OPDOEN516'])}}</label>
                <MDText v-if="MASTERDATA['OPDOEN516']" :placeholder="__t('Nhập')" :readonly="true" v-model="MASTERDATA['OPDOEN516'].Items[0].Value"/>
              </div>
            </template>
            <md-input-text v-model="MASTERDATA['OPDOENHOA']" :readonly="true"/>
            <md-input-text v-model="MASTERDATA['OPDOENHPI']" :readonly="true"/>
            <md-input-text v-if="MASTERDATA['OPDOENCEF'] && DataSubmit.Clinic && DataSubmit.Clinic.Code === 'Normal' && DataSubmit.Version === 1" v-model="MASTERDATA['OPDOENCEF']" :readonly="true"/>
          </div>
        </div>
        <div class="box box-table" v-if="DataSubmit.Version === 2">
            <div class="box-body">
              <label>
                {{__t('Khám lâm sàng (Hiển thị trên báo cáo y tế)')}}
              </label>
              <template v-if="checkEoc && Version === 2">
                <div class="mt-20">
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTTV2']" :placeholder="__t('Nhập')" :defaultLib="'GENRELI'" v-model="MASTERDATA['OPDOENKTTV2']"/>
                </div>
                <div class="mt-20">
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKCK']" v-model="MASTERDATA['OPDOENKCK']" :defaultLib="'GENRELI'" :title="__t('Mở thư viện tham khảo')" />
                </div>
                <div class="mt-20">
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKHHV2']" v-model="MASTERDATA['OPDOENKHHV2']"  :defaultLib="'GENRELI'" :title="__t('Mở thư viện tham khảo')" />
                </div>
                <div class="mt-20">
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKBPK']" v-model="MASTERDATA['OPDOENKBPK']" :defaultLib="'GENRELI'" :title="__t('Mở thư viện tham khảo')"/>
                </div>
              </template>
            </div>
        </div>
        <div class="box box-table" v-if="Version === 2">
          <div class="box-body">
            <label>
              {{__t('Khai thác thông tin thuốc đã dùng tại nhà (nếu có)')}}
              <!-- <button id="btn-24hsync" class="btn btn-sync-data" @click="syncGetAction()">{{__t('Lấy dữ liệu')}}</button> -->
            </label>
            <list-of-current-medications
              ref="ListOfCurrentMedications"
              :Type="(VisitTypeCode || 'EOC') + '-PatientMedicationList'"
              :VisitTypeGroupCode="VisitTypeCode || 'EOC'"
              :RealOnly="true"
            />
          </div>
        </div>
        <div class="box box-table">
          <div class="box-body">
            <!-- /test -->
            <!-- khám lâm sàng -->
            <div class="kls-block" v-if="!DataSubmit.IsTelehealth && DataSubmit.Clinic && DataSubmit.Clinic.Code !== 'Normal'">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__t('Khám lâm sàng (Hiển thị trên báo cáo y tế)')}}</label>
                  </div>
                </div>
              </div>
              <div class="box box-table" style="background: #eceaea;" v-if="DataSubmit.Clinic.Code !== 'MultiSelect-002'">
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
                  <template v-if="Version === 1">
                    <div class="row" v-if="MASTERDATA['OPDOENBNTHPT'] && showWithClinic(MASTERDATA['OPDOENBNTHPT'].Clinic)">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>{{__label(MASTERDATA['OPDOENBNTHPT'])}} <i class="unit-label">{{MASTERDATA['OPDOENBNTHPT'].Note}}</i></label>
                          <MDRadioView :data="MASTERDATA['OPDOENBNTHPT'].Items" />
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-if="Version === 2 && checkSetupClinic('LIENCHUYENKHOA')">
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
                  <Ver2 :box4="true" v-if="checkSetupClinic('PHUCHOICHUCNANG') && Version === 2" :readonly="true" :MASTERDATA="MASTERDATA" :DataSubmit="MASTERDATA"/>
                  <template v-if="Version === 1">
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTT'] && showWithClinic(MASTERDATA['OPDOENKTT'].Clinic)" v-model="MASTERDATA['OPDOENKTT']"/>
                  </template>
                  <template v-if="Version === 2 && checkSetupClinic('LIENCHUYENKHOA')">
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTT'] && showWithClinic(MASTERDATA['OPDOENKTT'].Clinic)" v-model="MASTERDATA['OPDOENKTT']"/>
                  </template>
                  <template v-if="hasKCK() && Version === 1">
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKCK'] && showWithClinic(MASTERDATA['OPDOENKCK'].Clinic)" v-model="MASTERDATA['OPDOENKCK']"/>
                  </template>
                  <template v-if="hasKCK() && Version === 2 && checkSetupClinic('LIENCHUYENKHOA')">
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKCK'] && showWithClinic(MASTERDATA['OPDOENKCK'].Clinic)" v-model="MASTERDATA['OPDOENKCK']"/>
                  </template>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTP'] && hideWithOPDOENDG() && showWithClinic(MASTERDATA['OPDOENKTP'].Clinic)" v-model="MASTERDATA['OPDOENKTP']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTP'] && showWithOPDOENDG() && showWithClinic(MASTERDATA['OPDOENKTP'].Clinic)" v-model="MASTERDATA['OPDOENKTP']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTSKN'] && showWithClinic(MASTERDATA['OPDOENTSKN'].Clinic) && DataSubmit.Clinic.Code !== 'FreeTextOnly-000'" v-model="MASTERDATA['OPDOENTSKN']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTSK'] && showWithClinic(MASTERDATA['OPDOENTSK'].Clinic) && DataSubmit.Clinic.Code !== 'FreeTextOnly-000'" v-model="MASTERDATA['OPDOENTSK']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTP1'] && showWithClinic(MASTERDATA['OPDOENKTP1'].Clinic) && MASTERDATA['OPDOENBNTHPT'].Items[0].Value === true" v-model="MASTERDATA['OPDOENKTP1']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENNGNG'] && showWithClinic(MASTERDATA['OPDOENNGNG'].Clinic)" v-model="MASTERDATA['OPDOENNGNG']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENNTTTXH'] && showWithClinic(MASTERDATA['OPDOENNTTTXH'].Clinic)" v-model="MASTERDATA['OPDOENNTTTXH']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENHVTTCY'] && showWithClinic(MASTERDATA['OPDOENHVTTCY'].Clinic)" v-model="MASTERDATA['OPDOENHVTTCY']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENCGXG'] && showWithClinic(MASTERDATA['OPDOENCGXG'].Clinic)" v-model="MASTERDATA['OPDOENCGXG']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTTPV'] && showWithClinic(MASTERDATA['OPDOENKTTPV'].Clinic)" v-model="MASTERDATA['OPDOENKTTPV']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENMSTTLCT'] && showWithClinic(MASTERDATA['OPDOENMSTTLCT'].Clinic)" v-model="MASTERDATA['OPDOENMSTTLCT']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENBMI'] && showWithClinic(MASTERDATA['OPDOENBMI'].Clinic)" v-model="MASTERDATA['OPDOENBMI']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTTTHGC'] && showWithClinic(MASTERDATA['OPDOENKTTTHGC'].Clinic)" v-model="MASTERDATA['OPDOENKTTTHGC']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENDGCGNM'] && showWithClinic(MASTERDATA['OPDOENDGCGNM'].Clinic)" v-model="MASTERDATA['OPDOENDGCGNM']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENDGDNM'] && showWithClinic(MASTERDATA['OPDOENDGDNM'].Clinic)" v-model="MASTERDATA['OPDOENDGDNM']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKLN'] && showWithClinic(MASTERDATA['OPDOENKLN'].Clinic)" v-model="MASTERDATA['OPDOENKLN']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTM'] && showWithClinic(MASTERDATA['OPDOENKTM'].Clinic)" v-model="MASTERDATA['OPDOENKTM']"/>
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKHH'] && showWithClinic(MASTERDATA['OPDOENKHH'].Clinic)" v-model="MASTERDATA['OPDOENKHH']">
                  </md-input-text>
                  <template v-if="Version === 1">
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKCBPK'] && showWithClinic(MASTERDATA['OPDOENKCBPK'].Clinic)" v-model="MASTERDATA['OPDOENKCBPK']"/>
                  </template>
                  <template v-if="Version === 2 && checkSetupClinic('LIENCHUYENKHOA')">
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKCBPK'] && showWithClinic(MASTERDATA['OPDOENKCBPK'].Clinic)" v-model="MASTERDATA['OPDOENKCBPK']"/>
                  </template>
                  <Ver2 :box3="true" v-if="checkSetupClinic('NHIVACCINE') && Version === 2" :readonly="true" :MASTERDATA="MASTERDATA" :DataSubmit="MASTERDATA"/>
                  <Ver2 :box5="true" v-if="checkSetupClinic('PHUCHOICHUCNANG') && Version === 2" :readonly="true" :MASTERDATA="MASTERDATA" :DataSubmit="MASTERDATA"/>
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
                  <template v-if="isOPDOENKNKT()">
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
                  <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTMH'] && showWithClinic(MASTERDATA['OPDOENKTMH'].Clinic)" v-model="MASTERDATA['OPDOENKTMH']"/>
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
                        <MDRadioView :data="MASTERDATA['OPDOENYTD'].Items" />
                      </div>
                    </div>
                  </div>
                  <template v-if="MASTERDATA['OPDOENYTD'].Items[0].Value">
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENNGNG']" v-model="MASTERDATA['OPDOENNGNG']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENNTTTXH']" v-model="MASTERDATA['OPDOENNTTTXH']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENHVTTCY']" v-model="MASTERDATA['OPDOENHVTTCY']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENCGXG']" v-model="MASTERDATA['OPDOENCGXG']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENKTTPV']" v-model="MASTERDATA['OPDOENKTTPV']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENMSTTLCT']" v-model="MASTERDATA['OPDOENMSTTLCT']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENCCQK']" v-model="MASTERDATA['OPDOENCCQK']"/>
                  </template>
                  <template v-if="MASTERDATA['OPDOENYTD'].Items[1].Value">
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0001']" v-model="MASTERDATA['OPDOENTK0001']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0002']" v-model="MASTERDATA['OPDOENTK0002']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0003']" v-model="MASTERDATA['OPDOENTK0003']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0004']" v-model="MASTERDATA['OPDOENTK0004']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0005']" v-model="MASTERDATA['OPDOENTK0005']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0006']" v-model="MASTERDATA['OPDOENTK0006']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0007']" v-model="MASTERDATA['OPDOENTK0007']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0008']" v-model="MASTERDATA['OPDOENTK0008']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0009']" v-model="MASTERDATA['OPDOENTK0009']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0010']" v-model="MASTERDATA['OPDOENTK0010']"/>
                  </template>
                  <template v-if="MASTERDATA['OPDOENYTD'].Items[2].Value">
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0011']" v-model="MASTERDATA['OPDOENTK0011']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0012']" v-model="MASTERDATA['OPDOENTK0012']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0013']" v-model="MASTERDATA['OPDOENTK0013']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0014']" v-model="MASTERDATA['OPDOENTK0014']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0015']" v-model="MASTERDATA['OPDOENTK0015']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0016']" v-model="MASTERDATA['OPDOENTK0016']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0017']" v-model="MASTERDATA['OPDOENTK0017']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0018']" v-model="MASTERDATA['OPDOENTK0018']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0027']" v-model="MASTERDATA['OPDOENTK0027']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0019']" v-model="MASTERDATA['OPDOENTK0019']"/>
                  </template>
                  <template v-if="MASTERDATA['OPDOENYTD'].Items[3].Value">
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0020']" v-model="MASTERDATA['OPDOENTK0020']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0021']" v-model="MASTERDATA['OPDOENTK0021']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0022']" v-model="MASTERDATA['OPDOENTK0022']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0023']" v-model="MASTERDATA['OPDOENTK0023']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0024']" v-model="MASTERDATA['OPDOENTK0024']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0025']" v-model="MASTERDATA['OPDOENTK0025']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0028']" v-model="MASTERDATA['OPDOENTK0028']"/>
                    <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENTK0026']" v-model="MASTERDATA['OPDOENTK0026']"/>
                  </template>
                </div>
              </div>
              <!-- end khams laam sangf -->
            </div>
            <md-input-text :readonly="true" v-if="MASTERDATA['OPDOENSDBP'] && DataSubmit.IsTelehealth" v-model="MASTERDATA['OPDOENSDBP']"/>
            <label>{{__label(MASTERDATA['OPDOENID0'])}}</label>
            <icd10-view v-if="MASTERDATA['OPDOEN659'] && Version === 2 && !checkEoc" class="mrb10" v-model="MASTERDATA['OPDOEN659'].Items[0].Value" />
            <md-input-text :hidelabel="true" :readonly="true" v-if="MASTERDATA['OPDOENID0']" v-model="MASTERDATA['OPDOENID0']"/>
            <div class="row">
              <div class="col-md-12" v-if="MASTERDATA['OPDOENPT0']">
                <div class="form-group">
                  <label>{{__label(MASTERDATA['OPDOENPT0'])}} <i class="unit-label">{{MASTERDATA['OPDOENPT0'].Note}}</i> <button class="btn btn-sync-data hidden" @click="autoLoadOPDOENPT0(MASTERDATA['OPDOENPT0'].Items)">{{__t('btn.lay_du_lieu_gan_nhat')}}</button> </label>
                  <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENPT0'].Items">
                    <div v-if="item.IsReadOnly">
                      <diorpt :dataJson="item.Value" v-model="item.Value" :isReadonly="true"/>
                    </div>
                    <p v-else class="fake-input disable" style="margin: 0">{{item.Value || 'N/A'}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12" v-if="MASTERDATA['OPDOENDD0']">
                <div class="form-group">
                  <label>{{__label(MASTERDATA['OPDOENDD0'])}} <i class="unit-label">{{MASTERDATA['OPDOENDD0'].Note}}</i></label>
                  <icd10-view v-if="MASTERDATA['OPDOEN661'] && Version === 2 && !checkEoc" class="mrb10" v-model="MASTERDATA['OPDOEN661'].Items[0].Value" />
                  <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENDD0'].Items">
                    <p class="fake-input disable" style="margin: 0" v-if="item.DataType === 'Text'" :data="item" :key="index">{{item.Value || noDataMsg()}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12" v-if="MASTERDATA['OPDOENICD']">
                <div class="form-group">
                  <!-- <label>{{__label(MASTERDATA['OPDOENICD'])}} <i class="unit-label">{{MASTERDATA['OPDOENICD'].Note}}</i></label> -->
                  <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDOENICD'].Items">
                    <div class="margin-bottom-10" v-if="item.DataType === 'ICD10'" :key="index">
                      <label>{{__label(item)}}</label>
                      <template v-if="item.IsReadOnly">
                        <p><icd10-view v-model="item.Value" /></p>
                      </template>
                      <template v-else>
                        <p>
                          <icd10-view v-model="item.Value" />
                        </p>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        </div>
        <div v-if="DataSubmit.Status && (DataSubmit.Status.EnName === 'Admitted')">
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
        <div v-if="DataSubmit.Status && (DataSubmit.Status.EnName === 'Transfer to ED')">
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
        <div v-if="DataSubmit.Status && (DataSubmit.Status.EnName === 'Inter-hospital transfer')">
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
        <div v-if="DataSubmit.Status && (DataSubmit.Status.EnName === 'Upstream/Downstream transfer')">
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
                      <div class="fake-input disable">{{item.Value | formatDateWithoutSecon}}</div>
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
        <div class="form-group" v-if="DataSubmit && DataSubmit.Status && DataSubmit.Status.EnName === 'Waiting results'">
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
    <hr/>
  </div>
</template>
<script>
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import VSelectBox from '@/components/VSelectDisplay.vue'
import OutpatientExaminationNoteInfo from '@/components/OPD/OutpatientExaminationNoteDoctorInfo.vue'
import Diorpt from '@/components/OPD/DI0RPT.vue'
import Ver2 from '@/pages/OPD/OutpatientExaminationNote/Ver2.vue'

const EndOsCopy = () => import('@/components/Endoscopy.vue')
export default {
  name: 'OutpatientExaminationNoteVIEW',
  mixins: [],
  props: ['DataSubmit', 'MASTERDATA', 'VisitTypeCode'],
  components: {
    Diorpt,
    ListOfCurrentMedications,
    VSelectBox,
    OutpatientExaminationNoteInfo,
    EndOsCopy,
    Ver2
  },
  data () {
    return {
      CODE1: [
        'OPDOENKTT', 'OPDOENKCK', 'OPDOENKTP', 'OPDOENKCBPK',
        'OPDOENBHC', 'OPDOENKYT', 'OPDOENKCGTG', 'OPDOENKTD', 'OPDOENKCX', 'OPDOENKHD', 'OPDOENKCY', 'OPDOENKTN', 'OPDOENKTRT', 'OPDOENTTL'
      ],
      CODE1_1: [
        'OPDOENTSKN', 'OPDOENTSK'
      ],
      CODE2Adults: [
        // 'OPDOENBHC', 'OPDOENKYT', 'OPDOENKCGTG', 'OPDOENKTD', 'OPDOENKCX', 'OPDOENKHD',
        // 'OPDOENKCY', 'OPDOENKTN', 'OPDOENKTRT', 'OPDOENTTL'
      ],
      CODE2Child: [
        'OPDOENNGNG', 'OPDOENNTTTXH', 'OPDOENHVTTCY', 'OPDOENCGXG', 'OPDOENKTTPV', 'OPDOENMSTTLCT'
      ],
      CODE3: [
        'OPDOENKTTTHGC', 'OPDOENDGCGNM', 'OPDOENDGDNM', 'OPDOENKLN'
      ],
      CODE4: [
        'OPDOENKTM', 'OPDOENKHH'
      ],
      OPDOENDG: [
        'OPDOENMCN', 'OPDOENDCT', 'OPDOENTDTT', 'OPDOENTHCVD', 'OPDOENPHCN'
      ],
      OPDOENDG1: [
        'OPDOENCNHH', 'OPDOENSCD', 'OPDOENKNGS', 'OPDOENTDNT'
      ],
      OPDOENDG2: [
        'OPDOENKNGT', 'OPDOENTTRLN', 'OPDOENNTKG', 'OPDOENDVTH', 'OPDOENDCDL'
      ],
      CODE5: [
        'OPDOENCCQK', 'OPDOENKTMH', 'OPDOENKDD', 'OPDOENTC', 'OPDOENPTVD', 'OPDOENPTTT'
      ],
      OPDOENTSSK: ['OPDOENTSSK', 'OPDOENTSKN', 'OPDOENTSK'],
      loaded: false,
      isNew: false,
      collapseId: '',
      open: false,
      pId: null,
      message: null,
      isErrorPop: false,
      hasData: false
    }
  },
  computed: {
    checkEoc: function () {
      if (this.$route.name === 'EOCOutpatientExaminationNote' || this.$route.name === 'EOCView') {
        return true
      } else {
        return false
      }
    },
    getMDSPECIALITIESS: function () {
      var status = ''
      if (this.DataSubmit.Status) {
        status = this.DataSubmit.Status.EnName === 'Admitted' ? 'IPD' : 'ED'
      }
      var data = this.MDSPECIALITIES.filter(e => {
        return e.VisitTypeGroup === status
      })
      return data
    },
    // bmiCalculation: function () {
    //   console.log('w, h', this.DataSubmit.Customer.Weight, this.DataSubmit.Customer.Height)
    //   var weight = this.MASTERDATA['OPDOENWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value) : this.DataSubmit.Customer.Weight ? this.DataSubmit.Customer.Weight : 0
    //   var height = this.MASTERDATA['OPDOENHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100) : this.DataSubmit.Customer.Height ? (parseFloat(this.DataSubmit.Customer.Height) / 100) : 0
    //   return (weight / (height * height)).toFixed(2)
    // },
    // bmiCalculation: function () {
    //   if (this.checkEoc) {
    //     var weight = this.DataSubmit.Customer.Weight ? parseFloat(this.DataSubmit.Customer.Weight) : 0
    //     var height = this.his.DataSubmit.Customer.Height ? (parseFloat(this.his.DataSubmit.Customer.Height) / 100) : 0
    //     return (weight / (height * height)).toFixed(2)
    //   } else {
    //     var weight1 = this.MASTERDATA['OPDOENWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value) : 0
    //     var height1 = this.MASTERDATA['OPDOENHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100) : 0
    //     return (weight1 / (height1 * height1)).toFixed(2)
    //   }
    // },
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
    Version: function () {
      // return 2
      return this.DataSubmit.Version || 2
    }
  },
  mounted () {
    this.getSpecialities()
    setTimeout(() => {
      this.changeData()
    }, 200)
    this.caculateBmi()
    console.log('DataSubmiteoc', this.DataSubmit)
  },
  created () {
  },
  methods: {
    caculateBmi () {
      if (this.checkEoc) {
        var weight = this.DataSubmit.Customer.Weight ? parseFloat(this.DataSubmit.Customer.Weight) : 0
        var height = this.DataSubmit.Customer.Height ? (parseFloat(this.DataSubmit.Customer.Height) / 100) : 0
        return (weight / (height * height)).toFixed(2)
      } else {
        var weight1 = this.MASTERDATA['OPDOENWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value) : 0
        var height1 = this.MASTERDATA['OPDOENHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100) : 0
        return (weight1 / (height1 * height1)).toFixed(2)
      }
    },
    showWithOPDOENDG () {
      return this.MASTERDATA['OPDOENDG'].Items[0].Value || this.MASTERDATA['OPDOENDG'].Items[2].Value
    },
    hideWithOPDOENDG () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Code !== 'MultiSelect-001'
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
      return this.DataSubmit.Clinic && ['FreeTextOnly-000', 'FreeTextOnly-001', 'FreeTextOnly-006', 'RadioYesNo-001'].includes(this.DataSubmit.Clinic.Code)
    },
    showWithClinic (codes) {
      if (this.DataSubmit.Clinic && this.DataSubmit.Clinic.Code && codes) {
        var codess = codes.replace(/\s/g, '').split(',')
        return codess.includes(this.DataSubmit.Clinic.Code)
      }
      return false
    },
    changeData () {
      if (this.Version === 2) {
        if (this.MASTERDATA['OPDOENKTP1']) {
          this.MASTERDATA['OPDOENKTP1'].ViName = 'Khám tim mạch, hô hấp'
          this.MASTERDATA['OPDOENKTP1'].EnName = 'Respiratory and cardiac function'
        }
        // if (this.DataSubmit.IsNew && this.DataSubmit.Clinic.Code === 'RadioYesNo-001') {
        //   if (this.MASTERDATA['OPDOENBNTHPT']) {
        //     this.MASTERDATA['OPDOENBNTHPT'].Items[1].Value = true
        //   }
        // }
      }
    },
    checkSetupClinic (str) {
      // if (this.$store.state.account.Username === 'hunglq25') {
      //   return true
      // }
      let check = false
      if (this.DataSubmit && this.DataSubmit.SetupClinic && this.DataSubmit.SetupClinic.length && str) {
        this.DataSubmit.SetupClinic.find(e => {
          if (e === str) {
            check = true
          }
        })
      }
      return check
    }
  }
}
</script>
