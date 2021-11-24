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
    <v-container background-color="white">test</v-container>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      
    >
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
      fullbedcount: null,
      fullicubedcount: null,
      availicubedcount: null,
      patientdischargethisweek:[],
      patientdischargenumthisweek: null,
      patientdischargelastweek:[],
      patientdischargenumlastweek: null,
      recentadmitted:null,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
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
    toggle (index) {
      const i = this.selected.indexOf(index)

      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    }
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