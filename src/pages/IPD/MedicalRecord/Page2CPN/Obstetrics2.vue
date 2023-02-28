<template>
  <div class="Obstetrics2" v-if="MASTERDATA && DataSubmit">
    <div class="ml-10" v-if="box1">
      <label class="block" v-if="MASTERDATA['IPDMRPTQTBL']">{{__label(MASTERDATA['IPDMRPTQTBL'])}}:</label>
      <textarea-autosize v-if="MASTERDATA['IPDMRPTQTBL']" :readonly="readonly" class="form-control mrb10" rows="3" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPTQTBL'].Items[0].Value"/>
      <label class="block" v-if="MASTERDATA['IPDMRPT800']">{{__label(MASTERDATA['IPDMRPT800'])}}:</label>
      <div class="flex align-center mrb10">
        <VDateTimeInput :widthLabel="`width: 150px`" :readonly="readonly" width="350px" class="mrr20" v-if="MASTERDATA['IPDMRPT801']" :label="MASTERDATA['IPDMRPT801']" v-model="MASTERDATA['IPDMRPT801'].Items[0].Value"/>
        <VDateTimeInput :readonly="readonly" :checkDate="MASTERDATA['IPDMRPT801'].Items[0].Value" width="350px" class="mrr40" v-if="MASTERDATA['IPDMRPT887'] && MASTERDATA['IPDMRPT801']" :label="MASTERDATA['IPDMRPT887']" v-model="MASTERDATA['IPDMRPT887'].Items[0].Value"/>
        <div v-if="MASTERDATA['IPDMRPT803']" class="mrr20">{{__label(MASTERDATA['IPDMRPT803'])}}: </div>
        <textarea-autosize v-if="MASTERDATA['IPDMRPT803']" style="width: 130px" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPT803'].Items[0].Value"/>
        <div>{{__t('tuần')}}</div>
      </div>
      <span class="mrb10 block" v-if="MASTERDATA['IPDMRPT805']">{{__label(MASTERDATA['IPDMRPT805'])}}:</span>
      <textarea-autosize v-if="MASTERDATA['IPDMRPT805']" :readonly="readonly" class="form-control mrb10" rows="3" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPT805'].Items[0].Value"/>
      <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPT807']">
        <span class="block mrr10">{{__label(MASTERDATA['IPDMRPT807'])}}:</span>
        <MdRadiosInput2 :readonly="readonly" width="130" mrr="20" :value="MASTERDATA['IPDMRPT807']" :noneDex="2"/>
        <div class="flex align-center" v-if="MASTERDATA['IPDMRPT807'].Items[1].Value">
          <span class="mrr10">{{__label(MASTERDATA['IPDMRPT807'].Items[2])}}:</span>
          <textarea-autosize :id="MASTERDATA['IPDMRPT807'].Items[2].Code" style="width: 150px;" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT807'].Items[2].Value"/>
          <span>{{__t('lần')}}</span>
        </div>
      </div>
      <VDateTimeInput :format="vDateTimeFormat" :readonly="readonly" class="mrb10" v-if="MASTERDATA['IPDMRPT811']" :label="MASTERDATA['IPDMRPT811']" v-model="MASTERDATA['IPDMRPT811'].Items[0].Value"/>
      <span class="block mrb10" v-if="MASTERDATA['IPDMRPT813']">{{__label(MASTERDATA['IPDMRPT813'])}}:</span>
      <textarea-autosize v-if="MASTERDATA['IPDMRPT813']" :readonly="readonly" class="form-control mrb10" rows="3" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPT813'].Items[0].Value"/>
      <span class="block mrb10" v-if="MASTERDATA['IPDMRPT815']">{{__label(MASTERDATA['IPDMRPT815'])}}:</span>
      <textarea-autosize v-if="MASTERDATA['IPDMRPT815']" :readonly="readonly" class="form-control mrb10" rows="3" :placeholder="readonly ? 'N/A' :__t('Nhập')" v-model="MASTERDATA['IPDMRPT815'].Items[0].Value"/>
      <label v-if="MASTERDATA['IPDMRPTTISB']">{{__label(MASTERDATA['IPDMRPTTISB'])}}:</label>
      <div class="bg-gray-2">
        <label>+ {{__t('Dị ứng')}}:</label>
        <md-input-text :readonly="readonly" :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPT01']" v-model="MASTERDATA['IPDMRPT01']"/>
        <span style="display: block" v-if="DataSubmit.Allergy && !readonly">{{__t('Thông tin dị ứng đã được điều dưỡng khai thác')}}: {{DataSubmit.Allergy || ''}} <BtnCopy :value="null" @copy="handleCopy"/></span>
      </div>
      <div class="bg-gray-2 mt-10">
        <label>+ {{__t('Bản thân')}}:</label>
        <md-input-text :hidelabel="true" :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTBATH']" v-model="MASTERDATA['IPDMRPTBATH']"/>
        <div class="HistoryOfPresentIllness"  v-if="!readonly && SyncPastMedicalHistory && SyncPastMedicalHistory.length">
          <label>{{__t('Thông tin khai thác tiền sử bệnh')}}:</label>
          <vue-scrolling-table v-if="SyncPastMedicalHistory.length">
            <template slot="tbl">
              <table class="table table-bordered table-bordered-x">
                <thead>
                  <tr>
                    <th width="1" class="no-wrap">{{__t('Ngày khám')}}</th>
                    <th width="1" class="no-wrap">{{__t('Bác sĩ khám')}}</th>
                    <th width="1" class="no-wrap">{{__t('Khoa Phòng')}}</th>
                    <th>{{__t('Tiền sử bệnh')}}</th>
                    <th width="1"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr :data="item" :key="index"  v-for="(item, index) in SyncPastMedicalHistory">
                    <td class="no-wrap">{{item.ExaminationTime}}</td>
                    <td class="no-wrap"><ad-Info :ad="item.PrimaryDoctor" :type="item.Type" /></td>
                    <td class="no-wrap">{{__label(item.Clinic)}}</td>
                    <td><p v-if="item.Value">{{item.Value}}</p></td>
                    <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToMDWithCode('IPDMRPTBATH', item.Value)">Copy</button></td>
                  </tr>
                </tbody>
              </table>
            </template>
          </vue-scrolling-table>
        </div>
      </div>
      <div class="bg-gray-2 mt-10">
        <label>+ {{__t('Gia đình')}}:</label>
        <md-input-text :readonly="readonly" :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTGIDI']" v-model="MASTERDATA['IPDMRPTGIDI']"/>
        <div class="HistoryOfPresentIllness"  v-if="!readonly && SyncFamilyMedicalHistory && SyncFamilyMedicalHistory.length">
          <label>{{__t('Thông tin khai thác tiền sử bệnh của người thân')}}:</label>
          <vue-scrolling-table v-if="SyncFamilyMedicalHistory.length">
            <template slot="tbl">
              <table class="table table-bordered table-bordered-x">
                <thead>
                  <tr>
                    <th width="1" class="no-wrap">{{__t('Ngày khám')}}</th>
                    <th width="1" class="no-wrap">{{__t('Bác sĩ khám')}}</th>
                    <th width="1" class="no-wrap">{{__t('Khoa Phòng')}}</th>
                    <th>{{__t('Tiền sử bệnh')}}</th>
                    <th width="1"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr :data="item" :key="index"  v-for="(item, index) in SyncFamilyMedicalHistory">
                    <!-- <td class="no-wrap">{{item.ExaminationTime}}</td>
                    <td class="no-wrap"><ad-Info :ad="item.PrimaryDoctor" :type="item.Type" /></td>
                    <td class="no-wrap">{{__label(item.Clinic)}}</td>
                    <td><p v-if="item.Value">{{item.Value}}</p></td>
                    <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToMDWithCode('IPDMRPTGIDI', item.Value)">Copy</button></td> -->
                    <template v-if="item.PastMedicalHistory">
                      <td class="no-wrap">{{item.ExaminationTime | formatDateWithoutSecon}}</td>
                      <td class="no-wrap"><ad-Info :ad="item.DoctorExam" :type="item.Type" /></td>
                      <td class="no-wrap">{{ $i18n.locale === 'en' ? item.SpecialtyEn : item.SpecialtyVi}}</td>
                      <td><p v-if="item.PastMedicalHistory">{{item.PastMedicalHistory}}</p></td>
                      <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToMDWithCode('IPDMRPTGIDI', item.PastMedicalHistory)">Copy</button></td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </template>
          </vue-scrolling-table>
        </div>
      </div>
      <div class="bg-gray-2 mt-10 mrb10">
        <label>
          {{__t('Thuốc đang dùng (Bao gồm cả thuốc kê đơn và không kê đơn)')}}:
        </label>
        <list-of-current-medications
          ref="ListOfCurrentMedications"
          :Type="'IPD-PatientMedicationList'"
          :VisitTypeGroupCode="'IPD'"
          :RealOnly="readonly"
          :VisitId="VisitId" :VisitIdDrop="VisitIdDrop"
        />
      </div>
      <label v-if="MASTERDATA['IPDMRPT817']" class="block mrr10">{{__label(MASTERDATA['IPDMRPT817'])}}:</label>
      <VAgeInput2 ref="IPDMRPT818" style="margin-right: 0px;" :getyear="true" :DateOfBirth="DateOfBirth || 0" :readonly="readonly" v-if="MASTERDATA['IPDMRPT818']" width="150px" :label="MASTERDATA['IPDMRPT818']" v-model="MASTERDATA['IPDMRPT818'].Items[0].Value"/>
      <div v-if="MASTERDATA['IPDMRPT820']" class="flex align-center mrb10">
        <div style="width: 200px;" class="block mrr10">{{__label(MASTERDATA['IPDMRPT820'])}}:</div>
        <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT820'].Items[0].Value"/>
      </div>
      <div v-if="MASTERDATA['IPDMRPT822']" class="flex align-center mrb10">
        <span class="block mrr10" style="width: 80px;">{{__label(MASTERDATA['IPDMRPT822'])}}:</span>
        <MDTextInput style="min-width: 225px;" :readonly="readonly" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDMRPT822'].Items[0].Value"/>
        <span class="mrl5 mrr30">{{__t('ngày')}}</span>
        <span v-if="MASTERDATA['IPDMRPT824']" style="width: 150px;" class="block mrr10">{{__label(MASTERDATA['IPDMRPT824'])}}:</span>
        <textarea-autosize v-if="MASTERDATA['IPDMRPT824']" :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT824'].Items[0].Value"/>
      </div>
      <VAgeInput2 ref="IPDMRPT826" :getyear="true" :DateOfBirth="DateOfBirth || 0" :readonly="readonly" v-if="MASTERDATA['IPDMRPT826']" width="150px" :label="MASTERDATA['IPDMRPT826']" v-model="MASTERDATA['IPDMRPT826'].Items[0].Value"/>
      <div v-if="MASTERDATA['IPDMRPT828']" class="flex align-center mrb10">
        <div style="width: 200px;" class="block mrr10">{{__label(MASTERDATA['IPDMRPT828'])}}:</div>
        <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT828'].Items[0].Value"/>
      </div>
      <label>5. {{__t('Tiền sử sản khoa')}}:</label>
      <div style="width: 100%;">
        <TblWithMasterData
        :top="true"
        :headerStyle="[{width: '90px', wordBreak: 'break-word'}, {width: '120px', wordBreak: 'break-word'}, {width: '59px', wordBreak: 'break-word'}, {width: '59px', wordBreak: 'break-word'}, {width: '59px', wordBreak: 'break-word'}, {width: '59px', wordBreak: 'break-word'}, {width: '59px', wordBreak: 'break-word'}, {width: '59px', wordBreak: 'break-word'}, {width: '59px', wordBreak: 'break-word'}, {width: '59px', wordBreak: 'break-word'}, {width: '59px', wordBreak: 'break-word'}, {width: '59px', wordBreak: 'break-word'}, {width: '80px', wordBreak: 'break-word'}, {width: '100px', wordBreak: 'break-word'}, {}]"
        :readonly="readonly"
        width="100px"
        :FormCode="'IPDSANTBL1'"
        :VisitId="_VisitId"
        :VisitType="'IPD'"
        :FormID="DataSubmit.Id"
        :AutoIncrease="1"
        ref="TblWithMasterData"/>
      </div>
    </div>
    <div v-if="box2">
      <label>1. {{__t('Toàn thân')}}:</label>
        <div class="bg-gray-2">
          <div class="mrb10"><b>+ {{__t('Toàn trạng')}}: </b></div>
          <div class="mb-5">
            <span class="mr-10" v-if="MASTERDATA['IPDMRPTMACH']"><b>{{__label(MASTERDATA['IPDMRPTMACH'])}}:</b> {{MASTERDATA['IPDMRPTMACH'].Items[0].Value || 'N/A'}} {{__t(MASTERDATA['IPDMRPTMACH'].Note)}}</span>
            <span class="mr-10" v-if="MASTERDATA['IPDMRPTNHDO']"><b>{{__label(MASTERDATA['IPDMRPTNHDO'])}}:</b> {{MASTERDATA['IPDMRPTNHDO'].Items[0].Value || 'N/A'}} {{__t(MASTERDATA['IPDMRPTNHDO'].Note)}}</span>
            <span class="mr-10" v-if="MASTERDATA['IPDMRPTHUAP']"><b>{{__label(MASTERDATA['IPDMRPTHUAP'])}}:</b> {{MASTERDATA['IPDMRPTHUAP'].Items[0].Value || 'N/A'}} {{__t(MASTERDATA['IPDMRPTHUAP'].Note)}}</span>
            <span class="mr-10" v-if="MASTERDATA['IPDMRPTNHTH']"><b>{{__label(MASTERDATA['IPDMRPTNHTH'])}}:</b> {{MASTERDATA['IPDMRPTNHTH'].Items[0].Value || 'N/A'}} {{__t(MASTERDATA['IPDMRPTNHTH'].Note)}}</span>
            <span class="mr-10" v-if="MASTERDATA['IPDMRPTCICA']"><b>{{__label(MASTERDATA['IPDMRPTCICA'])}}:</b> {{MASTERDATA['IPDMRPTCICA'].Items[0].Value || 'N/A'}} {{__t(MASTERDATA['IPDMRPTCICA'].Note)}}</span>
            <span class="mr-10" v-if="MASTERDATA['IPDMRPTCANA']"><b>{{__label(MASTERDATA['IPDMRPTCANA'])}}:</b> {{MASTERDATA['IPDMRPTCANA'].Items[0].Value || 'N/A'}} {{__t(MASTERDATA['IPDMRPTCANA'].Note)}}</span>
            <span class="mr-10" v-if="MASTERDATA['IPDMRPTBBMI']"><b>{{__label(MASTERDATA['IPDMRPTBBMI'])}}:</b> {{MASTERDATA['IPDMRPTBBMI'].Items[0].Value || 'N/A'}} {{__t(MASTERDATA['IPDMRPTBBMI'].Note)}}</span>
            <BtnCopy v-if="!readonly" :hideCopy="true" :value="null" @copy="handleCopy3"/>
          </div>
          <md-input-text :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTTTYT']" v-model="MASTERDATA['IPDMRPTTTYT']" :groupDefaultLib="!readonly ? 'IPDKBKTT' : null" :hidelabel="true" :getFirstRow="true"/>
          <template v-if="!readonly">
            <div :key="index" v-for="(code, index) in IPDMRPTCACQ">
              <template v-if="MASTERDATA[code]">
                <label v-if="code === 'IPDMRPTNTDD'">{{__label(MASTERDATA[code])}}</label>
                <label v-else>{{__label(MASTERDATA[code])}}</label>
                <md-input-text :hidelabel="true" v-if="code === 'IPDMRPTNTDD'" :placeholder="__t('Nhập')" :defaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
                <md-input-text :hidelabel="true" v-else-if="code === 'IPDMRPTTIHO' || code === 'IPDMRPT830'" :placeholder="__t('Nhập')" v-model="MASTERDATA[code]"/>
                <md-input-text :hidelabel="true" v-else :placeholder="__t('Nhập')" :groupDefaultLib="MASTERDATA[code].Data || 'GENTVKBBCAEX'" v-model="MASTERDATA[code]"/>
              </template>
            </div>
          </template>
          <template v-else>
            <div :key="index" v-for="(code, index) in IPDMRPTCACQ">
              <template v-if="MASTERDATA[code]">
                <label v-if="code === 'IPDMRPTNTDD'">{{__label(MASTERDATA[code])}}</label>
                <label v-else>{{__label(MASTERDATA[code])}}</label>
                <md-input-text :readonly="true" :hidelabel="true" :placeholder="__t('Nhập')" v-model="MASTERDATA[code]"/>
              </template>
            </div>
          </template>
        </div>
      <label class="mrt10">{{__label(MASTERDATA['IPDMRPT832'])}}:</label>
      <div class="flex align-center mrb10">
        <span v-if="MASTERDATA['IPDMRPT833']" class="mrr20">{{__label(MASTERDATA['IPDMRPT833'])}}:</span>
        <MdRadiosInput2 v-if="MASTERDATA['IPDMRPT833']" :readonly="readonly" width="90" mrr="20" :value="MASTERDATA['IPDMRPT833']"/>
      </div>
      <div v-if="MASTERDATA['IPDMRPT836']" class="flex align-center mrb10">
        <span style="width: 167px;" class="mrr10">{{__label(MASTERDATA['IPDMRPT836'])}}:</span>
        <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT836'].Items[0].Value"/>
      </div>
      <div v-if="MASTERDATA['IPDMRPT838']" class="flex align-center mrb10">
        <span style="width: 167px;" class="mrr10">{{__label(MASTERDATA['IPDMRPT838'])}}:</span>
        <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT838'].Items[0].Value"/>
      </div>
      <div v-if="MASTERDATA['IPDMRPT840']" class="flex align-center mrb10">
        <span style="width: 167px;" class="mrr10">{{__label(MASTERDATA['IPDMRPT840'])}}:</span>
        <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT840'].Items[0].Value"/>
      </div>
      <div class="flex align-center mrb10">
        <span v-if="MASTERDATA['IPDMRPT844']" style="width: 144px;" class="mrr10">{{__label(MASTERDATA['IPDMRPT844'])}}:</span>
        <textarea-autosize style="width: 167px;" v-if="MASTERDATA['IPDMRPT844']" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT844'].Items[0].Value"/>
        <span class="mrr20"> cm,</span>
        <span class="mrr10" v-if="MASTERDATA['IPDMRPT842']">{{__label(MASTERDATA['IPDMRPT842'])}}:</span>
        <textarea-autosize style="width: 167px;" v-if="MASTERDATA['IPDMRPT842']" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT842'].Items[0].Value"/>
        <span class="mrr20"> cm</span>
        <span class="mrr10" v-if="MASTERDATA['IPDMRPT846']">{{__label(MASTERDATA['IPDMRPT846'])}}:</span>
        <textarea-autosize style="width: 167px;" v-if="MASTERDATA['IPDMRPT846']" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT846'].Items[0].Value"/>
        <span class="mrr20"> {{__t('lần/phút')}}</span>
      </div>
      <div v-if="MASTERDATA['IPDMRPT848']" class="flex align-center">
        <span style="width: 167px;" class="mrr10">{{__label(MASTERDATA['IPDMRPT848'])}}:</span>
        <textarea-autosize :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA['IPDMRPT848'].Items[0].Value"/>
      </div>
      <label v-if="MASTERDATA['IPDMRPT850']">{{__label(MASTERDATA['IPDMRPT850'])}}:</label>
      <template v-for="(e, dex) in groupCode">
        <div :key="dex" class="flex align-center mrb10" v-if="e !== 'IPDMRPT863'">
          <span :style="e === 'IPDMRPT851' ? `width: 144px;` : `width: 167px;`" class="mrr10" v-if="MASTERDATA[e]">{{__label(MASTERDATA[e])}}:</span>
          <textarea-autosize :style="e === 'IPDMRPT851' ? `width: 150px;` : null" v-if="MASTERDATA[e]" :readonly="readonly" class="form-control" rows="1" :placeholder="readonly ? 'N/A' : __t('Nhập')" v-model="MASTERDATA[e].Items[0].Value"/>
          <span v-if="e === 'IPDMRPT851'" class="mrl10"> {{__t('điểm-mdc')}}</span>
        </div>
        <div :key="dex" v-else class="flex align-center mrb10 space-between">
          <div class="flex align-center" v-if="MASTERDATA['IPDMRPT863']">
            <span style="margin-right: 54px; width: 100px;">{{__label(MASTERDATA['IPDMRPT863'])}}:</span>
            <MdRadiosInput2 v-if="MASTERDATA['IPDMRPT863']" :readonly="readonly" width="90" mrr="20" :value="MASTERDATA['IPDMRPT863']"/>
          </div>
          <div class="flex align-center" v-if="MASTERDATA['IPDMRPT867']">
            <span class="mrr20 white-space">{{__label(MASTERDATA['IPDMRPT867'])}}:</span>
            <MdRadiosInput2 v-if="MASTERDATA['IPDMRPT867']" :readonly="readonly" mrr="20" :value="MASTERDATA['IPDMRPT867']"/>
          </div>
          <VDateTimeInput :format="vDateTimeFormat" :readonly="readonly" width="350px" class="mrr20" v-if="MASTERDATA['IPDMRPT889']" :label="MASTERDATA['IPDMRPT889']" v-model="MASTERDATA['IPDMRPT889'].Items[0].Value"/>
        </div>
      </template>
      <div class="flex align-center">
        <span style="margin-right: 111px;">{{__label(MASTERDATA['IPDMRPT880'])}}:</span>
        <MdRadiosInput2 v-if="MASTERDATA['IPDMRPT880']" :readonly="readonly" width="90" mrr="20" :value="MASTERDATA['IPDMRPT880']"/>
      </div>
      <label class="mt-10" v-if="MASTERDATA['IPDMRPTCXNC']">4. {{__t('Các xét nghiệm cận lâm sàng cần làm')}}:</label>
      <div :class="readonly ? '' : 'bg-gray-2'">
        <md-input-text :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPTCXNC']" v-model="MASTERDATA['IPDMRPTCXNC']"  :hidelabel="true"/>
      </div>
    </div>
  </div>
