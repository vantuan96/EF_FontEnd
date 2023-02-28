<template>
  <div class="main-content" id="PHC-page">
    <view-item />
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 * The home index page.
 */
import VLayout from '@/layouts/Default.vue'
// import Translation from '@/services/Translation'
// import VSelect from '@/components/VSelect.vue'
// import VDatePicker from '@/components/VDateTimePicker.vue'
// import moment from 'moment'
// import _ from 'lodash'
import ViewItem from '@/components/Translation/View.vue'
import Notification from '@/services/Notification'
export default {
  /**
   * The name of the page.
   */
  name: 'ViewTrand',
  data () {
    return {
      data: {},
      MDDATA: {
        OPD: 'OPDTRANMR0',
        ED: 'EDTRANMR0'
      },
      MDDATAITEM: {},
      TOMASTERDATA: {},
      loaded: false
    }
  },
  // VIEDTRANMR0
  // ENEDTRANMR0
  // VIOPDTRANMR0
  // ENOPDTRANMR0
  mixins: [],
  /**
   * The components that the page can use.
   */
  components: {
    VLayout,
    ViewItem
  },
  mounted () {
    if (this.$route.params.Id) this.readNoti()
  },
  computed: {
  },
  methods: {
    readNoti () {
      new Notification({hidemsg: true, hideloading: true, notRedirect: true, noLoading: true}).update(this.$route.params.Id, {}).then(rep => {
      })
    }
  }
}
</script>
