<template>
    <header class="main-header">
        <!-- Logo -->
        <a class="logo" href="../../index2.html">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini">
                <b>
                    TH
                </b>
                A
            </span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg">
                <b>
                    TH Shop
                </b>
                Admin
            </span>
        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">
            <!-- Sidebar toggle button-->
            <a class="sidebar-toggle" data-toggle="push-menu" href="#" role="button">
                <span class="sr-only">
                    Toggle navigation
                </span>
                <span class="icon-bar">
                </span>
                <span class="icon-bar">
                </span>
                <span class="icon-bar">
                </span>
            </a>
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li>
                        <a data-toggle="control-sidebar" href="#">
                            <i class="fa fa-gears">
                            </i>
                        </a>
                    </li>
                    <li>
                        <a data-toggle="control-sidebar" @click="logout">
                            <i class="fa fa-sign-out">
                            </i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>
<script>
export default {
  name: 'Header',
  methods: {
    /**
     * Will log the user in.
     *
     * @param {Object} user The user to be logged in.
     */
    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
