<template>
  <div class="main-content" id="Home-page">
    <div class="row v-flexbox">
      <div class="col-md-12 col-sm-12">
        <div class="search-group box">
          <form v-on:submit.prevent="getData()">
            <label>{{__t('home.tim_kiem_benh_nhan') }}</label>
            <div class="input-group input-group-lg">
              <input type="text" class="form-control" v-model.trim="parameters.PID" :placeholder="__t('Nhập PID để tìm kiếm...')">
              <span class="input-group-btn">
                <button type="button" class="btn btn-flat v-yellow-btn" @click="getData()"><i class="fa fa-search" aria-hidden="true"></i> {{ __t('home.tim_kiem') }}</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="loaded">
      <div v-if="response">
        ...
      </div>
      <div class="text-center" v-else>
        {{__t('Không có dữ liệu')}}
      </div>
    </div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
// import Prescription from '@/services/Prescription'
import CustomerApi from '@/services/CustomerApi'

export default {
  /**
   * The name of the page.
   */
  name: 'Prescription-Search',
  data () {
    return {
      Error: '',
      response: null,
      loaded: false,
      parameters: {
        PID: ''
      }
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    getData () {
      this.response = null
      this.loaded = false
      new CustomerApi(this.parameters)
        .find(this.parameters.PID)
        .then(response => {
          this.response = response
          this.$router.push({name: 'prescription-result', params: {PID: response.PID}})
        }).catch(e => {
          this.loaded = true
        })
    }
  }
}
</script>
