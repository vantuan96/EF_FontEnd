<template>
  <div>
    <v-loading v-if="loading"/>
    <div class="v-tab" v-else>
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass(1)">
          <a @click="getData(1, true)">
            {{__t('Danh sách gói cá nhân của bạn')}}
          </a>
        </li>
        <li role="presentation" :class="activeClass(2)">
          <a @click="getData(2, true)">
            {{__t('Danh sách gói được chia sẻ cho bạn')}}
          </a>
        </li>
        <li role="presentation" :class="activeClass(3)" v-if="hasRole('ORDERSETSUPERADMIN')">
          <a @click="getData(3, true)">
            {{__t('Tất cả gói cá nhân (admin)')}}
          </a>
        </li>
      </ul>
      <div class="tab-content">
        <table class="table table-striped table-bordered v-table" id="customer-tbl">
          <tbody>
            <template v-if="datas.length">
              <tr>
                <th></th>
                <th class="no-wrap">{{__t('Mã gói')}}</th>
                <th class="no-wrap">{{__t('Tên gói')}}</th>
                <th class="no-wrap" v-if="type === 1">{{__t('Chia sẻ cho')}}</th>
                <th class="no-wrap" v-else>{{__t('Người chia sẻ')}}</th>
                <th class="no-wrap" v-if="type === 1">{{__t('Ngày tạo')}}</th>
                <th class="no-wrap" v-else>{{__t('Ngày chia sẻ')}}</th>
                <th width="1px"></th>
              </tr>
              <tr :data="item" :key="index" v-for="(item ,index) in datas">
                <td width="1px" align="center" class="boder-left">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
                <td>{{item.Code}}</td>
                <td>{{item.Name}}</td>
                <td v-if="type === 1">
                  <span class="user-label" v-if="ind < 20" v-for="(it ,ind) in item.Users" :data="it" :key="ind"><ad-Info  :ad="it.Username" /> </span>
                  <span v-if="item.Users && item.Users.length > 20"> + ({{item.Users.length - 20}})</span>
                </td>
                <td v-else>
                  <span class="user-label"><ad-Info :ad="item.CreatedBy" /></span>
                </td>
                <td>{{item.CreatedAt | formatDate}}</td>
                <td v-if="type === 1" class="no-wrap">
                  <button class="btn btn-sm btn-warning" @click="editForm(item)">{{__t('Xem/ Sửa')}}</button> - <button class="btn btn-sm" @click="deleteConfirm(item.Id)">{{__t('Xóa')}}</button>
                </td>
                <td v-if="type === 2" class="no-wrap">
                  <button class="btn btn-sm btn-warning" @click="editForm(item)">{{__t('Xem')}}</button> - <button class="btn btn-sm" @click="deleteItemConfirm(item.Id)">{{__t('Xóa')}}</button>
                </td>
                <td  v-if="type === 3" class="no-wrap">
                  <button class="btn btn-sm btn-warning" @click="editForm(item)">{{__t('Xem')}}</button> - <button class="btn btn-sm" @click="sharePopup(item)">{{__t('Chia sẻ')}}</button>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="7" class="text-center">{{__t('Không có dữ liệu')}}</td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="p-10 text-right">
          <paginate
            :clickHandler="paginateClick"
            :container-class="'pagination pagination-sm no-margin v-pagination'"
            :next-text="'»'"
            :page-count="parameters.pages"
            :prev-text="'«'"
            v-if="parameters.count > parameters.PageSize"
            v-model="parameters.pageNumber">
          </paginate>
        </div>
        <Form/>
        <basepopup name="sharePopup" width="700px" :isShowFooter="false" :clickToClose="true">
          <div slot="title" class="text-center">
            <h3 class="box-title">Chia sẻ gói {{shareData.title}}</h3>
          </div>
          <div class="body-content">
            <p>Nhập danh sách username cần chia sẻ, cách nhau dấu phẩu</p>
            <p><b>Ví dụ: </b>nangbsq1,nangbsq2,.....</p>
            <textarea-autosize class="form-control mrb10" :class="!shareData.Usernames ? 'error' : null" rows="2" placeholder="nangbsq1,nangbsq2,....."  v-model="shareData.Usernames"/>
            <p class="msg-error" :class="shareData.Usernames ? 'none' : null">Vui lòng nhập danh sách users</p>
          </div>
          <div slot="footer">
              <div class="row">
                <div class="col-xs-6">
                  <button type="button" class="btn btn-block v-white-btn" @click="handleClose()">{{__t('Hủy bỏ')}}</button>
                </div>
                <div class="col-xs-6">
                  <button v-if="shareData.Usernames" type="button" class="btn btn-block v-yellow-btn" @click="submitShare()">{{__t('Đồng ý')}}</button>
                </div>
              </div>
          </div>
        </basepopup>
      </div>
    </div>
  </div>
</template>
<script>
import Form from './Form.vue'
import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'
import EventBus from '@/lib/eventBus'
export default {
  name: 'OrderSets',
  components: {
    Form
  },
  data () {
    return {
      shareData: {
        Usernames: null,
        Id: null,
        title: ''
      },
      loading: true,
      datas: [],
      type: 1,
      parameters: {
        pageNumber: 1,
        pages: 1,
        PageSize: process.env.PAGE_SIZE,
        count: 0
      }
    }
  },
  created () {
    this.getData(1)
    // console.log('ON-OPD')
  },
  methods: {
    submitShare () {
      new DoctorPlaceDiagnosticsOrder().ShareOrderSetForUser(this.shareData).then(() => {
        this.getData(this.type)
      })
    },
    handleClose () {
      this.shareData.Id = null
      this.shareData.Usernames = ''
      this.shareData.title = ''
      this.$modal.hide('sharePopup')
    },
    sharePopup (item) {
      this.shareData.Id = item.Id
      this.shareData.title = item.Name + ' ' + item.Code
      this.shareData.Usernames = ''
      this.$modal.show('sharePopup')
    },
    deleteConfirm (id) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc xóa gói dịch vụ này?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              new DoctorPlaceDiagnosticsOrder().deleteOrderSet(id).then(() => {
                this.reload()
              }).catch(e => {
                console.log(e)
              })
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    deleteItemConfirm (id) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Bạn có chắc xóa gói dịch vụ này?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              new DoctorPlaceDiagnosticsOrder().deleteShareOrderSet(id).then(() => {
                this.getData(this.type)
              }).catch(e => {
                console.log(e)
              })
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    activeClass (id) {
      return id === this.type ? 'active' : ''
    },
    editForm (item) {
      EventBus.$emit('openOrdersetPopup', item, this.type !== 1)
    },
    paginateClick () {
      this.getData(this.type)
    },
    getData (type = 1, reset) {
      this.loading = true
      this.datas = []
      if (reset) {
        this.parameters.count = 0
        this.parameters.pages = 1
        this.parameters.pageNumber = 1
      }
      this.type = type
      new DoctorPlaceDiagnosticsOrder({Search: '', Type: type, FilterType: null, ...this.parameters}).getOrderSet().then(({items, count}) => {
        var bonussssss = 1
        if ((count % this.parameters.PageSize) === 0) {
          bonussssss = 0
        }
        this.parameters.count = count
        this.parameters.pages = parseInt(count / this.parameters.PageSize) + bonussssss
        this.datas = items
        this.loading = false
      }).catch(e => {
        this.loading = false
        console.log(e)
      })
    }
  }
}
</script>
