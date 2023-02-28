<template>
  <!-- <FormsWrap @sendFormId="_ItemId()" :FormCode="FormCode" :FormName="'Quản lý thai nghén'"> -->
  <div v-if="loaded">
    <div v-if="List.length > 0">
      <table class="table v-table-1 no-margin">
        <tr>
          <th width="20%">{{__t('Thông tin sản khoa')}}</th>
          <!-- So lan co thai -->
          <td>
            <div class="row">
              <div v-if="MASTERDATA['PRFOURE3']" class="col-md-2">
                <label>{{__label(MASTERDATA['PRFOURE3'])}}</label>
                <VNumberInput :class="{'ml-0': isReadOnly}" :readonly="isReadOnly" v-model="MASTERDATA['PRFOURE3'].Items[0].Value" :placeholder="__t('Nhập')"/>
              </div>
              <!-- So con hien co -->
              <div v-if="MASTERDATA['PRFOURE5']" class="col-md-2">
                <label>{{__label(MASTERDATA['PRFOURE5'])}}</label>
                <VNumberInput :class="{'ml-0': isReadOnly}" :readonly="isReadOnly" v-model="MASTERDATA['PRFOURE5'].Items[0].Value" :placeholder="__t('Nhập')"/>
              </div>
              <!-- San khoa -->
              <div v-if="MASTERDATA['PRFOURE7']" class="col-md-2">
                <label>{{__label(MASTERDATA['PRFOURE7'])}}</label>
                <v-masked-input :readonly="isReadOnly" mask="1/1/1/1" v-model="MASTERDATA['PRFOURE7'].Items[0].Value" :placeholder="'_/_/_/_'" class="form-control"/>
              </div>
              <!-- Vong kinh -->
              <div v-if="MASTERDATA['PRFOURE12']" class="col-md-2">
                <label>{{__label(MASTERDATA['PRFOURE12'])}}</label>
                <VNumberInput :class="{'ml-0': isReadOnly}" :readonly="isReadOnly" v-model="MASTERDATA['PRFOURE12'].Items[0].Value" :placeholder="__t('Nhập')"/>
              </div>
              <!-- KCC -->
              <div v-if="MASTERDATA['PRFOURE14']" class="col-md-2">
                <label>{{__label(MASTERDATA['PRFOURE14'])}}</label>
                <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE14'].Items[0].Value"/>
                <FakeInput v-else :class="{'ml-0': isReadOnly}" v-model="MASTERDATA['PRFOURE14'].Items[0].Value"/>
              </div>
            </div>
            <div class="row mt-10">
              <!-- Du kien sinh -->
              <div v-if="MASTERDATA['PRFOURE16']" class="col-md-4">
                <label>{{__label(MASTERDATA['PRFOURE16'])}}</label>
                <VDatePicker :class="{'ml-0': isReadOnly}" :placeholder="__t('Chọn ngày')" :readonly="isReadOnly" :allday="'allday'" :hideTooltip="true" v-model="MASTERDATA['PRFOURE16'].Items[0].Value" :format="vDateFormat"/>
              </div>
              <!-- Xac dinh boi -->
              <div v-if="MASTERDATA['PRFOURE18']" class="col-md-3" :class="{'flex-col': isReadOnly}">
                <label>{{__label(MASTERDATA['PRFOURE18'])}}</label>
                <MDRadio v-if="MASTERDATA['PRFOURE18']" class="group-radio-m0" :readonly="isReadOnly" v-model="MASTERDATA['PRFOURE18']"/>
              </div>
            </div>
            <div class="row mt-10">
              <!-- Tuoi -->
              <div v-if="MASTERDATA['PRFOURE22']" class="col-md-2">
                <label>{{__label(MASTERDATA['PRFOURE22'])}}</label>
                <p class="fake-input disable m-0">{{CurrentPatientObj.AgeFormated | formatAge}}</p>
              </div>
              <div v-if="MASTERDATA['PRFOURE24']" class="col-md-2">
                <label>{{__label(MASTERDATA['PRFOURE24'])}}</label>
                <FakeInput class="m-0" v-model="Info.Height" :readonly="isReadOnly"/>
              </div>
              <div v-if="MASTERDATA['PRFOURE26']" class="col-md-3">
                <label class="no-wrap">{{__label(MASTERDATA['PRFOURE26'])}}</label>
                <VNumberInput style="max-width: 120px" class="m-0" v-model="MASTERDATA['PRFOURE26'].Items[0].Value" :decimal="true" :readonly="isReadOnly" :placeholder="__t('Nhập')"/>
              </div>
              <div v-if="MASTERDATA['PRFOURE28']" class="col-md-2">
                <label>{{__label(MASTERDATA['PRFOURE28'])}}</label>
                <p class="fake-input disable m-0">{{bmiCalculation === 'Infinity' || bmiCalculation === 'NaN' ? '' : bmiCalculation}}</p>
              </div>
            </div>
            <div class="row mt-10">
              <!-- Seo mo tu cung -->
              <div v-if="MASTERDATA['PRFOURE30']" class="d-flex flex-center col-md-12">
                <label class="w140 font-bold">{{__label(MASTERDATA['PRFOURE30'])}}:</label>
                <MDRadio v-if="MASTERDATA['PRFOURE30']" :readonly="isReadOnly" v-model="MASTERDATA['PRFOURE30']"/>
              </div>
            </div>
            <div class="row mt-10">
              <!-- Di ung -->
              <div v-if="MASTERDATA['PRFOURE34']" class="d-flex flex-center col-md-12">
                <label class="w140 font-bold">{{__label(MASTERDATA['PRFOURE34'])}}:</label>
                <!-- <MDRadio class="space-center" v-if="MASTERDATA['PRFOURE34']" :readonly="true" v-model="MASTERDATA['PRFOURE34']"/> -->
                <p v-if="Info.Allergy && Info.Allergy.IsAllergy && Info.Allergy.Allergy" class="font-bold el-radio-view disable" :class="{'ml-10': !isReadOnly}" style="text-align: left; white-space: normal; max-width: fit-content;">
                  {{Info.Allergy.KindOfAllergy ? getTypeAllergy(Info.Allergy.KindOfAllergy) : ''}} {{Info.Allergy.Allergy || 'N/A'}}
                </p>
                <p v-else-if="Info.Allergy && Info.Allergy.Allergy === 'Không'" class="font-bold el-radio-view disable" :class="{'ml-10': !isReadOnly}" style="white-space: normal; max-width: fit-content;">
                  {{__t('Không')}}
                </p>
                <p v-else-if="Info.Allergy && Info.Allergy.Allergy === 'Không xác định'" class="font-bold el-radio-view disable" :class="{'ml-10': !isReadOnly}" style="white-space: normal; max-width: fit-content;">
                  {{__t('Không xác định-mdc')}}
                </p>
                <p v-else class="font-bold el-radio-view disable" :class="{'ml-10': !isReadOnly}" style="white-space: normal; max-width: fit-content;">
                  {{__t('N/A')}}
                </p>
              </div>
            </div>
            <div class="row mt-10">
              <div v-if="MASTERDATA['PRFOURE38']" class="d-flex flex-center col-md-12">
                <label class="w140 font-bold">{{__label(MASTERDATA['PRFOURE38'])}}:</label>
                <MDRadio v-if="MASTERDATA['PRFOURE38']" :readonly="isReadOnly" v-model="MASTERDATA['PRFOURE38']"/>
              </div>
            </div>
            <div class="row mt-10">
              <div v-if="MASTERDATA['PRFOURE41']" class="d-flex flex-center col-md-12">
                <label class="w140 font-bold">{{__label(MASTERDATA['PRFOURE41'])}}:</label>
                <MDRadio v-if="MASTERDATA['PRFOURE41']" :readonly="isReadOnly" v-model="MASTERDATA['PRFOURE41']"/>
              </div>
            </div>
            <div class="row mt-10">
              <!-- Nhom mau -->
              <div v-if="MASTERDATA['PRFOURE44']" class="d-flex flex-center col-md-12">
                <label class="w140 font-bold">{{__label(MASTERDATA['PRFOURE44'])}}:</label>
                <v-select
                  v-if="!isReadOnly"
                  style="max-width: 160px;"
                  class="select-full-w ml-10"
                  :search="true"
                  :placeholder="__t('Chọn nhóm máu')"
                  v-model="MASTERDATA['PRFOURE44'].Items[0].Value"
                  :items="JSONParse(MASTERDATA['PRFOURE44'].Items[0].Data)"
                />
                <span v-else class="font-bold el-radio-view disable ml-5">{{MASTERDATA["PRFOURE44"].Items[0].Value || "N/A"}}</span>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <table class="table v-table-1 mt-10">
        <tr v-if="MASTERDATA['PRFOURE46']">
          <!-- Tien su gia dinh -->
          <th width="20%">{{__label(MASTERDATA["PRFOURE46"])}}</th>
          <th style="background-color: #fff;" :class="{'text-start': isReadOnly}">
            <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" style="font-weight: normal;" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE46'].Items[0].Value"/>
            <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE46'].Items[0].Value"/>
          </th>
        </tr>
        <tr v-if="MASTERDATA['PRFOURE48']">
          <!-- Dieu tri -->
          <th width="20%">{{__label(MASTERDATA["PRFOURE48"])}}</th>
          <th style="background-color: #fff;" :class="{'text-start': isReadOnly}">
            <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" style="font-weight: normal;" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE48'].Items[0].Value"/>
            <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE48'].Items[0].Value"/>
          </th>
        </tr>
        <tr v-if="MASTERDATA['PRFOURE50']">
          <!-- Phau thuat -->
          <th width="20%">{{__label(MASTERDATA["PRFOURE50"])}}</th>
          <th style="background-color: #fff;" :class="{'text-start': isReadOnly}">
            <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" style="font-weight: normal;" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE50'].Items[0].Value"/>
            <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE50'].Items[0].Value"/>
          </th>
        </tr>
        <tr v-if="MASTERDATA['PRFOURE52']">
          <!-- Phu khoa -->
          <th width="20%">{{__label(MASTERDATA["PRFOURE52"])}}</th>
          <th style="background-color: #fff;" :class="{'text-start': isReadOnly}">
            <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" style="font-weight: normal;" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE52'].Items[0].Value"/>
            <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE52'].Items[0].Value"/>
          </th>
        </tr>
      </table>
      <!-- Thong tin khai thac tien su gia dinh -->
      <div v-if="MASTERDATA['PRFOURE46'] && Info && Info.PersonalHistory.length > 0">
        <div class="HistoryOfPresentIllness">
          <label>{{__t('Thông tin khai thác tiền sử gia đình')}}:</label>
          <vue-scrolling-table>
            <template slot="tbl">
              <table class="table table-bordered table-bordered-x">
                <thead>
                  <tr>
                    <th width="222px" class="no-wrap">{{__t('Ngày khám')}}</th>
                    <th width="222px" class="no-wrap">{{__t('Bác sĩ khám')}}</th>
                    <th width="222px" class="no-wrap">{{__t('Khoa Phòng')}}</th>
                    <th>{{__t('Tiền sử gia đình')}}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr :data="item" :key="index"  v-for="(item, index) in Info.PersonalHistory">
                    <td class="no-wrap">{{item.ExaminationTime | formatDateWithoutSecon}}</td>
                    <td class="no-wrap"><ad-Info :ad="item.Username" :type="item.Type" /></td>
                    <td><p class="mb-0 no-wrap">{{item.ViName}} - {{item.VisitTypeGroup}}</p></td>
                    <td><p v-if="item.FamilyMedicalHistory">{{trimText(item.FamilyMedicalHistory)}}</p></td>
                    <td width="1" class="no-wrap"><button v-if="!isReadOnly" class="btn btn-xs v-white-btn" @click="copyToMDWithCode('PRFOURE46', item.FamilyMedicalHistory)">Copy</button></td>
                  </tr>
                </tbody>
              </table>
            </template>
          </vue-scrolling-table>
        </div>
      </div>
      <!-- Tien su san khoa -->
      <div v-if="MASTERDATA['PRFOURE54']">
        <h3 class="text-center">{{__label(MASTERDATA["PRFOURE54"])}}</h3>
          <div style="width: 100%;">
          <TblWithMasterData
            :headerStyle="[{width: '170px'}, {width: '170px'}, {width: '170px'}, {width: '170px'}, {}]"
            :readonly="isReadOnly"
            :FormCode="'PRFOURE54'"
            :VisitId="_VisitId"
            :FormID="_ItemId"
            :VisitType="'OPD'"
            :textBtnAdd="this.__t('Thêm mới')"
            :formatTime="vDateFormat"
            :dontGetDate="true"
            @dataChanged="tableChanged = true"
          ref="TblWithMasterData"/>
        </div>
      </div>
      <div>
        <table class="standing-order-tbl">
          <tr>
            <th rowspan="2" class="text-center">{{__label(MASTERDATA["PRFOURE60"])}}</th>
            <th rowspan="2" class="text-center">{{__label(MASTERDATA["PRFOURE63"])}}</th>
            <th rowspan="2" class="text-center">{{__label(MASTERDATA["PRFOURE66"])}}</th>
            <th rowspan="2" class="text-center">{{__label(MASTERDATA["PRFOURE69"])}}</th>
            <th rowspan="2" class="text-center">{{__label(MASTERDATA["PRFOURE72"])}}</th>
            <th rowspan="2" class="text-center">{{__label(MASTERDATA["PRFOURE75"])}}</th>
            <th rowspan="2" class="text-center">{{__label(MASTERDATA["PRFOURE78"])}}</th>
            <th rowspan="2" class="text-center">{{__label(MASTERDATA["PRFOURE81"])}}</th>
            <th colspan="2" class="text-center">{{__label(MASTERDATA["PRFOURE84"])}}</th>
          </tr>
          <tr v-if="MASTERDATA['PRFOURE84']">
            <th class="text-center">{{__label(MASTERDATA["PRFOURE84"].Items[0])}}</th>
            <th class="text-center">{{__label(MASTERDATA["PRFOURE84"].Items[2])}}</th>
          </tr>
          <tr>
            <!-- HIV -->
            <td v-if="MASTERDATA['PRFOURE60']">
              <textarea-autosize v-if="!isReadOnly" style="width: 120px;" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE60'].Items[0].Value"/>
              <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE60'].Items[0].Value"/>
            </td>
            <!-- Giang mai -->
            <td v-if="MASTERDATA['PRFOURE63']">
              <textarea-autosize v-if="!isReadOnly" style="width: 120px;" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE63'].Items[0].Value"/>
              <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE63'].Items[0].Value"/>
            </td>
            <!-- Rubella -->
            <td v-if="MASTERDATA['PRFOURE66']">
              <div class="d-flex flex-center">
                <p class="mb-0 mr-5">IgM</p>
                <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE66'].Items[0].Value"/>
                <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE66'].Items[0].Value"/>
              </div>
            </td>
            <!-- Toxo -->
            <td v-if="MASTERDATA['PRFOURE69']">
              <div class="d-flex flex-center">
                <p class="mb-0 mr-5">IgM</p>
                <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE69'].Items[0].Value"/>
                <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE69'].Items[0].Value"/>
              </div>
            </td>
            <!-- CMV -->
            <td v-if="MASTERDATA['PRFOURE72']">
              <div class="d-flex flex-center">
                <p class="mb-0 mr-5">IgM</p>
                <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE72'].Items[0].Value"/>
                <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE72'].Items[0].Value"/>
              </div>
            </td>
            <!-- Viem gan B -->
            <td v-if="MASTERDATA['PRFOURE75']">
              <div class="d-flex flex-center">
                <p class="mb-0 mr-5">HbsAg</p>
                <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE75'].Items[0].Value"/>
                <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE75'].Items[0].Value"/>
              </div>
            </td>
            <!-- Lien cau khuan B -->
            <td v-if="MASTERDATA['PRFOURE78']">
              <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE78'].Items[0].Value"/>
              <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE78'].Items[0].Value"/>
            </td>
            <!-- Uon van -->
            <td v-if="MASTERDATA['PRFOURE81']">
              <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE81'].Items[0].Value"/>
              <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE81'].Items[0].Value"/>
            </td>
            <!-- PAP -->
            <td v-if="MASTERDATA['PRFOURE84']">
              <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE84'].Items[0].Value"/>
              <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE84'].Items[0].Value"/>
            </td>
            <!-- HPV -->
            <td v-if="MASTERDATA['PRFOURE84']">
              <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE84'].Items[1].Value"/>
              <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE84'].Items[0].Value"/>
            </td>
          </tr>
          <tr>
            <!-- HIV 1 -->
            <td v-if="MASTERDATA['PRFOURE60']">
              <textarea-autosize v-if="!isReadOnly" style="width: 120px;" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE60'].Items[1].Value"/>
              <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE60'].Items[1].Value"/>
            </td>
            <!-- Giang mai 1 -->
            <td v-if="MASTERDATA['PRFOURE63']">
              <textarea-autosize v-if="!isReadOnly" style="width: 120px;" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE63'].Items[1].Value"/>
              <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE63'].Items[1].Value"/>
            </td>
            <!-- Rubella 1 -->
            <td v-if="MASTERDATA['PRFOURE66']">
              <div class="d-flex flex-center">
                <p class="mb-0 mr-5">TgG</p>
                <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE66'].Items[1].Value"/>
                <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE66'].Items[1].Value"/>
              </div>
            </td>
            <!-- Toxo 1 -->
            <td v-if="MASTERDATA['PRFOURE69']">
              <div class="d-flex flex-center">
                <p class="mb-0 mr-5">IgG</p>
                <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE69'].Items[1].Value"/>
                <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE69'].Items[1].Value"/>
              </div>
            </td>
            <!-- CMV 1 -->
            <td v-if="MASTERDATA['PRFOURE72']">
              <div class="d-flex flex-center">
                <p class="mb-0 mr-5">IgG</p>
                <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE72'].Items[1].Value"/>
                <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE72'].Items[1].Value"/>
              </div>
            </td>
            <!-- Viem gan B 1 -->
            <td v-if="MASTERDATA['PRFOURE75']">
              <div class="d-flex flex-center">
                <p class="mb-0 mr-5">HbsAb</p>
                <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE75'].Items[1].Value"/>
                <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE75'].Items[1].Value"/>
              </div>
            </td>
            <!-- Lien cau khuan B 1 -->
            <td v-if="MASTERDATA['PRFOURE78']">
              <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE78'].Items[1].Value"/>
              <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE78'].Items[1].Value"/>
            </td>
            <!-- Uon van 1 -->
            <td v-if="MASTERDATA['PRFOURE81']">
              <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE81'].Items[1].Value"/>
              <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE81'].Items[1].Value"/>
            </td>
            <!-- PAP 1 -->
            <td v-if="MASTERDATA['PRFOURE84']">
              <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE84'].Items[2].Value"/>
              <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE84'].Items[2].Value"/>
            </td>
            <!-- HPV 1 -->
            <td v-if="MASTERDATA['PRFOURE84']">
              <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE84'].Items[3].Value"/>
              <FakeInput v-else class="font-normal" v-model="MASTERDATA['PRFOURE84'].Items[3].Value"/>
            </td>
          </tr>
        </table>
        <table class="table v-table-1 mt-10">
          <tr>
            <td v-if="MASTERDATA['PRFOURE89']">
              <div class="d-flex flex-center">
                <p v-if="isReadOnly" class="mb-0 mr-5">{{__label(MASTERDATA['PRFOURE89'])}}:</p>
                <MDRadio v-if="MASTERDATA['PRFOURE89']" :readonly="isReadOnly" v-model="MASTERDATA['PRFOURE89']"/>
              </div>
            </td>
            <!-- Nguy co -->
            <td v-if="MASTERDATA['PRFOURE93']">
              <div class="d-flex flex-center">
                <p class="mb-0 mr-5">{{__label(MASTERDATA['PRFOURE93'])}}:</p>
                <MDRadio v-if="MASTERDATA['PRFOURE93']" :readonly="isReadOnly" v-model="MASTERDATA['PRFOURE93']"/>
              </div>
            </td>
            <!-- Choc oi -->
            <td v-if="MASTERDATA['PRFOURE96']">
              <div class="d-flex flex-center">
                <p class="mb-0 mr-5">{{__label(MASTERDATA['PRFOURE96'])}}:</p>
                <MDRadio v-if="MASTERDATA['PRFOURE96']" :readonly="isReadOnly" v-model="MASTERDATA['PRFOURE96']"/>
              </div>
            </td>
          </tr>
          <tr>
            <!-- Tieu duong -->
            <td v-if="MASTERDATA['PRFOURE99']">
              <div class="d-flex flex-center">
                <p class="mb-0 mr-5">{{__label(MASTERDATA['PRFOURE99'])}}:</p>
                <MDRadio v-if="MASTERDATA['PRFOURE99']" :readonly="isReadOnly" v-model="MASTERDATA['PRFOURE99']"/>
              </div>
            </td>
            <!-- Benh ly -->
            <td colspan="2" v-if="MASTERDATA['PRFOURE103']">
              <div class="d-flex flex-center">
                <p class="mb-0 mr-5 no-wrap">{{__label(MASTERDATA['PRFOURE103'])}}:</p>
                <textarea-autosize v-if="!isReadOnly" rows="1" class="form-control" :placeholder="__t('Nhập')" v-model="MASTERDATA['PRFOURE103'].Items[0].Value"/>
                <FakeInput v-else v-model="MASTERDATA['PRFOURE103'].Items[0].Value"/>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <!-- Chân ký -->
      <div v-if="DataSubmit" class="row text-center mt-10">
        <div class="col-md-6 col-md-offset-6" v-if="DataSubmit.ConfirmInfos.length > 0">
          <div style="font-weight: normal">{{ DataSubmit.ConfirmInfos[0].ConfirmAt | formatDateWithoutSecon }}</div>
          <eform-signature
            :ad="DataSubmit.ConfirmInfos[0].ConfirmBy"
            :title="__t('Bác sĩ')"
          />
        </div>
        <div class="col-md-6 col-md-offset-6" v-else>
          <p class="mb-10">
            <b>{{ __t('Bác sĩ') }}</b>
          </p>
          <i v-if="isReadOnly">{{__t('Chưa xác nhận')}}</i>
          <button v-else @click="showDoctorConfirm('Doctor', 'Bác sĩ')" class="btn v-white-btn">
            {{ __t('Xác nhận') }}
          </button>
        </div>
      </div>
      <p class="mt-10">A01_067_050919_VE</p>
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="DataSubmit.UpdatedBy" /> {{__t('lúc')}} {{DataSubmit.UpdatedAt}}</p>
      <!-- footer -->
      <FloatBlock :openBack="true" @handleBack="handleBack" v-if="!viewOnly">
        <template slot='buttons'>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-2 col-sm-2">
          </div>
          <div class="col-md-6 col-sm-6">
            <div v-if="!isReadOnly" class="form-group1">
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
      <DoctorConfirm :popupTitle="popupTitle" :TypeConfirm="TypeConfirm" @popupSave="popupSave"/>
    </div>
    <div v-else class="text-center mb-10">
      <div v-if="!viewOnly">
        <div v-if="IsLocked" style="color: red;" class="italic">
        <h4><i class="fa fa-lock" aria-hidden="true"></i> {{__t('Bạn không được phép chỉnh sửa do hồ sơ đã bị khóa theo nguyên tắc 24h!')}}</h4>
      </div>
        <h4 v-else>{{__t('Chưa có Thông tin sản khoa')}}</h4>
        <button v-if="!IsLocked && !viewOnly" class="btn btn-warning" @click="createPopup">{{__t('Tạo mới')}}</button>
      </div>
      <div v-else>
        <h4>{{__t('Chưa có thông tin !')}}</h4>
      </div>
    </div>
  </div>
  <div v-else class="loading-text"><v-loading/></div>
  <!-- </FormsWrap> -->
