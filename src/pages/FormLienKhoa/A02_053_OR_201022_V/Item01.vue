<template>
  <div class="mrt10">
    <div class="v-tab v-tab-3 space-between">
      <template>
        <ul class="nav nav-tabs flex-containerx" style="max-height: 82px;" role="tablist">
          <li style="width: 25%;max-height: 82px;" :data="item" :key="index" v-for="(item ,index) in List" class="text-center flex-containerx">
            <router-link class="no-border" style="min-height: 81px;max-height: 82px;" :to="{name:`${_VisitType}A02_053_OR_201022_VITEM_01_${item.Id}`, params: { Id: _VisitId, Item: $route.params.ItemId}}">
              <div class="box-info-item">
                <div>{{__label(item)}}</div>
                <div class="italic fw400">({{__label(getTextChild(item.Id))}})</div>
              </div>
            </router-link>
          </li>
        </ul>
        <div class="tab-content mrt10">
          <transition name="page" mode="out-in">
            <router-view ref="itemchild" :readonly="readonly" :VisitId="_VisitId" :VisitType="_VisitType"/>
          </transition>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'A02_053_OR_201022_VItem01',
  props: ['readonly', 'VisitId', 'VisitType'],
  data () {
    return {
      List: [
        {
          ViName: 'Trước khi gây mê/ gây tê',
          Id: '001',
          EnName: 'Before anesthesia'
        },
        {
          ViName: 'Trước khi rạch da/ thực hiện PT/TT',
          Id: '002',
          EnName: 'Before incision/begin of procedure'
        },
        {
          ViName: 'Trong quá trình thực hiện PT/TT',
          Id: '003',
          EnName: 'During the surgery/procedure'
        },
        {
          ViName: 'Trước khi người bệnh rời phòng mổ',
          Id: '004',
          EnName: 'Before patient leaves operating'
        }
      ],
      DataSubmit: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      if (!this.$route.meta.child2) {
        this.$router.push(
          {
            name: `${this._VisitType}A02_053_OR_201022_VITEM_01_001`,
            params: { Id: this._VisitId, Item: this.$route.params.ItemId }
          }
        )
      }
    },
    getTextChild (Id) {
      let obj = {ViName: '', EnName: ''}
      if (Id === '001') {
        obj.ViName = 'Bác sỹ, điều dưỡng gây mê, điều dưỡng dụng cụ và chạy ngoài'
        obj.EnName = 'Nurse anesthetist, anesthesiologist; scrub and circulating nurses'
      }
      if (Id === '002') {
        obj.ViName = 'Kíp phẫu thuật/ thủ thuật tham gia'
        obj.EnName = 'Full surgical/ procedure team'
      }
      if (Id === '003') {
        obj.ViName = 'Kíp phẫu thuật/ thủ thuật tham gia'
        obj.EnName = 'Full surgical/ procedure team'
      }
      if (Id === '004') {
        obj.ViName = 'Điều dưỡng, bác sĩ gây mê, bác sĩ phẫu thuật'
        obj.EnName = 'Nurse, anesthetist and surgeon'
      }
      return obj
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
</style>
