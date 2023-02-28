<template>
  <div v-if="loaded">
    <h1 class="text-center form-title">{{__t('Đánh giá tình trạng trẻ trong 2 giờ sau sinh')}}</h1>
    <div v-if="List.length > 0" class="v-tab v-tab-2">
      <ul class="nav nav-tabs flex-containerx" role="tabLists">
        <li :data="item" :key="index" v-for="(item ,index) in List"  style="margin-right: 0;">
          <router-link class="no-border" :to="{name:'AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLifeItem', params: { Id: $route.params.Id, Item: item.Id }}">
            {{__t('Sơ sinh')}} {{index + 1}} {{item.FullNameNewborn ? `- ${item.FullNameNewborn}` : ''}}
          </router-link>
        </li>
        <li class="text-center flex-container no-border" v-if="!IsLocked">
          <a v-if="hasRole('IPDCREATE2HOURSV2')" @click="confirmPopup()" class="add-btn-active no-border" >
            <div class="box-info-item flex align-center">
              <div class="mrr5"><i class="fa fa-plus" aria-hidden="true"></i></div>
              <div>{{__t('Thêm sơ sinh')}}</div>
            </div>
          </a>
        </li>
      </ul>
      <div class="tab-content">
        <transition name="page" mode="out-in">
          <router-view :NewbornCustomerId="getNewbornCustomerId" :dataItem="dataItem" @getListSoSinh="getLists" :IsLocked="IsLocked"/>
        </transition>
      </div>
    </div>
    <div v-else class="text-center p20">
      <p>{{__t('Chưa có Đánh giá tình trạng trẻ trong 2 giờ sau sinh')}}</p>
      <button class="btn btn-warning" @click="confirmPopup" v-if="!IsLocked">{{__t('Tạo mới')}}</button>
    </div>
  </div>
  <div v-else class="loading-text"><v-loading/></div>
</template>
<script>
import ContraintNewbornAndPregnantWoman from '@/services/ContraintNewbornAndPregnantWoman'
import InitialAssessment from '@/services/IPD/InitialAssessment'
export default {
  name: 'IPDAssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLife',
  data () {
    return {
      List: [],
      ListNewBorn: [],
      loaded: false,
      IsLocked: false
    }
  },
  mounted () {
    this.getLists()
  },
  computed: {
    getNewbornCustomerId () {
      let NewbornCustomerId = ''
      if (this.List.length === 0) return
      this.List.map(item => {
        if (item.Id === this.$route.params.Item) {
          NewbornCustomerId = item.NewbornCustomerId
        }
      })
      return NewbornCustomerId
    },
    dataItem () {
      let dataItem = ''
      if (this.ListNewBorn === 0) return
      this.ListNewBorn.map(item => {
        if (item.Id === this.getNewbornCustomerId) {
          dataItem = item
        }
      })
      return dataItem
    }
  },
  methods: {
    getLists () {
      this.loaded = false
      new InitialAssessment()
        .find('ForUterineLife2HoursV2/' + 'GetList/' + this._VisitId)
        .then(async response => {
          this.loaded = true
          this.IsLocked = await response.IsLocked
          // getListSoSinh
          await new ContraintNewbornAndPregnantWoman().find('GetList/' + this._VisitId + '/IPD/ForUterineLife2Hours_Obstetrics').then(response => {
            this.ListNewBorn = response
          }).catch(e => {
            console.log('e: ', e)
          })
          this.List = await response.Forms.map((e, i) => {
            return {
              Id: e.Id,
              NewbornCustomerId: e.NewbornCustomer.Id,
              FullNameNewborn: ''
            }
          })
          for (let i = 0; i < this.List.length; i++) {
            for (let j = 0; j < this.ListNewBorn.length; j++) {
              if (this.List[i].NewbornCustomerId === this.ListNewBorn[j].Id) {
                const name = this.ListNewBorn[j].FullNameNewborn ? this.ListNewBorn[j].FullNameNewborn : ''
                this.List[i] = { ...this.List[i], FullNameNewborn: name }
              }
            }
          }
          if (this.$route.params.Item) {
            // nothing
          } else {
            this.$router.push({name: 'AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLifeItem', params: {Id: this.$route.params.Id, Item: this.List[this.List.length - 1].Id}})
          }
        })
        .catch(e => {
          this.loaded = true
        })
    },
    create (id) {
      new InitialAssessment()
        .update('ForUterineLife2HoursV2/' + 'Create/' + 'A02_016_061022_VE/' + this._VisitId + '/ForUterineLife2Hours_Obstetrics/' + id)
        .then(async response => {
          this.$router.push({name: 'AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLifeItem', params: {Id: this.$route.params.Id, Item: response.Id}})
        })
    },
    createNeonatal () {
      new ContraintNewbornAndPregnantWoman()
        .update('Created/' + this._VisitId + '/IPD' + '/ForUterineLife2Hours_Obstetrics')
        .then(async response => {
          await this.create(response.Id)
        })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Đánh giá tình trạng trẻ trong 2 giờ sau sinh'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.createNeonatal()
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>
