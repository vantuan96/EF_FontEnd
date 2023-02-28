<template>
  <div class="main-content" id="BloodRequestSupplyAndConfirmation-page" v-if="loaded">
    <h1 class="text-center form-title">{{__t('Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu')}}</h1>
    <template v-if="hasData">
      <template v-if="IsLocked">
        <div class="text-center flex-box flex-center brsac-form">
          {{__t('Số')}}: <span class="fake-input disable">{{data.Number || 'N/A'}}</span>
          <div class="group-radio">
            <span class="el-radio-view">{{data.IsFrequently ? 'Thường quy' : 'Cấp cứu '}}</span>
          </div>
        </div>
        <div class="v-tab">
          <ul id="AmbulanceRunReportTab" class="nav nav-tabs" role="tablist">
            <li role="presentation" :class="activeClass2('PurchaseRequest')">
              <a class="link" @click="type = 'PurchaseRequest'">{{__t('Dự trù máu và chế phẩm máu')}}</a>
            </li>
            <li role="presentation" :class="activeClass2('Supply')">
              <a class="link" @click="type = 'Supply'">{{__t('Cung cấp máu và chế phẩm máu')}}</a>
            </li>
            <li role="presentation" :class="activeClass2('TransfusionConfirmation')">
              <a class="link" @click="type = 'TransfusionConfirmation'">{{__t('Xác nhận thực hiện truyền máu và chế phẩm máu')}}</a>
            </li>
          </ul>
        </div>
        <div class="tab-content">
          <component v-if="type in $options.components" v-bind:is="type" :viewOnly="true" :VisitId="_VisitId" :VisitType="_VisitType"/>
        </div>
      </template>
      <template v-else>
        <div class="text-center flex-box flex-center brsac-form">
          {{__t('Số')}}: <VNumberInput style="width: 80px;" v-model="data.Number"/>
          <div class="group-radio">
            <input type="radio" id="item_01" name="status" value="false" v-model="data.IsFrequently">
            <label class="no-margin" for="item_01">{{__t("Cấp cứu ")}}</label>
            <input type="radio" id="item_02" name="status" value="true" v-model="data.IsFrequently">
            <label class="no-margin" for="item_02">{{__t("Thường quy")}}</label>
          </div>
        </div>
        <div class="v-tab">
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" :class="activeClass(_VisitType + 'BloodRequestSupplyAndConfirmationPurchaseRequest')">
              <router-link :to="{name: _VisitType + 'BloodRequestSupplyAndConfirmationPurchaseRequest', params: { Id: this.$route.params.Id, FormId: data.Id }}">
                {{__t('Dự trù máu và chế phẩm máu')}}<br/>
              </router-link>
            </li>
            <li role="presentation" :class="activeClass(_VisitType + 'BloodRequestSupplyAndConfirmationSupply')">
              <router-link :to="{name: _VisitType + 'BloodRequestSupplyAndConfirmationSupply', params: { Id: this.$route.params.Id, FormId: data.Id }}">
                {{__t('Cung cấp máu và chế phẩm máu')}}<br/>
              </router-link>
            </li>
            <li role="presentation" :class="activeClass(_VisitType + 'BloodRequestSupplyAndConfirmationTransfusionConfirmation')">
              <router-link :to="{name: _VisitType + 'BloodRequestSupplyAndConfirmationTransfusionConfirmation', params: { Id: this.$route.params.Id, FormId: data.Id }}">
                {{__t('Xác nhận thực hiện truyền máu và chế phẩm máu')}}<br/>
              </router-link>
            </li>
          </ul>
          <div class="tab-content">
            <transition name="page" mode="out-in">
              <router-view :formdata="data"/>
            </transition>
          </div>
        </div>
      </template>
    </template>
    <div class="text-center" v-else>
      <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
    </div>
  </div>
  <div v-else class="text-center">
    <v-loading/>
  </div>
</template>
<script>
import BloodRequestSupplyAndConfirmation from '@/services/ED/BloodRequestSupplyAndConfirmation'
import MixinForm from '@/mixins/form.js'
import PurchaseRequest from './PurchaseRequest.vue'
import Supply from './Supply.vue'
import TransfusionConfirmation from './TransfusionConfirmation.vue'

export default {
  /**
   * The name of the page.
   */
  name: 'BloodRequestSupplyAndConfirmationIndex',
  mixins: [MixinForm],
  data () {
    return {
      Id: this.$route.params.Id,
      hasData: false,
      data: {},
      loaded: false,
      IsLocked: false,
      type: 'PurchaseRequest'
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    PurchaseRequest,
    Supply,
    TransfusionConfirmation
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  methods: {
    activeClass2 (link) {
      return link === this.type ? 'active' : ''
    },
    activeClass (link) {
      return link === this.$route.name ? 'active' : ''
    },
    getData () {
      this.loaded = false
      new BloodRequestSupplyAndConfirmation({}, this._VisitType).find(this.$route.params.Id + '?hidemsg=' + true).then(response => {
        this.hasData = true
        this.loaded = true
        this.data = response
        this.IsLocked = response.IsLocked
        if (this.$route.name === this._VisitType + 'BloodRequestSupplyAndConfirmation') this.$router.push({name: this._VisitType + 'BloodRequestSupplyAndConfirmationPurchaseRequest', params: {Id: this.$route.params.Id, FormId: response.Id}})
      }).catch(e => {
        this.loaded = true
        this.IsLocked = e.data.IsLocked
      })
    },
    create () {
      new BloodRequestSupplyAndConfirmation({}, this._VisitType).update('Create/' + this.$route.params.Id, {}).then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu'),
        text: this.$t('Tạo mới Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
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
    }
  }
}
</script>
