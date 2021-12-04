<template>
  <div>
    <div class="header">
      <v-row align="center">
        <v-col cols="12" sm="6">
          <v-select
          solo
            label="Hospital"
            outlined
            v-model="firstOption"
            :items="hospitalDetails"
            name="hospital"
            item-text="hospitalname"
            @change="selectHospital()"
            return-object
          ></v-select>
        </v-col>
      </v-row>
    </div>
    <div class="headerContent">
      <div class="header">
        <v-row align="center" justify="space-between">
          <h1>Patient Management</h1>
          <v-dialog v-model="firstbox" width="1200px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="white"
                v-bind="attrs"
                v-on="on"
                @click="showSaveBtn = true"
              >
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
                    <v-select
                      label="Hospital"
                      outlined
                      v-model="secondOption"
                      :items="hospitalDetails"
                      name="hospital"
                      item-text="hospitalname"
                      @change="showWards"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-flex
                    class="wardOverview"
                    v-for="ward in wardinfo"
                    :key="ward.wardid"
                  >
                    <v-card
                      v-if="chosenHospital"
                      border="top"
                      elevation="4"
                      :color="ward.wardtype === 'ICU' ? 'red' : 'blue'"
                      dark
                      width="200px"
                    >
                      <v-card-title justify="center">
                        <h3>{{ ward.wardtype }} {{ ward.wardid }}</h3>
                        <v-spacer></v-spacer>
                      </v-card-title>
                      <!--Avaliable bed value!-->
                      <v-card-subtitle class="text-center"
                        ><h2>{{ ward.availablebed }}</h2>
                        Available Beds</v-card-subtitle
                      >
                      <v-row justify="center">
                        <v-btn @click="showWardBox(ward.wardid)"
                          >Select Ward
                        </v-btn>
                      </v-row>
                    </v-card>
                  </v-flex>
                </v-row>
                <v-row justify="end">
                  <v-btn @click="firstbox = false" text color="green"
                    >Close
                  </v-btn>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>

          <v-dialog v-model="secondbox">
            <v-card>
              <v-alert v-if="showAlertBox" :color="alert.color" dark>
                {{ alert.text }}
              </v-alert>
              <v-card-title>
                <h5>Patient Information</h5>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <!-- <v-col cols="12" sm="4"  md="4">
                  <v-text-field label="Hospital" disabled :value="hospitalChoice"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4"  md="4">
                  <v-text-field label="Ward Type" disabled :value="wardTypeChoice"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4"  md="4">
                  <v-text-field label="Ward ID" disabled :value="wardIdChoice"></v-text-field>
                </v-col> -->
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Name"
                        hint="Patient's Full Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <label for="admissiondatepicker">Admission Date</label>
                      <!-- Date not working yet!-->
                      
                      <!-- <datepicker :value="date" @click="selectAdmissionDate()" border="top" required></datepicker> -->
                      <small>Admission Date:{{ admissiondateval }}</small>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <label for="dischargedatepicker">Discharged Date</label>
                      <!-- Date not working yet!-->
                      <!-- <datepicker :value="date" @click="selectAdmissionDate()"></datepicker>
                   -->
                  
                  
                      <small
                        >*Do not enter date if patient is yet to be
                        Discharged:{{ dischargedate }}</small
                      >
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="[
                          'Swab Negative',
                          'Mild Symptoms',
                          'Moderate Symptoms',
                          'Severe Symptoms',
                        ]"
                        label="Status"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-divider inset></v-divider>
                  <br />
                  <h2>Next Of Kin (NOK) Information</h2>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="nokName"
                        hint="Next of Kin's Full Name"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="nokContact"
                        hint="Next of Kin's Contacts"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="nokEmail"
                        hint="Next of Kin's Email"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="secondbox = false">
                  Close</v-btn
                >
                <v-btn
                  v-show="showSaveBtn"
                  color="green"
                  @click="
                    secondbox = false;
                    firstbox = false;
                  "
                  @
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
      <v-flex class="overview">
        <v-card
          shaped
          border="top"
          elevation="4"
          color="rgb(0,188,212)"
          dark
          width="280px"
        >
          <v-card-title>
            <v-col>
              <v-row>
                <h3>Beds Available</h3>
              </v-row>
              <v-row>
                <h5>{{ numberoficu }} ICU Beds</h5>
                <v-spacer></v-spacer
                ><v-icon color="red">mdi-bed-outline</v-icon>
              </v-row>
              <v-row>
                <h5>{{ numberofavailbeds }} Non-ICU Beds</h5>
                <v-spacer></v-spacer><v-icon>mdi-bed-outline</v-icon>
              </v-row>
            </v-col>
          </v-card-title>
        </v-card>

        <v-spacer></v-spacer>

        <v-card
          shaped
          border="top"
          elevation="4"
          color="rgb(139,195,74)"
          dark
          width="280px"
        >
          <v-card-title>
            <v-col>
              <v-row>
                <h3>Severity of Patients</h3>
              </v-row>
              <v-row>
                <h5>{{ numberofunwell }} Critical Conditions</h5>
                <v-spacer></v-spacer
                ><v-icon color="red">mdi-face-mask-outline</v-icon>
              </v-row>
              <v-row>
                <h5>{{ numberofwell }} Ready to Discharge</h5>
                <v-spacer></v-spacer><v-icon>mdi-face-mask-outline</v-icon>
              </v-row>
            </v-col>
          </v-card-title>
        </v-card>
        <v-spacer></v-spacer>

        <v-card
          shaped
          border="top"
          elevation="4"
          color="rgb(255,152,0)"
          dark
          width="280px"
        >
          <v-card-title background="rgb(205,26,87)">
            <v-col>
              <v-row>
                <h3>Possible Relocation</h3>
              </v-row>
              <v-row>
                <h5>{{ canbetransferred.length }} Transfer to Hospitals</h5>
                <v-spacer></v-spacer
                ><v-icon color="red">mdi-swap-horizontal</v-icon>
              </v-row>
              <v-row>
                <h5>{{ transferhome }} Transfer to Normal Wards</h5>
                <v-spacer></v-spacer><v-icon>mdi-swap-horizontal</v-icon>
              </v-row>
            </v-col>
          </v-card-title>
        </v-card>
      </v-flex>
    </div>
    <v-flex class="hospitaltable">
      <v-row>
        <v-col cols="8">
          <v-data-table
            :items-per-page="5"
            :headers="headers"
            :items="personalData"
            :search="search"
            class="elevation-1"
          >
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
              <v-icon small class="mr-2" @click="secondbox = !secondbox">
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="
                  secondbox = !secondbox;
                  showSaveBtn = !showSaveBtn;
                "
              >
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="4" class="justify-space-between">
          <v-card tile class="mx-auto" max-width="500">
            <v-toolbar dark dense>
              <v-toolbar-title
                >Patient Transfer to Another Hospital</v-toolbar-title
              >
            </v-toolbar>
            <v-list v-for="items in canbetransferred" :key="items.patientid">
              <v-list-item>
                Patient ID {{ items.patientid }}
                <v-spacer></v-spacer>
                Bed ID {{ items.bedid }}
              </v-list-item>
              <v-list-item>
                Current Ward {{ items.wardid }}
                <v-spacer></v-spacer>
                Current Hospital {{ items.hospitalid }}
              </v-list-item>
              <v-list-item> Status {{ items.statusno }} </v-list-item>
              <v-divider></v-divider>
            </v-list>
          </v-card>

          <v-card tile class="mx-auto" max-width="500">
            <v-toolbar dark dense>
              <v-toolbar-title>Transfer to Normal Wards </v-toolbar-title>
            </v-toolbar>
            <v-list
              v-for="items in canbehome"
              :key="items.patientid"
              dense
              ripple
            >
              <v-list-item>
                Patient ID {{ items.patientid }}
                <v-spacer></v-spacer>
                Bed ID {{ items.bedid }}
              </v-list-item>
              <v-list-item>
                Current Ward {{ items.wardid }}
                <v-spacer></v-spacer>
                Current Hospital {{ items.hospitalid }}
              </v-list-item>
              <v-list-item> Status {{ items.statusno }} </v-list-item>
              <v-divider></v-divider>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </div>
