<template>
  <div>
    <h2 class="text-center cap mrb20 fw600">{{__t(`${FormName}`)}}</h2>
    <template v-if="loaded">
      <div v-if="ListForms && ListForms.length > 0">
        <div class="single-form" v-if="IsSingle">
          <slot ref="slotContent"/>
        </div>
        <div v-else>
          <div class="v-tab v-tab-2">
            <template>
              <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
                <li :data="item" :key="index" v-for="(item ,index) in ListForms" class="text-center flex-containerx">
                  <router-link class="no-border" :to="{name:`${_VisitType}${FormCode}ITEM`, params: { Id: _VisitId, ItemId: item.Id }}">
                    <div class="box-info-item">
                      <div>{{__t('Phiếu')}} {{index + 1}}</div>
                      <div><ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" /></div>
                      <div>{{item.CreatedAt | formatDateWithoutSecon}}</div>
                    </div>
                  </router-link>
                </li>
                <li class="text-center flex-container no-border">
                  <a  @click="confirmPopup()" class="add-btn-active no-border" style="height: 71px;padding-top: 13px;">
                    <div class="box-info-item">
                      <div><i class="fa fa-plus" aria-hidden="true"></i></div>
                      <div>{{__t('Thêm phiếu')}}</div>
                    </div>
                  </a>
                </li>
              </ul>
              <div class="tab-content">
                <transition name="page" mode="out-in">
                  <router-view :VisitType="_VisitType"/>
                </transition>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center">
          <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
          <!-- <p>{{__t(`Chưa có ${FormName}`)}}</p>
          <button v-if="!IsLocked && checkRole()" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button> -->
        </div>
      </div>
    </template>
    <template v-else class="loading-text"><v-loading/></template>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/FormOutpatientExaminationNew.js'
import FormApi from '@/services/FormAPI.js'
export default {
  name: 'FormWrap',
  props: {
    IsSingle: {
      type: Boolean
    },
    FormCode: {
      type: String,
      required: true
    },
    FormCodeCustom: {
      type: String
    },
    FormName: {
      type: String,
      required: true
    },
    VisitId: {
      type: String
    },
    VisitType: {
      type: String
    }
  },
  components: {
  },
  mixins: [MixinMasterData, MixinForm],
  watch: {
    FormCodeCustom (val) {
      if (val) {
        this.getData()
      }
    }
  },
  data () {
    return {
      ListForms: null,
      loaded: false,
      IsLocked: false
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this.VisitId,
      FormCode: this.FormCodeCustom ? this.FormCodeCustom : this.FormCode,
      hidemsg: true
    })
    this.getData()
  },
  created () {},
  methods: {
    getData () {
      this.APIService.GetList().then(res => {
        this.IsLocked = res.IsLock24h
        this.ListForms = res.Datas
        this.loaded = true
        if (this.ListForms && this.ListForms.length > 0 && !this.$route.params.ItemId) {
          this.$router.push(
            {
              name: `${this._VisitType}${this.FormCode}ITEM`,
              params: { Id: this.VisitId, ItemId: this.ListForms[this.ListForms.length - 1].Id }
            }
          )
        }
      }).catch((e) => {
        console.log(e)
        this.IsLocked = e.data.IsLock24h
        this.loaded = true
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t(`${this.FormName}`),
        text: this.$t(`Tạo mới ${this.FormName}`),
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
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    handleCreate () {
      this.APIService.CreateForm().then(res => {
        console.log(res)
        this.reload()
      }).catch((e) => {
        console.log(e)
      })
    },
    checkRole () {
      let check = true
      if (this.FormCode === 'A02_053_OR_201022_V' && !this.hasRole(`APICR${this._VisitType}A02_053_OR_201022_V`)) {
        check = false
      }
      return check
    }
  }
}
</script>
