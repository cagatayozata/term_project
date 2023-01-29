<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">{{ $route.params.name }} Dersini Güncelleme</h3>
      <form @submit.prevent="handleUpdateForm">
        <br>
        <div class="form-group">
          <label>Ders Adı</label>
          <input
            type="text"
            class="form-control"
            v-model="$route.params.name"
            required
            disabled
          />
        </div>
        <br>
        <div class="form-group">
          <label>Hedef Soru Sayısı</label>
          <input
            type="texr"
            class="form-control"
            v-model="student.targetNumber"
            required
          />
        </div>
        <br>
        <div class="form-group">
          <button class="btn btn-danger btn-block">Güncelle</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      student: {},
    };
  },
  created() {
    let apiURL = `http://localhost:4000/api/edit-student/${this.$route.params.id}`;

    axios.get(apiURL).then((res) => {
      this.student = res.data;
    });
  },
  methods: {
    handleUpdateForm() {
      let apiURL = `http://localhost:4000/api/update-student/${this.$route.params.id}`;

      axios
        .put(apiURL, this.student)
        .then((res) => {
          console.log(res);
          this.$router.push("//all");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
n