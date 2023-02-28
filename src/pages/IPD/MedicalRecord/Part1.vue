<template>
  <div class="main-content">
    <!-- <Printer /> -->
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <div class="box box-table">
          <div class="box-body">
            <label class="block-title">I. {{__t2('HÀNH CHÍNH')}}: <span style="font-size: 14px;font-style: italic;float: right;">{{__t('Thông tin hành chính được đồng bộ từ hệ thống OH. Vui lòng chỉnh sửa tại OH và thực hiện tính năng đồng bộ PID.')}}<span style="background-color: #00c0ef;padding: 5px;border-radius: 3px;" class="glyphicon glyphicon-refresh green-color"></span></span></label>
            <div class="ml-10">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="Fullname">PID:</label>
                    <div class="input-group input-group-sm">
                      <input type="text" :readonly="!DataSubmit.IsDraft" class="form-control" v-model="Customer.PID"/>
                      <span class="input-group-btn">
                        <button type="button" class="btn btn-info btn-flat" @click="SyncCustomer()" title="!Đồng bộ thông tin bệnh nhân"><span class="glyphicon glyphicon-refresh green-color"></span></button>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group" :class="{'disable': !Customer.PID }">
                    <label for="DateOfBirth">{{__t2('Lượt tiếp nhận')}}:</label>
                    <div class="input-group input-group-sm">
                      <input :class="checkBoder ? 'borderColor' : ''" type="text" class="form-control" v-model="Customer.VisitCode"/>
                      <span class="input-group-btn">
                        <button type="button" class="btn btn-info btn-flat" @click="SyncVisitCode()"><span class="glyphicon glyphicon-refresh green-color"></span></button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{dex[1]}} {{__t2('Họ và tên')}}:</label>
                      <!-- <input type="text" v-uppercase v-model="Customer.Fullname" style="flex-grow: 1;width: auto" class="form-control" :placeholder="__t('Nhập')"> -->
                      <div style="flex-grow: 1;"><FakeInput  v-model="Customer.Fullname" /></div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{dex[2]}} {{__t2('Sinh ngày')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="Customer.DateOfBirth" />
                        <span class="input-group-addon" style="background-color: #eee"> {{Customer.AgeFormated | formatAge}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2" v-if="routeType === 'A01_034_050919_V'">{{dex[3]}} {{__t2('Giới')}}:</label>
                      <label class="text-left no-wrap mr-5 lb-w2" v-else>{{dex[3]}} {{__t('Giới tính-mdc')}}:</label>
                      <radio-list :readonly="true" v-model="Customer.Gender" :options="GENDERLIST" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6" v-if="routeType !== 'Pediatric' && routeType !== 'Neonatal'">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{dex[4]}} {{__t2('Nghề nghiệp-mdc')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input readonly :placeholder="__t('N/A')" v-model="Customer.MOHJob" class="form-control" />
                        <!-- <v-select @search:clear="Customer.MOHJobCode = ''" :placeholder="__t('Chọn')" @search:focus="getJobList" v-model="Customer.MOHJob" :options="jobList" /> -->
                        <span class="input-group-addon" style="background-color: #eee">{{Customer.MOHJobCode}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mrb10" v-if="routeType === 'Neonatal'">
                <div class="col-md-6">
                  <div class="form-gro2up">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5">{{dex[4]}} {{__label(MASTERDATA['IPDMRPO62'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input v-model="MASTERDATA['IPDMRPO62'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <VAgeInput v-if="MASTERDATA['IPDMRPOS3']" :label="MASTERDATA['IPDMRPOS3']" v-model="MASTERDATA['IPDMRPOS3'].Items[0].Value" />
                </div>
                <div class="col-md-6 mrt20 mrb20" v-if="MASTERDATA['IPDMRPO66']">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__label(MASTERDATA['IPDMRPO66'])}}</label>
                      <div class="input-group" style="flex-grow: 1">
                        <v-select @change="setJobCode2" @search:clear="MASTERDATA['IPDMRPO66'].Items[0].Note = ''" :placeholder="__t('Chọn')" @search:focus="getJobList" v-model="MASTERDATA['IPDMRPO66'].Items[0].Value" :options="jobList" />
                        <span class="input-group-addon" style="background-color: #eee">{{MASTERDATA['IPDMRPO66'].Items[0].Note}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mrt20">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__label(MASTERDATA['IPDMRPOS5'])}}</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input type="text" class="form-control" v-model="MASTERDATA['IPDMRPOS5'].Items[0].Value" :placeholder="__t('Nhập')">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mrb10" v-if="routeType === 'Neonatal'">
                <div class="col-md-6" v-if="MASTERDATA['IPDMRPO56']">
                  <div class="form-gro2up">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5">5. {{__label(MASTERDATA['IPDMRPO56'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input v-model="MASTERDATA['IPDMRPO56'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6" v-if="MASTERDATA['IPDMRPOS7']">
                  <VAgeInput v-if="MASTERDATA['IPDMRPOS7']" :label="MASTERDATA['IPDMRPOS7']" v-model="MASTERDATA['IPDMRPOS7'].Items[0].Value" />
                </div>
                <div class="col-md-6 mrt20" v-if="MASTERDATA['IPDMRPO60']">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__label(MASTERDATA['IPDMRPO60'])}}</label>
                      <div class="input-group" style="flex-grow: 1">
                        <v-select @change="setJobCode3" @search:clear="MASTERDATA['IPDMRPO60'].Items[0].Note = ''" :placeholder="__t('Chọn')" @search:focus="getJobList" v-model="MASTERDATA['IPDMRPO60'].Items[0].Value" :options="jobList" />
                        <span class="input-group-addon" style="background-color: #eee">{{MASTERDATA['IPDMRPO60'].Items[0].Note}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{dex[5]}} {{__t2('Dân tộc-mdc')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input readonly :placeholder="__t('N/A')" v-model="Customer.MOHEthnic" class="form-control" />
                        <!-- <v-select @search:clear="Customer.MOHEthnicCode = ''" :placeholder="__t('Chọn')" @search:focus="getEthnicList" v-model="Customer.MOHEthnic" :options="ethnicList" /> -->
                        <span class="input-group-addon" style="background-color: #eee">{{Customer.MOHEthnicCode}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{dex[6]}} {{__t2('Ngoại kiều-mdc')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <!-- <input readonly :placeholder="__t('N/A')" v-model="Customer.MOHNationality" class="form-control" /> -->
                        <v-select @search:clear="Customer.MOHNationalityCode = ''" :placeholder="__t('Chọn')" @search:focus="getNationalityList" v-model="Customer.MOHNationality" :options="nationalityList" />
                        <span class="input-group-addon" style="background-color: #eee">{{Customer.MOHNationalityCode}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__t('customer.quoc_tich')}}</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="Customer.Nationality" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6" v-if="routeType !== 'Pediatric' && routeType !== 'Neonatal'">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__t('customer.so_dien_thoai')}}</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="Customer.Phone" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="routeType !== 'Pediatric' && routeType !== 'Neonatal'">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>{{__t('Số CMTND/Hộ chiếu')}}</label>
                    <FakeInput v-model="Customer.IdentificationCard" />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>{{__t('Ngày cấp')}}</label>
                    <FakeInput v-model="Customer.IssueDate" />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <!-- <label class="hidden-text">{{__t('Nơi cấp')}}</label>
                    <input type="text" class="form-control" v-model="Customer.IssuePlace" :placeholder="__t('Nơi cấp')"/> -->
                    <label>{{__t('Nơi cấp')}}</label>
                    <FakeInput v-model="Customer.IssuePlace" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="text-left no-wrap mr-5 full-width">{{dex[7]}} {{__t2('Địa chỉ (Số nhà - thôn/phố - xã/phường)')}}:</label>
                    <FakeInput v-model="Customer.MOHAddress" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__t2('Tỉnh, Thành phố-mdc')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="Customer.MOHProvince" />
                        <span class="input-group-addon" style="background-color: #eee">{{Customer.MOHProvinceCode}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__t2('Huyện, Quận, Thị xã-mdc')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="Customer.MOHDistrict" />
                        <span class="input-group-addon" style="background-color: #eee">{{Customer.MOHDistrictCode}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- nhi khoa -->
              <div class="row" v-if="routeType === 'Pediatric'">
                <div class="col-md-6">
                  <div class="form-gro2up">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5 box-right">7. {{__label(MASTERDATA['IPDMRPO56'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input v-model="MASTERDATA['IPDMRPO56'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-gro2up">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5"> {{__label(MASTERDATA['IPDMRPO58'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input v-model="MASTERDATA['IPDMRPO58'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mrt20">
                  <div class="form-gro2up">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5"> {{__label(MASTERDATA['IPDMRPO60'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input v-model="MASTERDATA['IPDMRPO60'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br/>
              <div class="row" v-if="routeType === 'Pediatric'">
                <div class="col-md-6">
                  <div class="form-gro2up">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5"> {{__label(MASTERDATA['IPDMRPO62'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input v-model="MASTERDATA['IPDMRPO62'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-gro2up">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5"> {{__label(MASTERDATA['IPDMRPO64'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input v-model="MASTERDATA['IPDMRPO64'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mrt20 mrb20">
                  <div class="form-gro2up">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5"> {{__label(MASTERDATA['IPDMRPO66'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input v-model="MASTERDATA['IPDMRPO66'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="routeType !== 'Neonatal'">
                <div class="col-md-6" v-if="routeType !== 'Pediatric'">
                  <div class="form-group">
                    <div class="flex-box">
                      <label class="text-left no-wrap mr-5 lb-w2">{{dex[8]}} {{__t2('Nơi làm việc')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="Customer.WorkPlace" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center mrb10">
                      <label class="text-left no-wrap mr-5 lb-w2">{{dex[9]}} {{__t2('Đối tượng')}}:</label>
                      <div class="for2m-group" style="flex-grow: 1">
                        <radio-list v-model="Customer.MOHObject" :options="MOHOBJECT" />
                      </div>
                    </div>
                    <textarea-autosize rows="2" v-model="Customer.MOHObjectOther" class="form-control" :disabled="Customer.MOHObject !== '4'" :placeholder="__t('Nhập')" />
                  </div>
                </div>
              </div>
              <div class="row" v-if="routeType !== 'Neonatal'">
                <div class="col-md-6">
                  <div class="form-gr2oup">
                    <div class="flex-box flex-csenter">
                      <label class="text-left no-wrasp mr-5 lb-w2">{{dex[10]}} {{__t2('BHYT giá trị đến')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                          <v-masked-input mask="11/11/1111" v-model="Customer.ExpireHealthInsuranceDate" :placeholder="vDateFormat" class="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box 2-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__t2('Số BHYT')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input v-model="Customer.HealthInsuranceNumber" :placeholder="__t('Nhập')" class="form-control" />
                        <p><small class="font-italic">{{__t2('Ví dụ')}}: AB 2 22 231313xxxx</small></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mrb20" v-if="routeType === 'Neonatal'">
                <div class="col-md-6">
                  <div class="form-gr2oup">
                    <div class="flex-box flex-csenter align-center">
                      <label class="text-left no-wrasp mr-5 lb-w2">{{__label(MASTERDATA['IPDMRPOS9'])}}</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input maxlength="5" v-model="MASTERDATA['IPDMRPOS9'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mrb20" v-if="routeType === 'Neonatal'">
                <div class="col-md-5 flex align-center" v-if="MASTERDATA['IPDMRPOS11']">
                    <div class="fw600" style="margin-right: 35px;">{{__label(MASTERDATA['IPDMRPOS11'])}}</div>
                    <div>
                      <div class="flex align-center mrb10">
                        <VNumberInput class="input-para" v-model="MASTERDATA['IPDMRPOS11'].Items[0].Value" :placeholder="__t('Nhập')"/>
                        <div style="margin-left:10px;">{{__label(MASTERDATA['IPDMRPOS11'].Items[0])}}</div>
                      </div>
                      <div class="flex align-center mrb10">
                        <VNumberInput class="input-para" v-model="MASTERDATA['IPDMRPOS11'].Items[1].Value" :placeholder="__t('Nhập')"/>
                        <div style="margin-left:10px;">{{__label(MASTERDATA['IPDMRPOS11'].Items[1])}}</div>
                      </div>
                      <div class="flex align-center mrb10">
                        <VNumberInput class="input-para" v-model="MASTERDATA['IPDMRPOS11'].Items[2].Value" :placeholder="__t('Nhập')"/>
                        <div style="margin-left:10px;">{{__label(MASTERDATA['IPDMRPOS11'].Items[2])}}</div>
                      </div>
                      <div class="flex align-center">
                        <VNumberInput class="input-para" v-model="MASTERDATA['IPDMRPOS11'].Items[3].Value" :placeholder="__t('Nhập')"/>
                        <div style="margin-left:10px;">{{__label(MASTERDATA['IPDMRPOS11'].Items[3])}}</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="row mrb20" v-if="routeType === 'Neonatal'">
                <div class="col-md-6">
                  <div class="flex-box flex-csenter align-center">
                    <label class="text-left no-wrasp mr-5" style="padding-top: 7px;">11. {{__t('Họ tên, địa chỉ người nhà cần báo tin')}}</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-gr2oup">
                    <div class="flex-box flex-csenter align-center">
                      <label class="text-left no-wrasp mr-5 lb-w2">{{__t('Điện thoại số')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="Customer.RelationshipContact" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <FakeInput v-model="Customer.Relationship" />
                </div>
              </div>
              <div class="row" v-if="routeType !== 'Neonatal'">
                <div class="col-md-6">
                  <div class="form-gr2oup">
                    <div class="flex-box flex-csenter">
                      <label class="text-left no-wrasp mr-5 lb-w2">{{dex[11]}} {{__t2('Họ tên, địa chỉ người nhà cần báo tin')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="Customer.Relationship" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-gro2up">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5">{{__t2('Điện thoại số')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="Customer.RelationshipContact" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="routeType === 'CardiovascularForm'">
                <BMTIMMACH1 :MASTERDATA="MASTERDATA" ref="BMTIMMACH1" :box1="true" :DataSubmit="DataSubmit"/>
              </template>
              <template v-else>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-10">
                      <div class="flex-box flex-center mb-5">
                        <label class="text-left no-wrap mr-5 lb-w2">{{dex[14]}} {{__t2('Nơi giới thiệu')}}:</label>
                        <div class="form-group" style="flex-grow: 1">
                          <MDRadio v-if="MASTERDATA['IPDMRPONOGT']" :indexs="[0, 1, 2]" :t2="true" v-model="MASTERDATA['IPDMRPONOGT']"/>
                        </div>
                      </div>
                      <textarea-autosize rows="2" class="form-control" v-model="MASTERDATA['IPDMRPONOGT'].Items[3].Value" :disabled="!MASTERDATA['IPDMRPONOGT'].Items[2].Value" :placeholder="__t('Nhập')" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <div class="flex-box flex-center">
                        <label class="text-left no-wrap mr-5">{{__t2('Vào viện do bệnh này lần thứ')}}:</label>
                        <div class="input-group" style="flex-grow: 1">
                          <input class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPOVVDB'].Items[0].Value"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div class="row">
                <div class="col-md-7">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5">{{dex[20]}} {{__t2('Chẩn đoán nơi chuyển đến')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <textarea-autosize rows="2" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPOCDNC'].Items[0].Value"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group" style="padding-top: 10px;">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5">{{__t2('Mã ICD10')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <icd10 :mdCode="'IPDMRPOMICD'" :single="true" v-model="MASTERDATA['IPDMRPOMICD'].Items[0].Value"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="!syncInfo && DataSubmit.TranferInfo">
                <div class="row">
                  <div class="col-md-12"><p class="note-text text-right"><label class="label label-warning"><i aria-hidden="true" class="fa fa-check v-green"></i> {{__t('Thông tin chẩn đoán và ICD được đồng bộ từ khoa')}}: {{DataSubmit.TranferInfo.SpecialtyName}}</label></p></div>
                </div>
              </template>
            </div>
            <PatientStatusAndDiagnose :routeType="routeType" :dex="dex" :typeForm="typeForm" :DataSubmitReadOnly="DataSubmit.ReadOnly" :DataSubmit="DataSubmit" :optionChild="optionChild" :ListSoSinh="ListSoSinh"/>
          </div>
        </div>
        <br/>
        <logs :EdId="this._VisitId" :Type="'MedicalRecord/Part1'" :noDetail="true" />
        <p v-if="DataSubmit && DataSubmit.Version >= 2 && routeType === 'A01_034_050919_V'">A01_034_290422_V</p>
        <p v-else>{{getMaForm(typeForm)}}</p>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <modal name="visitcode-modal" transition="pop-out" height="auto" :scrollable="true" :width="modalWidth">
          <div class="sync-ed-box">
            <div v-if="visitcodes && visitcodes.length">
              <p>{{__t('Lựa chọn các lượt khám cho bệnh nhân')}}</p>
              <table class="table table-striped table-bordered" id="customer-tbl">
                <thead>
                  <tr>
                    <td colspan="2"><b>{{__t('Kết quả')}} ({{visitcodes.length}})</b></td>
                    <td>{{__t('Chọn')}}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr :data="visitcode" :key="index" v-for="(visitcode, index) in visitcodes">
                    <!-- <td width="120px">
                      {{visitcode.VisitCode}}
                      <p>{{visitcode.VisitTypeName}}</p>
                    </td> -->
                    <td width="200px" style="vertical-align: top;">
                      <div class="no-wrap" style="font-size: 16px"><b>{{__t('Lượt khám')}}: {{visitcode.VisitTypeName}}</b></div>
                      <b>{{__t('Ngày vào viện')}}: <p class="no-wrap highlighted-text">{{visitcode.NgayVao}}</p></b>
                    </td>
                    <td>
                      <div>{{visitcode.BenhVien}}</div>
                      <div>{{__t('Bs')}}: <b>{{visitcode.BacSi}}</b></div>
                      <div>{{__t('Khoa')}}: {{visitcode.TenKhoa}}</div>
                    </td>
                    <td width="50" class="v-checkbox" align="center">
                      <input type="checkbox" :id="'ETRIOE-' + index" :name="'ETRIOE-' + index" v-model="visitcode.selected">
                      <label :for="'ETRIOE-' + index"></label>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <div class="row">
                        <div class="col-md-4">
                          <button class="btn btn-block" @click="$modal.hide('visitcode-modal')">{{__t('Hủy')}}</button>
                        </div>
                        <div class="col-md-8">
                          <button class="btn btn-block btn-warning" @click="updateVisitCode()">{{__t('Chọn')}}</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <template v-else-if="visitcodes && visitcodes.length === 0">
              <div class="callout callout-warning">
                <h4>{{__t('Không tìm thấy kết quả!')}}</h4>
                <p>{{__t('Vui lòng kiểm tra lại thông tin trên eHos/OH.')}}</p>
              </div>
            </template>
          </div>
        </modal>
        <FloatBlock :showForm="!nullContent" :nullContent="nullContent" @handleBack="handleBack">
          <template slot='top'>
            <template v-if="syncInfo">
              <div style="color: #fff;text-align: right;"><b>{{__t('Dữ liệu được đồng bộ từ khoa')}}:</b> {{__label(syncInfo.Specialty)}}</div>
            </template>
            <div v-else style="color: #fff"><b>{{__t('Trạng thái bệnh nhân')}}:</b> {{__label(DataSubmit.Status)}}</div>
          </template>
          <template slot='buttons'>
            <div class="col-md-4">
              <div class="form-group1">
                <button class="btn btn-block v-white-btn" type="button" @click="$router.push({name: 'IPDDischargeMedicalReport', params: {Id: _VisitId}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Báo cáo y tế ra viện')}}</button>
              </div>
            </div>
            <div class="col-md-8">
              <div class="form-group1">
                <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </template>
      <div v-else style="padding: 20px;">
        <div class="text-center">
          <p>{{__t(getTextWarning())}}</p>
          <button class="btn btn-warning" @click="confirmPopup(nameRoute, 'HÀNH CHÍNH')">{{__t('Tạo mới')}}</button>
        </div>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
    <modal :name="'syxxxx-modal'" transition="pop-out" height="auto" :scrollable="true" :width="modalWidth">
      <div class="sync-ed-box">
        <div v-if="customersForSync && customersForSync.length">
          <p><b>{{__t('Kết quả')}} ({{customersForSync.length}})</b></p>
          <table class="table table-striped table-bordered" id="customer-tbl">
            <tbody>
              <tr :data="customer" :key="index" v-for="(customer,index) in customersForSync">
                <td width="10" align="center">{{index + 1}}</td>
                <td>
                  PID: <b>{{customer.PID}} - {{customer.Fullname}}</b> - {{customer.DateOfBirth}}
                  <div>{{customer.Address}}</div>
                </td>
                <td width="10">
                  <button type="button" class="btn" @click="updateInfo(customer)">{{__t('Chọn')}}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="customersForSync && customersForSync.length === 0">
          <div class="callout callout-warning">
            <h4>{{__t('Không tìm thấy mã lượt khám của bệnh nhân!')}}</h4>
            <p>{{__t('Vui lòng kiểm tra lại thông tin trên eHos/OH')}}.</p>
          </div>
        </template>
      </div>
    </modal>
  </div>
</template>
<script>
import MedicalRecord from '@/services/IPD/MedicalRecord'
import PatientStatusAndDiagnose from './PatientStatusAndDiagnose.vue'
import constants from '@/constants.js'
import MixinMasterData from '@/mixins/masterdata.js'
import CustomersIPD from '@/services/IPD/Customer'
// import CustomerService from '@/services/Customer'
import Logs from '@/components/Logs.vue'
import EventBus from '@/lib/eventBus'
import MedicalRecordMixinForm from '@/pages/IPD/MedicalRecord/Mixin.js'
// import Printer from './Print/Index.vue'
// import $ from 'jquery'
import _ from 'lodash'
import NProgress from 'nprogress'
import utils from '@/utils'
import BMTIMMACH1 from '@/pages/IPD/MedicalRecord/Page2CPN/BMTIMMACH1.vue'
const MODAL_WIDTH = 750
export default {
  name: 'IPDMedicalRecordPart1',
  mixins: [MixinMasterData, MedicalRecordMixinForm],
  data () {
    return {
      checkBoder: false,
      GENDERLIST: constants.GENDERLIST,
      MOHOBJECT: constants.MOHOBJECT,
      NATIONALITYLIST: null,
      PROVINCELIST: null,
      DISTRICTLIST: null,
      JOBLIST: null,
      ETHNICLIST: null,
      DataSubmit: null,
      loaded: false,
      TransferInfo: null,
      InterHospitalInfoTo: '',
      Customer: null,
      customersForSync: null,
      InterHospitalInfo: [
        {
          ViName: '1. Tuyến trên',
          EnName: '1. Tuyến trên',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVITTR',
          Value: ''
        },
        {
          ViName: '2. Tuyến dưới',
          EnName: '2. Tuyến dưới',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVITDU',
          Value: ''
        },
        {
          ViName: '3. Chuyên khoa',
          EnName: '3. Chuyên khoa',
          DataType: 'Radio',
          Code: 'IPDMRPTCHVICKH',
          Value: ''
        }
      ],
      VisitTypes: [
        {
          ViName: '1. Cấp cứu',
          EnName: '1. Cấp cứu',
          DataType: 'Checkbox',
          Value: 'ED'
        },
        {
          ViName: '2. Khoa khám bệnh',
          EnName: '2. Khoa khám bệnh',
          DataType: 'Checkbox',
          Value: 'OPD'
        },
        {
          ViName: '3. Khoa điều trị',
          EnName: '3. Khoa điều trị',
          DataType: 'Checkbox',
          Value: 'IPD'
        }
      ],
      icd10Code: ['IPDMRPOMICDANS'],
      visitcodes: null,
      modalWidth: MODAL_WIDTH,
      syncInfo: null,
      dataMaster: '',
      nullContent: true,
      firstCustomer: null,
      dex: [],
      optionChild: [],
      ListSoSinh: []
    }
  },
  components: {
    PatientStatusAndDiagnose, Logs, BMTIMMACH1
  },
  mounted () {
    if (this.$route.params.Check) {
      this.checkBoder = true
    }
    this.dex = this.getIndex(this.$route.meta.type)
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.getSpecialities()
    this.getMasterDatas({Form: 'IPDMRPO'}, () => {
      this.getData()
      this.changeData()
    })
  },
  watch: {
    'Customer.MOHObject': function (val) {
      if (val !== '4') this.Customer.MOHObjectOther = ''
    },
    'Customer.MOHJob': function (val) {
      this.setJobCode()
    },
    'Customer.MOHEthnic': function (val) {
      this.setEthnicCode()
    },
    'Customer.MOHNationality': function (val) {
      this.setNationalityCode()
    },
    'Customer.MOHProvince': function (val) {
      this.setProvinceCode()
    },
    'Customer.MOHDistrict': function (val) {
      this.setDistrictCode()
    }
  },
  computed: {
    age () {
      if (!this.Customer) return 'N/A'
      return utils.getAge(this.Customer.DateOfBirth)
    },
    jobList () {
      var jobs = []
      var mdJob = []
      if (this.Customer.MOHJob) jobs = [this.Customer.MOHJob]
      if (this.JOBLIST) mdJob = this.JOBLIST.map(e => e.ViName)
      return [...new Set(jobs.concat(mdJob))]
    },
    ethnicList () {
      var ethnics = []
      var mdEthnic = []
      if (this.Customer.MOHEthnic) ethnics = [this.Customer.MOHEthnic]
      if (this.ETHNICLIST) mdEthnic = this.ETHNICLIST.map(e => e.ViName)
      return [...new Set(ethnics.concat(mdEthnic))]
    },
    nationalityList () {
      var nationalitys = []
      var mdnationality = []
      if (this.Customer.MOHNationality) nationalitys = [this.Customer.MOHNationality]
      if (this.NATIONALITYLIST) mdnationality = this.NATIONALITYLIST.map(e => e.ViName)
      return [...new Set(nationalitys.concat(mdnationality))]
    },
    provinceList () {
      var provinces = []
      var mdProvince = []
      if (this.Customer.MOHProvince) provinces = [this.Customer.MOHProvince]
      if (this.PROVINCELIST) mdProvince = this.PROVINCELIST.map(e => e.ViName)
      return [...new Set(provinces.concat(mdProvince))]
    },
    districtList () {
      var districts = []
      var mdDistrict = []
      // if (this.Customer.MOHDistrict) districts = [this.Customer.MOHDistrict]
      if (this.districtListByProvince) mdDistrict = this.districtListByProvince.map(e => e.ViName)
      return [...new Set(districts.concat(mdDistrict))]
    },
    districtListByProvince () {
      return this.PROVINCELIST ? (this.PROVINCELIST.find(e => e.ViName === this.Customer.MOHProvince) || {}).Items : []
    },
    routeType () {
      return this.$route.meta.type || ''
    },
    nameRoute () {
      // let name = 'NỘI KHOA'
      // if (this.$route.meta.type === 'Pediatric') {
      //   name = 'NHI KHOA'
      // }
      // if (this.$route.meta.type === 'Neonatal') {
      //   name = 'SƠ SINH'
      // }
      // if (this.$route.meta.type === 'Obstetrics') {
      //   name = 'SẢN KHOA'
      // }
      return this.MedicalRecordFormName
    },
    typeForm () {
      return this.MedicalRecordFormCode
    }
  },
  methods: {
    updateVisitCode () {
      var vsCode = []
      this.visitcodes.forEach(item => {
        if (item.selected && !vsCode.includes(item.VisitCode)) {
          vsCode.push(item.VisitCode)
        }
      })
      this.Customer.VisitCode = vsCode ? vsCode.join(',') : ''
      this.$modal.hide('visitcode-modal')
    },
    updateInfo (cus) {
      this.Customer = {...this.Customer, ...cus}
      this.$modal.hide('syxxxx-modal')
      new CustomersIPD({PID: this.Customer.PID}).find('SyncInfo/' + this._VisitId).then(() => {
        this.reload()
      })
    },
    SyncCustomer () {
      if (!this.Customer.PID) {
        this.alert('Thông báo', 'Vui lòng nhập PID')
        return ''
      }
      new CustomersIPD().find('HisCustomer/' + this._VisitId + '/' + this.Customer.PID)
        .then(response => {
          this.$modal.show('syxxxx-modal')
          this.customersForSync = response
        })
    },
    SyncOnlyVisit () {
      new CustomersIPD({PID: this.Customer.PID}).find('SyncInfo/' + this._VisitId).then(response => {
      })
    },
    SyncVisitCode () {
      if (!this.Customer.PID) {
        this.alert('Thông báo', 'Vui lòng đồng bộ PID')
        return ''
      }
      new CustomersIPD().find('SyncVisitCode/' + this._VisitId).then(response => {
        this.$modal.show('visitcode-modal')
        var vsCode = this.Customer.VisitCode ? this.Customer.VisitCode.split(',') : []
        response.forEach(element => {
          element.selected = vsCode.includes(element.VisitCode)
        })
        this.visitcodes = response
      })
    },
    getProvinceAndDistrict () {
      if (this.PROVINCELIST) return
      this.getRawMasterDatas({Form: 'GENLPCG'}, (data) => {
        this.PROVINCELIST = data
      })
    },
    setProvinceCode () {
      this.Customer.MOHProvinceCode = this.PROVINCELIST ? (this.PROVINCELIST.find(e => e.ViName === this.Customer.MOHProvince) || {}).Note : this.Customer.MOHProvinceCode
    },
    setDistrictCode () {
      this.Customer.MOHDistrictCode = this.districtListByProvince ? (this.districtListByProvince.find(e => e.ViName === this.Customer.MOHDistrict) || {Note: this.Customer.MOHDistrictCode}).Note : this.Customer.MOHDistrictCode
    },
    setJobCode () {
      this.Customer.MOHJobCode = this.JOBLIST ? (this.JOBLIST.find(e => e.ViName === this.Customer.MOHJob) || {}).Note : this.Customer.MOHJobCode
    },
    setJobCode2 (val) {
      if (this.MASTERDATA['IPDMRPO66']) {
        this.MASTERDATA['IPDMRPO66'].Items[0].Note = this.JOBLIST ? (this.JOBLIST.find(e => e.ViName === val) || {}).Note : this.MASTERDATA['IPDMRPO66'].Items[0].Note
      }
    },
    setJobCode3 (val) {
      if (this.MASTERDATA['IPDMRPO60']) {
        this.MASTERDATA['IPDMRPO60'].Items[0].Note = this.JOBLIST ? (this.JOBLIST.find(e => e.ViName === val) || {}).Note : this.MASTERDATA['IPDMRPO60'].Items[0].Note
      }
    },
    getJobList (str) {
      if (this.JOBLIST) return
      this.getRawMasterDatas({Form: 'GENJOBB'}, (data) => {
        this.JOBLIST = data
        console.log('jobs: ', this.JOBLIST)
        if (str) {
          if (this.MASTERDATA['IPDMRPO66'] && this.MASTERDATA['IPDMRPO66'].Items[0].Value) {
            this.setJobCode2(this.MASTERDATA['IPDMRPO66'].Items[0].Value)
          }
          if (this.MASTERDATA['IPDMRPO60'] && this.MASTERDATA['IPDMRPO60'].Items[0].Value) {
            this.setJobCode3(this.MASTERDATA['IPDMRPO60'].Items[0].Value)
          }
        }
      })
    },
    setEthnicCode (e) {
      this.Customer.MOHEthnicCode = this.ETHNICLIST ? (this.ETHNICLIST.find(e => e.ViName === this.Customer.MOHEthnic) || {}).Note : this.Customer.MOHEthnicCode
    },
    getEthnicList () {
      if (this.ETHNICLIST) return
      this.getRawMasterDatas({Form: 'GENETHN'}, (data) => {
        this.ETHNICLIST = data
      })
    },
    setNationalityCode (e) {
      this.Customer.MOHNationalityCode = this.NATIONALITYLIST ? (this.NATIONALITYLIST.find(e => e.ViName === this.Customer.MOHNationality) || {}).Note : this.Customer.MOHNationalityCode
    },
    getNationalityList () {
      if (this.NATIONALITYLIST) return
      this.getRawMasterDatas({Form: 'GENNATI'}, (data) => {
        this.NATIONALITYLIST = data
      })
    },
    getDataSubmit () {
      var obj = {}
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (this.icd10Code.includes(item.Code)) {
              val = JSON.stringify(item.Value)
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      return Object.assign({}, this.DataSubmit)
    },
    manualUpdate () {
      new CustomersIPD().create(this.Customer, 'ManualUpdate/' + this._VisitId).then(response => {
        this.toastedSuccess()
        EventBus.$emit('updateGlobalIpdTopbaInfo')
        this.reload()
      })
    },
    async submit () {
      if (this.routeType === 'CardiovascularForm') {
        await this.$refs.BMTIMMACH1.handleCheckMapMD(true)
      }
      var DataSubmit = this.getDataSubmit()
      NProgress.start()
      setTimeout(() => {
        new MedicalRecord({hidemsg: true, noLoading: true}).update('Part1/' + this.typeForm + '/' + this._VisitId, DataSubmit).then(response => {
          this.checkBoder = false
          this.handlerResponse(response)
          this.syncInfo = null
          this.manualUpdate()
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
    },
    syncLastIpdData () {
      new MedicalRecord().update('Part1/Sync/' + this.typeForm + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit.Datas = response.Datas
        this.DataSubmit.Customer = response.Customer
        this.syncInfo = response
        this.mapData()
      })
    },
    mapData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (this.icd10Code.includes(item.Code)) {
                item.Value = this.JSONParse(exited.Value)
              } else {
                item.Value = exited.Value
                if (!exited.Value && this.checkString(item.DataType, 'Text') && this.$store.state.account.Username === 'thangdc3') {
                  item.Value = item.ViName
                }
              }
            } else {
              if (this.checkString(item.DataType, 'Text') && this.$store.state.account.Username === 'thangdc3') {
                item.Value = item.ViName
              }
              if (this.DataSubmit.TranferInfo) {
                if (this.icd10Code.includes(item.Code) && this.DataSubmit.TranferInfo.ICD) {
                  item.Value = this.JSONParse(this.DataSubmit.TranferInfo.ICD)
                }
                if (item.Code === 'IPDMRPOCDNCANS') {
                  item.Value = this.DataSubmit.TranferInfo.Diagnosis
                }
              }
            }
          })
        }
      }
      if (this.DataSubmit.Customer.IssueDate === null) {
        this.DataSubmit.Customer.IssueDate = ''
      }
      if (this.DataSubmit.Customer.ExpireHealthInsuranceDate === null) {
        this.DataSubmit.Customer.ExpireHealthInsuranceDate = ''
      }
      this.Customer = this.DataSubmit.Customer
      if (this.Customer.VisitCode) {
        this.checkBoder = false
      }
      this.firstCustomer = JSON.stringify(this.DataSubmit.Customer)
      this.edited = false
    },
    getData () {
      // this.getProvinceAndDistrict()
      new MedicalRecord().find('Part1/' + this.typeForm + '/' + this._VisitId).then(response => {
        if (response.ErrorPopup) {
          this.pId = response.Id
          this.message = response.ViMessage
          this.isErrorPop = true
        }
        this.loaded = true
        this.DataSubmit = response
        if (response && response.DatasPart3 && response.DatasPart3.length) {
          response.DatasPart3.find(e => {
            if (e.Code === 'IPDMRPE927') {
              this.ListSoSinh = this.JSONParse(e.Value)
            }
          })
        }
        this.mapData()
        if (response.IsNew) {
          this.syncLastIpdData()
        }
        this.VisitTypes.forEach(e => {
          e.Value = e.Value === this.DataSubmit.ReadOnly.VisitType
        })
        var TransferInfoId = (response.GeneralDatas.find(e => e.Code === 'IPDMRPTNONHANS') || {}).Value
        this.TransferInfo = this.MDSPECIALITIES.find(e => e.Id === TransferInfoId)
        this.InterHospitalInfo.forEach(e => {
          e.Value = response.GeneralDatas.find(f => f.Code === e.Code && (f.Value === 'True'))
        })
        this.InterHospitalInfoTo = (response.GeneralDatas.find(e => e.Code === 'IPDMRPTNTBVANS') || {}).Value
        this.DataSubmit.ReadOnly.ICD = this.JSONParse(this.DataSubmit.ReadOnly.ICD, true)
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        this.nullContent = false
        if (this.routeType === 'Obstetrics') {
          new MedicalRecord().find('Part3/SyncInfoNewborn/' + this._VisitId).then(res => {
            this.optionChild = res.NewbornFromInitialAsseesment
          }).catch(e => {
            this.optionChild = []
          })
        }
        this.getJobList('new')
      }).catch(e => {
        this.nullContent = true
        this.loaded = true
        this.DataSubmit = false
        if (e.status === 404) {}
      })
    },
    create () {
      new MedicalRecord().update('Part1/Create/' + this.typeForm + '/' + this._VisitId, {}).then(response => {
        // this.SyncOnlyVisit()
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Thông báo'),
        text: this.$t(`Tạo mới BỆNH ÁN ${this.nameRoute} - HÀNH CHÍNH ?`),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.$t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA) || this.firstCustomer !== JSON.stringify(this.Customer)) {
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
    },
    changeData () {
      if (this.MASTERDATA['IPDMRPOS3']) {
        this.MASTERDATA['IPDMRPOS3'].ViName = 'Sinh ngày'
        this.MASTERDATA['IPDMRPOS3'].EnName = 'Date of birth'
      }
      if (this.MASTERDATA['IPDMRPOS7']) {
        this.MASTERDATA['IPDMRPOS7'].ViName = 'Sinh ngày'
        this.MASTERDATA['IPDMRPOS7'].EnName = 'Date of birth'
      }
    },
    getTextWarning () {
      return 'CHƯA CÓ BỆNH ÁN ' + this.MedicalRecordFormName + ' - HÀNH CHÍNH'
    },
    getMaForm (typeForm) {
      let maForm = ''
      if (typeForm === 'BMTIMMACH') {
        return ''
      }
      maForm = typeForm
      return maForm
    }
  }
}
</script>
<style scoped>
  .input-para {
    width: 150px;
  }
  .borderColor {
    border-color: red
  }
</style>
