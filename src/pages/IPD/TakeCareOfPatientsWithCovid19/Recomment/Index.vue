<template>
  <div>
    <template v-if="loaded">
      <template v-if="Datas.length">
        <table class="standing-order-tbl">
          <tr>
            <th width="1" class="no-wrap">{{__t('STT')}}</th>
            <th width="100" class="no-wrap">{{__t('Ngày, giờ')}}</th>
            <th>{{__t('Lưu ý khi bàn giao')}}</th>
            <th width="1" class="no-wrap">{{__t('Người bàn giao')}}</th>
            <th width="1" class="no-wrap">{{__t('Người nhận bàn giao')}}</th>
          </tr>
          <tr :data="item" :key="index" v-for="(item, index) in Datas">
            <td>{{index + 1}}</td>
            <td class="no-wrap">{{item.HandOverAt}}</td>
            <td>
              <Details :key="index" :Datas="item.Datas" :MASTERDATA="cloneObj(MASTERDATA)"/>
            </td>
            <td class="text-center">
              <ad-Info v-if="item.HandOverBy" :ad="item.HandOverBy" />
              <div><router-link v-if="(item.HandOverBy === getCurrentUsername() && !item.ReceivingBy && !readonly && !IsLocked)" :to="{name: 'TakeCareOfPatientsWithCovid19RecommentForm', params: { Id: $route.params.Id, ItemId: item.Id }}" class="btn btn-sync-data">{{__t('Sửa')}}</router-link></div>
            </td>
            <td class="text-center">
              <ad-Info v-if="item.ReceivingBy" :ad="item.ReceivingBy" />
              <div>
                <button type="button" @click="showDoctorConfirm(item.Id)" v-if="!item.ReceivingBy && !readonly && !IsLocked" class="btn btn-sync-data">{{__t('Xác nhận')}}</button>
                <p>{{item.ReceivingAt}}</p>
              </div>
            </td>
          </tr>
        </table>
      </template>
      <div v-else class="text-center no-data-msg">
        {{__t('Chưa có dữ liệu')}}
      </div>
      <div class="text-center" v-if="!readonly && !IsLocked"><router-link class="btn v-green-btn v-bottom-btn" :to="{name: 'TakeCareOfPatientsWithCovid19RecommentForm', params: { Id: $route.params.Id, ItemId: 'new' }}"><i aria-hidden="true" class="fa fa-plus"></i> {{__t('Thêm lưu ý')}}</router-link></div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">Xác nhận</h3>
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
import TakeCareOfPatientsWithCovid19 from '@/services/IPD/TakeCareOfPatientsWithCovid19'
import Details from './View.vue'
import MixinMasterData from '@/mixins/masterdata.js'
export default {
  name: 'TakeCareOfPatientsWithCovid19Recomment',
  props: ['VisitId', 'VisitType', 'readonly'],
  mixins: [MixinMasterData],
  data () {
    return {
      loaded: false,
      IsLocked: false,
      Datas: [],
      user: {}
    }
  },
  components: {
    Details
  },
  mounted () {
    this.getMasterDatas({Form: 'IPDTCOPRC19'}, () => {
      this.getData()
    })
  },
  methods: {
    showDoctorConfirm (ItemId) {
      this.user.ItemId = ItemId
      this.$modal.show('doctorConfirm')
    },
    confirm () {
      new TakeCareOfPatientsWithCovid19().update('/Recomment/Confirm/' + this.$route.params.Id + '/' + this.user.ItemId, this.user).then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    getData () {
      if (this._VisitType === 'IPD') {
        new TakeCareOfPatientsWithCovid19().find('Recomment/CheckFormLocked/' + this._VisitId).then(response => {
          this.IsLocked = response.IsLocked
        })
      }
      new TakeCareOfPatientsWithCovid19().find('Recomment/' + this._VisitId).then(response => {
        this.Datas = response
        setTimeout(() => {
          this.loaded = true
        }, 500)
      })
    },
    newItem () {}
  }
}
</script>
