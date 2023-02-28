<template>
  <div v-if="box1 && MASTERDATA && DataSubmit">
    <template v-if="DataSubmit.Version >= 8">
      <label class="mrt10">{{__label(MASTERDATA['IPDMRPE800'])}}:</label>
      <div class="flex align-center mrb10">
        <VDateTimeInput :format="vDateTimeFormat" :readonly="readonly" width="369px" class="mrr40" v-if="MASTERDATA['IPDMRPE801']" :label="MASTERDATA['IPDMRPE801']" v-model="MASTERDATA['IPDMRPE801'].Items[0].Value"/>
      </div>
      <VNameCD2 v-if="MASTERDATA['IPDMRPE805']" :widthCD="[{width: '80px'}, {width: '300px'}]" :label="MASTERDATA['IPDMRPE805']" :readonly="readonly" v-model="MASTERDATA['IPDMRPE805'].Items[0].Value"/>
      <label class="mrb10" id="MedicalRecord-part3-block11">1. {{__t('Đặc điểm trẻ sơ sinh')}}: </label>
      <div class="box-so-sinh mrb10">
        <div class="v-tab v-tab-2" v-if="ListSoSinh && ListSoSinh.length">
          <ul class="nav nav-tabs" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in ListSoSinh" :class="activeClass(item.Id)" style="margin-right: 0px!important;">
              <a @click="setFormID(item.Id)" class="text-center" style="min-height: 71px;min-width: 128px;line-height: 20px;">
                <div>{{__t('Sơ sinh')}} {{index + 1}}</div>
                <div>{{getPid(item.Id)}}</div>
                <div>{{getName(item.Id)}}</div>
              </a>
            </li>
            <li class="text-center flex-container no-border" v-if="!readonly && checkHasSoSinh()">
              <a @click="confirmPopup()" class="add-btn-active no-border" style="height: 71px;padding-top: 13px;">
                <div class="box-info-item">
                  <div><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm sơ sinh')}}</div>
                </div>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <Obstetrics3Item v-if="formId" :formId="formId" :optionChild="optionChild" :readonly="readonly" :key="index" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit"/>
          </div>
        </div>
        <div class="text-center" v-else>
          <div class="fs16">{{__t('Chưa có thông tin !')}}</div>
          <button class="btn v-yellow-btn" v-if="!readonly && optionChild && optionChild.length" @click="confirmPopup()"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Thêm sơ sinh')}}</button>
        </div>
      </div>
    </template>
    <template v-else>
      <label>{{__label(MASTERDATA['IPDMRPE800'])}}:</label>
      <div class="flex align-center mrb10">
        <VDateTimeInput :format="vDateTimeFormat" :readonly="readonly" width="369px" class="mrr40" v-if="MASTERDATA['IPDMRPE801']" :label="MASTERDATA['IPDMRPE801']" v-model="MASTERDATA['IPDMRPE801'].Items[0].Value"/>
        <VDateTimeInput :format="vDateTimeFormat" :readonly="readonly" width="355px" v-if="MASTERDATA['IPDMRPE803']" :label="MASTERDATA['IPDMRPE803']" v-model="MASTERDATA['IPDMRPE803'].Items[0].Value"/>
      </div>
        <VNameCD2 v-if="MASTERDATA['IPDMRPE805']" :widthCD="[{width: '80px'}, {width: '300px'}]" :label="MASTERDATA['IPDMRPE805']" :readonly="readonly" v-model="MASTERDATA['IPDMRPE805'].Items[0].Value"/>
      <label class="mrb10" id="MedicalRecord-part3-block11">1. {{__t('Đặc điểm trẻ sơ sinh')}}: </label>
      <div class="flex align-center mrb10">
        <VDateTimeInput
          :readonly="true"
          width="350px"
          class="mrr40"
          :format="vDateTimeFormat"
          v-if="MASTERDATA['IPDMRPE807'] && MASTERDATA['IPDMRPE803']"
          :label="MASTERDATA['IPDMRPE807']"
          v-model="MASTERDATA['IPDMRPE803'].Items[0].Value"/>
        <div>
          <span class="mrr40" v-if="DataSubmit.DataInfor && DataSubmit.DataInfor.length">{{__t('Cân nặng (gr)')}}: {{DataSubmit.DataInfor[0].Value || 'N/A'}}</span>
          <span class="mrr40" v-if="DataSubmit.DataInfor && DataSubmit.DataInfor.length">{{__t('Cao (cm)')}}: {{DataSubmit.DataInfor[1].Value || 'N/A'}}</span>
          <span class="mrr40" v-if="DataSubmit.DataInfor && DataSubmit.DataInfor.length">{{__t('Vòng đầu (cm)')}}: {{DataSubmit.DataInfor[2].Value || 'N/A'}}</span>
        </div>
      </div>
      <div class="flex align-center mrb10">
        <div class="mrr20">
          <div class="mrb10">{{__t('Apgar')}}:</div>
          <DropApgar />
        </div>
        <div>
          <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE907']">
            <div style="min-width:70px;" class="mrr10">{{__label(MASTERDATA['IPDMRPE907'])}}</div>
            <div class="mrr10">
              <v-select :readonly="readonly" :unsetWidth="true" class='select-full-w' v-model="MASTERDATA['IPDMRPE907'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionApgar"/>
            </div>
            <div class="mrr10">{{__t('điểm-mdc')}}</div>
            <div v-if="MASTERDATA['IPDMRPE907'] && MASTERDATA['IPDMRPE907'].Items[0].Value !== null && MASTERDATA['IPDMRPE907'].Items[0].Value !== ''" class="box-color flex align-center" :class="getColor(MASTERDATA['IPDMRPE907'].Items[0].Value) ? getColor(MASTERDATA['IPDMRPE907'].Items[0].Value) : null">
              <div>{{__t(getText(MASTERDATA['IPDMRPE907'].Items[0].Value))}}</div>
            </div>
          </div>
          <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE909']">
            <div style="min-width:70px;" class="mrr10">{{__label(MASTERDATA['IPDMRPE909'])}}</div>
            <div class="mrr10">
              <v-select :readonly="readonly" :unsetWidth="true" class='select-full-w' v-model="MASTERDATA['IPDMRPE909'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionApgar"/>
            </div>
            <div class="mrr10">{{__t('điểm-mdc')}}</div>
            <div v-if="MASTERDATA['IPDMRPE909'] && MASTERDATA['IPDMRPE909'].Items[0].Value !== null && MASTERDATA['IPDMRPE909'].Items[0].Value !== ''" class="box-color flex align-center" :class="getColor(MASTERDATA['IPDMRPE909'].Items[0].Value) ? getColor(MASTERDATA['IPDMRPE909'].Items[0].Value) : null">
              <div>{{__t(getText(MASTERDATA['IPDMRPE909'].Items[0].Value))}}</div>
            </div>
          </div>
          <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE911']">
            <div style="min-width:70px;" class="mrr10">{{__label(MASTERDATA['IPDMRPE911'])}}</div>
            <div class="mrr10">
              <v-select :readonly="readonly" :unsetWidth="true" class='select-full-w' v-model="MASTERDATA['IPDMRPE911'].Items[0].Value" :placeholder="__t('Chọn')" :items="optionApgar"/>
            </div>
            <div class="mrr10">{{__t('điểm-mdc')}}</div>
            <div v-if="MASTERDATA['IPDMRPE911'] && MASTERDATA['IPDMRPE911'].Items[0].Value !== null && MASTERDATA['IPDMRPE911'].Items[0].Value !== ''" class="box-color flex align-center" :class="getColor(MASTERDATA['IPDMRPE911'].Items[0].Value) ? getColor(MASTERDATA['IPDMRPE911'].Items[0].Value) : null">
              <div>{{__t(getText(MASTERDATA['IPDMRPE911'].Items[0].Value))}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex align-center mrb10">
        <div class="flex align-center">
          <div class="mrr30">{{__label(MASTERDATA['IPDMRPE809'])}}:</div>
          <MdRadiosInput2
            :readonly="readonly"
            v-if="MASTERDATA['IPDMRPE809']"
            width="130" mrr="10"
            :value="MASTERDATA['IPDMRPE809']"/>
        </div>
          <MdCheckBoxLabel
          v-if="MASTERDATA['IPDMRPE913']"
          :readonly="readonly"
          :unset="true"
          :data="MASTERDATA['IPDMRPE913']" />
      </div>
      <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE812']">
        <div class="mrr30" style="color: white;">{{__label(MASTERDATA['IPDMRPE809'])}}:</div>
        <div class="group-radio" :id="'IPDMRPE812'" v-if="!readonly">
          <span :data="MASTERDATA['IPDMRPE812'].Items[0]" class="mrr10">
            <input @change="handleChange(0)" type="checkbox" :id="'radio-' + MASTERDATA['IPDMRPE812'].Items[0].Code" v-model="MASTERDATA['IPDMRPE812'].Items[0].Value">
            <label style="width: 127px; padding: 7px 12px;" :for="'radio-' + MASTERDATA['IPDMRPE812'].Items[0].Code" @click="checkbox2Radio(MASTERDATA['IPDMRPE812'].Items, MASTERDATA['IPDMRPE812'].Items[0])">{{__label(MASTERDATA['IPDMRPE812'].Items[0])}}</label>
          </span>
          <MdCheckBoxLabel
            v-if="MASTERDATA['IPDMRPE919'] && MASTERDATA['IPDMRPE812'].Items[0].Value"
            :data="MASTERDATA['IPDMRPE919']"
            widthLabel="min-width: 30px"
            :unset="true"
            />
          <span :data="MASTERDATA['IPDMRPE812'].Items[1]">
            <input @change="handleChange(1)" type="checkbox" :id="'radio-' + MASTERDATA['IPDMRPE812'].Items[1].Code" v-model="MASTERDATA['IPDMRPE812'].Items[1].Value">
            <label style="width: 127px; padding: 7px 12px;" :for="'radio-' + MASTERDATA['IPDMRPE812'].Items[1].Code" @click="checkbox2Radio(MASTERDATA['IPDMRPE812'].Items, MASTERDATA['IPDMRPE812'].Items[1])">{{__label(MASTERDATA['IPDMRPE812'].Items[1])}}</label>
          </span>
          <MdCheckBoxLabel
            v-if="MASTERDATA['IPDMRPE922'] && MASTERDATA['IPDMRPE812'].Items[1].Value"
            :data="MASTERDATA['IPDMRPE922']"
            widthLabel="min-width: 30px"
            :unset="true"
            />
        </div>
        <div v-else class="flex align-center">
          <MDRadioView :data="MASTERDATA['IPDMRPE812'].Items" />
          <MdCheckBoxLabel
            v-if="MASTERDATA['IPDMRPE919'] && MASTERDATA['IPDMRPE812'].Items[0].Value"
            :readonly="true"
            :data="MASTERDATA['IPDMRPE919']"
            widthLabel="min-width: 30px"
            :unset="true"/>
          <MdCheckBoxLabel
            v-if="MASTERDATA['IPDMRPE922'] && MASTERDATA['IPDMRPE812'].Items[1].Value"
            :readonly="true"
            :data="MASTERDATA['IPDMRPE922']"
            widthLabel="min-width: 30px"
            :unset="true"
            />
        </div>
      </div>
      <div class="flex align-center mrb10">
        <MdCheckBoxLabel
          class="mrr20"
          @change="handleChange(2)"
          v-if="MASTERDATA['IPDMRPE915']"
          :readonly="readonly"
          :data="MASTERDATA['IPDMRPE915']" />
        <div class="flex align-center" style="padding-bottom: 7px;">
          <div v-if="MASTERDATA['IPDMRPE915'].Items[0].Value" class="mrr10" style="width: 206px;">{{__label(MASTERDATA['IPDMRPE917'])}}:</div>
          <textarea-autosize
            :readonly="readonly"
            v-if="MASTERDATA['IPDMRPE917'] && MASTERDATA['IPDMRPE915'] && MASTERDATA['IPDMRPE915'].Items[0].Value"
            class="form-control"
            rows="1"
            :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDMRPE917'].Items[0].Value"/>
        </div>
      </div>
      <p>{{__label(MASTERDATA['IPDMRPE819'])}}:</p>
      <textarea-autosize
        :readonly="readonly"
        v-if="MASTERDATA['IPDMRPE819']"
        class="form-control mrb10"
        rows="3"
        :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDMRPE819'].Items[0].Value"/>
      <p>{{__label(MASTERDATA['IPDMRPE821'])}}:</p>
      <textarea-autosize
        :readonly="readonly"
        v-if="MASTERDATA['IPDMRPE821']"
        class="form-control mrb20"
        rows="3"
        :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDMRPE821'].Items[0].Value"/>
    </template>
    <label id="MedicalRecord-part3-block2">{{__label(MASTERDATA['IPDMRPE823'])}}:</label>
    <MdCheckBoxLabel
      class="mrr20"
      v-if="MASTERDATA['IPDMRPE824']"
      :readonly="readonly"
      :data="MASTERDATA['IPDMRPE824']" />
    <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE826']">
      <div class="mrr20">{{__label(MASTERDATA['IPDMRPE826'])}}:</div>
      <MdRadiosInput2
      @change="handleClear6"
      :readonly="readonly"
      class="mrr20"
      width="100"
      :value="MASTERDATA['IPDMRPE826']"/>
    </div>
    <template v-if="MASTERDATA['IPDMRPE826'] && MASTERDATA['IPDMRPE826'].Items[1].Value">
      <div class="flex align-center mrb10">
        <VDateTimeInput
          :format="vDateTimeFormat"
          :readonly="readonly"
          width="350px"
          class="mrr40"
          v-if="MASTERDATA['IPDMRPE829']"
          :label="MASTERDATA['IPDMRPE829']"
          v-model="MASTERDATA['IPDMRPE829'].Items[0].Value"/>
        <MdCheckBoxLabel
          v-if="MASTERDATA['IPDMRPE831']"
          :readonly="readonly"
          :noneDex="1"
          :unset="true"
          :data="MASTERDATA['IPDMRPE831']" />
        <textarea-autosize
          :readonly="readonly"
          v-if="MASTERDATA['IPDMRPE831'] && MASTERDATA['IPDMRPE831'].Items[0].Value"
          class="form-control mrr10"
          style="width: 190px;"
          rows="1" :placeholder="__t('Nhập lượng máu mất')"
          v-model="MASTERDATA['IPDMRPE831'].Items[1].Value"/>
        <div v-if="MASTERDATA['IPDMRPE831'].Items[0].Value"> ml</div>
      </div>
      <div class="flex align-center mrb10">
        <div v-if="MASTERDATA['IPDMRPE834']" style="width: 100px;">{{__label(MASTERDATA['IPDMRPE834'])}}:</div>
        <textarea-autosize
          v-if="MASTERDATA['IPDMRPE834']"
          :readonly="readonly"
          class="form-control"
          rows="1" :placeholder="__t('Nhập')"
          v-model="MASTERDATA['IPDMRPE834'].Items[0].Value"/>
      </div>
    </template>
    <div class="flex align-center mrb10" v-for="(e, dex) in groupCode" :key="dex">
      <div v-if="MASTERDATA[e]" style="width: 100px;">{{__label(MASTERDATA[e])}}:</div>
      <textarea-autosize
        v-if="MASTERDATA[e]"
        :readonly="readonly"
        class="form-control"
        rows="1" :placeholder="__t('Nhập')"
        v-model="MASTERDATA[e].Items[0].Value"/>
    </div>
    <div class="flex align-center mrb10">
      <div style="width: 92px;" v-if="MASTERDATA['IPDMRPE842']">{{__label(MASTERDATA['IPDMRPE842'])}}:</div>
      <textarea-autosize
        v-if="MASTERDATA['IPDMRPE842']"
        :readonly="readonly"
        class="form-control mrr10"
        rows="1" :placeholder="__t('Nhập')"
        style="width: 150px;"
        v-model="MASTERDATA['IPDMRPE842'].Items[0].Value"/>
      <div class="mrr40">{{__t('gram')}}</div>
      <div style="min-width: 100px;" v-if="MASTERDATA['IPDMRPE844']">{{__label(MASTERDATA['IPDMRPE844'])}}:</div>
      <textarea-autosize
        v-if="MASTERDATA['IPDMRPE844']"
        :readonly="readonly"
        class="form-control mrr10"
        rows="1" :placeholder="__t('Nhập')"
        style="width: 150px;"
        v-model="MASTERDATA['IPDMRPE844'].Items[0].Value"/>
      <div>{{__t('cm')}}</div>
    </div>
    <div class="flex mrb10">
      <MdCheckBoxLabel
        @change="handleChange(3)"
        v-if="MASTERDATA['IPDMRPE846']"
        :readonly="readonly"
        :data="MASTERDATA['IPDMRPE846']" />
      <div v-if="MASTERDATA['IPDMRPE848'] && MASTERDATA['IPDMRPE846'].Items[0].Value" style="min-width: 150px;padding-top: 12px;">{{__label(MASTERDATA['IPDMRPE848'])}}:</div>
      <textarea-autosize
        v-if="MASTERDATA['IPDMRPE848'] && MASTERDATA['IPDMRPE846'].Items[0].Value"
        :readonly="readonly"
        class="form-control"
        rows="3" :placeholder="__t('Nhập')"
        style="margin-top: 12px;"
        v-model="MASTERDATA['IPDMRPE848'].Items[0].Value"/>
    </div>
    <label id="MedicalRecord-part3-block3" v-if="MASTERDATA['IPDMRPE850']">{{__label(MASTERDATA['IPDMRPE850'])}}:</label>
    <div class="flex align-center mrb10">
      <div class="mrr20">{{__t('Mạch')}}</div>
      <textarea-autosize v-if="MASTERDATA['IPDMRPE851']" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="__t('Nhập')" style="width: 120px" v-model="MASTERDATA['IPDMRPE851'].Items[0].Value"/>
      <div class="mrr60">{{__t('lần/phút')}}</div>
      <div class="mrr20">{{__t('Nhiệt độ-mdc')}}</div>
      <textarea-autosize v-if="MASTERDATA['IPDMRPE853']" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="__t('Nhập')" style="width: 120px" v-model="MASTERDATA['IPDMRPE853'].Items[0].Value"/>
      <div class="mrr60">&#8451;</div>
      <div class="mrr20">{{__t('Huyết áp-mdc')}}</div>
      <textarea-autosize v-if="MASTERDATA['IPDMRPE855']" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="__t('Nhập')" style="width: 120px" v-model="MASTERDATA['IPDMRPE855'].Items[0].Value"/>
      <div class="mrr60">{{__t('mmHg')}}</div>
      <div class="mrr20">{{__t('Nhịp thở-mdc')}}</div>
      <textarea-autosize v-if="MASTERDATA['IPDMRPE857']" :readonly="readonly" class="form-control mrr10" rows="1" :placeholder="__t('Nhập')" style="width: 120px" v-model="MASTERDATA['IPDMRPE857'].Items[0].Value"/>
      <div>{{__t('lần/phút')}}</div>
    </div>
    <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE859']">
      <div style="width: 150px;">{{__label(MASTERDATA['IPDMRPE859'])}}:</div>
      <textarea-autosize
        :readonly="readonly"
        class="form-control"
        rows="1" :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDMRPE859'].Items[0].Value"/>
    </div>
    <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE861']">
      <div style="width: 150px;">{{__label(MASTERDATA['IPDMRPE861'])}}:</div>
      <MdRadiosInput2
        class="mrr20"
        :readonly="readonly"
        width="90"
        :noneDex="6"
        :value="MASTERDATA['IPDMRPE861']"/>
      <textarea-autosize
        style="width: 428px;"
        v-if="MASTERDATA['IPDMRPE861'].Items[5].Value"
        :readonly="readonly"
        class="form-control"
        rows="3" :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDMRPE861'].Items[6].Value"/>
    </div>
    <div class="flex mrb10" v-if="MASTERDATA['IPDMRPE869']">
      <div style="width: 150px;">{{__label(MASTERDATA['IPDMRPE869'])}}:</div>
      <textarea-autosize
        :readonly="readonly"
        class="form-control"
        rows="3" :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDMRPE869'].Items[0].Value"/>
    </div>
    <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE871']">
      <div style="width: 150px;">{{__label(MASTERDATA['IPDMRPE871'])}}:</div>
      <MdRadiosInput2
        @change="handleChange(4)"
        :readonly="readonly"
        width="100"
        mrr="40"
        :value="MASTERDATA['IPDMRPE871']"/>
    </div>
    <div class="mrb10" v-if="MASTERDATA['IPDMRPE875'] && MASTERDATA['IPDMRPE871'] && (MASTERDATA['IPDMRPE871'].Items[1].Value || MASTERDATA['IPDMRPE871'].Items[2].Value)">
      <div class="mrb10">{{__label(MASTERDATA['IPDMRPE875'])}}</div>
      <textarea-autosize
        :readonly="readonly"
        class="form-control"
        rows="3" :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDMRPE875'].Items[0].Value"/>
    </div>
    <div class="flex align-center mrb10">
      <div style="width: 132px;">{{__label(MASTERDATA['IPDMRPE877'])}}:</div>
      <textarea-autosize
        :readonly="readonly"
        class="form-control"
        style="width: 250px;"
        rows="1" :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDMRPE877'].Items[0].Value"/>
    </div>
    <div class="flex align-center mrb10">
      <div class="mrr80">{{__label(MASTERDATA['IPDMRPE879'])}}:</div>
      <MdRadiosInput2
        :readonly="readonly"
        width="100"
        mrr="40"
        :value="MASTERDATA['IPDMRPE879']"/>
    </div>
    <md-input-text id="MedicalRecord-part3-block4" :readonly="readonly" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMRPEQTBL']" v-model="MASTERDATA['IPDMRPEQTBL']">
      <button v-if="!readonly" class="btn btn-sync-data pull-right" @click="syncHistoryOfPatientIllnessAndAssessment()">{{__t('Lấy bệnh sử và thăm khám')}}</button>
    </md-input-text>
    <label id="MedicalRecord-part3-block5" v-if="MASTERDATA['IPDMRPE882']">{{__label(MASTERDATA['IPDMRPE882'])}}:</label>
    <MdRadiosInput2
      :readonly="readonly"
      width="100"
      mrr="40"
      class="mrb10"
      :value="MASTERDATA['IPDMRPE882']"/>
    <div :class="(MASTERDATA['IPDMRPE882'] && MASTERDATA['IPDMRPE882'].Items[1].Value) ? null : 'none'">
      <MdRadiosInput2
        :readonly="readonly"
        width="100"
        mrr="40"
        class="mrb10"
        :class="readonly ? 'block' : ''"
        v-if="MASTERDATA['IPDMRPE885']"
        :value="MASTERDATA['IPDMRPE885']"/>
      <!-- Chuẩn đoán trước phẫu thuật -->
      <p v-if="MASTERDATA['IPDMRPE888']">{{__label(MASTERDATA['IPDMRPE888'])}}:</p>
      <icd10
        v-if="MASTERDATA['IPDMRPE888'] && !readonly"
        @icdChange="icdChange"
        :mdCode="'IPDMRPE888'"
        v-model="MASTERDATA['IPDMRPE888'].Items[0].Value"/>
      <icd10View v-if="MASTERDATA['IPDMRPE888'] && readonly" :mdCode="'IPDMRPE888'" :single="true" v-model="MASTERDATA['IPDMRPE888'].Items[0].Value"/>
      <textarea-autosize
        v-if="MASTERDATA['IPDMRPE888']"
        :readonly="readonly"
        class="form-control mrb10 mrt10"
        rows="3" :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDMRPE888'].Items[1].Value"/>
      <!-- Chuẩn đoán sau phẫu thuật -->
      <p v-if="MASTERDATA['IPDMRPE891']">{{__label(MASTERDATA['IPDMRPE891'])}}:</p>
      <icd10
        v-if="MASTERDATA['IPDMRPE891'] && !readonly"
        @icdChange="icdChange"
        :mdCode="'IPDMRPE891'"
        v-model="MASTERDATA['IPDMRPE891'].Items[0].Value"/>
      <icd10View v-if="MASTERDATA['IPDMRPE891'] && readonly" :mdCode="'IPDMRPE891'" :single="true" v-model="MASTERDATA['IPDMRPE891'].Items[0].Value"/>
      <textarea-autosize
        v-if="MASTERDATA['IPDMRPE891']"
        :readonly="readonly"
        class="form-control mrb10 mrt10"
        rows="3" :placeholder="__t('Nhập')"
        v-model="MASTERDATA['IPDMRPE891'].Items[1].Value"/>
      <div class="flex align-center space-between mrb10">
        <div class="flex align-center">
          <div v-if="MASTERDATA['IPDMRPE894']" class="mrr10" style="width: 148px">{{__label(MASTERDATA['IPDMRPE894'])}}: </div>
          <textarea-autosize
            style="width: 300px; margin-right: 100px;"
            v-if="MASTERDATA['IPDMRPE894']"
            :readonly="readonly"
            class="form-control"
            rows="1" :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDMRPE894'].Items[0].Value"/>
        </div>
        <div class="flex align-center">
          <div v-if="MASTERDATA['IPDMRPE896']" class="mrr10" style="width: 232px">{{__label(MASTERDATA['IPDMRPE896'])}}: </div>
          <textarea-autosize
            style="width: 300px"
            v-if="MASTERDATA['IPDMRPE896']"
            :readonly="readonly"
            class="form-control"
            rows="1" :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDMRPE896'].Items[0].Value"/>
        </div>
      </div>
      <!-- table -->
      <TblWithMasterData
        :readonly="readonly"
        :FormCode="'IPDSANTHPT1'"
        :VisitId="_VisitId"
        :headerStyle="[{width: '170px'}, {}, {}, {}]"
        :VisitType="'IPD'"
        :FormID="DataSubmit.Id"
        ref="TblWithMasterData"/>
      <MdRadiosInput2
        @change="handleChange(6)"
        :readonly="readonly"
        mrr="40"
        class="mrb10"
        v-if="MASTERDATA['IPDMRPE898']"
        :value="MASTERDATA['IPDMRPE898']"/>
      <div class="flex align-center mrb10" v-if="MASTERDATA['IPDMRPE898'] && (MASTERDATA['IPDMRPE898'].Items[0].Value || MASTERDATA['IPDMRPE898'].Items[1].Value)">
        <MdCheckBoxLabel3
          @change="handleChange(5)"
          :noneDex="4"
          v-if="MASTERDATA['IPDMRPE901']"
          :readonly="readonly"
          :data="MASTERDATA['IPDMRPE901']"
          widthMiniBox="width: 155px;"/>
          <textarea-autosize
          style="width: 547px"
            v-if="MASTERDATA['IPDMRPE901'] && MASTERDATA['IPDMRPE901'].Items[3].Value"
            :readonly="readonly"
            class="form-control"
            rows="1" :placeholder="__t('Nhập')"
            v-model="MASTERDATA['IPDMRPE901'].Items[4].Value"/>
      </div>
    </div>
  </div>
</template>

<script>
import VSelect from '@/components/VSelect.vue'
import TblWithMasterData from '@/components/global/TblWithMasterData'
import DropApgar from '@/pages/IPD/MedicalRecord/Page2CPN/DropApgar.vue'
import Obstetrics3Item from '@/pages/IPD/MedicalRecord/Page2CPN/Obstetrics3Item.vue'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import VNameCD2 from '@/components/global/VNameCD2.vue'
export default {
  name: 'Obstetrics3',
  props: ['box1', 'box2', 'MASTERDATA', 'readonly', 'DataSubmit', 'VisitId', 'VisitIdDrop', 'ListSoSinh', 'optionChild'],
  components: {
    DropApgar,
    VSelect,
    TblWithMasterData,
    UsersSelect2,
    Obstetrics3Item,
    VNameCD2
  },
  data () {
    return {
      optionApgar: [
        {
          value: '0',
          label: '0'
        },
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        },
        {
          value: '6',
          label: '6'
        },
        {
          value: '7',
          label: '7'
        },
        {
          value: '8',
          label: '8'
        },
        {
          value: '9',
          label: '9'
        },
        {
          value: '10',
          label: '10'
        }
      ],
      groupCode: ['IPDMRPE836', 'IPDMRPE838', 'IPDMRPE840'],
      User: {
        Fullname: '',
        Id: '',
        Title: '',
        Username: '',
        code: '',
        label: ''
      },
      Version: '',
      formId: null
    }
  },
  created () {
    if (this.DataSubmit.DataInfor) {
      this.DataSubmit.DataInfor = this.DataSubmit.DataInfor.sort((a, b) => a.Order - b.Order)
    }
  },
  mounted () {
    if (this.ListSoSinh && this.ListSoSinh.length) {
      let Id = ''
      if (this.readonly) {
        Id = this.ListSoSinh[0].Id
      } else {
        Id = this.ListSoSinh[this.ListSoSinh.length - 1].Id
      }
      this.setFormID(Id)
    }
  },
  methods: {
    setFormID (formId) {
      this.formId = formId
    },
    activeClass (id) {
      return this.formId === id ? 'active' : ''
    },
    getText (diem) {
      let text = ''
      if (parseInt(diem) <= 3 && parseInt(diem) >= 0) {
        text = 'Trẻ bị ngạt nặng, cần hồi sức thở và hồi sức tim.'
      }
      if (parseInt(diem) <= 7 && parseInt(diem) >= 4) {
        text = 'Trẻ bị ngạt nhẹ, cần hồi sức thở.'
      }
      if (parseInt(diem) <= 10 && parseInt(diem) >= 8) {
        text = 'Là chỉ số bình thường, không cần hồi sức. Chỉ cần làm thông đường thở của trẻ, kích thích qua xúc giác, giữ ấm và quan sát giai đoạn chuyển tiếp của trẻ một cách sát sao.'
      }
      return text
    },
    getColor (diem) {
      let text = ''
      if (parseInt(diem) <= 3 && parseInt(diem) >= 0) {
        text = 'Tim'
      }
      if (parseInt(diem) <= 7 && parseInt(diem) >= 4) {
        text = 'Cam'
      }
      if (parseInt(diem) <= 10 && parseInt(diem) >= 8) {
        text = 'Xanh'
      }
      return text
    },
    handleChange (num) {
      if (this.MASTERDATA['IPDMRPE812'] && this.MASTERDATA['IPDMRPE919']) {
        if (num === 0 || num === 1) {
          this.MASTERDATA['IPDMRPE922'].Items.forEach(e => {
            if (e.DataType === 'Radio') {
              e.Value = false
            } else if (e.DataType === 'Checkbox') {
              e.Value = false
            } else {
              e.Value = ''
            }
          })
          this.MASTERDATA['IPDMRPE919'].Items.forEach(e => {
            if (e.DataType === 'Radio') {
              e.Value = false
            } else if (e.DataType === 'Checkbox') {
              e.Value = false
            } else {
              e.Value = ''
            }
          })
        }
      }
      if (num === 2 && this.MASTERDATA['IPDMRPE915'] && !this.MASTERDATA['IPDMRPE915'].Items[0].Value && this.MASTERDATA['IPDMRPE917']) {
        this.MASTERDATA['IPDMRPE917'].Items[0].Value = ''
      }
      if (num === 3 && this.MASTERDATA['IPDMRPE846'] && !this.MASTERDATA['IPDMRPE846'].Items[0].Value && this.MASTERDATA['IPDMRPE848']) {
        this.MASTERDATA['IPDMRPE848'].Items[0].Value = ''
      }
      if (num === 4 && this.MASTERDATA['IPDMRPE871'] && this.MASTERDATA['IPDMRPE875'] && !this.MASTERDATA['IPDMRPE871'].Items[1].Value && !this.MASTERDATA['IPDMRPE871'].Items[2].Value) {
        this.MASTERDATA['IPDMRPE875'].Items[0].Value = ''
      }
      if (num === 5 && this.MASTERDATA['IPDMRPE901'] && !this.MASTERDATA['IPDMRPE901'].Items[3].Value) {
        this.MASTERDATA['IPDMRPE901'].Items[4].Value = ''
      }
      if (num === 6 && this.MASTERDATA['IPDMRPE901'] && this.MASTERDATA['IPDMRPE898'] && !this.MASTERDATA['IPDMRPE898'].Items[0].Value && !this.MASTERDATA['IPDMRPE898'].Items[1].Value) {
        this.MASTERDATA['IPDMRPE901'].Items.forEach(e => {
          if (e.DataType === 'Radio') {
            e.Value = false
          } else if (e.DataType === 'Checkbox') {
            e.Value = false
          } else {
            e.Value = ''
          }
        })
      }
    },
    icdChange (value, code) {
      var val = (value || []).map(e => e.ViName)
    ('code', code)
      if (code === 'IPDMRPE888') {
        var currentValue = this.MASTERDATA['IPDMRPE888'].Items[1].Value || ''
        this.MASTERDATA['IPDMRPE888'].Items[1].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
      }
      if (code === 'IPDMRPE891') {
        var currentValue1 = this.MASTERDATA['IPDMRPE891'].Items[1].Value || ''
        this.MASTERDATA['IPDMRPE891'].Items[1].Value = ([currentValue1].concat(val.filter(e => !currentValue1.includes(e)))).filter(e => e).join(', ')
      }
    },
    handleClear5 () {
      if (this.MASTERDATA['IPDMRPE882'] && !this.MASTERDATA['IPDMRPE882'].Items[1].Value) {
        let group = ['IPDMRPE885', 'IPDMRPE888', 'IPDMRPE891', 'IPDMRPE894', 'IPDMRPE896', 'IPDMRPE898', 'IPDMRPE901']
        group.forEach(elm => {
          if (this.MASTERDATA[elm]) {
            this.MASTERDATA[elm].Items.forEach(e => {
              if (e.DataType === 'Radio') {
                e.Value = false
              } else if (e.DataType === 'Checkbox') {
                e.Value = false
              } else {
                e.Value = ''
              }
            })
          }
        })
        this.$refs.TblWithMasterData.clear(true)
      }
    },
    handleClear6 () {
      if (this.MASTERDATA['IPDMRPE826'] && !this.MASTERDATA['IPDMRPE826'].Items[1].Value) {
        let group = ['IPDMRPE829', 'IPDMRPE831', 'IPDMRPE834']
        group.forEach(elm => {
          if (this.MASTERDATA[elm]) {
            this.MASTERDATA[elm].Items.forEach(e => {
              if (e.DataType === 'Radio') {
                e.Value = false
              } else if (e.DataType === 'Checkbox') {
                e.Value = false
              } else {
                e.Value = ''
              }
            })
          }
        })
      }
    },
    syncHistoryOfPatientIllnessAndAssessment () {
      this.$emit('changeDataSync')
    },
    removeIndexText (value) {
      var t = this.trim_(value, '1. ')
      t = this.trim_(t, '2. ')
      t = this.trim_(t, '3. ')
      t = this.trim_(t, '4. ')
      t = this.trim_(t, '5. ')
      return t
    },
    changeDataSync (data) {
      let str = ''
      data.sort((a, b) => a.Order - b.Order)
      data.map(e => {
        if (e.Order >= 1) {
          e.Order = e.Order + 1
        }
        if (e.Code === 'IPDMRPTBATHANS') {
          e.ViName = '- Tiền sử bệnh của bản thân:'
          e.EnName = '- Tiền sử bệnh của bản thân:'
        }
        if (e.Code === 'IPDMRPTTTYTANS') {
          e.ViName = '+ Toàn trạng:'
          e.EnName = '+ Toàn trạng:'
        }
        if (e.Code === 'IPDMRPTTTNSANS') {
          e.ViName = '+ Tiết niệu:'
          e.EnName = '+ Tiết niệu:'
        }
        if (e.Code === 'IPDMRPTTUHOANS') {
          e.ViName = '+ Tuần hoàn:'
          e.EnName = '+ Tuần hoàn:'
        }
        if (e.Code === 'IPDMRPTHOHAANS') {
          e.ViName = '+ Hô hấp:'
          e.EnName = '+ Hô hấp:'
        }
        if (e.Code === 'IPDMRPTTIHOANS') {
          e.ViName = '+ Tiêu hoá:'
          e.EnName = '+ Tiêu hoá:'
        }
        if (e.Code === 'IPDMRPT831') {
          e.ViName = '+ Các bộ phận khác:'
          e.EnName = '+ Các bộ phận khác:'
        }
      })
      let row1 = {
        Code: 'KhamBenh',
        ViName: '- Khám bệnh: ',
        Order: 1,
        Value: ''
      }
      data.push(row1)
      data.sort((a, b) => a.Order - b.Order)
      data.forEach(e => {
        str += (e.ViName ? e.ViName + ' ' : '') + e.Value
        str += '\n'
      })
      return str
    },
    // xác nhận tạo mới
    confirmPopup () {
      this.$emit('confirmPopup')
    },
    getPid (Id) {
      let str = ''
      if (this.optionChild && this.optionChild.length) {
        this.optionChild.find(e => {
          if (e.Newborn && e.Newborn.Id && e.Newborn.Id === Id) {
            str = e.Newborn.PID
          }
        })
      }
      return str
    },
    getName (Id) {
      let str = ''
      if (this.optionChild && this.optionChild.length) {
        this.optionChild.find(e => {
          if (e.Newborn && e.Newborn.Id && e.Newborn.Id === Id) {
            str = e.Newborn.FullNameNewborn
          }
        })
      }
      return str
    },
    checkHasSoSinh () {
      let check = false
      let arrListSoSinh = []
      if (this.ListSoSinh && this.ListSoSinh.length) {
        arrListSoSinh = this.ListSoSinh.map(e => {
          return e.Id
        })
      }
      this.optionChild.forEach(e => {
        if (!arrListSoSinh.includes(e.Newborn.Id)) {
          check = true
        }
      })
      return check
    }
  }
}
</script>
<style scoped>
.box-color {
border: 1px solid;
min-height: 36px;
max-width: 750px;
padding: 3px;
box-sizing: border-box;
}
.Xanh {
  background: #93c47d;
}
.Cam {
  background: #ff9900;
}
.Tim {
  background: #c27ba0;
}
.box-so-sinh {
  padding: 10px;
  border: 1px solid #ccc;
}
.box-info-item {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
