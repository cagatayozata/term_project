<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">{{ $route.params.name }} Dersi Çözüm Ekle</h3>
      <form @submit.prevent="handleSubmitForm">
        <br>
        <div class="form-group">
          <label>Ders Adı</label>
          <input
            type="text"
            class="form-control"
            v-model="student.name"
            required
            disabled
          />
        </div>
        <br>
        <div class="form-group">
          <label>Çözülen Soru Sayısı</label>
          <input
            type="text"
            class="form-control"
            v-model="student.solvedNumber"
            required
          />
        </div>

        <div class="form-group">
          <br><button class="btn btn-danger btn-block">Ekle</button>
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
      student: {
        name: this.$route.params.name,
        solvedNumber: "",
      },
    };
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/addSolution";

      axios
        .post(apiURL, this.student)
        .then(() => {
          let url = '/gecmis/' + this.$route.params.name
          this.$router.push(url);
          this.student = {
            name: "",
            solvedNumber: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
