<template>
  <div>
    <template v-if="loaded">
      <ViewMedicalRecord v-if="!ViewOnly" />
      <h1 class="text-center form-title" v-if="!ViewOnly">{{__t('Phiếu chăm sóc')}}</h1>
      <template v-if="Version2">
        <div class="v-tab v-tab-2">
          <template>
            <ul class="nav nav-tabs flex-containerx" role="tablist">
              <li role="presentation" :class="activeClass(null)" style="margin-right: 0px;">
                <a @click="FormIdNewborn = null">{{__t('Sản phụ')}}</a>
              </li>
              <template v-if="List.length">
                <li role="presentation" :class="activeClass(item.Id)" :data="item" :key="index" v-for="(item ,index) in List" style="margin-right: 0px;">
                  <a @click="pushData(item)">{{__t('Sơ sinh')}} {{index + 1}} {{item.FullNameNewborn ? '- ' + item.FullNameNewborn : ''}}</a>
                </li>
              </template>
              <li class="text-center flex-container no-border" v-if="!IsLocked && !ViewOnly && this.hasRole('IPDPCC02')">
                <a @click="confirmPopup()" class="add-btn-active no-border">
                  <div class="box-info-item flex align-center">
                    <div class="mrr5"><i class="fa fa-plus" aria-hidden="true"></i></div>
                    <div>{{__t('Thêm sơ sinh')}}</div>
                  </div>
                </a>
              </li>
            </ul>
            <div class="tab-content pdt10">
              <Item :Version2="Version2" @getIsLocked="getIsLocked" :VisitId="_VisitId" :dataItem="dataItem" :VisitType="_VisitType" :ViewOnly="ViewOnly" :FormIdNewborn="FormIdNewborn" @getListSoSinh="getListSoSinh"/>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <Item :Version2="Version2" :VisitId="_VisitId" :VisitType="_VisitType" :ViewOnly="ViewOnly" :FormIdNewborn="null"/>
      </template>
    </template>
    <v-loading v-else />
  </div>
</template>

<script>
import ContraintNewbornAndPregnantWoman from '@/services/ContraintNewbornAndPregnantWoman'
import ViewMedicalRecord from '@/pages/IPD/TakeCareNote/ViewMedicalRecord.vue'
import Item from './Item.vue'
import TakeCareNote from '@/services/TakeCareNote'
export default {
  props: ['VisitId', 'VisitType', 'ViewOnly'],
  name: 'TakeCareNoteIPD',
  components: {
    ViewMedicalRecord, Item
  },
  data () {
    return {
      List: [],
      loaded: false,
      FormIdNewborn: null,
      Version2: false,
      dataItem: {},
      IsLocked: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      await new TakeCareNote({}, this._VisitType).find('Infor/' + this._VisitId).then(response => {
        this.Version2 = response.ConditionVersion2
        if (this.Version2) {
          this.getListSoSinh()
        }
        this.loaded = true
      }).catch(e => {
        this.loaded = true
      })
    },
    getListSoSinh (str) {
      new ContraintNewbornAndPregnantWoman().find('GetList/' + this._VisitId + '/IPD/A02_062_050919_V').then(res => {
        this.List = res
        if (str && str === 'create') {
          this.FormIdNewborn = res[res.length - 1].Id
        }
      }).catch(e => {
        console.log('e: ', e)
      })
    },
    // xác nhận tạo mới
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Tạo mới PHIẾU CHĂM SÓC'),
        text: this.$t('Tạo mới PHIẾU CHĂM SÓC'),
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
    // tạo mới form
    handleCreate () {
      new ContraintNewbornAndPregnantWoman().update('Created/' + this._VisitId + '/IPD/A02_062_050919_V').then(res => {
        this.toastedSuccess()
        this.dataItem = {}
        this.getListSoSinh('create')
      })
    },
    activeClass (id) {
      return id === this.FormIdNewborn ? 'active' : ''
    },
    pushData (data) {
      this.dataItem = data
      this.FormIdNewborn = data.Id
    },
    getIsLocked (data) {
      this.IsLocked = data
    }
  }
}
</script>
