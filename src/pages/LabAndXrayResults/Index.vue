<template>
  <v-layout>
    <section class="content-header">
      <div class="container">
        <ol class="breadcrumb">
          <li v-if="this.$route.meta.name" class="active">{{ __t(this.$route.meta.name) }}</li>
        </ol>
      </div>
    </section>
    <div class="container">
      <section class="content">
        <div class="main-content" id="Home-page">
          <div class="row v-flexbox">
            <div class="col-md-12 col-sm-12">
              <div class="search-group box">
                <form v-on:submit.prevent="getData()">
                  <label>{{__t('home.tim_kiem_benh_nhan') }}</label>
                  <div class="input-group input-group-lg">
                    <input type="text" class="form-control" v-model.trim="query.PID" :placeholder="__t('Nhập PID để tìm kiếm...')">
                    <span class="input-group-btn">
                      <button type="button" class="btn btn-flat v-yellow-btn" @click="getData()"><i class="fa fa-search" aria-hidden="true"></i> {{ __t('home.tim_kiem') }}</button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div v-if="loaded">
            <div v-if="Customer">
              <CustomerInfo :data="Customer" />
              <PrincipalTestTable :PID="Customer.PID" :isReadonly="true" />
            </div>
            <div class="text-center" v-else>
              {{__t('Không có dữ liệu')}}
            </div>
          </div>
        </div>
      </section>
    </div>
  </v-layout>
</template>
<script>
import VLayout from '@/layouts/Default.vue'
import CustomerApi from '@/services/CustomerApi'
import CustomerInfo from './CustomerInfo.vue'
import PrincipalTestTable from '@/components/PrincipalTestTable.vue'
export default {
  name: 'MortalityReport',
  data () {
    return {
      query: {
        PID: ''
      },
      Customer: null,
      loaded: false
    }
  },
  components: {
    PrincipalTestTable, VLayout, CustomerInfo
  },
  mounted () {
    this.getPID()
    // this.getData()
  },
  computed: {
  },
  methods: {
    getPID () {
      if (this.$route.params.PID) {
        this.query.PID = this.$route.params.PID
        this.getData(this.$route.params.PID)
      }
    },
    getData (PID) {
      this.loaded = false
      this.Customer = null
      let data = null
      if (PID) {
        data = PID
      } else {
        data = this.query.PID
      }
      new CustomerApi()
        .find(data)
        .then(response => {
          this.loaded = true
          this.Customer = response
        }).catch(e => {
          console.log(e)
          this.loaded = true
        })
    }
  }
}
</script>
