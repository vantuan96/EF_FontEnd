<template>
  <div class="mrt10">
    <div class="v-tab">
      <template>
        <ul class="nav nav-tabs flex-containerx" role="tablist">
          <li class="text-center flex-containerx" :data="item" :key="index" v-for="(item ,index) in List">
            <router-link class="no-border" :to="{name:`${_VisitType}${item.Type}`, params: { Id: _VisitId }}">
              <div class="box-info-item">
                <div>{{__label(item)}}</div>
              </div>
            </router-link>
          </li>
        </ul>
        <div class="tab-content">
          <transition name="page" mode="out-in">
            <router-view :VisitId="_VisitId" :VisitType="_VisitType"/>
          </transition>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailAll',
  props: ['VisitType', 'VisitId'],
  data () {
    return {
      List: [
        {
          ViName: 'Chi tiết bệnh án hiện tại',
          Type: 'DETAILGROUP',
          EnName: 'Details of current medical records'
        },
        {
          ViName: 'Tóm tắt thông tin người bệnh',
          Type: 'TomTatThongTinNguoiBenh',
          EnName: 'Summary of patient information'
        }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.$route.meta.name === 'detail all' && this.$route.name === `${this._VisitType}AllDetail`) {
        this.$router.push(
          {
            name: `${this._VisitType}DETAILGROUP`,
            params: { Id: this._VisitId }
          }
        )
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  li {
    a {
      padding: 10px 16px!important;
      border-radius: 9px 9px 0 0!important;
    }
  }
  .router-link-active {
    background: #337AB7!important;
    color: #fff!important;
  }
</style>
