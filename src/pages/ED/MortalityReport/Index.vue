<template>
  <div>
    <template v-if="Version >= 11">
      <h2 class="text-center">{{__t('MortalityReport.label1')}}</h2>
      <div v-if="!nullContent" class="v-tab space-between">
        <template>
          <ul class="nav nav-tabs flex-containerx" role="tablist">
            <li :data="item" :key="index" v-for="(item ,index) in List" class="text-center flex-containerx">
              <router-link class="no-border" :to="{name:`${item.Name}`, params: { Id: _VisitId }}">
                <div class="box-info-item">
                  <div>{{__label(item)}}</div>
                </div>
              </router-link>
            </li>
          </ul>
          <div class="tab-content mrt10">
            <transition name="page" mode="out-in">
              <router-view :Version="Version" ref="itemchild" :viewOnly="viewOnly" :VisitId="_VisitId" :VisitType="_VisitType"/>
            </transition>
          </div>
        </template>
      </div>
      <div v-else>
        <div class="text-center">
          <p v-if="Version >= 11">{{__t('Chưa có Biên bản - Trích biên bản kiểm thảo tử vong')}}</p>
          <p v-else>{{__t('Chưa có kiểm thảo tử vong')}}</p>
          <button class="btn btn-warning" @click="confirmPopup" v-if="!isLocked && !viewOnly">{{__t('Tạo mới')}}</button>
        </div>
      </div>
    </template>
    <template v-else><Page1 :viewOnly="viewOnly" :VisitId="_VisitId" :Version="Version"/></template>
  </div>
</template>

<script>
import EIOService from '@/services/IPD/EIOService'
import Page1 from './Page1.vue'
import MortalityReport from '@/services/ED/MortalityReport'
export default {
  name: 'MortalityReport',
  props: ['VisitId', 'VisitType', 'viewOnly'],
  components: {
    Page1
  },
  data () {
    return {
      Version: 1,
      List: [
        {
          ViName: 'Kiểm thảo tử vong',
          Id: '001',
          Name: 'EDMortalityReportPage1',
          EnName: 'Kiểm thảo tử vong'
        },
        {
          ViName: 'Trích biên bản',
          Name: 'EDMortalityReportPage2',
          EnName: 'Trích biên bản'
        }
      ],
      nullContent: true,
      isLocked: false
    }
  },
  mounted () {
    this.getData()
    this.getVisitVersion()
  },
  methods: {
    getVisitVersion () {
      new EIOService().find('EMRForm/GetVersionByVisit/' + this._VisitId + '/' + this._VisitType).then(response => {
        this.Version = response.Version
      }).catch((e) => {
        console.log(e)
      })
    },
    getData () {
      new MortalityReport().find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.nullContent = false
        this.Version = response.Version
        if (response.Version >= 11) {
          setTimeout(() => {
            if (this.$route.name === 'EDMortalityReport') {
              this.$router.push(
                {
                  name: 'EDMortalityReportPage1',
                  params: { Id: this._VisitId }
                }
              )
            }
          }, 200)
        }
      }).catch(e => {
        if (e.data.IsLocked) {
          this.isLocked = true
        } else {
          this.isLocked = false
        }
        this.nullContent = true
        // this.back()
        this.loaded = true
      })
    },
    create () {
      new MortalityReport().update('create/' + this._VisitId, {}).then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.Version >= 11 ? this.__t('Tạo mới Biên bản - Trích biên bản kiểm thảo tử vong?') : this.__t('Tạo mới kiểm thảo tử vong?'),
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.router-link-active {
  background: #337AB7!important;
  color: #fff!important;
}
</style>
