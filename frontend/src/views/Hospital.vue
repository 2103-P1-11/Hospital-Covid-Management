<template>
<div>
  <div class="header">
    <h1>Hospital Management</h1>
  </div>
  <table>
    <!-- <tr>
    <th>
      Select * from hospital
    </th>
    </tr> -->
    <tr>
      <th>
        Id
      </th>
      <th>
        name
      </th>
      <th>
        address
      </th>
      <th>
        postal code
      </th>
      </tr>
      <!-- {{hospitaldata}} -->
    <tr v-for="hospital in hospitaldata" :key="hospital.hospitalid">
      <td>
        {{hospital.hospitalid}}
      </td>
      <td>
         {{hospital.hospitalname}}
      </td>
      <td>
         {{hospital.address}}
      </td>
      <td>
        {{hospital.postalcode}}
      </td>
    </tr>
  </table>

  <label for="hospital">Choose a hospital:</label>

<select name="hospital" id="hospital" v-model="answer" placeholder="Choose Hospital">
  <option  v-for="hospital in hospitaldata" :key="hospital.hospitalid" :value="hospital.hospitalid">{{hospital.hospitalname}}</option>
</select>
<div>
You selected {{answer}}
</div>

<label for="fname" autocomplete="false">First name:</label>
  <input type="text" v-model="test" name="fname">

  {{test}}

  <button @click="methodOne()">Click me</button>

  
  </div>
</template>

<script>
import axios from "axios";

export default {
  name:'Hospital',
  components: {
    
  },
  data() {
    return {
      hospitaldata: [],
      answer: '',
      test:'',
      
    }
  },
  mounted() {
    this.getData()
    
  },
  methods: {
    async getData(){
      await axios.get("http://localhost:5000/hos/all")
    .then(response => {
      console.log(response.data)
      this.hospitaldata = response.data
    })
    .catch(error => {
      this.errorMessage = error.message;
      console.error("There was an error!", error);
    });
    },
    methodOne(){
      console.log(this.test)
    }
  },
}
</script>

<style scoped>
.header{
    margin:24px;
}
</style>