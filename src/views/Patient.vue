<template>
  <div>
    <div class="header">
      <v-row align="center" justify="space-between">
        <h1>Patient Management</h1>
        <v-dialog v-model="dialog" width="1200px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-4" v-bind="attrs" v-on="on">
              Add patients<v-icon>mdi-plus-box-outline</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>    
              <span class="text-h5">Select Ward</span>
            </v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select label="Hospital" outlined :items="hospitalDetails" name="hospital" item-text="hospitalname"></v-select>
                </v-col>
              </v-row>
              <v-flex class="wardOverview">
                <v-card border="top" elevation="4" color="red" dark width="150px">
                  <v-card-title background="rgb(205,26,87)"  class="textnpm -center">
                    <h3>ICU</h3><v-spacer></v-spacer>
                  </v-card-title>
                  <!--Avaliable bed value!-->
                  <v-card-subtitle class="text-center">8 <br/> Available Beds</v-card-subtitle>
                </v-card>
                <v-spacer></v-spacer>
                <v-card border="top" elevation="4" color="red" dark width="200px">
                  <v-card-title background="rgb(205,26,87)" class="justify-center">
                    <h3>Ward A</h3><v-spacer></v-spacer>
                  </v-card-title>
                  <!--Avaliable bed value!-->
                  <v-card-subtitle class="text-center">7 Available Beds</v-card-subtitle>
                </v-card>
                <v-spacer></v-spacer>
                 <v-card border="top" elevation="4" color="red" dark width="200px">
                  <v-card-title background="rgb(205,26,87)" class="justify-center">
                    <h3>Ward B1</h3><v-spacer></v-spacer>
                  </v-card-title>
                  <!--Avaliable bed value!-->
                  <v-card-subtitle class="text-center">8 Available Beds</v-card-subtitle>
                </v-card>
                <v-spacer></v-spacer>
                 <v-card border="top" elevation="4" color="red" dark width="200px">
                  <v-card-title background="rgb(205,26,87)" class="justify-center">
                    <h3>Ward B2</h3><v-spacer></v-spacer>
                  </v-card-title>
                  <!--Avaliable bed value!-->
                  <v-card-subtitle class="text-center">8 Available Beds</v-card-subtitle>
                </v-card>
                <v-spacer></v-spacer>
                 <v-card border="top" elevation="4" color="red" dark width="200px">
                  <v-card-title background="rgb(205,26,87)" class="justify-center">
                    <h3>Ward C</h3><v-spacer></v-spacer>
                  </v-card-title>
                  <!--Avaliable bed value!-->
                  <v-card-subtitle class="text-center">8 Available Beds</v-card-subtitle>
                </v-card>
                
              </v-flex>
            </v-container>
          </v-card>
        </v-dialog>
      </v-row>
      <!--<v-btn class="addBtn" color="red lighten-3" align="center">
        Add Patients<v-icon>mdi-plus-box-outline</v-icon>
        </v-btn>
        
        <v-card-title>
            <span class="text-h5">Patient Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6"  md="4">
                  <v-text-field label="Patient Full name*" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"  md="4">
                  <v-text-field
                    label="Legal middle name"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"  md="4">
                  <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
    
    Avaliable bed value!-->
    
    </div>
    <v-flex class="overview">
      <v-card ripple shaped border="top" elevation="4" color="rgb(0,188,212)" dark width="280px">
        <v-card-title background="rgb(205,26,87)">
          <h3>32 Beds</h3><v-spacer></v-spacer><v-icon>mdi-bed-outline</v-icon>
        </v-card-title>
        <!--Avaliable bed value!-->
        <v-card-subtitle>Number of Available Beds</v-card-subtitle>
        <v-card-text><v-icon>mdi-arrow-up</v-icon>{{recentadmitted}} for this week</v-card-text>
      </v-card>

      <v-spacer></v-spacer>
      
      <v-card shaped border="top" elevation="4" color="rgb(139,195,74)" dark width="280px">
        <v-card-title background="rgb(205,26,87)">
          <h3>21 Patients</h3><v-spacer></v-spacer><v-icon>mdi-account-heart</v-icon>
        </v-card-title>
        <v-card-subtitle>Ready to be discharged</v-card-subtitle>
        <v-card-text><v-icon>mdi-arrow-up</v-icon>{{recentadmitted}} for this week</v-card-text>
      </v-card>
      <v-spacer></v-spacer>

      <v-card shaped border="top" elevation="4" color="rgb(255,152,0)" dark width="280px">
        <v-card-title background="rgb(205,26,87)">
          <h3>3 </h3><v-spacer></v-spacer><v-icon>mdi-swap-horizontal</v-icon>
        </v-card-title>
        <v-card-subtitle>Possible relocation </v-card-subtitle>
        <v-card-text><v-icon>mdi-arrow-up</v-icon>{{recentadmitted}} for this week</v-card-text>
      </v-card>
    </v-flex>

     <v-flex class="hospitaltable">
      <v-row>
        <v-col cols="8">
          <v-data-table :headers="headers" :items="patientdata" class="elevation-1">
          <template v-slot:top>
            <v-toolbar dark dense>
              <v-toolbar-title>Patient Information</v-toolbar-title>
            </v-toolbar>
          </template>

            <template v-slot:items="props">
              <td>{{ props.item.patientname }}</td>
              <td class="text-xs-right">{{ props.item.admissiondate }}</td>
              <td class="text-xs-right">{{ props.item.discharge }}</td>
              <td class="text-xs-right">{{ props.item.dischargedate }}</td>
              <td class="text-xs-right">{{ props.item.discharge }}</td>
            </template>
          </v-data-table>
        </v-col>
         <v-col cols="4">
          <v-card tile class="mx-auto" max-width="500">
            <v-toolbar dark dense>
              <v-toolbar-title>Patient Possible Relocation</v-toolbar-title>
            </v-toolbar>
            <v-list-item-content>
              <v-list-item-subtitle>Patient ID</v-list-item-subtitle>
              <v-list-item-subtitle>Current Ward</v-list-item-subtitle>
              <v-list-item-subtitle>Status</v-list-item-subtitle>
              <v-list-item-subtitle>Possible Relocation</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content >
              <v-list-item-subtitle>#1000</v-list-item-subtitle>
              <v-list-item-subtitle>Ward B1</v-list-item-subtitle>
              <v-list-item-subtitle>Severe</v-list-item-subtitle>
              <v-list-item-subtitle>ICU</v-list-item-subtitle>
            </v-list-item-content>
          </v-card>
        </v-col>
      </v-row>
      
     </v-flex>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'Patient',
  components: {
    
  },
  data() {
    return {
      dialog: false,
      hospital: null,
      hospitalDetails:[],
      patientdata: [],
      headers: [
        {
          text: 'Patient Name',
          align: 'left',
          sortable: false,
          value: 'patientname'
        },
        { text: 'ID', value: 'patientid' },
        { text: 'Admission Date', value: 'admissiondate' },
        { text: 'Discharge Date', value: 'dischargedate' },
        { text: 'Status Description', value: 'statusno' },
        // { text: 'Next of Kin', value: 'kin' }
      ],
    }
  },
  created() {
    this.getPatients()
    this.getHospital()
  },
  methods: {
    async getPatients(){
      await axios.get("http://localhost:5000/patient/all")
    .then(response => {
      console.log(response.data)
      this.patientdata = response.data
    })
    .catch(error => {
      this.errorMessage = error.message;
      console.error("There was an error!", error);
    });
    },
     async getHospital(){
       await axios.get("http://localhost:5000/hos/all")
    .then(response => {
      console.log(response.data)
      this.hospitalDetails = response.data
     // this.hospitalDetails.push(response.data[i])
      
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
.overview {
  display: flex;
  flex-direction: row;
  margin: 24px;
}

.wardOverview{
  display:flex;
  flex-direction: row;
  margin: 24px;
}

.addBtn{
    justify-content: flex-end;
    margin: 24px;
}
</style>