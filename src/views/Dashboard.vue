<template>
<v-main>
  <v-flex class="overview">
    <v-spacer></v-spacer>
    <v-card ripple shaped elevation="4" color="rgb(233,30,99)" dark width="248px">
      <v-card-title background="rgb(205,26,87)">
        <h3>ADMITTED</h3><v-spacer></v-spacer><v-icon>mdi-heart-plus-outline</v-icon>
      </v-card-title>
      <v-card-subtitle>{{ availbedcount }} Patients </v-card-subtitle>
      <v-card-text><v-icon>mdi-arrow-up</v-icon>{{recentadmitted}} for this week</v-card-text>
    </v-card>
    
    <v-spacer></v-spacer>
    <v-card ripple shaped elevation="4" color="rgb(139,195,74)" dark  width="248px">
      <v-card-title>
        <h3>DISCHARGED</h3><v-spacer></v-spacer><v-icon>mdi-account-heart</v-icon>
      </v-card-title>
      <v-card-subtitle>{{ patientdischargenumthisweek }} Patients </v-card-subtitle>

      <v-card-text><v-icon v-if="(patientdischargenumlastweek - patientdischargenumthisweek)>0">mdi-arrow-down</v-icon><v-icon v-if="(patientdischargenumlastweek - patientdischargenumthisweek)<0">mdi-arrow-up</v-icon>{{Math.abs(patientdischargenumlastweek - patientdischargenumthisweek)}} since last week</v-card-text>
    </v-card>

    <v-spacer></v-spacer>
    <v-card ripple shaped elevation="4" color="rgb(0,188,212)" dark width="248px">
      <v-card-title>
        <h3>ALL</h3><v-spacer></v-spacer><v-icon>mdi-bed</v-icon>
      </v-card-title>
      <v-card-subtitle
        >
        {{
          Math.round(fullbedcount / (parseInt(availbedcount)+parseInt(fullbedcount)) * 100)
        }}% Bed Occupied
      </v-card-subtitle>
      <v-card-text><v-icon>mdi-history</v-icon> Updated recently</v-card-text>
    </v-card>
    <v-spacer></v-spacer>
    <v-card ripple shaped elevation="4" color="rgb(255,152,0)" dark width="248px">
      <v-card-title>
      <h3>ICU</h3><v-spacer></v-spacer><v-icon>mdi-alert-box</v-icon>
      </v-card-title>
      <v-card-subtitle
        >{{
            Math.round(fullicubedcount / (parseInt(availicubedcount)+parseInt(fullicubedcount)) * 100)      
        }}% Beds Occupied
      </v-card-subtitle>
      <v-card-text><v-icon>mdi-history</v-icon> Updated recently</v-card-text>
    </v-card>
    <v-spacer></v-spacer>
  </v-flex>
  <v-flex class="hospitaltable" size-8>
    
    <v-data-table
      :headers="tableheaders"
      :items="tabledata"
      class="elevation-1"
      dense
      :search="search"
    >
    <template v-slot:top>
      <v-data-table-header>
        Test
      </v-data-table-header>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
          ></v-text-field>
        </template>
      <template v-slot:items="props">

        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </template>
    </v-data-table>
  </v-flex>
      
  
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      availbedcount: null,
      search: '',
      fullbedcount: null,
      fullicubedcount: null,
      availicubedcount: null,
      patientdischargethisweek:[],
      patientdischargenumthisweek: null,
      patientdischargelastweek:[],
      patientdischargenumlastweek: null,
      recentadmitted:null,
      tableheaders: [
        {
          text: 'Hospital Name',
          align: 'left',
          sortable: false,
          value: 'hospital'
        },
        { text: 'Beds', value: 'bed.length' },
        { text: 'ICU Beds', value: 'icu' },
        { text: 'Occupancy Status', value: 'status'},
        { text: 'No. of Patients', value: 'patients' },
        { text: 'No. of Staff', value: 'staff' },
      ],
      tabledata: [],
      hospitaldata: [],
    };
  },
  mounted() {
    this.getBeds();
    this.getICUBeds();
    this.getDischarged();
    this.getrecentadmitted();
  },
  
  methods: {
    
    async getBeds() {
      await axios
        .get("http://localhost:5000/db/bedstatus")
        .then((response) => {
          this.availbedcount = response.data[0]['total'];
          this.fullbedcount = response.data[1]['total'];
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async getICUBeds() {
      await axios
        .get("http://localhost:5000/db/icubedstatus")
        .then((response) => {
          this.availicubedcount = response.data[0]['total'];
          this.fullicubedcount = response.data[1]['total'];
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async getrecentadmitted() {
      await axios
        .get("http://localhost:5000/db/recentadmit")
        .then((response) => {
          this.recentadmitted = response.data.length;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async getDischarged() {
        let d = new Date();
        d.setDate(d.getDate()-7);
        this.patientdischargenumthisweek = 0;
        this.patientdischargenumlastweek = 0;

      await axios
        .get("http://localhost:5000/db/alldischarge")
        .then((response) => {
          for(let i = 0; i < response.data.length ; i ++){
            if(new Date(response.data[i]['dischargedate']) >= d){
              this.patientdischargethisweek.push(response.data[i])
              this.patientdischargenumthisweek ++;
            }else{
              this.patientdischargelastweek.push(response.data[i])
              this.patientdischargenumlastweek ++;
            }
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },


  },
};
</script>

<style scoped>
.header {
  margin: 24px;
}

.overview {
  display: flex;
  flex-direction: row;
  margin: 24px;
}

</style>