</template>

<script>
import axios from "axios";
// import Datepicker from 'vuejs-datepicker'
// const url = "https://hospitaldb1-11.herokuapp.com"
const url = "http://localhost:5000";

export default {
  name: "Patient",
  components: {
    // Datepicker
  },
  computed: {},
  data() {
    return {
      firstOption: "",
      secondOption: "",
      search: "",
      firstbox: false,
      secondbox: false,
      chosenHospital: false,
      showSaveBtn: false,
      date: "",
      admissiondateval: "",
      numberofavailbeds: 0,
      numberoficu: 0,
      hospital: null,
      hospitalDetails: [],
      wardinfo: [],
      // Severity of Patients in Hospital
      unwellData: [],
      wellData: [],
      numberofunwell: 0,
      numberofwell: 0,
      // Possible Relocation
      canbetransferred: [],
      canbehome: [],
      transferData: [],
      transferoccupied: 0,
      transferhome: 0,

      //Personal particulars
      personalData: [],

      showAlertBox: true,
      alert: {
        color: "green lighten-3",
        text: "example",
      },
      headers: [
        {
          text: "Patient Name",
          align: "left",
          sortable: false,
          value: "patientname",
        },
        { text: "ID", value: "patientid" },
        { text: "Admission Date", value: "admissiondate" },
        { text: "Status", value: "statusno" },
        { text: "NOK Name", value: "nokname" },
        { text: "NOK Contacts", value: "nokcontact" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.getHospital();
    this.selectHospital();
  },
  methods: {
    selectHospital() {
      this.getAvailable();
      this.getUnwell();
      this.getWell();
      this.getTransfers();
      this.getPersonal();
    },
    async getPersonal() {
      await axios
        .get(url + "/patient/getparticulars")
        .then((response) => {
          this.personalData = [];
          for (var i = 0; i < response.data.length ; i ++){
            if(response.data[i].hospitalid == this.firstOption.hospitalid){
              this.personalData.push(response.data[i])
            }
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async getTransfers() {
      await axios
        .get(url + "/patient/transfer")
        .then((response) => {
          this.transferData = response.data;
          console.log(response.data);
          let occupied = 0;
          this.canbetransferred = [];
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].hospitalid == this.firstOption.hospitalid) {
              if (response.data[i].bedstatus == "1") {
                if (response.data[i].statusno == "1") {
                  occupied++;
                  this.canbehome.push(response.data[i]);
                } else if (
                  response.data[i].statusno == "4" ||
                  response.data[i].statusno == "5"
                ) {
                  this.canbetransferred.push(response.data[i]);
                }
              }
            }
          }
          this.transferhome = occupied;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async getUnwell() {
      await axios
        .get(url + "/patient/getsevere")
        .then((response) => {
          this.numberofunwell = 0;
          this.unwellData = response.data;
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].hospitalid == this.firstOption.hospitalid) {
              this.numberofunwell += parseInt(response.data[i].count);
            }
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async getWell() {
      await axios
        .get(url + "/patient/getnonsevere")
        .then((response) => {
          this.numberofwell = 0;
          this.wellData = response.data;
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].hospitalid == this.firstOption.hospitalid) {
              this.numberofwell += parseInt(response.data[i].count);
            }
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },

    async getAvailable() {
      await axios
        .get(url + "/patient/bedsavailable")
        .then((response) => {
          this.numberoficu = 0;
          this.numberofavailbeds = 0;

          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].hospitalid == this.firstOption.hospitalid) {
              if (response.data[i].wardtype == "ICU") {
                this.numberoficu += parseInt(response.data[i].availablebed);
              } else {
                this.numberofavailbeds += parseInt(
                  response.data[i].availablebed
                );
              }
            }
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async showWards() {
      this.chosenHospital = true;
      this.wardinfo = [];
      await axios
        .post(url + "/hos/getwardinfo", {
          hospitalname: this.secondOption.replaceAll("'", "''"),
        })
        .then((response) => {
          // this.wardinfo = response.data
          let entered = "";
          let counter = -1;
          for (let i = 0; i < response.data.length; i++) {
            if (entered != response.data[i]["wardid"]) {
              entered = response.data[i]["wardid"];
              if (response.data[i]["bedstatus"] == 0) {
                this.wardinfo.push({
                  hospitalname: response.data[i]["hospitalname"],
                  staffid1: response.data[i]["staffid1"],
                  staffid2: response.data[i]["staffid2"],
                  availablebed: response.data[i]["amount"],
                  totalbed: response.data[i]["amount"],
                  wardtype: response.data[i]["wardtype"],
                  wardid: response.data[i]["wardid"],
                });
              } else {
                this.wardinfo.push({
                  hospitalname: response.data[i]["hospitalname"],
                  staffid1: response.data[i]["staffid1"],
                  staffid2: response.data[i]["staffid2"],
                  availablebed: 0,
                  totalbed: response.data[i]["amount"],
                  wardtype: response.data[i]["wardtype"],
                  wardid: response.data[i]["wardid"],
                });
              }

              counter++;
            } else {
              // this.wardinfo[counter].availablebed = parseInt(this.wardinfo[counter].availablebed) + parseInt(response.data[i]['amount'])
              this.wardinfo[counter].totalbed =
                parseInt(this.wardinfo[counter].totalbed) +
                parseInt(response.data[i]["amount"]);
            }
            this.wardinfo[counter].occupancy =
              100 -
              Math.round(
                (this.wardinfo[counter].availablebed /
                  this.wardinfo[counter].totalbed) *
                  100
              );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getHospital() {
      await axios
        .get(url + "/hos/all")
        .then((response) => {
          this.hospitalDetails = response.data;
          this.firstOption = this.hospitalDetails[0];
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    showWardBox(id) {
      console.log(id);
      this.secondbox = true;
    },

    selectAdmissionDate() {
      this.admissiondateval = this.date;
    },
    async getWardInfo() {
      this.wardinfo = [];
      await axios
        .post(url + "/hos/getwardinfo", {
          hospitalname: this.selectedanswer.replaceAll("'", "''"),
        })
        .then((response) => {
          // this.wardinfo = response.data
          let entered = "";
          let counter = -1;
          for (let i = 0; i < response.data.length; i++) {
            if (entered != response.data[i]["wardid"]) {
              entered = response.data[i]["wardid"];
              if (response.data[i]["bedstatus"] == 0) {
                this.wardinfo.push({
                  hospitalname: response.data[i]["hospitalname"],
                  staffid1: response.data[i]["staffid1"],
                  staffid2: response.data[i]["staffid2"],
                  availablebed: response.data[i]["amount"],
                  totalbed: response.data[i]["amount"],
                  wardtype: response.data[i]["wardtype"],
                  wardid: response.data[i]["wardid"],
                });
              } else {
                this.wardinfo.push({
                  hospitalname: response.data[i]["hospitalname"],
                  staffid1: response.data[i]["staffid1"],
                  staffid2: response.data[i]["staffid2"],
                  availablebed: 0,
                  totalbed: response.data[i]["amount"],
                  wardtype: response.data[i]["wardtype"],
                  wardid: response.data[i]["wardid"],
                });
              }

              counter++;
            } else {
              // this.wardinfo[counter].availablebed = parseInt(this.wardinfo[counter].availablebed) + parseInt(response.data[i]['amount'])
              this.wardinfo[counter].totalbed =
                parseInt(this.wardinfo[counter].totalbed) +
                parseInt(response.data[i]["amount"]);
            }
            this.wardinfo[counter].occupancy =
              100 -
              Math.round(
                (this.wardinfo[counter].availablebed /
                  this.wardinfo[counter].totalbed) *
                  100
              );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      this.chosenHospital = true;
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

.wardOverview {
  display: flex;
  flex-direction: row;
  margin: 24px;
}

.addBtn {
  justify-content: flex-end;
  margin: 24px;
}
</style>