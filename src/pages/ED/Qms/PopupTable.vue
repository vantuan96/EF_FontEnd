<template>
  <div>
    <modal name="MasterDataPopup" transition="pop-out" height="auto" :clickToClose="false" :width="modalWidth">
      <div class="sync-ed-header" v-if="data">{{__t('Bảng phân công nhân lực ngày')}} {{data.dateStr}} <i @click="close()" class="fa fa-times pull-right fa-2" aria-hidden="true"></i></div>
      <div class="sync-ed-box padding-15" v-if="data">
        <div class="text-center padding-15" v-if="data.isNew">
          <p>{{__t('Chưa có dữ liệu')}}</p>
          <button class="btn v-yellow-btn" type="button" @click="Create()"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('Tạo mới')}}</button>
        </div>
        <div class="v-tab" v-else>
          <ul class="nav nav-tabs" role="tablist">
            <li :key="index" role="presentation" :class="{'active': currentObj.Id === item.Id}" v-for="(item, index) in formData">
              <a @click="currentObj = item">{{__label(item)}} ({{item.StartAt | getOnlyTime}} ~ {{item.EndAt | getOnlyTime}})</a>
            </li>
          </ul>
          <div class="tab-content">
            <template v-for="(item, index) in formData">
              <div :key="index" role="tabpanel" class="tab-pane active" v-if="currentObj.Id === item.Id">
                <table class="standing-order-tbl vertical-align-top">
                  <tr>
                    <th class="no-wrap" width="1">{{__t('Vị trí')}}</th>
                    <th width="200">{{__t('Chính')}}</th>
                    <th width="200">{{__t('Phụ')}}</th>
                    <th width="200">{{__t('Tăng cường')}}</th>
                  </tr>
                  <tr :key="ind + '-' + index" v-for="(staff, ind) in item.Datas">
                    <td>{{__label(staff)}}</td>
                    <template v-if="ind === 0">
                      <td :colspan="staff.GroupStaffs.length">
                        <UsersView v-if="data.readOnly" :data="staff.GroupStaffs[0].Users"/>
                        <UsersSelect v-else  v-model="staff.GroupStaffs[0].Users" :multiple="true"/>
                      </td>
                    </template>
                    <template v-else>
                    <td :key="i" v-for="(staf, i) in staff.GroupStaffs">
                      <UsersView v-if="data.readOnly" :data="staf.Users"/>
                      <UsersSelect v-else v-model="staf.Users" :multiple="true"/>
                    </td>
                    </template>
                  </tr>
                </table>
              </div>
            </template>
            <div class="mt-10">
              <div class="row">
                <div class="col-md-1 col-sm-2">
                  <div class="form-group1">
                    <button type="button" class="btn v-white-btn" @click="go2TV()">
                      <i class="fa fa-desktop" aria-hidden="true"></i>  {{__t('XEM MÀN HÌNH TIVI')}}
                    </button>
                  </div>
                </div>
                <div class="col-md-4 col-sm-4">
                  <div class="form-group1">
                  </div>
                </div>
                <div class="col-md-2 col-sm-2">
                  <div class="form-group1">
                    <button type="button" @click="close()" class="btn v-white-btn btn-block">
                      <i class="fa fa-back" aria-hidden="true"></i>  {{__t('Quay lại')}}
                    </button>
                  </div>
                </div>
                <div class="col-md-5 col-sm-4">
                  <div class="form-group1">
                    <button v-if="!data.readOnly" class="btn v-yellow-btn btn-block" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import HumanResourceAssessment from '@/services/ED/HumanResourceAssessment'
import UsersSelect from '@/components/UsersSelect.vue'
import UsersView from './UsersList.vue'
const MODAL_WIDTH = 980
export default {
  name: 'HumanResourceAssessmentTable',
  props: [],
  data () {
    return {
      currentObj: {},
      data: null,
      modalWidth: MODAL_WIDTH,
      formData: [],
      edited: false
    }
  },
  watch: {
    formData: {
      handler () {
        this.edited = true
      },
      deep: true
    },
    edited: {
      handler () {
        this.$emit('edited', this.edited)
      },
      deep: true
    }
  },
  components: {
    UsersSelect,
    UsersView
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
  },
  methods: {
    setCurrentObj (obj) {
      this.currentObj = obj
    },
    go2TV () {
      this.$router.push({name: 'ED-Tivi'})
    },
    close () {
      if (this.edited) {
        this.$modal.show('dialog', {
          title: this.__t('Cảnh báo'),
          text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: this.__t('Đồng ý'),
              class: 'btn',
              handler: () => {
                this.$emit('closed')
                this.$modal.hide('MasterDataPopup')
                this.$modal.hide('dialog')
              }
            },
            {
              title: this.__t('Hủy bỏ'),
              class: 'btn bg-yellow',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
      } else {
        this.$emit('closed')
        this.$modal.hide('MasterDataPopup')
      }
    },
    Create () {
      new HumanResourceAssessment().update('create', {
        Date: this.data.dateStr
      }).then(response => {
        this.getData()
      })
    },
    submit () {
      new HumanResourceAssessment().update('Update/', this.currentObj).then(response => {
        this.toastedSuccess()
        this.edited = false
        // this.close()
      })
    },
    getData (openForm) {
      new HumanResourceAssessment({Date: this.data.dateStr}).find('detail').then(response => {
        this.formData = response
        this.data.isNew = !response.length
        if (response.length) {
          this.currentObj = response[0]
        }
        if (openForm) {
          this.$modal.show('MasterDataPopup')
        }
        setTimeout(() => {
          this.edited = false
        }, 1000)
      })
    },
    open (data) {
      console.log(data)
      this.data = data
      this.getData(true)
    }
  }
}
</script>