</template>

<script>
import TblWithMasterData from '@/components/global/TblWithMasterData'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import Customer from '@/services/IPD/Customer'
import VAgeInput2 from '@/components/global/VAgeInput2.vue'
// import moment from 'moment'
export default {
  name: 'Obstetrics2',
  props: ['box1', 'box2', 'MASTERDATA', 'readonly', 'DataSubmit', 'SyncPastMedicalHistory', 'SyncFamilyMedicalHistory', 'VisitId', 'VisitIdDrop'],
  components: {
    ListOfCurrentMedications,
    TblWithMasterData,
    VAgeInput2
  },
  data () {
    return {
      groupCode: ['IPDMRPT851', 'IPDMRPT853', 'IPDMRPT855', 'IPDMRPT857', 'IPDMRPT859', 'IPDMRPT861', 'IPDMRPT863', 'IPDMRPT872', 'IPDMRPT870', 'IPDMRPT874', 'IPDMRPT876', 'IPDMRPT878', 'IPDMRPT885'],
      IPDMRPTCACQ: [
        'IPDMRPTTUHO',
        'IPDMRPTHOHA',
        'IPDMRPTTIHO',
        'IPDMRPTTTNS',
        'IPDMRPT830'
      ],
      DateOfBirth: ''
    }
  },
  mounted () {
    this.changeData()
    this.getCustomer()
  },
  methods: {
    handleCopy () {
      if (this.MASTERDATA['IPDMRPT01']) {
        this.MASTERDATA['IPDMRPT01'].Items[0].Value = this.DataSubmit.Allergy
      }
    },
    copyToMDWithCode (mdCode, str) {
      str = this.trim_(str)
      if (this.MASTERDATA[mdCode].Items[0].Value && this.MASTERDATA[mdCode].Items[0].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA[mdCode].Items[0].Value ? (this.trim_(this.MASTERDATA[mdCode].Items[0].Value) + '\n') : ''
        this.MASTERDATA[mdCode].Items[0].Value = this.trim_(old + (str), ', ')
        this.toastedInfo('Đã copy')
      }
    },
    // handleChangePicker () {
    //   if (this.MASTERDATA['IPDMRPT887'] && this.MASTERDATA['IPDMRPT801']) {
    //     if (new Date(moment(this.MASTERDATA['IPDMRPT887'].Items[0].Value, 'DD/MM/YYYY')) < new Date(moment(this.MASTERDATA['IPDMRPT801'].Items[0].Value, 'DD/MM/YYYY'))) {
    //       this.MASTERDATA['IPDMRPT887'].Items[0].Value = ''
    //     }
    //   }
    // },
    handleCopy3 () {
      let str = ''
      if (this.MASTERDATA['IPDMRPTMACH'] && this.MASTERDATA['IPDMRPTMACH'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTMACH']) + ': ' + this.MASTERDATA['IPDMRPTMACH'].Items[0].Value + ' ' + this.__t(this.MASTERDATA['IPDMRPTMACH'].Note)
      }
      if (this.MASTERDATA['IPDMRPTNHDO'] && this.MASTERDATA['IPDMRPTNHDO'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTNHDO']) + ': ' + this.MASTERDATA['IPDMRPTNHDO'].Items[0].Value + ' ' + this.__t(this.MASTERDATA['IPDMRPTNHDO'].Note)
      }
      if (this.MASTERDATA['IPDMRPTHUAP'] && this.MASTERDATA['IPDMRPTHUAP'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTHUAP']) + ': ' + this.MASTERDATA['IPDMRPTHUAP'].Items[0].Value + ' ' + this.__t(this.MASTERDATA['IPDMRPTHUAP'].Note)
      }
      if (this.MASTERDATA['IPDMRPTNHTH'] && this.MASTERDATA['IPDMRPTNHTH'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTNHTH']) + ': ' + this.MASTERDATA['IPDMRPTNHTH'].Items[0].Value + ' ' + this.__t(this.MASTERDATA['IPDMRPTNHTH'].Note)
      }
      if (this.MASTERDATA['IPDMRPTCICA'] && this.MASTERDATA['IPDMRPTCICA'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTCICA']) + ': ' + this.MASTERDATA['IPDMRPTCICA'].Items[0].Value + ' ' + this.__t(this.MASTERDATA['IPDMRPTCICA'].Note)
      }
      if (this.MASTERDATA['IPDMRPTCANA'] && this.MASTERDATA['IPDMRPTCANA'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTCANA']) + ': ' + this.MASTERDATA['IPDMRPTCANA'].Items[0].Value + ' ' + this.__t(this.MASTERDATA['IPDMRPTCANA'].Note)
      }
      if (this.MASTERDATA['IPDMRPTBBMI'] && this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value) {
        if (str) {
          str += ', '
        }
        str += this.__label(this.MASTERDATA['IPDMRPTBBMI']) + ': ' + this.MASTERDATA['IPDMRPTBBMI'].Items[0].Value + ' ' + this.__t(this.MASTERDATA['IPDMRPTBBMI'].Note)
      }
      if (this.MASTERDATA['IPDMRPTTTYT'] && !this.MASTERDATA['IPDMRPTTTYT'].Items[0].Value) {
        this.MASTERDATA['IPDMRPTTTYT'].Items[0].Value = str
      }
      // return str
    },
    changeData () {
      if (this.MASTERDATA['IPDMRPTTTNS']) {
        this.MASTERDATA['IPDMRPTTTNS'].ViName = '+ Tiết niệu'
        this.MASTERDATA['IPDMRPTTTNS'].EnName = '+ Urinary system'
      }
      if (this.MASTERDATA['IPDMRPTTTYT']) {
        this.MASTERDATA['IPDMRPTTTYT'].ViName = '1. Toàn trạng'
        this.MASTERDATA['IPDMRPTTTYT'].EnName = '1. Toàn trạng'
      }
      if (this.MASTERDATA['IPDMRPT817']) {
        this.MASTERDATA['IPDMRPT817'].ViName = '4. Tiền sử sản phụ khoa'
        this.MASTERDATA['IPDMRPT817'].EnName = '4. Gynecological history'
      }
      if (this.MASTERDATA['IPDMRPT867']) {
        this.MASTERDATA['IPDMRPT867'].Items[0].ViName = '1. Tự nhiên'
        this.MASTERDATA['IPDMRPT867'].Items[0].EnName = '1. Natural ROM'
      }
    },
    getCustomer () {
      new Customer({noLoading: true}).find(this._VisitId).then(response => {
        if (response.DateOfBirth) {
          this.DateOfBirth = response.DateOfBirth.split('/')[2]
        }
      })
    }
  }
}
</script>
