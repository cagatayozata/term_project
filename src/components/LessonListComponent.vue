<template>
  <div class="row">
    <div class="col-md-12">
      <h3 class="text-center">Dersler</h3>              
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Ders Adı</th>
            <th>Çözülen Soru Sayısı</th>
            <th>Hedef Soru Sayısı</th>
            <th>Hedef Tamamlanma Durumu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in Students" :key="student._id">
            <td>{{ student.name.toUpperCase() }}</td>
            <td>{{ findSum(student.solutions) }}</td>
            <td>{{ student.targetNumber }}</td>
            <td><span class="glyphicon">{{ determineTarget(findSum(student.solutions), student.targetNumber) }}</span></td>
            <td>
              <router-link
                :to="{ name: 'addSolution', params: { name: student.name } }"
                class="btn btn-success"
                >Çözüm Ekle
              </router-link> &nbsp; &nbsp; &nbsp; &nbsp; 
              <router-link
                :to="{ name: 'solutionHistory', params: { name: student.name } }"
                class="btn btn-primary"
                >Çözüm Geçmişini Listele
              </router-link> &nbsp; &nbsp; &nbsp; &nbsp; 
              <button
                @click.prevent="deleteStudent(student._id)"
                class="btn btn-danger"
              >
                Dersi Sil
              </button>
            </td>
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
    };
  },
  created() {
    let apiURL = `http://localhost:4000/api/gecmis/all`;
    axios
      .get(apiURL)
      .then((res) => {
        this.Students  = res.data
        console.log(this.Students);

      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    determineTarget(current, target) {

      if (current <= target) {
        return 'Devam Ediyor...'
      } else {
        return 'Hedef Tamamlandı!'
      }

    },
    findSum(arr) {
      const cgt = arr.reduce((accumulator, object) => {
        console.log("girdi2")
        console.log(accumulator + object.solvedNumber)
        return accumulator + object.solvedNumber;
      }, 0);
      return cgt
    },
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
