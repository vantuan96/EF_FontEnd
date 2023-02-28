<template>
  <div>
    <div>
      <h3 class="text-center fw600 cap" v-if="Version >= 13">{{__t("Bản cam kết xin chuyển bánh rau/ tổ chức thai/bộ phận cơ thể ra ngoài bệnh viện và tuân thủ quy định pháp luật")}}</h3>
      <h3 class="text-center fw600 cap" v-else>{{__t("Bản cam kết xin lấy bánh rau không theo quy định quản lý của Bệnh viện")}}</h3>
    </div>
    <div v-if="loaded">
      <div v-if="List && List.length > 0" class="v-tab v-tab-2">
        <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
          <li :data="item"  :key="index" v-for="(item ,index) in List" class="text-center flex-containerx no-border" style="margin-right: 0px;">
            <router-link class="no-border" :to="{name: 'CommitmentPaperToTakeThePlacentaItem', params: { Id: $route.params.Id, Item: item.Id}}">
              <div>{{__t('Phiếu ')}}{{index + 1}}</div>
              <div>{{item.CreatedAt | formatDateWithoutSecon}}</div>
              <div>
                <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                <br v-else-if="item.CreatedBy === ''">
              </div>
            </router-link>
          </li>
          <li class="text-center flex-container no-border" v-if="!IsLocked" >
            <a @click="confirmPopup()" class="add-btn-active no-border" style="height: 70px;" >
              <div><i class="fa fa-plus" aria-hidden="true"></i></div>
              <div>{{__t('Thêm phiếu')}}</div>
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <transition name="page" mode="out-in">
            <router-view :FormCode="FormCode" :Version="Version" :VisitId="VisitId" :VisitType="VisitType" />
          </transition>
        </div>
      </div>
      <div v-else class="text-center p20">
        <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
        <!-- <p>{{__t('Chưa có thông tin')}}</p>
        <button v-if="NeedNew"  class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button> -->
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>

<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import FormApi from '@/services/FormAPI.js'

export default ({
  name: 'CommitmentPaperToTakeThePlacenta',
  props: ['viewOnly', 'VisitId', 'VisitType'],
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      loaded: false,
      dataPicture: [],
      DataSubmit: null,
      List: [],
      NeedNew: true,
      IsLocked: false,
      FormCode: 'A01_159_050919_VE',
      Version: null
    }
  },
  computed: {
    readonly: function () {
      return this.viewOnly || this.checkUser
    },
    CurrentPatientObj () {
      return this.$store.state.account.CurrentPatientObj
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: 'IPD',
      VisitId: this._VisitId,
      FormCode: 'A01_159_050919_VE'
    })
    this.getData()
    this.checkShowPrintButton()
  },
  methods: {
    async getData () {
      this.APIService.GetList().then(res => {
        this.Version = res.Version
        if (res.Version >= 13) {
          this.FormCode = 'A01_159_110123_VE'
          document.getElementById('text-router-active').innerText = this.__label({ViName: 'Bản cam kết xin chuyển bánh rau/ tổ chức thai/bộ phận cơ thể ra ngoài bệnh viện và tuân thủ quy định pháp luật', EnName: 'Commitment paper to take the placenta /nonviable/body parts removed out of hospital and comply with the law'})
        }
        this.IsLocked = res.IsLock24h
        if (res.FORM_NOT_FOUND && res.FORM_NOT_FOUND.ViMessage === 'Form không tồn tại') {
        } else {
          this.DataSubmit = res
          // lấy danh sách
          this.List = res.Datas
          if (res.Datas && res.Datas.length > 0 && !this.$route.params.Item) {
            // đẩy bắn sang items mới nhất
            this.$router.push(
              {
                name: `CommitmentPaperToTakeThePlacentaItem`,
                params: { Id: this._VisitId, Item: res.Datas[res.Datas.length - 1].Id }
              }
            )
          }
        }
        this.loaded = true
      }).catch((e) => {
        this.IsLocked = e.data.IsLock24h
        this.Version = e.data.Version
        if (e.data.Version >= 13) {
          this.FormCode = 'A01_159_110123_VE'
          document.getElementById('text-router-active').innerText = this.__label({ViName: 'Bản cam kết xin chuyển bánh rau/ tổ chức thai/bộ phận cơ thể ra ngoài bệnh viện và tuân thủ quy định pháp luật', EnName: 'Commitment paper to take the placenta /nonviable/body parts removed out of hospital and comply with the law'})
        }
        this.loaded = true
        if (this.IsLocked) {
          this.NeedNew = false
        }
      })
    },
    checkShowPrintButton () {
      if (this.IsLocked && this.DataSubmit) {
        return true
      } else if (!this.DataSubmit) {
        return false
      } else if (this.IsLocked && !this.DataSubmit) {
        return false
      } else if (!this.IsLocked && this.DataSubmit) {
        return true
      }
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.getText(),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
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
    create () {
      this.APIService.CreateForm({}).then(res => {
        this.toastedSuccess()
        this.$router.push(
          {
            name: 'CommitmentPaperToTakeThePlacentaItem',
            params: { Id: this._VisitId, Item: res.Id }
          }
        )
        this.reload()
      })
    },
    getText () {
      let str = {ViName: 'Tạo mới Bản cam kết xin lấy bánh rau không theo quy định quản lý của Bệnh viện', EnName: 'Create new Commitment paper to take the placenta out of the hospital'}
      if (this.Version >= 13) {
        str = {ViName: 'Tạo mới Bản cam kết xin chuyển bánh rau/ tổ chức thai/bộ phận cơ thể ra ngoài bệnh viện và tuân thủ quy định pháp luật', EnName: 'Create new Commitment paper to take the placenta /nonviable/body parts removed out of hospital and comply with the law'}
      }
      return this.__label(str)
    }
  }
})
</script>
