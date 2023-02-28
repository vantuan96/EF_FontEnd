<template>
  <footer class="main-footer">
    <div class="container">
      <strong class="btn color-white">Copyright © 2019 <a class="" href="https://vinmec.com">Vinmec</a></strong>
      <button v-shortkey="['arrowup']" @shortkey="scroll2Top()" @click="scroll2Top()" id="go-to-top" class="btn v-yellow-btn" title="Go to top"><i class="fa fa-arrow-circle-up" aria-hidden="true"></i> {{__t('Lên đầu trang')}}</button>
      <strong class="pull-right btn"><a style="color: #fff" target="_blank" href="https://vingroupjsc.sharepoint.com/sites/DR-VinMec/vmkht/vmcntt/tltk/Forms/Items.aspx?RootFolder=%2Fsites%2FDR%2DVinMec%2Fvmkht%2Fvmcntt%2Ftltk%2Fbieumau%2Ftlhdsd%2Fhdeform&FolderCTID=0x012000C7D06E1583C27D4D87181C7B29A9A99C&View=%7B65FA7BCF%2D5F5E%2D47E6%2D8FC4%2D5D87B2E98534%7D"><i class="fa fa-question-circle" aria-hidden="true"></i> {{__t('Hướng dẫn sử dụng')}}</a></strong>
    </div>
    <!-- /.container -->
  </footer>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'Footer',
  mixins: [],
  data () {
    return {
    }
  },
  watch: {
  },
  created () {
    window.onscroll = () => {
      this.scrollFunction()
    }
  },
  methods: {
    scrollFunction () {
      var btn = $('#go-to-top')
      if ($(window).scrollTop() > 300) {
        btn.addClass('show')
      } else {
        btn.removeClass('show')
      }
    }
  }
}
</script>
