<template>
  <div class="tab-form-content">
    <div class="tab-form-content">
      <table class="table table-bordered table-bordered-x no-margin middel-table">
        <tbody v-if="SubmitData.Supplies && SubmitData.Supplies.length">
          <tr :key="index" v-for="(item, index) in SubmitData.Supplies" v-if="!item.IsDeleted">
            <td width="50%" style="position: relative">
              <button v-if="!checkConfirm2(item) && $store.state.account.Username === item.CreatedBy && (SubmitData.Version >= 2)" class="btn-pos-left" @click="item.IsDeleted = true"><i class="fa fa-trash" aria-hidden="true"></i></button>
              <button v-if="!checkConfirm(item) && SubmitData.Version === 1" class="btn-pos-left" @click="item.IsDeleted = true"><i class="fa fa-trash" aria-hidden="true"></i></button>
              <div class="row2">
                <div class="col-md-9 padding-5">
                  <div class="form-group">
                    <label>{{__t('Loại chế phẩm đã cấp')}}</label>
                    <div v-if="isConfirmed(item)">{{item.Name}}</div>
                    <v-select v-else class='select-full-w' @change="handleChange(item)" :search="true" v-model="item.Name" :placeholder="__t('Chọn')" :items="BloodNames"/>
                  </div>
                </div>
                <div class="col-md-3 padding-5">
                  <div class="form-group">
                    <label>{{__t('Số lượng')}}</label>
                    <div v-if="isConfirmed(item)">{{item.Quanlity}}</div>
                    <!-- <v-select v-else :disabeleclear="true" class='select-full-w' v-model="item.Quanlity" :placeholder="__t('Số lượng')" :items="Quanlity"/> -->
                    <template v-else>
                      <VNumberInput v-model="item.Quanlity" :placeholder="__t('Số lượng')"/>
                      <div class="red italic white-space" id="sl-error" v-if="checkSL(item.Name, item.Quanlity)" style="margin-left: -37px;margin-top: 10px;">{{__t('Vượt quá số lượng dự trù')}}</div>
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-md-12 padding-5">
                <table class="table">
                  <thead>
                    <tr>
                      <th class="no-wrap">
                        {{__t('Tên người cho/ Mã hiệu')}}
                      </th>
                      <th class="w150">
                        {{__t('Nhóm máu')}}
                      </th>
                      <th class="w150" v-if="SubmitData.Version === 1">
                        {{__t('Rh')}}
                      </th>
                      <th class="no-wrap w150">
                        {{__t('Thể tích (ml)')}}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="index + '-chil-' + ind" v-for="(ite, ind) in item.Datas" v-if="ind < parseInt(item.Quanlity)">
                      <td class="no-wrap">
                        <p style="margin-bottom: 0px!important;" v-if="isConfirmed(item)">{{ite.Code}}</p>
                        <MDText v-else :placeholder="__t('Nhập')" rows="1" v-model="ite.Code" />
                      </td>
                      <td class="w150">
                        <div v-if="isConfirmed(item)">{{ite.BloodTypeABO}}</div>
                        <v-select v-else class='select-full-w' v-model="ite.BloodTypeABO" :placeholder="__t('Chọn')" :items="BloodFroupABO"/>
                      </td>
                      <td class="w150" v-if="SubmitData.Version === 1">
                        <div v-if="isConfirmed(item)">{{ite.BloodTypeRH}}</div>
                        <v-select v-else class='select-full-w' v-model="ite.BloodTypeRH" :placeholder="__t('Chọn')" :items="BloodFroupRH"/>
                      </td>
                      <td class="w150" width="150px">
                        <div v-if="isConfirmed(item)">{{ite.Capacity}}</div>
                        <VNumberInput v-else :decimal="true" v-model="ite.Capacity" :placeholder="__t('Nhập')"/>
                        <!-- <input v-else :placeholder="__t('Nhập')" class="form-control" v-model="ite.Capacity" /> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="item.CreatedBy" class="italic info-created">{{__t('Thêm bởi')}} <ad-info :ad="item.CreatedBy"/> {{__t('lúc')}} {{item.CreatedAt}}</div>
              </div>
            </td>
            <td>
              <div class="row" v-if="item.Id">
                <div class="col-md-4 col-sm-4 text-center">
                  <div v-if="item.NurseTime">{{item.NurseTime}}</div>
                  <div><b>{{__t('Điều dưỡng')}}</b></div>
                  <div v-if="item.NurseUser"><ad-Info :ad="item.NurseUser" /></div>
                  <div v-else>
                    <i v-if="viewOnly">{{__t('Chưa xác nhận')}}</i>
                    <button v-else @click="showDoctorConfirm('Nurse', 'Điều dưỡng', item.Id)" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
                  </div>
                </div>
                <div class="col-md-4 col-sm-4 text-center">
                  <div v-if="item.CuratorTime">{{item.CuratorTime}}</div>
                  <div><b>{{__t('Người phụ trách')}}</b></div>
                  <div v-if="item.CuratorUser"><ad-Info :ad="item.CuratorUser" /></div>
                  <div v-else>
                    <i v-if="viewOnly">{{__t('Chưa xác nhận')}}</i>
                    <button v-else @click="showDoctorConfirm('Curator', 'Người phụ trách', item.Id)" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
                  </div>
                </div>
                <div class="col-md-4 col-sm-4 text-center" >
                  <div v-if="item.ProviderTime">{{item.ProviderTime}}</div>
                  <div><b>{{__t('Người phát máu')}}</b></div>
                  <div v-if="item.ProviderUser"><ad-Info :ad="item.ProviderUser" /></div>
                  <div v-else>
                    <i v-if="viewOnly">{{__t('Chưa xác nhận')}}</i>
                    <button v-else @click="showDoctorConfirm('Provider', 'Người phát máu', item.Id)" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="text-center">{{__t('Chưa có chế phẩm')}}</td>
          </tr>
        </tbody>
      </table>
      <div class="text-center" v-if="!viewOnly">
        <button class="btn v-green-btn v-bottom-btn" @click="newData()"><i aria-hidden="true" class="fa fa-plus"></i> {{__t('THÊM CHẾ PHẨM')}}</button>
      </div>
      <br/><br/>
      <br/>
      <br/>
      <!-- <div class="padding-form">
        <div class="row">
          <div class="col-md-12">
            <button class="btn v-yellow-btn pull-right btn-block" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
          </div>
        </div>
      </div> -->
    </div>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t(popupTitle)}}.</h3>
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
          <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính')}}</p>
          <p style="margin-top: 10px; text-align:center">{{__t('Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu')}}</p>
        </div>
      </div>
    </modal>
    <div class="status-float-block" v-if="!isConfirm">
      <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
            <div class="row">
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                  <!-- <button  class="btn btn-block v-white-btn" type="button" @click="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button> -->
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
                <div class="form-group1">
                  <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <printer ref="Printer" :Id="$route.params.Id" />
    <div>
      <logs :EdId="this.$route.params.Id" :Type="'BloodRequestSupplyAndConfirmation/Supply'" :noDetail="true" />
      <p v-if="SubmitData.Version >= 2">A03_027_080322_V</p>
      <p v-else>A03_027_050919_V</p>
      <span class="mrr5" v-if="SubmitData.UpdatedBy || SubmitData.CreatedBy">{{__t('Lần chỉnh sửa cuối cùng bởi')}} <ad-Info :ad="SubmitData.UpdatedBy || SubmitData.CreatedBy" /></span><span v-if="SubmitData.UpdatedAt || SubmitData.CreatedAt">{{__t('lúc')}} {{SubmitData.UpdatedAt || SubmitData.CreatedAt}}</span>
    </div>
  </div>
