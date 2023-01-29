<template>
  <div class="row">
    <div class="col-md-12">
      <h3 class="text-center">{{ $route.params.name }} Dersi Çözüm Geçmişi</h3><br>
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Tarih</th>
            <th>Çözülen Soru Sayısı</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in Students2" :key="student._id">
            <td>{{ student.date }}</td>
            <td>{{ student.solvedNumber }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Students: [],
      Students2: [],
    };
  },
  created() {
    let apiURL = `http://localhost:4000/api/gecmis/${this.$route.params.name}`;
    axios
      .get(apiURL)
      .then((res) => {
        this.Students = res.data;
        this.Students2 = res.data[0].solutions
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteStudent(id) {
      let apiURL = `http://localhost:4000/api/deleteLesson/${id}`;
      let indexOfArrayItem = this.Students.findIndex((i) => i._id === id);

      if (window.confirm("Ders silinecektir. Bu işlemi gerçekleştirmek istediğinize emin misiniz?")) {
        axios
          .delete(apiURL)
          .then(() => {
            this.Students.splice(indexOfArrayItem, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
.btn-success {
  margin-right: 10px;
}
</style>
