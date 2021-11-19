<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--9">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Hospitals</h3>
            </div>
            <div class="card-body">
              <div class="row" style="text-align:center;">
                <div class="col-8 form-group justify-content center">
                  <label for="hospitalSelect"><h2>Select a hospital:</h2></label>
                  <select class="form-control" id="hospitalSelect" v-for="item in itemarray" :key="item">
                    <option>{{item}}</option>
                    <!-- <option>Hospital 2</option>
                    <option>Hospital 3</option>
                    <option>Hospital 4</option>
                    <option>Hospital 5</option> -->
                  </select>
                  <a @click="
                this.$router.push({
                  name: 'hospitalsMain',
                })
              " class="btn btn-primary mt-4">Proceed</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";


export default {
  data() {
    return {
      items:['Hospital 1','Hospital 2','Hospital 3','Hospital 4','Hospital 5']
    };
  },
  // mounted() {
  //   axios.get("http://localhost:5000/bed/getallbeds%22")
  //   .then(response => {
  //     console.log(response.data)
  //     this.contents = response.data
  //   })
  //   .catch(error => {
  //     this.errorMessage = error.message;
  //     console.error("There was an error!", error);
  //   });
  // },

  methods: {
    onCopy(el) {
      var test = document.getElementById(el);
      test.select();
      document.execCommand("copy");
    },
  },
};
</script>

<style></style>