</template>
<script>
import BloodRequestSupplyAndConfirmation from '@/services/ED/BloodRequestSupplyAndConfirmation'
import VSelect from '@/components/VSelect.vue'
import Printer from '@/pages/ED/BloodRequestSupplyAndConfirmation/Print'
import utils from '@/constants'
import Logs from '@/components/Logs.vue'
import $ from 'jquery'
export default {
  name: 'EDBloodRequestSupplyAndConfirmationSupply',
  props: ['formdata', 'viewOnly', 'VisitId', 'VisitType'],
  data () {
    return {
      Id: 'Supply/' + this.$route.params.Id,
      SubmitData: {},
      BloodFroupABO: utils.BLOODFROUABO,
      BloodFroupRH: utils.BLOODFROUPRH,
      BloodNames: [],
      Quanlity: [],
      popupTitle: '',
      user: {},
      confirmId: null,
      edited: false
    }
  },
  components: {
    VSelect, Printer, Logs
  },
  watch: {
    SubmitData: {
      handler (a, b) {
        this.edited = true
      },
      deep: true
    }
  },
  mounted () {
    this.Id = 'Supply/' + this._VisitId
    for (let index = 0; index < 20; index++) {
      this.Quanlity.push({
        value: String(index + 1),
        label: String(index + 1)
      })
    }
    this.getData()
  },
  computed: {
    isConfirm () {
      return this.viewOnly || this.SubmitData.IsLocked
    }
  },
  methods: {
    isConfirmed (item) {
      return this.viewOnly || ((item.NurseUser || item.CuratorUser || item.ProviderUser) || item.CreatedBy !== this.$store.state.account.Username)
    },
    async confirm () {
      if (this.edited) {
        await this.save()
      }
      new BloodRequestSupplyAndConfirmation({}, this._VisitType).update('Supply/Confirm/' + this.confirmId, this.user).then(response => {
        this.$modal.hide('doctorConfirm')
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.getData()
      }).catch(e => {
        this.$modal.hide('doctorConfirm')
      })
    },
    showDoctorConfirm (kind, title, id) {
      this.confirmId = id
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    print () {
      this.$refs.Printer.print()
    },
    save () {
      this.SubmitData.IsFrequently = this.formdata.IsFrequently === true || this.formdata.IsFrequently === 'true'
      this.SubmitData.Number = this.formdata.Number
      this.SubmitData.Supplies = this.SubmitData.Supplies.filter(e => !e.IsDeleted || e.Id)
      this.SubmitData.Supplies.forEach(supplie => {
        var quanlity = parseInt(supplie.Quanlity)
        supplie.Quanlity = quanlity
        supplie.Datas.forEach((data, index) => {
          data.IsDeleted = index >= quanlity
        })
      })
      if ($('#sl-error').length) {
        let errors = []
        let error = {
          ViName: 'Vượt quá số lượng dự trù',
          EnName: 'Over the requested quantity'
        }
        errors.push(error)
        if (errors.length) {
          this.handlerResponse({Error: errors})
        }
      }
      return new BloodRequestSupplyAndConfirmation({}, this._VisitType).update(this.Id, this.SubmitData).then(response => {
        this.toastedSuccess().getData()
        this.reload()
      })
    },
    // parseInt (i) {
    //   return parseInt(i)
    // },
    newData () {
      var obj = {
        IsDeleted: false,
        Name: '',
        Quanlity: '1',
        CreatedBy: this.$store.state.account.Username,
        CreatedAt: this.$options.filters.formatDateWithoutSecon(new Date()),
        Datas: [
        ]
      }
      for (let index = 0; index < 20; index++) {
        obj.Datas.push({
          Code: '',
          BloodTypeABO: '',
          BloodTypeRH: '',
          Capacity: ''
        })
      }
      this.SubmitData.Supplies.push(obj)
    },
    getData () {
      new BloodRequestSupplyAndConfirmation({}, this._VisitType).find(this.Id + '?hidemsg=' + true).then(response => {
        this.BloodNames = response.ListName.map(e => {
          if (e) {
            return {
              value: e.name,
              label: e.name,
              sl: e.value
            }
          }
        })
        let obj = response
        obj.Supplies.map(e => {
          if (!e.CreatedBy) {
            e.CreatedBy = 'hunglq25'
          }
          e.IsDeleted = false
          e.Quanlity = String(e.Quanlity)
          var len = e.Datas.length
          for (let index = len; index < 20; index++) {
            e.Datas.push({
              Code: '',
              BloodTypeABO: '',
              BloodTypeRH: '',
              Capacity: '',
              IsDeleted: false
            })
          }
        })
        this.SubmitData = obj
        // this.SubmitData.Supplies.forEach(supplie => {
        //   supplie.CreatedBy = 'hunglq25'
        //   supplie.IsDeleted = false
        //   supplie.Quanlity = String(supplie.Quanlity)
        //   var len = supplie.Datas.length
        //   for (let index = len; index < 10; index++) {
        //     supplie.Datas.push({
        //       Code: '',
        //       BloodTypeABO: '',
        //       BloodTypeRH: '',
        //       Capacity: '',
        //       IsDeleted: false
        //     })
        //   }
        // })
        setTimeout(() => {
          this.edited = false
        }, 300)
      })
    },
    checkConfirm (data) {
      return data.Id || data.CuratorTime || data.NurseTime || data.ProviderTime || (data.CreatedBy !== this.$store.state.account.Username)
    },
    checkConfirm2 (data) {
      return data.CuratorTime || data.NurseTime || data.ProviderTime || (data.CreatedBy !== this.$store.state.account.Username)
    },
    checkSL (name, quanlity) {
      let check = false
      this.BloodNames.find(e => {
        if (e.label === name) {
          if (quanlity > e.sl) {
            check = true
          }
        }
      })
      return check
    },
    handleChange (item) {
      setTimeout(() => {
        if (item && item.Name) {
          this.BloodNames.find(e => {
            if (e.label === item.Name) {
              item.Quanlity = e.sl
            }
          })
        }
      }, 200)
    }
  }
}
</script>
<style scoped>
  .info-created {
    float: right;
  }
</style>
