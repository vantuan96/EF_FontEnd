<template>
  <div class="page-lscd">
    <!-- Xét nghiệm/ Chẩn đoán hình ảnh/ Cận lâm sàng -->
    <template v-if="hasRole('SHOWTIMELINE')">
      <div class="v-tab">
      <ul id="AmbulanceRunReportTab" class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('ListRecord/LSCD/CLS')">
          <router-link :to="{name: 'ListRecordsMenuCLS', params: { Id: this.Id }}">
            {{__t('Cận lâm sàng ')}}
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('ListRecord/LSCD/KQXN')">
          <router-link :to="{name: 'ListRecordsMenuLaboratory', params: { Id: this.Id }}">
            {{__t('Kết quả xét nghiệm')}}
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('ListRecord/LSCD/CDHA')">
          <router-link :to="{name: 'ListRecordsMenuRadiology', params: { Id: this.Id }}">
            {{__t('Kết quả CĐHA')}}
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('ListRecord/LSCD/AlliedService')">
          <router-link :to="{name: 'ListRecordsMenuAlliedService', params: { Id: this.Id }}">
            {{__t('Dịch vụ chung')}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="tab-content" id="record-menu">
      <transition name="page" mode="out-in">
        <router-view class="mrt10"/>
      </transition>
    </div>
    </template>
  </div>
</template>

<script>
import VDatePicker from '@/components/VDateTimePicker.vue'
import VDateTimePicker5 from '@/components/VDateTimePicker5.vue'
import Radiology from './Radiology/Index.vue'
import CLS from './CLS.vue'
import Laboratory from './Laboratory/Index.vue'
export default {
  name: 'DiagnosticReporting',
  components: {
    VDatePicker, VDateTimePicker5, Radiology, CLS, Laboratory
  },
  data () {
    return {
      Id: this.$route.params.Id,
      nameRoute: this.$route.name
    }
  },
  watch: {
  },
  mounted () {
    setTimeout(() => {
      if (this.nameRoute === 'ListRecordsMenuLSCD') {
        this.$router.push({name: 'ListRecordsMenuCLS', params: { Id: this.Id }})
      }
    }, 200)
  },
  methods: {
    // changeStatus (str) {
    //   if (str) {
    //     this.checkStatus = str
    //   }
    // },
    activeClass (link) {
      if (typeof link === 'string') return this.$route.path.includes(link) ? 'active' : ''
      return link.includes(this.$route.name) ? 'active' : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
