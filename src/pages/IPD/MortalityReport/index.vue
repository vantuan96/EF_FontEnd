<template>
  <div class="main-content">
    <h2 class="text-center">{{__t('MortalityReport.label1')}}</h2>
    <!-- tab -->
    <div v-if="!nullContent" class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('IpdMortalityReportPage1')">
          <router-link :to="{name: 'IpdMortalityReportPage1', params: { Id: this._VisitId }}">
            Kiểm thảo tử vong
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('IpdMortalityReportPage2')">
          <router-link :to="{name: 'IpdMortalityReportPage2', params: { Id: this._VisitId }}">
            Trích biên bản
          </router-link>
        </li>
      </ul>
      <div class="tab-content">
        <router-view/>
      </div>
    </div>
    <div v-else>
        <!-- <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/> -->
        <div class="text-center">
          <NewForm @createForm="confirmPopup" :IsLocked="isLocked" :TitleForm="''"/>
          <!-- <p>{{__t('Chưa có kiểm thảo tử vong')}}</p>
          <button class="btn btn-warning" @click="confirmPopup" v-if="!isLocked">{{__t('Tạo mới')}}</button> -->
        </div>
      </div>
  </div>
</template>

<script>
import MortalityReport from '@/services/IPD/MortalityReport'
import MixinForm from '@/mixins/form.js'
export default {
  props: ['viewOnly', 'VisitId', 'VisitType'],
  name: 'MortalityReportIndex',
  mixins: [MixinForm],
  data () {
    return {
      nullContent: true,
      isLocked: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    activeClass (link) {
      return link === this.$route.name ? 'active' : ''
    },
    getData () {
      new MortalityReport().find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.nullContent = false
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
        text: this.__t('Tạo mới kiểm thảo tử vong?'),
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
  .main-content {
  }
</style>
