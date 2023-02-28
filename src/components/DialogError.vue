<template>
  <modal
    name="DialogError"
    transition="pop-out"
    height="auto"
    :scrollable="true"
    :width="modalWidth"
    @before-open="beforeOpened"
    @before-close="beforeClosed"
  >
    <div class="dialog-error-box">
      <div class="dialog-error-box-title">
        <h4
          v-if="params.title"
          v-html="params.title || ''">
        </h4>
        <p v-if="params.text" v-html="params.text || ''"></p>
      </div>
      <div class="dialog-error-box-content">
        <ul>
          <li @click="go2Input(error)" :data="error" :key="index" v-for="(error, index) in params.errors">
            <i aria-hidden="true" class="fa fa-times v-red"></i> {{getNameError(__label(error))}}
          </li>
        </ul>
      </div>
      <div
        class="dialog-error-box-footer"
        v-if="buttons">
        <button
          v-for="(button, i) in buttons"
          :class="button.class || 'vue-dialog-button'"
          type="button"
          :style="buttonStyle"
          :key="i"
          v-html="button.title"
          @click.stop="click(i, $event)">
          {{button.title}}
        </button>
      </div>
    </div>
  </modal>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
const MODAL_WIDTH = 750
export default {
  name: 'DialogError',
  props: {
    width: {
      type: [Number, String],
      default: 400
    },
    clickToClose: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String,
      default: 'fade'
    }
  },
  data () {
    return {
      errors: [],
      params: {},
      defaultButtons: [{ title: this.__t('Quay lại-mdc'), class: 'btn btn-warning pull-rigth' }],
      modalWidth: MODAL_WIDTH
    }
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
  },
  computed: {
    buttons () {
      return this.params.buttons || this.defaultButtons
    },
    /**
      * Returns FLEX style with correct width for arbitrary number of
      * buttons.
      */
    buttonStyle () {
      return {
        flex: `1 1 ${100 / this.buttons.length}%`
      }
    }
  },
  methods: {
    __label (masterData) {
      if (!masterData) {
        return 'N/A'
      }
      if (masterData['Code'] === 'IPDIAAUALLEANS') {
        masterData['ViName'] = 'Chi tiết dị ứng'
      }
      let locale = this.$i18n.locale
      if (locale === 'en') {
        return (masterData['EnName'] || 'N/A') + (storage.get('showmasterdatacode') ? ' ' + masterData['Code'] : '')
      }
      return (masterData['ViName'] || 'N/A') + (storage.get('showmasterdatacode') ? ' ' + masterData['Code'] : '')
    },
    go2Input (item) {
      this.$modal.hide('DialogError')
      if (!item.Code || !$('#' + item.Code).length) return
      setTimeout(() => {
        $('#content-wrap,html,#body-wrap').animate(
          {
            scrollTop: $('#' + item.Code).offset().top - 150
          },
          800
        )
      }, 500)
      setTimeout(() => {
        $('#' + item.Code).focus()
      }, 500)
    },
    beforeOpened (event) {
      window.addEventListener('keyup', this.onKeyUp)
      this.params = event.params || {}
      this.$emit('before-opened', event)
    },
    beforeClosed (event) {
      window.removeEventListener('keyup', this.onKeyUp)

      this.params = {}
      this.$emit('before-closed', event)
    },
    click (i, event, source = 'click') {
      const button = this.buttons[i]

      if (button && typeof button.handler === 'function') {
        button.handler(i, event, { source })
      } else {
        this.$modal.hide('DialogError')
      }
    },
    onKeyUp (event) {
      if (event.which === 13 && this.buttons.length > 0) {
        const buttonIndex =
          this.buttons.length === 1
            ? 0
            : this.buttons.findIndex(button => button.default)

        if (buttonIndex !== -1) {
          this.click(buttonIndex, event, 'keypress')
        }
      }
    },
    getNameError (name) {
      let nameError = ''
      if (name) {
        nameError = name
        if (name === 'T' || name === 'P' || name === 'M' || name === 'S' || name === 'AN' || name === 'D') {
          nameError = 'Số lượng dịch vào : ' + name
        }
        if (name === 'N' || name === 'Ph' || name === 'NT' || name === 'DL') {
          nameError = 'Số lượng dịch ra : ' + name
        }
        if (name === 'Chọn giá trị đường máu mao mạch') {
          nameError = 'Đường máu mao mạch'
        }
      }
      return nameError
    }
  }
}
</script>
<style>
.vue-dialog div {
  box-sizing: border-box;
}

.vue-dialog .dialog-flex {
  width: 100%;
  height: 100%;
}

.vue-dialog .dialog-content {
  flex: 1 0 auto;
  width: 100%;
  padding: 15px;
  font-size: 14px;
}

.vue-dialog .dialog-c-title {
  font-weight: 600;
  padding-bottom: 15px;
}

.vue-dialog .dialog-c-text {
}

.vue-dialog .vue-dialog-buttons {
  display: flex;
  flex: 0 1 auto;
  width: 100%;
  border-top: 1px solid #eee;
}

.vue-dialog .vue-dialog-buttons-none {
  width: 100%;
  padding-bottom: 15px;
}

.vue-dialog-button {
  font-size: 12px !important;
  background: transparent;
  padding: 0;
  margin: 0;
  border: 0;
  cursor: pointer;
  box-sizing: border-box;
  line-height: 40px;
  height: 40px;
  color: inherit;
  font: inherit;
  outline: none;
}

.vue-dialog-button:hover {
  background: rgba(0, 0, 0, 0.01);
}

.vue-dialog-button:active {
  background: rgba(0, 0, 0, 0.025);
}

.vue-dialog-button:not(:first-of-type) {
  border-left: 1px solid #eee;
}
</style>
