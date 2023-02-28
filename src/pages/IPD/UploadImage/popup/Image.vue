<template>
  <div class="boxImage mt-10">
  <div style="cursor:pointer; background: red;">
    <div class="boxImage-wrapper">
    <img @click="handleViewImange" class="boxImage-item" style="object-fit: contain; height: 200px;width: 280px; cursor:pointer; position: relative;" src="http://10.115.40.75:8110/UploadFiles/Images/Temp/28-10-2022/33ae61d7-4d6b-49bc-91fb-6f1bd8d98f23/jpg"/>
    <i @click="handleDeleteImage(url)" class="fa fa-times" style="position: absolute; right: 15px; top: 15px;" aria-hidden="true"></i>
    <i class="fa fa-search-plus search-hover" style="position: absolute; top: 45%; left: 50%;" aria-hidden="true"></i>
    </div>
  </div>
  </div>
</template>
<script>
// import methods from '../../../../lib/V-Suggest/mixins/methods'
import UploadFileService from '@/services/IPD/UploadFileService'
export default {
  name: 'ImageComponent',
  props: ['url'],
  data () {
    return {
      urlImage: 'http://10.115.40.75:8110/UploadFiles/Images/Temp/28-10-2022/33ae61d7-4d6b-49bc-91fb-6f1bd8d98f23/jpg'
    }
  },
  methods: {
    handleViewImange () {
      this.$emit('openView')
    },
    handleDeleteImage () {
      console.log('urlimage', this.urlImage)
      new UploadFileService(this.urlImage).update('File/DeleteFile').then(response => {
        console.log('xóa file', response)
        this.$emit('deleteFile', this.urlImage)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .search-hover {
    display: none;
  }
  .boxImage-item:hover {
    .search-hover {
      display: block;
    }
  }
</style>
