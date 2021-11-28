<template>
  <div>
    <div class="header">
      <v-row align="center">
        <v-col cols="12" sm="6">
         <v-select
              :items="hospitalDetails"
              dense
              @change="selectHospital()"
              filled
              item-text="hospitalname"
              label="Select hospital"
              color="white"
              return-object
            ></v-select>
        </v-col>
      </v-row>
    </div>
    <div class="headerContent">
    <div class="header">
      <v-row align="center" justify="space-between">
        <h1>Patient Management</h1>
        <v-dialog v-model="dialog" width="1200px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="white" v-bind="attrs" v-on="on" @click="showSaveBtn = true">
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
                <v-card border="top" elevation="4" color="red" dark width="200px" >
                  <v-card-title class="textnpm -center" >
                    <h3>ICU</h3><v-spacer></v-spacer>
                  </v-card-title>
                  <!--Avaliable bed value!-->
                  <v-card-subtitle class="text-center"><h2>8</h2>  Available Beds</v-card-subtitle>
                  <v-row justify="center">
                    <v-btn @click="dialog2 = !dialog2">Select Ward </v-btn>
                  </v-row>
                </v-card>
                <v-spacer></v-spacer>
                <v-card border="top" elevation="4" color="light-blue darken-3" dark width="200px">
                  <v-card-title class="justify-center">
                    <h3>Ward A</h3><v-spacer></v-spacer>
                  </v-card-title>
                  <!--Avaliable bed value!-->
                  <v-card-subtitle class="text-center"><h2>8</h2>   Available Beds</v-card-subtitle>
                  <v-row justify="center">
                    <v-btn @click="dialog2 = !dialog2">Select Ward </v-btn>
                  </v-row>
                </v-card>
                <v-spacer></v-spacer>
                 <v-card border="top" elevation="4" color="light-blue darken-3" dark width="200px">
                  <v-card-title class="justify-center">
                    <h3>Ward B1</h3><v-spacer></v-spacer>
                  </v-card-title>
                  <!--Avaliable bed value!-->
                  <v-card-subtitle class="text-center"><h2>8</h2>   Available Beds</v-card-subtitle>
                  <v-row justify="center">
                    <v-btn @click="dialog2 = !dialog2">Select Ward </v-btn>
                  </v-row>
                </v-card>
                <v-spacer></v-spacer>
                 <v-card border="top" elevation="4" color="light-blue darken-3" dark width="200px">
                  <v-card-title class="justify-center">
                    <h3>Ward B2</h3><v-spacer></v-spacer>
                  </v-card-title>
                  <!--Avaliable bed value!-->
                  <v-card-subtitle class="text-center"><h2>8</h2>  Available Beds</v-card-subtitle>
                  <v-row justify="center">
                    <v-btn @click="dialog2 = !dialog2">Select Ward </v-btn>
                  </v-row>
                </v-card>
                <v-spacer></v-spacer>
                 <v-card border="top" elevation="4" color="light-blue darken-3" dark width="200px">
                  <v-card-title class="justify-center">
                    <h3>Ward C</h3><v-spacer></v-spacer>
                  </v-card-title>
                  <!--Avaliable bed value!-->
                  <v-card-subtitle class="text-center"><h2>8</h2>  Available Beds</v-card-subtitle>
                  <v-row justify="center">
                    <v-btn @click="dialog2 = !dialog2">Select Ward </v-btn>
                  </v-row>
                </v-card>
                
              </v-flex><br/>
              <v-row justify="end">
                    <v-btn @click="dialog = false" text color="green">Close </v-btn>
                  </v-row>
            </v-container>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog2">
          <v-card>
            <v-card-title>
            <span class="text-h5">Patient Information</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6"  md="4">
                  <v-text-field label="Hospital*" disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"  md="4">
                  <v-text-field label="Ward*" disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Name" hint="Patient's Full Name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <label for="admissiondatepicker">Admission Date</label>
                  <!-- Date not working yet!-->
                  <datepicker :value="date" @click="selectAdmissionDate()" border="top" required></datepicker>
                  <small>Admission Date:{{ admissiondateval }}</small>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <label for="dischargedatepicker">Discharged Date</label>
                  <!-- Date not working yet!-->
                  <datepicker :value="date" @click="selectAdmissionDate()"></datepicker>
                  <small>*Do not enter date if patient is yet to be Discharged:{{ dischargedate }}</small>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select :items="['Swab Negative', 'Mild Symptoms', 'Moderate Symptoms', 'Severe Symptoms']" label="Status*" required></v-select>
                </v-col>
                
              </v-row>
                  <v-divider inset></v-divider>
                  <br/>
                  <h2>Next Of Kin (NOK) Information</h2>
              <v-row>
                  <v-col cols="12" sm="6" md="4">
                     <v-text-field label="nokName" hint="Next of Kin's Full Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                     <v-text-field label="nokContact" hint="Next of Kin's Contacts" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                     <v-text-field label="nokEmail" hint="Next of Kin's Email" required></v-text-field>
                  </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="dialog2 = false;"> Close</v-btn>
            <v-btn v-show="showSaveBtn" color="green" @click="dialog2 = false; dialog = false; alertsuccess = true" @> Save </v-btn>
          </v-card-actions>
        </v-card>
        <v-alert v-model="alertsuccess" border="bottom" color="green lighten-3" dark>
          Patient added successfully.
        </v-alert>
        </v-dialog>
          
      </v-row>
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
</div>
     <v-flex class="hospitaltable">
      <v-row>
        <v-col cols="8">
          <v-data-table :headers="headers" :items="patientdata" :search="search" class="elevation-1">
          <template v-slot:top>
            <v-toolbar dark dense>
              <v-toolbar-title>Patient Information</v-toolbar-title>
            </v-toolbar>
            <v-text-field
                v-model="search"
                label="Search"
                class="mx-4"
              ></v-text-field>  
              
          </template>
          <!-- <template   v-slot:[`item.actions`]="{ item }"> !-->
          <template v-slot:[`item.actions`]>
            <v-icon small class="mr-2" @click="dialog2 = !dialog2"> mdi-pencil </v-icon>
            <v-icon small  @click="dialog2 = !dialog2; showSaveBtn = !showSaveBtn "> mdi-dots-horizontal </v-icon>
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
import Datepicker from 'vuejs-datepicker'

export default {
  name:'Patient',
  components: {
    Datepicker
    
  },
  data() {
    return {
      dialog: false,
      dialog2:false,
      showSaveBtn: false,
      date:'',
      admissiondateval:'',
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
        { text: 'Status', value: 'statusno' },
        { text: 'NOK Name', value: 'kin' },
        { text: 'NOK Contacts', value: 'kinContact' },
         { text: 'Actions', value: 'actions', sortable: false },
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
    },
    
    selectAdmissionDate() {
      this.admissiondateval = this.date;
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