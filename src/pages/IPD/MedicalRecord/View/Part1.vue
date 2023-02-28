<template>
  <div class="main-content">
    <template v-if="loaded && dex && dex.length">
      <template v-if="DataSubmit">
        <div class="box box-table">
          <div class="box-body">
            <label class="block-title">I. {{__t2('HÀNH CHÍNH')}}:</label>
            <div class="ml-10">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="Fullname">PID:</label>
                    <FakeInput v-model="Customer.PID" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group" :class="{'disable': !Customer.PID }">
                    <label for="DateOfBirth">{{__t2('Lượt tiếp nhận')}}:</label>
                    <FakeInput v-model="Customer.VisitCode" />
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{dex[1]}} {{__t2('Họ và tên')}}:</label>
                      <FakeInput style="flex-grow: 1;" v-model="Customer.Fullname" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{dex[2]}} {{__t2('Sinh ngày')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input readonly v-model="Customer.DateOfBirth" :placeholder="vDateFormat" class="form-control" />
                        <span class="input-group-addon" style="background-color: #eee">{{Customer.AgeFormated | formatAge}}</span>
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
                        <span class="input-group-addon" style="background-color: #eee">{{Customer.MOHJobCode}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mrb10" v-if="routeType === 'Neonatal'">
                <div class="col-md-6" v-if="MASTERDATA['IPDMRPO62']">
                  <div class="form-gro2up">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5">{{dex[4]}} {{__label(MASTERDATA['IPDMRPO62'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input readonly v-model="MASTERDATA['IPDMRPO62'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6" v-if="MASTERDATA['IPDMRPOS3']">
                  <VAgeInput :readonly="true" v-if="MASTERDATA['IPDMRPOS3']" :label="MASTERDATA['IPDMRPOS3']" v-model="MASTERDATA['IPDMRPOS3'].Items[0].Value" />
                </div>
                <div class="col-md-6 mrt20" v-if="MASTERDATA['IPDMRPO66']">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__label(MASTERDATA['IPDMRPO66'])}}</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input readonly type="text" class="form-control" v-model="MASTERDATA['IPDMRPO66'].Items[0].Value" :placeholder="__t('Nhập')">
                        <span class="input-group-addon" style="background-color: #eee">{{MASTERDATA['IPDMRPO66'].Items[0].Note}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mrt20" v-if="MASTERDATA['IPDMRPOS5']">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__label(MASTERDATA['IPDMRPOS5'])}}</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input readonly type="text" class="form-control" v-model="MASTERDATA['IPDMRPOS5'].Items[0].Value" :placeholder="__t('Nhập')">
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
                        <input readonly v-model="MASTERDATA['IPDMRPO56'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6" v-if="MASTERDATA['IPDMRPOS7']">
                  <VAgeInput :readonly="true" v-if="MASTERDATA['IPDMRPOS7']" :label="MASTERDATA['IPDMRPOS7']" v-model="MASTERDATA['IPDMRPOS7'].Items[0].Value" />
                </div>
                <div class="col-md-6 mrt20" v-if="MASTERDATA['IPDMRPO60']">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__label(MASTERDATA['IPDMRPO60'])}}</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input readonly type="text" class="form-control" v-model="MASTERDATA['IPDMRPO60'].Items[0].Value" :placeholder="__t('Nhập')">
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
                        <input readonly :placeholder="__t('N/A')" v-model="Customer.MOHNationality" class="form-control" />
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
                        <input type="text" readonly class="form-control" v-model="Customer.Nationality" :placeholder="__t('N/A')">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6" v-if="routeType !== 'Pediatric' && routeType !== 'Neonatal'">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__t('customer.so_dien_thoai')}}</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input type="text" readonly class="form-control" v-model="Customer.Phone" :placeholder="__t('N/A')"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="routeType !== 'Pediatric' && routeType !== 'Neonatal'">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>{{__t('Số CMTND/Hộ chiếu')}}</label>
                    <input type="text" readonly class="form-control" v-model="Customer.IdentificationCard" :placeholder="__t('N/A')"/>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>{{__t('Ngày cấp')}}</label>
                    <input type="text" readonly class="form-control" v-model="Customer.IssueDate" :placeholder="__t('N/A')"/>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label class="hidden-text">{{__t('Nơi cấp')}}</label>
                    <input type="text" readonly class="form-control" v-model="Customer.IssuePlace" :placeholder="__t('N/A')"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="text-left no-wrap mr-5 full-width">{{dex[7]}} {{__t('Địa chỉ (Số nhà - thôn/phố - xã/phường)')}}:</label>
                    <textarea-autosize readonly rows="2" v-model="Customer.MOHAddress" class="form-control" :placeholder="__t('N/A')"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__t2('Tỉnh, Thành phố-mdc')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input type="text" readonly class="form-control" v-model="Customer.MOHProvince" :placeholder="__t('N/A')"/>
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
                        <input type="text" readonly class="form-control" v-model="Customer.MOHDistrict" :placeholder="__t('N/A')"/>
                        <span class="input-group-addon" style="background-color: #eee">{{Customer.MOHDistrictCode}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="routeType === 'Pediatric' && routeType !== 'Neonatal'">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box">
                      <label class="text-left no-wrasp mr-5 lb-w2">7. {{__label(MASTERDATA['IPDMRPO56'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="MASTERDATA['IPDMRPO56'].Items[0].Value" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5"> {{__label(MASTERDATA['IPDMRPO58'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="MASTERDATA['IPDMRPO58'].Items[0].Value" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5 lb-w2"> {{__label(MASTERDATA['IPDMRPO60'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="MASTERDATA['IPDMRPO60'].Items[0].Value" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="routeType === 'Pediatric' && routeType !== 'Neonatal'">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5 lb-w2"> {{__label(MASTERDATA['IPDMRPO62'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="MASTERDATA['IPDMRPO62'].Items[0].Value" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5"> {{__label(MASTERDATA['IPDMRPO64'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="MASTERDATA['IPDMRPO64'].Items[0].Value" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5 lb-w2"> {{__label(MASTERDATA['IPDMRPO66'])}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="MASTERDATA['IPDMRPO66'].Items[0].Value" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6" v-if="routeType !== 'Pediatric' && routeType !== 'Neonatal'">
                  <div class="form-group">
                    <div class="flex-box">
                      <label class="text-left no-wrap mr-5 lb-w2">{{dex[8]}} {{__t('Nơi làm việc')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <textarea-autosize readonly rows="2" type="text" class="form-control" :placeholder="__t('N/A')" v-model="Customer.WorkPlace"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6" v-if="routeType !== 'Neonatal'">
                  <div class="form-group">
                    <div class="flex-box flex-center mb-5">
                      <label class="text-left no-wrap mr-5 lb-w2">{{dex[9]}} {{__t('Đối tượng')}}:</label>
                      <div class="for2m-group" style="flex-grow: 1">
                        <radio-list :readonly="true" v-model="Customer.MOHObject" :options="MOHOBJECT" />
                      </div>
                    </div>
                    <textarea-autosize readonly rows="2" v-model="Customer.MOHObjectOther" class="form-control" v-if="Customer.MOHObject === '4'" :placeholder="__t('Nhập')" />
                  </div>
                </div>
              </div>
              <div class="row" v-if="routeType !== 'Neonatal'">
                <div class="col-md-6">
                  <div class="form-gr2oup">
                    <div class="flex-box flex-csenter">
                      <label class="text-left no-wrasp mr-5 lb-w2">{{dex[10]}} {{__t2('BHYT giá trị đến')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input type="text" readonly class="form-control" v-model="Customer.ExpireHealthInsuranceDate" :placeholder="__t('N/A')"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="flex-box 2-center">
                      <label class="text-left no-wrap mr-5 lb-w2">{{__t2('Số BHYT')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input type="text" readonly class="form-control" v-model="Customer.HealthInsuranceNumber" :placeholder="__t('N/A')"/>
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
                        <input readonly v-model="MASTERDATA['IPDMRPOS9'].Items[0].Value" class="form-control" :placeholder="__t('Nhập')" />
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
                        <VNumberInput :readonly="true" class="input-para" v-model="MASTERDATA['IPDMRPOS11'].Items[0].Value" :placeholder="__t('Nhập')"/>
                        <div style="margin-left:10px;">{{__label(MASTERDATA['IPDMRPOS11'].Items[0])}}</div>
                      </div>
                      <div class="flex align-center mrb10">
                        <VNumberInput :readonly="true" class="input-para" v-model="MASTERDATA['IPDMRPOS11'].Items[1].Value" :placeholder="__t('Nhập')"/>
                        <div style="margin-left:10px;">{{__label(MASTERDATA['IPDMRPOS11'].Items[1])}}</div>
                      </div>
                      <div class="flex align-center mrb10">
                        <VNumberInput :readonly="true" class="input-para" v-model="MASTERDATA['IPDMRPOS11'].Items[2].Value" :placeholder="__t('Nhập')"/>
                        <div style="margin-left:10px;">{{__label(MASTERDATA['IPDMRPOS11'].Items[2])}}</div>
                      </div>
                      <div class="flex align-center">
                        <VNumberInput :readonly="true" class="input-para" v-model="MASTERDATA['IPDMRPOS11'].Items[3].Value" :placeholder="__t('Nhập')"/>
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
                        <input readonly v-model="Customer.RelationshipContact" class="form-control" :placeholder="__t('Nhập')" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <textarea-autosize readonly class="form-control mrt10" rows="3" :placeholder="__t('Nhập')" v-model="Customer.Relationship"/>
                </div>
              </div>
              <div class="row" v-if="routeType !== 'Neonatal'">
                <div class="col-md-6">
                  <div class="form-gr2oup">
                    <div class="flex-box flex-csenter">
                      <label v-if="routeType === 'Gynecological'" class="text-left no-wrasp mr-5 lb-w2">{{dex[11]}} {{__t('Họ tên, địa chỉ người nhà cần báo tin-mdcGy')}}:</label>
                      <label v-else class="text-left no-wrasp mr-5 lb-w2">{{dex[11]}} {{__t('Họ tên, địa chỉ người nhà cần báo tin')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input type="text" readonly class="form-control" v-model="Customer.Relationship" :placeholder="__t('N/A')"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-gro2up">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrasp mr-5">{{__t('Điện thoại số')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <input readonly v-model="Customer.RelationshipContact" class="form-control" :placeholder="__t('N/A')" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <template v-if="routeType === 'CardiovascularForm'">
                <BMTIMMACH1 :box1="true" :readonly="true" :MASTERDATA="MASTERDATA" ref="BMTIMMACH1" :DataSubmit="DataSubmit"/>
              </template>
              <template v-else>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-10">
                      <div class="flex-box flex-cxenter mb-5">
                        <label class="text-left no-wrap mr-5 lb-w2">{{dex[14]}} {{__t('Nơi giới thiệu')}}:</label>
                        <div class="form-grxoup">
                          <MDRadioView v-if="MASTERDATA['IPDMRPONOGT']" :indexs="[0, 1, 2]" :data="MASTERDATA['IPDMRPONOGT'].Items"/>
                        </div>
                        <FakeInput style="flex-grow: 1" v-model="MASTERDATA['IPDMRPONOGT'].Items[3].Value" />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <div class="flex-box flex-center">
                        <label class="text-left no-wrap mr-5">{{__t('Vào viện do bệnh này lần thứ')}}:</label>
                        <div class="input-group" style="flex-grow: 1">
                          <input readonly class="form-control" :placeholder="__t('N/A')" v-model="MASTERDATA['IPDMRPOVVDB'].Items[0].Value"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div class="row">
                <div class="col-md-7">
                  <div class="form-group">
                    <div class="flex-box">
                      <label class="text-left no-wrap mr-5" v-if="routeType === 'Neonatal'">{{dex[20]}} Nơi chuyển đến:</label>
                      <label class="text-left no-wrap mr-5" v-else>{{dex[20]}} {{__t('Chẩn đoán nơi chuyển đến')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <FakeInput v-model="MASTERDATA['IPDMRPOCDNC'].Items[0].Value" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <div class="flex-box flex-center">
                      <label class="text-left no-wrap mr-5">{{__t('Mã ICD10')}}:</label>
                      <div class="input-group" style="flex-grow: 1">
                        <Icd10View2 :mdCode="'IPDMRPOMICD'" :single="true" v-model="MASTERDATA['IPDMRPOMICD'].Items[0].Value"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <PatientStatusAndDiagnose :routeType="routeType" :DataSubmit="DataSubmit" :DataSubmitReadOnly="DataSubmit.ReadOnly" :dex="dex" :typeForm="typeForm" :VisitId="VisitId" :VisitIdDrop="VisitIdDrop" :optionChild="optionChild" :ListSoSinh="ListSoSinh"/>
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
// import MixinForm from '@/mixins/form.js'
import MedicalRecord from '@/services/IPD/MedicalRecord'
import PatientStatusAndDiagnose from '@/pages/IPD/MedicalRecord/PatientStatusAndDiagnose.vue'
import constants from '@/constants.js'
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
import EventBus from '@/lib/eventBus'
import MedicalRecordMixinForm from '@/pages/IPD/MedicalRecord/Mixin.js'
import utils from '@/utils'
import BMTIMMACH1 from '@/pages/IPD/MedicalRecord/Page2CPN/BMTIMMACH1.vue'
export default {
  name: 'IPDMedicalRecordPart1',
  props: ['routeType', 'VisitIdDrop', 'VisitId'],
  mixins: [MixinMasterData, MedicalRecordMixinForm],
  data () {
    return {
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
      Customer: {
      },
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
      dex: [],
      optionChild: [],
      ListSoSinh: []
    }
  },
  watch: {
    VisitIdDrop () {
      this.getData()
    }
  },
  components: {
    PatientStatusAndDiagnose, BMTIMMACH1
  },
  mounted () {
    this.dex = this.getIndex(this.routeType)
    this.getMasterDatas({Form: 'IPDMRPO'}, () => {
      this.getData()
      this.changeData()
      EventBus.$emit('updateGlobalIpdTopbaInfo', [])
    })
  },
  computed: {
    age () {
      if (!this.Customer) return 'N/A'
      return utils.getAge(this.Customer.DateOfBirth)
    },
    age2 () {
      if (this.MASTERDATA['IPDMRPOS3'].Items[0].Value) {
        var now = new Date()
        var y = now.getFullYear()
        var dob = this.MASTERDATA['IPDMRPOS3'].Items[0].Value.split('/')
        return y - parseInt(dob[2])
      }
      return 'N/A'
    },
    age3 () {
      if (this.MASTERDATA['IPDMRPOS7'].Items[0].Value) {
        var now = new Date()
        var y = now.getFullYear()
        var dob = this.MASTERDATA['IPDMRPOS7'].Items[0].Value.split('/')
        return y - parseInt(dob[2])
      }
      return 'N/A'
    },
    typeForm () {
      return this.MedicalRecordFormCode
    },
    jobList () {
      var jobs = []
      var mdJob = []
      if (this.Customer.MOHJob) jobs = [this.Customer.MOHJob]
      if (this.JOBLIST) mdJob = this.JOBLIST.map(e => e.ViName)
      return [...new Set(jobs.concat(mdJob))]
    }
  },
  methods: {
    getData () {
      // this.getProvinceAndDistrict()
      new MedicalRecord().find('Part1/' + this.typeForm + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
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
        this.VisitTypes.forEach(e => {
          e.Value = e.Value === this.DataSubmit.ReadOnly.VisitType
        })
        var TransferInfoId = (response.GeneralDatas.find(e => e.Code === 'IPDMRPTNONHANS') || {}).Value
        this.TransferInfo = this.MDSPECIALITIES.find(e => e.Id === TransferInfoId)
        this.InterHospitalInfo.forEach(e => {
          e.Value = response.GeneralDatas.find(f => f.Code === e.Code && (f.Value === 'True'))
        })
        if (response.MoveIn) {
          this.InterHospitalInfoTo = response.MoveIn
        }
        this.DataSubmit.ReadOnly.ICD = this.JSONParse(this.DataSubmit.ReadOnly.ICD, true)
        this.Customer = this.DataSubmit.Customer
        if (this.routeType === 'Obstetrics') {
          new MedicalRecord().find('Part3/SyncInfoNewborn/' + this._VisitId).then(res => {
            this.optionChild = res.NewbornFromInitialAsseesment
          }).catch(e => {
            this.optionChild = []
          })
        }
        this.getJobList()
        this.changeIcd()
      }).catch(e => {
        console.log(e)
        this.loaded = true
        this.DataSubmit = false
        if (e.status === 404) {}
      })
    },
    getTextWarning () {
      return 'CHƯA CÓ BỆNH ÁN ' + this.MedicalRecordFormName + ' - HÀNH CHÍNH'
    },
    getJobList (str) {
      if (this.JOBLIST) return
      this.getRawMasterDatas({Form: 'GENJOBB'}, (data) => {
        this.JOBLIST = data
        if (this.MASTERDATA['IPDMRPO66'] && this.MASTERDATA['IPDMRPO66'].Items[0].Value) {
          this.setJobCode2(this.MASTERDATA['IPDMRPO66'].Items[0].Value)
        }
        if (this.MASTERDATA['IPDMRPO60'] && this.MASTERDATA['IPDMRPO60'].Items[0].Value) {
          this.setJobCode3(this.MASTERDATA['IPDMRPO60'].Items[0].Value)
        }
      })
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
    changeIcd () {
      if (this.MASTERDATA['IPDMRPE888'] && this.MASTERDATA['IPDMRPE888'].Items[0].Value) {
        this.MASTERDATA['IPDMRPE888'].Items[0].Value = this.JSONParse(this.MASTERDATA['IPDMRPE888'].Items[0].Value)
      }
      if (this.MASTERDATA['IPDMRPE891'] && this.MASTERDATA['IPDMRPE891'].Items[0].Value) {
        this.MASTERDATA['IPDMRPE891'].Items[0].Value = this.JSONParse(this.MASTERDATA['IPDMRPE891'].Items[0].Value)
      }
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
    }
  }
}
</script>
