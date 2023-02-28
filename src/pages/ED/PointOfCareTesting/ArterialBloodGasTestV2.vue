<template>
  <div class="main-content disable_ccp" id="di0-page" :class="{'readonly-form': readonly}" v-if="hasData">
    <h2 class="text-center">{{__t('Xét nghiệm tại chỗ - Khí máu Cartridge CG4+')}}</h2>
    <h4 class="text-center" v-if="DataSubmit.Specialty">{{__t('Khoa')}}: <b>{{__label(DataSubmit.Specialty)}}</b></h4>
    <template v-if="hasData">
      <div class="box no-border">
        <div class="box-body" style="padding-left: 0; padding-right: 0;">
          <div class="row mb-10">
            <div class="col-md-2">
              <div class="group-radio">
                <b class="flex-box-label no-wrap">{{__t('Thông số bệnh nhân')}}</b>
              </div>
            </div>
            <div class="col-md-8">
              <div class="group-radio">
                <span class="flex-box-label">{{__t('Thở máy')}}</span>
                <span>
                  <input id="status_yes" name="status" type="radio" value="true" v-model="DataSubmit.UseBreathingMachine">
                  <label for="status_yes">{{__t('Có')}}</label>
                </span>
                <span>
                  <input id="status_no" name="status" type="radio" value="false" v-model="DataSubmit.UseBreathingMachine">
                  <label for="status_no">{{__t('Không')}}</label>
                </span>
              </div>
            </div>
          </div>
          <table class="table table-bordered table-bordered-x">
            <thead>
              <tr>
                <th>{{__t('Mode thở')}}</th>
                <th>{{__t('Huyết áp')}}&nbsp;<span class="unit-label">(mmHg)</span></th>
                <th colspan="2">Vt/f</th>
                <th>{{__t('Nhịp thở')}}</th>
                <th>{{__t('FIO2')}}&nbsp;<span class="unit-label">(%)</span></th>
                <th>{{__t('Nhiệt độ')}}&nbsp;<span class="unit-label">(&#8451;)</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input v-if="!readonly" class="form-control" v-model="DataSubmit.BreathingMode"/>
                  <b class="no-wrap" v-else>{{DataSubmit.BreathingMode || 'N/A'}}</b>
                </td>
                <td>
                  <input v-if="!readonly" class="form-control" v-model="DataSubmit.BP"/>
                  <b class="no-wrap" v-else>{{DataSubmit.BP || 'N/A'}}</b>
                </td>
                <td>
                  <div class="input-group" v-if="!readonly">
                    <span class="input-group-addon">Vt:</span>
                    <input class="form-control" v-model="DataSubmit.Vt"/>
                  </div>
                  <b class="no-wrap" v-else>Vt: {{DataSubmit.Vt || 'N/A'}}</b>
                </td>
                <td>
                  <div class="input-group" v-if="!readonly">
                    <span class="input-group-addon">f:</span>
                    <input class="form-control" v-model="DataSubmit.F"/>
                  </div>
                  <b class="no-wrap" v-else>f: {{DataSubmit.F || 'N/A'}}</b>
                </td>
                <td>
                  <input v-if="!readonly" class="form-control" v-model="DataSubmit.RR"/>
                  <b class="no-wrap" v-else>{{DataSubmit.RR || 'N/A'}}</b>
                </td>
                <td>
                  <input v-if="!readonly" class="form-control" v-model="DataSubmit.FIO2"/>
                  <b class="no-wrap" v-else>{{DataSubmit.FIO2 || 'N/A'}}</b>
                </td>
                <td>
                  <input v-if="!readonly" class="form-control" v-model="DataSubmit.T"/>
                  <b class="no-wrap" v-else>{{DataSubmit.T || 'N/A'}}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <table class="table v-table-1">
        <tr>
          <th width="20%" style="text-align: left;">{{__t('Allen Test')}}</th>
          <th style="background-color: #fff;">
            <textarea-autosize :readonly="readonly" rows="1" class="form-control" style="font-weight: normal;" :placeholder="__t('Nhập')" v-model="DataSubmit.AllenTest"/>
          </th>
        </tr>
        <tr>
          <th width="20%" style="text-align: left;">{{__t('Vị trí lấy mẫu')}}</th>
          <th style="background-color: #fff;">
            <textarea-autosize :readonly="readonly" rows="1" class="form-control" style="font-weight: normal;" :placeholder="__t('Nhập')" v-model="DataSubmit.CollectionSite"/>
          </th>
        </tr>
      </table>
      <!-- <table class="table header-table" v-if="DataSubmit.Version >= 10"> -->
      <table class="table header-table" v-if="Version >= 11">
        <tr>
          <th rowspan="2">{{__t('PointOfCareTesting.STT')}}</th>
          <th rowspan="2" colspan="2" class="text-center">{{__t('PointOfCareTesting.thong_so')}}</th>
          <th rowspan="2" class="text-center" style="width: 150px;">{{__t('PointOfCareTesting.khoang_tham_chieu')}}</th>
          <th colspan="2" class="text-center">{{__t('PointOfCareTesting.chi_so_bao_dong')}}</th>
          <th colspan="3" class="no-wrap text-center" style="width: 120px;">{{__t('PointOfCareTesting.ket_qua')}}</th>
        </tr>
        <tr>
          <th class="no-wrap text-center" style="width: 95px">{{__t('Giá trị thấp')}}</th>
          <th class="no-wrap text-center" style="width: 95px">{{__t('Giá trị cao')}}</th>
          <th class="no-wrap text-center w80">{{__t('PointOfCareTesting.ket_qua')}}</th>
          <th>{{__t('PointOfCareTesting.don_vi')}}</th>
          <th class="text-center">{{__t('Hình ảnh')}} <button v-if="!readonly" class="btn btn-sync-data" @click="openFile()"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('Tải ảnh')}}</button></th>
        </tr>
        <tbody>
          <tr :data="item" :key="index" v-for="(item, index) in DataSubmit.Datas">
            <!-- Col-1,2 -->
            <template v-if="index === 0 || index === 1">
              <td class="element-middle" rowspan="2" v-if="index === 0">{{item.Order}}</td>
              <td class="element-middle" rowspan="2" v-if="index === 0">{{item.Name}}</td>
            </template>
            <template v-else-if="index === 2 || index === 3">
              <td class="element-middle" rowspan="2" v-if="index === 2">{{item.Order}}</td>
              <td class="element-middle" rowspan="2" v-if="index === 2">{{item.Name}}</td>
            </template>
            <template v-else-if="index === 4 || index === 5 || index === 6">
              <td class="element-middle" rowspan="3" v-if="index === 4">{{item.Order}}</td>
              <td class="element-middle" rowspan="3" v-if="index === 4">{{item.Name}}</td>
            </template>
            <template v-else>
              <td class="element-middle">{{item.Order}}</td>
              <td class="element-middle">{{item.Name}}</td>
            </template>
            <!-- Col-3 -->
            <td style="text-align: center; vertical-align: middle">{{item.ViAge}}</td>
            <!-- Col-4,5,6 -->
            <template v-if="index === 0 || index === 1">
              <td class="element-middle" style="text-align: center;" v-if="index === 0">
                {{item.LowerLimit ? item.LowerLimit : ''}} {{item.LowerLimit && item.HigherLimit ? '-' : ''}} {{item.HigherLimit ? item.HigherLimit : ''}}
              </td>
              <td v-if="index === 1"></td>
              <td class="element-middle" rowspan="2" v-if="index === 0">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
              <td class="element-middle" rowspan="2" v-if="index === 0">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
            </template>
            <template v-else-if="index === 2 || index === 3">
              <td class="element-middle" v-if="index === 2">
                {{item.LowerLimit ? item.LowerLimit : ''}} {{item.LowerLimit && item.HigherLimit ? '-' : ''}} {{item.HigherLimit ? item.HigherLimit : ''}}
              </td>
              <td v-if="index === 3"></td>
              <td class="element-middle" v-if="index === 2">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
              <td class="element-middle" v-if="index === 2">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
              <td class="element-middle" v-if="index === 3">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
              <td class="element-middle" v-if="index === 3">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
            </template>
            <template v-else-if="index === 4 || index === 5 || index === 6">
              <td class="element-middle" v-if="index === 4">
                {{item.LowerLimit ? item.LowerLimit : ''}} {{item.LowerLimit && item.HigherLimit ? '-' : ''}} {{item.HigherLimit ? item.HigherLimit : ''}}
              </td>
              <td class="element-middle" v-if="index === 5"></td>
              <td class="element-middle" v-if="index === 6"></td>
              <td class="element-middle">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
              <td class="element-middle">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
              <!-- <td class="element-middle" v-if="index === 5">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
              <td class="element-middle" v-if="index === 5">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
              <td class="element-middle" v-if="index === 6">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
              <td class="element-middle" v-if="index === 6">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td> -->
            </template>
            <template v-else-if="index === 7">
              <td class="element-middle">
                ({{item.LowerLimit ? (item.LowerLimit) : ''}}) {{item.LowerLimit && item.HigherLimit ? '-' : ''}} ({{item.HigherLimit ? `+${item.HigherLimit}` : ''}})
              </td>
              <td class="element-middle" v-if="index === 7">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
              <td class="element-middle" v-if="index === 7">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
            </template>
            <template v-else>
              <td class="element-middle">
                {{item.LowerLimit ? item.LowerLimit : ''}} {{item.LowerLimit && item.HigherLimit ? '-' : ''}} {{item.HigherLimit ? item.HigherLimit : ''}}
              </td>
              <td class="element-middle">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
              <td class="element-middle">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
            </template>
            <!-- Col-7 -->
            <td>
              <input placeholder="Nhập" type="text" v-if="!readonly" class="form-control" v-model="item.Result" />
              <span v-else :class="wlabel(item.Result, item.LowerAlert, item.HigherAlert)">
                {{item.Result}}
              </span>
            </td>
            <template v-if="index === 0 || index === 1">
              <td class="element-middle" rowspan="2" v-if="index === 0"></td>
            </template>
            <template v-else-if="index === 2 || index === 3">
              <td class="element-middle" rowspan="2" v-if="index === 2">{{item.Unit}}</td>
            </template>
            <template v-else-if="index === 4 || index === 5 || index === 6">
              <td class="element-middle" rowspan="3" v-if="index === 4">{{item.Unit}}</td>
            </template>
            <template v-else>
              <td class="element-middle">{{item.Unit}}</td>
            </template>
            <td width="220px" v-if="index === 0" :rowspan="DataSubmit.Datas.length">
              <drop-files :readonly="readonly" id="mini-upload" v-if="DataSubmit.Datas" v-model="DataSubmit.Upload" :dataDropfile="dataDropfile"/>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table header-table" v-else>
        <tr>
          <th rowspan="2">{{__t('PointOfCareTesting.STT')}}</th>
          <th rowspan="2" colspan="2" class="text-center">{{__t('PointOfCareTesting.thong_so')}}</th>
          <th rowspan="2">{{__t('PointOfCareTesting.khoang_tham_chieu')}}</th>
          <th colspan="2" class="text-center">{{__t('PointOfCareTesting.chi_so_bao_dong')}}</th>
          <th colspan="3" class="text-center">{{__t('PointOfCareTesting.ket_qua')}}</th>
        </tr>
        <tr>
          <th>{{__t('Giá trị thấp')}}</th>
          <th>{{__t('Giá trị cao')}}</th>
          <th class="text-center">{{__t('PointOfCareTesting.ket_qua')}}</th>
          <th>{{__t('PointOfCareTesting.don_vi')}}</th>
          <th class="text-center">{{__t('Hình ảnh')}} <button v-if="!readonly" class="btn btn-sync-data" @click="openFile()"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('Tải ảnh')}}</button></th>
        </tr>
        <tbody>
          <tr :data="item" :key="index" v-for="(item, index) in DataSubmit.Datas">
            <td>{{item.Order}}</td>
            <!-- Col-2 -->
            <td colspan="2"><unit :unit="item.Name"/></td>
            <!-- Col-3 -->
            <td>
              <template v-if="index === 3">
                ({{item.LowerLimit || 'Không áp dụng'}}) - (+{{item.HigherLimit || 'Không áp dụng'}})
              </template>
              <template v-else-if="index === 4">
                {{item.LowerLimit || 'Không áp dụng'}} - {{item.HigherLimit || 'Không áp dụng'}}
              </template>
              <template v-else>
                {{item.LowerLimit || 'Không áp dụng'}} - {{item.HigherLimit || 'Không áp dụng'}}
              </template>
            </td>
            <template v-if="index === 0">
              <td>≤7.20</td>
              <td>≥7.60</td>
            </template>
            <template v-else>
              <td>{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
              <td>{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
            </template>
            <td>
              <!-- @keypress="inputKeyPressNumber(item.Result, $event)" -->
              <input type="text" :placeholder="__t('Nhập')" v-if="!readonly" class="form-control w80" v-model="item.Result" />
              <span v-else :class="wlabel(item.Result, item.LowerAlert, item.HigherAlert)">
                {{item.Result}}
              </span>
            </td>
            <td>{{item.Unit}}</td>
            <td width="220px" v-if="index === 0" :rowspan="DataSubmit.Datas.length">
              <drop-files :readonly="readonly" id="mini-upload" v-if="DataSubmit.Datas" v-model="DataSubmit.Upload" :dataDropfile="dataDropfile"/>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="Version >= 11"><i>{{__t('Chú ý')}}: Khoảng tham chiếu trên dành cho Xét nghiệm khí máu động mạch cho người trưởng thành. Xét nghiệm khí máu tĩnh mạch và xét nghiệm cho đối tượng khác tham khảo thêm trong <b>Sổ tay khoảng tham chiếu</b></i></p>
      <!-- Confirm -->
      <div v-if="(Version === 1 && _VisitType === 'IPD') || Version === 2" class="row">
        <div class="col-md-6 col-sm-6">
          <p class="text-center">{{DataSubmit.UpdatedAt | formatDateWithoutSecon}}</p>
          <eform-signature v-if="DataSubmit.ExecutionUser" :ad="DataSubmit.ExecutionUser.Username" :title="'PointOfCareTesting.nguoi_lam_xet_nghiem'" />
        </div>
        <div class="col-md-6 col-sm-6 text-center">
          <template v-if="(DataSubmit.DoctorAccept && DataSubmit.DoctorAccept.Username)">
            <p class="text-center">{{DataSubmit.UpdatedAt | formatDateWithoutSecon}}</p>
            <eform-signature :ad="DataSubmit.DoctorAccept.Username" :title="'Bác sĩ chỉ định'" />
          </template>
          <template v-else>
            <p>{{DataSubmit.Accept}}</p>
            <p><b>{{__t('Bác sĩ chỉ định')}}:</b></p>
            <p v-if="viewOnly || IsLocked">Chưa xác nhận</p>
            <p v-else><button @click="$modal.show('doctorConfirm')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
          </template>
        </div>
      </div>
      <!-- New Confirm -->
      <div v-else class="row">
        <div class="col-md-6 col-sm-6 text-center" v-if="DataSubmit.ExecutionUser.Username">
          <p class="text-center">{{ getFTime(DataSubmit.ExecutionTime) }}</p>
          <EformSignature2 :title="__t('PointOfCareTesting.nguoi_lam_xet_nghiem')" :ad="DataSubmit.ExecutionUser.Username"/>
        </div>
        <div class="col-md-6 col-sm-6 text-center" v-else>
          <p class="mt-10"><b>{{__t("PointOfCareTesting.nguoi_lam_xet_nghiem")}}:</b></p>
          <ad-Info v-if="DataSubmit.CreatedBy" :ad="DataSubmit.CreatedBy" class="mb-5"/>
          <p v-if="!viewOnly && !IsLocked">
            <button @click="showDoctorConfirm('Người làm xét nghiệm')" class="btn v-white-btn">
              {{ __t("Xác nhận") }}
            </button>
          </p>
          <p v-else class="italic" style="color: green">({{(__t('Chưa ký xác nhận'))}})</p>
        </div>
        <div class="col-md-6 col-sm-6 text-center" v-if="DataSubmit.DoctorAccept.Username">
          <p class="text-center">{{DataSubmit.AcceptTime}}</p>
          <EformSignature2 :title="__t('Bác sĩ chỉ định')" :ad="DataSubmit.DoctorAccept.Username"/>
        </div>
        <div class="col-md-6 col-sm-6 text-center" v-else>
          <p class="mt-10"><b>{{__t("Bác sĩ chỉ định")}}:</b></p>
          <p v-if="!viewOnly && !IsLocked">
            <button @click="showDoctorConfirm('Bác sĩ chỉ định')" class="btn v-white-btn">
              {{ __t("Xác nhận") }}
            </button>
          </p>
          <p v-else class="italic" style="color: green">({{(__t('Chưa ký xác nhận'))}})</p>
        </div>
      </div>
      <FloatBlock v-if="!viewOnly" :openBack="true" @handleBack="handleBack">
        <template slot='buttons'>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group1">
              <button class="btn v-white-btn btn-block" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
            </div>
          </div>
          <div class="col-md-6 col-sm-6">
            <div v-if="!readonly" class="form-group1">
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
    </template>
    <div v-else class="text-center">
      <button @click="create()" class="btn btn-warning">{{__t('Tạo phiếu')}}</button>
    </div>
    <!-- Modal -->
    <modal v-if="Version === 2" name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t('Bác sĩ xác nhận')}}.</h3>
          <div style="color: #fff">{{__t('Vui lòng nhập tài khoản ad để xác nhận')}}</div>
        </div>
        <div class="form-confirm">
          <div class="form-group has-feedback">
            <input v-model="user.username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input v-model="user.password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-white-btn" @click="$modal.hide('doctorConfirm')">{{__t('Thoát')}}</button>
            </div>
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-yellow-btn" @click="confirm()">{{__t('Xác nhận')}}</button>
            </div>
          </div>
          <p style="margin-top: 10px; text-align:center"> {{__t('Sử dụng tài khoản máy tính')}}</p>
        </div>
      </div>
    </modal>
    <DoctorConfirm v-else :popupTitle="popupTitle" @popupSave="popupSave"/>
    <div v-if="DataSubmit && hasData" hidden id="printArterialBloodGasTest">
      <arterial-blood-gas-test-print :Data="DataSubmit" />
    </div>
    <div class="mt-10">
      <p>{{Version >= 11 ? 'A03_038_061222_V_XNTC' : FormCode}}</p>
    </div>
    <div v-if="DataSubmit">
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="DataSubmit.UpdatedBy" /> {{__t('lúc')}} {{DataSubmit.UpdatedAt | formatDateWithoutSecon}}</p>
    </div>
  </div>
