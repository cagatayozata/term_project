<template>
  <div>
    <!-- Nav bar -->
    <nav
      class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row"
    >
      <div class="container">
        <a class="navbar-brand float-left"><router-link to="/">Çağatay ÖZATA Bitirme Projesi</router-link></a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/ders/ekle"
              >Yeni Ders</router-link
            >
          </li> &nbsp; &nbsp; &nbsp; &nbsp; 
          <li class="nav-item">
            <router-link class="nav-link" to="/">Dersleri Listele</router-link>
          </li> &nbsp; &nbsp; &nbsp; &nbsp; 
        </ul>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>