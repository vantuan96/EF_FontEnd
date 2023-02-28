<template>
  <div class="login-box">
    <div class="login-box-body">
      <!-- Main content -->
      <section class="content" style="min-height: 0px;">
        <!-- Content will be placed here -->
        <slot/>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout',
  beforeCreate () {
    document.body.className = 'login-page'
  }
}
</script>
