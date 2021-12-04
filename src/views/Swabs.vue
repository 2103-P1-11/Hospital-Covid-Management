<template>
  <v-container>
    <div class="header">
      <h1>Swab Results Management</h1>
    </div>

    <v-alert v-if="showAlertBox" :color="alert.color" dark>
      {{ alert.text }}
    </v-alert>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="swabdata"
          sort-by="administertime"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Swab Result Management</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New Item
                  </v-btn>
                </template>
                <v-card>
                  <v-alert v-if="showAlertBoxTwo" :color="alertTwo.color" dark>
                    {{ alertTwo.text }}
                  </v-alert>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            :items="[
                              { value: 0, meaning: 'Negative' },
                              { value: 1, meaning: 'Positive' },
                            ]"
                            item-text="meaning"
                            item-value="value"
                            v-model="editedItem.swabresult"
                            label="Swab Result"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="date"
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date"
                                label="Administer Time"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                disabled
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="date"
                              scrollable
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="modal = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="
                                  $refs.dialog.save(editedItem.administertime)
                                "
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-dialog>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.patientid"
                            label="Patient ID"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.staffid"
                            label="Staff ID"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="getSwab()"> Refresh Data </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
// const url = "https://hospitaldb1-11.herokuapp.com"
const url = "http://localhost:5000";

export default {
  name: "Swabs",
  components: {},
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  data() {
    return {
      modal: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      showAlertBoxTwo: false,
      alertTwo: {
        color: "green lighten-3",
        text: "example",
      },
      showAlertBox: false,
      alert: {
        color: "green lighten-3",
        text: "example",
      },
      swabdata: [],
      dialog: false,
      headers: [
        { text: "ID", value: "swabid" },
        { text: "Swab Result", value: "swabresult" },
        { text: "Administered Time", value: "administertime" },
        { text: "Patient ID", value: "patientid" },
        { text: "Staff ID", value: "staffid" },
      ],
      editedIndex: -1,
      editedItem: {
        swabresult: 0,
        administertime: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString(),
        patientid: null,
        staffid: null,
      },
      defaultItem: {
        swabresult: 0,
        administertime: 0,
        patientid: 0,
        staffid: 0,
      },
    };
  },
  created() {
    this.getSwab();
  },
  methods: {
    async getSwab() {
      await axios
        .get(url + "/db/swaball")
        .then((response) => {
          console.log(response.data);
          this.swabdata = response.data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      console.log(this.editedItem);
      if (
        !this.editedItem.administertime ||
        !this.editedItem.patientid ||
        !this.editedItem.staffid
      ) {
        this.alertTwo.color = "red lighten-3";
        this.alertTwo.text = "Invalid inputs, please try again";
        this.showAlertBoxTwo = true;
        setTimeout(function () {
          this.showAlertBoxTwo = false;
        }, 6000);
        return;
      }
      console.log(this.editedItem.administertime)
      this.saveData();
      this.getSwab();

      this.close();
    },
    async saveData() {
      await axios
        .post(url + "/db/addswab", { data: this.editedItem })
        .then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            this.alert.color = "green lighten-3";
            this.alert.text = "Swab successfully entered";
            this.showAlertBox = true;
          } else {
            this.alert.color = "red lighten-3";
            this.alert.text = "Error saving to database, please try again";
            this.showAlertBox = true;
          }
          setTimeout(function () {
            this.showAlertBox = false;
          }, 6000);
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
</style>

