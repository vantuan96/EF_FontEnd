<template>
  <div class="main-content disable_ccp" id="di0-page" :class="{'readonly-form': readonly}" v-if="hasData">
    <h2 class="text-center">{{__t('Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+')}}</h2>
    <h4 class="text-center" v-if="DataSubmit.Specialty">{{__t('Khoa')}}: <b>{{__label(DataSubmit.Specialty)}}</b></h4>
    <br/>
    <template v-if="hasData">
      <table class="table header-table">
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
        <tbody v-if="Version >= 13">
          <tr :data="item" :key="index" v-for="(item, index) in DataSubmit.Datas">
            <!-- Col-1,2 -->
            <template v-if="[2, 3, 4, 9, 10, 11, 16, 17, 18].includes(index)">
              <td class="align-middle" rowspan="3" v-if="[2, 9, 16].includes(index)">{{item.Order}}</td>
              <td class="align-middle" rowspan="3" v-if="[2, 9, 16].includes(index)">{{item.Name}}</td>
            </template>
            <template v-else-if="[0, 1, 5, 6, 7, 8, 12, 13, 14, 15].includes(index)">
              <td class="align-middle" rowspan="2" v-if="[0, 5, 7, 12, 14].includes(index)">{{item.Order}}</td>
              <td class="align-middle" rowspan="2" v-if="[0, 5, 7, 12, 14].includes(index)"><Unit :unit="item.Name"/></td>
            </template>
            <template v-else>
              <td class="align-middle">{{item.Order}}</td>
              <td class="align-middle"><Unit :unit="item.Name"/></td>
            </template>
            <!-- Col-3 -->
            <td>{{item.ViAge}}</td>
            <!-- Col-4,5,6 -->
            <template v-if="[1, 3, 4, 6, 8, 10, 11, 13, 15, 17, 18].includes(index)">
              <td></td>
              <td class="align-middle text-center">{{item.LowerAlert ? '≤ ' + item.LowerAlert : 'Không áp dụng'}}</td>
              <td class="align-middle text-center">{{item.HigherAlert ? '≥ ' + item.HigherAlert : 'Không áp dụng'}}</td>
            </template>
            <template v-else-if="index === 19">
              <td class="align-middle text-center">
                {{item.LowerLimit || 'Không áp dụng'}} - {{item.HigherLimit || 'Không áp dụng'}}
              </td>
              <td colspan="2" class="align-middle text-center">Không áp dụng</td>
            </template>
            <template v-else>
              <template>
                <td class="align-middle text-center">
                  {{item.LowerLimit || 'Không áp dụng'}} - {{item.HigherLimit || 'Không áp dụng'}}
                </td>
              </template>
              <td class="align-middle text-center">{{item.LowerAlert ? '≤ ' + item.LowerAlert : 'Không áp dụng'}}</td>
            </template>
            <!-- Gia tri cao -->
            <td :class="{'d-none': [1, 3, 4, 6, 8, 10, 11, 13, 15, 17, 18, 19].includes(index), 'align-middle text-center': true}">{{item.HigherAlert ? '≥ ' + item.HigherAlert : 'Không áp dụng'}}</td>
            <!-- Col-7 -->
            <td>
              <MDNumberInput
                v-model="item.Result"
                :placeholder="__t('Nhập')"
                :readonly="readonly"
                :decimal="true"
                :maxlength='10'
                :limitDecimal="true"
                :limitDecimalNumber='2'
                :class="checkRangeLimit(item.Result, item.LowerAlert, item.HigherAlert)"
              />
            </td>
            <!-- Don vi -->
            <template v-if="[0, 1, 5, 6, 7, 8, 12, 13, 14, 15].includes(index)">
              <td v-if="[0, 5, 7, 12, 14].includes(index)" rowspan="2" class="align-middle text-center">{{item.Unit}}</td>
            </template>
            <template v-else-if="[2, 3, 4, 9, 10, 11, 16, 17, 18].includes(index)">
              <td v-if="[2, 9, 16].includes(index)" rowspan="3" class="align-middle text-center">{{item.Unit}}</td>
            </template>
            <template v-else>
              <td class="align-middle text-center">{{item.Unit}}</td>
            </template>
            <td width="220px" v-if="index === 0" :rowspan="DataSubmit.Datas.length">
              <drop-files :readonly="readonly" id="mini-upload" v-if="DataSubmit.Datas" v-model="DataSubmit.Upload" :dataDropfile="dataDropfile"/>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr :data="item" :key="index" v-for="(item, index) in DataSubmit.Datas">
            <!-- Col-1,2 -->
            <template v-if="index === 8 || index === 9 || index === 7">
              <td class="align-middle" rowspan="3" v-if="index === 7">{{item.Order}}</td>
              <td class="align-middle" rowspan="3" v-if="index === 7">{{item.Name}}</td>
            </template>
            <template v-else-if="index === 3 || index === 4">
              <td class="align-middle" rowspan="2" v-if="index === 3">{{item.Order}}</td>
              <td class="align-middle" rowspan="2" v-if="index === 3">Ion Calcium (iCa<sup>2+</sup>)</td>
            </template>
            <template v-else-if="index === 2">
              <td class="align-middle" v-if="index === 2">{{item.Order}}</td>
              <td class="align-middle" v-if="index === 2">Cl<sup>-</sup></td>
            </template>
            <template v-else>
              <td>{{item.Order}}</td>
              <td>{{item.Name}}</td>
            </template>
            <!-- Col-3 -->
            <td>{{item.ViAge}}</td>
            <!-- Col-4,5,6 -->
            <template v-if="index === 8 || index === 9 || index === 7">
              <td class="align-middle" rowspan="3" v-if="index === 7">
                {{item.LowerLimit || 'Không áp dụng'}} - {{item.HigherLimit || 'Không áp dụng'}}
              </td>
              <td class="align-middle" rowspan="3" v-if="index === 7">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
            </template>
            <template v-else-if="index === 1">
              <td class="align-middle" v-if="index === 1">
                {{item.LowerLimit || 'Không áp dụng'}} - {{item.HigherLimit || 'Không áp dụng'}}
              </td>
              <td>{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
              <td>{{item.HigherAlert ? '≥' + item.HigherAlert + '.0' : 'Không áp dụng'}}</td>
            </template>
            <template v-else-if="index === 2">
              <td class="align-middle" v-if="index === 2">
                {{item.LowerLimit || 'Không áp dụng'}} - {{item.HigherLimit || 'Không áp dụng'}}
              </td>
              <td class="align-middle text-center" colspan="2" v-if="index === 2">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
            </template>
            <template v-else-if="index === 6">
              <td class="align-middle" v-if="index === 6">
                {{item.LowerLimit || 'Không áp dụng'}} - {{item.HigherLimit || 'Không áp dụng'}}
              </td>
              <td class="align-middle text-center" colspan="2" v-if="index === 6">{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
            </template>
            <template v-else>
              <template v-if="index === 3 || index === 4">
                <td class="align-middle" rowspan="2" v-if="index === 3">{{item.LowerLimit || 'Không áp dụng'}} - {{item.HigherLimit || 'Không áp dụng'}}</td>
              </template>
              <template v-else>
                <td>
                  {{item.LowerLimit || 'Không áp dụng'}} - {{item.HigherLimit || 'Không áp dụng'}}
                </td>
              </template>
              <td>{{item.LowerAlert ? '≤' + item.LowerAlert : 'Không áp dụng'}}</td>
            </template>
            <td :class="{'d-none': index === 6 || index === 2 || index === 1}">{{item.HigherAlert ? '≥' + item.HigherAlert : 'Không áp dụng'}}</td>
            <!-- Col-7 -->
            <td>
              <input placeholder="Nhập" type="text" v-if="!readonly" class="form-control" v-model="item.Result" />
              <span v-else :class="wlabel(item.Result, item.LowerAlert, item.HigherAlert)">
                {{item.Result}}
              </span>
            </td>
            <template v-if="index === 8 || index === 9 || index === 7">
              <td class="align-middle" rowspan="3" v-if="index === 7">{{item.Unit}}</td>
            </template>
            <template v-else>
              <td>{{item.Unit}}</td>
            </template>
            <td width="220px" v-if="index === 0" :rowspan="DataSubmit.Datas.length">
              <drop-files :readonly="readonly" id="mini-upload" v-if="DataSubmit.Datas" v-model="DataSubmit.Upload" :dataDropfile="dataDropfile"/>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="Version >= 13"><i>Chú ý: Khoảng tham chiếu trên dành cho Xét nghiệm khí máu động mạch cho người trưởng thành. Xét nghiệm khí máu tĩnh mạch và xét nghiệm cho đối tượng khác tham khảo thêm trong <b>Sổ tay khoảng tham chiếu</b>.</i></p>
      <!-- Confirm -->
      <div v-if="Version <= 2" class="row">
        <div class="col-md-6 col-sm-6">
          <p class="text-center">{{DataSubmit.UpdateAt | formatDateWithoutSecon}}</p>
          <eform-signature v-if="DataSubmit.ExecutionUser" :ad="DataSubmit.ExecutionUser.Username" :title="'PointOfCareTesting.nguoi_lam_xet_nghiem'" />
        </div>
        <div class="col-md-6 col-sm-6 text-center">
          <template v-if="(DataSubmit.DoctorAccept && DataSubmit.DoctorAccept.Username)">
            <p class="text-center">{{DataSubmit.AcceptTime}}</p>
            <eform-signature :ad="DataSubmit.DoctorAccept.Username" :title="'Bác sĩ chỉ định'" />
          </template>
          <template v-else>
            <p>{{DataSubmit.AcceptTime}}</p>
            <p><b>{{__t('Bác sĩ chỉ định')}}:</b></p>
            <p v-if="viewOnly && IsLocked">Chưa xác nhận</p>
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
          <p class="text-center">{{ getFTime(DataSubmit.AcceptTime) }}</p>
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
      <br/>
      <br/>
      <FloatBlock v-if="!viewOnly" :openBack="true" @handleBack="handleBack">
        <template slot='buttons'>
          <div class="col-md-3 col-sm-3">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-3 col-sm-3">
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
    <modal v-if="Version <= 2" name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
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
    <div v-if="DataSubmit && hasData" hidden id="printChemicalBiologyTest">
      <ChemicalBiologyTestPrint :Data="DataSubmit" :Version="Version"/>
    </div>
    <div class="mt-10">
      <p v-if="Version >= 13">A03_039_110123_V_XNTC</p>
      <p v-else>{{FormCode}}</p>
    </div>
    <div v-if="DataSubmit">
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="DataSubmit.UpdateBy" /> {{__t('lúc')}} {{DataSubmit.UpdateAt | formatDateWithoutSecon}}</p>
    </div>
  </div>
</template>
<script>
/**
 * The home index page.
 */
import MixinForm from '@/mixins/form.js'
import EDPointOfCareTesting from '@/services/ED/EDPointOfCareTesting'
import ChemicalBiologyTestPrint from '@/components/ED/PointOfCareTesting/ChemicalBiologyTestV2.vue'
import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import DropFiles from '@/components/DropFiles.vue'
import $ from 'jquery'
import UploadFileService from '@/services/IPD/UploadFileService'
import Unit from '@/components/global/Unit'
export default {
  /**
   * The name of the page.
   */
  name: 'ChemicalBiologyTestV2',
  props: ['formId', 'viewOnly', 'VisitId', 'VisitType', 'IsLocked', 'Version'],
  mixins: [MixinForm],
  data () {
    return {
      dataDropfile: {
        contentImg: '',
        titleImg: '',
        visittypeImg: '',
        visitidImg: '',
        formidImg: ''
      },
      DataSubmit: {
        Datas: [],
        DoctorAccept: null,
        ExecutionUser: null
      },
      user: {},
      hasData: false,
      readonly: true,
      firstData: null,
      popupTitle: '',
      FormCode: 'A03_039_080322_V'
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    DropFiles, ChemicalBiologyTestPrint, DoctorConfirm, Unit
  },
  watch: {
    $route (to, from) {
      this.getData()
    },
    formId () {
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    _ItemId () {
      return this.formId || this.$route.params.Item
    }
  },
  methods: {
    checkRangeLimit (val, min, max) {
      val = val && parseFloat(val)
      max = max && parseFloat(max)
      min = min && parseFloat(min)
      const checkExistVal = (val || val === 0)
      if (!min && !max) {
        return ''
      }
      // Check condition only max
      if (!min && max && checkExistVal) {
        if (val >= max) {
          return 'input-red'
        }
        return ''
      }

      if (val >= max && checkExistVal) {
        return 'input-red'
      }
      if (val <= min && checkExistVal) {
        return 'input-yellow'
      }
      return ''
    },
    print () {
      const getFormCode = this.Version >= 13 ? 'A03_039_110123_V_XNTC' : 'A03_039_080322_V'
      this.$PointOfCareTestingPrinter('printChemicalBiologyTest', false, getFormCode)
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
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('/ChemicalBiologyTest/Accept/' + `${this.FormCode}/` + this._VisitId + '/' + this._ItemId, data || this.user).then(response => {
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.reload()
        this.$modal.hide('doctorConfirm')
      })
    },
    openFile () {
      $('#dropzone').click()
    },
    create () {
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('ChemicalBiologyTest/Create/' + `${this.FormCode}/` + this._VisitId + '/' + this._ItemId, {}).then(response => {
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
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('/ChemicalBiologyTest/Update/' + `${this.FormCode}/` + this._VisitId + '/' + this._ItemId, this.DataSubmit).then(response => {
        this.removedFile(arr)
        this.toastedSuccess()
        this.getData()
      })
    },
    getData () {
      this.hasData = false
      new EDPointOfCareTesting({VisitType: this._VisitType, hidemsg: true}).find('ChemicalBiologyTest/' + `${this.FormCode}/` + this._VisitId + '/' + (this.formId || this.$route.params.Item)).then(response => {
        if (this._VisitType === 'IPD') {
          this.IsLocked = response.IsLocked
          this.DataSubmit = response.response
          this.DataSubmit.Upload = this.JSONParse(response.response.Upload)
          this.Version >= 2
            ? this.readonly = ((this.DataSubmit.DoctorAccept && this.DataSubmit.DoctorAccept.Username) || this.viewOnly || this.IsLocked) || !this.hasRole('IPOCT9')
            : this.readonly = ((this.DataSubmit.DoctorAccept && this.DataSubmit.DoctorAccept.Username) || (this.DataSubmit.ExecutionUser && this.DataSubmit.ExecutionUser.Username) || this.viewOnly || this.IsLocked) || !this.hasRole('IPOCT9')
        } else {
          this.DataSubmit = response
          this.DataSubmit.Upload = this.JSONParse(response.Upload)
          this.Version >= 2
            ? this.readonly = (this.DataSubmit.DoctorAccept && this.DataSubmit.DoctorAccept.Username) || this.viewOnly || !this.hasRole('EPOCT9')
            : this.readonly = (this.DataSubmit.DoctorAccept && this.DataSubmit.DoctorAccept.Username) || (this.DataSubmit.ExecutionUser && this.DataSubmit.ExecutionUser.Username) || this.viewOnly || !this.hasRole('EPOCT9')
        }
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: this.DataSubmit.Id || this.DataSubmit.ID
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
    }
  }
}
</script>
<style scoped lang="stylus">
.input-red {
  background-color: #dd4b39 !important;
  color: #fff;
  &::placeholder {
    color: #fff;
  }
};
.input-yellow {
  background-color: #FFD966 !important;
  color: #000;
  &::placeholder {
    color: #000;
  }
}
</style>
