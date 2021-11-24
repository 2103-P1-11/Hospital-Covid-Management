<template>
  <v-main>
    <v-flex class="overview">
      <v-card
        ripple
        shaped
        elevation="4"
        color="rgb(233,30,99)"
        dark
        width="228px"
      >
        <v-card-title>
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
        width="228px"
      >
        <v-card-title>
          <h3>HEALED</h3>
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
        color="rgb(160,32,240)"
        dark
        width="228px"
      >
        <v-card-title>
          <h3>AVG DAYS</h3>
          <v-spacer></v-spacer><v-icon>mdi-calendar-today</v-icon>
        </v-card-title>
        <v-card-subtitle>{{ (Math.round((avgdays + Number.EPSILON) * 100)/100) }} Days </v-card-subtitle>
        <v-card-text><v-icon
            v-if="avgdaysinaweek - avgdays > 0"
            >mdi-arrow-down</v-icon
          ><v-icon
            v-if="avgdaysinaweek - avgdays < 0"
            >mdi-arrow-up</v-icon
          > {{ (Math.round((avgdaysinaweek + Number.EPSILON) * 100)/100) }} Days overall </v-card-text
        >
      </v-card>

      <v-spacer></v-spacer>
      <v-card
        ripple
        shaped
        elevation="4"
        color="rgb(0,188,212)"
        dark
        width="228px"
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
              <v-toolbar dark dense>
                <v-toolbar-title>Hospital Level</v-toolbar-title>
              </v-toolbar>
              <v-text-field
                v-model="search"
                label="Search"
                class="mx-4"
              ></v-text-field>
            </template>
          </v-data-table>
        </v-col>

        <v-col cols="4">
          <v-card tile class="mx-auto" max-width="500">
            <v-toolbar dark dense>
              <v-toolbar-title>Most Recent Updates</v-toolbar-title>
            </v-toolbar>
            <v-list two-line>
              <template v-for="(item, index) in mostrecent">
                <v-list-item :key="item.patient" ripple @click="toggle(index)">
                  <v-list-item-content>
                    <v-list-item-subtitle
                      ># {{ item.patient }}</v-list-item-subtitle
                    >
                    <v-list-item-title>{{ item.desc }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text>{{
                      item.time
                    }}</v-list-item-action-text>
                  </v-list-item-action>
                </v-list-item>
                <v-divider
                  v-if="index + 1 < mostrecent.length"
                  :key="index"
                ></v-divider>
              </template>
            </v-list>
          </v-card>

          <v-card tile  dark>
            <v-card-title>
              <v-img src="@/assets/medicine.png" height="100px" contain
                ><v-container fill-height fluid pa-2>
                  <v-layout fill-height>
                    See more <v-spacer></v-spacer
                    ><v-icon>mdi-arrow-right-circle-outline</v-icon>
                  </v-layout>
                </v-container></v-img
              >
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <chartInfected />
        </v-col>
        <v-col cols="6">
          <totalInfected />
        </v-col>
      </v-row>
    </v-flex>
  </v-main>
</template>

<script>
import axios from "axios";
import chartInfected from "../charts/DailyCovidCases.vue"
import totalInfected from "../charts/TotalCovidCases.vue"

export default {
  name: "Dashboard",
  components: {chartInfected, totalInfected},
  data() {
    return {
      test: "testing hello",
      mostrecent: [],
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
      avgdays: null,
      avgdaysinaweek: null,
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
    this.getMostRecent();
    this.gethospitalisationdays();
  },

  methods: {
    toggle(index) {
      const i = this.selected.indexOf(index);

      if (i > -1) {
        this.selected.splice(i, 1);
      } else {
        this.selected.push(index);
      }
    },
    async gethospitalisationdays() {
      await axios
        .get("http://localhost:5000/db/hospitaldays")
        .then((response) => {
          this.avgdays = response.data[0]['avg'];
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
        await axios
        .get("http://localhost:5000/db/hospitaltotal")
        .then((response) => {
          this.avgdaysinaweek = response.data[0]['avg'];
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
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
    async getMostRecent() {
      await axios
        .get("http://localhost:5000/db/mostrecent")
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            // get total seconds between the times
            let currdate = new Date();
            var delta =
              Math.abs(
                currdate - Date.parse(response.data[i]["admissiondate"])
              ) / 1000;

            // calculate (and subtract) whole days
            var days = Math.floor(delta / 86400);
            delta -= days * 86400;

            // calculate (and subtract) whole hours
            var hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            // calculate (and subtract) whole minutes
            var minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;

            // console.log(days, hours, minutes)

            let timeleft = "";
            if (days) {
              timeleft = days.toString() + " days";
            } else if (hours) {
              timeleft = hours.toString() + " hours";
            } else {
              timeleft = minutes.toString() + " mins";
            }

            this.mostrecent.push({
              patient: response.data[i]["patientid"],
              desc: response.data[i]["condition"],
              time: timeleft,
              type: response.data[i]["statusno"],
            });
          }
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
        } else {
          // 30%, 50%, 70%, 90%
          let occupancystatus =
            100 -
            Math.round((data.availbed / data.totalbed) * 100).toString() +
            " %";

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
          counter++;
        }
      }
      this.tabledata.push({
        hospital: hospitalNames[counter],
        bed: data.availbed.toString() + " / " + data.totalbed.toString(),
        icu: data.availicu.toString() + " / " + data.totalicu.toString(),
        status:
          100 -
          Math.round((data.availbed / data.totalbed) * 100).toString() +
          " %",
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