</template>

<script>
import FormApi from '@/services/FormAPI.js'
import PregnancyFollowUpRecord from '@/services/OPD/PregnancyFollowUpRecord.js'
import FormsWrap from '@/components/Form/FormsWrap'
import DoctorConfirm from '@/pages/OPD/PregnancyFollowUpRecord/popup/DoctorConfirm.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import VSelect from '@/components/VSelect.vue'
import TblWithMasterData from '@/components/global/TblWithMasterData'
import { find } from 'lodash'
export default {
  name: 'OPDObstetricInformation',
  components: {
    FormsWrap, DoctorConfirm, VSelect, TblWithMasterData
  },
  mixins: [MixinMasterData],
  props: [
    'viewOnly',
    'VisitId',
    'VisitType',
    'FormId'
  ],
  data () {
    return {
      DataSubmit: {},
      dataMaster: {},
      Info: {},
      List: [],
      loaded: false,
      IsLocked: false,
      popupTitle: '',
      TypeConfirm: '',
      tableChanged: false,
      FormCode: 'A01_067_050919_VE_TAB1'
    }
  },
  async mounted () {
    this.getMasterDatas({Form: 'A01_067_050919_VE'}, () => {
    })
    await this.getInfo()
    this.APIService = await new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A01_067_050919_VE_TAB1'
    })
    this.getList()
  },
  computed: {
    isReadOnly () {
      if (this.DataSubmit.isUnLockConfirm) {
        return this.viewOnly
      } else {
        return this.viewOnly || this.IsLocked || this.DataSubmit.ConfirmInfos.length > 0 || this.getCurrentUsername() !== this.DataSubmit.CreatedBy
      }
      // return false
    },
    _ItemId () {
      return this.formId || this.$route.params.Item
    },
    bmiCalculation () {
      let weight = this.MASTERDATA['PRFOURE26'].Items[0].Value
        ? parseFloat(this.MASTERDATA['PRFOURE26'].Items[0].Value)
        : 0
      let height = this.Info.Height
        ? parseFloat(this.Info.Height) / 100
        : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  methods: {
    getInfo () {
      new PregnancyFollowUpRecord().find('/Info/' + this.FormCode + '/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.Info = response
      }).catch(e => {
        this.IsLocked = e.data.IsLocked24h
      })
    },
    getList () {
      this.APIService.GetList().then(res => {
        if (res.FORM_NOT_FOUND && res.FORM_NOT_FOUND.ViMessage === 'Form không tồn tại') {
        } else {
          this.List = res.Datas
          this.$route.params.Item = this.List[0].Id
        }
        this.getData()
      }).catch((e) => {
        this.loaded = true
      })
    },
    getData () {
      this.APIService.GetDetail(this._ItemId + '?hidemsg=' + true).then(res => {
        this.DataSubmit = res.data
        this.IsLocked = res.IsLock24h
        this.$store.dispatch('setCurrentFormId', this.DataSubmit.Id)
        this.mapData()
        this.loaded = true
      }).catch((e) => {
        console.log(e)
        this.loaded = true
      })
    },
    mapData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else {
                item.Value = exited.Value
              }
            } else {
              item.Value = null
            }
          })
        }
      }
      this.getAllergyData()
      setTimeout(() => {
        this.dataMaster = JSON.stringify(this.MASTERDATA)
      }, 1000)
    },
    getAllergyData () {
      let Allergy = this.Info.Allergy
      if (Allergy.Allergy === 'Không') {
        this.MASTERDATA['PRFOURE34'].Items[0].Value = false
        this.MASTERDATA['PRFOURE34'].Items[1].Value = true
        this.MASTERDATA['PRFOURE34'].Items[2].Value = false
      } else if (Allergy.Allergy === 'Không xác định' || Allergy.Allergy === null || Allergy.Allergy === '') {
        this.MASTERDATA['PRFOURE34'].Items[0].Value = false
        this.MASTERDATA['PRFOURE34'].Items[1].Value = false
        this.MASTERDATA['PRFOURE34'].Items[2].Value = true
      } else {
        this.MASTERDATA['PRFOURE34'].Items[0].Value = true
        this.MASTERDATA['PRFOURE34'].Items[1].Value = false
        this.MASTERDATA['PRFOURE34'].Items[2].Value = false
      }
    },
    async handleSubmit (str) {
      await this.$refs.TblWithMasterData.submit()
      await this.mapData2MDData()
      const DataSubmit = Object.assign({}, this.DataSubmit)
      this.APIService.UpdateForm(this._ItemId, DataSubmit).then(res => {
        if (str !== 'confirm') {
          this.toastedSuccess()
        } else {
          this.toastedSuccess(this.$t('Xác nhận thành công'))
        }
        this.reload()
      }).catch((e) => {
        if (str === 'confirm') {
          this.reload()
        }
      })
    },
    popupSave (data) {
      this.ConfirmKyNhay(data)
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    async ConfirmKyNhay (data) {
      if (!this.isReadOnly) {
        await this.handleSubmit('confirm')
      }
      await this.APIService.ConfirmForm(this._ItemId, data).then(async res => {
        this.scroll2Bottom()
        this.toastedSuccess()
      }).catch((e) => {
      })
    },
    copyToMDWithCode (mdCode, str) {
      str = this.trim_(str)
      // if (this.MASTERDATA[mdCode].Items[0].Value && this.MASTERDATA[mdCode].Items[0].Value.includes(str)) {
      // } else {
      var old = this.MASTERDATA[mdCode].Items[0].Value ? (this.trim_(this.MASTERDATA[mdCode].Items[0].Value) + '\n') : ''
      this.MASTERDATA[mdCode].Items[0].Value = this.trim_(old + (str), ', ')
      this.toastedInfo('Đã copy')
      // }
    },
    trimText (text) {
      return text.trim()
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA) || this.tableChanged) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    // tạo mới form
    handleCreate () {
      this.APIService.CreateForm({}).then(res => {
        this.toastedSuccess()
        this.reload()
      })
    },
    // popup canh bao
    confirmPopupBack () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
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
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Thông tin sản khoa'),
        text: this.$t('Tạo mới Thông tin sản khoa'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleCreate()
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
    }
  }
}
</script>
<style lang="stylus" scoped>
.w-30 {
  width: 50px;
}
.text-start p {
  text-align: start;
}
.flex-col {
  display: flex;
  flex-flow: column;
}
>>>.group-radio-m0 {
  span:first-child {
    margin-left: 0 !important;
  }
  .el-radio-view {
    margin-left: 0 !important;
  }
}
</style>
