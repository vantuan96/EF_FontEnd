<template>
  <div class="Eye2" v-if="MASTERDATA && DataSubmit">
    <div id="MedicalRecordEye-part2-block1">
      <label class="block-title" v-if="MASTERDATA['IPDMRPTLDVV']">1. {{__label(MASTERDATA['IPDMRPTLDVV'])}}:</label>
      <div class="ml-10">
        <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTLDVV']" v-model="MASTERDATA['IPDMRPTLDVV']" :hidelabel="true"/>
        <template v-if="!syncInfo && DataSubmit.TranferInfo && DataSubmit.IsNew">
          <div class="row">
            <div class="col-md-12"><p class="note-text text-right"><label class="label label-warning"><i aria-hidden="true" class="fa fa-check v-green"></i> {{__t('Thông tin được đồng bộ từ khoa')}}: {{DataSubmit.TranferInfo.SpecialtyName}}</label></p></div>
          </div>
        </template>
      </div>
    </div>
    <div class="mrb10" id="MedicalRecordEye-part2-block2">
      <label class="block-title" v-if="MASTERDATA['IPDMRPT1050']">{{__label(MASTERDATA['IPDMRPT1050'])}}:</label>
      <div class="ml-10 bg-gray-2">
        <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT1051']" v-model="MASTERDATA['IPDMRPT1051']"/>
        <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT1053']" v-model="MASTERDATA['IPDMRPT1053']"/>
        <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT1055']" v-model="MASTERDATA['IPDMRPT1055']"/>
      </div>
    </div>
    <dir id="MedicalRecordEye-part2-block3" style="padding-left: 0px!important">
      <label class="block-title">3. {{__t('Tiền sử')}}:</label>
      <div class="ml-10 mrb10">
        <label>{{__t('Bản thân')}}:</label>
        <div class="bg-gray-2 mrb10">
          <label>{{__t('Dị ứng')}}:</label>
          <md-input-text :readonly="readonly" :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT01']" v-model="MASTERDATA['IPDMRPT01']"/>
          <span style="display: block" v-if="DataSubmit.Allergy && !readonly">{{__t('Thông tin dị ứng đã được điều dưỡng khai thác')}}: {{DataSubmit.Allergy || ''}} <BtnCopy :value="null" @copy="handleCopyDiUng"/></span>
          <label v-if="MASTERDATA['IPDMRPT1057']">{{__label(MASTERDATA['IPDMRPT1057'])}}:</label>
          <md-input-text :readonly="readonly" :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT1057']" v-model="MASTERDATA['IPDMRPT1057']"/>
          <label v-if="MASTERDATA['IPDMRPT1644']">{{__label(MASTERDATA['IPDMRPT1644'])}}:</label>
          <md-input-text :readonly="readonly" :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT1644']" v-model="MASTERDATA['IPDMRPT1644']"/>
        </div>
        <label>{{__t('Gia đình')}}:</label>
        <div class="bg-gray-2 mrb20">
          <label v-if="MASTERDATA['IPDMRPT1059']">{{__label(MASTERDATA['IPDMRPT1059'])}}:</label>
          <md-input-text :readonly="readonly" :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT1059']" v-model="MASTERDATA['IPDMRPT1059']"/>
          <label v-if="MASTERDATA['IPDMRPT1061']">{{__label(MASTERDATA['IPDMRPT1061'])}}:</label>
          <md-input-text :readonly="readonly" :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT1061']" v-model="MASTERDATA['IPDMRPT1061']"/>
        </div>
        <div class="bg-gray-2">
          <label>
            {{__t('Thuốc đang dùng (Bao gồm cả thuốc kê đơn và không kê đơn)')}}:
          </label>
          <list-of-current-medications
            ref="ListOfCurrentMedications"
            :Type="'IPD-PatientMedicationList'"
            :VisitTypeGroupCode="'IPD'"
            :RealOnly="readonly"
            :urlFile="urlFile"
            :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"/>
        </div>
      </div>
    </dir>
    <div id="MedicalRecordEye-part2-block4" class="mrb10">
      <label class="block-title">4 {{__t('Khám bệnh')}}:</label>
      <label class="block">4.1 {{__t('Khám mắt')}}:</label>
      <!-- 1 -->
      <label v-if="MASTERDATA['IPDMRPT1064']">{{__label(MASTERDATA['IPDMRPT1064'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="flex align-center space-between mrb10">
                <div class="flex align-center space-between" style="width: 50%" v-if="MASTERDATA['IPDMRPTR1079']">
                  <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTR1079'])}}:</b></div>
                  <div><MDText :placeholder="__t('Nhập')" style="120px" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1079'].Items[0].Value"/></div>
                </div>
                <div class="flex align-center space-between" style="width: 50%;padding-left: 10px;" v-if="MASTERDATA['IPDMRPTR1081']">
                  <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTR1081'])}}:</b></div>
                  <div><MDText :placeholder="__t('Nhập')" style="120px" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1081'].Items[0].Value"/></div>
                </div>
              </div>
              <div class="flex align-center space-between">
                <div class="flex align-center space-between" style="width: 50%" v-if="MASTERDATA['IPDMRPTR1083']">
                  <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTR1083'])}}:</b></div>
                  <div><MDText :placeholder="__t('Nhập')" style="120px" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1083'].Items[0].Value"/></div>
                </div>
                <div class="flex align-center space-between" style="width: 50%;padding-left: 10px;" v-if="MASTERDATA['IPDMRPTR1085']">
                  <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTR1085'])}}:</b></div>
                  <div><MDText :placeholder="__t('Nhập')" style="120px" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1085'].Items[0].Value"/></div>
                </div>
              </div>
            </td>
            <td>
              <div class="flex align-center space-between mrb10">
                <div class="flex align-center space-between" style="width: 50%" v-if="MASTERDATA['IPDMRPTL1079']">
                  <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTL1079'])}}:</b></div>
                  <div><MDText :placeholder="__t('Nhập')" style="120px" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1079'].Items[0].Value"/></div>
                </div>
                <div class="flex align-center space-between" style="width: 50%;padding-left: 10px;" v-if="MASTERDATA['IPDMRPTL1081']">
                  <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTL1081'])}}:</b></div>
                  <div><MDText :placeholder="__t('Nhập')" style="120px" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1081'].Items[0].Value"/></div>
                </div>
              </div>
              <div class="flex align-center space-between">
                <div class="flex align-center space-between" style="width: 50%" v-if="MASTERDATA['IPDMRPTL1083']">
                  <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTL1083'])}}:</b></div>
                  <div><MDText :placeholder="__t('Nhập')" style="120px" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1083'].Items[0].Value"/></div>
                </div>
                <div class="flex align-center space-between" style="width: 50%;padding-left: 10px;" v-if="MASTERDATA['IPDMRPTL1085']">
                  <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTL1085'])}}:</b></div>
                  <div><MDText :placeholder="__t('Nhập')" style="120px" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1085'].Items[0].Value"/></div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 2 -->
      <label v-if="MASTERDATA['IPDMRPT1065']">{{__label(MASTERDATA['IPDMRPT1065'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-if="MASTERDATA['IPDMRPTR1087']"><MDText :placeholder="__t('Nhập')" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1087'].Items[0].Value"/></td>
            <td v-if="MASTERDATA['IPDMRPTL1087']"><MDText :placeholder="__t('Nhập')" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1087'].Items[0].Value"/></td>
          </tr>
        </tbody>
      </table>
      <!-- 3 -->
      <label v-if="MASTERDATA['IPDMRPT1066']">{{__label(MASTERDATA['IPDMRPT1066'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div v-if="MASTERDATA['IPDMRPTR1089']" class="mrb10"><MDText :placeholder="__t('Nhập')" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1089'].Items[0].Value"/></div>
              <div v-if="MASTERDATA['IPDMRPTR1091']" class="flex align-center">
                <div class="mrr10">{{__label(MASTERDATA['IPDMRPTR1091'])}}:</div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1091']"/>
              </div>
            </td>
            <td>
              <div v-if="MASTERDATA['IPDMRPTL1089']" class="mrb10"><MDText :placeholder="__t('Nhập')" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1089'].Items[0].Value"/></div>
              <div v-if="MASTERDATA['IPDMRPTL1091']" class="flex align-center">
                <div class="mrr10">{{__label(MASTERDATA['IPDMRPTL1091'])}}:</div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1091']"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 4 -->
      <label v-if="MASTERDATA['IPDMRPT1067']">{{__label(MASTERDATA['IPDMRPT1067'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-if="MASTERDATA['IPDMRPTR1093']">
              <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1093']"/>
            </td>
            <td v-if="MASTERDATA['IPDMRPTL1093']">
              <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1093']"/>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 5 -->
      <label v-if="MASTERDATA['IPDMRPT1068']">{{__label(MASTERDATA['IPDMRPT1068'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div v-if="MASTERDATA['IPDMRPTR1109'] && MASTERDATA['IPDMRPTR1096']" class="mrb10">
                <div class="flex align-center mrb10">
                  <MdRadiosInput4 @change="handleChangeMDR('bt')" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1096']"/>
                  <MdRadiosInput4 @change="handleChangeMDR('')" :indexs="[1, 2, 3, 4, 5]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1096']"/>
                </div>
                <div class="flex align-center mrb10">
                  <MdRadiosInput4 class="mrr10" @change="handleChangeMDR('')" :indexs="[6]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1096']"/>
                  <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1096'].Items[6].Value" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1096'].Items[7].Value"/>
                </div>
                <div class="flex align-center mrb10">
                  <MdRadiosInput4 @change="handleChangeMDR('')" :readonly="readonly" :indexs="[0]" v-model="MASTERDATA['IPDMRPTR1109']"/>
                  <template v-for="(e, index) in MASTERDATA['IPDMRPTR1109'].Items">
                    <div :key="index" v-if="index !== 0 && MASTERDATA['IPDMRPTR1109'].Items[0].Value" class="flex align-center">
                      <div class="mrl5 mrr5">{{__label(e)}}: </div>
                      <MDText :placeholder="__t('Nhập')" rows="1" style="width: 90px" :readonly="readonly" v-model="e.Value"/>
                    </div>
                  </template>
                </div>
                <MdRadiosInput4 @change="handleChangeMDR('')" :indexs="[8, 9, 10, 11]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1096']"/>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1114']">
                <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPTR1114'])}}: </div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1114']"/>
              </div>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1119']">
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1119']" :indexs="[0]"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1119'].Items[0].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1119'].Items[1].Value"/>
              </div>
            </td>
            <td>
              <div v-if="MASTERDATA['IPDMRPTL1109'] && MASTERDATA['IPDMRPTL1096']" class="mrb10">
                <div class="flex align-center mrb10">
                  <MdRadiosInput4 @change="handleChangeMDL2('bt')" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1096']"/>
                  <MdRadiosInput4 @change="handleChangeMDL2('')" :indexs="[1, 2, 3, 4, 5]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1096']"/>
                </div>
                <div class="flex align-center mrb10">
                  <MdRadiosInput4 class="mrr10" @change="handleChangeMDL2('')" :indexs="[6]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1096']"/>
                  <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1096'].Items[6].Value" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1096'].Items[7].Value"/>
                </div>
                <div class="flex align-center mrb10">
                  <MdRadiosInput4 @change="handleChangeMDL2('')" :readonly="readonly" :indexs="[0]" v-model="MASTERDATA['IPDMRPTL1109']"/>
                  <template v-for="(e, index) in MASTERDATA['IPDMRPTL1109'].Items">
                    <div :key="index" v-if="index !== 0 && MASTERDATA['IPDMRPTL1109'].Items[0].Value" class="flex align-center">
                      <div class="mrl5 mrr5">{{__label(e)}}: </div>
                      <MDText :placeholder="__t('Nhập')" rows="1" style="width: 90px" :readonly="readonly" v-model="e.Value"/>
                    </div>
                  </template>
                </div>
                <MdRadiosInput4 @change="handleChangeMDL2('')" :indexs="[8, 9, 10, 11]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1096']"/>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1114']">
                <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPTL1114'])}}: </div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1114']"/>
              </div>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1119']">
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1119']" :indexs="[0]"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1119'].Items[0].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1119'].Items[1].Value"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 6 -->
      <label v-if="MASTERDATA['IPDMRPT1069']">{{__label(MASTERDATA['IPDMRPT1069'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="mrb10" v-if="MASTERDATA['IPDMRPTR1122']">
                <div class="mrb10 flex align-center" style="min-width: 80px;">
                  <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPTR1122'])}}:</div>
                  <MdRadiosInput4 :readonly="readonly" class="mrb10" :indexs="[0, 1]" v-model="MASTERDATA['IPDMRPTR1122']"/>
                </div>
                <MdRadiosInput4 :readonly="readonly" class="mrb10" :indexs="[2, 3, 4]" v-model="MASTERDATA['IPDMRPTR1122']"/>
                <MdRadiosInput4 :readonly="readonly" :indexs="[5, 6, 7]" v-model="MASTERDATA['IPDMRPTR1122']"/>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1131']">
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1131']" :indexs="[0]"/>
                <template v-for="(e, index) in MASTERDATA['IPDMRPTR1131'].Items">
                  <div :key="index" v-if="index !== 0 && MASTERDATA['IPDMRPTR1131'].Items[0].Value" class="flex align-center">
                    <div class="mrl10" >{{__label(e)}}: </div>
                    <MDText :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="e.Value"/>
                  </div>
                </template>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1136']">
                <div class="fw600 mrr10" style="min-width: 50px;">{{__label(MASTERDATA['IPDMRPTR1136'])}}: </div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1136']"/>
              </div>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1140']">
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1140']" :indexs="[0]"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1140'].Items[0].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1140'].Items[1].Value"/>
              </div>
            </td>
            <td>
              <div class="mrb10" v-if="MASTERDATA['IPDMRPTL1122']">
                <div class="mrb10 flex align-center" style="min-width: 80px;">
                  <div class="mrr10 fw600">{{__label(MASTERDATA['IPDMRPTL1122'])}}:</div>
                  <MdRadiosInput4 :readonly="readonly" class="mrb10" :indexs="[0, 1]" v-model="MASTERDATA['IPDMRPTL1122']"/>
                </div>
                <MdRadiosInput4 :readonly="readonly" class="mrb10" :indexs="[2, 3, 4]" v-model="MASTERDATA['IPDMRPTL1122']"/>
                <MdRadiosInput4 :readonly="readonly" :indexs="[5, 6, 7]" v-model="MASTERDATA['IPDMRPTL1122']"/>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1131']">
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1131']" :indexs="[0]"/>
                <template v-for="(e, index) in MASTERDATA['IPDMRPTL1131'].Items">
                  <div :key="index" v-if="index !== 0 && MASTERDATA['IPDMRPTL1131'].Items[0].Value" class="flex align-center">
                    <div class="mrl10" >{{__label(e)}}: </div>
                    <MDText :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="e.Value"/>
                  </div>
                </template>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1136']">
                <div class="fw600 mrr10" style="min-width: 50px;">{{__label(MASTERDATA['IPDMRPTL1136'])}}: </div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1136']"/>
              </div>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1140']">
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1140']" :indexs="[0]"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1140'].Items[0].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1140'].Items[1].Value"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 7 -->
      <label v-if="MASTERDATA['IPDMRPT1070']">{{__label(MASTERDATA['IPDMRPT1070'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <VUpload2
                  code="IPDMRPTR1143"
                  :widthImg="'400px'"
                  v-if="MASTERDATA['IPDMRPTR1143']"
                  planUpdate="Bác sĩ tải hình ảnh tại đây (cho phép tải 1 hoặc nhiều ảnh)"
                  :readonly="readonly"
                  :dataFile="MASTERDATA['IPDMRPTR1143'].Items[1]"
                  :dataImg="MASTERDATA['IPDMRPTR1143'].Items[0]"
                  :index="[5, 6]"
                  :bgImg="'static/bgrTaiMat.png'"
                  class="mrb10"
                  :dataDropfile="dataDropfile"
                  />
            </td>
            <td>
              <VUpload2
                  code="IPDMRPTL1143"
                  :widthImg="'400px'"
                  v-if="MASTERDATA['IPDMRPTL1143']"
                  planUpdate="Bác sĩ tải hình ảnh tại đây (cho phép tải 1 hoặc nhiều ảnh)"
                  :readonly="readonly"
                  :dataFile="MASTERDATA['IPDMRPTL1143'].Items[1]"
                  :dataImg="MASTERDATA['IPDMRPTL1143'].Items[0]"
                  :index="[7, 8]"
                  :bgImg="'static/bgrTaiMat.png'"
                  class="mrb10"
                  :dataDropfile="dataDropfile"
                  />
            </td>
          </tr>
          <tr>
            <td>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1662']">
                <div class="mrr20"><b>{{__label(MASTERDATA['IPDMRPTR1662'])}}: </b></div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1662']"/>
              </div>
            </td>
            <td>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1662']">
                <div class="mrr20"><b>{{__label(MASTERDATA['IPDMRPTL1662'])}}: </b></div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1662']"/>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1666']">
                <div class="mrr20"><b>{{__label(MASTERDATA['IPDMRPTR1666'])}}: </b></div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1666']"/>
              </div>
            </td>
            <td>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1666']">
                <div class="mrr20"><b>{{__label(MASTERDATA['IPDMRPTL1666'])}}: </b></div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1666']"/>
              </div>
            </td>
          </tr>
          <tr>
            <td style="vertical-align: top!important;">
              <div class="flex on-top" v-if="MASTERDATA['IPDMRPTR1154']">
                <div class="mrr10" style="width: 69px;"><b>{{__label(MASTERDATA['IPDMRPTR1154'])}}: </b></div>
                <div style="width: 100%;">
                  <MdRadiosInput4 :miniRadio="['IPDMRPTR1155']" class="mrb10" :readonly="readonly" :indexs="[0]" v-model="MASTERDATA['IPDMRPTR1154']"/>
                  <div class="mrb10">
                    <MdRadiosInput4 class="mrb10" :miniRadio="['IPDMRPTR1155']" :readonly="readonly" :indexs="[1]" v-model="MASTERDATA['IPDMRPTR1154']"/>
                    <div v-if="MASTERDATA['IPDMRPTR1154'].Items[1].Value">
                      <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1159']">
                        <div class="mrr10">{{__label(MASTERDATA['IPDMRPTR1159'])}}: </div>
                        <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1159']"/>
                      </div>
                      <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1163']">
                        <div class="mrr10">{{__label(MASTERDATA['IPDMRPTR1163'])}}: </div>
                        <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1163']"/>
                      </div>
                      <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1167']">
                        <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1167']"/>
                      </div>
                    </div>
                  </div>
                  <div class="flex align-center">
                    <MdRadiosInput4 :miniRadio="['IPDMRPTR1155']" :readonly="readonly" :indexs="[2]" v-model="MASTERDATA['IPDMRPTR1154']"/>
                    <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1154'].Items[2].Value" style="width: 100%;" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1154'].Items[3].Value"/>
                  </div>
                </div>
              </div>
            </td>
            <td style="vertical-align: top!important;">
              <div class="flex on-top" v-if="MASTERDATA['IPDMRPTL1154']">
                <div class="mrr10" style="width: 69px;"><b>{{__label(MASTERDATA['IPDMRPTL1154'])}}: </b></div>
                <div style="width: 100%;">
                  <MdRadiosInput4 :miniRadio="['IPDMRPTL1155']" class="mrb10" :readonly="readonly" :indexs="[0]" v-model="MASTERDATA['IPDMRPTL1154']"/>
                  <div class="mrb10">
                    <MdRadiosInput4 class="mrb10" :miniRadio="['IPDMRPTL1155']" :readonly="readonly" :indexs="[1]" v-model="MASTERDATA['IPDMRPTL1154']"/>
                    <div v-if="MASTERDATA['IPDMRPTL1154'].Items[1].Value">
                      <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1159']">
                        <div class="mrr10">{{__label(MASTERDATA['IPDMRPTL1159'])}}: </div>
                        <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1159']"/>
                      </div>
                      <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1163']">
                        <div class="mrr10">{{__label(MASTERDATA['IPDMRPTL1163'])}}: </div>
                        <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1163']"/>
                      </div>
                      <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1167']">
                        <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1167']"/>
                      </div>
                    </div>
                  </div>
                  <div class="flex align-center">
                    <MdRadiosInput4 :miniRadio="['IPDMRPTL1155']" :readonly="readonly" :indexs="[2]" v-model="MASTERDATA['IPDMRPTL1154']"/>
                    <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1154'].Items[2].Value" style="width: 100%;" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1154'].Items[3].Value"/>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1170']">
                <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTR1170'])}}: </b></div>
                <MdRadiosInput4 class="mrb10" :miniRadio="['IPDMRPTR1171']" :indexs="[0, 1]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1170']"/>
              </div>
              <div class="mrb10 flex on-top">
                <MdRadiosInput4 :miniRadio="['IPDMRPTR1171']" :indexs="[2]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1170']"/>
                <div v-if="MASTERDATA['IPDMRPTR1170'].Items[2].Value">
                  <MdRadiosInput4 class="mrb10" v-if="MASTERDATA['IPDMRPTR1176']" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1176']"/>
                  <MdRadiosInput4 v-if="MASTERDATA['IPDMRPTR1180']" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1180']"/>
                </div>
              </div>
              <div class="flex align-center">
                <MdRadiosInput4 :miniRadio="['IPDMRPTR1171']" :indexs="[3]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1170']"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1170'].Items[3].Value" style="width: 100%;" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1170'].Items[4].Value"/>
              </div>
            </td>
            <td>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1170']">
                <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTL1170'])}}: </b></div>
                <MdRadiosInput4 class="mrb10" :miniRadio="['IPDMRPTL1171']" :indexs="[0, 1]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1170']"/>
              </div>
              <div class="mrb10 flex on-top">
                <MdRadiosInput4 :miniRadio="['IPDMRPTL1171']" :indexs="[2]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1170']"/>
                <div v-if="MASTERDATA['IPDMRPTL1170'].Items[2].Value">
                  <MdRadiosInput4 class="mrb10" v-if="MASTERDATA['IPDMRPTL1176']" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1176']"/>
                  <MdRadiosInput4 v-if="MASTERDATA['IPDMRPTL1180']" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1180']"/>
                </div>
              </div>
              <div class="flex align-center">
                <MdRadiosInput4 :miniRadio="['IPDMRPTL1171']" :indexs="[3]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1170']"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1170'].Items[3].Value" style="width: 100%;" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1170'].Items[4].Value"/>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="mrb10" style="min-width: 138px;padding-top: 10px;"><b>{{__label(MASTERDATA['IPDMRPTR1184'])}}: </b></div>
              <div class="flex on-top" v-if="MASTERDATA['IPDMRPTR1184']">
                <div style="width: 100%;">
                  <MdRadiosInput4 class="mrb10" :readonly="readonly" :indexs="[0, 1]" v-model="MASTERDATA['IPDMRPTR1184']"/>
                  <MdRadiosInput4 class="mrb10" :readonly="readonly" :indexs="[2, 3]" v-model="MASTERDATA['IPDMRPTR1184']"/>
                  <MdRadiosInput4 class="mrb10" :readonly="readonly" :indexs="[4, 5]" v-model="MASTERDATA['IPDMRPTR1184']"/>
                  <div class="flex align-center">
                    <MdRadiosInput4 :readonly="readonly" :indexs="[6]" v-model="MASTERDATA['IPDMRPTR1184']"/>
                    <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1184'].Items[6].Value" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1184'].Items[7].Value"/>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div class="mrb10" style="min-width: 138px;padding-top: 10px;"><b>{{__label(MASTERDATA['IPDMRPTL1184'])}}: </b></div>
              <div class="flex on-top" v-if="MASTERDATA['IPDMRPTL1184']">
                <div style="width: 100%;">
                  <MdRadiosInput4 class="mrb10" :readonly="readonly" :indexs="[0, 1]" v-model="MASTERDATA['IPDMRPTL1184']"/>
                  <MdRadiosInput4 class="mrb10" :readonly="readonly" :indexs="[2, 3]" v-model="MASTERDATA['IPDMRPTL1184']"/>
                  <MdRadiosInput4 class="mrb10" :readonly="readonly" :indexs="[4, 5]" v-model="MASTERDATA['IPDMRPTL1184']"/>
                  <div class="flex align-center">
                    <MdRadiosInput4 :readonly="readonly" :indexs="[6]" v-model="MASTERDATA['IPDMRPTL1184']"/>
                    <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1184'].Items[6].Value" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1184'].Items[7].Value"/>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td v-if="MASTERDATA['IPDMRPTR1193'] && MASTERDATA['IPDMRPTR1197']">
              <MdRadiosInput4 class="mrb10" :indexs="[0, 1]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1193']"/>
              <div>
                <MdRadiosInput4 class="mrb10" :indexs="[2]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1193']"/>
                <div v-if="MASTERDATA['IPDMRPTR1193'].Items[2].Value">
                  <MdRadiosInput4 class="mrb10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1197']"/>
                  <div class="flex align-center">
                    <MdRadiosInput4 :indexs="[0, 1]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1201']"/>
                    <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1201'].Items[1].Value" style="width: 100px" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1201'].Items[2].Value"/>
                    <div class="mrr5" v-if="MASTERDATA['IPDMRPTR1201'].Items[1].Value"> mm</div>
                    <MdRadiosInput4 :indexs="[3]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1201']"/>
                  </div>
                </div>
              </div>
            </td>
            <td v-if="MASTERDATA['IPDMRPTL1193'] && MASTERDATA['IPDMRPTL1197']">
              <MdRadiosInput4 class="mrb10" :indexs="[0, 1]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1193']"/>
              <div>
                <MdRadiosInput4 class="mrb10" :indexs="[2]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1193']"/>
                <div v-if="MASTERDATA['IPDMRPTL1193'].Items[2].Value">
                  <MdRadiosInput4 class="mrb10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1197']"/>
                  <div class="flex align-center">
                    <MdRadiosInput4 :indexs="[0, 1]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1201']"/>
                    <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1201'].Items[1].Value" style="width: 100px" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1201'].Items[2].Value"/>
                    <div class="mrr5" v-if="MASTERDATA['IPDMRPTL1201'].Items[1].Value"> mm</div>
                    <MdRadiosInput4 :indexs="[3]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1201']"/>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="flex align-center">
                <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTR1206'])}}: </b></div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1206']"/>
              </div>
            </td>
            <td>
              <div class="flex align-center">
                <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTL1206'])}}: </b></div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1206']"/>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="flex align-center">
                <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTR1210'])}}: </b></div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1210']"/>
              </div>
            </td>
            <td>
              <div class="flex align-center">
                <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTL1210'])}}: </b></div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1210']"/>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="flex align-center">
                <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTR1214'])}}: </b></div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1214']"/>
              </div>
            </td>
            <td>
              <div class="flex align-center">
                <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTL1214'])}}: </b></div>
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1214']"/>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="flex align-center">
                <MdRadiosInput4 :readonly="readonly" :indexs="[0]" v-model="MASTERDATA['IPDMRPTR1217']"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1217'].Items[0].Value" style="width: 100%;" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1217'].Items[1].Value"/>
              </div>
            </td>
            <td>
              <div class="flex align-center">
                <MdRadiosInput4 :readonly="readonly" :indexs="[0]" v-model="MASTERDATA['IPDMRPTL1217']"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1217'].Items[0].Value" style="width: 100%;" rows="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1217'].Items[1].Value"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 8 -->
      <label v-if="MASTERDATA['IPDMRPT1071']">{{__label(MASTERDATA['IPDMRPT1071'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-if="MASTERDATA['IPDMRPTR1220'] && MASTERDATA['IPDMRPTR1227']">
              <div class="flex align-center mrb10">
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1220']" :indexs="[0]"/>
                <MdRadiosInput4 :miniRadio="['IPDMRPTR1231', 'IPDMRPTR1232']" v-if="MASTERDATA['IPDMRPTR1220'].Items[0].Value" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1227']"/>
              </div>
              <div class="flex align-center mrb10">
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1220']" :indexs="[1, 2, 3, 4]"/>
              </div>
              <div class="flex align-center mrb10">
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1220']" :indexs="[5]"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1220'].Items[5].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1220'].Items[6].Value"/>
              </div>
            </td>
            <td v-if="MASTERDATA['IPDMRPTL1220'] && MASTERDATA['IPDMRPTL1227']">
              <div class="flex align-center mrb10">
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1220']" :indexs="[0]"/>
                <MdRadiosInput4 :miniRadio="['IPDMRPTL1231', 'IPDMRPTL1232']" v-if="MASTERDATA['IPDMRPTL1220'].Items[0].Value" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1227']"/>
              </div>
              <div class="flex align-center mrb10">
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1220']" :indexs="[1, 2, 3, 4]"/>
              </div>
              <div class="flex align-center mrb10">
                <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1220']" :indexs="[5]"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1220'].Items[5].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1220'].Items[6].Value"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 9 -->
      <label v-if="MASTERDATA['IPDMRPT1072']">{{__label(MASTERDATA['IPDMRPT1072'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1650']">
                <MdRadiosInput4 :noneDex="5" :miniRadio="['IPDMRPTR1651']" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1650']"/>
                <div><MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1650'].Items[4].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1650'].Items[5].Value"/></div>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1241']">
                <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTR1241'])}}: </b></div>
                <MDText :placeholder="__t('Nhập')" class="mrr10" style="width: 130px;" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1241'].Items[0].Value"/>
                <div>{{MASTERDATA['IPDMRPTR1241'].Items[0].Note}}</div>
              </div>
              <div class="flex align-center space-between mrb10">
                <div class="flex align-center" style="width: 50%" v-if="MASTERDATA['IPDMRPTR1243']">
                  <MdRadiosInput4 class="mrr10" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1243']"/>
                  <template v-if="MASTERDATA['IPDMRPTR1243'].Items[0].Value">
                    <MDText :placeholder="__t('Nhập')" class="mrr10" style="width: 130px;" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1243'].Items[1].Value"/>
                    <div> mm</div>
                  </template>
                </div>
                <div class="flex align-center" style="width: 50%" v-if="MASTERDATA['IPDMRPTR1246']">
                  <MdRadiosInput4 class="mrr10" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1246']"/>
                  <template v-if="MASTERDATA['IPDMRPTR1246'].Items[0].Value">
                    <MDText :placeholder="__t('Nhập')" class="mrr10" style="width: 130px;" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1246'].Items[1].Value"/>
                    <div> mm</div>
                  </template>
                </div>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1249'] && MASTERDATA['IPDMRPTR1251']">
                  <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1249']"/>
                  <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1251']"/>
              </div>
              <VUpload2
                code="IPDMRPTR1253"
                :widthImg="'400px'"
                v-if="MASTERDATA['IPDMRPTR1253']"
                planUpdate="Bác sĩ tải hình ảnh tại đây (cho phép tải 1 hoặc nhiều ảnh)"
                :readonly="readonly"
                :dataFile="MASTERDATA['IPDMRPTR1253'].Items[1]"
                :dataImg="MASTERDATA['IPDMRPTR1253'].Items[0]"
                :index="[1, 2]"
                :bgImg="'static/bgrTaiMat2.png'"
                :dataDropfile="dataDropfile"
                />
            </td>
            <td>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1650']">
                <MdRadiosInput4 :noneDex="5" :miniRadio="['IPDMRPTL1651']" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1650']"/>
                <div><MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1650'].Items[4].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1650'].Items[5].Value"/></div>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1241']">
                <div class="mrr10"><b>{{__label(MASTERDATA['IPDMRPTL1241'])}}: </b></div>
                <MDText :placeholder="__t('Nhập')" class="mrr10" style="width: 130px;" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1241'].Items[0].Value"/>
                <div>{{MASTERDATA['IPDMRPTL1241'].Items[0].Note}}</div>
              </div>
              <div class="flex align-center space-between mrb10">
                <div class="flex align-center" style="width: 50%" v-if="MASTERDATA['IPDMRPTL1243']">
                  <MdRadiosInput4 class="mrr10" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1243']"/>
                  <template v-if="MASTERDATA['IPDMRPTL1243'].Items[0].Value">
                    <MDText :placeholder="__t('Nhập')" class="mrr10" style="width: 130px;" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1243'].Items[1].Value"/>
                    <div> mm</div>
                  </template>
                </div>
                <div class="flex align-center" style="width: 50%" v-if="MASTERDATA['IPDMRPTL1246']">
                  <MdRadiosInput4 class="mrr10" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1246']"/>
                  <template v-if="MASTERDATA['IPDMRPTL1246'].Items[0].Value">
                    <MDText :placeholder="__t('Nhập')" class="mrr10" style="width: 130px;" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1246'].Items[1].Value"/>
                    <div> mm</div>
                  </template>
                </div>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1249'] && MASTERDATA['IPDMRPTL1251']">
                  <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1249']"/>
                  <MdRadiosInput4 :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1251']"/>
              </div>
              <VUpload2
                code="IPDMRPTL1253"
                :widthImg="'400px'"
                v-if="MASTERDATA['IPDMRPTL1253']"
                planUpdate="Bác sĩ tải hình ảnh tại đây (cho phép tải 1 hoặc nhiều ảnh)"
                :readonly="readonly"
                :dataFile="MASTERDATA['IPDMRPTL1253'].Items[1]"
                :dataImg="MASTERDATA['IPDMRPTL1253'].Items[0]"
                :index="[3, 4]"
                :bgImg="'static/bgrTaiMat2.png'"
                :dataDropfile="dataDropfile"
                />
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 10 -->
      <label v-if="MASTERDATA['IPDMRPT1073']">{{__label(MASTERDATA['IPDMRPT1073'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-if="MASTERDATA['IPDMRPTR1256']">
              <MdRadiosInput4 class="mrb10" :readonly="readonly" :indexs="[0, 1, 2]" v-model="MASTERDATA['IPDMRPTR1256']"/>
              <MdRadiosInput4 :readonly="readonly" :indexs="[3, 4, 5]" v-model="MASTERDATA['IPDMRPTR1256']"/>
            </td>
            <td v-if="MASTERDATA['IPDMRPTL1256']">
              <MdRadiosInput4 class="mrb10" :readonly="readonly" :indexs="[0, 1, 2]" v-model="MASTERDATA['IPDMRPTL1256']"/>
              <MdRadiosInput4 :readonly="readonly" :indexs="[3, 4, 5]" v-model="MASTERDATA['IPDMRPTL1256']"/>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 11 -->
      <label v-if="MASTERDATA['IPDMRPT1074']">{{__label(MASTERDATA['IPDMRPT1074'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1263']">
                <div class="mrr10" style="width: 85px;"><b>{{__label(MASTERDATA['IPDMRPTR1263'])}}: </b></div>
                <MDText :placeholder="__t('Nhập')" class="mrr10" style="width: 120px;" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1263'].Items[0].Value"/>
                <div> mm</div>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1265']">
                <MdRadiosInput4 class="mrr10" :noneDex="3" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1265']"/>
                <div v-if="MASTERDATA['IPDMRPTR1265'].Items[2].Value" class="mrr10">{{__label(MASTERDATA['IPDMRPTR1265'].Items[3])}}</div>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1265'].Items[2].Value" style="width: 120px;" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1265'].Items[3].Value"/>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1270']">
                <div class="mrr10" style="width: auto;"><b>{{__label(MASTERDATA['IPDMRPTR1270'])}}: </b></div>
                <MdRadiosInput4 class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1270']"/>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1274']">
                <div class="mrr10" style="width: auto;"><b>{{__label(MASTERDATA['IPDMRPTR1274'])}}: </b></div>
                <MdRadiosInput4 class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1274']"/>
              </div>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1278']">
                <MdRadiosInput4 class="mrr10" :noneDex="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1278']"/>
                <MDText :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-if="MASTERDATA['IPDMRPTR1278'].Items[0].Value" v-model="MASTERDATA['IPDMRPTR1278'].Items[1].Value"/>
              </div>
            </td>
            <td>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1263']">
                <div class="mrr10" style="width: 85px;"><b>{{__label(MASTERDATA['IPDMRPTL1263'])}}: </b></div>
                <MDText :placeholder="__t('Nhập')" class="mrr10" style="width: 120px;" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1263'].Items[0].Value"/>
                <div> mm</div>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1265']">
                <MdRadiosInput4 class="mrr10" :noneDex="3" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1265']"/>
                <div v-if="MASTERDATA['IPDMRPTL1265'].Items[2].Value" class="mrr10">{{__label(MASTERDATA['IPDMRPTL1265'].Items[3])}}</div>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1265'].Items[2].Value" style="width: 120px;" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1265'].Items[3].Value"/>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1270']">
                <div class="mrr10" style="width: auto;"><b>{{__label(MASTERDATA['IPDMRPTL1270'])}}: </b></div>
                <MdRadiosInput4 class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1270']"/>
              </div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1274']">
                <div class="mrr10" style="width: auto;"><b>{{__label(MASTERDATA['IPDMRPTL1274'])}}: </b></div>
                <MdRadiosInput4 class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1274']"/>
              </div>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1278']">
                <MdRadiosInput4 class="mrr10" :noneDex="1" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1278']"/>
                <MDText :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-if="MASTERDATA['IPDMRPTL1278'].Items[0].Value" v-model="MASTERDATA['IPDMRPTL1278'].Items[1].Value"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 12 -->
      <label v-if="MASTERDATA['IPDMRPT1075']">{{__label(MASTERDATA['IPDMRPT1075'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="on-top" v-if="MASTERDATA['IPDMRPTR1281'] && MASTERDATA['IPDMRPTR1283'] && MASTERDATA['IPDMRPTR1295'] && MASTERDATA['IPDMRPTR1286'] && MASTERDATA['IPDMRPTR1288']">
              <div class="flex align-center mrb10">
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1281('bt')" class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1281']"/>
              </div>
              <div class="flex align-center mrb10">
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1281()" :indexs="[0]" class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1283']"/>
                <div class="mrr10" style="width: 180px;" v-if="MASTERDATA['IPDMRPTR1283'].Items[0].Value">{{__label(MASTERDATA['IPDMRPTR1283'].Items[1])}}: </div>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1283'].Items[0].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1283'].Items[1].Value"/>
              </div>
              <div class="flex align-center mrb10">
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1281()" class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1286']"/>
              </div>
              <div class="flex align-center mrb10">
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1281()" :indexs="[0]" class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1288']"/>
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1281()" v-if="MASTERDATA['IPDMRPTR1288'].Items[0].Value" :miniRadio="['IPDMRPTR1290', 'IPDMRPTR1291']" :indexs="[1, 2]" class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1288']"/>
              </div>
              <MdRadiosInput4 class="mrb10" @change="handleChangeIPDMRPTR1281()" v-if="MASTERDATA['IPDMRPTR1288'].Items[0].Value" :miniRadio="['IPDMRPTR1290', 'IPDMRPTR1291']" :indexs="[3, 4, 5]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1288']"/>
              <div class="flex align-center">
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1281()" class="mrr10" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1295']"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1295'].Items[0].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1295'].Items[1].Value"/>
              </div>
            </td>
            <td class="on-top" v-if="MASTERDATA['IPDMRPTL1281'] && MASTERDATA['IPDMRPTL1283'] && MASTERDATA['IPDMRPTL1295'] && MASTERDATA['IPDMRPTL1286'] && MASTERDATA['IPDMRPTL1288']">
              <div class="flex align-center mrb10">
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1281('bt')" class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1281']"/>
              </div>
              <div class="flex align-center mrb10">
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1281()" :indexs="[0]" class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1283']"/>
                <div class="mrr10" style="width: 180px;" v-if="MASTERDATA['IPDMRPTL1283'].Items[0].Value">{{__label(MASTERDATA['IPDMRPTL1283'].Items[1])}}: </div>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1283'].Items[0].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1283'].Items[1].Value"/>
              </div>
              <div class="flex align-center mrb10">
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1281()" class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1286']"/>
              </div>
              <div class="flex align-center mrb10">
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1281()" :indexs="[0]" class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1288']"/>
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1281()" v-if="MASTERDATA['IPDMRPTL1288'].Items[0].Value" :miniRadio="['IPDMRPTL1290', 'IPDMRPTL1291']" :indexs="[1, 2]" class="mrr10" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1288']"/>
              </div>
              <MdRadiosInput4 class="mrb10" @change="handleChangeIPDMRPTL1281()" v-if="MASTERDATA['IPDMRPTL1288'].Items[0].Value" :miniRadio="['IPDMRPTL1290', 'IPDMRPTL1291']" :indexs="[3, 4, 5]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1288']"/>
              <div class="flex align-center">
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1281()" class="mrr10" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1295']"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1295'].Items[0].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1295'].Items[1].Value"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 13 -->
      <label v-if="MASTERDATA['IPDMRPT1076']">{{__label(MASTERDATA['IPDMRPT1076'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1298']">
                <MdRadiosInput4 :miniRadio="['IPDMRPTR1299', 'IPDMRPTR1300']" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1298']" :noneDex="4"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1298'].Items[3].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1298'].Items[4].Value"/>
              </div>
              <div v-if="MASTERDATA['IPDMRPTR1304']">
                <MdRadiosInput4 class="mrb10" :indexs="[0, 1, 2]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1304']"/>
                <div class="flex align-center">
                  <MdRadiosInput4 :indexs="[3]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1304']"/>
                  <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1304'].Items[3].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1304'].Items[4].Value"/>
                </div>
              </div>
            </td>
            <td>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1298']">
                <MdRadiosInput4 :miniRadio="['IPDMRPTL1299', 'IPDMRPTL1300']" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1298']" :noneDex="4"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1298'].Items[3].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1298'].Items[4].Value"/>
              </div>
              <div v-if="MASTERDATA['IPDMRPTL1304']">
                <MdRadiosInput4 class="mrb10" :indexs="[0, 1, 2]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1304']"/>
                <div class="flex align-center">
                  <MdRadiosInput4 :indexs="[3]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1304']"/>
                  <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1304'].Items[3].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1304'].Items[4].Value"/>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 14 -->
      <label v-if="MASTERDATA['IPDMRPT1077']">{{__label(MASTERDATA['IPDMRPT1077'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="mrb10"><b>{{__label(MASTERDATA['IPDMRPTR1310'])}}: </b></div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1310']">
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1310('bt')" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1310']"/>
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1310()" :indexs="[1]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1310']"/>
                <div class="flex align-center mrr10" v-if="MASTERDATA['IPDMRPTR1310'].Items[1].Value">
                  <div class="mrr5">C/D:</div>
                  <MDText :placeholder="__t('.../...')" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1310'].Items[2].Value"/>
                </div>
              </div>
              <MdRadiosInput4 class="mrb10" @change="handleChangeIPDMRPTR1310()" :indexs="[3, 4, 5]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1310']"/>
              <div class="mrb10"><b>{{__label(MASTERDATA['IPDMRPTR1317'])}}: </b></div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1317'] && MASTERDATA['IPDMRPTR1322']">
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1317('bt')" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1317']"/>
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1317()" :indexs="[1, 2, 3]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1317']"/>
              </div>
              <MdRadiosInput4 class="mrb10" v-if="MASTERDATA['IPDMRPTR1317'].Items[3].Value" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1322']"/>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1326']">
                <div class="mrr5" style="width 80px;" v-if="MASTERDATA['IPDMRPTR1325']"><b>{{__label(MASTERDATA['IPDMRPTR1325'])}}: </b></div>
                <div class="mrr5" style="width 80px;">{{__label(MASTERDATA['IPDMRPTR1326'])}}:</div>
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1326('bt')" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1326']"/>
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1326()" :indexs="[1]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1326']"/>
              </div>
              <MdRadiosInput4 class="mrb10" @change="handleChangeIPDMRPTR1326()" :indexs="[2, 3]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1326']"/>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTR1326'] && MASTERDATA['IPDMRPTR1332']">
                <MdRadiosInput4 @change="handleChangeIPDMRPTR1326()" :indexs="[4]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1326']"/>
                <MdRadiosInput4 v-if="MASTERDATA['IPDMRPTR1326'].Items[4].Value" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1332']"/>
              </div>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTR1335']">
                <MdRadiosInput4 :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1335']"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTR1335'].Items[0].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1335'].Items[1].Value"/>
              </div>
            </td>
            <td>
              <div class="mrb10"><b>{{__label(MASTERDATA['IPDMRPTL1310'])}}: </b></div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1310']">
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1310('bt')" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1310']"/>
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1310()" :indexs="[1]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1310']"/>
                <div class="flex align-center mrr10" v-if="MASTERDATA['IPDMRPTL1310'].Items[1].Value">
                  <div class="mrr5">C/D:</div>
                  <MDText :placeholder="__t('.../...')" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1310'].Items[2].Value"/>
                </div>
              </div>
              <MdRadiosInput4 class="mrb10" @change="handleChangeIPDMRPTL1310()" :indexs="[3, 4, 5]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1310']"/>
              <div class="mrb10"><b>{{__label(MASTERDATA['IPDMRPTL1317'])}}: </b></div>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1317'] && MASTERDATA['IPDMRPTL1322']">
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1317('bt')" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1317']"/>
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1317()" :indexs="[1, 2, 3]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1317']"/>
              </div>
              <MdRadiosInput4 class="mrb10" v-if="MASTERDATA['IPDMRPTL1317'].Items[3].Value" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1322']"/>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1326']">
                <div class="mrr5" style="width 80px;" v-if="MASTERDATA['IPDMRPTL1325']"><b>{{__label(MASTERDATA['IPDMRPTL1325'])}}: </b></div>
                <div class="mrr5" style="width 80px;">{{__label(MASTERDATA['IPDMRPTL1326'])}}:</div>
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1326('bt')" :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1326']"/>
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1326()" :indexs="[1]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1326']"/>
              </div>
              <MdRadiosInput4 class="mrb10" @change="handleChangeIPDMRPTL1326()" :indexs="[2, 3]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1326']"/>
              <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPTL1326'] && MASTERDATA['IPDMRPTL1332']">
                <MdRadiosInput4 @change="handleChangeIPDMRPTL1326()" :indexs="[4]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1326']"/>
                <MdRadiosInput4 v-if="MASTERDATA['IPDMRPTL1326'].Items[4].Value" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1332']"/>
              </div>
              <div class="flex align-center" v-if="MASTERDATA['IPDMRPTL1335']">
                <MdRadiosInput4 :indexs="[0]" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1335']"/>
                <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTL1335'].Items[0].Value" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1335'].Items[1].Value"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 15 -->
      <label v-if="MASTERDATA['IPDMRPT1078']">{{__label(MASTERDATA['IPDMRPT1078'])}}</label>
      <table class="table observation-table no-margin tbl-b2 mrb10">
        <thead>
          <tr>
            <th width="50%" class="text-center">{{__t('MẮT PHẢI')}}</th>
            <th width="50%" class="text-center">{{__t('MẮT TRÁI')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div v-if="MASTERDATA['IPDMRPTR1338']" class="flex align-center">
                <MdRadiosInput4 class="mrr10" :noneDex="2" :readonly="readonly" v-model="MASTERDATA['IPDMRPTR1338']"/>
                <div v-if="MASTERDATA['IPDMRPTR1338'].Items[1].Value" class="flex align-center full-width">
                  <div class="mrr10 inline">{{__label(MASTERDATA['IPDMRPTR1338'].Items[2])}}:</div>
                  <MDText class="inline" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTR1338'].Items[2].Value"/>
                </div>
              </div>
            </td>
            <td>
              <div v-if="MASTERDATA['IPDMRPTL1338']" class="flex align-center">
                <MdRadiosInput4 class="mrr10" :noneDex="2" :readonly="readonly" v-model="MASTERDATA['IPDMRPTL1338']"/>
                <div v-if="MASTERDATA['IPDMRPTL1338'].Items[1].Value" class="flex align-center full-width">
                  <div class="mrr10 inline">{{__label(MASTERDATA['IPDMRPTL1338'].Items[2])}}:</div>
                  <MDText class="inline" :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPTL1338'].Items[2].Value"/>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="MedicalRecordEye-part2-block11">
      <label class="block-title">4.2 {{__t('Khám bệnh toàn thân')}}</label>
      <div class="mrl10 bg-gray-2 mrb10">
        <div class="mb-5">
          <span class="mr-10" v-if="MASTERDATA['IPDMRPTHUAP']"><b>{{__label(MASTERDATA['IPDMRPTHUAP'])}}:</b> {{MASTERDATA['IPDMRPTHUAP'].Items[0].Value || 'N/A'}} mmHg</span>
          <span class="mr-10" v-if="MASTERDATA['IPDMRPTNHDO']"><b>{{__label(MASTERDATA['IPDMRPTNHDO'])}}:</b> {{MASTERDATA['IPDMRPTNHDO'].Items[0].Value || 'N/A'}} {{__t('độ C')}}</span>
          <span class="mr-10" v-if="MASTERDATA['IPDMRPTMACH']"><b>{{__label(MASTERDATA['IPDMRPTMACH'])}}:</b> {{MASTERDATA['IPDMRPTMACH'].Items[0].Value || 'N/A'}} {{__t('lần/phút')}}</span>
          <BtnCopy v-if="!readonly" :hideCopy="true" :value="null" @copy="handleCopy"/>
        </div>
        <div class="flex align-center mrb10">
          <div v-if="MASTERDATA['IPDMRPT1606']" class="mrr20">
            <label>{{__label(MASTERDATA['IPDMRPT1606'])}} (mmHg)</label>
            <MDText :placeholder="__t('Nhập')" :readonly="readonly" style="width: 120px;" rows="1" v-model="MASTERDATA['IPDMRPT1606'].Items[0].Value"/>
          </div>
          <div v-if="MASTERDATA['IPDMRPT1608']" class="mrr20">
            <label>{{__label(MASTERDATA['IPDMRPT1608'])}} (°C)</label>
            <MDText :placeholder="__t('Nhập')" :readonly="readonly" style="width: 120px;" rows="1" v-model="MASTERDATA['IPDMRPT1608'].Items[0].Value"/>
          </div>
          <div v-if="MASTERDATA['IPDMRPT1610']" class="mrr20">
            <label>{{__label(MASTERDATA['IPDMRPT1610'])}} ({{__t('nhịp/phút')}})</label>
            <MDText :placeholder="__t('Nhập')" :readonly="readonly" style="width: 120px;" rows="1" v-model="MASTERDATA['IPDMRPT1610'].Items[0].Value"/>
          </div>
        </div>
        <template v-for="(item, index) in groupCode">
          <div :key="index" class="flex align-center mrb10" v-if="MASTERDATA[item]">
            <div class="block fw600" style="min-width: 145px;">{{__label(MASTERDATA[item])}}:</div>
            <MdRadiosInput4 :readonly="readonly" mrr="10" :noneDex="2" :value="MASTERDATA[item]"/>
            <MDText :placeholder="__t('Nhập')" v-if="MASTERDATA[item].Items[1].Value" :readonly="readonly" rows="1" v-model="MASTERDATA[item].Items[2].Value"/>
          </div>
        </template>
        <div class="flex align-center" v-if="MASTERDATA['IPDMRPT1640']">
          <div class="block fw600" style="min-width: 145px;">{{__label(MASTERDATA['IPDMRPT1640'])}}:</div>
          <MDText :placeholder="__t('Nhập')" :readonly="readonly" rows="1" v-model="MASTERDATA['IPDMRPT1640'].Items[0].Value"/>
        </div>
      </div>
    </div>
    <div id="MedicalRecordEye-part2-block5">
      <label class="block-title">5. {{__t('Xét nghiệm eye')}}</label>
      <div class="mrl10 bg-gray-2 mrb10">
        <md-input-text :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTCXNC']" v-model="MASTERDATA['IPDMRPTCXNC']"  :hidelabel="true"/>
      </div>
    </div>
    <div id="MedicalRecordEye-part2-block6">
      <label class="block-title">6. {{__t('Kết luận eye')}}</label>
      <div class="ml-10 mrb10">
        <div class="bg-gray-2" v-if="!readonly">
          <div v-if="MASTERDATA['IPDMRPTICDC']" class="form-group">
            <label>{{__label(MASTERDATA['IPDMRPTICDC'])}}:</label>
            <icd10 @icdChange="icdChange" :mdCode="'IPDMRPTICDC'" :single="true" v-model="MASTERDATA['IPDMRPTICDC'].Items[0].Value"/>
          </div>
          <label>{{__label(MASTERDATA['IPDMRPTCDBC'])}}:</label>
          <textarea-autosize v-if="MASTERDATA['IPDMRPTCDBC']" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTCDBC'].Items[0].Value"/>
          <div v-if="MASTERDATA['IPDMRPTICDP']" :class="!MASTERDATA['IPDMRPTCDKT'].Items[1].Value ? 'none' : null" class="form-group">
            <label>{{__label(MASTERDATA['IPDMRPTICDP'])}}:</label>
            <icd10 @icdChange="icdChange" :mdCode="'IPDMRPTICDP'" v-model="MASTERDATA['IPDMRPTICDP'].Items[0].Value"/>
          </div>
          <label v-if="MASTERDATA['IPDMRPTCDKT']">{{__label(MASTERDATA['IPDMRPTCDKT'])}}:</label>
          <MdRadiosInput4 v-if="MASTERDATA['IPDMRPTCDKT']" @change="handleChange('IPDMRPTICDP')" class="mrb10" :value="MASTERDATA['IPDMRPTCDKT']" :noneDex="0"/>
          <textarea-autosize v-if="MASTERDATA['IPDMRPTCDKT'] && MASTERDATA['IPDMRPTCDKT'].Items[1].Value" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTCDKT'].Items[0].Value"/>
          <md-input-text :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTPHBI']" v-model="MASTERDATA['IPDMRPTPHBI']"/>
        </div>
        <div class="bg-grays-2" v-else>
          <div class="form-group" v-if="MASTERDATA['IPDMRPTICDC']">
            <label>{{__label(MASTERDATA['IPDMRPTICDC'])}}:</label>
            <icd10View :mdCode="'IPDMRPTICDC'" :single="true" v-model="MASTERDATA['IPDMRPTICDC'].Items[0].Value"/>
          </div>
          <label>{{__label(MASTERDATA['IPDMRPTCDBC'])}}:</label>
          <textarea-autosize :readonly="true" v-if="MASTERDATA['IPDMRPTCDBC']" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTCDBC'].Items[0].Value"/>
          <br>
          <div class="form-group" v-if="MASTERDATA['IPDMRPTICDP'] && MASTERDATA['IPDMRPTCDKT'] && MASTERDATA['IPDMRPTCDKT'].Items[1].Value">
            <label>{{__label(MASTERDATA['IPDMRPTICDP'])}}:</label>
            <icd10View :mdCode="'IPDMRPTICDP'" :single="true" v-model="MASTERDATA['IPDMRPTICDP'].Items[0].Value"/>
          </div>
          <label>{{__label(MASTERDATA['IPDMRPTCDKT'])}}:</label>
          <MdRadiosInput4 :readonly="true" class="mrb10" :value="MASTERDATA['IPDMRPTCDKT']" :noneDex="0"/>
          <textarea-autosize :readonly="true" v-if="MASTERDATA['IPDMRPTCDKT'] && MASTERDATA['IPDMRPTCDKT'].Items[1].Value" class="form-control mrb10" rows="3" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTCDKT'].Items[0].Value"/>
          <br>
          <md-input-text :readonly="true" :placeholder="__t('N/A')" v-if="MASTERDATA['IPDMRPTPHBI']" v-model="MASTERDATA['IPDMRPTPHBI']"/>
        </div>
      </div>
    </div>
    <div class="mrb10" v-if="MASTERDATA['IPDMRPT1642']" id="MedicalRecordEye-part2-block7">
      <label class="block-title">{{__label(MASTERDATA['IPDMRPT1642'])}}:</label>
      <div class="bg-gray-2 mrl10">
        <md-input-text :hidelabel="true" :readonly="readonly" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1642']"/>
      </div>
    </div>
    <div class="mrb10" v-if="MASTERDATA['IPDMRPT1646']" id="MedicalRecordEye-part2-block8">
      <label class="block-title">{{__label(MASTERDATA['IPDMRPT1646'])}}:</label>
      <div class="bg-gray-2 mrl10">
        <md-input-text :defaultLib="'LOIDAN061021'" :hidelabel="true" :readonly="readonly" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT1646']"/>
      </div>
    </div>
    <div class="mrb10" v-if="MASTERDATA['IPDMRPTTTBA']" id="MedicalRecordEye-part2-block9">
      <label class="block-title">9. {{__t('Tóm tắt bệnh án')}}:</label>
      <div class="bg-gray-2 mrl10">
        <md-input-text :hidelabel="true" :readonly="readonly" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPTTTBA']"/>
      </div>
    </div>
    <div id="MedicalRecordEye-part2-block10">
      <label class="block-title">10. {{__t('Trạng thái bệnh nhân')}}: {{__label(DataSubmit.Status)}}</label>
      <IPDMRPG :status="activeWithStatus" :routeType="routeType" v-model="DataSubmit.GeneralDatas" :Version="DataSubmit.Version" />
    </div>
  </div>
</template>

<script>
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import IPDMRPG from './../IPDMRPG'
export default {
  name: 'Eye2',
  props: ['box1', 'MASTERDATA', 'readonly', 'DataSubmit', 'syncInfo', 'SyncPastMedicalHistory', 'VisitId', 'VisitIdDrop', 'routeType', 'activeWithStatus'],
  components: {
    ListOfCurrentMedications,
    IPDMRPG
  },
  data () {
    return {
      groupCode: [
        'IPDMRPT1612',
        'IPDMRPT1616',
        'IPDMRPT1620',
        'IPDMRPT1624',
        'IPDMRPT1628',
        'IPDMRPT1632',
        'IPDMRPT1636'
      ],
      dataDropfile: {},
      urlFile: []
    }
  },
  mounted () {
    this.dataDropfile = {
      ...this.dataDropfile,
      contentImg: '',
      titleImg: '',
      visittypeImg: this._VisitType,
      visitidImg: this._VisitId,
      formidImg: this.DataSubmit.Id
    }
    this.handleChangeData()
  },
  methods: {
    propdataFile () {
      var arr1 = this.MASTERDATA['IPDMRPTR1143'].Items[1].Value ? this.MASTERDATA['IPDMRPTR1143'].Items[1].Value : []
      var arr2 = this.MASTERDATA['IPDMRPTL1143'].Items[1].Value ? this.MASTERDATA['IPDMRPTL1143'].Items[1].Value : []
      var arr3 = this.MASTERDATA['IPDMRPTR1253'].Items[1].Value ? this.MASTERDATA['IPDMRPTR1253'].Items[1].Value : []
      var arr4 = this.MASTERDATA['IPDMRPTL1253'].Items[1].Value ? this.MASTERDATA['IPDMRPTL1253'].Items[1].Value : []
      this.urlFile = []
      this.urlFile = [...arr1, ...arr2, ...arr3, ...arr4]
      console.log('urlFile', this.urlFile)
    },
    handleCopy () {
      if (this.MASTERDATA['IPDMRPTHUAP'] && this.MASTERDATA['IPDMRPT1606'] && this.MASTERDATA['IPDMRPTHUAP'].Items[0].Value) {
        this.MASTERDATA['IPDMRPT1606'].Items[0].Value = this.MASTERDATA['IPDMRPTHUAP'].Items[0].Value
      }
      if (this.MASTERDATA['IPDMRPTNHDO'] && this.MASTERDATA['IPDMRPT1608'] && this.MASTERDATA['IPDMRPTHUAP'].Items[0].Value) {
        this.MASTERDATA['IPDMRPT1608'].Items[0].Value = this.MASTERDATA['IPDMRPTNHDO'].Items[0].Value
      }
      if (this.MASTERDATA['IPDMRPTMACH'] && this.MASTERDATA['IPDMRPT1610'] && this.MASTERDATA['IPDMRPTMACH'].Items[0].Value) {
        this.MASTERDATA['IPDMRPT1610'].Items[0].Value = this.MASTERDATA['IPDMRPTMACH'].Items[0].Value
      }
    },
    handleChange (code) {
      if (code === 'IPDMRPTICDP' && this.MASTERDATA['IPDMRPTICDP']) {
        if (this.MASTERDATA['IPDMRPTCDKT'] && !this.MASTERDATA['IPDMRPTCDKT'].Items[1].Value) {
          this.MASTERDATA['IPDMRPTICDP'].Items[0].Value = ''
        }
      }
    },
    icdChange (value, code) {
      var currentValue = ''
      var val = (value || []).map(e => e.ViName)
      switch (code) {
        case 'IPDMRPTICDC':
          // IPDMRPTCDBC
          if (!this.MASTERDATA['IPDMRPTCDBC'].Items[0].Value) this.MASTERDATA['IPDMRPTCDBC'].Items[0].Value = val.join(', ')
          break
        case 'IPDMRPTICDP':
          // IPDMRPTCDKT
          currentValue = this.MASTERDATA['IPDMRPTCDKT'].Items[0].Value || ''
          this.MASTERDATA['IPDMRPTCDKT'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
          break
        case 'IPDMRPTICDT':
          // IPDMRPTBCTV
          currentValue = this.MASTERDATA['IPDMRPTBCTV'].Items[0].Value || ''
          this.MASTERDATA['IPDMRPTBCTV'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).join(', ')
          break
        case 'IPDMRPTICDK':
          // IPDMRPTBCKN
          currentValue = this.MASTERDATA['IPDMRPTBCKN'].Items[0].Value || ''
          this.MASTERDATA['IPDMRPTBCKN'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).join(', ')
          break
        default:
          break
      }
    },
    handleChangeData () {
      if (this.MASTERDATA['IPDMRPTPHBI']) {
        this.MASTERDATA['IPDMRPTPHBI'].ViName = '+ Chẩn đoán phân biệt (nếu có)'
        this.MASTERDATA['IPDMRPTPHBI'].EnName = '+ Differential diagnosis (if any)'
      }
    },
    handleChangeMDR (str) {
      if (str === 'bt') {
        if (this.MASTERDATA['IPDMRPTR1096'] && this.MASTERDATA['IPDMRPTR1109']) {
          this.MASTERDATA['IPDMRPTR1096'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
            }
          })
          if (this.MASTERDATA['IPDMRPTR1109'].Items[0].Value) {
            this.MASTERDATA['IPDMRPTR1109'].Items[0].Value = false
          }
        }
      } else {
        this.MASTERDATA['IPDMRPTR1096'].Items[0].Value = false
      }
    },
    handleChangeMDL2 (str) {
      if (str === 'bt') {
        if (this.MASTERDATA['IPDMRPTL1096'] && this.MASTERDATA['IPDMRPTL1109']) {
          this.MASTERDATA['IPDMRPTL1096'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
            }
          })
          if (this.MASTERDATA['IPDMRPTL1109'].Items[0].Value) {
            this.MASTERDATA['IPDMRPTL1109'].Items[0].Value = false
          }
        }
      } else {
        this.MASTERDATA['IPDMRPTL1096'].Items[0].Value = false
      }
    },
    handleChangeIPDMRPTR1281 (str) {
      if (str === 'bt') {
        if (this.MASTERDATA['IPDMRPTR1281']) {
          if (this.MASTERDATA['IPDMRPTR1281'].Items[0].Value) {
            let groupCode = ['IPDMRPTR1283', 'IPDMRPTR1288', 'IPDMRPTR1295', 'IPDMRPTR1286']
            groupCode.forEach(code => {
              if (this.MASTERDATA[code]) {
                this.MASTERDATA[code].Items.forEach((e, index) => {
                  if (e.DataType === 'Radio') {
                    e.Value = false
                  }
                  if (e.DataType === 'Checkbox') {
                    e.Value = false
                  }
                })
              }
            })
          }
        }
      } else {
        if (this.MASTERDATA['IPDMRPTR1281']) {
          this.MASTERDATA['IPDMRPTR1281'].Items[0].Value = false
        }
      }
    },
    handleChangeIPDMRPTL1281 (str) {
      if (str === 'bt') {
        if (this.MASTERDATA['IPDMRPTL1281']) {
          if (this.MASTERDATA['IPDMRPTL1281'].Items[0].Value) {
            let groupCode = ['IPDMRPTL1283', 'IPDMRPTL1288', 'IPDMRPTL1295', 'IPDMRPTL1286']
            groupCode.forEach(code => {
              if (this.MASTERDATA[code]) {
                this.MASTERDATA[code].Items.forEach((e, index) => {
                  if (e.DataType === 'Radio') {
                    e.Value = false
                  }
                  if (e.DataType === 'Checkbox') {
                    e.Value = false
                  }
                })
              }
            })
          }
        }
      } else {
        if (this.MASTERDATA['IPDMRPTL1281']) {
          this.MASTERDATA['IPDMRPTL1281'].Items[0].Value = false
        }
      }
    },
    handleChangeIPDMRPTR1310 (str) {
      if (str === 'bt') {
        if (this.MASTERDATA['IPDMRPTR1310']) {
          this.MASTERDATA['IPDMRPTR1310'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
            }
          })
        }
      } else {
        if (this.MASTERDATA['IPDMRPTR1310']) {
          this.MASTERDATA['IPDMRPTR1310'].Items[0].Value = false
        }
      }
    },
    handleChangeIPDMRPTR1317 (str) {
      if (str === 'bt') {
        if (this.MASTERDATA['IPDMRPTR1317']) {
          this.MASTERDATA['IPDMRPTR1317'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
              if (e.DataType === 'Text') {
                e.Value = ''
              }
            }
          })
        }
      } else {
        if (this.MASTERDATA['IPDMRPTR1317']) {
          this.MASTERDATA['IPDMRPTR1317'].Items[0].Value = false
        }
      }
    },
    handleChangeIPDMRPTR1326 (str) {
      if (str === 'bt') {
        if (this.MASTERDATA['IPDMRPTR1326']) {
          this.MASTERDATA['IPDMRPTR1326'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
              if (e.DataType === 'Text') {
                e.Value = ''
              }
            }
          })
        }
      } else {
        if (this.MASTERDATA['IPDMRPTR1326']) {
          this.MASTERDATA['IPDMRPTR1326'].Items[0].Value = false
        }
      }
    },
    handleChangeIPDMRPTL1310 (str) {
      if (str === 'bt') {
        if (this.MASTERDATA['IPDMRPTL1310']) {
          this.MASTERDATA['IPDMRPTL1310'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
            }
          })
        }
      } else {
        if (this.MASTERDATA['IPDMRPTL1310']) {
          this.MASTERDATA['IPDMRPTL1310'].Items[0].Value = false
        }
      }
    },
    handleChangeIPDMRPTL1317 (str) {
      if (str === 'bt') {
        if (this.MASTERDATA['IPDMRPTL1317']) {
          this.MASTERDATA['IPDMRPTL1317'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
              if (e.DataType === 'Text') {
                e.Value = ''
              }
            }
          })
        }
      } else {
        if (this.MASTERDATA['IPDMRPTL1317']) {
          this.MASTERDATA['IPDMRPTL1317'].Items[0].Value = false
        }
      }
    },
    handleChangeIPDMRPTL1326 (str) {
      if (str === 'bt') {
        if (this.MASTERDATA['IPDMRPTL1326']) {
          this.MASTERDATA['IPDMRPTL1326'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
              if (e.DataType === 'Text') {
                e.Value = ''
              }
            }
          })
        }
      } else {
        if (this.MASTERDATA['IPDMRPTL1326']) {
          this.MASTERDATA['IPDMRPTL1326'].Items[0].Value = false
        }
      }
    },
    handleCheckMapMD () {
      if (this.MASTERDATA['IPDMRPTR1109'] && !this.MASTERDATA['IPDMRPTR1109'].Items[0].Value) {
        this.MASTERDATA['IPDMRPTR1109'].Items[1].Value = ''
        this.MASTERDATA['IPDMRPTR1109'].Items[2].Value = ''
        this.MASTERDATA['IPDMRPTR1109'].Items[3].Value = ''
      }
      if (this.MASTERDATA['IPDMRPTR1096']) {
        if (this.MASTERDATA['IPDMRPTR1096'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1096'].Items.map((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Radio' || e.DataType === 'Checkbox') {
                e.Value = false
              } else {
                e.Value = ''
              }
            }
          })
        } else {
          this.MASTERDATA['IPDMRPTR1096'].Items[0].Value = false
        }
        if (!this.MASTERDATA['IPDMRPTR1096'].Items[6].Value) {
          this.MASTERDATA['IPDMRPTR1096'].Items[7].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1109'] && !this.MASTERDATA['IPDMRPTL1109'].Items[0].Value) {
        this.MASTERDATA['IPDMRPTL1109'].Items[1].Value = ''
        this.MASTERDATA['IPDMRPTL1109'].Items[2].Value = ''
        this.MASTERDATA['IPDMRPTL1109'].Items[3].Value = ''
      }
      if (this.MASTERDATA['IPDMRPTL1096']) {
        if (this.MASTERDATA['IPDMRPTL1096'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1096'].Items.map((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Radio' || e.DataType === 'Checkbox') {
                e.Value = false
              } else {
                e.Value = ''
              }
            }
          })
        } else {
          this.MASTERDATA['IPDMRPTL1096'].Items[0].Value = false
        }
        if (!this.MASTERDATA['IPDMRPTL1096'].Items[6].Value) {
          this.MASTERDATA['IPDMRPTL1096'].Items[7].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1119'] && !this.MASTERDATA['IPDMRPTR1119'].Items[0].Value) {
        this.MASTERDATA['IPDMRPTR1119'].Items[1].Value = ''
      }
      if (this.MASTERDATA['IPDMRPTL1119'] && !this.MASTERDATA['IPDMRPTL1119'].Items[0].Value) {
        this.MASTERDATA['IPDMRPTL1119'].Items[1].Value = ''
      }
      // 8
      if (this.MASTERDATA['IPDMRPTR1220'] && this.MASTERDATA['IPDMRPTR1227']) {
        if (!this.MASTERDATA['IPDMRPTR1220'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1227'].Items.map(e => {
            e.Value = false
          })
        }
        if (!this.MASTERDATA['IPDMRPTR1220'].Items[5].Value) {
          this.MASTERDATA['IPDMRPTR1220'].Items[6].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1220'] && this.MASTERDATA['IPDMRPTL1227']) {
        if (!this.MASTERDATA['IPDMRPTL1220'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1227'].Items.map(e => {
            e.Value = false
          })
        }
        if (!this.MASTERDATA['IPDMRPTL1220'].Items[5].Value) {
          this.MASTERDATA['IPDMRPTL1220'].Items[6].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1265']) {
        if (!this.MASTERDATA['IPDMRPTR1265'].Items[2].Value) {
          this.MASTERDATA['IPDMRPTR1265'].Items[3].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1278']) {
        if (!this.MASTERDATA['IPDMRPTR1278'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1278'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1265']) {
        if (!this.MASTERDATA['IPDMRPTL1265'].Items[2].Value) {
          this.MASTERDATA['IPDMRPTL1265'].Items[3].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1278']) {
        if (!this.MASTERDATA['IPDMRPTL1278'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1278'].Items[1].Value = ''
        }
      }
      // 12
      if (this.MASTERDATA['IPDMRPTR1281']) {
        if (this.MASTERDATA['IPDMRPTR1281'].Items[0].Value) {
          let groupCode = ['IPDMRPTR1283', 'IPDMRPTR1288', 'IPDMRPTR1295', 'IPDMRPTR1286']
          groupCode.forEach(code => {
            if (this.MASTERDATA[code]) {
              this.MASTERDATA[code].Items.forEach((e, index) => {
                if (e.DataType === 'Radio') {
                  e.Value = false
                }
                if (e.DataType === 'Text') {
                  e.Value = ''
                }
                if (e.DataType === 'Checkbox') {
                  e.Value = false
                }
              })
            }
          })
        }
      }
      if (this.MASTERDATA['IPDMRPTR1283']) {
        if (!this.MASTERDATA['IPDMRPTR1283'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1283'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1288']) {
        if (!this.MASTERDATA['IPDMRPTR1288'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1288'].Items[1].Value = ''
          this.MASTERDATA['IPDMRPTR1288'].Items[2].Value = ''
          this.MASTERDATA['IPDMRPTR1288'].Items[3].Value = ''
          this.MASTERDATA['IPDMRPTR1288'].Items[4].Value = ''
          this.MASTERDATA['IPDMRPTR1288'].Items[5].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1295']) {
        if (!this.MASTERDATA['IPDMRPTR1295'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1295'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1281']) {
        if (this.MASTERDATA['IPDMRPTL1281'].Items[0].Value) {
          let groupCode = ['IPDMRPTL1283', 'IPDMRPTL1288', 'IPDMRPTL1295', 'IPDMRPTL1286']
          groupCode.forEach(code => {
            if (this.MASTERDATA[code]) {
              this.MASTERDATA[code].Items.forEach((e, index) => {
                if (e.DataType === 'Radio') {
                  e.Value = false
                }
                if (e.DataType === 'Text') {
                  e.Value = ''
                }
                if (e.DataType === 'Checkbox') {
                  e.Value = false
                }
              })
            }
          })
        }
      }
      if (this.MASTERDATA['IPDMRPTL1283']) {
        if (!this.MASTERDATA['IPDMRPTL1283'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1283'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1288']) {
        if (!this.MASTERDATA['IPDMRPTL1288'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1288'].Items[1].Value = ''
          this.MASTERDATA['IPDMRPTL1288'].Items[2].Value = ''
          this.MASTERDATA['IPDMRPTL1288'].Items[3].Value = ''
          this.MASTERDATA['IPDMRPTL1288'].Items[4].Value = ''
          this.MASTERDATA['IPDMRPTL1288'].Items[5].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1295']) {
        if (!this.MASTERDATA['IPDMRPTL1295'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1295'].Items[1].Value = ''
        }
      }
      // 13
      if (this.MASTERDATA['IPDMRPTR1298']) {
        if (!this.MASTERDATA['IPDMRPTR1298'].Items[3].Value) {
          this.MASTERDATA['IPDMRPTR1298'].Items[4].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1304']) {
        if (!this.MASTERDATA['IPDMRPTR1304'].Items[3].Value) {
          this.MASTERDATA['IPDMRPTR1304'].Items[4].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1298']) {
        if (!this.MASTERDATA['IPDMRPTL1298'].Items[3].Value) {
          this.MASTERDATA['IPDMRPTL1298'].Items[4].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1304']) {
        if (!this.MASTERDATA['IPDMRPTL1304'].Items[3].Value) {
          this.MASTERDATA['IPDMRPTL1304'].Items[4].Value = ''
        }
      }
      // 14
      if (this.MASTERDATA['IPDMRPTR1310']) {
        if (this.MASTERDATA['IPDMRPTR1310'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1310'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
              if (e.DataType === 'Text') {
                e.Value = ''
              }
            }
          })
        }
        if (!this.MASTERDATA['IPDMRPTR1310'].Items[1].Value) {
          this.MASTERDATA['IPDMRPTR1310'].Items[2].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1317'] && this.MASTERDATA['IPDMRPTR1322']) {
        if (this.MASTERDATA['IPDMRPTR1317'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1317'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
              if (e.DataType === 'Text') {
                e.Value = ''
              }
            }
          })
        }
        if (!this.MASTERDATA['IPDMRPTR1317'].Items[3].Value) {
          this.MASTERDATA['IPDMRPTR1322'].Items.forEach(e => {
            if (e.DataType === 'Radio') {
              e.Value = false
            }
            if (e.DataType === 'Text') {
              e.Value = ''
            }
          })
        }
      }
      if (this.MASTERDATA['IPDMRPTR1326'] && this.MASTERDATA['IPDMRPTR1322'] && this.MASTERDATA['IPDMRPTR1335']) {
        if (this.MASTERDATA['IPDMRPTR1326'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1326'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
              if (e.DataType === 'Text') {
                e.Value = ''
              }
            }
          })
        }
        if (!this.MASTERDATA['IPDMRPTR1326'].Items[4].Value) {
          this.MASTERDATA['IPDMRPTR1332'].Items[0].Value = false
          this.MASTERDATA['IPDMRPTR1332'].Items[1].Value = false
        }
        if (!this.MASTERDATA['IPDMRPTR1335'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1335'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1310']) {
        if (this.MASTERDATA['IPDMRPTL1310'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1310'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
              if (e.DataType === 'Text') {
                e.Value = ''
              }
            }
          })
        }
        if (!this.MASTERDATA['IPDMRPTL1310'].Items[1].Value) {
          this.MASTERDATA['IPDMRPTL1310'].Items[2].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1317'] && this.MASTERDATA['IPDMRPTL1322']) {
        if (this.MASTERDATA['IPDMRPTL1317'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1317'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
              if (e.DataType === 'Text') {
                e.Value = ''
              }
            }
          })
        }
        if (!this.MASTERDATA['IPDMRPTL1317'].Items[3].Value) {
          this.MASTERDATA['IPDMRPTL1322'].Items.forEach(e => {
            if (e.DataType === 'Radio') {
              e.Value = false
            }
            if (e.DataType === 'Text') {
              e.Value = ''
            }
          })
        }
      }
      if (this.MASTERDATA['IPDMRPTL1326'] && this.MASTERDATA['IPDMRPTL1322'] && this.MASTERDATA['IPDMRPTL1335']) {
        if (this.MASTERDATA['IPDMRPTL1326'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1326'].Items.forEach((e, index) => {
            if (index !== 0) {
              if (e.DataType === 'Checkbox') {
                e.Value = false
              }
              if (e.DataType === 'Text') {
                e.Value = ''
              }
            }
          })
        }
        if (!this.MASTERDATA['IPDMRPTL1326'].Items[4].Value) {
          this.MASTERDATA['IPDMRPTL1332'].Items[0].Value = false
          this.MASTERDATA['IPDMRPTL1332'].Items[1].Value = false
        }
        if (!this.MASTERDATA['IPDMRPTL1335'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1335'].Items[1].Value = ''
        }
      }
      // 9
      if (this.MASTERDATA['IPDMRPTR1243']) {
        if (!this.MASTERDATA['IPDMRPTR1243'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1243'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1246']) {
        if (!this.MASTERDATA['IPDMRPTR1246'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1246'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1243']) {
        if (!this.MASTERDATA['IPDMRPTL1243'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1243'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1246']) {
        if (!this.MASTERDATA['IPDMRPTL1246'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1246'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1650']) {
        if (!this.MASTERDATA['IPDMRPTR1650'].Items[4].Value) {
          this.MASTERDATA['IPDMRPTR1650'].Items[5].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1650']) {
        if (!this.MASTERDATA['IPDMRPTL1650'].Items[4].Value) {
          this.MASTERDATA['IPDMRPTL1650'].Items[5].Value = ''
        }
      }
      // 7
      if (this.MASTERDATA['IPDMRPTR1154'] && this.MASTERDATA['IPDMRPTR1159'] && this.MASTERDATA['IPDMRPTR1163'] && this.MASTERDATA['IPDMRPTR1167']) {
        if (!this.MASTERDATA['IPDMRPTR1154'].Items[1].Value) {
          let groupCode = [
            'IPDMRPTR1159',
            'IPDMRPTR1163',
            'IPDMRPTR1167'
          ]
          groupCode.forEach(code => {
            if (this.MASTERDATA[code]) {
              this.MASTERDATA[code].Items.forEach((e, index) => {
                if (e.DataType === 'Radio') {
                  e.Value = false
                }
                if (e.DataType === 'Text') {
                  e.Value = ''
                }
                if (e.DataType === 'Checkbox') {
                  e.Value = false
                }
              })
            }
          })
        }
        if (!this.MASTERDATA['IPDMRPTR1154'].Items[2].Value) {
          this.MASTERDATA['IPDMRPTR1154'].Items[3].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1184']) {
        if (!this.MASTERDATA['IPDMRPTR1184'].Items[6].Value) {
          this.MASTERDATA['IPDMRPTR1184'].Items[7].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1217']) {
        if (!this.MASTERDATA['IPDMRPTR1217'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1217'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1193']) {
        if (!this.MASTERDATA['IPDMRPTR1193'].Items[2].Value) {
          let groupCode = [
            'IPDMRPTR1197',
            'IPDMRPTR1201'
          ]
          groupCode.forEach(code => {
            if (this.MASTERDATA[code]) {
              this.MASTERDATA[code].Items.forEach((e, index) => {
                if (e.DataType === 'Radio') {
                  e.Value = false
                }
                if (e.DataType === 'Text') {
                  e.Value = ''
                }
                if (e.DataType === 'Checkbox') {
                  e.Value = false
                }
              })
            }
          })
        }
      }
      if (this.MASTERDATA['IPDMRPTR1201']) {
        if (!this.MASTERDATA['IPDMRPTR1201'].Items[1].Value) {
          this.MASTERDATA['IPDMRPTR1201'].Items[2].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1154'] && this.MASTERDATA['IPDMRPTL1159'] && this.MASTERDATA['IPDMRPTL1163'] && this.MASTERDATA['IPDMRPTL1167']) {
        if (!this.MASTERDATA['IPDMRPTL1154'].Items[1].Value) {
          let groupCode = [
            'IPDMRPTL1159',
            'IPDMRPTL1163',
            'IPDMRPTL1167'
          ]
          groupCode.forEach(code => {
            if (this.MASTERDATA[code]) {
              this.MASTERDATA[code].Items.forEach((e, index) => {
                if (e.DataType === 'Radio') {
                  e.Value = false
                }
                if (e.DataType === 'Text') {
                  e.Value = ''
                }
                if (e.DataType === 'Checkbox') {
                  e.Value = false
                }
              })
            }
          })
        }
        if (!this.MASTERDATA['IPDMRPTL1154'].Items[2].Value) {
          this.MASTERDATA['IPDMRPTL1154'].Items[3].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1184']) {
        if (!this.MASTERDATA['IPDMRPTL1184'].Items[6].Value) {
          this.MASTERDATA['IPDMRPTL1184'].Items[7].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1217']) {
        if (!this.MASTERDATA['IPDMRPTL1217'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1217'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1193']) {
        if (!this.MASTERDATA['IPDMRPTL1193'].Items[2].Value) {
          let groupCode = [
            'IPDMRPTL1197',
            'IPDMRPTL1201'
          ]
          groupCode.forEach(code => {
            if (this.MASTERDATA[code]) {
              this.MASTERDATA[code].Items.forEach((e, index) => {
                if (e.DataType === 'Radio') {
                  e.Value = false
                }
                if (e.DataType === 'Text') {
                  e.Value = ''
                }
                if (e.DataType === 'Checkbox') {
                  e.Value = false
                }
              })
            }
          })
        }
      }
      if (this.MASTERDATA['IPDMRPTL1201']) {
        if (!this.MASTERDATA['IPDMRPTL1201'].Items[1].Value) {
          this.MASTERDATA['IPDMRPTL1201'].Items[2].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTR1170']) {
        if (!this.MASTERDATA['IPDMRPTR1170'].Items[3].Value) {
          this.MASTERDATA['IPDMRPTR1170'].Items[4].Value = ''
        }
        if (!this.MASTERDATA['IPDMRPTR1170'].Items[2].Value) {
          let groupCode = [
            'IPDMRPTR1176',
            'IPDMRPTR1180'
          ]
          groupCode.forEach(code => {
            if (this.MASTERDATA[code]) {
              this.MASTERDATA[code].Items.forEach((e, index) => {
                if (e.DataType === 'Radio') {
                  e.Value = false
                }
                if (e.DataType === 'Text') {
                  e.Value = ''
                }
                if (e.DataType === 'Checkbox') {
                  e.Value = false
                }
              })
            }
          })
        }
      }
      if (this.MASTERDATA['IPDMRPTL1170']) {
        if (!this.MASTERDATA['IPDMRPTL1170'].Items[3].Value) {
          this.MASTERDATA['IPDMRPTL1170'].Items[4].Value = ''
        }
        if (!this.MASTERDATA['IPDMRPTL1170'].Items[2].Value) {
          let groupCode = [
            'IPDMRPTL1176',
            'IPDMRPTL1180'
          ]
          groupCode.forEach(code => {
            if (this.MASTERDATA[code]) {
              this.MASTERDATA[code].Items.forEach((e, index) => {
                if (e.DataType === 'Radio') {
                  e.Value = false
                }
                if (e.DataType === 'Text') {
                  e.Value = ''
                }
                if (e.DataType === 'Checkbox') {
                  e.Value = false
                }
              })
            }
          })
        }
      }
      if (this.MASTERDATA['IPDMRPTR1131'] && !this.MASTERDATA['IPDMRPTR1131'].Items[0].Value) {
        this.MASTERDATA['IPDMRPTR1131'].Items[1].Value = ''
        this.MASTERDATA['IPDMRPTR1131'].Items[2].Value = ''
        this.MASTERDATA['IPDMRPTR1131'].Items[3].Value = ''
      }
      if (this.MASTERDATA['IPDMRPTL1131'] && !this.MASTERDATA['IPDMRPTL1131'].Items[0].Value) {
        this.MASTERDATA['IPDMRPTL1131'].Items[1].Value = ''
        this.MASTERDATA['IPDMRPTL1131'].Items[2].Value = ''
        this.MASTERDATA['IPDMRPTL1131'].Items[3].Value = ''
      }
      // 6
      if (this.MASTERDATA['IPDMRPTR1140']) {
        if (!this.MASTERDATA['IPDMRPTR1140'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTR1140'].Items[1].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1140']) {
        if (!this.MASTERDATA['IPDMRPTL1140'].Items[0].Value) {
          this.MASTERDATA['IPDMRPTL1140'].Items[1].Value = ''
        }
      }
      // 15
      if (this.MASTERDATA['IPDMRPTR1338']) {
        if (!this.MASTERDATA['IPDMRPTR1338'].Items[1].Value) {
          this.MASTERDATA['IPDMRPTR1338'].Items[2].Value = ''
        }
      }
      if (this.MASTERDATA['IPDMRPTL1338']) {
        if (!this.MASTERDATA['IPDMRPTL1338'].Items[1].Value) {
          this.MASTERDATA['IPDMRPTL1338'].Items[2].Value = ''
        }
      }
      this.groupCode.forEach(code => {
        if (this.MASTERDATA[code] && !this.MASTERDATA[code].Items[1].Value) {
          this.MASTERDATA[code].Items[2].Value = ''
        }
      })
    },
    handleCopyDiUng () {
      if (this.MASTERDATA['IPDMRPT01'] && this.DataSubmit) {
        this.MASTERDATA['IPDMRPT01'].Items[0].Value = this.DataSubmit.Allergy
      }
    }
  }
}
</script>
