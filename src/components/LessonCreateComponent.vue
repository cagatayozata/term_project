<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Ders Ekle</h3>
      <form @submit.prevent="handleSubmitForm">
        <br>
        <div class="form-group">
          <label>Ders Adı</label>
          <input
            type="text"
            class="form-control"
            v-model="student.name"
            required
          />
        </div>
        <br>
        <div class="form-group">
          <label>Hedef Soru Sayısı</label>
          <input
            type="text"
            class="form-control"
            v-model="student.targetNumber"
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
        name: "",
        solvedNumber: 0,
        targetNumber: ""
      },
    };
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/addLesson";

      axios
        .post(apiURL, this.student)
        .then(() => {
          this.$router.push("/dersler");
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
