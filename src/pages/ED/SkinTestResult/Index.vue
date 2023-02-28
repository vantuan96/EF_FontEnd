<template>
  <div class="main-content" id="StandingOrderForRetailService-page">
    <h2 class="text-center" v-if="!viewOnly"><b>{{__t('Kết quả test da')}}</b></h2>
    <p class="text-center m-b-20" v-if="!viewOnly"><b>{{__t('Kết quả test da theo nồng độ khuyến cáo')}}</b></p>
    <br/>
    <div v-if="loaded">
      <div v-if="DataSubmit" :class="{'r2eadonly': DataSubmit.Username}">
        <table class="table header-table v-header-table waptbl">
          <tr>
            <th width="1" rowspan="2" class="text-center">Stt</th>
            <th rowspan="2" class="text-center" width="350px">{{__t('Tên thuốc thử')}}</th>
            <th class="text-center" colspan="2">{{__t('Test lấy da')}}</th>
            <th class="text-center" colspan="2">{{__t('Test nội bì')}}</th>
            <th rowspan="2" class="text-center">{{__t('Người tạo')}}</th>
          </tr>
          <tr>
            <th class="text-center">{{__t('Nồng độ pha loãng')}}</th>
            <th class="text-center">{{__t('Kết quả')}}</th>
            <th class="text-center">{{__t('Nồng độ pha loãng')}}</th>
            <th class="text-center">{{__t('Kết quả')}}</th>
          </tr>
          <tbody :data="item" :key="index" v-for="(item, index) in DataSubmit.Datas" v-if="!item.removed">
            <tr>
              <td class="text-center border-bottom-2" rowspan="3" style="position: relative">
                <button v-if="!item.Id && !viewOnly" class="btn-pos-left" @click="remove(index)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <!-- <b>{{indexing(item)}}</b> -->
                <b>{{index + 1}}</b>
              </td>
              <td>
                <Medication v-model="item.Drug" :readonly="!allowEdit(item)" />
              </td>
              <td>
                <template v-if="!allowEdit(item)"><span class="max-200">{{item.SkinDilutionConcentration || 'N/A'}}</span></template>
                <input v-else class="form-control" v-model="item.SkinDilutionConcentration" :placeholder="__t('Nhập nồng độ')"/>
              </td>
              <td>
                <template v-if="!allowEdit(item)"><span class="max-200">{{item.SkinResult || 'N/A'}}</span></template>
                <input v-else class="form-control" v-model="item.SkinResult" :placeholder="__t('Nhập kết quả')"/>
              </td>
              <td>
                <template v-if="!allowEdit(item)"><span class="max-200">{{item.EndodermDilutionConcentration || 'N/A'}}</span></template>
                <input v-else class="form-control" v-model="item.EndodermDilutionConcentration" :placeholder="__t('Nhập nồng độ')"/>
              </td>
              <td>
                <template v-if="!allowEdit(item)"><span class="max-200">{{item.EndodermResult || 'N/A'}}</span></template>
                <input v-else class="form-control" v-model="item.EndodermResult" :placeholder="__t('Nhập kết quả')"/>
              </td>
              <td rowspan="3">
                <ad-Info :ad="item.CreatedBy" />
              </td>
            </tr>
            <tr class="tr-bg">
              <td>
                <b>{{__t('Chứng âm')}}</b>
              </td>
              <td colspan="2">
                <template v-if="!allowEdit(item)">{{__t('Âm tính')}}: {{item.SkinNegative || 'N/A'}}</template>
                <div class="form-inline max-w" v-else>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-addon">{{__t('Âm tính')}}:</div>
                      <input type="text" class="form-control" :placeholder="__t('Nhập')" v-model="item.SkinNegative">
                    </div>
                  </div>
                </div>
              </td>
              <td colspan="2">
                <template v-if="!allowEdit(item)">{{__t('Âm tính')}}: {{item.EndodermNegative || 'N/A'}}</template>
                <div class="form-inline max-w" v-else>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-addon">{{__t('Âm tính')}}:</div>
                      <input type="text" class="form-control" :placeholder="__t('Nhập')" v-model="item.EndodermNegative">
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="tr-bg border-bottom-2">
              <td class="border-bottom-2">
                <b>{{__t('Chứng dương')}} </b><i>(Histamin)</i>
              </td>
              <td colspan="2" class="border-bottom-2">
                <template v-if="!allowEdit(item)">{{__t('Dương tính')}}: {{item.SkinPositive || 'N/A'}}</template>
                <div class="form-inline max-w" v-else>
                  <div class="form-group">
                    <div class="input-group">
                      <div class="input-group-addon">{{__t('Dương tính')}}:</div>
                      <input type="text" class="form-control" :placeholder="__t('Nhập')" v-model="item.SkinPositive">
                    </div>
                  </div>
                </div>
              </td>
              <td colspan="2" class="border-bottom-2"></td>
            </tr>
          </tbody>
        </table>
        <div class="text-center" v-if="!DataSubmit.Username && !viewOnly && !IsLocked"><button class="btn v-green-btn v-bottom-btn" @click="addNew"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('THÊM THUỐC THỬ')}}</button></div>
        <br/><br/>
        <div>
          <p><b>{{__t('Kết luận')}}: </b><template v-if="DataSubmit.Username || viewOnly">{{DataSubmit.Conclusion}}</template></p>
          <textarea-autosize v-if="!DataSubmit.Username && !viewOnly && !IsLocked" rows="3" :placeholder="__t('Kết luận')" class="form-control" v-model="DataSubmit.Conclusion"/>
          <br/>
          <p><b>{{__t('Lưu ý')}}:</b> {{__t('Test da đọc nhanh không có giá trị loại trừ hoàn toàn nguy cơ các phản ứng dị ứng. Không có giá trị loại trừ các phản ứng quá mẫn không qua trung gian IgE và các phản ứng dị ứng chậm.')}}</p>
        </div>
        <br/><br/>
        <div class="row">
          <div class="col-md-6 col-sm-6"></div>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.Username">
              <p class="text-center">{{DataSubmit.ConfirmDate}}</p>
              <eform-signature :ad="DataSubmit.Username" :title="__t('Bác sĩ thực hiện')" />
            </template>
            <template v-else>
              <p><b>{{__t('Bác sĩ thực hiện')}}:</b></p>
              <p v-if="!viewOnly"><button @click="$modal.show('doctorConfirm')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
          </div>
        </div>
        <logs v-if="!viewOnly" :EdId="this.$route.params.Id" :Type="_VisitType + '/SkinTestResult'" />
        <div class="status-float-block" v-if="!DataSubmit.Username && !viewOnly">
          <div class="action-btn-block">
            <div class="container">
              <div class="content-container">
                <div class="row">
                  <div class="col-md-2">
                    <div class="form-group1">
                     <button class="btn v-red-btn btn-block" type="button" @click="removeConfirm()">{{__t('btn.xoa')}}</button>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group1">
                      <button class="btn btn-block v-white-btn" type="button" @click="handleBack"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group1">
                      <!-- <button class="btn btn-block v-white-btn" type="button" @click="$router.push({name: 'OPDMedicalReport', params: {Id: $route.params.Id}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Báo cáo y tế')}}</button> -->
                    </div>
                  </div>
                  <div class="col-md-4" v-if="!IsLocked">
                    <div class="form-group1">
                      <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="submit()" type="button" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center">
          <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
          <!-- <button v-if="!IsLocked" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button> -->
        </div>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
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
  </div>
