<template>
  <v-main>
    <v-flex class="overview">
      <v-spacer></v-spacer>
      <v-card
        ripple
        shaped
        elevation="4"
        color="rgb(233,30,99)"
        dark
        width="248px"
      >
        <v-card-title background="rgb(205,26,87)">
          <h3>ADMITTED</h3>
          <v-spacer></v-spacer><v-icon>mdi-heart-plus-outline</v-icon>
        </v-card-title>
        <v-card-subtitle>{{ availbedcount }} Patients </v-card-subtitle>
        <v-card-text
          ><v-icon>mdi-arrow-up</v-icon>{{ recentadmitted }} for this
          week</v-card-text
        >
      </v-card>

      <v-spacer></v-spacer>
      <v-card
        ripple
        shaped
        elevation="4"
        color="rgb(139,195,74)"
        dark
        width="248px"
      >
        <v-card-title>
          <h3>DISCHARGED</h3>
          <v-spacer></v-spacer><v-icon>mdi-account-heart</v-icon>
        </v-card-title>
        <v-card-subtitle
          >{{ patientdischargenumthisweek }} Patients
        </v-card-subtitle>

        <v-card-text
          ><v-icon
            v-if="patientdischargenumlastweek - patientdischargenumthisweek > 0"
            >mdi-arrow-down</v-icon
          ><v-icon
            v-if="patientdischargenumlastweek - patientdischargenumthisweek < 0"
            >mdi-arrow-up</v-icon
          >{{
            Math.abs(patientdischargenumlastweek - patientdischargenumthisweek)
          }}
          since last week</v-card-text
        >
      </v-card>

      <v-spacer></v-spacer>
      <v-card
        ripple
        shaped
        elevation="4"
        color="rgb(0,188,212)"
        dark
        width="248px"
      >
        <v-card-title>
          <h3>ALL</h3>
          <v-spacer></v-spacer><v-icon>mdi-bed</v-icon>
        </v-card-title>
        <v-card-subtitle>
          {{
            Math.round(
              (fullbedcount /
                (parseInt(availbedcount) + parseInt(fullbedcount))) *
                100
            )
          }}% Bed Occupied
        </v-card-subtitle>
        <v-card-text><v-icon>mdi-history</v-icon> Updated recently</v-card-text>
      </v-card>
      <v-spacer></v-spacer>
      <v-card
        ripple
        shaped
        elevation="4"
        color="rgb(255,152,0)"
        dark
        width="248px"
      >
        <v-card-title>
          <h3>ICU</h3>
          <v-spacer></v-spacer><v-icon>mdi-alert-box</v-icon>
        </v-card-title>
        <v-card-subtitle
          >{{
            Math.round(
              (fullicubedcount /
                (parseInt(availicubedcount) + parseInt(fullicubedcount))) *
                100
            )
          }}% Beds Occupied
        </v-card-subtitle>
        <v-card-text><v-icon>mdi-history</v-icon> Updated recently</v-card-text>
      </v-card>
      <v-spacer></v-spacer>
    </v-flex>
    
    <v-flex class="hospitaltable">
      <v-row>
      <v-col cols="8">
      <v-data-table
        :headers="tableheaders"
        :items="tabledata"
        class="elevation-1"
        dense
        :search="search"
      >
        <template v-slot:top>
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
      </v-col>
      <v-col cols="4">
        <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-list>
        <v-list-item-group v-model="model">
          <v-list-item-title>
            Test
          </v-list-item-title>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
        </v-col>
    </v-row>
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
      items: [
      {
        icon: 'mdi-inbox',
        text: 'Inbox',
      },
      {
        icon: 'mdi-star',
        text: 'Star',
      },
      {
        icon: 'mdi-send',
        text: 'Send',
      },
      {
        icon: 'mdi-email-open',
        text: 'Drafts',
      },
    ],
    model: 1,
      availbedcount: null,
      search: "",
      fullbedcount: null,
      fullicubedcount: null,
      availicubedcount: null,
      patientdischargethisweek: [],
      patientdischargenumthisweek: null,
      patientdischargelastweek: [],
      patientdischargenumlastweek: null,
      recentadmitted: null,
      tableheaders: [
        {
          text: "Hospital Name",
          align: "left",
          sortable: false,
          value: "hospital",
        },
        { text: "Available Beds", value: "bed" },
        { text: "ICU Beds", value: "icu" },
        { text: "Occupancy Status", value: "status" },
        { text: "No. of Patients", value: "patient" },
        { text: "No. of Staff", value: "staff" },
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
    this.gethospitalinfo();
  },

  methods: {
    async getBeds() {
      await axios
        .get("http://localhost:5000/db/bedstatus")
        .then((response) => {
          this.availbedcount = response.data[0]["total"];
          this.fullbedcount = response.data[1]["total"];
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
          this.availicubedcount = response.data[0]["total"];
          this.fullicubedcount = response.data[1]["total"];
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
      d.setDate(d.getDate() - 7);
      this.patientdischargenumthisweek = 0;
      this.patientdischargenumlastweek = 0;

      await axios
        .get("http://localhost:5000/db/alldischarge")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            if (new Date(response.data[i]["dischargedate"]) >= d) {
              this.patientdischargethisweek.push(response.data[i]);
              this.patientdischargenumthisweek++;
            } else {
              this.patientdischargelastweek.push(response.data[i]);
              this.patientdischargenumlastweek++;
            }
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async gethospitalinfo() {
      await axios
        .get("http://localhost:5000/db/hospitalinfo")
        .then((response) => {
          this.hospitaldata = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

      let data = {
        availbed: 0,
        totalbed: 0,
        availicu: 0,
        totalicu: 0,
        patient: 0,
        staff: [],
      };

      let hospitalNames = [this.hospitaldata[0]["hospitalname"]];
      let counter = 0;


      for (let i = 0; i < this.hospitaldata.length; i++) {

        if (hospitalNames.includes(this.hospitaldata[i]["hospitalname"])) {
        data.totalbed++;
          if (this.hospitaldata[i]["wardtype"] == "ICU") {
            data.totalicu++;
          }
          if (!this.hospitaldata[i]["patientid"]) {
            data.availbed++;
            if (this.hospitaldata[i]["wardtype"] == "ICU") {
              data.availicu++;
            }
          } else {
            data.patient++;
          }
          if (!data.staff.includes(this.hospitaldata[i]["staffid1"])) {
            data.staff.push(this.hospitaldata[i]["staffid1"]);
          } else if (!data.staff.includes(this.hospitaldata[i]["staffid2"])) {
            data.staff.push(this.hospitaldata[i]["staffid2"]);
          }
        }else {

          // 30%, 50%, 70%, 90%
          let occupancystatus = Math.round((data.availbed / data.totalbed) * 100).toString() + " %";

          this.tabledata.push({
            hospital: hospitalNames[counter],
            bed: data.availbed.toString() + " / " + data.totalbed.toString(),
            icu: data.availicu.toString() + " / " + data.totalicu.toString(),
            status: occupancystatus,
            patient: data.patient,
            staff: data.staff.length,
          });

          data = {
            availbed: 0,
            totalbed: 0,
            availicu: 0,
            totalicu: 0,
            patient: 0,
            staff: [],
          };
          
          data.totalbed++;
          if (!this.hospitaldata[i]["wardtype"] == "ICU") {
            data.totalicu++;
          }
          if (!this.hospitaldata[i]["patientid"]) {
            data.availbed++;
            if (!this.hospitaldata[i]["wardtype"] == "ICU") {
              data.availicu++;
            }
          } else {
            data.patient++;
          }
          if (!data.staff.includes(this.hospitaldata[i]["staffid1"])) {
            data.staff.push(this.hospitaldata[i]["staffid1"]);
          } else if (!data.staff.includes(this.hospitaldata[i]["staffid2"])) {
            data.staff.push(this.hospitaldata[i]["staffid2"]);
          }
          hospitalNames.push(this.hospitaldata[i]["hospitalname"]);
          counter ++
        } 
        
        
      }
      this.tabledata.push({
            hospital: hospitalNames[counter],
            bed: data.availbed.toString() + " / " + data.totalbed.toString(),
            icu: data.availicu.toString() + " / " + data.totalicu.toString(),
            status: Math.round((data.availbed / data.totalbed) * 100).toString() + " %",
            patient: data.patient,
            staff: data.staff.length,
          });
      
      // console.log(this.tabledata)
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