</template>
<script>
/*
 * The home index page.
 */
import MixinForm from '@/mixins/form.js'
import EDPointOfCareTesting from '@/services/ED/EDPointOfCareTesting'
import DropFiles from '@/components/DropFiles.vue'
import ArterialBloodGasTestPrint from '@/components/ED/PointOfCareTesting/ArterialBloodGasTestV2.vue'
import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import moment from 'moment'
import $ from 'jquery'
import UploadFileService from '@/services/IPD/UploadFileService'

export default {
  /**
   * The name of the page.
   */
  name: 'ArterialBloodGasTestV2',
  props: ['formId', 'viewOnly', 'VisitType', 'dataDropfile'],
  mixins: [MixinForm],
  data () {
    return {
      DataSubmit: {
        Datas: [],
        DoctorAccept: null,
        ExecutionUser: null
      },
      now: '',
      user: {},
      hasData: false,
      readonly: true,
      firstData: null,
      Version: null,
      popupTitle: '',
      FormCode: 'A03_038_080322_V'
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    DropFiles,
    ArterialBloodGasTestPrint,
    DoctorConfirm
  },
  mounted () {
    this.getData()
    this.now = moment().format('HH:mm DD/MM/YYYY')
  },
  watch: {
    $route (to, from) {
      this.getData()
    },
    formId () {
      this.getData()
    }
  },
  computed: {
    _ItemId () {
      return this.formId || this.$route.params.Item
    }
  },
  methods: {
    print () {
      if (this.Version >= 11) {
        this.$htmlToPaper('printArterialBloodGasTest', false, 'A03_038_061222_V_XNTC')
      } else {
        this.$htmlToPaper('printArterialBloodGasTest', false, 'A03_038_080322_V')
      }
    },
    wlabel (current, LowerLimit, HigherLimit) {
      if (current && LowerLimit && current <= LowerLimit) {
        return 'label label-warning'
      }
      if (current && HigherLimit && current >= HigherLimit) {
        return 'label label-danger'
      }
      return ''
    },
    async confirm (data) {
      if (this.firstData !== JSON.stringify(this.DataSubmit)) {
        await this.submit()
      }
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('/ArterialBloodGasTest/Accept/' + this._ItemId, data || this.user).then(response => {
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.$modal.hide('doctorConfirm')
        this.reload()
      })
    },
    openFile () {
      $('#dropzone').click()
    },
    create () {
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('ArterialBloodGasTest/create/' + this._ItemId, {}).then(response => {
        this.reload()
      })
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this._ItemId, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    submit () {
      var arr = this.DataSubmit.Upload ? this.DataSubmit.Upload : []
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('/ArterialBloodGasTest/update/' + this._ItemId, this.DataSubmit).then(response => {
        this.toastedSuccess()
        this.removedFile(arr)
        this.getData()
      })
    },
    getData () {
      this.hasData = false
      new EDPointOfCareTesting({VisitType: this._VisitType, hidemsg: true}).find('ArterialBloodGasTest/Detail/' + this._ItemId).then(response => {
        this.DataSubmit = response
        this.Version = parseFloat(response.Version ? response.Version : response.VerSion)
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: response.Id || response.ID
        }
        this.DataSubmit.Upload = this.JSONParse(response.Upload)
        if (this._VisitType === 'IPD') {
          this.IsLocked = response.IsLocked
          if (this.Version === 1) {
            this.readonly = ((this.DataSubmit.DoctorAccept && this.DataSubmit.DoctorAccept.Username) || this.viewOnly || this.IsLocked) || !this.hasRole('SUAXNTC')
            console.log('newEDPointOfCareTesting ~ this.readonly', this.readonly)
          } else {
            this.readonly = ((this.DataSubmit.DoctorAccept && this.DataSubmit.DoctorAccept.Username) || (this.DataSubmit.ExecutionUser && this.DataSubmit.ExecutionUser.Username) || this.viewOnly || this.IsLocked) || !this.hasRole('SUAXNTC')
          }
        }
        if (this._VisitType === 'ED') {
          if (this.Version === 2) {
            this.readonly = (this.DataSubmit.DoctorAccept && this.DataSubmit.DoctorAccept.Username) || this.viewOnly || !this.hasRole('EPOCT4')
          } else {
            this.readonly = (this.DataSubmit.DoctorAccept && this.DataSubmit.DoctorAccept.Username) || (this.DataSubmit.ExecutionUser && this.DataSubmit.ExecutionUser.Username) || this.viewOnly || !this.hasRole('EPOCT4')
          }
        }
        this.hasData = true
        this.firstData = JSON.stringify(this.DataSubmit)
      }).catch(e => {
        if (e.status === 404) {
          this.hasData = false
        }
      })
    },
    // gọi popup confirm
    showDoctorConfirm (title) {
      this.popupTitle = title
      this.$modal.show('doctorConfirm')
    },
    // emit từ popup về confirm
    popupSave (data) {
      if (this.popupTitle === 'Người làm xét nghiệm') {
        data.kind = 'CREATED_CONFIRM'
      }
      this.confirm(data)
    },
    handleBack () {
      if (this.firstData !== JSON.stringify(this.DataSubmit)) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: 'Thông báo',
        text: 'Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Đồng ý',
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: 'Huỷ bỏ',
            class: 'btn',
            handler: () => {
              // this.back()
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
  .element-middle {
    text-align: center;
    vertical-align: middle;
  }
</style>