</template>
<script>
import SkinTestResult from '@/services/ED/SkinTestResult'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'SkinTestResult',
  props: ['viewOnly', 'VisitType', 'VisitId'],
  components: {Logs},
  data () {
    return {
      DataSubmit: null,
      user: {},
      index: 0,
      loaded: false,
      lastData: {},
      dataMaster: null,
      IsLocked: false
    }
  },
  mixins: [MixinForm],
  mounted () {
    this.getData()
  },
  computed: {
  },
  methods: {
    removeConfirm () {
      this.$modal.show('dialog', {
        title: 'Bạn muốn xóa phiếu kết quả test da này không?',
        text: '<p>Hành động xóa hồ sơ bệnh án của bạn sẽ được lưu lại, dữ liệu đã nhập tại hồ sơ này sẽ bị mất.</p> <b>Chú ý</b>: Chỉ người tạo hồ sơ mới có quyền xóa, bạn cũng sẽ không thể xóa hồ sơ khi bác sĩ đã nhập thông tin.',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Đồng ý',
            class: 'btn',
            handler: () => {
              this.removeConfirmed()
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Hủy bỏ',
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    removeConfirmed () {
      new SkinTestResult({}, this._VisitType).update('Delete/' + this.$route.params.Id, {}).then(response => {
        this.go2Home()
      })
    },
    allowEdit (item) {
      return (!this.DataSubmit.Username && (!item.Id || item.CreatedBy === this.$store.state.account.Username)) && !this.viewOnly && !this.IsLocked
      // (!this.DataSubmit.Username && (!item.Id || item.CreatedBy === this.$store.state.account.Username)) && !this.viewOnly
    },
    indexing (item) {
      // console.log(item)
      return this.DataSubmit.Datas.filter(e => !e.removed).findIndex(e => e._id === item._id) + 1
    },
    remove (index) {
      this.DataSubmit.Datas.splice(index, 1)
    },
    async submit () {
      this.DataSubmit._Exception = []
      if (this.DataSubmit.Conclusion !== this.lastData.Conclusion) {
        this.DataSubmit._Exception.push({
          key: 'Kết luận',
          value: this.DataSubmit.Conclusion
        })
      }
      var data = this.cloneObj(this.DataSubmit)
      data.Datas = data.Datas.filter(e => !e.removed)
      await new SkinTestResult({}, this._VisitType).update(this.$route.params.Id, data).then(response => {
        this.getData()
        this.toastedSuccess().scroll2Bottom()
      }).catch(e => {
        // this.back()
      })
    },
    async confirm () {
      await this.submit()
      new SkinTestResult({}, this._VisitType).update(this.$route.params.Id, this.user, '/Accept/').then(response => {
        this.getData()
        this.toastedSuccess().scroll2Bottom()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
    },
    creat () {
      new SkinTestResult({}, this._VisitType).update(this.$route.params.Id, {}, '/Create/').then(response => {
        this.reload()
      }).catch(e => {
        this.back()
      })
    },
    addNew () {
      this.DataSubmit.Datas.push({
        Drug: '',
        SkinDilutionConcentration: '',
        SkinResult: '',
        SkinPositive: '',
        SkinNegative: '',
        EndodermDilutionConcentration: '',
        EndodermResult: '',
        EndodermNegative: '',
        removed: false,
        CreatedBy: this.$store.state.account.Username,
        _id: this.makeid(20)
      })
    },
    getData () {
      this.loaded = false
      new SkinTestResult({}, this._VisitType).find(this._VisitId + '?hidemsg=' + true).then(response => {
        if (response.Datas) {
          response.Datas.map(e => {
            e.removed = false
            e._id = this.makeid(20)
            // e.Drug = this.isJson(e.Drug) ? this.JSONParse(e.Drug) : [e.Drug]
            return e
          })
        }
        this._VisitType === 'OPD' ? this.DataSubmit = response.result : this.DataSubmit = response
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.loaded = true
        if (this.DataSubmit.Datas.length === 0 && !this.DataSubmit.Username) this.addNew()
        this.lastData = this.cloneObj(this.DataSubmit)
        this.dataMaster = JSON.stringify(this.DataSubmit)
        this.IsLocked = response.IsLocked
      }).catch(e => {
        this.IsLocked = e.data.IsLocked
        this.loaded = true
        if (e.status === 404) {}
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo phiếu kết quả test da?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.creat()
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.DataSubmit)) {
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
    }
  }
}
</script>
